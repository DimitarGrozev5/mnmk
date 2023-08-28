import { useEffect, useState } from "react";
import type {
  IdRefs,
  SelectedIds,
  Transformer,
} from "../../../../store/slices/flowing-assets-types";
import { generateAssetLines } from "./generate-asset-lines";
import { generateTransLines } from "./generate-trans-lines";

export const useDrawLines = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  hoveredAsset: string | null,
  hoveredTrans: string | null,
  assetRects: IdRefs,
  transRects: IdRefs,
  transformers: Transformer[]
): SelectedIds => {
  const [selectedRefs, setSelectedRefs] = useState<{
    assets: string[];
    trans: string[];
  }>({ assets: [], trans: [] });

  useEffect(() => {
    if (canvasRef.current === null || containerRef.current === null) return;
    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();

    let keepDrawing = !!hoveredAsset || !!hoveredTrans;

    const ctx = canvas.getContext("2d");
    if (ctx === null) return;

    ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);

    ctx.strokeStyle = "rgb(148,163,184)";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const lines: number[][][] = [];

    // Get selected asset
    if (hoveredAsset) {
      const { selectedIds, newLines } = generateAssetLines(
        containerRef,
        hoveredAsset,
        assetRects,
        transRects,
        transformers
      );
      lines.push(...newLines);
      setSelectedRefs(selectedIds);
    }
    if (hoveredTrans) {
      const { selectedIds, newLines } = generateTransLines(
        containerRef,
        hoveredTrans,
        assetRects,
        transRects,
        transformers
      );
      lines.push(...newLines);
      setSelectedRefs(selectedIds);
    }

    const start = new Date().getTime();
    const animationDuration = 1000;

    function easeInOutCubic(x: number): number {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    const draw = () => {
      const dt = Math.min(new Date().getTime() - start, animationDuration);

      const scale = easeInOutCubic(dt / animationDuration);

      const lineLengths = lines.map((line) => {
        let len = 0;
        for (let index = 1; index < line.length; index++) {
          len += Math.abs(line[index][0] - line[index - 1][0]);
          len += Math.abs(line[index][1] - line[index - 1][1]);
        }
        return len;
      });

      lines.forEach((line, index) => {
        ctx.beginPath();
        ctx.moveTo(line[0][0], line[0][1]);

        let accLen = 0;
        const targetLen = lineLengths[index] * scale;

        line.slice(1).forEach((pt, ptIndex) => {
          if (accLen > targetLen) {
            return;
          }
          const prevPt = line[ptIndex];

          const currLen =
            Math.abs(pt[0] - prevPt[0]) + Math.abs(pt[1] - prevPt[1]);
          if (accLen + currLen > targetLen) {
            const ptDir = [
              Math.sign(pt[0] - prevPt[0]),
              Math.sign(pt[1] - prevPt[1]),
            ];

            const ptX = prevPt[0] + (targetLen - accLen) * ptDir[0];
            const ptY = prevPt[1] + (targetLen - accLen) * ptDir[1];
            ctx.lineTo(ptX, ptY);

            accLen += currLen;
            return;
          }
          accLen += currLen;
          ctx.lineTo(pt[0], pt[1]);
        });
        ctx.stroke();
      });

      if (keepDrawing) {
        window.requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);
      }
    };
    keepDrawing && draw();

    return () => {
      keepDrawing = false;
      setSelectedRefs({ assets: [], trans: [] });
    };
  }, [
    assetRects,
    canvasRef,
    containerRef,
    hoveredAsset,
    hoveredTrans,
    transRects,
    transformers,
  ]);

  return selectedRefs;
};

import { useEffect } from "react";
import type { IdRefs, Transformer } from "../../flowing-assets-types";
import { generateAssetLines } from "./generate-asset-lines";

export const useDrawLines = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  hoveredAsset: string | null,
  hoveredTrans: string | null,
  assetRects: IdRefs,
  transRects: IdRefs,
  transformers: Transformer[]
) => {
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

    let lines: number[][][] = [];

    // Get selected asset
    if (hoveredAsset) {
      lines = [
        ...lines,
        ...generateAssetLines(
          containerRef,
          hoveredAsset,
          assetRects,
          transRects,
          transformers
        ),
      ];
    }

    const draw = () => {
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line[0][0], line[0][1]);
        line.slice(1).forEach((segment) => {
          ctx.lineTo(segment[0], segment[1]);
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
};

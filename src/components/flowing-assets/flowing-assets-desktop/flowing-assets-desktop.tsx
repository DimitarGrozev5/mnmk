import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type {
  Transformer,
  ZonesAndTransformers,
} from "../flowing-assets-types";
import FlowingZone from "./flowing-zone";
import { useRectCollection } from "./hooks/useRefsCollection";
import FlowingTransformer from "./flowing-transformer";
import { useDrawLines } from "./hooks/useDrawLines";

type Props = {
  zonesAndTransformers: ZonesAndTransformers;
};

const FlowingAssets_Desktop: React.FC<Props> = ({
  zonesAndTransformers: { zones, transformers },
}) => {
  // Get refs for zones and transformers
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    rects: assetRects,
    addRect: addAssetRef,
    removeRect: removeAssetRef,
  } = useRectCollection();

  const {
    rects: transRects,
    addRect: addTransRef,
    removeRect: removeTransRef,
  } = useRectCollection();

  // Calculate lines for the hovered element
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  const [hoveredTrans, setHoveredTrans] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
    }
  }, []);

  useDrawLines(
    canvasRef,
    containerRef,
    hoveredAsset,
    hoveredTrans,
    assetRects,
    transRects,
    transformers
  );

  // Sort and filter transformers
  const transformerZones: Transformer[][] = useMemo(
    () =>
      transformers.reduce((acc, transformer) => {
        // Find the zone that the transformer takes it's sorurces
        const zoneIndex = zones.findIndex((zone) =>
          zone.assets.find((asset) => transformer.sources.includes(asset))
        );
        acc[zoneIndex].push(transformer);
        return acc;
      }, zones.map(() => []) as Transformer[][]),
    [transformers, zones]
  );

  return (
    <div
      ref={containerRef}
      className={clsx("relative", "flex flex-col gap-4", "bg-slate-200", "p-3")}
    >
      <div className={clsx("absolute inset-0 z-0")}>
        <canvas ref={canvasRef} className="border border-red-500"></canvas>
      </div>
      <div className={clsx("relative inset-0 z-10", "flex flex-col gap-4")}>
        {zones.map((zone, index) => (
          <React.Fragment key={zone.id}>
            <FlowingZone
              key={zone.id}
              zone={zone}
              addAssetRef={addAssetRef}
              removeAssetRef={removeAssetRef}
              setHoveredAsset={setHoveredAsset}
            />
            {transformerZones[index].length > 0 && (
              <div className={clsx("flex flex-row gap-10", "px-5")}>
                {transformerZones[index].map((transformer) => (
                  <FlowingTransformer
                    key={transformer.id}
                    transformer={transformer}
                    addTransRef={addTransRef}
                    removeTransRef={removeTransRef}
                    setHoveredTrans={setHoveredTrans}
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlowingAssets_Desktop;

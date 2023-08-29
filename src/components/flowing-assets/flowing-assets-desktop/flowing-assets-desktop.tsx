import React, { useEffect, useRef } from "react";
import clsx from "clsx";
// import type { Transformer } from "../../../store/slices/flowing-assets-types";
import FlowingZone from "./flowing-zone";
// import { useRectCollection } from "./hooks/useRefsCollection";
// import FlowingTransformer from "./flowing-transformer";
import { useDrawLines } from "./hooks/useDrawLines";
import { useAppSelector } from "../../../store/hooks";

const FlowingAssets_Desktop: React.FC = () => {
  const zones = useAppSelector((state) => state.zonesAndTransformers.zoneIds);

  // Get refs for zones and transformers
  // const {
  //   rects: assetRects,
  //   addRect: addAssetRef,
  //   removeRect: removeAssetRef,
  // } = useRectCollection();

  // const {
  //   rects: transRects,
  //   addRect: addTransRef,
  //   removeRect: removeTransRef,
  // } = useRectCollection();

  // Calculate lines for the hovered element
  // const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  // const [hoveredTrans, setHoveredTrans] = useState<string | null>(null);

  // Setup canvas size to match container
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
    }
  }, []);

  useDrawLines(canvasRef, containerRef);

  return (
    <div
      ref={containerRef}
      className={clsx("relative", "flex flex-col gap-4", "bg-slate-200", "p-3")}
    >
      <div className={clsx("absolute inset-0 z-0")}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={clsx("relative inset-0 z-10", "flex flex-col gap-4")}>
        {zones.map((zoneId) => (
          <FlowingZone key={zoneId} zoneId={zoneId} />
        ))}
      </div>
    </div>
  );
};

export default FlowingAssets_Desktop;

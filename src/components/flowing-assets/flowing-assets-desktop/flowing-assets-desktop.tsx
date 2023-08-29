import React, { useRef } from "react";
import clsx from "clsx";
// import type { Transformer } from "../../../store/slices/flowing-assets-types";
import FlowingZone from "./flowing-zone";
// import { useRectCollection } from "./hooks/useRefsCollection";
// import FlowingTransformer from "./flowing-transformer";
// import { useDrawLines } from "./hooks/useDrawLines";
import { useAppSelector } from "../../../store/hooks";

const FlowingAssets_Desktop: React.FC = () => {
  const zones = useAppSelector((state) => state.zonesAndTransformers.zoneIds);

  // Get refs for zones and transformers
  const containerRef = useRef<HTMLDivElement>(null);
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // useEffect(() => {
  //   if (canvasRef.current && containerRef.current) {
  //     canvasRef.current.width = containerRef.current.clientWidth;
  //     canvasRef.current.height = containerRef.current.clientHeight;
  //   }
  // }, []);

  // const selectedIds = useDrawLines(
  //   canvasRef,
  //   containerRef,
  //   hoveredAsset,
  //   hoveredTrans,
  //   assetRects,
  //   transRects,
  //   transformers
  // );

  return (
    <div
      ref={containerRef}
      className={clsx("relative", "flex flex-col gap-4", "bg-slate-200", "p-3")}
    >
      <div className={clsx("absolute inset-0 z-0")}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={clsx("relative inset-0 z-10", "flex flex-col gap-4")}>
        {zones.map(
          (zoneId) => (
            <FlowingZone
              key={zoneId}
              zoneId={zoneId}
              // addAssetRef={addAssetRef}
              // removeAssetRef={removeAssetRef}
              // selectedIds={selectedIds}
              // hoveredAsset={hoveredAsset}
              // setHoveredAsset={setHoveredAsset}
            />
          )

          // <div className={clsx("flex flex-row gap-10", "px-5")}>
          //   {transformerZones[index].map((transformer) => (
          //     <FlowingTransformer
          //       key={transformer.id}
          //       transformer={transformer}
          //       addTransRef={addTransRef}
          //       removeTransRef={removeTransRef}
          //       selectedIds={selectedIds}
          //       hoveredTrans={hoveredTrans}
          //       setHoveredTrans={setHoveredTrans}
          //     />
          //   ))}
          // </div>
        )}
      </div>
    </div>
  );
};

export default FlowingAssets_Desktop;

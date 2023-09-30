import React, { useEffect, useRef } from "react";
import FlowingZone from "./flowing-zone";
import { useDrawLines } from "./hooks/useDrawLines";
import { useAppSelector } from "../../../store/hooks";
import { tw } from "../../../util/tw";

const FlowingAssets_Desktop: React.FC = () => {
  const zones = useAppSelector((state) => state.zonesAndTransformers.zoneIds);

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
      className={tw("relative", "flex flex-col gap-4", "bg-slate-200", "p-3")}
    >
      <div className={tw("absolute inset-0 z-0")}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={tw("relative inset-0 z-10", "flex flex-col gap-4")}>
        {zones.map((zoneId) => (
          <FlowingZone key={zoneId} zoneId={zoneId} />
        ))}
      </div>
    </div>
  );
};

export default FlowingAssets_Desktop;

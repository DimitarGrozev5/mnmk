import clsx from "clsx";
import FlowingAsset from "./flowing-asset";
import { useAppSelector } from "../../../store/hooks";
import FlowingTransformer from "./flowing-transformer";
import { useCallback } from "react";

type Props = {
  zoneId: string;
};

const FlowingZone: React.FC<Props> = ({ zoneId }) => {
  const zone = useAppSelector(
    (state) => state.zonesAndTransformers.zones[zoneId]
  );

  const snapX = useCallback((x: number) => x * 2, []);
  const snapY = useCallback((y: number) => y * 2, []);

  if (zone.type === "transformers")
    return (
      <div className={clsx("flex flex-row gap-10", "px-5")}>
        {zone.elementsIds.map((transId) => (
          <FlowingTransformer
            snapX={snapX}
            snapY={snapY}
            key={transId}
            transformerId={transId}
          />
        ))}
      </div>
    );

  return (
    <div
      className={clsx(
        "flex flex-col gap-2",
        "border border-slate-400 rounded-lg",
        "p-5"
      )}
    >
      <h1 className={clsx("text-xl font-semibold", "text-slate-700")}>
        {zone.name}
      </h1>

      <div className={clsx("flex flex-row items-stretch gap-10 flex-wrap")}>
        {zone.elementsIds.map((assetId) => (
          <FlowingAsset
            snapX={snapX}
            snapY={snapY}
            key={assetId}
            assetId={assetId}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowingZone;

import clsx from "clsx";
import FlowingAsset from "./flowing-asset";
import { useAppSelector } from "../../../store/hooks";
import FlowingTransformer from "./flowing-transformer";

type Props = {
  zoneId: string;
  // addAssetRef: (ref: IdRefs) => void;
  // removeAssetRef: (ref: IdRefs) => void;
  // hoveredAsset: string | null;
  // selectedIds: SelectedIds;
  // setHoveredAsset: (assetId: string | null) => void;
};

const FlowingZone: React.FC<Props> = ({
  zoneId,
  // addAssetRef,
  // removeAssetRef,
  // hoveredAsset,
  // selectedIds,
  // setHoveredAsset,
}) => {
  const zone = useAppSelector(
    (state) => state.zonesAndTransformers.zones[zoneId]
  );

  if (zone.type === "transformers")
    return (
      <div className={clsx("flex flex-row gap-10", "px-5")}>
        {zone.elementsIds.map((transId) => (
          <FlowingTransformer
            key={transId}
            transformerId={transId}
            // addTransRef={addTransRef}
            // removeTransRef={removeTransRef}
            // selectedIds={selectedIds}
            // hoveredTrans={hoveredTrans}
            // setHoveredTrans={setHoveredTrans}
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
            key={assetId}
            assetId={assetId}
            // addAssetRef={addAssetRef}
            // removeAssetRef={removeAssetRef}
            // selectedIds={selectedIds}
            // hoveredAsset={hoveredAsset}
            // setHoveredAsset={setHoveredAsset}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowingZone;

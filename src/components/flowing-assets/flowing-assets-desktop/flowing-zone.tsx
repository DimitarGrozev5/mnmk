import clsx from "clsx";
import type { SelectedIds, IdRefs, Zone } from "../flowing-assets-types";
import FlowingAsset from "./flowing-asset";

type Props = {
  zone: Zone;
  addAssetRef: (ref: IdRefs) => void;
  removeAssetRef: (ref: IdRefs) => void;
  hoveredAsset: string | null;
  selectedIds: SelectedIds;
  setHoveredAsset: (assetId: string | null) => void;
};

const FlowingZone: React.FC<Props> = ({
  zone,
  addAssetRef,
  removeAssetRef,
  hoveredAsset,
  selectedIds,
  setHoveredAsset,
}) => {
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
        {zone.assets.map((asset) => (
          <FlowingAsset
            key={asset.id}
            asset={asset}
            addAssetRef={addAssetRef}
            removeAssetRef={removeAssetRef}
            selectedIds={selectedIds}
            hoveredAsset={hoveredAsset}
            setHoveredAsset={setHoveredAsset}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowingZone;

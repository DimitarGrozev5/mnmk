import clsx from "clsx";
import { type IdRefs, type Zone } from "../flowing-assets-types";
import FLowingAsset from "./flowing-asset";

type Props = {
  zone: Zone;
  addAssetRef: (ref: IdRefs) => void;
  removeAssetRef: (ref: IdRefs) => void;
  hoveredAsset: string | null;
  setHoveredAsset: (assetId: string | null) => void;
};

const FlowingZone: React.FC<Props> = ({
  zone,
  addAssetRef,
  removeAssetRef,
  hoveredAsset,
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
          <FLowingAsset
            key={asset.id}
            asset={asset}
            addAssetRef={addAssetRef}
            removeAssetRef={removeAssetRef}
            hoveredAsset={hoveredAsset}
            setHoveredAsset={setHoveredAsset}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowingZone;

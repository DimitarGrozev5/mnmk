import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import type { IdRefs, Asset, SelectedIds } from "../flowing-assets-types";

type Props = {
  asset: Asset;
  addAssetRef: (ref: IdRefs) => void;
  removeAssetRef: (ref: IdRefs) => void;
  hoveredAsset: string | null;
  selectedIds: SelectedIds;
  setHoveredAsset: (assetId: string | null) => void;
};

const FLowingAsset: React.FC<Props> = ({
  asset,
  addAssetRef,
  removeAssetRef,
  setHoveredAsset,
  selectedIds,
  hoveredAsset,
}) => {
  // Take a ref to the div element and
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      addAssetRef({ [asset.id]: divRef.current.getBoundingClientRect() });
    }
    () => {
      removeAssetRef({ [asset.id]: new DOMRect() });
    };
  }, [addAssetRef, asset.id, removeAssetRef]);

  const dim = useMemo(
    () =>
      (selectedIds.assets.length > 0 || selectedIds.trans.length > 0) &&
      !selectedIds.assets.includes(asset.id),
    [asset.id, selectedIds.assets, selectedIds.trans.length]
  );

  const contract = useMemo(
    () => selectedIds.assets.includes(asset.id) && hoveredAsset !== asset.id,
    [asset.id, hoveredAsset, selectedIds.assets]
  );

  const expand = useMemo(
    () => hoveredAsset === asset.id,
    [asset.id, hoveredAsset]
  );

  return (
    <div
      ref={divRef}
      className={clsx(
        "relative z-10",
        "p-3 w-36 h-36",
        "bg-slate-300 rounded-lg",
        "shadow-lg transition-all duration-500",
        "cursor-pointer",
        dim && "scale-95 opacity-50 grayscale-0 blur-sm",
        contract && "scale-95",
        expand && "scale-105"
      )}
      onMouseEnter={() => setHoveredAsset(asset.id)}
      onMouseLeave={() => setHoveredAsset(null)}
    >
      {asset.component}
    </div>
  );
};

export default FLowingAsset;

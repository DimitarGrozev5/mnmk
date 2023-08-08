import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { type IdRefs, type Asset } from "../flowing-assets-types";

type Props = {
  asset: Asset;
  addAssetRef: (ref: IdRefs) => void;
  removeAssetRef: (ref: IdRefs) => void;
  hoveredAsset: string | null;
  setHoveredAsset: (assetId: string | null) => void;
};

const FLowingAsset: React.FC<Props> = ({
  asset,
  addAssetRef,
  removeAssetRef,
  setHoveredAsset,
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
    () => hoveredAsset !== null && hoveredAsset !== asset.id,
    [asset.id, hoveredAsset]
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
        dim && "opacity-50 grayscale-0 blur-sm",
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

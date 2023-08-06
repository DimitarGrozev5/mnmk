import { useEffect, useRef } from "react";
import clsx from "clsx";
import { type IdRefs, type Asset } from "../flowing-assets-types";

type Props = {
  asset: Asset;
  addAssetRef: (ref: IdRefs) => void;
  removeAssetRef: (ref: IdRefs) => void;
};

const FLowingAsset: React.FC<Props> = ({
  asset,
  addAssetRef,
  removeAssetRef,
}) => {
  // Take a ref to the div element and
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) {
      addAssetRef({ [asset.id]: divRef });
    }
    () => {
      removeAssetRef({ [asset.id]: divRef });
    };
  }, [addAssetRef, asset.id, removeAssetRef]);

  return (
    <div
      ref={divRef}
      className={clsx("p-3 w-36 h-36", "bg-slate-300 rounded-lg", "shadow-lg")}
    >
      {asset.component}
    </div>
  );
};

export default FLowingAsset;

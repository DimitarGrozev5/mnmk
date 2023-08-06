import clsx from "clsx";
import { Zone } from "../flowing-assets-types";
import { useEffect, useRef } from "react";

type Props = {
  zone: Zone;
  addAssetRef: (ref: React.RefObject<HTMLDivElement>) => void;
  removeAssetRef: (ref: React.RefObject<HTMLDivElement>) => void;
};

const FlowingZone: React.FC<Props> = ({
  zone,
  addAssetRef,
  removeAssetRef,
}) => {
  // Take a ref to the div element and
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) {
      addAssetRef(divRef);
    }
    () => {
      removeAssetRef(divRef);
    };
  }, [addAssetRef, removeAssetRef]);

  return (
    <div
      ref={divRef}
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
          <div
            key={asset.id}
            className={clsx(
              "p-3 w-36 h-36",
              "bg-slate-300 rounded-lg",
              "shadow-lg"
            )}
          >
            {asset.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowingZone;

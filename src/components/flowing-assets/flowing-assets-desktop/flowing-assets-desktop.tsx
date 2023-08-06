import clsx from "clsx";
import { ZonesAndTransformers } from "../flowing-assets-types";
import FlowingZone from "./flowing-zones";
import { useRefsArray } from "./hooks/useRefsArray";

type Props = {
  zonesAndTransformers: ZonesAndTransformers;
};

const FlowingAssets_Desktop: React.FC<Props> = ({
  zonesAndTransformers: { zones, transformers },
}) => {
  const {
    refs: assetRefs,
    addRef: addAssetRef,
    removeRef: removeAssetRef,
  } = useRefsArray();

  console.log(assetRefs);

  return (
    <div className={clsx("flex flex-col gap-4", "bg-slate-200", "p-3")}>
      {zones.map((zone) => (
        <FlowingZone
          key={zone.id}
          zone={zone}
          addAssetRef={addAssetRef}
          removeAssetRef={removeAssetRef}
        />
      ))}
      <div className={clsx("flex flex-row gap-4", "px-5")}>
        {transformers.map((transformer) => (
          <div
            key={transformer.id}
            className={clsx("p-3 w-36", "bg-slate-300 rounded-lg", "shadow-lg")}
          >
            {transformer.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowingAssets_Desktop;

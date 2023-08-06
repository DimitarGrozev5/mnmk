import clsx from "clsx";
import { ZonesAndTransformers } from "../flowing-assets-types";
import FlowingZone from "./flowing-zone";
import { useRefsArray } from "./hooks/useRefsArray";
import FlowingTransformer from "./flowing-transformer";

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

  const {
    refs: transRefs,
    addRef: addTransRef,
    removeRef: removeTransRef,
  } = useRefsArray();

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
          <FlowingTransformer
            key={transformer.id}
            transformer={transformer}
            addTransRef={addTransRef}
            removeTransRef={removeTransRef}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowingAssets_Desktop;

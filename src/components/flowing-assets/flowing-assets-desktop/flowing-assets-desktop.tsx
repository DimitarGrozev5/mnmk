import React, { useMemo } from "react";
import clsx from "clsx";
import type {
  Transformer,
  ZonesAndTransformers,
} from "../flowing-assets-types";
import FlowingZone from "./flowing-zone";
import { useRefsArray } from "./hooks/useRefsArray";
import FlowingTransformer from "./flowing-transformer";

type Props = {
  zonesAndTransformers: ZonesAndTransformers;
};

const FlowingAssets_Desktop: React.FC<Props> = ({
  zonesAndTransformers: { zones, transformers },
}) => {
  // Get refs for zones and transformers
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

  // Sort and filter transformers
  const transformerZones: Transformer[][] = useMemo(
    () =>
      transformers.reduce((acc, transformer) => {
        // Find the zone that the transformer takes it's sorurces
        const zoneIndex = zones.findIndex((zone) =>
          zone.assets.find((asset) => transformer.sources.includes(asset))
        );
        acc[zoneIndex].push(transformer);
        return acc;
      }, zones.map(() => []) as Transformer[][]),
    [transformers, zones]
  );

  console.log(transformerZones);

  return (
    <div className={clsx("flex flex-col gap-4", "bg-slate-200", "p-3")}>
      {zones.map((zone) => (
        <React.Fragment key={zone.id}>
          <FlowingZone
            key={zone.id}
            zone={zone}
            addAssetRef={addAssetRef}
            removeAssetRef={removeAssetRef}
          />
        </React.Fragment>
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

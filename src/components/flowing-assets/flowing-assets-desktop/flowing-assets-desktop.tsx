import React, { useMemo } from "react";
import clsx from "clsx";
import type {
  Transformer,
  ZonesAndTransformers,
} from "../flowing-assets-types";
import FlowingZone from "./flowing-zone";
import { useRefsArray } from "./hooks/useRefsCollection";
import FlowingTransformer from "./flowing-transformer";
import FlowLine from "./flow-line";

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

  // Go through the zones and calculate lines
  const lines: React.ReactNode = useMemo(() => {
    return <></>;
  }, []);

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

  return (
    <div
      className={clsx("relative", "flex flex-col gap-4", "bg-slate-200", "p-3")}
    >
      {zones.map((zone, index) => (
        <React.Fragment key={zone.id}>
          <FlowingZone
            key={zone.id}
            zone={zone}
            addAssetRef={addAssetRef}
            removeAssetRef={removeAssetRef}
          />
          {transformerZones[index].length > 0 && (
            <div className={clsx("flex flex-row gap-10", "px-5")}>
              {transformerZones[index].map((transformer) => (
                <FlowingTransformer
                  key={transformer.id}
                  transformer={transformer}
                  addTransRef={addTransRef}
                  removeTransRef={removeTransRef}
                />
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
      {lines}
      <FlowLine startPoint={[10, 20]} endPoint={[10, 90]} />
      <FlowLine startPoint={[10, 30]} endPoint={[90, 30]} />
    </div>
  );
};

export default FlowingAssets_Desktop;

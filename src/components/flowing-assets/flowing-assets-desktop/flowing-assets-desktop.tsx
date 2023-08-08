import React, { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type {
  Transformer,
  ZonesAndTransformers,
} from "../flowing-assets-types";
import FlowingZone from "./flowing-zone";
import { useRefsArray } from "./hooks/useRefsCollection";
import FlowingTransformer from "./flowing-transformer";
import { useConnectionLines } from "./hooks/useConnectionLines";

type Props = {
  zonesAndTransformers: ZonesAndTransformers;
};

const FlowingAssets_Desktop: React.FC<Props> = ({
  zonesAndTransformers: { zones, transformers },
}) => {
  // Get refs for zones and transformers
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Calculate lines for the hovered element
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  const [hoveredTrans, setHoveredTrans] = useState<string | null>(null);

  const [hoveredAssets, hoveredTransformers] = useMemo(() => {
    if (hoveredAsset !== null) {
      // Select the asset
      const asset = { [hoveredAsset]: assetRefs[hoveredAsset] };

      // Select all transformers that take the selected asset
      const transformerIds = transformers
        .filter(
          (trans) =>
            trans.sources.find((source) => source.id === hoveredAsset) ||
            trans.result.id === hoveredAsset
        )
        .reduce(
          (acc, trans) => ({ [trans.id]: transRefs[trans.id], ...acc }),
          {}
        );

      return [{ ...asset }, { ...transformerIds }];
    }

    if (hoveredTrans !== null) {
      // Select the transformer
      const transformerId = { [hoveredTrans]: transRefs[hoveredTrans] };

      // Select all assets that the selected transformer has
      const transformer = transformers.find(
        (trans) => trans.id === hoveredTrans
      )!;
      const assetIds = transformer.sources.reduce(
        (acc, cur) => ({ [cur.id]: assetRefs[cur.id], ...acc }),
        {}
      );

      // Select result asset
      const result = transformer.result;
      const resultAsset = { [result.id]: assetRefs[result.id] };

      return [{ ...assetIds, ...resultAsset }, { ...transformerId }];
    }

    return [{}, {}];
  }, [assetRefs, hoveredAsset, hoveredTrans, transRefs, transformers]);

  const lines: React.ReactNode = useConnectionLines(
    transformers,
    containerRef,
    hoveredAssets,
    hoveredTransformers
  );

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
      ref={containerRef}
      className={clsx("relative", "flex flex-col gap-4", "bg-slate-200", "p-3")}
    >
      <div className={clsx("absolute inset-0 z-0")}></div>
      <div className={clsx("relative inset-0 z-10", "flex flex-col gap-4")}>
        {zones.map((zone, index) => (
          <React.Fragment key={zone.id}>
            <FlowingZone
              key={zone.id}
              zone={zone}
              addAssetRef={addAssetRef}
              removeAssetRef={removeAssetRef}
              setHoveredAsset={setHoveredAsset}
            />
            {transformerZones[index].length > 0 && (
              <div className={clsx("flex flex-row gap-10", "px-5")}>
                {transformerZones[index].map((transformer) => (
                  <FlowingTransformer
                    key={transformer.id}
                    transformer={transformer}
                    addTransRef={addTransRef}
                    removeTransRef={removeTransRef}
                    setHoveredTrans={setHoveredTrans}
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
        {lines}
      </div>
    </div>
  );
};

export default FlowingAssets_Desktop;

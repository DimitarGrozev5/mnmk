import FlowingAsset from "./flowing-asset";
import { useAppSelector } from "../../../store/hooks";
import FlowingTransformer from "./flowing-transformer";
import { tw } from "../../../util/tw";

type Props = {
  zoneId: string;
};

const FlowingZone: React.FC<Props> = ({ zoneId }) => {
  const zone = useAppSelector(
    (state) => state.zonesAndTransformers.zones[zoneId]
  );

  if (zone.type === "transformers")
    return (
      <div className={tw("flex flex-row gap-10", "px-5", "overflow-hidden")}>
        {zone.elementsIds.map((transId) => (
          <FlowingTransformer key={transId} transformerId={transId} />
        ))}
      </div>
    );

  return (
    <div
      className={tw(
        "flex flex-col gap-2",
        "border border-slate-400 rounded-lg",
        "p-5",
        "overflow-hidden"
      )}
    >
      <h1 className={tw("text-xl font-semibold", "text-slate-700")}>
        {zone.name}
      </h1>

      <div className={tw("flex flex-row items-stretch gap-10 flex-wrap")}>
        {zone.elementsIds.length === 0 ? (
          <h2 className="text-lg italic text-slate-700">Nothing to show yet</h2>
        ) : (
          zone.elementsIds.map((assetId) => (
            <FlowingAsset key={assetId} assetId={assetId} />
          ))
        )}
      </div>
    </div>
  );
};

export default FlowingZone;

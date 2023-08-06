import clsx from "clsx";
import { ZonesAndTransformers } from "../flowing-assets-types";

type Props = {
  zonesAndTransformers: ZonesAndTransformers;
};

const FlowingAssets_Desktop: React.FC<Props> = ({
  zonesAndTransformers: { zones },
}) => {
  return (
    <div className={clsx("flex flex-col gap-4", "bg-slate-200", "p-3")}>
      {zones.map((zone) => (
        <div
          key={zone.id}
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
      ))}
    </div>
  );
};

export default FlowingAssets_Desktop;

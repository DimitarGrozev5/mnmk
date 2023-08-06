import clsx from "clsx";
import { Zones } from "../flowing-assets-types";

type Props = {
  zones: Zones;
};

const FlowingAssets_Desktop: React.FC<Props> = ({ zones }) => {
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

          <div
            className={clsx(
              "border border-red-500",
              "flex flex-row justify-between items-stretch gap-4"
            )}
          >
            {zone.assets.map((asset) => asset.component)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlowingAssets_Desktop;

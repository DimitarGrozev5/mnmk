import { tw } from "../../../util/tw";

type TabProps = {
  label: string;
};

const Tab: React.FC<TabProps> = ({ label }) => {
  return label;
};

type RenderElementProps = {
  index: number;
  value: number;
  onChange: (value: number) => void;
  tabLabel: React.ReactComponentElement<typeof Tab>;
  numbered: boolean;
};

export const TabRenderElement: React.FC<RenderElementProps> = ({
  index,
  value,
  onChange,
  tabLabel,
  numbered,
}) => {
  return (
    <button
      className={tw(
        "flex flex-row gap-2 items-center justify-center",
        "border border-slate-500 rounded-md",
        "px-4 py-2",
        "text-slate-500",
        "transition-all duration-200",
        value === index && "text-sky-700 bg-sky-400 border-sky-600"
      )}
      onClick={() => onChange(index)}
    >
      {numbered && (
        <span
          className={tw(
            "flex flex-col items-center justify-center",
            "w-5 h-5 rounded-full",
            "text-xs border border-slate-500 text-slate-500",
            value === index && "border-sky-600 text-sky-700"
          )}
        >
          {index + 1}
        </span>
      )}
      {tabLabel}
    </button>
  );
};

export default Tab;

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
};

export const TabRenderElement: React.FC<RenderElementProps> = ({
  index,
  value,
  onChange,
  tabLabel,
}) => {
  return (
    <button
      className={tw(
        "border border-slate-500 rounded-md",
        "px-4 py-2",
        "text-slate-500",
        "transition-all duration-200",
        value === index && "text-sky-700 bg-sky-400 border-sky-600"
      )}
      onClick={() => onChange(index)}
    >
      {tabLabel}
    </button>
  );
};

export default Tab;

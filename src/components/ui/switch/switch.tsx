import { useId } from "react";
import { tw } from "../../../util/tw";
import InputLabel from "../input-label/input-label";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

const Switch: React.FC<Props> = ({ value: checked, onChange, label }) => {
  const id = useId();
  return (
    <div
      className={tw(
        "flex flex-row items-center gap-4",
        "p-2",
        "text-slate-500",
        "cursor-pointer"
      )}
      onClick={() => onChange(!checked)}
    >
      <input
        type="checkbox"
        id={`switch-input-${id}`}
        checked={checked}
        readOnly
        className="hidden"
      />
      <div
        className={tw(
          "relative",
          "transition-all duration-200 after:transition-all after:duration-200",
          "w-7 h-3",
          "rounded-full bg-slate-400",
          "after:content-[' '] after:absolute after:-left-2 after:-top-1 after:translate-x-0",
          "after:w-5 after:h-5 after:rounded-full",
          "after:bg-slate-500",
          "after:drop-shadow-md",
          checked && "after:translate-x-6",
          checked && "after:bg-sky-600",
          checked && "bg-sky-400"
        )}
      />
      {label && <InputLabel htmlFor={`switch-input-${id}`}>{label}</InputLabel>}
    </div>
  );
};

export default Switch;

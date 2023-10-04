import { useId } from "react";
import { tw } from "../../../util/tw";
import InputLabel from "../input-label/input-label";
import { CheckIcon } from "@heroicons/react/20/solid";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

const Checkbox: React.FC<Props> = ({ value: checked, onChange, label }) => {
  const id = useId();
  return (
    <div
      className={tw(
        "relative",
        "flex flex-row items-center justify-center gap-4",
        "cursor-pointer",
        "active:scale-95"
      )}
      onClick={() => onChange(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        id={`switch-input-${id}`}
        readOnly
        className={tw(
          "appearance-none",
          "w-5 h-5",
          "border border-sky-500 rounded-md",
          "bg-sky-100"
        )}
      />
      <div
        className={tw(
          "absolute inset-0",
          "flex flex-col items-center justify-center"
        )}
      >
        <CheckIcon
          className={tw(
            "w-4 h-4",
            "text-sky-500",
            "transition-all duration-500",
            checked ? "visible" : "invisible"
          )}
        />
      </div>
      {label && <InputLabel htmlFor={`switch-input-${id}`}>{label}</InputLabel>}
    </div>
  );
};

export default Checkbox;

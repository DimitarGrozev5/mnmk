import { useId } from "react";
import { tw } from "../../../util/tw";
import InputLabel from "../input-label/input-label";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
};

const Switch: React.FC<Props> = ({ value, onChange, label }) => {
  const id = useId();
  return (
    <div
      className={tw(
        "flex flex-row items-center gap-2",
        "p-2",
        "cursor-pointer"
      )}
      onClick={() => onChange(!value)}
    >
      <input
        type="checkbox"
        id={`switch-input-${id}`}
        checked={value}
        readOnly
      />
      <InputLabel htmlFor={`switch-input-${id}`}>{label}</InputLabel>
    </div>
  );
};

export default Switch;

import { tw } from "../../../util/tw";

type Props = {
  value: string;
  label: string;
};

const RadioButton: React.FC<Props> = () => {
  return <></>;
};

export default RadioButton;

type RenderElementProps = {
  groupName: string;
  groupValue: string;
  onChange: () => void;
  value: string;
  label: string;
};

export const RadioRenderElement: React.FC<RenderElementProps> = ({
  groupName,
  groupValue,
  onChange,
  value,
  label,
}) => {
  const checked = value === groupValue;
  return (
    <div
      className={tw(
        "flex flex-row items-center gap-2",
        "transition-all duration-200",
        "p-2",
        "border border-transparent rounded-lg",
        checked && "border-sky-400",
        "cursor-pointer",
        "bg-transparent",
        checked && "bg-sky-200",
        "text-slate-500",
        checked && "text-sky-800"
      )}
      onClick={onChange}
    >
      <input
        type="radio"
        id={`radio-button-${groupName}-${value}`}
        name={groupName}
        value={value}
        onChange={onChange}
        checked={checked}
        className={tw(
          "relative",
          "cursor-pointer",
          "transition-all duration-500",
          "appearance-none",
          "w-4 h-4",
          "border border-slate-500 rounded-full bg-slate-200",
          checked && "border-sky-500 bg-sky-200",
          "after:transition-all after:duration-500 after:content-[' '] after:absolute after:inset-[2px] after:rounded-full after:bg-slate-200",
          checked && "after:bg-sky-500"
        )}
      />
      <label
        htmlFor={`radio-button-${groupName}-${value}`}
        className={tw("cursor-pointer")}
      >
        {label}
      </label>
    </div>
  );
};

import clsx from "clsx";

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
      className={clsx(
        "p-2",
        "border border-transparent",
        checked && "border-cyan-500 border-opacity-100"
      )}
    >
      <input
        type="radio"
        id={`radio-button-${groupName}-${value}`}
        name={groupName}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={`radio-button-${groupName}-${value}`}>{label}</label>
    </div>
  );
};

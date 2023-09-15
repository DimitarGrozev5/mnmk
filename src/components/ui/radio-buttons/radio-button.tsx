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
  return (
    <>
      <input
        type="radio"
        id={`radio-button-${groupName}-${value}`}
        name={groupName}
        value={value}
        onChange={onChange}
        checked={groupValue === value}
      />
      <label htmlFor={`radio-button-${groupName}-${value}`}>{label}</label>;
    </>
  );
};

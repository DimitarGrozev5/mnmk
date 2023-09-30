import { useId, useMemo } from "react";
import RadioButton, { RadioRenderElement } from "./radio-button";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  children:
    | React.ReactComponentElement<typeof RadioButton>
    | React.ReactComponentElement<typeof RadioButton>[];
};

const RadioGroup: React.FC<Props> = ({ value, onChange, children }) => {
  const groupId = useId();
  const buttons = useMemo(() => {
    const childrenArray = Array.isArray(children) ? children : [children];

    return childrenArray.map((button) => (
      <RadioRenderElement
        key={button.props.value}
        groupName={`radio-group-${groupId}`}
        groupValue={value}
        onChange={() => onChange(button.props.value)}
        value={button.props.value}
        label={button.props.label}
      />
    ));
  }, [children, groupId, onChange, value]);
  return <>{buttons}</>;
};

export default RadioGroup;

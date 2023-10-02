import { useCallback } from "react";
import {
  HeightSystemCode,
  getHS,
  heightSystems,
} from "../../../store/types/coordinate-systems";
import Option from "../../ui/select/option";
import Select from "../../ui/select/select";

type Props = {
  value: HeightSystemCode;
  onChange: (value: HeightSystemCode) => void;
};

const HeightSystemSelector: React.FC<Props> = ({ value, onChange }) => {
  const changeHSHandler = useCallback(
    (hs: string) => {
      if (!(hs in heightSystems.asObject)) return;
      onChange(hs);
    },
    [onChange]
  );

  return (
    <Select
      selectedKey={value}
      selectedCaption={getHS(value).name}
      onChange={changeHSHandler}
      label="System"
    >
      {heightSystems.asArray.map((hsCode) => {
        const hs = getHS(hsCode);
        return <Option key={hs.id} value={hs.id} caption={hs.name} />;
      })}
    </Select>
  );
};

export default HeightSystemSelector;

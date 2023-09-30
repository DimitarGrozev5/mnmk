import Option from "../../ui/select/option";
import Select from "../../ui/select/select";
import { FileColumn, fileColumns } from "./column-types";

type Props = {
  value: FileColumn;
  onChange: (value: FileColumn) => void;
};

const FileColumnSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Select
      selectedKey={value}
      selectedCaption={fileColumns[value].label}
      onChange={onChange}
    >
      {Object.entries(fileColumns).map(([key, value]) => (
        <Option key={key} value={key} caption={value.label} />
      ))}
    </Select>
  );
};

export default FileColumnSelector;

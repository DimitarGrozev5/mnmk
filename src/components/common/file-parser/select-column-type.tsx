import { useMemo } from "react";
import { FileColumnCode, fileColumns } from "../../../store/types/column-types";
import { FileType } from "../../../store/types/file-types";
import Option from "../../ui/select/option";
import Select from "../../ui/select/select";

type Props = {
  value: FileColumnCode;
  onChange: (value: FileColumnCode) => void;
  filterForFileType?: FileType;
};

const FileColumnSelector: React.FC<Props> = ({
  value,
  onChange,
  filterForFileType,
}) => {
  const columns = useMemo(
    () =>
      filterForFileType
        ? Object.entries(fileColumns).filter(
            ([, column]) =>
              column.forFileTypes.includes(filterForFileType) ||
              column.forFileTypes.length === 0
          )
        : Object.entries(fileColumns),
    [filterForFileType]
  );

  return (
    <Select
      selectedKey={value}
      selectedCaption={fileColumns[value].label}
      onChange={onChange}
    >
      {columns.map(([key, value]) => (
        <Option key={key} value={key} caption={value.label} />
      ))}
    </Select>
  );
};

export default FileColumnSelector;

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
      Object.values(fileColumns).flatMap((column) => {
        const fileTypeCheck = filterForFileType
          ? column.forFileTypes.includes(filterForFileType) ||
            column.forFileTypes.length === 0
          : true;

        return fileTypeCheck ? column : [];
      }),
    [filterForFileType]
  );

  return (
    <Select
      selectedKey={value}
      selectedCaption={fileColumns[value].label}
      onChange={onChange}
    >
      {columns.map((column) => (
        <Option key={column.id} value={column.id} caption={column.label} />
      ))}
    </Select>
  );
};

export default FileColumnSelector;

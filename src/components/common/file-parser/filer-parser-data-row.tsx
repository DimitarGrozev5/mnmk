import { useCallback, useMemo } from "react";
import { tw } from "../../../util/tw";
import { fileColumns } from "./column-types";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";
import IconButton from "../../ui/button/icon-button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fileParserActions,
  getColumns,
  getLineWithFields,
} from "../../../store/slices/file-parser-slice";

type Props = {
  rowId: string;
  index: number;
  selectField: (fieldId: string) => void;
  ignored?: boolean;
};

const FileParserDataRow: React.FC<Props> = ({
  rowId,
  index,
  selectField,
  ignored = false,
}) => {
  const line = useAppSelector((state) => getLineWithFields(state, rowId));
  const columns = useAppSelector(getColumns());

  const dispatch = useAppDispatch();
  const { removeLine } = fileParserActions;

  const fieldsValidity = useMemo(
    () =>
      line.map((field, fieldIndex) => {
        const fieldType = fileColumns[columns[fieldIndex] ?? "unset"];
        return fieldType.validate(field.value);
      }),
    [columns, line]
  );

  const rowIsValid = fieldsValidity.every((isValid) => isValid);

  const onRemoveLine = useCallback(() => {
    dispatch(removeLine(rowId));
  }, [dispatch, removeLine, rowId]);

  return (
    <tr className={tw("group/row", "w-[max-content]", "odd:bg-slate-3001")}>
      <th
        className={tw(
          "border border-slate-400 px-2",
          "text-sm text-slate-400 font-normal",
          "group-odd/row:bg-slate-300",
          !rowIsValid && !ignored && "text-red-500 border-red-500 bg-red-50"
        )}
      >
        {ignored ? null : index + 1}
      </th>
      {line.map((field, indexField) => (
        <td
          key={field.id}
          className={tw(
            "relative",
            "group/field",
            "border border-slate-300 px-3",
            "text-slate-800",
            ignored && "text-slate-400 font-normal",
            "group-odd/row:bg-slate-300",
            !fieldsValidity[indexField] && !ignored && "text-red-500"
          )}
        >
          {field.value}
          <span
            className={tw(
              "absolute right-1 inset-y-0",
              "flex flex-col justify-center",
              "transition-all duration-500",
              "opacity-0 invisible",
              "group-hover/field:opacity-100 group-hover/field:visible",
              ignored && "group-hover/field:hidden"
            )}
          >
            <IconButton
              label="Delete line"
              onClick={() => selectField(field.id)}
            >
              <PencilSquareIcon className="w-4 h-4 text-sky-500" />
            </IconButton>
          </span>
        </td>
      ))}
      {columns.length > line.length &&
        Array(columns.length - line.length)
          .fill(0)
          .map((_, indexField) => <td key={indexField} />)}
      <td
        className={tw(
          "flex flex-col items-center justify-center",
          "transition-all duration-500",
          "opacity-0 invisible",
          "group-hover/row:opacity-100 group-hover/row:visible",
          ignored && "group-hover/row:hidden"
        )}
      >
        <IconButton onClick={onRemoveLine} label="Delete line">
          <XMarkIcon className="w-6 h-6 text-sky-500" />
        </IconButton>
      </td>
    </tr>
  );
};

export default FileParserDataRow;

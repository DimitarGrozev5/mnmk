import React, { useCallback, useMemo } from "react";
import { tw } from "../../../util/tw";
import { fileColumns } from "./column-types";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
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
  addFieldAtIndex: (index: number) => void;
  ignored?: boolean;
};

const FileParserDataRow: React.FC<Props> = ({
  rowId,
  index,
  selectField,
  addFieldAtIndex,
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
        <React.Fragment key={field.id}>
          <td
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
                label="Edit field"
                onClick={() => selectField(field.id)}
              >
                <PencilSquareIcon className="w-4 h-4 text-sky-500" />
              </IconButton>
            </span>
          </td>
          <th className="relative group/add">
            <span
              className={tw(
                "absolute top-0 -left-1 -right-1 bottom-0",
                "flex flex-col items-center justify-center",
                "transition-all duration-500",
                "opacity-0 invisible",
                "group-hover/add:opacity-100 group-hover/add:visible",
                ignored && "group-hover/row:hidden"
              )}
            >
              <IconButton
                label="Add field"
                onClick={() => addFieldAtIndex(indexField + 1)}
              >
                <PlusCircleIcon className="w-5 h-5 text-sky-500" />
              </IconButton>
            </span>
          </th>
        </React.Fragment>
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

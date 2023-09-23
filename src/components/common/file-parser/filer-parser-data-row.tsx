import { useCallback, useEffect, useMemo, useState } from "react";
import { tw } from "../../../util/tw";
import { FileColumn, fileColumns } from "./column-types";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";
import IconButton from "../../ui/button/icon-button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fileParserActions,
  getLineWithFields,
} from "../../../store/slices/file-parser-slice";
import Modal from "../../ui/modal/modal";

type Props = {
  rowId: string;
  index: number;
  fields: FileColumn[];
};

const FileParserDataRow: React.FC<Props> = ({ rowId, index, fields }) => {
  const line = useAppSelector((state) => getLineWithFields(state, rowId));
  const dispatch = useAppDispatch();
  const { removeLine } = fileParserActions;

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  useEffect(() => {
    selectedFieldId !== null &&
      setEditValue(
        line.find((field) => field.id === selectedFieldId)?.value ?? ""
      );
  }, [line, selectedFieldId]);

  const fieldsValidity = useMemo(
    () =>
      line.map((field) => {
        const fieldType = fileColumns[fields[index] ?? "unset"];
        return fieldType.validate(field.value);
      }),
    [fields, index, line]
  );

  const rowIsValid = fieldsValidity.every((isValid) => isValid);

  const onRemoveLine = useCallback(() => {
    dispatch(removeLine(rowId));
  }, [dispatch, removeLine, rowId]);

  return (
    <>
      <tr className={tw("group/row", "w-[max-content]", "odd:bg-slate-3001")}>
        <th
          className={tw(
            "border border-slate-400 px-2",
            "text-sm text-slate-400 font-normal",
            "group-odd/row:bg-slate-300",
            !rowIsValid && "text-red-500 border-red-500 bg-red-50"
          )}
        >
          {index + 1}
        </th>
        {line.map((field, indexField) => (
          <td
            key={field.id}
            className={tw(
              "relative",
              "group/field",
              "border border-slate-300 px-3",
              "text-slate-800",
              "group-odd/row:bg-slate-300",
              !fieldsValidity[indexField] && "text-red-500"
            )}
          >
            {field.value}
            <div
              className={tw(
                "absolute right-1 inset-y-0",
                "flex flex-col justify-center",
                "transition-all duration-500",
                "opacity-0 invisible",
                "group-hover/field:opacity-100 group-hover/field:visible"
              )}
            >
              <IconButton
                label="Delete line"
                onClick={() => setSelectedFieldId(field.id)}
              >
                <PencilSquareIcon className="w-4 h-4 text-sky-500" />
              </IconButton>
            </div>
          </td>
        ))}
        <td
          className={tw(
            "flex flex-col items-center justify-center",
            "transition-all duration-500",
            "opacity-0 invisible",
            "group-hover/row:opacity-100 group-hover/row:visible"
          )}
        >
          <IconButton onClick={onRemoveLine} label="Delete line">
            <XMarkIcon className="w-6 h-6 text-sky-500" />
          </IconButton>
        </td>
      </tr>

      <Modal
        show={selectedFieldId !== null}
        onClose={() => setSelectedFieldId(null)}
      >
        <div
          className={tw(
            "self-stretch",
            "flex flex-row justify-between items-center gap-2",
            "border border-red-500"
          )}
        >
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default FileParserDataRow;

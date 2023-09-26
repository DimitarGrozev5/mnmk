import { useCallback, useEffect, useMemo, useState } from "react";
import { Divider, dividers } from "./dividers";
import { tw } from "../../../util/tw";
import { FileColumn } from "./column-types";
import FileColumnSelector from "./select-column-type";
import { produce } from "immer";
import FileParserDataRow from "./filer-parser-data-row";
import {
  fileParserActions,
  getAllLinesIds,
} from "../../../store/slices/file-parser-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import FileParserEditFieldModal from "./edit-field-modal";

type Props = {
  fields: FileColumn[];
  setFields: React.Dispatch<React.SetStateAction<FileColumn[]>>;
  lines: string[];
  divider: Divider;
  ignoreFirstLine: boolean;
};

const FileParser: React.FC<Props> = ({
  fields,
  setFields,
  lines,
  divider,
  ignoreFirstLine,
}) => {
  const linesIds = useAppSelector(getAllLinesIds());

  const dispatch = useAppDispatch();
  const { setAllLines } = fileParserActions;

  const [parsedLines, maxLineLen, firstLine] = useMemo(() => {
    let maxLineLen = 0;

    const parsedLines = lines.map((line) => {
      const parsedLine = line.split(dividers[divider].regex);
      maxLineLen = Math.max(maxLineLen, parsedLine.length);
      return parsedLine;
    });

    let firstLine: string[] = [];
    if (ignoreFirstLine) {
      firstLine = parsedLines.shift() ?? [];
    }

    return [parsedLines, maxLineLen, firstLine];
  }, [divider, ignoreFirstLine, lines]);

  useEffect(() => {
    dispatch(setAllLines(parsedLines));
  }, [dispatch, parsedLines, setAllLines]);

  useEffect(() => {
    setFields(Array(maxLineLen).fill("unset"));
  }, [divider, maxLineLen, setFields]);

  const onChangeField = useCallback(
    (index: number) => (fieldKey: FileColumn) => {
      setFields(
        produce((draft) => {
          draft[index] = fieldKey;
        })
      );
    },
    [setFields]
  );

  // Edit fields
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  return (
    <div
      className={tw(
        "flex-1",
        "border border-slate-400 bg-slate-200",
        "p-2",
        "flex flex-col items-start",
        "text-slate-500 text-clip text-center",
        "overflow-auto"
      )}
    >
      <table
        className={tw("border-separate border-spacing-x-2 border-spacing-y-1")}
      >
        <thead>
          <tr>
            <th />
            {fields.map((field, indexField) => (
              <th key={indexField}>
                {
                  <FileColumnSelector
                    value={field}
                    onChange={onChangeField(indexField)}
                  />
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {firstLine.length > 0 && (
            <tr className={tw("w-[max-content]", "odd:bg-slate-300")}>
              <th />
              {firstLine.map((field, indexField) => (
                <th
                  key={`first-line-${indexField}`}
                  className={tw(
                    "border border-slate-300 px-3",
                    "text-slate-400 font-normal"
                  )}
                >
                  {field}
                </th>
              ))}
            </tr>
          )}
          {linesIds.map((rowId, indexLine) => (
            <FileParserDataRow
              key={indexLine}
              rowId={rowId}
              index={indexLine}
              fields={fields}
              selectField={setSelectedFieldId}
            />
          ))}
        </tbody>
      </table>

      <FileParserEditFieldModal
        selectedFieldId={selectedFieldId}
        setSelectedFieldId={setSelectedFieldId}
      />
    </div>
  );
};

export default FileParser;

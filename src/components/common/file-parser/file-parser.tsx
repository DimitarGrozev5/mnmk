import React, { useCallback, useState } from "react";
import { tw } from "../../../util/tw";
import FileColumnSelector from "./select-column-type";
import FileParserDataRow from "./filer-parser-data-row";
import {
  fileParserActions,
  getAllLinesIds,
  getColumns,
  getFileType,
  getIgnoreFirstLine,
  getStationsArray,
} from "../../../store/slices/file-parser-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import FileParserEditFieldModal from "./edit-field-modal";
import FileParserAddFieldModal from "./add-field-modal";
import { FileColumnCode } from "../../../store/types/column-types";

const FileParser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setColumn: setField } = fileParserActions;

  const linesIds = useAppSelector(getAllLinesIds());
  const columns = useAppSelector(getColumns());
  const ignoreFirstLine = useAppSelector(getIgnoreFirstLine());
  const fileType = useAppSelector(getFileType());
  const stationsArray = useAppSelector(getStationsArray);

  const firstLine = ignoreFirstLine ? linesIds[0] : undefined;

  const onChangeField = useCallback(
    (index: number) => (fieldKey: FileColumnCode) => {
      dispatch(setField({ index, type: fieldKey }));
    },
    [dispatch, setField]
  );

  // Edit fields
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [addFieldAtIndex, setAddFieldAtIndex] = useState<{
    lineId: string;
    atIndex: number;
  } | null>(null);
  const setAddFieldAtIndexCallback = useCallback(
    (rowId: string) => (atIndex: number) => {
      setAddFieldAtIndex({ lineId: rowId, atIndex });
    },
    []
  );

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
            {fileType === "ts" && stationsArray.tsStations.length > 0 && <th />}
            <th />
            <th />
            {columns.map((column, indexField) => (
              <React.Fragment key={indexField}>
                <th>
                  {
                    <FileColumnSelector
                      value={column}
                      onChange={onChangeField(indexField)}
                      filterForFileType={fileType}
                    />
                  }
                </th>
                <th />
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {firstLine !== undefined && (
            <FileParserDataRow
              rowId={firstLine}
              index={0}
              selectField={setSelectedFieldId}
              addFieldAtIndex={setAddFieldAtIndexCallback("0")}
              ignored
            />
          )}
          {linesIds.slice(+!!firstLine).map((rowId, indexLine) => (
            <FileParserDataRow
              key={indexLine}
              rowId={rowId}
              index={indexLine}
              selectField={setSelectedFieldId}
              addFieldAtIndex={setAddFieldAtIndexCallback(rowId)}
            />
          ))}
        </tbody>
      </table>

      <FileParserEditFieldModal
        selectedFieldId={selectedFieldId}
        setSelectedFieldId={setSelectedFieldId}
      />

      <FileParserAddFieldModal
        forRowId={addFieldAtIndex?.lineId}
        atIndex={addFieldAtIndex?.atIndex}
        onClose={() => setAddFieldAtIndex(null)}
      />
    </div>
  );
};

export default FileParser;

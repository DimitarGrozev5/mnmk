import React, { useCallback, useState } from "react";
import { tw } from "../../../util/tw";
import { FileColumn } from "./column-types";
import FileColumnSelector from "./select-column-type";
import FileParserDataRow from "./filer-parser-data-row";
import {
  fileParserActions,
  getAllLinesIds,
  getColumns,
  getIgnoreFirstLine,
} from "../../../store/slices/file-parser-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import FileParserEditFieldModal from "./edit-field-modal";
import Modal from "../../ui/modal/modal";

const FileParser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setColumn: setField } = fileParserActions;

  const linesIds = useAppSelector(getAllLinesIds());
  const columns = useAppSelector(getColumns());
  const ignoreFirstLine = useAppSelector(getIgnoreFirstLine());

  const firstLine = ignoreFirstLine ? linesIds[0] : undefined;

  const onChangeField = useCallback(
    (index: number) => (fieldKey: FileColumn) => {
      dispatch(setField({ index, type: fieldKey }));
    },
    [dispatch, setField]
  );

  // Edit fields
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [addFieldAtIndex, setAddFieldAtIndex] = useState<number | null>(null);

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
            {columns.map((field, indexField) => (
              <React.Fragment key={indexField}>
                <th>
                  {
                    <FileColumnSelector
                      value={field}
                      onChange={onChangeField(indexField)}
                    />
                  }
                </th>
                <th></th>
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
              addFieldAtIndex={setAddFieldAtIndex}
              ignored
            />
          )}
          {linesIds.slice(+!!firstLine).map((rowId, indexLine) => (
            <FileParserDataRow
              key={indexLine}
              rowId={rowId}
              index={indexLine}
              selectField={setSelectedFieldId}
              addFieldAtIndex={setAddFieldAtIndex}
            />
          ))}
        </tbody>
      </table>

      <FileParserEditFieldModal
        selectedFieldId={selectedFieldId}
        setSelectedFieldId={setSelectedFieldId}
      />

      <Modal
        show={addFieldAtIndex !== null}
        onClose={() => setAddFieldAtIndex(null)}
        compact
      >
        asd
      </Modal>
    </div>
  );
};

export default FileParser;

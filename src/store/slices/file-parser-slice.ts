import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { RootState } from "../store";
import {
  Divider,
  dividers,
} from "../../components/common/file-parser/dividers";
import { FileColumn } from "../../components/common/file-parser/column-types";
import { Draft } from "immer";

type FileParserState = {
  linesArray: string[];
  lines: Record<string, string[]>;
  dataFields: Record<string, string>;
  divider: Divider;
  columns: FileColumn[];
};

const initialState: FileParserState = {
  linesArray: [],
  lines: {},
  dataFields: {},
  divider: "tab",
  columns: [],
};

export const fileParserSlice = createSlice({
  name: "zonesAndTransformers",
  initialState,
  reducers: {
    setAllLines: (
      state,
      action: PayloadAction<{ rawLines: string[]; divider: Divider }>
    ) => {
      const { rawLines, divider } = action.payload;

      // Parse raw lines
      createStateFromRawData(state, rawLines, divider);
    },
    clearAllData: (state) => {
      state.linesArray = [];
      state.lines = {};
      state.dataFields = {};
      state.divider = "tab";
      state.columns = [];
    },
    changeDivider: (state, action: PayloadAction<Divider>) => {
      const divider = action.payload;

      // Recombine data
      const oldDivider = state.divider;
      const rawData = state.linesArray.map((lineId) =>
        state.lines[lineId]
          .map((fieldId) => state.dataFields[fieldId])
          .join(dividers[oldDivider].regex)
      );

      // Create new data
      createStateFromRawData(state, rawData, divider);
    },
    setColumn: (
      state,
      action: PayloadAction<{ index: number; type: FileColumn }>
    ) => {
      const { index, type } = action.payload;
      state.columns[index] = type;
    },

    removeLine: (state, action: PayloadAction<string>) => {
      const lineId = action.payload;
      state.linesArray = state.linesArray.filter((line) => {
        if (line === lineId) {
          state.lines[lineId].forEach((fieldId) => {
            delete state.dataFields[fieldId];
          });
          return false;
        }
        return true;
      });
      delete state.lines[lineId];
    },
    editField: (
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      const { id, value } = action.payload;
      state.dataFields[id] = value;

      if (value.length === 0) {
        delete state.dataFields[id];

        Object.entries({ ...state.lines }).forEach(([lineId, line]) => {
          state.lines[lineId] = line.filter((fieldId) => fieldId !== id);
          if (state.lines[lineId].length === 0) {
            delete state.lines[lineId];
          }
        });
      }
    },
  },
});

function createStateFromRawData(
  state: Draft<FileParserState>,
  rawData: string[],
  divider: Divider
) {
  const parsedLines = rawData.map((line) => {
    const parsedLine = line.split(dividers[divider].regex);
    return parsedLine;
  });

  const linesArray: string[] = [];
  const dataFields: Record<string, string> = {};
  const lines: Record<string, string[]> = parsedLines.reduce((result, line) => {
    const lineId = nanoid();
    const fieldIds = line.map((field) => {
      const id = nanoid();
      dataFields[id] = field;
      return id;
    });

    linesArray.push(lineId);

    return { ...result, [lineId]: fieldIds };
  }, {} as Record<string, string[]>);

  const maxFields = Math.max(...parsedLines.map((line) => line.length));
  const columns = Array(maxFields).fill("unset");

  state.linesArray = linesArray;
  state.dataFields = dataFields;
  state.lines = lines;
  state.columns = columns;
  state.divider = divider;
}

const actions = fileParserSlice.actions;
export default fileParserSlice.reducer;

// Selectors
export const getDivider = () => (state: RootState) => state.fileParser.divider;
export const getColumns = () => (state: RootState) => state.fileParser.columns;

export const getAllLinesIds = () => (state: RootState) =>
  state.fileParser.linesArray;

export const getLineById = (id: string) => (state: RootState) =>
  state.fileParser.lines[id];

export const getLineWithFields1 = (id: string) => (state: RootState) =>
  state.fileParser.lines[id].map((fieldId) => ({
    id: fieldId,
    value: state.fileParser.dataFields[fieldId],
  }));

export const getFieldById = (id: string) => (state: RootState) =>
  state.fileParser.dataFields[id];

export const getLineWithFields = createSelector(
  [
    (state: RootState) => state.fileParser.lines,
    (state: RootState) => state.fileParser.dataFields,
    (_: RootState, id: string) => id,
  ],
  (lines, fields, id: string) =>
    lines[id].map((fieldId) => ({
      id: fieldId,
      value: fields[fieldId],
    }))
);

// Action creators are generated for each case reducer function
export const fileParserActions = {
  ...actions,
};

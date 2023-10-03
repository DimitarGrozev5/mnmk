import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { RootState } from "../store";
import { Divider, dividers } from "../types/dividers";
import { Draft } from "immer";
import { FileColumnCode, fileColumns } from "../types/column-types";
import { FileType } from "../types/file-types";
import {
  CoordinateSystemCode,
  HeightSystemCode,
} from "../types/coordinate-systems";

type FileParserState = {
  linesArray: string[];
  lines: Record<string, string[]>;
  dataFields: Record<string, string>;
  divider: Divider;
  columns: FileColumnCode[];
  ignoreFirstLine: boolean;

  fileType: FileType;
  coordinateSystem: CoordinateSystemCode;
  heightSystem: HeightSystemCode;

  tsStations: number[];
};

const initialState: FileParserState = {
  linesArray: [],
  lines: {},
  dataFields: {},
  divider: "tab",
  columns: [],
  ignoreFirstLine: false,

  fileType: "control",
  coordinateSystem: ["bgs", "cad", "default"],
  heightSystem: "evrs",

  tsStations: [],
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
      state.linesArray = [...initialState.linesArray];
      state.lines = { ...initialState.lines };
      state.dataFields = { ...initialState.dataFields };
      state.divider = initialState.divider;
      state.columns = [...initialState.columns];
      state.ignoreFirstLine = initialState.ignoreFirstLine;
      state.fileType = initialState.fileType;
      state.coordinateSystem = initialState.coordinateSystem;
      state.heightSystem = initialState.heightSystem;
      state.tsStations = [...initialState.tsStations];
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
      action: PayloadAction<{ index: number; type: FileColumnCode }>
    ) => {
      const { index, type } = action.payload;

      // If another column is of the same type and is single use unset it
      const sameColumnIndex = state.columns.indexOf(type);
      if (sameColumnIndex > -1 && fileColumns[type].singleUse) {
        state.columns[sameColumnIndex] = "unset";
      }

      state.columns[index] = type;

      // Calculate stations for ts
      if (state.fileType === "ts" && state.columns.includes("stationName")) {
        const stColumnIndex = state.columns.indexOf("stationName");

        // Get all fields
        const lines = state.linesArray.map((lineId) =>
          state.lines[lineId].map((fieldId) => state.dataFields[fieldId])
        );

        const stationsArray = [0];

        lines.slice(1).forEach((line, index) => {
          const lastStationIndex = stationsArray.slice(-1)[0];
          const lastStationName = lines[lastStationIndex][stColumnIndex];

          console.log(lastStationIndex, lastStationName);

          if (lastStationName !== line[stColumnIndex]) {
            stationsArray.push(index + 1);
          }
        });

        state.tsStations = stationsArray;
      }
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
    addField: (
      state,
      action: PayloadAction<{ rowId: string; atIndex: number; value: string }>
    ) => {
      const { rowId, atIndex, value } = action.payload;
      const fieldId = nanoid();

      state.dataFields[fieldId] = value;
      state.lines[rowId].splice(atIndex, 0, fieldId);
    },

    toggleIgnoreFirstLine: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.ignoreFirstLine =
        action.payload !== undefined ? action.payload : !state.ignoreFirstLine;
    },
    setFileType: (state, action: PayloadAction<FileType>) => {
      state.fileType = action.payload;
    },
    setCoordinateSystem: (
      state,
      action: PayloadAction<CoordinateSystemCode>
    ) => {
      state.coordinateSystem = [...action.payload];
    },
    setHeightSystem: (state, action: PayloadAction<HeightSystemCode>) => {
      state.heightSystem = action.payload;
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
  state.tsStations = [];
}

const actions = fileParserSlice.actions;
export default fileParserSlice.reducer;

// Selectors
export const getIgnoreFirstLine = () => (state: RootState) =>
  state.fileParser.ignoreFirstLine;
export const getFileType = () => (state: RootState) =>
  state.fileParser.fileType;
export const getCoordinateSystem = () => (state: RootState) =>
  state.fileParser.coordinateSystem;
export const getHeightSystem = () => (state: RootState) =>
  state.fileParser.heightSystem;
export const getDivider = () => (state: RootState) => state.fileParser.divider;
export const getColumns = () => (state: RootState) => state.fileParser.columns;
export const getStationsArray = () => (state: RootState) =>
  state.fileParser.tsStations;

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

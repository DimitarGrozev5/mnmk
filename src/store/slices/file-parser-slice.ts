import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { RootState } from "../store";

type FileParserState = {
  linesArray: string[];
  lines: Record<string, string[]>;
  fields: Record<string, string>;
};

const initialState: FileParserState = {
  linesArray: [],
  lines: {},
  fields: {},
};

export const fileParserSlice = createSlice({
  name: "zonesAndTransformers",
  initialState,
  reducers: {
    setAllLines: (state, action: PayloadAction<string[][]>) => {
      const linesArray: string[] = [];
      const fields: Record<string, string> = {};
      const lines: Record<string, string[]> = action.payload.reduce(
        (result, line) => {
          const lineId = nanoid();
          const fieldIds = line.map((field) => {
            const id = nanoid();
            fields[id] = field;
            return id;
          });

          linesArray.push(lineId);

          return { ...result, [lineId]: fieldIds };
        },
        {} as Record<string, string[]>
      );

      state.linesArray = linesArray;
      state.fields = fields;
      state.lines = lines;
    },
    removeLine: (state, action: PayloadAction<string>) => {
      const lineId = action.payload;
      state.linesArray = state.linesArray.filter((line) => {
        if (line === lineId) {
          state.lines[lineId].forEach((fieldId) => {
            delete state.fields[fieldId];
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
      state.fields[id] = value;

      if (value.length === 0) {
        delete state.fields[id];

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

const actions = fileParserSlice.actions;
export default fileParserSlice.reducer;

// Selectors
export const getAllLinesIds = () => (state: RootState) =>
  state.fileParser.linesArray;

export const getLineById = (id: string) => (state: RootState) =>
  state.fileParser.lines[id];

export const getLineWithFields1 = (id: string) => (state: RootState) =>
  state.fileParser.lines[id].map((fieldId) => ({
    id: fieldId,
    value: state.fileParser.fields[fieldId],
  }));

export const getFieldById = (id: string) => (state: RootState) =>
  state.fileParser.fields[id];

export const getLineWithFields = createSelector(
  [
    (state: RootState) => state.fileParser.lines,
    (state: RootState) => state.fileParser.fields,
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

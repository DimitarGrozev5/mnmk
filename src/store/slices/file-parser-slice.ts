import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
  },
});

const actions = fileParserSlice.actions;
export default fileParserSlice.reducer;

// Selectors
export const getAllLinesIds = () => (state: RootState) =>
  state.fileParser.linesArray;

export const getLineById = (id: string) => (state: RootState) =>
  state.fileParser.lines[id];

export const getLineWithFields = (id: string) => (state: RootState) =>
  state.fileParser.lines[id].map((fieldId) => state.fileParser.fields[fieldId]);

// Action creators are generated for each case reducer function
export const fileParserActions = {
  ...actions,
};

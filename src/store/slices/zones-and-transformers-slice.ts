import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ZonesAndTransformers } from "./flowing-assets-types";
import { mockZones } from "../../components/flowing-assets/mock-zones";

const initialState: ZonesAndTransformers = mockZones();

export const zonesAndTransformersSlice = createSlice({
  name: "zonesAndTransformers",
  initialState,
  reducers: {
    test: (state, action: PayloadAction<number>) => {},
  },
});

// Action creators are generated for each case reducer function
export const zonesActions = zonesAndTransformersSlice.actions;

export default zonesAndTransformersSlice.reducer;

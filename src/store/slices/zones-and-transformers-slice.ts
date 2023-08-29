import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  ElementId,
  ElementRect,
  ZonesAndTransformers,
} from "./flowing-assets-types";
import { mockZones } from "../../components/flowing-assets/mock-zones";

const initialState: ZonesAndTransformers = mockZones();

export const zonesAndTransformersSlice = createSlice({
  name: "zonesAndTransformers",
  initialState,
  reducers: {
    // test: (state, action: PayloadAction<number>) => {},
    setElementRect: (
      state,
      action: PayloadAction<{
        rect: ElementRect | undefined;
        id: ElementId;
        type: keyof Pick<ZonesAndTransformers, "assets" | "transformers">;
      }>
    ) => {
      const { rect, id, type } = action.payload;
      state[type][id].rect = rect;
    },
    setHoveredElementId: (state, action: PayloadAction<ElementId | null>) => {
      state.hoveredElementId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const zonesActions = zonesAndTransformersSlice.actions;

export default zonesAndTransformersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  ElementId,
  ElementRect,
  ZonesAndTransformers,
} from "./flowing-assets-types";
import { mockZones } from "../../components/flowing-assets/mock-zones";
import type { RootState } from "../store";

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
      // Update rect
      const { rect, id, type } = action.payload;
      state[type][id].rect = rect;

      // Recalculate zone dx and dy - distances between elements and between rows in the zone
      const zone = state.zoneIds
        .map((z) => state.zones[z])
        .find((zone) => zone.elementsIds.includes(id));

      if (zone) {
        const zoneElements = zone.elementsIds.map((eId) => state[type][eId]);
        const dx =
          zoneElements.length <= 1
            ? 0
            : (zoneElements[1].rect?.left ?? 0) -
              (zoneElements[0].rect?.left ?? 0);
        const dy =
          zoneElements.length <= 1
            ? 0
            : zoneElements.slice(1).reduce((acc, e) => {
                if (acc !== 0) return acc;

                const dTop =
                  (e.rect?.top ?? 0) - (zoneElements[0].rect?.top ?? 0);
                return dTop;
              }, 0);

        state.zones[zone.id].dx = dx;
        state.zones[zone.id].dy = dy;
      }
    },
    setHoveredElementId: (state, action: PayloadAction<ElementId | null>) => {
      state.hoveredElementId = action.payload;
    },
    setConnectedToHoveredIds: (state, action: PayloadAction<ElementId[]>) => {
      state.connectedToHoveredIds = [...action.payload];
    },
    setDragging: (state, action: PayloadAction<boolean>) => {
      state.dragging = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const zonesActions = zonesAndTransformersSlice.actions;

export default zonesAndTransformersSlice.reducer;

// Selectors
export const hoveredIsAssetSelector = (state: RootState) => {
  const hovered = state.zonesAndTransformers.hoveredElementId;
  if (hovered === null) return false;

  const asset = state.zonesAndTransformers.assets[hovered];
  return asset !== undefined;
};

export const hoveredITransformerSelector = (state: RootState) => {
  const hovered = state.zonesAndTransformers.hoveredElementId;
  if (hovered === null) return false;

  const trans = state.zonesAndTransformers.transformers[hovered];
  return trans !== undefined;
};

export const getElementRectSelector = (id: string) => (state: RootState) =>
  state.zonesAndTransformers.assets[id]?.rect ??
  state.zonesAndTransformers.transformers[id]?.rect;

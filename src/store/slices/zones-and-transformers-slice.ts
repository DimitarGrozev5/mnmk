import { createSlice } from "@reduxjs/toolkit";
import type { AnyAction, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import {
  Asset,
  ElementId,
  ElementRect,
  ZoneId,
  ZoneType,
  ZonesAndTransformers,
} from "./flowing-assets-types";
import type { RootState } from "../store";

const assetFiles: Map<ElementId, File> = new Map();

// const initialState: ZonesAndTransformers = mockZones();
const initialState: ZonesAndTransformers = {
  assets: {
    "0": { id: "0", type: "add_new", data: "add_new", rect: undefined },
  },
  transformers: {},
  zoneIds: ["1", "2", "3", "4", "5"],
  zones: {
    "1": {
      id: "1",
      name: "Raw files",
      elementsIds: ["0"],
      type: "assets",
      dx: 0,
      dy: 0,
      itemsPerRow: 0,
    },
    "2": {
      id: "2",
      name: "Trans1",
      elementsIds: [],
      type: "transformers",
      dx: 0,
      dy: 0,
      itemsPerRow: 0,
    },
    "3": {
      id: "3",
      name: "Source data",
      elementsIds: [],
      type: "assets",
      dx: 0,
      dy: 0,
      itemsPerRow: 0,
    },
    "4": {
      id: "4",
      name: "Trans2",
      elementsIds: [],
      type: "transformers",
      dx: 0,
      dy: 0,
      itemsPerRow: 0,
    },
    "5": {
      id: "5",
      name: "Results",
      elementsIds: [],
      type: "assets",
      dx: 0,
      dy: 0,
      itemsPerRow: 0,
    },
  },
  hoveredElementId: null,
  connectedToHoveredIds: [],
  dragging: false,
};

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
        type: ZoneType;
      }>
    ) => {
      // Update rect
      const { rect, id, type } = action.payload;
      state[type][id].rect = rect;

      // Recalculate zone dx and dy - distances between elements and between rows in the zone
      // Recalculate items per row - number of elements per row in the zone
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

        const yOfFirst = zoneElements[0].rect?.top ?? 0;
        const indexOfSecondRow = zoneElements.findIndex(
          (element) => (element.rect?.top ?? 0) > yOfFirst
        );

        state.zones[zone.id].dx = dx;
        state.zones[zone.id].dy = dy;

        if (indexOfSecondRow >= 0)
          state.zones[zone.id].itemsPerRow = indexOfSecondRow;
      }
    },
    setHoveredElementId: (state, action: PayloadAction<ElementId | null>) => {
      state.hoveredElementId = action.payload;
    },
    setConnectedToHoveredIds: (state, action: PayloadAction<ElementId[]>) => {
      state.connectedToHoveredIds = [...action.payload];
    },
    addAssetAction: (
      state,
      action: PayloadAction<{ asset: Asset; forZone: ZoneId }>
    ) => {
      state.assets[action.payload.asset.id] = action.payload.asset;
      state.zones[action.payload.forZone].elementsIds.push(
        action.payload.asset.id
      );
    },
  },
});

const actions = zonesAndTransformersSlice.actions;
export default zonesAndTransformersSlice.reducer;

// Selectors
export const hoveredIsAssetSelector = (state: RootState) => {
  const hovered = state.zonesAndTransformers.hoveredElementId;
  if (hovered === null) return false;

  const asset = state.zonesAndTransformers.assets[hovered];
  return asset !== undefined;
};

export const hoveredIsTransformerSelector = (state: RootState) => {
  const hovered = state.zonesAndTransformers.hoveredElementId;
  if (hovered === null) return false;

  const trans = state.zonesAndTransformers.transformers[hovered];
  return trans !== undefined;
};

export const getAsset = (id: ElementId) => (state: RootState) =>
  state.zonesAndTransformers.assets[id];

export const getAssetFile = (id: ElementId) => assetFiles.get(id);

export const getElementRectSelector = (id: ElementId) => (state: RootState) =>
  state.zonesAndTransformers.assets[id]?.rect ??
  state.zonesAndTransformers.transformers[id]?.rect;

// Thunks

const addAssetToZone =
  (data: {
    asset: Asset & { file: File };
    forZone: ZoneId;
  }): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const { file, ...asset } = data.asset;
    assetFiles.set(asset.id, file);
    dispatch(actions.addAssetAction({ asset, forZone: data.forZone }));
  };

// Action creators are generated for each case reducer function
export const zonesActions = {
  addAssetToZone,
  ...zonesAndTransformersSlice.actions,
};

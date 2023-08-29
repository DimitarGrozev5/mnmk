import { type ZonesAndTransformers } from "../../store/slices/flowing-assets-types";

export const mockZones = (): ZonesAndTransformers => {
  return {
    zoneIds: ["1", "2", "3", "4", "5"],
    zones: {
      "1": {
        id: "1",
        name: "Test1",
        elementsIds: ["1", "2", "3"],
        type: "assets",
      },
      "2": {
        id: "2",
        name: "",
        elementsIds: ["4", "5"],
        type: "transformers",
      },
      "3": {
        id: "3",
        name: "Test2",
        elementsIds: ["6", "7", "8"],
        type: "assets",
      },
      "4": {
        id: "4",
        name: "",
        elementsIds: ["9", "10", "11", "12"],
        type: "transformers",
      },
      "5": {
        id: "5",
        name: "Test3",
        elementsIds: ["13", "14", "15"],
        type: "assets",
      },
    },
    assets: {
      "1": { id: "1", type: "test", title: "1", rect: undefined },
      "2": { id: "2", type: "test", title: "2", rect: undefined },
      "3": { id: "3", type: "test", title: "3", rect: undefined },
      "6": { id: "6", type: "test", title: "6", rect: undefined },
      "7": { id: "7", type: "test", title: "7", rect: undefined },
      "8": { id: "8", type: "test", title: "8", rect: undefined },
      "13": { id: "13", type: "test", title: "13", rect: undefined },
      "14": { id: "14", type: "test", title: "14", rect: undefined },
      "15": { id: "15", type: "test", title: "15", rect: undefined },
    },
    transformers: {
      "4": { id: "4", type: "test", sourcesIds: ["1"], result: "6", title: "4", rect: undefined },
      "5": { id: "5", type: "test", sourcesIds: ["2"], result: "7", title: "5", rect: undefined },
      "9": { id: "9", type: "test", sourcesIds: ["6", "7"], result: "13", title: "9", rect: undefined },
      "10": { id: "10", type: "test", sourcesIds: ["6", "7"], result: "8", title: "10", rect: undefined },
      "11": { id: "11", type: "test", sourcesIds: ["6", "7"], result: "14", title: "11", rect: undefined },
      "12": { id: "12", type: "test", sourcesIds: ["8"], result: "15", title: "12", rect: undefined },
    },
    hoveredElementId: null,
    connectedToHoveredIds: [],
  };
};

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
        elementsIds: ["0", "10", "11", "12"],
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
      "1": { id: "1", type: "test" },
      "2": { id: "2", type: "test" },
      "3": { id: "3", type: "test" },
      "6": { id: "6", type: "test" },
      "7": { id: "7", type: "test" },
      "8": { id: "8", type: "test" },
      "13": { id: "13", type: "test" },
      "14": { id: "14", type: "test" },
      "15": { id: "15", type: "test" },
    },
    transformers: {
      "4": { id: "4", type: "test", sourcesIds: ["1"], result: "6" },
      "5": { id: "5", type: "test", sourcesIds: ["2"], result: "7" },
      "9": { id: "9", type: "test", sourcesIds: ["6", "7"], result: "13" },
      "10": { id: "10", type: "test", sourcesIds: ["6", "7"], result: "8" },
      "11": { id: "11", type: "test", sourcesIds: ["6", "7"], result: "14" },
      "12": { id: "12", type: "test", sourcesIds: ["8"], result: "15" },
    },
  };
};

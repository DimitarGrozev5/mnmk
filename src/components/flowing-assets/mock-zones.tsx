import { type ZonesAndTransformers } from "./flowing-assets-types";
import TestAsset from "./test-components/test-asset";

export const mockZones = (): ZonesAndTransformers => {
  const asset1 = { id: "1", component: <TestAsset>TestAsset1</TestAsset> };
  const asset2 = { id: "2", component: <TestAsset>TestAsset2</TestAsset> };
  const asset3 = { id: "3", component: <TestAsset>TestAsset3</TestAsset> };
  const asset4 = { id: "4", component: <TestAsset>TestAsset4</TestAsset> };
  const asset5 = { id: "5", component: <TestAsset>TestAsset5</TestAsset> };
  const asset6 = { id: "6", component: <TestAsset>TestAsset6</TestAsset> };
  const asset7 = { id: "7", component: <TestAsset>TestAsset7</TestAsset> };
  const asset8 = { id: "8", component: <TestAsset>TestAsset8</TestAsset> };
  const asset9 = { id: "9", component: <TestAsset>TestAsset9</TestAsset> };

  return {
    transformers: [
      {
        id: "1",
        sources: [asset1],
        result: asset4,
        component: <TestAsset>TestTrans1</TestAsset>,
      },
      {
        id: "2",
        sources: [asset2],
        result: asset5,
        component: <TestAsset>TestTrans2</TestAsset>,
      },
      {
        id: "3",
        sources: [asset4, asset5],
        result: asset7,
        component: <TestAsset>TestTrans3</TestAsset>,
      },
      {
        id: "4",
        sources: [asset4, asset5],
        result: asset6,
        component: <TestAsset>TestTrans4</TestAsset>,
      },
      {
        id: "5",
        sources: [asset4, asset5],
        result: asset8,
        component: <TestAsset>TestTrans5</TestAsset>,
      },
      {
        id: "6",
        sources: [asset6],
        result: asset9,
        component: <TestAsset>TestTrans6</TestAsset>,
      },
    ],
    zones: [
      {
        id: "1",
        name: "Test1",
        assets: [asset1, asset2, asset3],
      },
      {
        id: "2",
        name: "Test2",
        assets: [asset4, asset5, asset6],
      },
      {
        id: "3",
        name: "Test3",
        assets: [asset7, asset8, asset9],
      },
    ],
  };
};

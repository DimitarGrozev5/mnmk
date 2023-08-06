import { type Zones } from "./flowing-assets-types";
import TestAsset from "./test-components/test-asset";

export const mockZones = (): Zones => [
  {
    id: "1",
    name: "Test1",
    assets: [
      { id: "1", component: <TestAsset>TestAsset1</TestAsset> },
      { id: "2", component: <TestAsset>TestAsset2</TestAsset> },
      { id: "3", component: <TestAsset>TestAsset3</TestAsset> },
      { id: "4", component: <TestAsset>TestAsset3.1</TestAsset> },
      { id: "5", component: <TestAsset>TestAsset3.2</TestAsset> },
      { id: "6", component: <TestAsset>TestAsset3.3</TestAsset> },
      { id: "7", component: <TestAsset>TestAsset3.4</TestAsset> },
      { id: "8", component: <TestAsset>TestAsset3.5</TestAsset> },
      { id: "9", component: <TestAsset>TestAsset3.6</TestAsset> },
      { id: "10", component: <TestAsset>TestAsset3.7</TestAsset> },
    ],
  },
  {
    id: "2",
    name: "Test2",
    assets: [
      { id: "1", component: <TestAsset>TestAsset4</TestAsset> },
      { id: "2", component: <TestAsset>TestAsset5</TestAsset> },
      { id: "3", component: <TestAsset>TestAsset6</TestAsset> },
    ],
  },
  {
    id: "3",
    name: "Test3",
    assets: [
      { id: "1", component: <TestAsset>TestAsset7</TestAsset> },
      { id: "2", component: <TestAsset>TestAsset8</TestAsset> },
      { id: "3", component: <TestAsset>TestAsset9</TestAsset> },
    ],
  },
];

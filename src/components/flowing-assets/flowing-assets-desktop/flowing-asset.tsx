import { useAppSelector } from "../../../store/hooks";
import type { ElementId } from "../../../store/slices/flowing-assets-types";
import FlowingElement from "./flowing-element";

type Props = {
  assetId: ElementId;
  snapX: (value: number) => number;
  snapY: (value: number) => number;
};

const FlowingAsset: React.FC<Props> = ({ assetId, snapX, snapY }) => {
  const asset = useAppSelector(
    (state) => state.zonesAndTransformers.assets[assetId]
  );

  return (
    <FlowingElement
      snapX={snapX}
      snapY={snapY}
      id={assetId}
      type="assets"
      rectangular
    >
      {asset.title}
    </FlowingElement>
  );
};

export default FlowingAsset;

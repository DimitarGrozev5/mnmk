import { useAppSelector } from "../../../store/hooks";
import type { ElementId } from "../../../store/slices/flowing-assets-types";
import FlowingElement from "./flowing-element/flowing-element";

type Props = {
  assetId: ElementId;
};

const FlowingAsset: React.FC<Props> = ({ assetId }) => {
  const asset = useAppSelector(
    (state) => state.zonesAndTransformers.assets[assetId]
  );

  return (
    <FlowingElement id={assetId} type="assets" rectangular>
      {asset.title}
    </FlowingElement>
  );
};

export default FlowingAsset;

import { useAppSelector } from "../../../store/hooks";
import type { ElementId } from "../../../store/slices/flowing-assets-types";
import FlowingAddNewAsset from "./flowing-add-new-asset";
import FlowingElement from "./flowing-element/flowing-element";

type Props = {
  assetId: ElementId;
};

const FlowingAsset: React.FC<Props> = ({ assetId }) => {
  const asset = useAppSelector(
    (state) => state.zonesAndTransformers.assets[assetId]
  );

  if (asset.type === "add_new") {
    return <FlowingAddNewAsset id={assetId} />;
  }

  return (
    <FlowingElement id={assetId} type="assets" rectangular>
      {asset.title}
    </FlowingElement>
  );
};

export default FlowingAsset;

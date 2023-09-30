import { useAppSelector } from "../../../store/hooks";
import type { ElementId } from "../../../store/slices/flowing-assets-types";
import FlowingAddNewAsset from "./flowing-add-new-asset";
import FlowingTextFile from "./flowing-assets-txt-file";
import FlowingElement from "./flowing-element/flowing-element";

type Props = {
  assetId: ElementId;
};

const FlowingAsset: React.FC<Props> = ({ assetId }) => {
  const asset = useAppSelector(
    (state) => state.zonesAndTransformers.assets[assetId]
  );

  switch (asset.type) {
    case "add_new":
      return <FlowingAddNewAsset id={assetId} />;
    case "txt_file":
    case "csv_file":
      return <FlowingTextFile id={assetId} />;

    default:
      <FlowingElement id={assetId} type="assets" rectangular>
        {asset.id}
      </FlowingElement>;
  }
};

export default FlowingAsset;

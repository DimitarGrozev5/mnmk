import { useAppSelector } from "../../../store/hooks";
import { AssetId } from "../../../store/slices/flowing-assets-types";
import FlowingElement from "./flowing-element";

type Props = {
  assetId: AssetId;
  // addAssetRef: (ref: IdRefs) => void;
  // removeAssetRef: (ref: IdRefs) => void;
  // hoveredAsset: string | null;
  // selectedIds: SelectedIds;
  // setHoveredAsset: (assetId: string | null) => void;
};

const FlowingAsset: React.FC<Props> = ({
  assetId,
  // addAssetRef,
  // removeAssetRef,
  // setHoveredAsset,
  // selectedIds,
  // hoveredAsset,
}) => {
  const asset = useAppSelector(
    (state) => state.zonesAndTransformers.assets[assetId]
  );

  return <FlowingElement rectangular>{asset.title}</FlowingElement>;
};

export default FlowingAsset;

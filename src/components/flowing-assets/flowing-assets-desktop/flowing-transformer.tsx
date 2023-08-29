import type { TransformerId } from "../../../store/slices/flowing-assets-types";
import { useAppSelector } from "../../../store/hooks";
import FlowingElement from "./flowing-element";

type Props = {
  transformerId: TransformerId;
  // addTransRef: (ref: IdRefs) => void;
  // removeTransRef: (ref: IdRefs) => void;
  // hoveredTrans: string | null;
  // selectedIds: SelectedIds;
  // setHoveredTrans: (tranformerId: string | null) => void;
};

const FlowingTransformer: React.FC<Props> = ({
  transformerId,
  // addTransRef,
  // removeTransRef,
  // hoveredTrans,
  // selectedIds,
  // setHoveredTrans,
}) => {
  const transformer = useAppSelector(
    (state) => state.zonesAndTransformers.transformers[transformerId]
  );

  return <FlowingElement>{transformer.title}</FlowingElement>;
};

export default FlowingTransformer;

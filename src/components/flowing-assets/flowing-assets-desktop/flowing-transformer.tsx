import type { ElementId } from "../../../store/slices/flowing-assets-types";
import { useAppSelector } from "../../../store/hooks";
import FlowingElement from "./flowing-element/flowing-element";

type Props = {
  transformerId: ElementId;
};

const FlowingTransformer: React.FC<Props> = ({ transformerId }) => {
  const transformer = useAppSelector(
    (state) => state.zonesAndTransformers.transformers[transformerId]
  );

  return (
    <FlowingElement id={transformerId} type="transformers">
      {transformer.title}
    </FlowingElement>
  );
};

export default FlowingTransformer;

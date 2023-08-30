import type { ElementId } from "../../../store/slices/flowing-assets-types";
import { useAppSelector } from "../../../store/hooks";
import FlowingElement from "./flowing-element";

type Props = {
  transformerId: ElementId;
  snapX: (value: number) => number;
  snapY: (value: number) => number;
};

const FlowingTransformer: React.FC<Props> = ({
  transformerId,
  snapX,
  snapY,
}) => {
  const transformer = useAppSelector(
    (state) => state.zonesAndTransformers.transformers[transformerId]
  );

  return (
    <FlowingElement
      snapX={snapX}
      snapY={snapY}
      id={transformerId}
      type="transformers"
    >
      {transformer.title}
    </FlowingElement>
  );
};

export default FlowingTransformer;

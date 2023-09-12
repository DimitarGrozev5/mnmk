import { useAppSelector } from "../../../store/hooks";
import { ElementId } from "../../../store/slices/flowing-assets-types";
import { getAsset } from "../../../store/slices/zones-and-transformers-slice";
import FlowingElementCaption from "./flowing-element/flowing-element-caption";
import FlowingElementCard from "./flowing-element/flowing-element-card";
import FlowingElementContainer from "./flowing-element/flowing-element-container";

type Props = {
  id: ElementId;
};

const FlowingTxtFile: React.FC<Props> = ({ id }) => {
  const asset = useAppSelector(getAsset(id));
  if (asset.type !== "txt_file") throw new Error();

  return (
    <FlowingElementContainer
      id={id}
      type="assets"
      rectangular
      onClick={() => {}}
    >
      <FlowingElementCard rectangular>
        <h1 className="text-5xl text-slate-500">.txt</h1>
      </FlowingElementCard>
      <FlowingElementCaption id={id} primaryText={asset.data.fileName} />
    </FlowingElementContainer>
  );
};

export default FlowingTxtFile;

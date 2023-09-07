import clsx from "clsx";
import { ElementId } from "../../../store/slices/flowing-assets-types";
import FlowinfELementCard from "./flowing-element/flowing-element-card";
import FlowingElementContainer from "./flowing-element/flowing-element-container";
import { PlusIcon } from "@heroicons/react/20/solid";
import FlowingElementCaption from "./flowing-element/flowing-element-caption";

type Props = {
  id: ElementId;
};

const FlowingAddNewAsset: React.FC<Props> = ({ id }) => {
  return (
    <FlowingElementContainer id={id} type="assets" rectangular>
      <FlowinfELementCard rectangular>
        <PlusIcon className={clsx("text-slate-500", "w-12 h-12")} />
      </FlowinfELementCard>
      <FlowingElementCaption primaryText="Add new Asset" />
    </FlowingElementContainer>
  );
};

export default FlowingAddNewAsset;

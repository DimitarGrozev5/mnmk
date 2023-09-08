import clsx from "clsx";
import { ElementId } from "../../../store/slices/flowing-assets-types";
import FlowingElementCard from "./flowing-element/flowing-element-card";
import FlowingElementContainer from "./flowing-element/flowing-element-container";
import { PlusIcon } from "@heroicons/react/20/solid";
import FlowingElementCaption from "./flowing-element/flowing-element-caption";
import FlowingElementModal from "./flowing-element/flowing-element-modal";
import { useState } from "react";

type Props = {
  id: ElementId;
};

const FlowingAddNewAsset: React.FC<Props> = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <FlowingElementContainer
        id={id}
        type="assets"
        rectangular
        onClick={() => !showModal && setShowModal(true)}
      >
        <FlowingElementCard rectangular>
          <PlusIcon className={clsx("text-slate-500", "w-12 h-12")} />
        </FlowingElementCard>
        <FlowingElementCaption id={id} primaryText="Add new Asset" />
      </FlowingElementContainer>
      <FlowingElementModal
        forId={id}
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        Add new
      </FlowingElementModal>
    </>
  );
};

export default FlowingAddNewAsset;

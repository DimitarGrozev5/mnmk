import clsx from "clsx";
import { ElementId } from "../../../store/slices/flowing-assets-types";
import FlowingElementCard from "./flowing-element/flowing-element-card";
import FlowingElementContainer from "./flowing-element/flowing-element-container";
import { PlusIcon } from "@heroicons/react/20/solid";
import FlowingElementCaption from "./flowing-element/flowing-element-caption";
import FlowingElementModal from "./flowing-element/flowing-element-modal";
import { useCallback, useRef, useState } from "react";
import Button from "../../ui/button/button";
import Modal from "../../ui/modal/modal";
import Draggable from "../../util-components/draggable";
import { useAppDispatch } from "../../../store/hooks";
import { zonesActions } from "../../../store/slices/zones-and-transformers-slice";
import { nanoid } from "nanoid";

type Props = {
  id: ElementId;
};

const FlowingAddNewAsset: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { addAssetToZone } = zonesActions;

  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const showAddFileModalHandler = useCallback(() => {
    setShowAddFileModal(true);
    setShowOptionsModal(false);
  }, []);
  const cancelAddFileModalHandler = useCallback(() => {
    setShowAddFileModal(false);
    setShowOptionsModal(true);
  }, []);
  const closeAddFileModalHandler = useCallback(() => {
    setShowAddFileModal(false);
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onOpenFile = useCallback(
    (files: FileList) => {
      if (files.length === 0) {
        return;
      }

      const type = files[0].name.endsWith(".csv") ? "csv_file" : "txt_file";
      dispatch(
        addAssetToZone({
          asset: {
            id: nanoid(),
            data: { fileName: files[0].name },
            rect: undefined,
            type,
            file: files[0],
          },
          forZone: "1",
        })
      );
      closeAddFileModalHandler();
    },
    [addAssetToZone, closeAddFileModalHandler, dispatch]
  );

  return (
    <>
      <FlowingElementContainer
        id={id}
        type="assets"
        rectangular
        onClick={() => !showOptionsModal && setShowOptionsModal(true)}
      >
        <FlowingElementCard rectangular>
          <PlusIcon className={clsx("text-slate-500", "w-12 h-12")} />
        </FlowingElementCard>
        <FlowingElementCaption id={id} primaryText="Add new Asset" />
      </FlowingElementContainer>
      <FlowingElementModal
        forId={id}
        title="Add New Data Source"
        show={showOptionsModal}
        onClose={() => setShowOptionsModal(false)}
      >
        <div
          className={clsx(
            "flex-1 self-stretch",
            "flex flex-col items-stretch gap-4",
            "p-2"
          )}
        >
          <Button
            uppercase={false}
            variant="contained"
            onClick={showAddFileModalHandler}
          >
            Add New File
          </Button>
          <Button uppercase={false} variant="contained">
            Copy and Paste Data
          </Button>
        </div>
      </FlowingElementModal>

      <Modal
        show={showAddFileModal}
        onClose={cancelAddFileModalHandler}
        title="Add New File"
        actions={
          <Button variant="contained" onClick={closeAddFileModalHandler}>
            Ok
          </Button>
        }
      >
        <input
          type="file"
          id="input"
          ref={fileInputRef}
          hidden
          accept=".txt, .csv"
          onChange={(event) =>
            event.target.files && onOpenFile(event.target.files)
          }
        />
        <Draggable onDrop={onOpenFile} acceptExtensions={[".txt", ".csv"]}>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={clsx(
              "flex-1 self-stretch",
              "flex flex-col items-center justify-center",
              "cursor-default"
            )}
          >
            <h2 className="text-xl">Drop file here or click to browse files</h2>
            <h3>
              Accepted formats:{" "}
              <span className="font-semibold">.txt, .csv</span>
            </h3>
          </div>
        </Draggable>
      </Modal>
    </>
  );
};

export default FlowingAddNewAsset;

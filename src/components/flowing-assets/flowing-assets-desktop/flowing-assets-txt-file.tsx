import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { ElementId } from "../../../store/slices/flowing-assets-types";
import {
  getAsset,
  getAssetFile,
} from "../../../store/slices/zones-and-transformers-slice";
import FlowingElementCaption from "./flowing-element/flowing-element-caption";
import FlowingElementCard from "./flowing-element/flowing-element-card";
import FlowingElementContainer from "./flowing-element/flowing-element-container";
import FlowingElementModal from "./flowing-element/flowing-element-modal";
import clsx from "clsx";
import { txtParser } from "../../../fn/parsers/txt-parser";
import Button from "../../ui/button/button";
import Modal from "../../ui/modal/modal";

type Props = {
  id: ElementId;
};

const FlowingTextFile: React.FC<Props> = ({ id }) => {
  const asset = useAppSelector(getAsset(id));
  if (asset.type !== "txt_file" && asset.type !== "csv_file") throw new Error();

  const assetFile = getAssetFile(id);
  const [fileContents, setFileContents] = useState<string[]>([]);
  useEffect(() => {
    if (!assetFile) return;

    (async () => {
      try {
        const file = await txtParser(assetFile);
        setFileContents(file);
      } catch (err) {
        setFileContents(["Error parsing file"]);
      }
    })();
  }, [assetFile]);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showParseModal, setShowParseModal] = useState(false);

  const openParseModalHandler = useCallback(() => {
    setShowPreviewModal(false);
    setShowParseModal(true);
  }, []);

  const closeParseModalHandler = useCallback(() => {
    setShowPreviewModal(true);
    setShowParseModal(false);
  }, []);

  return (
    <>
      <FlowingElementContainer
        id={id}
        type="assets"
        rectangular
        onClick={() => setShowPreviewModal(true)}
      >
        <FlowingElementCard rectangular>
          <h1 className="text-5xl text-slate-500">
            .{asset.data.fileName.split(".").pop()}
          </h1>
        </FlowingElementCard>
        <FlowingElementCaption id={id} primaryText={asset.data.fileName} />
      </FlowingElementContainer>

      {assetFile && (
        <FlowingElementModal
          forId={id}
          title={asset.data.fileName}
          actions={
            <Button onClick={openParseModalHandler} variant="contained">
              Parse
            </Button>
          }
          show={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
        >
          <div
            className={clsx(
              "absolute inset-0",
              "border border-slate-400 bg-slate-200",
              "p-2",
              "flex flex-col items-start",
              "text-slate-500 text-clip",
              "overflow-auto"
            )}
          >
            {fileContents.map((line, i) => (
              <div key={i} className="w-[max-content]">
                {line}
              </div>
            ))}
          </div>
        </FlowingElementModal>
      )}

      <Modal show={showParseModal} onClose={closeParseModalHandler} fullScreen>
        Parse Modal
      </Modal>
    </>
  );
};

export default FlowingTextFile;

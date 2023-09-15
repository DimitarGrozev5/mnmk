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
import Tabs from "../../ui/tabs/tabs";
import Tab from "../../ui/tabs/tab";

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

  // Selector
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedPanelIndex, setSelectedPanelIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedPanelIndex(tabIndex);
    }, 10);

    () => clearTimeout(timer);
  }, [tabIndex]);

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
              "border border-slate-400 bg-slfullate-200",
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

      <Modal
        show={showParseModal}
        onClose={closeParseModalHandler}
        title={`Parse File: ${asset.data.fileName}`}
        fullScreen
      >
        <div
          className={clsx(
            "flex-1 self-stretch",
            "flex flex-col items-stretch gap-4"
          )}
        >
          <Tabs value={tabIndex} onChange={setTabIndex}>
            <Tab label="File Type" />
            <Tab label="Divider" />
            <Tab label="Fields" />
            <Tab label="Edit File" />
          </Tabs>

          <div
            className={clsx(
              "flex flex-col items-stretch",
              "relative",
              "transition-all duration-100, overflow-hidden"
            )}
          >
            <div
              className={clsx(
                "flex flex-col items-center gap-2",
                "transition-all duration-500 ease-out",
                "absolute inset-0 opacity-0",
                tabIndex > 0 && "-translate-x-full",
                tabIndex < 0 && "translate-x-full",
                tabIndex === 0 && "relative",
                selectedPanelIndex === 0 && "translate-x-0 opacity-100"
              )}
            >
              Select File Type
              <br />
              Select File Type
            </div>
            <div
              className={clsx(
                "flex flex-col items-center gap-2",
                "transition-all duration-500 ease-out",
                "absolute inset-0 opacity-0",
                tabIndex > 1 && "-translate-x-full",
                tabIndex < 1 && "translate-x-full",
                tabIndex === 1 && "relative",
                selectedPanelIndex === 1 && "translate-x-0 opacity-100"
              )}
            >
              Set divider and header
              <br />
              Set divider and header
              <br />
              Set divider and header
            </div>
            <div
              className={clsx(
                "flex flex-col items-center gap-2",
                "transition-all duration-500 ease-out",
                "absolute inset-0 opacity-0",
                tabIndex > 2 && "-translate-x-full",
                tabIndex < 2 && "translate-x-full",
                tabIndex === 2 && "relative",
                selectedPanelIndex === 2 && "translate-x-0 opacity-100"
              )}
            >
              Set column names and types
              <br />
              Set column names and types
            </div>
            <div
              className={clsx(
                "flex flex-col items-center gap-2",
                "transition-all duration-500 ease-out",
                "absolute inset-0 opacity-0",
                tabIndex > 3 && "-translate-x-full",
                tabIndex < 3 && "translate-x-full",
                tabIndex === 3 && "relative",
                selectedPanelIndex === 3 && "translate-x-0 opacity-100"
              )}
            >
              Remove and edit false data
              <br />
              Remove and edit false data
              <br />
              Remove and edit false data
              <br />
              Remove and edit false data
            </div>
          </div>

          <div
            className={clsx(
              "flex-1",
              "border border-slate-400 bg-slate-200",
              "p-2",
              "flex flex-col items-start gap-1",
              "text-slate-500 text-clip",
              "overflow-auto"
            )}
          >
            {fileContents.map((line, i) => (
              <div
                key={i}
                className={clsx(
                  "w-[max-content]",
                  "flex flex-row items-center gap-1"
                )}
              >
                <div
                  className={clsx(
                    "border border-slate-400 px-2",
                    "text-sm text-slate-400"
                  )}
                >
                  {i + 1}
                </div>
                <div>{line}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FlowingTextFile;

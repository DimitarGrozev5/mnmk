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
import { txtParser } from "../../../fn/parsers/txt-parser";
import Button from "../../ui/button/button";
import Modal from "../../ui/modal/modal";
import Tab from "../../ui/tabs-and-stepper/tab";
import TabPanel from "../../ui/tabs-and-stepper/tab-panel";
import { tw } from "../../../util/tw";
import Wizard from "../../ui/tabs-and-stepper/wizard";
import ParseTextSettingsPanelCotents from "../modals/parse-text/settings-panel-contents";
import { Divider, dividers } from "./dividers";

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

  const [fileType, setFileType] = useState<"xy" | "meas">("xy");
  const [ignoreFirstLine, setIgnoreFirstLine] = useState(false);
  const [divider, setDivider] = useState<Divider>("tab");

  const changeFileTypeHandler = useCallback((type: string) => {
    if (type !== "xy" && type !== "meas") return;

    setFileType(type);
  }, []);

  const changeDividerHandler = useCallback((type: string) => {
    if (!Object.keys(dividers).includes(type)) return;

    setDivider(type as Divider);
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
            className={tw(
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
          className={tw(
            "flex-1 self-stretch",
            "flex flex-col items-stretch gap-4"
          )}
        >
          <div className="w-1/2 self-center">
            <Wizard
              tabs={[
                <Tab label="Settings" completed />,
                <Tab label="Fields" />,
                <Tab label="Edit File" />,
              ]}
            >
              {(accessProps) => (
                <TabPanel>
                  <ParseTextSettingsPanelCotents
                    accessProps={accessProps}
                    fileType={fileType}
                    onChangeFileType={changeFileTypeHandler}
                    divider={divider}
                    onChangeDivider={changeDividerHandler}
                    ignoreFirstLine={ignoreFirstLine}
                    onChangeIgnoreFirstLine={setIgnoreFirstLine}
                  />
                </TabPanel>
              )}
              {({ setCompleted }) => (
                <TabPanel>
                  <div onClick={() => setCompleted(true)}>
                    Set column names and types
                    <br />
                    Set column names and types
                  </div>
                </TabPanel>
              )}
              {() => (
                <TabPanel>
                  Remove and edit false data
                  <br />
                  Remove and edit false data
                  <br />
                  Remove and edit false data
                  <br />
                  Remove and edit false data
                </TabPanel>
              )}
            </Wizard>
          </div>

          <div
            className={tw(
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
                className={tw(
                  "w-[max-content]",
                  "flex flex-row items-center gap-1"
                )}
              >
                <div
                  className={tw(
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

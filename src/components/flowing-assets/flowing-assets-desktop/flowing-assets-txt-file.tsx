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
import Tabs from "../../ui/tabs/tabs";
import Tab from "../../ui/tabs/tab";
import TabPanels from "../../ui/tabs/tab-panels";
import TabPanel from "../../ui/tabs/tab-panel";
import RadioGroup from "../../ui/radio-buttons/radio-group";
import RadioButton from "../../ui/radio-buttons/radio-button";
import { tw } from "../../../util/tw";
import Switch from "../../ui/switch/switch";
import Spacer from "../../ui/spacer/spacer";

type Props = {
  id: ElementId;
};

const dividers = {
  tab: "Tab",
  space: "Space",
  comma: "Comma",
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

  const [tabIndex, setTabIndex] = useState(0);
  const [fileType, setFileType] = useState<"xy" | "meas">("xy");
  const [ignoreFirstLine, setIgnoreFirstLine] = useState(false);
  const [divider, setDivider] = useState<keyof typeof dividers>("tab");

  const changeFileTypeHandler = useCallback((type: string) => {
    if (type !== "xy" && type !== "meas") return;

    setFileType(type);
  }, []);

  const changeDividerHandler = useCallback((type: string) => {
    if (!Object.keys(dividers).includes(type)) return;

    setDivider(type as keyof typeof dividers);
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
          <Tabs value={tabIndex} onChange={setTabIndex}>
            <Tab label="Settings" />
            <Tab label="Fields" />
            <Tab label="Edit File" />
          </Tabs>

          <TabPanels value={tabIndex}>
            <TabPanel>
              <h1 className="text-xl text-slate-500">
                Select the type of data in the file:
              </h1>
              <div className={tw("flex flex-row items-center gap-2")}>
                <RadioGroup value={fileType} onChange={changeFileTypeHandler}>
                  <RadioButton value="xy" label="Coordinate data" />
                  <RadioButton value="meas" label="Measurment data" />
                </RadioGroup>
              </div>

              <Spacer />

              <h1 className="text-xl text-slate-500">
                Select the Field divider:
              </h1>
              <div className={tw("flex flex-row items-center gap-2")}>
                <RadioGroup value={divider} onChange={changeDividerHandler}>
                  <RadioButton value="tab" label={dividers.tab} />
                  <RadioButton value="space" label={dividers.space} />
                  <RadioButton value="comma" label={dividers.comma} />
                </RadioGroup>
              </div>
              <Switch
                value={ignoreFirstLine}
                onChange={setIgnoreFirstLine}
                label="Ignore first line"
              />
            </TabPanel>
            <TabPanel>
              Set column names and types
              <br />
              Set column names and types
            </TabPanel>
            <TabPanel>
              Remove and edit false data
              <br />
              Remove and edit false data
              <br />
              Remove and edit false data
              <br />
              Remove and edit false data
            </TabPanel>
          </TabPanels>

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

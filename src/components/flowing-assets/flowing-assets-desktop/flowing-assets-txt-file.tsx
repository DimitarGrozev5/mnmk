import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
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
import RadioGroup from "../../ui/radio-buttons/radio-group";
import RadioButton from "../../ui/radio-buttons/radio-button";
import { tw } from "../../../util/tw";
import Switch from "../../ui/switch/switch";
import { Divider, dividers } from "../../../store/types/dividers";
import FileParser from "../../common/file-parser/file-parser";
import {
  fileParserActions,
  getCoordinateSystem,
  getDivider,
  getFileType,
  getIgnoreFirstLine,
} from "../../../store/slices/file-parser-slice";
import { FileType, fileTypes } from "../../../store/types/file-types";
import {
  CoordinateSystemCode,
  coordinateSystems,
} from "../../../store/types/coordinate-systems";
import CoordinateSystemSelector from "../../common/file-parser/select-coordinate-system";

type Props = {
  id: ElementId;
};

const FlowingTextFile: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const {
    setAllLines,
    clearAllData,
    changeDivider,
    toggleIgnoreFirstLine,
    setFileType,
    setCoordinateSystem,
  } = fileParserActions;

  const asset = useAppSelector(getAsset(id));
  if (asset.type !== "txt_file" && asset.type !== "csv_file") throw new Error();
  const divider = useAppSelector(getDivider());
  const ignoreFirstLine = useAppSelector(getIgnoreFirstLine());
  const fileType = useAppSelector(getFileType());
  const cs = useAppSelector(getCoordinateSystem());

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

  const setFileTypeHandler = useCallback(
    (type: string) => {
      if (!Object.keys(fileTypes).includes(type)) return;
      dispatch(setFileType(type as FileType));
    },
    [dispatch, setFileType]
  );

  const ignoreFirstLineHandler = useCallback(
    (value: boolean) => {
      dispatch(toggleIgnoreFirstLine(value));
    },
    [dispatch, toggleIgnoreFirstLine]
  );

  const openParseModalHandler = useCallback(() => {
    dispatch(setAllLines({ rawLines: fileContents, divider: "tab" }));

    setShowPreviewModal(false);
    setShowParseModal(true);
  }, [dispatch, fileContents, setAllLines]);

  const closeParseModalHandler = useCallback(() => {
    dispatch(clearAllData());

    setShowPreviewModal(true);
    setShowParseModal(false);
  }, [clearAllData, dispatch]);

  const changeDividerHandler = useCallback(
    (type: string) => {
      if (!Object.keys(dividers).includes(type)) return;

      dispatch(changeDivider(type as Divider));
    },
    [changeDivider, dispatch]
  );

  const changeCSHandler = useCallback(
    (cs: CoordinateSystemCode) => {
      if (!(cs[0] in coordinateSystems.asObject)) return;
      if (!(cs[1] in coordinateSystems.asObject[cs[0]].subsystems.asObject))
        return;
      if (
        !(
          cs[2] in
          coordinateSystems.asObject[cs[0]].subsystems.asObject[cs[1]].zones
            .asObject
        )
      )
        return;

      dispatch(setCoordinateSystem(cs));
    },
    [dispatch, setCoordinateSystem]
  );

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
        actions={
          <>
            {fileType === "ts" ? (
              <Button variant="contained">Next</Button>
            ) : (
              <Button variant="contained">Parse</Button>
            )}
          </>
        }
        fullScreen
      >
        <div
          className={tw(
            "flex-1 self-stretch",
            "flex flex-col items-stretch gap-4"
          )}
        >
          <div
            className={tw(
              "flex flex-row justify-center gap-4 flex-wrap items-stretch"
            )}
          >
            <div
              className={tw(
                "flex flex-col items-center gap-2",
                "border border-slate-400 rounded-md",
                "p-2"
              )}
            >
              <h1 className="text-xl text-slate-500">File Type</h1>
              <div className={tw("flex flex-row items-center gap-2")}>
                <RadioGroup value={fileType} onChange={setFileTypeHandler}>
                  {Object.entries(fileTypes).map(([key, value]) => (
                    <RadioButton key={key} value={key} label={value} />
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div
              className={tw(
                "flex flex-col items-center gap-2",
                "border border-slate-400 rounded-md",
                "p-2"
              )}
            >
              <h1 className="text-xl text-slate-500">Field Divider</h1>
              <div className={tw("flex flex-row items-center gap-2")}>
                <RadioGroup value={divider} onChange={changeDividerHandler}>
                  <RadioButton value="tab" label={dividers.tab.label} />
                  <RadioButton value="space" label={dividers.space.label} />
                  <RadioButton value="comma" label={dividers.comma.label} />
                </RadioGroup>
              </div>
            </div>

            <Switch
              value={ignoreFirstLine}
              onChange={ignoreFirstLineHandler}
              label="Ignore first line"
            />

            <div
              className={tw(
                "flex flex-col items-stretch gap-2",
                "border border-slate-400 rounded-md",
                "p-2",
                fileType === "ts" && "hidden"
              )}
            >
              <h1 className="text-xl text-slate-500">Coordinate sysyem</h1>
              <CoordinateSystemSelector value={cs} onChange={changeCSHandler} />
            </div>
          </div>

          <FileParser />
        </div>
      </Modal>
    </>
  );
};

export default FlowingTextFile;

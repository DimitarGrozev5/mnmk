import { useCallback } from "react";
import { tw } from "../../../../util/tw";
import RadioButton from "../../../ui/radio-buttons/radio-button";
import RadioGroup from "../../../ui/radio-buttons/radio-group";
import Spacer from "../../../ui/spacer/spacer";
import Switch from "../../../ui/switch/switch";
import { AccessFunctionProps } from "../../../ui/tabs-and-stepper/tab-panels";
import { Divider, dividers } from "../../flowing-assets-desktop/dividers";

type Props = {
  fileType: string;
  onChangeFileType: (value: string) => void;
  divider: Divider;
  onChangeDivider: (value: string) => void;
  ignoreFirstLine: boolean;
  onChangeIgnoreFirstLine: (value: boolean) => void;
  accessProps: AccessFunctionProps;
};

const ParseTextSettingsPanelCotents: React.FC<Props> = ({
  fileType,
  onChangeFileType,
  divider,
  onChangeDivider,
  ignoreFirstLine,
  onChangeIgnoreFirstLine,
  accessProps,
}) => {
  const onChange = useCallback(
    <T extends (arg: D) => void, D>(setter: T) =>
      (data: D) => {
        accessProps.invalidatePanel(1);
        accessProps.invalidatePanel(2);
        setter(data);
      },
    [accessProps]
  );
  return (
    <>
      <h1 className="text-xl text-slate-500">
        Select the type of data in the file:
      </h1>
      <div className={tw("flex flex-row items-center gap-2")}>
        <RadioGroup value={fileType} onChange={onChange(onChangeFileType)}>
          <RadioButton value="xy" label="Coordinate data" />
          <RadioButton value="meas" label="Measurment data" />
        </RadioGroup>
      </div>

      <Spacer />

      <h1 className="text-xl text-slate-500">Select the Field divider:</h1>
      <div className={tw("flex flex-row items-center gap-2")}>
        <RadioGroup value={divider} onChange={onChange(onChangeDivider)}>
          <RadioButton value="tab" label={dividers.tab} />
          <RadioButton value="space" label={dividers.space} />
          <RadioButton value="comma" label={dividers.comma} />
        </RadioGroup>
      </div>
      <Switch
        value={ignoreFirstLine}
        onChange={onChange(onChangeIgnoreFirstLine)}
        label="Ignore first line"
      />
    </>
  );
};

export default ParseTextSettingsPanelCotents;

import { useCallback } from "react";
import {
  CoordinateSystemCode,
  coordinateSystems,
  getCS,
  getCSS,
  getCSZone,
} from "../../../store/types/coordinate-systems";
import { tw } from "../../../util/tw";
import Option from "../../ui/select/option";
import Select from "../../ui/select/select";

type Props = {
  value: CoordinateSystemCode;
  onChange: (value: CoordinateSystemCode) => void;
};

const CoordinateSystemSelector: React.FC<Props> = ({ value, onChange }) => {
  const changeCSHandler = useCallback(
    (cs: string) => {
      if (!(cs in coordinateSystems.asObject)) return;
      const ss = getCS(cs).subsystems.asArray[0];
      const zone = getCSS(cs, ss).zones.asArray[0];
      onChange([cs, ss, zone]);
    },
    [onChange]
  );

  const changeSSHandler = useCallback(
    (ss: string) => {
      if (!(ss in getCS(value[0]).subsystems.asObject)) return;
      const zone = getCSS(value[0], ss).zones.asArray[0];
      onChange([value[0], ss, zone]);
    },
    [onChange, value]
  );

  const changeZHandler = useCallback(
    (zone: string) => {
      if (!(zone in getCSS(value[0], value[1]).zones.asObject)) return;
      onChange([value[0], value[1], zone]);
    },
    [onChange, value]
  );

  return (
    <div className={tw("flex flex-col items-stretch gap-2")}>
      <Select
        selectedKey={value[0]}
        selectedCaption={getCS(value[0]).name}
        onChange={changeCSHandler}
      >
        {coordinateSystems.asArray.map((csCode) => {
          const cs = getCS(csCode);
          return <Option key={cs.id} value={cs.id} caption={cs.name} />;
        })}
      </Select>
      {!("default" in getCS(value[0]).subsystems.asObject) && (
        <Select
          selectedKey={value[1]}
          selectedCaption={getCSS(value[0], value[1]).name}
          onChange={changeSSHandler}
        >
          {getCS(value[0]).subsystems.asArray.map((ssCode) => {
            const ss = getCSS(value[0], ssCode);
            return <Option key={ss.id} value={ss.id} caption={ss.name} />;
          })}
        </Select>
      )}
      {!("default" in getCSS(value[0], value[1]).zones.asObject) && (
        <Select
          selectedKey={value[2]}
          selectedCaption={getCSZone(value[0], value[1], value[2]).name}
          onChange={changeZHandler}
        >
          {getCSS(value[0], value[1]).zones.asArray.map((zoneCode) => {
            const zone = getCSZone(value[0], value[1], zoneCode);
            return <Option key={zone.id} value={zone.id} caption={zone.name} />;
          })}
        </Select>
      )}
    </div>
  );
};

export default CoordinateSystemSelector;

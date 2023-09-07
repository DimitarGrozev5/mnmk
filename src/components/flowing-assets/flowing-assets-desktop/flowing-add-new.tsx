import { ZoneType } from "../../../store/slices/flowing-assets-types";
import FlowingElement from "./flowing-element/flowing-element";

type Props = { type: ZoneType };

const FlowingAddNew: React.FC<Props> = ({ type }) => {
  return (
    <FlowingElement id={"transformerId"} type={type}>
      +
    </FlowingElement>
  );
};

export default FlowingAddNew;

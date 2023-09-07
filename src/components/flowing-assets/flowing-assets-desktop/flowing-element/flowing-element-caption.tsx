import clsx from "clsx";
import { useFlowingElementDisplayProps } from "../hooks/useFlowingElementDisplayProps";
import { ElementId } from "../../../../store/slices/flowing-assets-types";

type Props = {
  id: ElementId;
  primaryText: string;
};

const FlowingElementCaption: React.FC<Props> = ({ id, primaryText }) => {
  const { expand } = useFlowingElementDisplayProps(id);

  return (
    <div
      className={clsx(
        "absolute inset-0 bottom-3 z-20",
        "flex flex-col items-center justify-end",
        "text-slate-400",
        "transition-all duration-500",
        expand && "text-slate-600 -translate-y-2"
      )}
    >
      {primaryText}
    </div>
  );
};

export default FlowingElementCaption;

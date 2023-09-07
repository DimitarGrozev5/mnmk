import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { zonesActions } from "../../../../store/slices/zones-and-transformers-slice";
import { useMemo } from "react";
import { ElementId } from "../../../../store/slices/flowing-assets-types";

type Props = {
  id: ElementId;
  rectangular?: boolean;
  children: React.ReactNode;
};

const FlowinfELementCard: React.FC<Props> = ({ id, rectangular, children }) => {
  const hoveredElementId = useAppSelector(
    (state) => state.zonesAndTransformers.hoveredElementId
  );

  const connectedToHoveredIds = useAppSelector(
    (state) => state.zonesAndTransformers.connectedToHoveredIds
  );

  const dispatch = useAppDispatch();
  const { setHoveredElementId } = zonesActions;

  // Calculate display properties
  const dim = useMemo(
    () =>
      hoveredElementId !== null &&
      !connectedToHoveredIds.includes(id) &&
      hoveredElementId !== id,
    [connectedToHoveredIds, hoveredElementId, id]
  );

  const contract = useMemo(
    () => connectedToHoveredIds.includes(id) && hoveredElementId !== id,
    [connectedToHoveredIds, hoveredElementId, id]
  );

  const expand = useMemo(() => hoveredElementId === id, [hoveredElementId, id]);

  return (
    <div
      className={clsx(
        "absolute inset-0 z-10",
        "flex flex-col items-center justify-center",
        "p-3 w-36 overflow-hidden",
        rectangular ? "h-36" : "h-10",
        "bg-slate-300 rounded-lg",
        "shadow-lg transition-all duration-500",
        "cursor-pointer",
        dim && "scale-95 opacity-50 grayscale-0 blur-sm",
        contract && "scale-95",
        expand && "scale-105 active:scale-100 active:duration-200"
      )}
      onMouseEnter={() => dispatch(setHoveredElementId(id))}
      onMouseLeave={() => dispatch(setHoveredElementId(null))}
    >
      {children}
    </div>
  );
};

export default FlowinfELementCard;

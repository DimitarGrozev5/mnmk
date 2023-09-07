import { useMemo } from "react";
import clsx from "clsx";
import IconButton from "../../../ui/button/icon-button";
import { Bars2Icon } from "@heroicons/react/20/solid";
import { zonesActions } from "../../../../store/slices/zones-and-transformers-slice";
import {
  ElementId,
  ZoneType,
} from "../../../../store/slices/flowing-assets-types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import FlowingElementContainer from "./flowing-element-container";

type Props = {
  id: ElementId;
  type: ZoneType;
  children: React.ReactNode;
  rectangular?: boolean;
};

const FlowingElement: React.FC<Props> = ({
  id,
  type,
  children,
  rectangular,
}) => {
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
    <FlowingElementContainer id={id} type={type} rectangular={rectangular}>
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
          expand && "scale-105"
        )}
        onMouseEnter={() => dispatch(setHoveredElementId(id))}
        onMouseLeave={() => dispatch(setHoveredElementId(null))}
      >
        {children}

        <div
          className={clsx(
            "flex flex-col items-stretch",
            "border-2 border-slate-500 rounded-lg overflow-hidden",
            "absolute inset-0",
            "transition-all duration-700",
            "opacity-0",
            hoveredElementId === id && "hover:opacity-100"
          )}
        >
          <div
            className={clsx(
              "flex flex-row items-center justify-end gap-2",
              "p-2",
              "bg-slate-200 bg-opacity-50 shadow-md"
            )}
          >
            <IconButton
              label="Move"
              // ref={moveButton}
            >
              <Bars2Icon className="w-4 h-4" />
            </IconButton>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "absolute inset-2 z-0",
          "border-4 border-slate-400 border-dashed rounded-lg",
          "bg-slate-300 bg-opacity-50",
          "invisible"
        )}
      />
    </FlowingElementContainer>
  );
};

export default FlowingElement;

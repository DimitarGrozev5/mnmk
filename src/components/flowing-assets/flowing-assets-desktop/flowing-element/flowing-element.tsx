import clsx from "clsx";
import IconButton from "../../../ui/button/icon-button";
import { Bars2Icon } from "@heroicons/react/20/solid";
import {
  ElementId,
  ZoneType,
} from "../../../../store/slices/flowing-assets-types";
import { useAppSelector } from "../../../../store/hooks";
import FlowingElementContainer from "./flowing-element-container";
import FlowingElementCard from "./flowing-element-card";

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

  return (
    <FlowingElementContainer id={id} type={type} rectangular={rectangular}>
      <FlowingElementCard rectangular={rectangular}>
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
      </FlowingElementCard>

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

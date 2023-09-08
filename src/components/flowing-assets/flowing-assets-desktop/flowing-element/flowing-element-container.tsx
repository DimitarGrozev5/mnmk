import { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";
import {
  ElementId,
  ElementRect,
  ZoneType,
} from "../../../../store/slices/flowing-assets-types";
import { useAppDispatch } from "../../../../store/hooks";
import { zonesActions } from "../../../../store/slices/zones-and-transformers-slice";
import { useFlowingElementDisplayProps } from "../hooks/useFlowingElementDisplayProps";

type Props = {
  id: ElementId;
  type: ZoneType;
  rectangular?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const FlowingElementContainer: React.FC<Props> = ({
  id,
  type,
  rectangular,
  onClick,
  children,
}) => {
  const dispatch = useAppDispatch();
  const { setElementRect, setHoveredElementId } = zonesActions;

  // Take a ref to the div element and
  const divRef = useRef<HTMLDivElement>(null);

  const updateRect = useCallback(() => {
    if (divRef.current) {
      const boundingRect = divRef.current.getBoundingClientRect();
      const rect: ElementRect = {
        left: boundingRect.left,
        right: boundingRect.right,
        top: boundingRect.top,
        bottom: boundingRect.bottom,
        width: boundingRect.width,
        height: boundingRect.height,
      };
      dispatch(setElementRect({ id, rect, type }));
    }
  }, [dispatch, id, setElementRect, type]);

  // Register the initial position of the asset
  useEffect(() => {
    updateRect();
    () => {
      dispatch(setElementRect({ id, rect: undefined, type }));
    };
  }, [id, type, setElementRect, dispatch, updateRect]);

  // Update position on scroll
  useEffect(() => {
    window.addEventListener("scroll", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect);
    };
  }, [updateRect]);

  // Calculate display properties
  const { dim, contract, expand } = useFlowingElementDisplayProps(id);

  return (
    <div
      ref={divRef}
      className={clsx(
        "relative z-10",
        "flex flex-col items-center justify-center",
        "p-3 w-36",
        "transition-all duration-500",
        "cursor-pointer",
        rectangular ? "h-36" : "h-10",
        dim && "scale-95 opacity-50 grayscale-0 blur-sm",
        contract && "scale-95",
        expand && "scale-105 active:scale-100 active:duration-200"
      )}
      onMouseEnter={() => dispatch(setHoveredElementId(id))}
      onMouseLeave={() => dispatch(setHoveredElementId(null))}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FlowingElementContainer;

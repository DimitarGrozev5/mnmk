import { useCallback, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import IconButton from "../../ui/button/icon-button";
import { Bars2Icon } from "@heroicons/react/20/solid";
import { zonesActions } from "../../../store/slices/zones-and-transformers-slice";
import {
  ElementId,
  ElementRect,
  ZoneType,
} from "../../../store/slices/flowing-assets-types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

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
    <>
      {
        <div
          ref={divRef}
          className={clsx(
            "relative z-10",
            "flex flex-col items-center justify-center",
            "p-3 w-36",
            rectangular ? "h-36" : "h-10"
          )}
        >
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
        </div>
      }
    </>
  );
};

export default FlowingElement;

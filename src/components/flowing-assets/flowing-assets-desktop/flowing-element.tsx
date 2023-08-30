import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import IconButton from "../../ui/button/icon-button";
import { Bars2Icon } from "@heroicons/react/20/solid";
import {
  getElementRectSelector,
  zonesActions,
} from "../../../store/slices/zones-and-transformers-slice";
import {
  ElementId,
  ElementRect,
  ZoneType,
} from "../../../store/slices/flowing-assets-types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

type Props = {
  id: ElementId;
  type: ZoneType;
  snapX: (value: number) => number;
  snapY: (value: number) => number;
  children: React.ReactNode;
  rectangular?: boolean;
};

const FlowingElement: React.FC<Props> = ({
  id,
  type,
  snapX,
  snapY,
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
  const { setElementRect, setHoveredElementId, setDragging } = zonesActions;

  // Take a ref to the div element and
  const divRef = useRef<HTMLDivElement>(null);

  // Register the initial position of the asset
  useEffect(() => {
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
    () => {
      dispatch(setElementRect({ id, rect: undefined, type }));
    };
  }, [id, type, setElementRect, dispatch]);

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

  // Setup Element drag params
  const currentElementPosition = useAppSelector(getElementRectSelector(id));
  const dragging = useAppSelector(
    (state) => state.zonesAndTransformers.dragging
  );
  const draggingCurrent = useMemo(
    () => dragging && hoveredElementId === id,
    [dragging, hoveredElementId, id]
  );

  const [dragOffset, setDragOffset] = useState<[number, number]>([0, 0]);
  const dragParamsRef = useRef({
    startCoords: [0, 0],
    startElementPosition: [0, 0],
  });

  const startDrag = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      if (divRef.current) {
        const boundingRect = divRef.current.getBoundingClientRect();
        dragParamsRef.current = {
          startCoords: [event.clientX, event.clientY],
          startElementPosition: [boundingRect.left, boundingRect.top],
        };
      }
      dispatch(setDragging(true));
    },
    [dispatch, setDragging]
  );

  const endDrag = useCallback(() => {
    dispatch(setDragging(false));
    dragParamsRef.current = {
      startCoords: [0, 0],
      startElementPosition: [0, 0],
    };
    setDragOffset([0, 0]);
  }, [dispatch, setDragging]);

  const updateOffset = useCallback(
    (event: MouseEvent) => {
      const reorderDx = currentElementPosition?.left
        ? currentElementPosition.left -
          dragParamsRef.current.startElementPosition[0]
        : 0;
      const reorderDy = currentElementPosition?.top
        ? currentElementPosition.top -
          dragParamsRef.current.startElementPosition[1]
        : 0;

      const dragDx = event.clientX - dragParamsRef.current.startCoords[0];
      const dragDy = event.clientY - dragParamsRef.current.startCoords[1];

      const dx = snapX(dragDx + reorderDx);
      const dy = snapY(dragDy + reorderDy);

      setDragOffset([dx, dy]);
    },
    [currentElementPosition?.left, currentElementPosition?.top, snapX, snapY]
  );

  useEffect(() => {
    if (draggingCurrent) {
      window.addEventListener("mousemove", updateOffset);
      window.addEventListener("mouseup", endDrag);
      window.addEventListener("mouseleave", endDrag);
    } else {
      window.removeEventListener("mousemove", updateOffset);
    }
    return () => {
      window.removeEventListener("mousemove", updateOffset);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("mouseleave", endDrag);
    };
  }, [draggingCurrent, endDrag, updateOffset]);

  // const [dragging, setDragging] = useState(false);
  // const [initCoords, setInitCoords] = useState<[number, number]>([0, 0]);
  // const [currentCoords, setCurrentCoords] = useState<[number, number]>([0, 0]);

  // const moveButton = useRef<HTMLButtonElement>(null);

  // const updateOffset = useCallback((event: React.MouseEvent) => {
  //   const x = event.clientX;
  //   const y = event.clientY;
  //   setCurrentCoords([x, y]);
  // }, []);

  // const startDrag = useCallback((event: React.MouseEvent) => {
  //   const x = event.clientX;
  //   const y = event.clientY;
  //   setInitCoords([x, y]);
  //   setCurrentCoords([x, y]);
  //   setDragging(true);
  // }, []);

  // const endDrag = useCallback(() => {
  //   setDragging(false);
  //   setInitCoords([0, 0]);
  //   setCurrentCoords([0, 0]);
  // }, []);

  // useEffect(() => {
  //   if (dragging) {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     window.addEventListener("mousemove", updateOffset);
  //     window.addEventListener("mouseup", endDrag);
  //     window.addEventListener("mouseleave", endDrag);
  //   } else {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     window.removeEventListener("mousemove", updateOffset);
  //   }
  //   return () => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     window.removeEventListener("mousemove", updateOffset);
  //     window.removeEventListener("mouseup", endDrag);
  //     window.removeEventListener("mouseleave", endDrag);
  //   };
  // }, [dragging, endDrag, updateOffset]);

  return (
    <>
      {
        <div
          ref={divRef}
          className={clsx(
            "relative z-10",
            "flex flex-col items-center justify-center",
            "p-3 w-36",
            rectangular ? "h-36" : "h-10",
            draggingCurrent && "z-50"
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
              expand && "scale-105",
              draggingCurrent && "transition-none"
            )}
            onMouseEnter={() => !dragging && dispatch(setHoveredElementId(id))}
            onMouseLeave={() =>
              !dragging && dispatch(setHoveredElementId(null))
            }
            style={{
              transform: `translate(${dragOffset[0]}px, ${dragOffset[1]}px)`,
            }}
          >
            {children}

            <div
              className={clsx(
                "flex flex-col items-stretch",
                "border-2 border-slate-500 rounded-lg overflow-hidden",
                "absolute inset-0",
                "transition-all duration-700",
                "opacity-0",
                hoveredElementId === id && "hover:opacity-100",
                draggingCurrent && "opacity-100"
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
                  onMouseDown={startDrag}
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
              draggingCurrent ? "visible" : "invisible"
            )}
          />
        </div>
      }
    </>
  );
};

export default FlowingElement;

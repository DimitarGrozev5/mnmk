import { useEffect, useRef } from "react";
import clsx from "clsx";
import IconButton from "../../ui/button/icon-button";
import { Bars2Icon } from "@heroicons/react/20/solid";
import { zonesActions } from "../../../store/slices/zones-and-transformers-slice";
import {
  ElementId,
  ElementRect,
  ZoneType,
} from "../../../store/slices/flowing-assets-types";

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
  const { setElementRect, setHoveredElementId } = zonesActions;

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
      setElementRect({ id, rect, type });
    }
    () => {
      setElementRect({ id, rect: undefined, type });
    };
  }, [id, type, setElementRect]);

  // Calculate display properties
  // const dim = useMemo(
  //   () =>
  //     (selectedIds.assets.length > 0 || selectedIds.trans.length > 0) &&
  //     !selectedIds.assets.includes(asset.id),
  //   [asset.id, selectedIds.assets, selectedIds.trans.length]
  // );

  // const contract = useMemo(
  //   () => selectedIds.assets.includes(asset.id) && hoveredAsset !== asset.id,
  //   [asset.id, hoveredAsset, selectedIds.assets]
  // );

  // const expand = useMemo(
  //   () => hoveredAsset === asset.id,
  //   [asset.id, hoveredAsset]
  // );

  // Setup Asset drag params
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
  //     window.addEventListener("mousemove", updateOffset);
  //     window.addEventListener("mouseup", endDrag);
  //     window.addEventListener("mouseleave", endDrag);
  //   } else {
  //     window.removeEventListener("mousemove", updateOffset);
  //   }
  //   return () => {
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
            rectangular ? "h-36" : "h-10"
            // dragging && "z-50"
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
              "cursor-pointer"
              // dim && "scale-95 opacity-50 grayscale-0 blur-sm",
              // contract && "scale-95",
              // expand && "scale-105",
              // dragging && "transition-none"
            )}
            onMouseEnter={() => setHoveredElementId(id)}
            onMouseLeave={() => setHoveredElementId(null)}
            style={
              {
                // transform: `translate(${currentCoords[0] - initCoords[0]}px, ${
                //   currentCoords[1] - initCoords[1]
                // }px)`,
              }
            }
          >
            {children}

            <div
              className={clsx(
                "flex flex-col items-stretch",
                "border-2 border-slate-500 rounded-lg overflow-hidden",
                "absolute inset-0",
                "transition-all duration-700",
                "opacity-0",
                "hover:opacity-100"
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
                  // onMouseDown={startDrag}
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
              "bg-slate-300 bg-opacity-50"
              // dragging ? "visible" : "invisible"
            )}
          />
        </div>
      }
    </>
  );
};

export default FlowingElement;

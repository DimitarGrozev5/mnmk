import { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";
import {
  ElementId,
  ElementRect,
  ZoneType,
} from "../../../../store/slices/flowing-assets-types";
import { useAppDispatch } from "../../../../store/hooks";
import { zonesActions } from "../../../../store/slices/zones-and-transformers-slice";

type Props = {
  id: ElementId;
  type: ZoneType;
  rectangular?: boolean;
  children: React.ReactNode;
};

const FlowingElementContainer: React.FC<Props> = ({
  id,
  type,
  rectangular,
  children,
}) => {
  const dispatch = useAppDispatch();
  const { setElementRect } = zonesActions;

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
  return (
    <div
      ref={divRef}
      className={clsx(
        "relative z-10",
        "flex flex-col items-center justify-center",
        "p-3 w-36",
        rectangular ? "h-36" : "h-10"
      )}
    >
      {children}
    </div>
  );
};

export default FlowingElementContainer;

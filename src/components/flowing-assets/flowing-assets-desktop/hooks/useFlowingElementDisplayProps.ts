import { useMemo } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { ElementId } from "../../../../store/slices/flowing-assets-types";

export const useFlowingElementDisplayProps = (id: ElementId) => {
  const hoveredElementId = useAppSelector(
    (state) => state.zonesAndTransformers.hoveredElementId
  );

  const connectedToHoveredIds = useAppSelector(
    (state) => state.zonesAndTransformers.connectedToHoveredIds
  );
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

  return { dim, contract, expand } as const;
};

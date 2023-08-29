import {
  Asset,
  ElementId,
  ElementRecord,
  Transformer,
} from "../../../../store/slices/flowing-assets-types";

export const generateAssetLines = (
  containerRef: React.RefObject<HTMLDivElement>,
  hoveredElementId: ElementId,
  assets: ElementRecord<Asset>,
  transformers: ElementRecord<Transformer>
): { selectedIds: ElementId[]; newLines: number[][][] } => {
  // Get the selected asset rect
  const assetRect = assets[hoveredElementId].rect;

  if (!containerRef.current || !assetRect)
    return { selectedIds: [], newLines: [] };

  // Get the FlowingAssets Component container ref
  const containerRect = containerRef.current.getBoundingClientRect();

  // Get connected transformers
  const transSource = Object.values(transformers).filter((transformer) =>
    transformer.sourcesIds.find((id) => id === hoveredElementId)
  );

  const transResult = Object.values(transformers).filter(
    (transformer) => transformer.result === hoveredElementId
  );

  const offsetCoef = 6;

  // Generate direct lines from transformers to asset
  const linesDown = transSource
    .map((transformer) => {
      const transRect = transformers[transformer.id].rect!;
      const x1 = assetRect.right - containerRect.left;
      const y1 = assetRect.top + assetRect.height / 2 - containerRect.top;
      const x2 = transRect.left + transRect.width / 2 - containerRect.left;
      const y2 = transRect.top - containerRect.top;
      return [
        [x1, y1],
        [x2, y2],
      ];
    })
    // Sort them from most left going line to most right going
    .sort((a, b) => b[1][0] - a[1][0]);
  const linesUp = transResult.map((transformer) => {
    const transRect = transformers[transformer.id].rect!;
    const x1 = assetRect.left - containerRect.left;
    const y1 = assetRect.top + assetRect.height / 2 - containerRect.top;

    const x5 = transRect.left + transRect.width / 2 - containerRect.left;
    const y5 = transRect.bottom - containerRect.top;

    const x2 = x1 - offsetCoef;
    const y2 = y1;

    const x3 = x2;
    const y3 = y5 + offsetCoef;

    const x4 = x5;
    const y4 = y3;

    return [
      [x1, y1],
      [x2, y2],
      [x3, y3],
      [x4, y4],
      [x5, y5],
    ];
  });

  // Split lines to left going and right going
  let [leftDown, rightDown] = linesDown.reduce(
    ([left, right], line) => {
      if (line[1][0] < line[0][0]) {
        return [[...left, line], right];
      } else {
        return [left, [...right, line]];
      }
    },
    [[], []] as [number[][][], number[][][]]
  );

  // Add kinks and offsets so lines don't intersect
  leftDown = leftDown.map((line, index) => {
    const x1 = line[0][0];
    const y1 = line[0][1] + (index + rightDown.length) * offsetCoef;

    const x2 = x1 + (leftDown.length - index) * offsetCoef;
    const y2 = y1;

    const x3 = x2;
    const y3 = line[1][1] - (index + 1) * offsetCoef;

    const x4 = line[1][0];
    const y4 = y3;

    return [[x1, y1], [x2, y2], [x3, y3], [x4, y4], line[1]];
  });
  rightDown = rightDown.map((line, index) => {
    const x1 = line[0][0];
    const y1 = line[0][1] + index * offsetCoef;

    const x2 = x1 + (leftDown.length + rightDown.length - index) * offsetCoef;
    const y2 = y1;

    const x3 = x2;
    const y3 = line[1][1] - (rightDown.length - index) * offsetCoef;

    const x4 = line[1][0];
    const y4 = y3;

    return [[x1, y1], [x2, y2], [x3, y3], [x4, y4], line[1]];
  });

  const selectedTransIds = [...transSource, ...transResult].map(
    (transformer) => transformer.id
  );

  return {
    selectedIds: [...selectedTransIds],
    newLines: [...leftDown, ...rightDown, ...linesUp],
  };
};

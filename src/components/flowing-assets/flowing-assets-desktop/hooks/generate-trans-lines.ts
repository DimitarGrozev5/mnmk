import { IdRefs, SelectedIds, Transformer } from "../../../../store/slices/flowing-assets-types";

export const generateTransLines = (
  containerRef: React.RefObject<HTMLDivElement>,
  hoveredTrans: string,
  assetRects: IdRefs,
  transRects: IdRefs,
  transformers: Transformer[]
): { selectedIds: SelectedIds; newLines: number[][][] } => {
  if (!containerRef.current)
    return { selectedIds: { assets: [], trans: [] }, newLines: [] };
  const containerRect = containerRef.current.getBoundingClientRect();

  const transRect = transRects[hoveredTrans];

  // Get transformer
  const transformer = transformers.find((trans) => trans.id === hoveredTrans);
  if (!transformer)
    return { selectedIds: { assets: [], trans: [] }, newLines: [] };

  const offsetCoef = 6;

  // Generate direct lines from transformers to asset
  const linesUp = transformer.sources
    .map((asset) => {
      const assetRect = assetRects[asset.id];
      const x1 = transRect.right - transRect.width / 2 - containerRect.left;
      const y1 = transRect.top - containerRect.top;
      const x2 = assetRect.right - containerRect.left;
      const y2 = assetRect.top + assetRect.height / 2 - containerRect.top;
      return [
        [x1, y1],
        [x2, y2],
      ];
    })
    // Sort them from most left going line to most right going
    .sort((a, b) => b[1][0] - a[1][0]);

  const resultRect = assetRects[transformer.result.id];
  const x5 = resultRect.left - containerRect.left;
  const y5 = resultRect.top + resultRect.height / 2 - containerRect.top;

  const x1 = transRect.left + transRect.width / 2 - containerRect.left;
  const y1 = transRect.bottom - containerRect.top;

  const x2 = x1;
  const y2 = y1 + offsetCoef;

  const x3 = x5 - offsetCoef;
  const y3 = y2;

  const x4 = x3;
  const y4 = y5;

  const lineDown = [
    [x1, y1],
    [x2, y2],
    [x3, y3],
    [x4, y4],
    [x5, y5],
  ];

  // Split lines to left going and right going
  let [leftUp, rightUp] = linesUp.reduce(
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
  leftUp = leftUp.map((line, index) => {
    const x1 = line[0][0] - index * offsetCoef;
    const y1 = line[0][1];

    const x2 = x1;
    const y2 = y1 - (leftUp.length - index) * offsetCoef;

    const x3 = line[1][0] + offsetCoef;
    const y3 = y2;

    const x4 = x3;
    const y4 = line[1][1];

    return [[x1, y1], [x2, y2], [x3, y3], [x4, y4], line[1]];
  });
  rightUp = rightUp.map((line, index) => {
    const x1 = line[0][0] + (rightUp.length - index + 1) * offsetCoef;
    const y1 = line[0][1];

    const x2 = x1;
    const y2 = y1 - (index + 1) * offsetCoef;

    const x3 = line[1][0] + offsetCoef;
    const y3 = y2;

    const x4 = x3;
    const y4 = line[1][1];

    return [[x1, y1], [x2, y2], [x3, y3], [x4, y4], line[1]];
  });

  const selectedAssetIds = [...transformer.sources, transformer.result].map(
    (asset) => asset.id
  );

  return {
    selectedIds: { assets: selectedAssetIds, trans: [hoveredTrans] },
    newLines: [...leftUp, ...rightUp, lineDown],
  };
};

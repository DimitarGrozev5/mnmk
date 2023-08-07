import { useMemo } from "react";
import FlowLine from "../flow-line";
import type { IdRefs, Transformer } from "../../flowing-assets-types";

export const useConnectionLines = (
  transformers: Transformer[],
  container: React.RefObject<HTMLDivElement>,
  assetRefs: IdRefs,
  transRefs: IdRefs
) =>
  useMemo(() => {
    const containerRect = container.current?.getBoundingClientRect();
    if (!containerRect) return <></>;

    const lines: JSX.Element[] = transformers.flatMap((transformer) => {
      // Get transformer bounding rect
      const transRect =
        transRefs[transformer.id]?.current?.getBoundingClientRect();
      if (!transRect) return [];

      // Generate lines for each asset
      const assetLines: JSX.Element[] = transformer.sources.flatMap(
        (source) => {
          const assetRef = assetRefs[source.id];
          if (assetRef?.current) {
            const rect = assetRef.current.getBoundingClientRect();

            // Get middle point of the asset
            const xM = rect.left + rect.width / 2 - containerRect.left;
            const yM = rect.top + rect.height / 2 - containerRect.top;
            const x1 = xM + rect.width / 2 + 10;
            const y1 = yM;

            // Get vertical line to top of transformer
            const x2 = x1;
            const y2 = transRect.top - 10 - containerRect.top;

            // Get horizontal line to transformer
            const x3 =
              transRect.left + transRect.width / 2 - containerRect.left;
            const y3 = y2;

            // Drop line to transformer
            const x4 = x3;
            const y4 = transRect.top + transRect.height / 2 - containerRect.top;

            // Drop line from transformer
            // const x5 = x4;
            // const y5 = y4 + transRect.height / 2 + 10;

            return [
              <FlowLine startPoint={[x1, y1]} endPoint={[xM, yM]} />,
              <FlowLine startPoint={[x1, y1]} endPoint={[x2, y2]} />,
              <FlowLine startPoint={[x2, y2]} endPoint={[x3, y3]} />,
              <FlowLine startPoint={[x3, y3]} endPoint={[x4, y4]} />,
              // <FlowLine startPoint={[x4, y4]} endPoint={[x5, y5]} />,
            ];
          }
          return [];
        }
      );

      // Generate lines for result
      const resultLines: JSX.Element[] = [];
      const resultRef = assetRefs[transformer.result.id];
      if (resultRef?.current) {
        const resultRect = resultRef.current.getBoundingClientRect();

        // Get middle point of the transformer
        const x1 = transRect.left + transRect.width / 2 - containerRect.left;
        const y1 = transRect.top + transRect.height / 2 - containerRect.top;

        // Drop line from transformer
        const x2 = x1;
        const y2 = y1 + transRect.height / 2 + 10;

        // Draw horizontal line to asset
        const x3 = resultRect.left - containerRect.left - 10;
        const y3 = y2;

        // Drop line to asset
        const x4 = x3;
        const y4 = resultRect.top + resultRect.height / 2 - containerRect.top;

        // Draw line to asset
        const x5 = resultRect.left + resultRect.width / 2 - containerRect.left;
        const y5 = y4;

        resultLines.push(
          <FlowLine startPoint={[x1, y1]} endPoint={[x2, y2]} />,
          <FlowLine startPoint={[x2, y2]} endPoint={[x3, y3]} />,
          <FlowLine startPoint={[x3, y3]} endPoint={[x4, y4]} />,
          <FlowLine startPoint={[x4, y4]} endPoint={[x5, y5]} />
        );
      }

      return [...assetLines, ...resultLines];
    });

    return lines;
  }, [assetRefs, container, transRefs, transformers]);

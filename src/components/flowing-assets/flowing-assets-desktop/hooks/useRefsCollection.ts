import { useCallback, useMemo, useState } from "react";
import { type IdRefs } from "../../../../store/slices/flowing-assets-types";
import { produce } from "immer";

export const useRectCollection = () => {
  const [rects, setRects] = useState<IdRefs>({});
  const addRect = useCallback(
    (idRef: IdRefs) => setRects((refs) => ({ ...refs, ...idRef })),
    []
  );
  const removeRect = useCallback(
    (idRef: IdRefs) =>
      setRects(
        produce((draft) => {
          Object.keys(idRef).forEach((key) => {
            delete draft[key];
          });
        })
      ),
    []
  );
  return useMemo(
    () => ({ rects, addRect, removeRect }),
    [addRect, rects, removeRect]
  );
};

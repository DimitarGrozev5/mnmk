import { useCallback, useMemo, useState } from "react";
import { type IdRefs } from "../../flowing-assets-types";
import { produce } from "immer";

export const useRefsArray = () => {
  const [refs, setREfs] = useState<IdRefs>({});
  const addRef = useCallback(
    (idRef: IdRefs) => setREfs((refs) => ({ ...refs, ...idRef })),
    []
  );
  const removeRef = useCallback(
    (idRef: IdRefs) =>
      setREfs(
        produce((draft) => {
          Object.keys(idRef).forEach((key) => {
            delete draft[key];
          });
        })
      ),
    []
  );
  return useMemo(
    () => ({ refs, addRef, removeRef }),
    [addRef, refs, removeRef]
  );
};

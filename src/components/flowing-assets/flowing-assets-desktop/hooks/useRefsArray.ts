import { useCallback, useMemo, useState } from "react";
import { type IdRef } from "../../flowing-assets-types";

export const useRefsArray = () => {
  const [refs, setREfs] = useState<IdRef[]>([]);
  const addRef = useCallback(
    (idRef: IdRef) =>
      setREfs((refs) =>
        refs.find((zRef) => zRef.ref === idRef.ref)
          ? [...refs]
          : [...refs, idRef]
      ),
    []
  );
  const removeRef = useCallback(
    (idRef: IdRef) =>
      setREfs((refs) => refs.filter((zRef) => zRef.ref !== idRef.ref)),
    []
  );
  return useMemo(
    () => ({ refs, addRef, removeRef }),
    [addRef, refs, removeRef]
  );
};

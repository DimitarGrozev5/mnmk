import { useCallback, useMemo, useState } from "react";

export const useRefsArray = () => {
  const [refs, setREfs] = useState<React.RefObject<HTMLDivElement>[]>([]);
  const addRef = useCallback(
    (ref: React.RefObject<HTMLDivElement>) =>
      setREfs((refs) =>
        refs.find((zRef) => zRef === ref) ? [...refs] : [...refs, ref]
      ),
    []
  );
  const removeRef = useCallback(
    (ref: React.RefObject<HTMLDivElement>) =>
      setREfs((refs) => refs.filter((zRef) => zRef !== ref)),
    []
  );
  return useMemo(
    () => ({ refs, addRef, removeRef }),
    [addRef, refs, removeRef]
  );
};

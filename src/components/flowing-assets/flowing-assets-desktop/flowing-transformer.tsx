import clsx from "clsx";
import type { IdRefs, Transformer } from "../flowing-assets-types";
import { useEffect, useRef } from "react";

type Props = {
  transformer: Transformer;
  addTransRef: (ref: IdRefs) => void;
  removeTransRef: (ref: IdRefs) => void;
  setHoveredTrans: (tranformerId: string | null) => void;
};

const FlowingTransformer: React.FC<Props> = ({
  transformer,
  addTransRef,
  removeTransRef,
  setHoveredTrans,
}) => {
  // Take a ref to the div element and
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) {
      addTransRef({ [transformer.id]: divRef.current.getBoundingClientRect() });
    }
    () => {
      removeTransRef({ [transformer.id]: new DOMRect() });
    };
  }, [addTransRef, removeTransRef, transformer.id]);

  return (
    <div
      ref={divRef}
      className={clsx(
        "relative z-10",
        "p-3 w-36",
        "bg-slate-300 rounded-lg",
        "shadow-lg",
        "cursor-pointer"
      )}
      onMouseEnter={() => setHoveredTrans(transformer.id)}
      onMouseLeave={() => setHoveredTrans(null)}
    >
      {transformer.component}
    </div>
  );
};

export default FlowingTransformer;

import clsx from "clsx";
import type { IdRef, Transformer } from "../flowing-assets-types";
import { useEffect, useRef } from "react";

type Props = {
  transformer: Transformer;
  addTransRef: (ref: IdRef) => void;
  removeTransRef: (ref: IdRef) => void;
};

const FlowingTransformer: React.FC<Props> = ({
  transformer,
  addTransRef,
  removeTransRef,
}) => {
  // Take a ref to the div element and
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) {
      addTransRef({ id: transformer.id, ref: divRef });
    }
    () => {
      removeTransRef({ id: transformer.id, ref: divRef });
    };
  }, [addTransRef, removeTransRef, transformer.id]);

  return (
    <div
      ref={divRef}
      className={clsx("p-3 w-36", "bg-slate-300 rounded-lg", "shadow-lg")}
    >
      {transformer.component}
    </div>
  );
};

export default FlowingTransformer;

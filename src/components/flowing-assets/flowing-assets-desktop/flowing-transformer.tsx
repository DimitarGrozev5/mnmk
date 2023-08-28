import clsx from "clsx";
import type { IdRefs, SelectedIds, Transformer } from "../../../store/slices/flowing-assets-types";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  transformer: Transformer;
  addTransRef: (ref: IdRefs) => void;
  removeTransRef: (ref: IdRefs) => void;
  hoveredTrans: string | null;
  selectedIds: SelectedIds;
  setHoveredTrans: (tranformerId: string | null) => void;
};

const FlowingTransformer: React.FC<Props> = ({
  transformer,
  addTransRef,
  removeTransRef,
  hoveredTrans,
  selectedIds,
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

  const dim = useMemo(
    () =>
      (selectedIds.assets.length > 0 || selectedIds.trans.length > 0) &&
      !selectedIds.trans.includes(transformer.id),
    [selectedIds.assets.length, selectedIds.trans, transformer.id]
  );

  const contract = useMemo(
    () =>
      selectedIds.trans.includes(transformer.id) &&
      hoveredTrans !== transformer.id,
    [selectedIds.trans, transformer.id, hoveredTrans]
  );

  const expand = useMemo(
    () => hoveredTrans === transformer.id,
    [transformer.id, hoveredTrans]
  );

  return (
    <div
      ref={divRef}
      className={clsx(
        "relative z-10",
        "p-3 w-36",
        "bg-slate-300 rounded-lg",
        "shadow-lg transition-all duration-500",
        "cursor-pointer",
        dim && "scale-90 opacity-50 grayscale-0 blur-sm",
        contract && "scale-90",
        expand && "scale-105"
      )}
      onMouseEnter={() => setHoveredTrans(transformer.id)}
      onMouseLeave={() => setHoveredTrans(null)}
    >
      {transformer.component}
    </div>
  );
};

export default FlowingTransformer;

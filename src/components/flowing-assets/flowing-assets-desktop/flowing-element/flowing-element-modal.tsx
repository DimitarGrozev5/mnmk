import { useAppSelector } from "../../../../store/hooks";
import { ElementId } from "../../../../store/slices/flowing-assets-types";
import { getElementRectSelector } from "../../../../store/slices/zones-and-transformers-slice";
import Overlay from "../../../ui/modal/overlay";
import Button from "../../../ui/button/button";
import { tw } from "../../../../util/tw";

type Props = {
  forId: ElementId;
  title: string;
  actions?: React.ReactNode;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const FlowingElementModal: React.FC<Props> = ({
  forId,
  title,
  actions,
  show,
  onClose,
  children,
}) => {
  const elementRect = useAppSelector(getElementRectSelector(forId));

  return (
    <>
      <Overlay show={show} onClose={onClose} />
      <div
        className={tw(
          show ? "visible opacity-100" : "invisible opacity-5",
          "fixed z-50",
          "p-4 rounded-lg",
          "flex flex-col items-stretch gap-4",
          "bg-slate-300",
          "transition-all duration-500",
          "overflow-hidden"
        )}
        style={{
          left: show ? "50vw" : elementRect?.left,
          top: show ? "10vh" : elementRect?.top,
          width: show ? "40vw" : elementRect?.width,
          height: show ? "60vh" : elementRect?.height,
          transform: show ? "translate(-50%, 0%)" : "translate(0%, 0%)",
        }}
      >
        <h2 className="text-2xl font-bold text-slate-500 text-center">
          {title}
        </h2>
        <div
          className={tw(
            "relative",
            "flex-1",
            "flex flex-col items-center gap-4"
          )}
        >
          {children}
        </div>
        <div className={tw("flex flex-row justify-end items-center gap-3")}>
          <Button onClick={onClose}>Close</Button>
          {actions}
        </div>
      </div>
    </>
  );
};

export default FlowingElementModal;

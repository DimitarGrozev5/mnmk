import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { ElementId } from "../../../../store/slices/flowing-assets-types";
import { getElementRectSelector } from "../../../../store/slices/zones-and-transformers-slice";
import Button from "../../../ui/button/button";
import { tw } from "../../../../util/tw";
import { Dialog } from "@headlessui/react";

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

  const [inTransition, setInTransition] = useState(false);
  useEffect(() => {
    if (show) {
      setInTransition(true);
    } else {
      const timer = setTimeout(() => {
        setInTransition(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const display = useMemo(
    () => show || (!show && inTransition),
    [inTransition, show]
  );

  const initPosition = useMemo(
    () => (show && !inTransition) || (!show && inTransition),
    [inTransition, show]
  );

  const initFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Dialog
      as="div"
      className="relative z-10"
      open={display}
      onClose={onClose}
      initialFocus={initFocusRef}
    >
      <div
        onClick={onClose}
        className={tw(
          "fixed inset-0",
          "bg-black",
          "transition-all duration-500",
          initPosition ? "bg-opacity-0" : "bg-opacity-40"
        )}
      />

      <div
        className={tw(
          // show ? "visible opacity-100" : "invisible opacity-5",
          initPosition ? "opacity-0" : "opacity-100",
          "fixed z-50",
          "p-4 rounded-lg",
          "flex flex-col items-stretch gap-4",
          "bg-slate-300",
          "transition-all duration-500",
          "overflow-hidden"
        )}
        style={{
          left: initPosition ? elementRect?.left : "50vw",
          top: initPosition ? elementRect?.top : "10vh",
          width: initPosition ? elementRect?.width : "40vw",
          height: initPosition ? elementRect?.height : "60vh",
          transform: initPosition ? "translate(0%, 0%)" : "translate(-50%, 0%)",
        }}
      >
        <Dialog.Panel
          className={tw("flex-1", "flex flex-col items-stretch gap-4")}
        >
          <Dialog.Title
            as="h2"
            className="text-2xl font-bold text-slate-500 text-center"
          >
            {title}
          </Dialog.Title>
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
            <Button onClick={onClose} ref={initFocusRef}>
              Close
            </Button>
            {actions}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FlowingElementModal;

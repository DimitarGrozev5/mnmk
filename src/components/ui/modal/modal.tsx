import Button from "../button/button";
import { tw } from "../../../util/tw";
import { Dialog, Transition } from "@headlessui/react";
import React, { useRef } from "react";

type Props = BaseProps & (NormalProps | CompactProps);

type BaseProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

type NormalProps = {
  title?: string;
  actions?: React.ReactNode;
  fullScreen?: boolean;
  compact?: never;
};

type CompactProps = {
  title?: never;
  actions?: never;
  fullScreen?: never;
  compact?: boolean;
};

const Modal: React.FC<Props> = ({
  title,
  show,
  onClose,
  children,
  actions = null,
  fullScreen = false,
  compact = false,
}) => {
  const initFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Transition appear show={show} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={onClose}
        initialFocus={initFocusRef}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            onClick={onClose}
            className={tw("fixed inset-0", "bg-black bg-opacity-40")}
          />
        </Transition.Child>

        <div
          className={tw(
            "fixed inset-0 z-50",
            "flex flex-col items-center justify-center"
          )}
          style={
            {
              // left: fullScreen ? "5vw" : "50vw",
              // top: fullScreen ? "5vh" : "10vh",
              // width: fullScreen ? "90vw" : "40vw",
              // height: fullScreen ? "90vh" : "60vh",
              // transform: fullScreen ? "translate(0%, 0%)" : "translate(-50%, 0%)",
            }
          }
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={tw(
                "w-[40vw] h-[60vh]",
                fullScreen && "w-[90vw] h-[90vh]",
                compact && "w-auto h-auto",
                "p-4 rounded-lg",
                "flex flex-col items-stretch gap-4",
                "bg-slate-300"
              )}
            >
              {title && (
                <Dialog.Title
                  as="h3"
                  className={tw(
                    "text-2xl font-bold text-slate-500 text-center"
                  )}
                >
                  {title}
                </Dialog.Title>
              )}

              <div
                className={tw(
                  "flex-1",
                  "flex flex-col items-center gap-4",
                  "overflow-y-auto"
                )}
              >
                {children}
              </div>

              {!compact && (
                <div
                  className={tw("flex flex-row gap-4 justify-end items-center")}
                >
                  <Button onClick={onClose} ref={initFocusRef}>
                    Close
                  </Button>
                  {actions}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

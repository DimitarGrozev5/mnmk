import Button from "../button/button";
import { tw } from "../../../util/tw";
import { Dialog, Transition } from "@headlessui/react";
import React from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  fullScreen?: boolean;
};

const Modal: React.FC<Props> = ({
  title,
  show,
  onClose,
  children,
  actions = null,
  fullScreen = false,
}) => {
  return (
    <Transition appear show={show} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
            "fixed z-50",
            "p-4 rounded-lg",
            "flex flex-col items-stretch gap-4",
            "bg-slate-300"
          )}
          style={{
            left: fullScreen ? "5vw" : "50vw",
            top: fullScreen ? "5vh" : "10vh",
            width: fullScreen ? "90vw" : "40vw",
            height: fullScreen ? "90vh" : "60vh",
            transform: fullScreen ? "translate(0%, 0%)" : "translate(-50%, 0%)",
          }}
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
              className={tw("flex-1", "flex flex-col items-stretch gap-4")}
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

              <div className={tw("flex-1", "flex flex-col items-center gap-4")}>
                {children}
              </div>

              <div
                className={tw("flex flex-row gap-4 justify-end items-center")}
              >
                <Button onClick={onClose}>Close</Button>
                {actions}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

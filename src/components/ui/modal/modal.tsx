import clsx from "clsx";
import Overlay from "./overlay";
import Button from "../button/button";

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
    <>
      <Overlay show={show} onClose={onClose} blur />
      <div
        className={clsx(
          show ? "visible opacity-100" : "invisible opacity-5",
          "fixed z-50",
          "p-4 rounded-lg",
          "flex flex-col items-stretch gap-4",
          "bg-slate-300",
          "transition-all duration-500"
        )}
        style={{
          left: fullScreen ? "5vw" : "50vw",
          top: show ? (fullScreen ? "5vh" : "10vh") : "-50vh",
          width: fullScreen ? "90vw" : "40vw",
          height: fullScreen ? "90vh" : "60vh",
          transform: fullScreen ? "translate(0%, 0%)" : "translate(-50%, 0%)",
        }}
      >
        {title && (
          <h1 className={clsx("text-2xl font-bold text-slate-500 text-center")}>
            {title}
          </h1>
        )}

        <div className={clsx("flex-1", "flex flex-col items-center gap-4")}>
          {children}
        </div>

        <div className={clsx("flex flex-row gap-4 justify-end items-center")}>
          <Button onClick={onClose}>Close</Button>
          {actions}
        </div>
      </div>
    </>
  );
};

export default Modal;

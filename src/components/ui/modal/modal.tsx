import clsx from "clsx";
import Overlay from "./overlay";
import Button from "../button/button";

type Props = {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const Modal: React.FC<Props> = ({
  title,
  show,
  onClose,
  children,
  actions = null,
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
          left: "50vw",
          top: show ? "10vh" : "-50vh",
          width: "40vw",
          height: "60vh",
          transform: "translate(-50%, 0%)",
        }}
      >
        {title ?? (
          <h2 className="text-2xl font-bold text-slate-500 text-center">
            {title}
          </h2>
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

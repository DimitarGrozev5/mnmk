import clsx from "clsx";

type Props = {
  show: boolean;
  onClose: () => void;
  blur?: boolean;
};

const Overlay: React.FC<Props> = ({ show, onClose, blur }) => {
  return (
    <div
      onClick={onClose}
      className={clsx(
        show ? "visible opacity-100" : "invisible opacity-0",
        "fixed inset-0 z-50",
        "bg-black bg-opacity-40",
        "transition-all duration-150",
        blur && "bg-opacity-10 backdrop-blur-sm"
      )}
    />
  );
};

export default Overlay;

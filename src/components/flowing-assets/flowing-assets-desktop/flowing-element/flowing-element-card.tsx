import clsx from "clsx";

type Props = {
  rectangular?: boolean;
  children: React.ReactNode;
};

const FlowinfELementCard: React.FC<Props> = ({ rectangular, children }) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 z-10",
        "flex flex-col items-center justify-center",
        "p-3 w-36 overflow-hidden",
        "shadow-lg",
        "bg-slate-300 rounded-lg",
        rectangular ? "h-36" : "h-10"
      )}
    >
      {children}
    </div>
  );
};

export default FlowinfELementCard;

import { tw } from "../../../../util/tw";

type Props = {
  rectangular?: boolean;
  children: React.ReactNode;
};

const FlowingElementCard: React.FC<Props> = ({ rectangular, children }) => {
  return (
    <div
      className={tw(
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

export default FlowingElementCard;

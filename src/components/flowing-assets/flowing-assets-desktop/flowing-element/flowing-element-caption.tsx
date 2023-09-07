import clsx from "clsx";

type Props = {
  primaryText: string;
};

const FlowingElementCaption: React.FC<Props> = ({ primaryText }) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 bottom-3 z-20",
        "flex flex-col items-center justify-end",
        "text-slate-400"
      )}
    >
      {primaryText}
    </div>
  );
};

export default FlowingElementCaption;

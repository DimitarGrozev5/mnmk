import clsx from "clsx";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "p-1",
        "transition-all duration-100",
        "text-slate-600 uppercase",
        "hover:text-slate-400",
        "active:scale-95"
      )}
    >
      {children}
    </button>
  );
};

export default Button;

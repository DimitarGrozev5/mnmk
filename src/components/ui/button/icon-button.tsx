import { forwardRef } from "react";
import { tw } from "../../../util/tw";

type Props = {
  label: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
};

const IconButton = forwardRef<HTMLButtonElement | null, Props>(
  (
    {
      label,
      children,
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className={tw("active:scale-75", "transition-all duration-200")}
      >
        {children}
      </button>
    );
  }
);

export default IconButton;

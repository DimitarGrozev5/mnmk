import React from "react";
import { tw } from "../../../util/tw";
import { ClassValue } from "clsx";

type Props = {
  onClick?: () => void;
  variant?: "plain" | "contained";
  uppercase?: boolean;
  children: React.ReactNode;
  className?: ClassValue;
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { onClick, variant = "plain", uppercase = true, children, className },
    ref
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={tw(
          "inline-flex flex-col items-stretch",
          "p-1",
          "transition-all duration-100",
          "text-slate-600",
          uppercase && "uppercase",
          "hover:text-slate-400",
          "active:scale-95",
          variant === "contained" && "text-sky-500 bg-sky-200",
          variant === "contained" && "border border-sky-400 rounded-lg",
          variant === "contained" && "py-2 px-4",
          variant === "contained" &&
            "hover:bg-sky-300 hover:border-sky-500 hover:text-sky-700",
          className
        )}
      >
        {children}
      </button>
    );
  }
);

export default Button;

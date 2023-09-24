import { useCallback, useId, useState } from "react";
import { tw } from "../../../util/tw";

type AcceptedTypes = string;

type Props<T extends AcceptedTypes> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
};

const InputField = <T extends AcceptedTypes>({
  label,
  value,
  onChange,
}: Props<T>) => {
  const id = useId();

  const [focused, setFocused] = useState(false);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value as T);
    },
    [onChange]
  );

  return (
    <div className="relative">
      <label
        className={tw(
          "absolute translate-x-2 -translate-y-1/2",
          "px-1",
          "text-sky-500 text-xs",
          "bg-sky-50",
          "rounded-md",
          "transition-all duration-500",
          !focused && value === "" && "translate-y-2 text-sky-300 text-base"
        )}
        htmlFor={`${label}-${id}`}
      >
        <div
          className={tw(
            "absolute left-0 right-0 top-0 h-[60%]",
            "border border-sky-500 rounded-tl-md rounded-tr-md",
            "border-b-0",
            "transition-all duration-500",
            !focused && value === "" && "border-sky-50"
          )}
        />
        {label}
        <div
          className={tw(
            "absolute left-0 right-0 bottom-0 h-[60%]",
            "transition-all duration-500"
          )}
        />
      </label>

      <input
        name={`${label}-${id}`}
        id={`${label}-${id}`}
        className={tw(
          "px-4 py-2",
          "border border-sky-500 rounded-md",
          "text-sky-500",
          "bg-sky-50",
          "outline-3 outline-sky-500 outline-offset-2"
        )}
        value={value}
        onChange={onChangeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};
export default InputField;

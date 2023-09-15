import { tw } from "../../../util/tw";

type Props = {
  htmlFor: string;
  children: string;
  className?: string;
};

const InputLabel: React.FC<Props> = ({ htmlFor, children, className }) => {
  return (
    <label
      onClick={(e) => e.preventDefault()}
      htmlFor={htmlFor}
      className={tw("cursor-pointer", className)}
    >
      {children}
    </label>
  );
};

export default InputLabel;

import { tw } from "../../../util/tw";

type Props = {
  htmlFor: string;
  children: string;
};

const InputLabel: React.FC<Props> = ({ htmlFor, children }) => {
  return (
    <label
      onClick={(e) => e.preventDefault()}
      htmlFor={htmlFor}
      className={tw("cursor-pointer")}
    >
      {children}
    </label>
  );
};

export default InputLabel;

type Props = {
  space?:
    | "h-1"
    | "h-2"
    | "h-3"
    | "h-4"
    | "h-5"
    | "h-6"
    | "h-7"
    | "h-8"
    | "h-9"
    | "h-10";
};

const Spacer: React.FC<Props> = ({ space = "h-4" }) => {
  return <div className={space} />;
};

export default Spacer;

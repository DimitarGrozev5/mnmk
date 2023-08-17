type Props = {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};

const IconButton: React.FC<Props> = ({
  label,
  children,
  onClick,
  onMouseDown,
  onMouseUp,
}) => {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </button>
  );
};

export default IconButton;

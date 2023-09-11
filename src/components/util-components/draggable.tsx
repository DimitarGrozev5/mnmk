import { useState } from "react";
import clsx from "clsx";

type Props = {
  onDrop: (files: FileList) => void;
  children: React.ReactNode;
};

const Draggable: React.FC<Props> = ({ onDrop, children }) => {
  const [dragging, setDragging] = useState(0);

  const dragInHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging((prev) => prev + 1);
  };

  const dragOutHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging((prev) => prev - 1);
  };

  const dragHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files.length > 0
    ) {
      onDrop(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
    setDragging(0);
  };

  return (
    <div
      onDragEnter={dragInHandler}
      onDragLeave={dragOutHandler}
      onDragOver={dragHandler}
      onDrop={dropHandler}
      className={clsx(
        "border-4 border-dashed border-slate-500 bg-slate-200",
        "self-stretch flex-1 m-2",
        "flex flex-col items-center justify-center",
        "text-slate-600",
        dragging > 0 && "border-slate-400 bg-slate-100",
        dragging > 0 && "text-slate-300"
      )}
    >
      {children}
    </div>
  );
};

export default Draggable;

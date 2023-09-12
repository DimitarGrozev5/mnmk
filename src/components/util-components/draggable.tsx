import { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "../ui/button/button";

type Props = {
  onDrop: (files: FileList) => void;
  acceptMultiple?: boolean;
  children: React.ReactNode;
};

const Draggable: React.FC<Props> = ({
  onDrop,
  acceptMultiple = false,
  children,
}) => {
  const [dragging, setDragging] = useState(0);

  const [warning, setWarning] = useState("");

  const [autoConfirmLabel, setAutoConfirmLabel] = useState(0);

  useEffect(() => {
    if (warning !== "") {
      const target = new Date().getTime() + 5000;
      const timer = setInterval(() => {
        const now = new Date().getTime();

        if (now > target) {
          setWarning("");
          clearInterval(timer);
        } else {
          setAutoConfirmLabel(Math.round((target - now) / 1000));
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [warning]);

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
      if (!acceptMultiple && event.dataTransfer.files.length > 1) {
        setWarning("Only one file is allowed");
        setDragging(0);
        return;
      }

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
        "flex flex-col items-center justify-center gap-2",
        "text-slate-600",
        dragging > 0 && "border-slate-400 bg-slate-100",
        dragging > 0 && "text-slate-300"
      )}
    >
      {warning === "" ? (
        children
      ) : (
        <>
          <h1 className="text-xl font-semibold text-red-900">{warning}</h1>
          <Button variant="contained" onClick={() => setWarning("")}>
            OK ({autoConfirmLabel})
          </Button>
        </>
      )}
    </div>
  );
};

export default Draggable;

import { useMemo } from "react";

type Props = {
  startPoint: [number, number];
  endPoint: [number, number];
};

const FlowLine: React.FC<Props> = ({ startPoint, endPoint }) => {
  const [start, size]: [[number, number], [number, number]] = useMemo(() => {
    if (startPoint[0] !== endPoint[0]) {
      const x1 = Math.min(startPoint[0], endPoint[0]);
      const x2 = Math.max(startPoint[0], endPoint[0]);
      const y1 = x1 === startPoint[0] ? startPoint[1] : endPoint[1];
      const y2 = x2 === startPoint[0] ? startPoint[1] : endPoint[1];

      const w = Math.max(1, x2 - x1);
      const h = Math.max(1, y2 - y1);

      return [
        [x1, y1],
        [w, h],
      ];
    } else if (startPoint[1] !== endPoint[1]) {
      const y1 = Math.min(startPoint[1], endPoint[1]);
      const y2 = Math.max(startPoint[1], endPoint[1]);
      const x1 = y1 === startPoint[1] ? startPoint[0] : endPoint[0];
      const x2 = y2 === startPoint[1] ? startPoint[0] : endPoint[0];

      const w = Math.max(1, x2 - x1);
      const h = Math.max(1, y2 - y1);

      return [
        [x1, y1],
        [w, h],
      ];
    } else {
      console.error(
        "Line must be either horizontal or vertical. Provided points are wrong"
      );
      return [
        [0, 0],
        [0, 0],
      ];
    }
  }, [endPoint, startPoint]);

  return (
    <div
      className="border-t border-l border-slate-500"
      style={{
        position: "absolute",
        left: `${start[0]}px`,
        top: `${start[1]}px`,
        width: `${size[0]}px`,
        height: `${size[1]}px`,
      }}
    />
  );
};

export default FlowLine;

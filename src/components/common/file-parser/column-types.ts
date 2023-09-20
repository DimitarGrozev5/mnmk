export const fileColumns = {
  unset: { label: "Null" },
  number: { label: "Number" },
  pointName: { label: "Name" },
  northing: { label: "N" },
  easting: { label: "E" },
  height: { label: "H" },
  instrumentHeight: { label: "Vi" },
  observedName: { label: "Observed Name" },
  observedHeight: { label: "Vs" },
  horizontalAngle: { label: "R" },
  verticalAngle: { label: "Z" },
  slantDistance: { label: "S" },
  horizontalDistance: { label: "D" },
};

export type FileColumn = keyof typeof fileColumns;

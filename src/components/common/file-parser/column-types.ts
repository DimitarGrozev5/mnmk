/* eslint-disable @typescript-eslint/no-unused-vars */
const isNumber = (value: string) => !Number.isNaN(Number(value));

export const fileColumns = {
  unset: { label: "Null", validate: (_: string) => true },
  number: { label: "Number", validate: isNumber },
  pointName: { label: "Name", validate: (value: string) => value.length > 0 },
  northing: { label: "N", validate: isNumber },
  easting: { label: "E", validate: isNumber },
  height: { label: "H", validate: isNumber },
  instrumentHeight: { label: "Vi", validate: isNumber },
  observedName: {
    label: "Observed Name",
    validate: (value: string) => value.length > 0,
  },
  observedHeight: { label: "Vs", validate: isNumber },
  horizontalAngle: { label: "R", validate: isNumber },
  verticalAngle: { label: "Z", validate: isNumber },
  slantDistance: { label: "S", validate: isNumber },
  horizontalDistance: { label: "D", validate: isNumber },
};

export type FileColumn = keyof typeof fileColumns;

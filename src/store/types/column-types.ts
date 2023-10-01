/* eslint-disable @typescript-eslint/no-unused-vars */
const isNumber = (value: string) => !Number.isNaN(Number(value));
const alwaysTrue = (_: string) => true;

export const fileColumns = {
  unset: { label: "Null", validate: alwaysTrue },
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
  code: { label: "Code", validate: alwaysTrue },
};

export type FileColumn = keyof typeof fileColumns;

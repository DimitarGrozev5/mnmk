import { FileType } from "./file-types";

/* eslint-disable @typescript-eslint/no-unused-vars */
const isNumber = (value: string) => !Number.isNaN(Number(value));
const alwaysTrue = (_: string) => true;

export const fileColumns: Record<string, FileColumn> = {
  unset: {
    label: "Null",
    validate: alwaysTrue,
    forFileTypes: [],
  },
  number: {
    label: "Number",
    validate: isNumber,
    forFileTypes: [],
  },
  pointName: {
    label: "Name",
    validate: (value: string) => value.length > 0,
    forFileTypes: ["control", "gps"],
  },
  northing: {
    label: "N",
    validate: isNumber,
    forFileTypes: ["control", "gps"],
  },
  easting: {
    label: "E",
    validate: isNumber,
    forFileTypes: ["control", "gps"],
  },
  height: {
    label: "H",
    validate: isNumber,
    forFileTypes: ["control", "gps"],
  },
  instrumentHeight: {
    label: "Vi",
    validate: isNumber,
    forFileTypes: [],
  },
  stationName: {
    label: "Station Name",
    validate: (value: string) => value.length > 0,
    forFileTypes: ["ts"],
  },
  observedName: {
    label: "Observed Name",
    validate: (value: string) => value.length > 0,
    forFileTypes: ["ts"],
  },
  observedHeight: {
    label: "Vs",
    validate: isNumber,
    forFileTypes: ["ts"],
  },
  horizontalAngle: {
    label: "R",
    validate: isNumber,
    forFileTypes: ["ts"],
  },
  verticalAngle: {
    label: "Z",
    validate: isNumber,
    forFileTypes: ["ts"],
  },
  slantDistance: {
    label: "S",
    validate: isNumber,
    forFileTypes: ["ts"],
  },
  horizontalDistance: {
    label: "D",
    validate: isNumber,
    forFileTypes: ["ts"],
  },
  code: {
    label: "Code",
    validate: alwaysTrue,
    forFileTypes: ["control", "gps", "ts"],
  },
};

export type FileColumnCode = keyof typeof fileColumns;

export type FileColumn = {
  label: string;
  validate: (value: string) => boolean;
  forFileTypes: FileType[]; // Empty array means that all file types are supported
};

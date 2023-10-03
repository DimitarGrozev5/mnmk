import { FileType } from "./file-types";

/* eslint-disable @typescript-eslint/no-unused-vars */
const isNumber = (value: string) => !Number.isNaN(Number(value));
const alwaysTrue = (_: string) => true;

export const fileColumns = {
  unset: {
    id: "unset",
    label: "Null",
    validate: alwaysTrue,
    forFileTypes: [],
    singleUse: false,
  } as FileColumn,
  number: {
    id: "number",
    label: "Number",
    validate: isNumber,
    forFileTypes: [],
    singleUse: false,
  } as FileColumn,
  text: {
    id: "text",
    label: "Text",
    validate: alwaysTrue,
    forFileTypes: [],
    singleUse: false,
  } as FileColumn,
  pointName: {
    id: "pointName",
    label: "Name",
    validate: (value: string) => value.length > 0,
    forFileTypes: ["control", "gps"],
    singleUse: true,
  } as FileColumn,
  northing: {
    id: "northing",
    label: "N",
    validate: isNumber,
    forFileTypes: ["control", "gps"],
    singleUse: true,
  } as FileColumn,
  easting: {
    id: "easting",
    label: "E",
    validate: isNumber,
    forFileTypes: ["control", "gps"],
    singleUse: true,
  } as FileColumn,
  height: {
    id: "height",
    label: "H",
    validate: isNumber,
    forFileTypes: ["control", "gps"],
    singleUse: true,
  } as FileColumn,
  instrumentHeight: {
    id: "instrumentHeight",
    label: "Vi",
    validate: isNumber,
    forFileTypes: [],
    singleUse: true,
  } as FileColumn,
  stationName: {
    id: "stationName",
    label: "Station Name",
    validate: (value: string) => value.length > 0,
    forFileTypes: ["ts"],
    singleUse: true,
  } as FileColumn,
  observedName: {
    id: "observedName",
    label: "Observed Name",
    validate: (value: string) => value.length > 0,
    forFileTypes: ["ts"],
    singleUse: true,
  } as FileColumn,
  observedHeight: {
    id: "observedHeight",
    label: "Vs",
    validate: isNumber,
    forFileTypes: ["ts"],
    singleUse: true,
  } as FileColumn,
  horizontalAngle: {
    id: "horizontalAngle",
    label: "R",
    validate: isNumber,
    forFileTypes: ["ts"],
    singleUse: true,
  } as FileColumn,
  verticalAngle: {
    id: "verticalAngle",
    label: "Z",
    validate: isNumber,
    forFileTypes: ["ts"],
    singleUse: true,
  } as FileColumn,
  slantDistance: {
    id: "slantDistance",
    label: "S",
    validate: isNumber,
    forFileTypes: ["ts"],
    singleUse: true,
  } as FileColumn,
  horizontalDistance: {
    id: "horizontalDistance",
    label: "D",
    validate: isNumber,
    forFileTypes: ["ts"],
    singleUse: true,
  } as FileColumn,
  code: {
    id: "code",
    label: "Code",
    validate: alwaysTrue,
    forFileTypes: ["control", "gps", "ts"],
    singleUse: true,
  } as FileColumn,
};

export type FileColumnCode = keyof typeof fileColumns;

export type FileColumn = {
  id: string;
  label: string;
  validate: (value: string) => boolean;
  forFileTypes: FileType[]; // Empty array means that all file types are supported
  singleUse: boolean; // Single use columns can be used only once. Multiuse are things like string or null
};

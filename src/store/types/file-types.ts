export const fileTypes = {
  control: "Control Points",
  gps: "GPS Measured Points",
  ts: "Total Station Measured Points",
};

export type FileType = keyof typeof fileTypes;

export const dividers = {
  tab: { label: "Tab", regex: "\t" },
  space: { label: "Space", regex: " " },
  comma: { label: "Comma", regex: "," },
};

export type Divider = keyof typeof dividers;

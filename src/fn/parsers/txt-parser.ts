import { readFileAsText } from "../../util/read-file-as-text";

export const txtParser = async (file: File) =>
  readFileAsText(file).then((res) => {
    const lines = res.split("\n");
    return lines;
  });

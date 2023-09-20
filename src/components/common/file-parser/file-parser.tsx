import { useMemo } from "react";
import { Divider, dividers } from "./dividers";
import { tw } from "../../../util/tw";

type Props = {
  lines: string[];
  divider: Divider;
  ignoreFirstLine: boolean;
};

const FileParser: React.FC<Props> = ({ lines, divider, ignoreFirstLine }) => {
  const [parsedLlines, maxLineLen, firstLine] = useMemo(() => {
    let maxLineLen = 0;

    const parsedLines = lines.map((line) => {
      const parsedLine = line.split(dividers[divider].regex);
      maxLineLen = Math.max(maxLineLen, parsedLine.length);
      return parsedLine;
    });

    let firstLine: string[] = [];
    if (ignoreFirstLine) {
      firstLine = parsedLines.shift() ?? [];
    }

    return [parsedLines, maxLineLen, firstLine];
  }, [divider, ignoreFirstLine, lines]);

  return (
    <div
      className={tw(
        "flex-1",
        "border border-slate-400 bg-slate-200",
        "p-2",
        "flex flex-col items-start",
        "text-slate-500 text-clip text-center",
        "overflow-auto"
      )}
    >
      <table
        className={tw("border-separate border-spacing-x-2 border-spacing-y-1")}
      >
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {firstLine.length > 0 && (
            <tr className={tw("w-[max-content]", "odd:bg-slate-300")}>
              <th />
              {firstLine.map((field, indexField) => (
                <th
                  key={`first-line-${indexField}`}
                  className={tw(
                    "border border-slate-300 px-3",
                    "text-slate-800"
                  )}
                >
                  {field}
                </th>
              ))}
            </tr>
          )}
          {parsedLlines.map((line, indexLine) => (
            <tr
              key={indexLine}
              className={tw("w-[max-content]", "odd:bg-slate-300")}
            >
              <th
                className={tw(
                  "border border-slate-400 px-2",
                  "text-sm text-slate-400 font-normal"
                )}
              >
                {indexLine + 1}
              </th>
              {line.map((field, indexField) => (
                <td
                  key={`${indexLine}-${indexField}`}
                  className={tw(
                    "border border-slate-300 px-3",
                    "text-slate-800"
                  )}
                >
                  {field}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileParser;

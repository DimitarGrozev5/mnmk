import { Divider, dividers } from "../../../util/dividers";
import { tw } from "../../../util/tw";

type Props = {
  lines: string[];
  divider: Divider;
  ignoreFirstLine: boolean;
};

const FileParser: React.FC<Props> = ({ lines, divider, ignoreFirstLine }) => {
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
          {lines.slice(Number(ignoreFirstLine)).map((line, indexLine) => (
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
              {line.split(dividers[divider].regex).map((field, indexField) => (
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

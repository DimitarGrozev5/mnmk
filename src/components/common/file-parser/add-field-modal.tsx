import { useCallback, useState } from "react";
import Modal from "../../ui/modal/modal";
import { useAppDispatch } from "../../../store/hooks";
import { fileParserActions } from "../../../store/slices/file-parser-slice";
import IconButton from "../../ui/button/icon-button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import InputField from "../../ui/input/input";
import { tw } from "../../../util/tw";

type Props = {
  forRowId: string | undefined;
  atIndex: number | undefined;
  onClose: () => void;
};

const FileParserAddFieldModal: React.FC<Props> = ({
  forRowId,
  atIndex,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { addField } = fileParserActions;

  const [value, setValue] = useState("");

  const onAddField = useCallback(() => {
    if (forRowId === undefined || atIndex === undefined) return;

    dispatch(addField({ rowId: forRowId, atIndex, value }));
    onClose();
  }, [forRowId, atIndex, dispatch, addField, value, onClose]);

  return (
    <Modal
      show={forRowId !== undefined && atIndex !== undefined}
      onClose={onClose}
      compact
    >
      <div
        className={tw(
          "py-2",
          "self-stretch",
          "flex flex-row justify-between items-center gap-2"
        )}
      >
        <InputField label="Add Field" value={value} onChange={setValue} />
        <IconButton label="Save" onClick={onAddField}>
          <CheckIcon className="w-6 h-6 text-slate-500" />
        </IconButton>
        <IconButton label="Cancel" onClick={onClose}>
          <XMarkIcon className="w-6 h-6 text-slate-500" />
        </IconButton>
      </div>
    </Modal>
  );
};

export default FileParserAddFieldModal;

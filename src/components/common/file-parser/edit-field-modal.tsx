import { useCallback, useEffect, useState } from "react";
import Modal from "../../ui/modal/modal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fileParserActions,
  getFieldById,
} from "../../../store/slices/file-parser-slice";
import IconButton from "../../ui/button/icon-button";
import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import InputField from "../../ui/input/input";
import { tw } from "../../../util/tw";

type Props = {
  selectedFieldId: string | null;
  setSelectedFieldId: React.Dispatch<React.SetStateAction<string | null>>;
};

const FileParserEditFieldModal: React.FC<Props> = ({
  selectedFieldId,
  setSelectedFieldId,
}) => {
  const dispatch = useAppDispatch();
  const { editField } = fileParserActions;

  const field = useAppSelector(getFieldById(selectedFieldId ?? ""));

  const [editValue, setEditValue] = useState("");
  useEffect(() => {
    selectedFieldId !== null && setEditValue(field);
  }, [field, selectedFieldId]);

  const onEditField = useCallback(() => {
    if (selectedFieldId === null) return;
    dispatch(editField({ id: selectedFieldId, value: editValue }));
    setSelectedFieldId(null);
    setSelectedFieldId(null);
  }, [dispatch, editField, editValue, selectedFieldId, setSelectedFieldId]);

  const onClearField = useCallback(() => {
    if (selectedFieldId === null) return;
    dispatch(editField({ id: selectedFieldId, value: "" }));
    setSelectedFieldId(null);
  }, [dispatch, editField, selectedFieldId, setSelectedFieldId]);

  return (
    <Modal
      show={selectedFieldId !== null}
      onClose={() => setSelectedFieldId(null)}
      compact
    >
      <div
        className={tw(
          "self-stretch",
          "flex flex-row justify-between items-center gap-2"
        )}
      >
        <IconButton label="Clear" onClick={onClearField}>
          <TrashIcon className="w-6 h-6 text-slate-500" />
        </IconButton>
        <InputField
          label="Edit Field"
          value={editValue}
          onChange={setEditValue}
        />
        <IconButton label="Save" onClick={onEditField}>
          <CheckIcon className="w-6 h-6 text-slate-500" />
        </IconButton>
        <IconButton label="Cancel" onClick={() => setSelectedFieldId(null)}>
          <XMarkIcon className="w-6 h-6 text-slate-500" />
        </IconButton>
      </div>
    </Modal>
  );
};

export default FileParserEditFieldModal;

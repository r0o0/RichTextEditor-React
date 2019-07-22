import {
  // TextEditor
  EDITOR_SET,
  EDITOR_WRITING,
  EDITOR_RESET,
  EDITOR_SAVED,
  EDITOR_VALID,
  // alert dialog
  DIALOG_OPEN,
  DIALOG_CLOSE,
} from '../constants';

// Editor
const writingContent = (payload) => ({ type: EDITOR_WRITING, payload });
const setContent = (payload) => ({ type: EDITOR_SET, payload });
const resetEditor = () => ({ type: EDITOR_RESET });
const savedEditor = () => ({ type: EDITOR_SAVED });
const validEditor = (payload) => ({ type: EDITOR_VALID, payload });

// Alert Dialog
const triggerDialog = () => ({ type: DIALOG_OPEN });

export {
  setContent,
  writingContent,
  resetEditor,
  savedEditor,
  validEditor,
  triggerDialog,
};

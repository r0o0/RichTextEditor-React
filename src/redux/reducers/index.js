import { combineReducers } from 'redux';
// REDUCERS
import { triggerDialog } from './DialogReducer';
import { setEditorContent } from './EditorReducer';

const reducers = combineReducers({
  editor: setEditorContent,
  dialog: triggerDialog,
});

export default reducers;

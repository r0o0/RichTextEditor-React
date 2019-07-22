// CONSTANTS
import {
  EDITOR_SET,
  EDITOR_WRITING,
  EDITOR_RESET,
  EDITOR_SAVED,
  EDITOR_VALID,
} from '../constants';
// UTILS
import { editorValidator } from '../../utils/editor';

const initialState = {
  title: null,
  text: null,
  saved: null,
  valid: null,
};

function setEditorContent(state = initialState, action) {
  // console.log('Action', action.type);
  switch (action.type) {
    case EDITOR_SET:
      if (action.type === EDITOR_SET) {
        const { text, title } = action.payload;
        const keys = Object.keys(action.payload);
        // console.log('%c EDITOR_SET:', 'background: white; color: pink;', action.payload);
        for (const key of keys) {
          console.log(key);
          if (key === 'text') {
            return {
              ...state,
              text,
              saved: null,
            };
          }
          if (key === 'title') {
            return {
              ...state,
              title,
              saved: null,
            };
          }
        }

      }
      break;
    case EDITOR_WRITING:
      return {
        ...state,
        saved: false,
      };
    case EDITOR_RESET:
      return {
        text: "Tell a story...",
        saved: null,
      }
    case EDITOR_SAVED:
      return {
        ...state,
        saved: true,
      }
    case EDITOR_VALID:
      if (action.type === EDITOR_VALID) {
        const { text, title } = state;
        // console.log(
        //   '%c EDITOR_VALID ',
        //   'background: black; color: yellow;', '\n',
        //   'action', action.payload, '/n',
        //   'state', state,
        // );
        const isValid = editorValidator(text, title);
        return {
          ...state,
          valid: isValid,
        };
      }
      break;
    default:
      return state;
  }
}

export {
  setEditorContent,
};

import { DIALOG_OPEN, DIALOG_CLOSE } from '../constants';

const initialState = {
  status: false,
};

function triggerDialog(state = initialState, action) {
  switch (action.type) {
    case DIALOG_OPEN:
      console.log(action.type)
      return {
        status: true,
      };
    case DIALOG_CLOSE:
      return {
        status: false,
      };
    default:
      return state;
  }
}

export {
  triggerDialog,
};

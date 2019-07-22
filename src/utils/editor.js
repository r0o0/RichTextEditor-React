// editor, pages/write utils

export const editorValidator = (title, text) => {
  console.log('validator', title, text);
  let isValid;
  if (text === '<p></p>') {
    isValid = false;
  }
  if ((title === undefined || text === undefined) || (title === null || text === null) || (title.length <= 0 || text.length <= 0)) {
    isValid = false;
  }
  if (title !== undefined && text !== undefined && text !== null && title !== null) {
    if (title.length > 0 && text.length > 0) {
      isValid = true;
    }
  }
  return isValid;
};
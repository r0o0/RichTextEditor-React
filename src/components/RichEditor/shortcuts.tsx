import { isKeyHotkey } from 'is-hotkey';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+c');

export {
  isBoldHotkey,
  isItalicHotkey,
  isUnderlinedHotkey,
  isCodeHotkey,
};

const markData: { type: string, icon: string }[] = [
  {
    type: 'bold',
    icon: 'format_bold',
  },
  {
    type: 'italic',
    icon: 'format_italic',
  },
  {
    type: 'underlined',
    icon: 'format_underlined',
  },
];

const blockData: { type: string, icon: string }[] = [
  {
    type: 'code',
    icon: 'code',
  },
  {
    type: 'heading-one',
    icon: 'looks_one',
  },
  {
    type: 'heading-two',
    icon: 'looks_two',
  },
  {
    type: 'block-quote',
    icon: 'format_quote',
  },
  {
    type: 'numbered-list',
    icon: 'format_list_numbered',
  },
  {
    type: 'bulleted-list',
    icon: 'format_list_bulleted'
  },
];

export {
  markData,
  blockData,
};

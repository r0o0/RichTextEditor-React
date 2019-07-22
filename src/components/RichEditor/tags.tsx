interface TAGS {
  [key: string]: string;
};

const BLOCK_TAGS: TAGS = {
  p: 'paragraph',
  blockquote: 'block-quote',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
  li: 'list-item',
  ol: 'numbered-list',
  ul: 'bulleted-list',
};

const MARK_TAGS: TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underlined',
  // code: 'code',
};

export {
  BLOCK_TAGS,
  MARK_TAGS,
};

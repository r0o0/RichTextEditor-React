import React from 'react';
import Html, { Rule } from 'slate-html-serializer';
import { BLOCK_TAGS, MARK_TAGS } from './tags';

const rules: Rule[] = [
  // block element
  {
    deserialize(el: Element, next: any) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj: any, children: any) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>
                  {children}
                </code>
              </pre>
            );
          case 'paragraph':
            return <p>{children}</p>;
          case 'block-quote':
            return <blockquote>{children}</blockquote>;
          case 'heading-one':
            return <h1>{children}</h1>;
          case 'heading-two':
            return <h2>{children}</h2>;
          case 'list-item':
            return <li>{children}</li>;
          case 'numbered-list':
            return <ol>{children}</ol>;
          case 'bulleted-list':
            return <ul>{children}</ul>;
        }
      }
    },
  },
  // marks
  {
    deserialize(el: Element, next: any) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        // console.log('mark tags', el.attributes);
        return {
          object: 'mark',
          type: type,
          data: {
            // htmlAttributes: Array.prototype.slice.call(el.attributes).reduce((acc: any, curr: any) => {
            //   console.log('anoetunohuntohn', acc, curr);
            //   return {
            //     ...acc,
            //     [curr.name]: curr.value
            //   }
            // }, {})
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj: any, children: any) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underlined':
            return <u>{children}</u>;
        }
      }
    },
  },
];

const html = new Html({ rules });

export default html;
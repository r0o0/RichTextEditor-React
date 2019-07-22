// RichEditor.js
import React, { Component } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Value } from 'slate';
import { Editor, RenderMarkProps, RenderBlockProps } from 'slate-react';
import Plain from 'slate-plain-serializer';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// COMPONENTS
import ToolBar from './ToolBar';
// UTILS
import html from './serializer';
import {
  isBoldHotkey,
  isItalicHotkey,
  isUnderlinedHotkey,
  isCodeHotkey,
} from './shortcuts';

const documentValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                object: 'leaf',
                text: '',
              }
            ]
          },
        ],
      },
    ],
  },
});

interface RichTextState {
  value: Value;
  editorEl: number | null;
  keyEvent: boolean;
};

interface RichEditor {
  editor: any;
};

type Props = ReturnType<any> &
  ReturnType<any> & {
    setContent: (s: string) => any;
  };

const DEFAULT_NODE = 'paragraph';

// set initialValue
let initialValue: any;
if (localStorage.content) {
  console.log('yes');
  initialValue = localStorage.content;
}
if (!localStorage.content) {
  console.log('no');
  initialValue = Plain.serialize(documentValue);
}

class RichEditor extends Component<Props, RichTextState, RichEditor> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: html.deserialize(initialValue),
      editorEl: null,
      keyEvent: false,
    };
  }

  private ref = (editor: any) => {
    this.editor = editor;
  }

  private handleChange = ({ value }: any) => {
    // 에디터 value에 변화가 있으면 html 태그 형태로 window.localStorage에 저장
    if (this.state.keyEvent) {
      // localStorage에 저장된 값과 state에 있는 값이 다를 경우 localStorage 업뎃
      if (value.document !== this.state.value.document) {
        const string = html.serialize(value);
        localStorage.setItem('content', string);
      }
      // redux dispatch
      if (localStorage.getItem('content') !== null) {
        this.props.writingContent({ text: localStorage.content });
      }
    }
    // 에디터 value값 변화 적용
    this.setState({ value });
  };

  // 마크 쇼트키 누를시 해당 마크 텍스트 적용
  private handleKeyDown = (event: any, editor: any, next: any) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next();
    }
    event.preventDefault();
    editor.toggleMark(mark);
  };

  // 마크 클릭시 해당 마크 텍스트 적용
  handleClickMark = (event: any, type: string) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  // 블록 클릭시 해당 블록 텍스트 적용
  handleClickBlock = (event: any, type: string, hasBlock: any) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(type);
      const isList = hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock('list-item');
      const isType = value.blocks.some((block: any) => {
        return !!document.getClosest(block.key, (parent: any) => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  }

  // 마크에따라 텍스트 적용
  protected renderMark = (props: RenderMarkProps, editor: any, next: any) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next();
    }
  }

  // 블록에따라 텍스트 적용
  protected renderBlock = (props: RenderBlockProps, editor: any, next: any) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'code':
          return (
            <pre {...attributes}>
              <code>{children}</code>
            </pre>
          );
      default:
        return next();
    }
  }

  componentDidMount() {
    // update initialValue
    if (localStorage.content === undefined) {
      initialValue = Plain.serialize(documentValue);
      this.setState({ value: html.deserialize(initialValue) });
    } else {
      initialValue = localStorage.content;
      this.setState({ value: html.deserialize(initialValue) });
    }

    // on document load focus on editor
    if (this.editor.el) {
      this.editor.el.focus();
    }

    // editor's y coordinate value from top of window + padding
    const y = this.editor.el.getBoundingClientRect().top;
    this.setState({ editorEl: y });

    document.addEventListener('keydown', () => this.setState({ keyEvent: true }));
  }

  render() {
    return(
      <div className="editor">
        <ToolBar
          value={this.state.value}
          onClick={this.handleClickMark}
          onClickBlock={this.handleClickBlock}
        />
        <Editor
          css={css`
            min-height: calc(100vh - ${this.state.editorEl}px);
            padding: 0 16px;
            color: var(--text);
          `}
          ref={this.ref}
          className="editor--textarea" // can also style by using className prop
          value={this.state.value}
          placeholder="Tell a story..."
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          renderMark={this.renderMark}
          renderBlock={this.renderBlock}
        />
      </div>
    );
  }
}

const mapStateToProps = (store: any) => ({
  editor: store.editor,
});

export default connect(mapStateToProps, actions)(RichEditor);

// Write.js
import React, { useEffect, useState, useRef } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// COMPONENT
import RichEditor from '../../components/RichEditor';
import AlertDialog from '../../components/Dialog';
// CSS
import '../../globalStyle';

const inputTitle = css`
  width: 100%;
  height: 48px;
  margin-bottom: 24px;
  padding: 0 16px;
  border: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 28px;
  color: var(--text);
  &::placeholder {
    opacity: 0.33;
  }
  &:focus {
    outline: none;
  }
  label: input--title;
`;

interface Props {
  writingContent: ({ title: string} : any) => void;
}

function Write(props: Props) {
  // PROPS
  const { writingContent } = props;

  // STATE
  const [inputValue, setInputValue] = useState('');

  // METHODS
  const handleTitleChange = (e: any) => {
    localStorage.setItem('title', e.target.value);
    setInputValue(e.target.value);
    writingContent({ title: e.target.value })
  };

  // HOOKS
  useEffect(() => {
    const newValue = localStorage.getItem('title');
    if (newValue !== null) {
      setInputValue(newValue);
    }
  }, [inputValue, document.activeElement]);

  return (
    <div className="container">
      <input
        css={inputTitle}
        type="text"
        placeholder="Title"
        onChange={(e) => handleTitleChange(e)}
        value={inputValue}
        autoComplete="off"
      />
      <RichEditor />
      <AlertDialog />
    </div>
  )
}

export default connect(null, actions)(Write);

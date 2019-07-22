// Header.js
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import * as type from '../../types';
// UTILS
import { editorValidator } from '../../utils/editor';
// CSS
import '../../colors.css';

const header = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  label: global-header;
`;

const headerBig = css`
  padding: 20px 16px;
  @media(min-width: 720px) {
    padding: 24px 40px;
  }
  @media(min-width: 1440px) {
    padding: 24px 80px;
  }
  label: header-big;
`;

const h1 = css`
  font-size: 24px;
  &:hover {
    color: var(--primary);
  }
  label: logo;
`;

const span = css`
  margin-right: 12px;
  font-weight: bold;
  font-size: 14px;
  color: var(--light-md);
`;

const button = css`
  width: fit-content;
  padding: 8px 16px;
  border: 1px solid var(--light-md);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: var(--light-md);
  label: btn--publish;
`;

const activeBtn = css`
  border-color: var(--primary);
  color: var(--primary);
`;

interface Props {
  resetEditor: () => void;
  triggerDialog: () => void;
  editor: type.Editor,
}

function Header(props: Props) {
  const {
    resetEditor,
    triggerDialog,
    editor,
  } = props;

  // location path state,
  const path = window.location.pathname;
  const [locationPath, setLocationPath] = useState(path);

  const handlePublish = () => {
    resetEditor();
    localStorage.clear();
    triggerDialog();
    // window.location.reload(true);
  };

  useEffect(() => {
    setLocationPath(path);
  }, [path]);

  const renderEditorHeader = () => {
    const { saved, valid } = editor;
    const localTitle = localStorage.title;
    const localText = localStorage.content;

    const goodToPublish = () => {
      if (valid === null) {
        const isValid = editorValidator(localTitle, localText);
        if (isValid) {
          console.log('%c GOOD TO PUBLISH!!!! ', 'background: white; color: green;');
          return <button css={[button, activeBtn]} onClick={handlePublish}>Publish</button>;
        }
      } else {
        if (valid) {
          console.log('%c GOOD TO PUBLISH!!!! ', 'background: white; color: green;');
          return <button css={[button, activeBtn]} onClick={handlePublish}>Publish</button>;
        }
      }
      return <button css={button}>Not Ready</button>;
    };
    return (
      <div>
        {saved !== null ? <span css={span}>{!saved ? 'Writing...' : 'Saved'}</span> : null}
        {goodToPublish()}
      </div>
    );
  };

  return (
    <header
      css={[header, headerBig]}
    >
      <h1 css={h1}>
        Writer
      </h1>
      {locationPath === '/new-story' ? renderEditorHeader() : null}
    </header>
  )
}

const mapStateToProps = (store: any) => ({
  editor: store.editor,
  location: store.location,
});

export default connect(mapStateToProps, actions)(Header);

import React, { useState, useEffect, createContext } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/styles';
import * as types from '../types';

// MUI
const styles = {
  publishedDialog: {
    padding: '20px 24px',
    margin: '0',
    background: 'white',
  },
  dialogContext: {
    margin: '0',
    fontWeight: 500,
    color: 'green',
  }
}

function AlertDialog(props: any) {
  console.log(props);
  
  const { dialog, classes } = props;
  const { publishedDialog, dialogContext } = classes;
  return (
    <Dialog
      open={dialog.status}
    >
      <DialogContent className={publishedDialog}>
        <DialogContentText
          id="alert-dialog-slide-description"
          className={dialogContext}
        >
          Published!!! :)
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
const mapStateToProps = ({ dialog }: any) => ({ dialog });

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(AlertDialog);
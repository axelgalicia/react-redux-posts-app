import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ALL_CATEGORIES } from '../actions'

class PostForm extends Component {

    componentDidMount() {

    }


    render() {

        const { open, close, editMode, post, category } = this.props

        return (
            <div>

                <Dialog
                    open={open}
                    onClose={() => close()}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Category: {editMode ? post.title : 'Create Post'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {editMode ? post.category : category }
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="body"
                            label="Body"
                            type="text"
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="author"
                            label="Author"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => close()} color="primary">
                            Cancel
            </Button>
                        <Button onClick={() => close()} color="primary">
                            {editMode ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default PostForm;
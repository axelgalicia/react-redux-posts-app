//React-Redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
//Material-UI
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';


import { ALL_CATEGORIES } from '../actions'
import * as PostsAPI from '../services'

const uuidv1 = require('uuid/v1');

const styles = theme => ({

    textField: {
        width: 540,
    }

})

class CommentForm extends Component {

    state = {
        title: '',
        author: '',
        body: ''
    }

    componentDidMount() {
       

        let comment = this.props.comment
        if (this.props.editMode) {
            console.log('EDIT MODE')
            this.setState({
                title: comment.title,
                author: comment.author,
                body: comment.body
            })
        }

    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    createComment = () => {

        let now = new Date();
        let time = new Date(now).getTime();

        let comment = {
            body: this.state.body,
            author: this.state.author,
            timestamp: time,
            id: uuidv1(),
            parentId: this.props.parentId
        }

        PostsAPI.addComment(comment).then((comment) => {
            this.props.getComments()
            this.setState({
                title: '',
                author: '',
                body: ''
            })
            this.props.close()
        })

        
    }


    updateComment = () => {


        let now = new Date();
        let time = new Date(now).getTime();

        let comment = this.props.comment;

        console.log('before update:', comment);
        comment.timestamp = time;
        comment.body = this.state.body;

        console.log('after update', comment);

        PostsAPI.editComment(comment).then((comment) => {
            this.props.getComments()
            this.props.close()
        })
        
    }


    render() {

        const { classes, open, close, editMode, comment, categorySelected ,getComments} = this.props
        const { author, body } = this.state

        return (
            <div>

                <Dialog
                    open={open}
                    onClose={() => close()}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{editMode ? 'Edit Comment' : 'Create Comment'}</DialogTitle>
                    <DialogContent>


                        <TextField
                            autoFocus
                            disabled={editMode}
                            margin="dense"
                            id="author"
                            name="author"
                            label="Author"
                            type="text"
                            fullWidth
                            value={author}
                            onChange={this.handleInputChange}
                        />

                        <TextField
                            id="body"
                            name="body"
                            label="Body"
                            placeholder="Body of post"
                            multiline
                            margin="normal"
                            className={classes.textField}
                            value={body}
                            onChange={this.handleInputChange}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => close()} color="primary">
                            Cancel
            </Button>
                        <Button onClick={() => editMode ? this.updateComment() : this.createComment()} color="primary">
                            {editMode ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}



export default compose(withStyles(styles))(CommentForm)
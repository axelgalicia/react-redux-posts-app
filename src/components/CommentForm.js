/**
 * CommentForm Component
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

//React-Redux
import { connect } from 'react-redux';
import { compose } from 'recompose'
//Material-UI
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
//Local
import * as PostsAPI from '../services'
import { uuid } from '../utils'


const styles = theme => ({

    textField: {
        width: 540,
    }

})

const defaultState = {
    title: '',
    author: '',
    body: ''
}

class CommentForm extends Component {

    state = {
        title: '',
        author: '',
        body: ''
    }

    componentDidMount() {
        const { comment } = this.props

        if (this.props.editMode) {
            this.setState({
                title: comment.title,
                author: comment.author,
                body: comment.body
            })
        }

    }

    handleInputChange = (event) => {

        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    createComment = () => {

        let now = new Date();
        let time = new Date(now).getTime();
        const { author, body } = this.state
        const { getPosts, parentId, categorySelected, isDetails } = this.props
        const comment = {
            body: body,
            author: author,
            timestamp: time,
            id: uuid(),
            parentId: parentId
        }

        PostsAPI.addComment(comment).then((comment) => {
           // this.props.getComments()
            this.setState(defaultState)
            if(!isDetails) {
                getPosts(categorySelected)
            }
            this.props.close()
        })


    }


    updateComment = () => {

        let now = new Date();
        let time = new Date(now).getTime();

        let comment = this.props.comment;
        comment.timestamp = time;
        comment.body = this.state.body;

        PostsAPI.editComment(comment).then((comment) => {
            this.props.getComments()
            this.props.close()
        })

    }


    render() {

        const { classes, open, close, editMode} = this.props
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


const mapStateToProps = ({ appState: { categorySelected } }) => {
    return {
        categorySelected
    }
}



export default compose(withStyles(styles), connect(
    mapStateToProps
))(CommentForm)
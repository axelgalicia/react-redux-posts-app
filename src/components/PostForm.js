/**
 *  PostForm component  
 * 
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

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

import * as PostsAPI from '../services'
import { addPost, editPost } from '../actions/postActions'
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

class PostForm extends Component {

    state = {
        title: '',
        author: '',
        body: '',
        category: ''
    }

    componentDidMount() {
        const { post } = this.props
 
        if (this.props.editMode) {
            this.setState({
                title: post.title,
                author: post.author,
                body: post.body
            })
        }

    }

    handleInputChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    createPost = () => {

        let now = new Date();
        let time = new Date(now).getTime();
        const { title, body, author } = this.state

        let post = {
            title: title,
            body: body,
            author: author,
            category: this.props.categorySelected,
            timestamp: time,
            id: uuid(),
        }


        PostsAPI.addPost(post).then((post) => {
            this.props.addPost({ post: post });
            this.setState(defaultState)
            this.props.close()
        })

    }


    updatePost = () => {

        let post = this.props.post;
        const { author, body, title } = this.state
        post.author = author;
        post.body = body;
        post.title = title;

        PostsAPI.editPost(post).then((post) => {
            this.props.editPost({ post: post });
        })
        this.props.close()
    }


    render() {

        const { classes, open, close, editMode, post, categorySelected } = this.props
        const { title, author, body, } = this.state

        return (
            <div>

                <Dialog
                    open={open}
                    onClose={() => close()}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{editMode ? post.title : 'Create Post'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Category: {editMode ? post.category : categorySelected}
                        </DialogContentText>


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
                            autoFocus
                            margin="dense"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={title}
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
                        <Button onClick={() => editMode ? this.updatePost() : this.createPost()} color="primary">
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

const mapDispatchToProps = dispatch => {
    return {
        addPost: (data) => dispatch(addPost(data)),
        editPost: (data) => dispatch(editPost(data))
    }
}

export default compose(withStyles(styles), connect(
    mapStateToProps,
    mapDispatchToProps
))(PostForm)
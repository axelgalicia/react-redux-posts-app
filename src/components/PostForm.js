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
import { addPost } from '../actions'

const uuidv1 = require('uuid/v1');

const styles = theme => ({

    textField: {
        width: 540,
    }

})

class PostForm extends Component {

    state = {
        title: '',
        author: '',
        body: '',
        category: ''
    }

    componentDidMount() {

    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    createPost = () => {

        let now = new Date();
        let time = new Date(now).getTime();

        let post = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
            category: this.props.categorySelected,
            timestamp: time,
            id: uuidv1(),
        }

        console.log(post);

        PostsAPI.addPost(post).then((post) => {
            this.props.addPost({ post: post });
        })
        this.props.close()
    }


    render() {

        const { classes, open, close, editMode, post, categorySelected } = this.props

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
                            margin="dense"
                            id="author"
                            name="author"
                            label="Author"
                            type="text"
                            fullWidth
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
                            onChange={this.handleInputChange}
                        />

                        <TextField
                            id="body"
                            name="body"
                            label="With placeholder multiline"
                            placeholder="Body of post"
                            multiline
                            margin="normal"
                            className={classes.textField}
                            onChange={this.handleInputChange}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => close()} color="primary">
                            Cancel
            </Button>
                        <Button onClick={() => this.createPost()} color="primary">
                            {editMode ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({ appState }) => {
    return {
        categorySelected: appState.categorySelected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: (data) => dispatch(addPost(data))
    }
}

export default compose(withStyles(styles), connect(
    mapStateToProps,
    mapDispatchToProps
))(PostForm)
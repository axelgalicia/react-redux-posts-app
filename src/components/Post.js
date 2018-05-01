import React, { Component } from 'react';
//React-Redux
import { connect } from 'react-redux'
//Compose
import { compose } from 'recompose'
//Material-UI
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
//Icons
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import IconButton from 'material-ui/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import ModeEditIcon from '@material-ui/icons/ModeEdit';
//Timestamp
import Timestamp from 'react-timestamp';
//Local
import { addCategories, addPosts, addPost } from '../actions'




class Post extends Component {

    render() {
        return (
            <ListItem button>
                <Avatar>
                    <ImageIcon />|
            </Avatar>
                <ListItemText primary="Axel Galicia" secondary={<Timestamp time="2015-10-10 10:30:00" format='full' />} />
                <ListItemText primary="The Life in Mexico" secondary="Axel" />

                <ListItemSecondaryAction>
                    <IconButton aria-label="Comments">
                        <Badge className={classes.margin} badgeContent={4} color="primary" />
                        <CommentIcon />
                    </IconButton>
                    <IconButton aria-label="ModeEditIcon">
                        <ModeEditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}


const mapStateToProps = ({ appState }) => {
    return {
        categorySelected: appState.categorySelected,
        posts: appState.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategories: (data) => dispatch(addCategories(data)),
        addPosts: (data) => dispatch(addPosts(data)),
        addPost: (data) => dispatch(addPost(data))
    }
}

export default compose(withStyles(styles), connect(
    mapStateToProps,
    mapDispatchToProps
))(Post)

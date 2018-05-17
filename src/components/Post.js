import React, { Component } from 'react';
//React-Redux
import { connect } from 'react-redux';
//Compose
import { compose } from 'recompose';
//Material-UI
import Avatar from 'material-ui/Avatar';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Badge from 'material-ui/Badge';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
//Icons
import MailIcon from '@material-ui/icons/Mail';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import IconButton from 'material-ui/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import ModeEditIcon from '@material-ui/icons/ModeEdit';
import GradeIcon from '@material-ui/icons/Grade';
//Timestamp
import Timestamp from 'react-timestamp';
//Local
import { addCategories, addPosts, addPost, addComments, selectPost, ALL_CATEGORIES } from '../actions';
import Comment from './Comment'
import * as PostsAPI from '../services'

const styles = theme => ({
    comments: {
        marginLeft: 100,
        marginTop: 20,
        maxWidth: 1000,
        minWidth: 200,
    },
    margin: {
        margin: theme.spacing.unit * 1,
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});


class Post extends Component {


    componentDidMount = () => {

    }

    getComments = () => {
        if (this.props.postSelected) {
            PostsAPI.getCommentsByPostId(this.props.postSelected).then((comments) => {
                this.props.addComments({ comments: comments })
            })
        }
    }

    render() {


        //Props
        const { classes, categorySelected, comments, id, title, timestamp, body, author, voteScore, commentCount, postSelected } = this.props
        //Props actions
        const { selectPost } = this.props


        if (categorySelected ==! ALL_CATEGORIES) {
            this.getComments();
        }

        return (

            <div>
                <ListItem button onClick={() => selectPost({ postId: id })}>

                    <Grid item xs={12} sm={3}>
                        <Avatar>
                            <MailIcon />
                        </Avatar>
                        <ListItemText primary={author} secondary={<Timestamp time={new Date(timestamp).toISOString()} format='short' />} />
                        <ListItemText primary={title} secondary={body} />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Comments">
                                {
                                    commentCount > 0 ? <Badge className={classes.margin} badgeContent={commentCount} color="primary">
                                        <CommentIcon /></Badge> : <CommentIcon />
                                }

                            </IconButton>


                            <IconButton aria-label="ModeEditIcon">
                                <ModeEditIcon />
                            </IconButton>
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="Vote Up">
                                <ThumbUp />
                            </IconButton>
                            <IconButton aria-label="Vote Down">
                                <ThumbDown />
                            </IconButton>
                            <IconButton aria-label="Votes">
                                <Badge className={classes.margin} badgeContent={voteScore} color="primary">
                                    <GradeIcon />
                                </Badge>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </Grid>
                </ListItem>

                <Grid container className={classes.comments} spacing={8} alignItems="stretch" direction="column" justify="center">
                    {
                        comments.map((post) => (
                            <Comment
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                timestamp={post.timestamp}
                                body={post.body}
                                author={post.author}
                                voteScore={post.voteScore}
                                commentCount={post.commentCount} />
                        ))
                    }

                </Grid>
            </div>
        )
    }
}


const mapStateToProps = ({ appState }) => {
    return {
        categorySelected: appState.categorySelected,
        posts: appState.posts,
        postSelected: appState.postSelected,
        comments: appState.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategories: (data) => dispatch(addCategories(data)),
        addPosts: (data) => dispatch(addPosts(data)),
        selectPost: (data) => dispatch(selectPost(data)),
        addComments: (data) => dispatch(addComments(data))
    }
}

export default compose(withStyles(styles), connect(
    mapStateToProps,
    mapDispatchToProps
))(Post)

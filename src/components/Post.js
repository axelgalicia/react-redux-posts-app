import React, { Component } from 'react';
//React-Redux
import { connect } from 'react-redux';
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
import Tooltip from '@material-ui/core/Tooltip';

//Timestamp
import Timestamp from 'react-timestamp';
//Local
import { addCategories, addPosts, addPost, addComments, selectPost, deletePost, ALL_CATEGORIES, upVotePost, downVotePost } from '../actions';
import Comment from './Comment'
import * as PostsAPI from '../services'


class Post extends Component {

    state = {
        comments: [],
        showComments: false
    }


    componentDidMount = () => {

    }

    clickPost = (id) => {
        this.props.selectPost({ postId: id });
        this.getComments();
        this.setState(({ showComments: !this.state.showComments }))

    }

    deletePost = (id) => {
        PostsAPI.deletePost(id).then((comments) => {
            this.props.deletePost(({ post: { id: id } }));
        })
    }

    votePost = (id, vote) => {

        PostsAPI.votePost(id, vote).then((post) => {
            if (vote === '+') {
                this.props.upVotePost(({ post: post }))
            } else {
                this.props.downVotePost(({ post: post }))
            }
        })
    }

    getComments = () => {
        PostsAPI.getCommentsByPostId(this.props.id).then((comments) => {
            this.setState(({
                comments: comments
            }));
        })

    }

    deleteComment = (id) => {
        PostsAPI.deleteComment(id).then((comments) => {
            this.setState(({
                comments: this.state.comments.filter(({ id }) => id !== id),
                showComments: true
            }))
        })

        this.getComments();
    }

    render() {


        //Props
        const { classes, categorySelected, id, title, timestamp, body, author, voteScore, commentCount, postSelected } = this.props
        //Props actions
        const { selectPost } = this.props

        //State
        const { comments, showComments } = this.state

        // console.log('comments', comments)



        return (

            <div>
                {id}
                <ListItem button onClick={() => this.clickPost(id)}>

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
                                    commentCount > 0 ? <Badge badgeContent={commentCount} color="primary">
                                        <CommentIcon /></Badge> : <CommentIcon />
                                }

                            </IconButton>

                            <Tooltip title="Edit">
                                <IconButton aria-label="ModeEditIcon">
                                    <ModeEditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton aria-label="Delete" onClick={() => this.deletePost(id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Vote Up">
                                <IconButton aria-label="Vote Up" onClick={() => this.votePost(id, '+')}>
                                    <ThumbUp />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Vote Down">
                                <IconButton aria-label="Vote Down" onClick={() => this.votePost(id, '-')}>
                                    <ThumbDown />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Votes">
                                <IconButton aria-label="Votes">
                                    <Badge badgeContent={voteScore} color="primary">
                                        <GradeIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </Grid>
                </ListItem>

                <Grid container spacing={8} alignItems="stretch" direction="column" justify="center">
                    {

                        showComments ? (
                            comments.map((comment) => (

                                comment.deleted ? '' :
                                    <Comment
                                        key={comment.id}
                                        id={comment.id}
                                        title={comment.title}
                                        timestamp={comment.timestamp}
                                        body={comment.body}
                                        author={comment.author}
                                        voteScore={comment.voteScore}
                                        commentCount={comment.commentCount}
                                        deleteComment={this.deleteComment} />
                            ))

                        ) : ''
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
        postSelected: appState.postSelected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategories: (data) => dispatch(addCategories(data)),
        addPosts: (data) => dispatch(addPosts(data)),
        selectPost: (data) => dispatch(selectPost(data)),
        deletePost: (data) => dispatch(deletePost(data)),
        upVotePost: (data) => dispatch(upVotePost(data)),
        downVotePost: (data) => dispatch(downVotePost(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)

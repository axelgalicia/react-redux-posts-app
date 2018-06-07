/**
 * Post component
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */


import React, { Component } from 'react';
//Router
import { Link, withRouter } from 'react-router-dom'
//React-Redux
import { connect } from 'react-redux';
//Material-UI
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Grid from 'material-ui/Grid';
//Icons
import MailIcon from '@material-ui/icons/Mail';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

import IconButton from 'material-ui/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import ModeEditIcon from '@material-ui/icons/ModeEdit';
import GradeIcon from '@material-ui/icons/Grade';
import Tooltip from '@material-ui/core/Tooltip';

//Timestamp
import Timestamp from 'react-timestamp';
//Local
import { addCategories, ALL_CATEGORIES, selectCategory } from '../actions/categoryActions'
import { addPosts, selectPost, deletePost, upVotePost, downVotePost } from '../actions/postActions'
import { hide404, show404 } from '../actions'
import { dateFormatter } from '../utils/helpers'
import Comment from './Comment'
import CommentForm from './CommentForm'
import PostForm from './PostForm'
import * as PostsAPI from '../services'
import My404 from './My404'


class PostDetails extends Component {

    state = {
        comments: [],
        showComments: false,
        showPostForm: false,
        showCommentForm: false,
        showCommentEditForm: false
    }


    componentDidMount = () => {
        console.log(this.props)
        const { match } = this.props
        if (match && match.params && match.params.category && match.params.postId) {
            const { category, postId } = match.params

            console.log(category, postId)
            this.clickCategory(category);
            this.getPostById(postId);
            this.getComments()
        } else {
            this.clickCategory(ALL_CATEGORIES);
        }

    }

    clickCategory = (category) => {
        this.props.selectCategory({ category: category });
        this.props.hide404();
    }

    getPostById = (postId) => {
        PostsAPI.getPostById(postId).then((post) => {
            this.props.selectPost(postId);
            if (post.length < 1) {
                this.props.addPosts({ posts: [] });
                this.props.show404()
            }
            else {
                this.props.addPosts({ posts: [post] });
                this.setState(({ showNotExist: false }));
                this.props.hide404()
            }
        })
    }

    clickPost = (e, id) => {
        e.stopPropagation()
        this.props.selectPost({ postId: id });
        this.setState(({
            showComments: !this.state.showComments
        }))
        this.getComments();


    }

    editPostClick = (e) => {
        e.stopPropagation()
        this.setState({ showPostForm: true })
    }

    addNewComment = (e) => {
        this.setState({ showCommentEditForm: true })
        e.stopPropagation();

    }

    deletePost = (e, id) => {
        PostsAPI.deletePost(id).then((comments) => {
            this.props.deletePost(({ post: { id: id } }));
        })
    }

    votePost = (e, id, vote) => {
        e.stopPropagation()
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

    deleteComment = (e, id) => {
        e.stopPropagation()
        PostsAPI.deleteComment(id).then((comments) => {
            this.setState(({
                comments: this.state.comments.filter(({ id }) => id !== id),
                showComments: true
            }))
        })

        this.getComments();
    }


    voteComment = (e, id, vote) => {
        e.stopPropagation()
        PostsAPI.voteComment(id, vote).then((comment) => {
            this.getComments();
        })
    }

    editPost = (e) => {
        e.stopPropagation()
        this.setState({ showPostForm: true })
    }

    close = () => {
        this.setState({ showPostForm: false })
    }

    closeCommentForm = () => {
        this.setState({ showCommentForm: false })
    }

    closeCommentEditForm = () => {
        this.setState({ showCommentEditForm: false })
    }

    render() {

        //Props
        const { posts, showMy404, location } = this.props


        //Props
        const { category, id, title, timestamp, body, author, voteScore, commentCount } = posts[0] ? posts[0] : {}

        //State
        const { comments, showComments, showPostForm, showCommentForm, showCommentEditForm } = this.state

        const postObj = {
            id: id,
            author: author,
            body: body,
            title: title,
            category: category
        }

        return (

            <div>
                {showMy404 ? <My404 /> : [
                    <h3>Post Details </h3>,
                    <PostForm
                        open={showPostForm}
                        post={postObj}
                        close={this.close}
                        editMode={true} />,
                    <CommentForm
                        parentId={id}
                        open={showCommentEditForm}
                        comment={null}
                        close={this.closeCommentEditForm}
                        editMode={false}
                        getComments={this.getComments} />,
                    <ListItem button onClick={(e) => this.clickPost(e, id)}>

                        <Grid item xs={12} sm={3}>
                            <Avatar>
                                <MailIcon />
                            </Avatar>
                            <ListItemText primary={author} secondary={<Timestamp time={dateFormatter(timestamp)} format='short' />} />
                            <ListItemText primary={title} secondary={body} />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <ListItemSecondaryAction>
                                <Tooltip title="Add new comment">
                                    <IconButton aria-label="Comments" onClick={(e) => this.addNewComment(e)}>
                                        {
                                            commentCount > 0 ? <Badge badgeContent={commentCount} color="primary">
                                                <CommentIcon /></Badge> : <CommentIcon />
                                        }

                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <IconButton aria-label="ModeEditIcon" onClick={(e) => this.editPostClick(e)}>
                                        <ModeEditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="Delete" onClick={(e) => this.deletePost(e, id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Vote Up">
                                    <IconButton aria-label="Vote Up" onClick={(e) => this.votePost(e, id, '+')}>
                                        <ThumbUp />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Vote Down">
                                    <IconButton aria-label="Vote Down" onClick={(e) => this.votePost(e, id, '-')}>
                                        <ThumbDown />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Votes">
                                    <IconButton aria-label="Votes">
                                        <Badge badgeContent={voteScore ? voteScore : '0'} color="primary">
                                            <GradeIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </Grid>
                    </ListItem>,

                    <Grid container spacing={8} alignItems="stretch" direction="column" justify="center">
                        {

                            showComments ? (
                                comments.map((comment) => (

                                    comment.deleted ? '' : [
                                        <CommentForm
                                            key={comment.id + id}
                                            open={showCommentForm}
                                            comment={comment}
                                            close={this.closeCommentForm}
                                            editMode={true}
                                            getComments={this.getComments} />,
                                        <Comment
                                            key={comment.id}
                                            id={comment.id}
                                            timestamp={comment.timestamp}
                                            body={comment.body}
                                            author={comment.author}
                                            voteScore={comment.voteScore}
                                            commentCount={comment.commentCount}
                                            deleteComment={this.deleteComment}
                                            voteComment={this.voteComment}
                                            parentId={id}
                                            getComments={this.getComments} />
                                    ]))

                            ) : ''
                        }

                    </Grid>
                ]}
            </div>

        )
    }
}


const mapStateToProps = ({ appState: { categorySelected, posts, postSelected, show404 } }) => {
    return {
        categorySelected,
        posts,
        postSelected,
        showMy404: show404
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategories: (data) => dispatch(addCategories(data)),
        selectCategory: (data) => dispatch(selectCategory(data)),
        hide404: () => dispatch(hide404()),
        show404: () => dispatch(show404()),
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
)(PostDetails)

/**
 * Post component
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */


import React, { Component } from 'react';
//Router
import { Link } from 'react-router-dom'
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
import { addCategories } from '../actions/categoryActions'
import { addPosts, selectPost, deletePost, upVotePost, downVotePost } from '../actions/postActions'
import { dateFormatter } from '../utils/helpers'
import CommentForm from './CommentForm'
import PostForm from './PostForm'
import * as PostsAPI from '../services'


class Post extends Component {

    state = {
        comments: [],
        showComments: false,
        showPostForm: false,
        showCommentForm: false,
        showCommentEditForm: false
    }


    componentDidMount = () => {

    }

    clickPost = (e, id) => {
        e.stopPropagation()
        this.props.selectPost({ postId: id });
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
        e.stopPropagation()
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
        const { category, id, title, timestamp, body, author, voteScore, commentCount, getPosts } = this.props

        //State
        const { showPostForm, showCommentEditForm } = this.state

        const postObj = {
            id: id,
            author: author,
            body: body,
            title: title,
            category: category
        }


        return (

            <div>

                <PostForm
                    open={showPostForm}
                    post={postObj}
                    close={this.close}
                    editMode={true} />
                <CommentForm
                    parentId={id}
                    open={showCommentEditForm}
                    comment={null}
                    close={this.closeCommentEditForm}
                    editMode={false}
                    getPosts={getPosts} />


                <ListItem button onClick={(e) => this.clickPost(e, id)}>

                    <Grid item xs={12} sm={3}>
                        <Avatar>
                            <MailIcon />
                        </Avatar>
                        <ListItemText primary={author} secondary={<Timestamp time={dateFormatter(timestamp)} format='short' />} />
                        <Link to={`/${category}/${id}`} onClick={(e) => this.clickDetails(e)}> <ListItemText primary={title} secondary={body} /> </Link>
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
                                    <Badge badgeContent={voteScore} color="primary">
                                        <GradeIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </Grid>
                </ListItem>



            </div>
        )
    }
}


const mapStateToProps = ({ appState: { categorySelected, posts, postSelected } }) => {
    return {
        categorySelected,
        posts,
        postSelected
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

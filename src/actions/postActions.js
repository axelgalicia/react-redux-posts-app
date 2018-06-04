/**
 * Actions to be used for the Readable project
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */


//Posts
export const ADD_POSTS = 'ADD_POSTS'
export const ADD_POST = 'ADD_POST'
export const SELECT_POST = 'SELECT_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

//Posts Votes
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'


export const selectPost = ({ postId }) => ({
    type: SELECT_POST,
    postId
});

export const editPost = ({ post }) => ({
    type: EDIT_POST,
    post
});

export const deletePost = ({ post }) => ({
    type: DELETE_POST,
    post
});

export const addPosts = ({ posts }) => ({
    type: ADD_POSTS,
    posts
});

export const addPost = ({ post }) => ({
    type: ADD_POST,
    post
});

export const upVotePost = ({ post }) => ({
    type: UP_VOTE_POST,
    post
});

export const downVotePost = ({ post }) => ({
    type: DOWN_VOTE_POST,
    post
});

/**
 * Actions to be used for the Readable project
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

//Categories
export const ALL_CATEGORIES = 'ALL_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'
//Posts
export const ADD_POSTS = 'ADD_POSTS'
export const ADD_POST = 'ADD_POST'
export const SELECT_POST = 'SELECT_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
//Posts Votes
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
//Comments
export const SELECT_COMMENT = 'SELECT_COMMENT'
export const ADD_COMMENTS = 'ADD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
//Comments Votes
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'

//Filters
export const FILTER_BY_TIMESTAMP = 'FILTER_BY_TIMESTAMP'
export const FILTER_BY_VOTES = 'FILTER_BY_VOTES'
export const ORDER_BY = 'ORDER_BY'

//UI
export const SHOW_404 = 'SHOW_404'
export const HIDE_404 = 'HIDE_404'


export const addCategories = ({ categories }) => ({
    type: ADD_CATEGORIES,
    categories
});

export const selectCategory = ({ category }) => ({
    type: SELECT_CATEGORY,
    category
});

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


export const filterByTimestamp = () => ({
    type: FILTER_BY_TIMESTAMP
});

export const filterByVotes = () => ({
    type: FILTER_BY_VOTES
});

export const orderBy = () => ({
    type: ORDER_BY
})

export const show404 = () => ({
    type: SHOW_404
});


export const hide404 = () => ({
    type: HIDE_404
});








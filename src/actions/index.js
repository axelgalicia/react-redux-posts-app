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

export const addPost = ({ id, timestamp, title, body, author, category }) => ({
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
});

export const upVotePost = ({ post }) => ({
    type: UP_VOTE_POST,
    post
});

export const downVotePost = ({ post }) => ({
    type: DOWN_VOTE_POST,
    post
});


export const selectComment = ({ comment }) => ({
    type: SELECT_COMMENT,
    comment
})

export const addComments = ({ comments }) => ({
    type: ADD_COMMENTS,
    comments
})

export const addComment = ({ postId, comment }) => ({
    type: ADD_COMMENT,
    postId,
    comment
})

export const editComment = ({ comment }) => ({
    type: EDIT_COMMENT,
    comment
})

export const deleteComment = ({ comment }) => ({
    type: DELETE_COMMENT,
    comment
})

export const upVoteComment = ({ comment }) => ({
    type: UP_VOTE_COMMENT,
    comment
});

export const downVoteComment = ({ comment }) => ({
    type: DOWN_VOTE_COMMENT,
    comment
});


export const filterByTimestamp = ({ posts }) => ({
    type: FILTER_BY_TIMESTAMP,
    posts
});

export const filterByVotes = ({ posts }) => ({
    type: FILTER_BY_VOTES,
    posts
});

export const show404 = () => ({
    type: SHOW_404
});


export const hide404 = () => ({
    type: HIDE_404
});








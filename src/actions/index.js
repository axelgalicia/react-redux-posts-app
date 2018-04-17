//Categories
export const ALL_CATEGORIES = 'ALL_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'
//Posts
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
//Posts Votes
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
//Comments
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

//Filters
export const FILTER_BY_TIMESTAMP = 'FILTER_BY_TIMESTAMP'
export const FILTER_BY_VOTE = 'FILTER_BY_VOTE'


export const addCategories = ({categories}) => ({
    type: ADD_CATEGORIES,
    categories
});

export const selectCategory = ({category}) => ({
    type: SELECT_CATEGORY,
    category
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


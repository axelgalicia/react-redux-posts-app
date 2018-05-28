import {
    ALL_CATEGORIES,
    ADD_CATEGORIES,
    SELECT_CATEGORY,
    ADD_POSTS,
    ADD_POST,
    SELECT_POST,
    EDIT_POST,
    DELETE_POST,
    SELECT_COMMENT,
    ADD_COMMENTS,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT,
    FILTER_BY_TIMESTAMP,
    FILTER_BY_VOTES,
    SHOW_404,
    HIDE_404
} from '../actions'
//Redux
import { combineReducers } from 'redux'
//Local
import { cloneObject } from '../utils'


const initialAppState = {
    allCategories: true,
    categorySelected: ALL_CATEGORIES,
    postSelected: null,
    commentSelected: null,
    categories: [],
    posts: [],
    comments: [],
    show404: false
}



function appState(state = initialAppState, action) {
    const {
        category,
        categories,
        posts,
        post,
        postId,
        comment,
        comments,
        type
    } = action

    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ' + post)

    switch (type) {

        case ADD_CATEGORIES:
            return {
                ...state,
                categories: categories
            }
        case SELECT_CATEGORY:
            return {
                ...state,
                categorySelected: category,
                allCategories: category === ALL_CATEGORIES ? true : false
            }

        case ADD_POSTS:
            return {
                ...state,
                posts: posts
            }
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    post
                ]
            }
        case SELECT_POST:
            return {
                ...state,
                postSelected: postId
            }
        case EDIT_POST:
            let indexEditPost = state.posts.findIndex(({ id }) => id === post.id);
            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, indexEditPost),
                    post,
                    ...state.posts.slice(indexEditPost + 1)]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(({ id }) => id !== post.id)
            }
        case UP_VOTE_POST:
            let indexUpVotePost = state.posts.findIndex(({ id }) => id === post.id);
            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, indexUpVotePost),
                    {
                        ...state.posts[indexUpVotePost],
                        voteScore: post.voteScore
                    },
                    ...state.posts.slice(indexUpVotePost + 1)
                ]
            }
        case DOWN_VOTE_POST:
            let indexDownVotePost = state.posts.findIndex(({ id }) => id === post.id);
            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, indexDownVotePost),
                    {
                        ...state.posts[indexDownVotePost],
                        voteScore: post.voteScore
                    },
                    ...state.posts.slice(indexDownVotePost + 1)
                ]
            }

        case SELECT_COMMENT:
            return {
                ...state,
                commentSelected: comment.id,
                postSelected: comment.parentId
            }

        case ADD_COMMENTS:
            return {
                ...state,
                comments: comments
            }

        case ADD_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments,
                    comment
                ]
            }
        case EDIT_COMMENT:
            let indexEditComment = state.comments.findIndex(({ id }) => id === comment.id);
            return {
                ...state,
                comments: [
                    state.comments.slice(0, indexEditComment),
                    comment,
                    state.comments.slice(indexEditComment + 1)
                ]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(({ id }) => comment.id !== comment.id)
            }
        case UP_VOTE_COMMENT:
            let indexUpVoteComment = state.comments.findIndex(({ id }) => id === comment.id);
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, indexUpVoteComment),
                    {
                        ...state.comments[indexUpVoteComment],
                        voteScore: comment.voteScore + 1
                    },
                    ...state.comments.slice(indexUpVoteComment + 1)
                ]
            }
        case DOWN_VOTE_COMMENT:
            let indexDownVoteComment = state.comments.findIndex(({ id }) => id === comment.id);
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, indexDownVoteComment),
                    {
                        ...state.comments[indexDownVoteComment],
                        voteScore: comment.voteScore - 1
                    },
                    ...state.comments.slice(indexDownVoteComment + 1)
                ]
            }

        case FILTER_BY_TIMESTAMP:
            let byTimePosts = cloneObject(state.posts);
            return {
                ...state,
                posts: byTimePosts.sort(orderByTimestamp)
            }
        case FILTER_BY_VOTES:
            let byVotesPosts = cloneObject(state.posts);
            return {
                ...state,
                posts: byVotesPosts.sort(orderByTimestamp)
            }
        case SHOW_404:
            return {
                ...state,
                show404: true
            }
        case HIDE_404:
            return {
                ...state,
                show404: false
            }

        default:
            return state
    }
}

const orderByVotes = (a, b) => {
    return a.voteScore - b.voteScore;
}

const orderByTimestamp = (a, b) => {
    return a.timestamp - b.timestamp;
}


export default combineReducers({
    appState
})
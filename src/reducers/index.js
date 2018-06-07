/**
 * Reducers
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

import { ALL_CATEGORIES, ADD_CATEGORIES, SELECT_CATEGORY } from '../actions/categoryActions'
import { ADD_POSTS, ADD_POST, SELECT_POST, EDIT_POST, DELETE_POST, UP_VOTE_POST, DOWN_VOTE_POST } from '../actions/postActions'
import { FILTER_BY_TIMESTAMP, FILTER_BY_VOTES, ORDER_BY } from '../actions/filterActions'
import { SHOW_404, HIDE_404 } from '../actions'

//Redux
import { combineReducers } from 'redux'
//Local
import { cloneObject } from '../utils'


const initialAppState = {
    allCategories: true,
    categorySelected: ALL_CATEGORIES,
    postSelected: null,
    postDetails:{},
    commentSelected: null,
    categories: [],
    posts: [],
    comments: [],
    show404: false,
    orderAsc: false
}



function appState(state = initialAppState, action) {
    const {
        category,
        categories,
        posts,
        post,
        postId,
        type
    } = action

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
        case EDIT_POST: {
            let indexEditPost = state.posts.findIndex(({ id }) => id === post.id);
            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, indexEditPost),
                    post,
                    ...state.posts.slice(indexEditPost + 1)]
            }

        }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(({ id }) => id !== post.id)
            }
        case UP_VOTE_POST: {
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

        }

        case DOWN_VOTE_POST: {
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
        }

        case ORDER_BY:
            return {
                ...state,
                orderAsc: !state.orderAsc
            }

        case FILTER_BY_TIMESTAMP: {
            let byTimePosts = cloneObject(state.posts);
            return {
                ...state,
                posts: byTimePosts.sort(state.orderAsc ? orderByTimestampAsc : orderByTimestampDesc)
            }
        }

        case FILTER_BY_VOTES: {
            let byVotesPosts = cloneObject(state.posts);
            return {
                ...state,
                posts: byVotesPosts.sort(state.orderAsc ? orderByVotesAsc : orderByVotesDesc)
            }
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

const orderByVotesAsc = (a, b) => {

    if (a.voteScore < b.voteScore) {
        return -1;
    }
    if (a.voteScore > b.voteScore) {
        return 1;
    }

    return 0;
}

const orderByVotesDesc = (a, b) => {

    if (b.voteScore < a.voteScore) {
        return -1;
    }
    if (b.voteScore > a.voteScore) {
        return 1;
    }

    return 0;
}

const orderByTimestampAsc = (a, b) => {
    if (a.timestamp < b.timestamp) {
        return -1;
    }
    if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
}

const orderByTimestampDesc = (a, b) => {

    if (b.timestamp < a.timestamp) {
        return -1;
    }
    if (b.timestamp > a.timestamp) {
        return 1;
    }

    return 0;
}


export default combineReducers({
    appState
})
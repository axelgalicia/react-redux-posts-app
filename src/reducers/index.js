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
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT,
    FILTER_BY_TIMESTAMP,
    FILTER_BY_VOTES
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
    categories: [{
        "name": "reactDummy",
        "path": "react"
    },
    {
        "name": "reduxDummy",
        "path": "redux"
    },
    {
        "name": "udacityDummy",
        "path": "udacity"
    }],
    posts: [
        {
            "id": "8xf0y6ziyjabvozdd253nd",
            "timestamp": 1467166872634,
            "title": "Udacity is the best place to learn React",
            "body": "Everyone says so after all.",
            "author": "thingtwo",
            "category": "react",
            "voteScore": 6,
            "deleted": false,
            "commentCount": 2
        },
        {
            "id": "6ni6ok3ym7mf1p33lnez",
            "timestamp": 1468479767190,
            "title": "Learn Redux in 10 minutes!",
            "body": "Just kidding. It takes more than 10 minutes to learn technology.",
            "author": "thingone",
            "category": "redux",
            "voteScore": -5,
            "deleted": false,
            "commentCount": 0
        }
    ],
    comments: [
        {
            "id": "894tuq4ut84ut8v4t8wun89g",
            "parentId": "8xf0y6ziyjabvozdd253nd",
            "timestamp": 1468166872634,
            "body": "Hi there! I am a COMMENT.",
            "author": "thingtwo",
            "voteScore": 6,
            "deleted": false,
            "parentDeleted": false
        },
        {
            "id": "8tu4bsun805n8un48ve89",
            "parentId": "8xf0y6ziyjabvozdd253nd",
            "timestamp": 1469479767190,
            "body": "Comments. Are. Cool.",
            "author": "thingone",
            "voteScore": -5,
            "deleted": false,
            "parentDeleted": false
        },
        {
            "id": "comment01",
            "timestamp": 1467166872222,
            "body": "Hello Comment 1",
            "author": "Axel Galicia",
            "parentId": "8xf0y6ziyjabvozdd253nd",
            "voteScore": 1,
            "deleted": false,
            "parentDeleted": false
        }
    ]
}



function appState(state = initialAppState, action) {
    const {
        id,
        timestamp,
        title,
        body,
        author,
        category,
        categories,
        posts,
        post,
        comment,
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
                posts: posts
            }
        case SELECT_POST:
            return {
                ...state,
                postSelected: post.id
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
                posts: state.posts.filter((post) => post.id !== post.id)
            }
        case UP_VOTE_POST:
            let indexUpVotePost = state.posts.findIndex(({ id }) => id === post.id);
            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, indexUpVotePost),
                    {
                        ...state.posts[indexUpVotePost],
                        voteScore: post.voteScore + 1
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
                        voteScore: post.voteScore - 1
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
                comments: state.comments.filter((comment) => comment.id !== comment.id)
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
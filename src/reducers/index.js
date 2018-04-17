import { ALL_CATEGORIES, ADD_CATEGORIES, SELECT_CATEGORY, ADD_POST } from '../actions'
import { combineReducers } from 'redux'

const initialAppState = {
    allCategories: true,
    categorySelected: ALL_CATEGORIES,
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
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id,
                        timestamp,
                        title,
                        body,
                        author,
                        category
                    }
                ]
            }
        default:
            return state
    }
}


export default combineReducers({
    appState
})
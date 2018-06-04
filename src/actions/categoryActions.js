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

export const addCategories = ({ categories }) => ({
    type: ADD_CATEGORIES,
    categories
});

export const selectCategory = ({ category }) => ({
    type: SELECT_CATEGORY,
    category
});
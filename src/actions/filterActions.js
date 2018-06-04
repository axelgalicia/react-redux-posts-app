/**
 * Actions to be used for the Readable project
 *
 * @version 1.0.0
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */



//Filters
export const FILTER_BY_TIMESTAMP = 'FILTER_BY_TIMESTAMP'
export const FILTER_BY_VOTES = 'FILTER_BY_VOTES'
export const ORDER_BY = 'ORDER_BY'

export const filterByTimestamp = () => ({
    type: FILTER_BY_TIMESTAMP
});

export const filterByVotes = () => ({
    type: FILTER_BY_VOTES
});

export const orderBy = () => ({
    type: ORDER_BY
})
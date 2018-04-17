


const initialPostsState = {
    categorySelected: null,
    allCategories: true,
    posts: []
}

const z = {
    ...initialPostsState,
    ...initialPostsState.posts.push({a:1})
}

const m = {
    ...z,
    ...z.posts.push({b:2})
}


console.log(m)
initialPostsState = {}


console.log(m)

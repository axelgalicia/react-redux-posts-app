const API = 'http://localhost:3001'

const headers = {
    'Authorization': '123'
}



export function getAllCategories() {

    return fetch(`${API}/categories`, { headers })
        .then((res) => res.json())
        .then(data => data.categories)
}

export function getAllPosts() {

    return fetch(`${API}/posts`, { headers })
        .then((res) => res.json())
        .then(data => data)
}

export function getPostsByCategory(category) {

    return fetch(`${API}/${category}/posts`, { headers })
        .then((res) => res.json())
        .then(data => data)
}


export function getCommentsByPostId(postId) {

    return fetch(`${API}/posts/${postId}/comments`, { headers })
        .then((res) => res.json())
        .then(data => data)
}


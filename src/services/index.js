const API = 'http://localhost:3001'

const headers = {
    'Authorization': '123',
    'Content-Type': 'application/json'
}

const upVote = {
    "option": "upVote"
}

const downVote = {
    "option": "downVote"
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

export function getPostById(postId) {

    return fetch(`${API}/posts/${postId}`, { headers })
    .then((res) => {
        if(res.ok) {
            return Promise.resolve(res.json())
        }
        else {
            return Promise.resolve([])
        }
    })
}


export function votePost(postId, vote) {

    return fetch(`${API}/posts/${postId}`, {
        headers, method: 'POST', body: JSON.stringify(vote === '+' ? upVote : downVote)
    })
        .then((res) => res.json())
        .then(data => data)
}


export function deletePost(postId) {

    return fetch(`${API}/posts/${postId}`, { headers, method: 'DELETE' })
        .then((res) => res.json())
        .then(data => data)
}

export function deleteComment(commentId) {

    return fetch(`${API}/comments/${commentId}`, { headers, method: 'DELETE' })
        .then((res) => res.json())
        .then(data => data)
}

export function getCommentsByPostId(postId) {

    return fetch(`${API}/posts/${postId}/comments`, { headers })
        .then((res) => res.json())
        .then(data => data)
}


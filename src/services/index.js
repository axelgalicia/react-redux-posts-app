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

export function addPost(post) {

    return fetch(`${API}/posts/`, {
        headers, method: 'POST', body: JSON.stringify(post)
    })
        .then((res) => res.json())
        .then(data => data)
}

export function addComment(comment) {

    return fetch(`${API}/comments/`, {
        headers, method: 'POST', body: JSON.stringify(comment)
    })
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
            if (res.ok) {
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

export function voteComment(conmmentId, vote) {

    return fetch(`${API}/comments/${conmmentId}`, {
        headers, method: 'POST', body: JSON.stringify(vote === '+' ? upVote : downVote)
    })
        .then((res) => res.json())
        .then(data => data)
}


export function editPost(post) {

    return fetch(`${API}/posts/${post.id}`, { headers, method: 'PUT', body: JSON.stringify(post) })
        .then((res) => res.json())
        .then(data => data)
}


export function editComment(comment) {

    return fetch(`${API}/comments/${comment.id}`, { headers, method: 'PUT', body: JSON.stringify(comment) })
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


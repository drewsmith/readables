import axios from 'axios'
import { headers, serverUrl } from '../config'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECIEVE_POST = 'RECIEVE_POST'
export const CREATE_POST = 'CREATE_POST'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'
export const VOTE = 'VOTE'
export const RECEIVE_VOTE = 'RECEIVE_VOTE'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const SORT_BY = 'SORT'
export const FETCH_FAILED = 'FETCH_FAILED'

export const requestPosts = () => ({
  type: REQUEST_POSTS
})

export const fetchPosts = () => {
  return dispatch => {
    dispatch(requestPosts())
    return axios({
        headers,
        url: `${serverUrl}/posts`
      })
      .then(response => response.data)
      .then(data => {
        dispatch(receivePosts(data))
        return data
      })
      .then(data => {
        data.forEach(post => dispatch(fetchComments(post.id)))
      })
      .catch(() => dispatch(fetchFailed()))
  }
}

export const requestPost = () => ({
  type: REQUEST_POST
})

export const fetchPost = (postId) => {
  return dispatch => {
    dispatch(requestPost())
    return axios({
        headers,
        url: `${serverUrl}/posts/${postId}`
      })
      .then(response => response.data)
      .then(data => {
        if(data && data.id) {
          dispatch(receivePost(data))
          dispatch(fetchComments(data.id))
        } else {
          dispatch(fetchFailed())
        }
      })
      .catch(() => dispatch(fetchFailed()))
  }
}

export const createPost = (post) => {
  return dispatch => {
    return axios({
        headers,
        method: 'POST',
        url: `${serverUrl}/posts`,
        data: post
      }).then(() => dispatch(fetchPosts()))
  }
}

export const editPost = (title, body, postId) => {
  return dispatch => {
    return axios({
        headers,
        method: 'PUT',
        url: `${serverUrl}/posts/${postId}`,
        data: {
          title: title,
          body: body
        }
      })
      .then(response => response.data)
      .then(data => dispatch(receivePost(data)))
  }
}

export const fetchPostsByCategory = (category = '') => {
  return dispatch => {
    dispatch(requestPosts())
    return axios({
        headers,
        url: `${serverUrl}/${category}/posts`
      })
      .then(response => response.data)
      .then(data => {
        dispatch(receivePosts(data, category))
        return data
      })
      .then(data => {
        data.forEach(post => dispatch(fetchComments(post.id)))
      })
      .catch(() => dispatch(fetchFailed()))
  }
}

export const fetchComments = (postId) => {
  return dispatch => {
    return axios({
        headers,
        url: `${serverUrl}/posts/${postId}/comments`
      })
      .then(response => response.data)
      .then(data => dispatch(receiveComments(data, postId)))
  }
}

export const votePost = (postId, direction) => {
  return dispatch => {
    let vote = direction === 'up' ? 'upVote' : 'downVote'
    return axios({
        headers,
        method: 'POST',
        url: `${serverUrl}/posts/${postId}`,
        data: {
          option: vote
        }
      })
      .then(response => response.data)
      .then(data => dispatch(recieveVote(data)))
  }
}

export const voteComment = (commentId, direction) => {
  return dispatch => {
    let vote = direction === 'up' ? 'upVote' : 'downVote'
    return axios({
        headers,
        method: 'POST',
        url: `${serverUrl}/comments/${commentId}`,
        data: {
          option: vote
        }
      })
      .then(response => response.data)
      .then(data => dispatch(updateComment(data)))
  }
}

export const addComment = (comment) => {
  return dispatch => {
    return axios({
        headers,
        method: 'POST',
        url: `${serverUrl}/comments`,
        data: comment
      })
      .then(response => response.data)
      .then(data => dispatch(updateComment(data)))
  }
}

export const deleteComment = (commentId) => {
  return dispatch => {
    return axios({
        headers,
        method: 'DELETE',
        url: `${serverUrl}/comments/${commentId}`
      })
      .then(response => response.data)
      .then(data => dispatch(fetchComments(data.parentId)))
  }
}

export const editComment = (commentId, commentBody) => {
  return dispatch => {
    return axios({
        headers,
        method: 'PUT',
        url: `${serverUrl}/comments/${commentId}`,
        data: {
          timestamp: Date.now(),
          body: commentBody
        }
      })
      .then(response => response.data)
      .then(data => dispatch(updateComment(data)))
  }
}

export const deletePost = (postId) => {
  return dispatch => {
    return axios({
        headers,
        method: 'DELETE',
        url: `${serverUrl}/posts/${postId}`
      })
      .then(() => dispatch(fetchPosts()))
  }
}

export const receivePosts = (data, category) => ({
  type: RECIEVE_POSTS,
  posts: data,
  category: category
})

export const receivePost = (data) => ({
  type: RECIEVE_POST,
  post: data
})

export const recieveVote = (data) => ({
  type: RECEIVE_VOTE,
  post: data
})

export const receiveComments = (data, postId) => ({
  type: RECIEVE_COMMENTS,
  comments: data,
  postId: postId
})

export const sortPostsBy = (sortMethod) => ({
  type: SORT_BY,
  sortMethod: sortMethod
})

export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment: comment
})

export const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId: commentId
})

export const fetchFailed = () => ({
  type: FETCH_FAILED
})

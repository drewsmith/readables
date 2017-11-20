import axios from 'axios'
import { headers, serverUrl } from '../config'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECIEVE_POST = 'RECIEVE_POST'
export const CREATE_POST = 'CREATE_POST'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'
export const VOTE = 'VOTE'

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
        data.map(post => dispatch(fetchComments(post.id)))
      })
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
        dispatch(receivePost(data))
        return data
      })
      .then(data => dispatch(fetchComments(data.id)))
  }
}

export const createPost = (post) => {
  return dispatch => {
    return axios({
        headers,
        method: 'POST',
        url: `${serverUrl}/posts`,
        data: post
      })
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
        data.map(post => dispatch(fetchComments(post.id)))
      })
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

export const vote = (postId, direction) => {
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

export const receiveComments = (data, postId) => ({
  type: RECIEVE_COMMENTS,
  comments: data,
  postId: postId
})

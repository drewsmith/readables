import axios from 'axios'
import { headers, serverUrl } from '../config'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'

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

export const createPost = (post) => {
  return dispatch => {
    return axios({
        headers,
        method: 'POST',
        url: `${serverUrl}/posts`,
        data: post
      })
      .then(console.log)
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
        dispatch(receivePosts(data))
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

export const receivePosts = (data) => ({
  type: RECIEVE_POSTS,
  posts: data
})

export const receiveComments = (data, postId) => ({
  type: RECIEVE_COMMENTS,
  comments: data,
  postId: postId
})

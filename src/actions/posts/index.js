import axios from 'axios'
import { headers, serverUrl } from '../config'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
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

export const fetchComments = (postId) => {
  return dispatch => {
    return axios({
        headers,
        url: `${serverUrl}/posts/${postId}/comments`
      })
      .then(response => response.data)
      .then(data => dispatch(receiveComments(postId, data)))
  }
}

export const receivePosts = (data) => ({
  type: RECEIVE_POSTS,
  posts: data
})

export const receiveComments = (postId, data) => ({
  type: RECEIVE_COMMENTS,
  postId: postId,
  comments: data
})

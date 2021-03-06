import {
  REQUEST_POSTS,
  RECIEVE_POSTS,
  REQUEST_POST,
  RECIEVE_POST,
  RECIEVE_COMMENTS,
  CREATE_POST,
  SORT_BY,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
  RECEIVE_VOTE,
  FETCH_FAILED
} from '../../actions/posts'

import { sortByVoteScore, sortByTimestamp } from '../../util'

const ALL_CATEGORY = 'All'
const VOTE_SCORE = 'voteScore'
const CREATE_DATE = 'createDate'

const fixCase = (category = '') => category ? `${category.charAt(0).toUpperCase()}${category.substr(1)}` : ''

const sortBy = (sortMethod = VOTE_SCORE) => {
  switch(sortMethod) {
    case VOTE_SCORE:
      return sortByVoteScore
    case CREATE_DATE:
      return sortByTimestamp
    default:
      return () => {}
  }
}

const replacePost = (posts, newPost, sortMethod) => (
  Object.assign(
    [],
    posts.filter(post => post.id !== newPost.id).concat(newPost)
  ).sort(sortBy(sortMethod))
)

const posts = (state = {
  loading: false,
  items: [],
  comments: {},
  post: null,
  category: ALL_CATEGORY,
  sortMethod: VOTE_SCORE,
  fetchFailed: false
}, action) => {
  switch(action.type) {
    case FETCH_FAILED:
      return {
        ...state,
        post: null,
        items: [],
        fetchFailed: true,
        loading: false
      }
    case REQUEST_POSTS:
      return {
        ...state,
        loading: true
      }
    case RECIEVE_POSTS:
      return {
        ...state,
        loading: false,
        items: action.posts.sort(sortBy(state.sortMethod)),
        category: fixCase(action.category ? action.category : ALL_CATEGORY),
        fetchFailed: false
      }
    case REQUEST_POST:
      return {
        ...state,
        loading: true
      }
    case RECIEVE_POST:
      return {
        ...state,
        loading: false,
        post: action.post,
        items: replacePost(state.items, action.post, state.sortMethod),
        fetchFailed: false
      }
    case RECIEVE_COMMENTS:
      let { comments = [], postId } = action
      return {
        ...state,
        comments: {
          ...state.comments,
          [postId]: comments.filter(comment => !comment.deleted).sort(sortBy(state.sortMethod))
        }
      }
    case CREATE_POST:
      return {
        ...state,
        items: state.items.concat(action.post)
      }
    case SORT_BY:
      return {
        ...state,
        sortMethod: action.sortMethod,
        items: state.items.sort(sortBy(action.sortMethod))
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.parentId]: Object.assign([],
            state.comments[action.comment.parentId].filter(prev => prev.id !== action.comment.id).concat(action.comment)
          ).sort(sortByVoteScore)
        }
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments.filter(prev => prev.id !== action.commentId)
        }
      }
    case RECEIVE_VOTE:
      return {
        ...state,
        post: action.post,
        items: replacePost(state.items, action.post, state.sortMethod)
      }
    default:
      return state
  }
}

export default posts

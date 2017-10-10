import {
  REQUEST_POSTS,
  RECIEVE_POSTS,
  RECIEVE_COMMENTS
} from '../../actions/posts'

const posts = (state = {
  loading: false,
  items: [],
  comments: []
}, action) => {
  switch(action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        loading: true
      }
    case RECIEVE_POSTS:
      return {
        ...state,
        loading: false,
        items: action.posts
      }
    case RECIEVE_COMMENTS:
      let { comments = [] } = action
      return {
        ...state,
        comments: state.comments.concat(comments)
      }
    default:
      return state
  }
}

export default posts

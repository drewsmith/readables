import {
  REQUEST_POSTS,
  RECIEVE_POSTS,
  REQUEST_POST,
  RECIEVE_POST,
  RECIEVE_COMMENTS,
  CREATE_POST
} from '../../actions/posts'

const posts = (state = {
  loading: false,
  items: [],
  comments: [],
  post: null
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
        items: action.posts.sort((first, second) => second.voteScore - first.voteScore)
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
        post: action.post
      }
    case RECIEVE_COMMENTS:
      let { comments = [], postId } = action
      return {
        ...state,
        comments: {
          ...state.comments,
          [postId]: comments
        }
      }
    case CREATE_POST:
      return {
        ...state,
        posts: state.posts.concat(action.post)
      }
    default:
      return state
  }
}

export default posts

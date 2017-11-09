import {
  REQUEST_POSTS,
  RECIEVE_POSTS,
  RECIEVE_COMMENTS,
  CREATE_POST
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
        items: action.posts.sort((first, second) => second.voteScore - first.voteScore)
      }
    case RECIEVE_COMMENTS:
      let { comments = [] } = action
      return {
        ...state,
        comments: state.comments.concat(comments)
      }
    case CREATE_POST:
      let { post } = action
      return {
        ...state,
        posts: state.posts.concat(post)
      }
    default:
      return state
  }
}

export default posts

const initialPosts = []

const posts = (state = initialPosts, action) => {
  switch(action.type) {

    case "ADD_POST":
      let { post } = action
      return state.concat(post)

    case "REMOVE_POST":
      let { postId } = action.post
      return state.filter(post => post.id !== postId)

    case "GET_POSTS":
      return state
      
    default:
      return state
  }
}

export default posts

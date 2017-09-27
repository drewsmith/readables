const initialPosts = [{
  id: '1',
  title: 'Fake Title',
  createdOn: 'March 01, 2017',
  creator: 'Drew Smith',
  votes: 0
}]

const posts = (state = initialPosts, action) => {
  switch(action.type) {

    case "ADD_POST":
      let { post } = action
      return state.concat(post)

    case "REMOVE_POST":
      let { postId } = action.post
      return state.filter(post => post.id !== postId)

    default:
      return state
  }
}

export default posts

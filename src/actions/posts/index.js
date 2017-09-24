export const addPost = (post) => {
  return {
    type: "ADD_POST",
    post: post
  }
}

export const getPosts = () => {
  return {
    type: "GET_POSTS",
  }
}

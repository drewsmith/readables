const initialCategories = []

const categories = (state = initialCategories, action) => {
  switch(action.type) {
    case "ADD_CATEGORY":
      const { category } = action

      if(state.indexOf(category) >= 0) {
        return state
      }

      return state.concat(category)
    default:
      return state
  }
}

export default categories

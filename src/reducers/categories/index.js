const initialCategories = ["All"]

const categories = (state = initialCategories, action) => {
  switch(action.type) {

    case "ADD_CATEGORY":
      const { category } = action
      if(state.indexOf(category) >= 0) {
        return {
          ...state,
          categories: state.categories
        }
      }
      return {
        ...state,
        categories: state.concat(category)
      }
      
    default:
      return state
  }
}

export default categories

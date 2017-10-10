import {
  REQUEST_CATEGORIGES,
  RECEIVE_CATEGORIGES
} from '../../actions/categories'

const categories = (state = {
  loading: false,
  items: []
}, action) => {
  switch(action.type) {
    case REQUEST_CATEGORIGES:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_CATEGORIGES:
      return {
        ...state,
        loading: false,
        items: action.categories
      }
    default:
      return state
  }
}

export default categories

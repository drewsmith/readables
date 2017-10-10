import axios from 'axios'
import { headers, serverUrl } from '../config'

export const REQUEST_CATEGORIGES = 'REQUEST_CATEGORIGES'
export const RECEIVE_CATEGORIGES = 'RECEIVE_CATEGORIGES'

export const requestCategories = () => ({
  type: REQUEST_CATEGORIGES
})

export const fetchCategories = () => {
  return dispatch => {
    dispatch(requestCategories())
    return axios({
        headers,
        url: `${serverUrl}/categories`
      })
      .then(response => response.data)
      .then(data => dispatch(receiveCategories(data)))
  }
}

export const receiveCategories = (data) => ({
  type: RECEIVE_CATEGORIGES,
  categories: data.categories
})

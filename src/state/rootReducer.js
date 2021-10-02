import {getBooks} from "../api/api"
const SET_BOOKS = 'SET_BOOKS'
const SET_BOOKS_COUNT = 'SET_BOOKS_COUNT'

const initialState = {
  booksList:[],
  booksCount:null
}

const rootReducer = (state = initialState, action) =>{
  switch (action.type){
    case SET_BOOKS:
      return {
        ...state,
        booksList: action.booksList
      }
    case SET_BOOKS_COUNT:{
      return {
        ...state,
        booksCount:action.booksCount
      }
    }
    default:
      return state
  }
}

export const setBooks = (booksList) => ({type:SET_BOOKS,booksList})

export const setBooksCount = booksCount => ({type:SET_BOOKS_COUNT, booksCount})

export const getBooksList = (searchText,orderBy) => async dispatch =>{
  //todo:при пустом тексте показывать самые популярные книги
  let response = await getBooks(searchText,orderBy)
  if (response.status === 200){
    dispatch(setBooks(response.data.items))
    dispatch(setBooksCount(response.data.totalItems))
  }
}

export default rootReducer
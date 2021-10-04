import {API} from '../api/api'
import NoPhoto from '../images/No_image_available.svg'
const SET_BOOKS = 'SET_BOOKS'
const SET_BOOKS_COUNT = 'SET_BOOKS_COUNT'
const CHOOSE_BOOK = 'CHOOSE_BOOK'
const SET_LOADING = 'SET_LOADING'
const SET_MORE_LOADING = 'SET_MORE_LOADING'
const SET_MORE_BOOKS = 'SET_MORE_BOOKS'
const SET_ERROR = 'SET_ERROR'

const initialState = {
  hasError:false,
  isLoading:false,
  isMoreLoading:false,
  searchText:null,
  orderBy:null,
  category:null,
  currentBook:{
    title:null,
    categories:[],
    authors:[],
    publishedDate:null,
    description:null,
    averageRating:null,
    ratingsCount:null,
    imageLink:null,
    amount:null,  //проверка на стоимость
    currency:null,
    buyLink:null,
  },
  booksList:[],
  booksCount:null
}

const rootReducer = (state = initialState, action) =>{
  switch (action.type){
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_MORE_LOADING:
      debugger
      return {
        ...state,
        isMoreLoading: action.isMoreLoading
      }
    case SET_BOOKS:
      return {
        ...state,
        searchText:action.searchText,
        orderBy:action.orderBy,
        category:action.category,
        booksList: action.booksList
      }
    case SET_MORE_BOOKS:
      return {
        ...state,
        booksList: [...state.booksList, ...action.booksList]
      }
    case SET_ERROR:
      return {
        ...state,
        hasError: action.hasError
      }
    case CHOOSE_BOOK:
      return {
        ...state,
        currentBook: action.currentBook
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

export const setBooks = (booksList,searchText,orderBy,category) => ({type:SET_BOOKS,booksList,searchText,orderBy,category})

export const setMoreBooks = (booksList) => ({type:SET_MORE_BOOKS, booksList})

export const setLoading = isLoading => ({type:SET_LOADING, isLoading})

export const setError = hasError => ({type:SET_ERROR, hasError})

export const setMoreLoading = isMoreLoading => ({type:SET_MORE_LOADING, isMoreLoading})

export const setBooksCount = booksCount => ({type:SET_BOOKS_COUNT, booksCount})

export const chooseBook = currentBook => ({type:CHOOSE_BOOK, currentBook})

export const getMoreBooks = (searchText,orderBy,category,startIndex) => async dispatch =>{
  dispatch(setMoreLoading(true))
  let response = await API.getBooks(searchText,orderBy,category, startIndex)
  if (response.status === 200){
    dispatch(setMoreBooks(response.data.items))
  }
  dispatch(setMoreLoading(false))
}

export const getBooksList = (searchText,orderBy,category) => async dispatch =>{
  if (!searchText) {
    dispatch(setError(true))
    return
  }
  dispatch(setError(false))
  dispatch(setLoading(true))

  let response = await API.getBooks(searchText,orderBy,category, 0)
  if (response.status === 200){
    dispatch(setBooks(response.data.items,searchText,orderBy,category))
    dispatch(setBooksCount(response.data.totalItems))
  }
  dispatch(setLoading(false))
}

export const getBook = (id) => async dispatch =>{
  dispatch(setLoading(true))
  let response = await API.getBook(id)
  if (response.status === 200){
    const {volumeInfo, saleInfo} = response.data
    let result = {
        title: volumeInfo.title,
        categories:volumeInfo.categories,
        authors:volumeInfo.authors,
        publishedDate:volumeInfo.publishedDate,
        description:volumeInfo.description,
        averageRating:volumeInfo.averageRating,
        ratingsCount:volumeInfo.ratingsCount,
        imageLink:volumeInfo?.imageLinks?.thumbnail || NoPhoto,
        amount:saleInfo.listPrice?.amount,  //проверка на стоимость
        currency:saleInfo.listPrice?.currencyCode,
        buyLink:saleInfo.buyLink,
      }
      dispatch(chooseBook(result))
  }
  dispatch(setLoading(false))
}

export default rootReducer
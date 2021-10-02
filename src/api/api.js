import * as axios from "axios"
import ApiKey from "../ApiKey"

const instance = axios.create({
  baseURL: ' https://www.googleapis.com/books/v1/volumes',
  params: {'key': ApiKey,'maxResults':30}
});

export const getBooks = (searchText,orderBy) => instance.get('',{
  params:{'q':searchText,'orderBy':orderBy}
})
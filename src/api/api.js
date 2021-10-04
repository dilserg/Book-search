import * as axios from "axios"
import ApiKey from "../ApiKey"

const instance = axios.create({
  baseURL: ' https://www.googleapis.com/books/v1/volumes',
  params: {'key': ApiKey,'maxResults':30}
});

const qValidator = (searchText, category) =>{
  if (category === 'all') return searchText
  return `${searchText}+subject:${category}`
}

export const API = {

  getBooks:(searchText,orderBy,category,startIndex) => instance.get('',{
    params:{'q':qValidator(searchText, category),'orderBy':orderBy, 'startIndex':startIndex}
  }),
  getBook : (id) => instance.get(id)
}

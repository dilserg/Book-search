import React from 'react';
import style from './BooksList.module.css'
import {useDispatch, useSelector} from "react-redux"
import BookCard from "./BookCard/BookCard"
import Loader from "../Loader/Loader"
import {getMoreBooks} from "../../state/rootReducer"

const BooksList = () => {
  const dispatch = useDispatch()
  const {isMoreLoading, searchText, orderBy, category, booksCount,booksList,isLoading} = useSelector(state => state)
  const [booksLoaded, setBooksLoaded] = React.useState(30)

  const showButton = () =>{
    if (isMoreLoading) return <div className={style.buttonLoader}><Loader/></div>
    if (booksCount - booksLoaded > 30) return <button className={style.button} type='button' onClick={loadBooks}>Load more</button>
  }

  const loadBooks = () =>{
    setBooksLoaded(booksLoaded=>booksLoaded + 30)
    dispatch(getMoreBooks(searchText,orderBy,category,booksLoaded))
  }

  if (isLoading) return <Loader/>

  if (booksCount === null) return <></>
  return (
    <div>
          <div className={style.countLabel}>found {booksCount} books</div>
          <div className={style.booksList}>
            {booksList?.map(({id, volumeInfo}) => <BookCard id={id} key={id} title={volumeInfo.title}
                                                           authors={volumeInfo.authors} categories={volumeInfo.categories}
                                                           photoLink={volumeInfo.imageLinks?.thumbnail}/>)}
          </div>
      <div className={style.buttonWrapper}>
        {showButton()}
      </div>
    </div>
  );
};

export default BooksList;
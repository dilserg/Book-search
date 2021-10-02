import React from 'react';
import style from './BooksList.module.css'
import {useDispatch, useSelector} from "react-redux"
import BookCard from "./BookCard/BookCard"

const BooksList = () => {
  let booksCount = useSelector(state => state.booksCount)
  let booksList = useSelector(state => state.booksList)
  let dispatch = useDispatch()

  if (booksCount=== null) return <div>null</div>

  return (
    <div>
      { booksCount
        ? <>
          <div className={style.countLabel}>found {booksCount} books</div>
          <div className={style.booksList}>
            {booksList.map(({id, volumeInfo}) => <BookCard id={id} key={id} title={volumeInfo.title}
                                                           authors={volumeInfo.authors} categories={volumeInfo.categories}
                                                           photoLink={volumeInfo.imageLinks?.thumbnail}/>)}
          </div>
        </>
        : <>

        </>
      }
    </div>
  );
};

export default BooksList;
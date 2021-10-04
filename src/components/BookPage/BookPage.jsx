import React from 'react';
import styles from './BookPage.module.css'
import star from '../../images/star.svg'
import {useParams} from 'react-router-dom'
import {getBook} from "../../state/rootReducer"
import {useDispatch, useSelector} from "react-redux"
import Loader from "../Loader/Loader"

const BookPage = () => {
  const {id} = useParams()
  const isLoading = useSelector(state => state.isLoading)
  const dispatch = useDispatch()
  const {title, categories, authors, publishedDate, description, averageRating,
    ratingsCount, imageLink, amount, currency, buyLink} = useSelector(state => state.currentBook)

  React.useEffect(()=>{
    dispatch(getBook(id))
  },[])

  if (isLoading) return <Loader/>

  return (
    <div className={styles.bookPage}>
      <div className={styles.title}>{title}</div>
      <div className={styles.categories}>categories: {categories?.join(', ')}</div>
      <div className={styles.authors}>{authors}</div>
      <div className={styles.publishedDate}>publication date: {publishedDate}</div>
      <div className={styles.description}><div dangerouslySetInnerHTML={{ __html: description }}/></div>
      {ratingsCount && <div className={styles.rating}>
        <div><img className={styles.starImage} src={star} alt=""/>{averageRating}/5</div>
        <div>number of votes:{ratingsCount}</div>
        </div>}
      <div className={styles.imageWrapper}><img className={styles.image} src={imageLink} alt=""/></div>
      {amount ?<>
        <div className={styles.amount}>{amount} {currency}</div>
        <div className={styles.buyLink}><a href={buyLink}>Buy</a></div>
      </>
        : <div className={`${styles.buyLink} ${styles.noSale}`}>Not for sale</div>}
    </div>
  );
};

export default BookPage;
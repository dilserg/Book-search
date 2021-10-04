import React from 'react';
import noPhoto from '../../../images/No_image_available.svg'
import styles from './BookCard.module.css'
import { useHistory } from "react-router-dom";

const BookCard = ({id,title,authors,categories, photoLink}) => {
  authors = authors?.length > 3 ? authors.slice(0,3).join(', ') : authors?.join(', ')
  let history = useHistory()

  const clickHandler = () =>{
    history.push(`/book/${id}`)
  }

  return (
    <div className={styles.cardBack} onClick={clickHandler}>
      <div className={styles.imageWrapper}><img className={styles.image} src={photoLink || noPhoto} alt=''/></div>
      <div className={styles.categories}>{categories?.slice(0,1)}</div>
      <div className={styles.authors}>{authors}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default BookCard;
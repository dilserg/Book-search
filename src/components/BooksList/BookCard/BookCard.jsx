import React from 'react';
import styles from './BookCard.module.css'

const BookCard = ({id,title,authors,categories, photoLink}) => {
  authors = authors?.length > 3 ? authors.slice(0,3).join(', ') : authors?.join(', ')
  return (
    <div className={styles.cardBack}>
      <div className={styles.imageWrapper}><img className={styles.image} src={photoLink} alt=''/></div>
      <div className={styles.categories}>{categories?.join(', ')}</div>
      <div className={styles.authors}>{authors}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default BookCard;
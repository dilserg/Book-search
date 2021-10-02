import React from 'react';
import styles from './Header.module.css'
import searchIcon from '../../images/Search-icon.svg'
import {getBooksList} from "../../state/rootReducer"
import {useDispatch} from "react-redux"

const Header = () => {
  const dispatch = useDispatch()
  const categoriesList = ["all", "art", "biography", "computers", "history", "medical", "poetry"]
  const [searchText, setSearchText] = React.useState('')
  const [category, setCategory] = React.useState('all')
  const [sortBy, setSortBy] = React.useState('relevance')

  const textChangeHandler = e =>{
    setSearchText(e.target.value)
  }
  const categoryChangeHandler = e =>{
    setCategory(e.target.value)
  }
  const sortByChangeHandler = e =>{
    setSortBy(e.target.value)
  }

  const submitHandler = e =>{
    e.preventDefault()
    dispatch(getBooksList(searchText,sortBy))
  }

  return (
      <form className={styles.header} onSubmit={submitHandler}>
        <span className={styles.title}>Search for books</span>
        <div className={styles.searchWrapper}>
          <input name="search" type="text" className={styles.searchInput} value={searchText}
                 onChange={textChangeHandler}/>
          <button type="submit" className={styles.searchButton}>
            <img className={styles.searchIcon} src={searchIcon} alt=''/>
          </button>
        </div>
        <div className={styles.selectWrapperEnd}>
          <span className={styles.selectLabel}>Category:</span>
          <select value={category} onChange={categoryChangeHandler} className={styles.select} name="categories"
                  id="categories-select">
            {categoriesList.map(category => <option value={category} key={category}>{category}</option>)}
          </select>
        </div>
        <div className={styles.selectWrapperStart}>
          <span className={styles.selectLabel}>Sorting by</span>
          <select value={sortBy} onChange={sortByChangeHandler} className={styles.select} name="sort" id="sort-select">
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </form>
  );
};

export default Header;
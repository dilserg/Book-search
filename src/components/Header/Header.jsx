import React from 'react';
import styles from './Header.module.css'
import searchIcon from '../../images/Search-icon.svg'
import {getBooksList, setLoading} from "../../state/rootReducer"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"

const Header = () => {
  const hasError = useSelector(state => state.hasError)
  const dispatch = useDispatch()
  const history = useHistory()
  const categoriesList = ["all", "art", "biography", "computers", "history", "medical", "poetry"]
  const [searchText, setSearchText] = React.useState('')
  const [category, setCategory] = React.useState('all')
  const [sortBy, setSortBy] = React.useState('relevance')

  const searchInputClass = () =>{
    if (hasError) return `${styles.searchInput} ${styles.errorInput}`

    return styles.searchInput
  }

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
    dispatch(getBooksList(searchText,sortBy,category))
    if(searchText) history.push('/search')
  }

  return (
      <form className={styles.header} onSubmit={submitHandler}>
        <span className={styles.title}>Search for books</span>
        <div className={styles.searchWrapper}>
          <input name="search" type="text" className={searchInputClass()} value={searchText}
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
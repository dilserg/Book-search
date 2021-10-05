import React from "react";
import styles from './ErrorPage.module.css'

const ErrorPage = () =>{
  return <div className={styles.errorPage}>
    <div>Something went wrong</div>
    <div>Try again later</div>
  </div>
}

export default ErrorPage
import styles from './App.module.css';
import Header from "./Header/Header"
import BooksList from "./BooksList/BooksList"

function App() {
  return (
    <div className={styles.app}>
      <Header/>
      <BooksList/>
    </div>
  );
}

export default App;

import styles from './App.module.css';
import Header from "./Header/Header"
import BooksList from "./BooksList/BooksList"
import { Route, Switch } from "react-router"
import BookPage from "./BookPage/BookPage"

function App() {
  return (
    <div className={styles.app}>
      <Header/>
      <Switch>
        <Route path='/book/:id'>
          <BookPage/>
        </Route>
        <Route path='/search'>
          <BooksList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

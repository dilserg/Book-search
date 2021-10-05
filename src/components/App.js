import styles from './App.module.css';
import Header from './Header/Header';
import BooksList from './BooksList/BooksList';
import { Route, Switch } from 'react-router';
import BookPage from './BookPage/BookPage';
import { useSelector } from 'react-redux';
import ErrorPage from './ErrorPage/ErrorPage';

function App() {
  const hasError = useSelector((state) => state.hasError);

  if (hasError) return <ErrorPage />;

  return (
    <div className={styles.app}>
      <Header />
      <Switch>
        <Route path="/book/:id">
          <BookPage />
        </Route>
        <Route path="/search">
          <BooksList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

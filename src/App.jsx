import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

const HomeView = lazy(() =>
  import('./views/HomeView.jsx' /* webpackChunkName: "home-view" */),
);
// const AuthorsView = lazy(() =>
//   import('./views/AuthorsView.jsx' /* webpackChunkName: "authors-view" */),
// );
const BooksView = lazy(() =>
  import('./views/BooksView.jsx' /* webpackChunkName: "books-view" */),
);
const BookDetailsView = lazy(() =>
  import('./views/BookDetailsView.jsx' /* webpackChunkName: "book-view" */),
);
const CartView = lazy(() =>
  import('./views/CartView.jsx'),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView.jsx' /* webpackChunkName: "404-view" */),
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>ЗАГРУЖАЄМО МАРШРУТ...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          {/* <Route path="/authors">
            <AuthorsView />
          </Route> */}

          <Route path="/books" exact>
            <BooksView />
          </Route>

          <Route path="/books/:slug">
            <BookDetailsView />
          </Route>

          <Route path="/cart">
            <CartView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

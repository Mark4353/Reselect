import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

const HomeView = lazy(() => import('./views/HomeView.jsx'));
const BooksView = lazy(() => import('./views/BooksView.jsx'));
const BookDetailsView = lazy(() => import('./views/BookDetailsView.jsx'));
const CartView = lazy(() => import('./views/CartView.jsx'));
const NotFoundView = lazy(() => import('./views/NotFoundView.jsx'));

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>ЗАГРУЖАЄМО МАРШРУТ...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

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

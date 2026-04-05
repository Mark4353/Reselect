import { useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import { useSelector, useDispatch } from 'react-redux';
import { booksOperations, booksSelectors } from 'redux/books';
import { cartActions, cartSelectors } from 'redux/cart';
import PageHeading from 'components/PageHeading/PageHeading';
import styles from './BooksView.module.css';

const makeSlug = string => slugify(string, { lower: true });

const getBookTitle = book => book.booksName || book.title || 'Нова книга';
const getBookSummary = book => book.info || book.description || 'Опис відсутній';

export default function BooksView() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const books = useSelector(booksSelectors.getBooks);
  const cartItems = useSelector(cartSelectors.getCartItems);

  const handleAddToCart = book => {
    dispatch(cartActions.addToCart(book));
  };

  const isInCart = bookId => cartItems.some(item => item.id === bookId);

  useEffect(() => {
    dispatch(booksOperations.fetchBooks());
  }, [dispatch]);

  return (
    <div className={styles.booksContainer}>
      <PageHeading text="Книги" />

      {books.length > 0 ? (
        <ul className={styles.booksList}>
          {books.map(book => {
            const title = getBookTitle(book);
            return (
              <li key={book.id} className={styles.bookCard}>
                <Link
                  className={styles.bookLink}
                  to={{
                    pathname: `${url}/${makeSlug(`${title} ${book.id}`)}`,
                    state: {
                      from: {
                        location,
                        label: 'Назад до всіх книг',
                      },
                    },
                  }}
                >
                  {title} {book.genre && `(${book.genre})`}
                </Link>
                
                <button
                  className={styles.addToCartBtn}
                  onClick={() => handleAddToCart(book)}
                  disabled={isInCart(book.id)}
                >
                  {isInCart(book.id) ? 'У корзині' : 'Додати в корзину'}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.loadingMessage}>Завантаження книг...</p>
      )}
    </div>
  );
}

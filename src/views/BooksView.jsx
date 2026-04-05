import { useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import { useSelector, useDispatch } from 'react-redux';
import { booksOperations, booksSelectors } from 'redux/books';
import PageHeading from 'components/PageHeading/PageHeading';

const makeSlug = string => slugify(string, { lower: true });

const getBookTitle = book => book.booksName || book.title || 'Нова книга';
const getBookSummary = book => book.info || book.description || 'Опис відсутній';

export default function BooksView() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const books = useSelector(booksSelectors.getBooks);

  useEffect(() => {
    dispatch(booksOperations.fetchBooks());
  }, [dispatch]);

  return (
    <>
      <PageHeading text="Книги" />

      {books.length > 0 ? (
        <ul>
          {books.map(book => {
            const title = getBookTitle(book);
            return (
              <li key={book.id}>
                <Link
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
                <p>{getBookSummary(book)}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Завантаження книг...</p>
      )}
    </>
  );
}

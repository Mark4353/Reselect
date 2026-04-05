import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import PageHeading from '../components/PageHeading/PageHeading';
import * as bookShelfAPI from '../services/bookshelf-api';

const getBookTitle = book => book.booksName || book.title || 'Нова книга';
const getBookDescription = book => book.info || book.description || 'Опис відсутній';
const getBookImage = book => book.imgUrl || book.image || book.avatar || '';

export default function BookDetailsView() {
  const location = useLocation();
  const { slug } = useParams();
  const bookId = slug.match(/[a-z0-9]+$/)[0];
  const [book, setBook] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    bookShelfAPI
      .fetchBookById(bookId, { signal: controller.signal })
      .then(setBook)
      .catch(() => {});
    return () => controller.abort();
  }, [bookId]);

  return (
    <>
      <PageHeading text={`Книга ${slug}`} />

      {book ? (
        <>
          <Link to={location?.state?.from?.location ?? '/books'}>
            {location?.state?.from?.label ?? 'Назад'}
          </Link>
          <hr />

          {getBookImage(book) && (
            <img src={getBookImage(book)} alt={getBookTitle(book)} />
          )}
          <h2>{getBookTitle(book)}</h2>
          {book.createdAt && <p>Створено: {new Date(book.createdAt).toLocaleDateString()}</p>}
          {book.genre && <p>Жанр: {book.genre}</p>}
          <p>{getBookDescription(book)}</p>
        </>
      ) : (
        <p>Завантаження книги...</p>
      )}
    </>
  );
}

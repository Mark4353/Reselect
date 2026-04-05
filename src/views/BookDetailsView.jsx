import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import PageHeading from '../components/PageHeading/PageHeading';
import styles from './BookDetailsView.module.css';
import * as bookShelfAPI from '../services/bookshelf-api';

const getBookTitle = book => book.title || book.booksName || 'Нова книга';
const getBookDescription = book => book.descr || book.info || book.description || 'Опис відсутній';
const getBookImage = book => book.imgUrl || book.image || book.avatar || '';

export default function BookDetailsView() {
  const location = useLocation();
  const { slug } = useParams();
  const bookId = slug.match(/\d+$/)?.[0];
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookId) {
      setError('ID книги не знайдено');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    
    bookShelfAPI
      .fetchBookById(bookId, { signal: controller.signal })
      .then(data => {
        console.log(' Книга загружена:', data);
        setBook(data);
        setError(null);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(' Помилка загрузки книги:', err.message, err);
          setError(`Не вдалося завантажити дані книги: ${err.message}`);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [bookId]);

  return (
    <div className={styles.bookDetailsContainer}>
      <PageHeading text="Деталі книги" />

      {error && <div className={styles.errorMessage}> {error}</div>}

      {loading && <div className={styles.loadingMessage}> Завантаження книги</div>}

      {book ? (
        <>
          <Link to={location?.state?.from?.location ?? '/books'} className={styles.backLink}>
            ← {location?.state?.from?.label ?? 'Назад до книг'}
          </Link>

          <hr className={styles.divider} />

          <div className={styles.bookContent}>
            {getBookImage(book) ? (
              <img 
                src={getBookImage(book)} 
                alt={getBookTitle(book)} 
                className={styles.bookImage}
                onError={(e) => {
                  console.error('Ошибка загрузки картинки:', e);
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"%3E%3Crect fill="%23e0e0e0" width="300" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="16" fill="%23999"%3EКартинка не тянеться%3C/text%3E%3C/svg%3E';
                }}
              />
            ) : (
              <div className={styles.bookImagePlaceholder}>
                📚 Картинка недоступна
              </div>
            )}

            <div className={styles.bookInfo}>
              <h2 className={styles.bookTitle}>{getBookTitle(book)}</h2>

              <div className={styles.bookMeta}>
                {book.genre && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Жанр:</span>
                    {book.genre}
                  </div>
                )}
                {book.authorId && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Автор ID:</span>
                    {book.authorId}
                  </div>
                )}
                {book.createdAt && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Створено:</span>
                    {new Date(book.createdAt).toLocaleDateString('uk-UA')}
                  </div>
                )}
              </div>

              <p className={styles.bookDescription}>{getBookDescription(book)}</p>
            </div>
          </div>
        </>
      ) : !loading && (
        <div className={styles.notFoundMessage}>📚 Книга не знайдена</div>
      )}
    </div>
  );
}

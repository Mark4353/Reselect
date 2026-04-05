import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions, cartSelectors } from 'redux/cart';
import PageHeading from 'components/PageHeading/PageHeading';
import styles from './CartView.module.css';

const getBookTitle = book => book.booksName || book.title || 'Нова книга';

export default function CartView() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelectors.getCartItems);

  const handleRemoveFromCart = bookId => {
    dispatch(cartActions.removeFromCart(bookId));
  };

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <div className={styles.cartContainer}>
      <PageHeading text="Корзина" />
      <Link to="/books" className={styles.backLink}>Назад до книг</Link>
      {cartItems.length > 0 ? (
        <>
          <button onClick={handleClearCart} className={styles.clearButton}>
            Очистити корзину
          </button>
          <ul>
            {cartItems.map(book => (
              <li key={book.id} className={styles.cartItem}>
                <h3>{getBookTitle(book)}</h3>
                <button
                  onClick={() => handleRemoveFromCart(book.id)}
                  className={styles.removeButton}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.emptyCart}>Корзина порожня</p>
      )}
    </div>
  );
}
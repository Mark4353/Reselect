import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cartSelectors } from 'redux/cart';
import styles from './Navigation.module.css';

export default function Navigation() {
  const cartCount = useSelector(cartSelectors.getCartCount);

  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Головна
      </NavLink>

      <NavLink
        to="/books"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Книги
      </NavLink>

      <NavLink
        to="/cart"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Кошик {cartCount > 0 && `(${cartCount})`}
      </NavLink>
    </nav>
  );
}

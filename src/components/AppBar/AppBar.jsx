import { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import AuthModal from '../AuthModal/AuthModal';
import { getUsers, registerUser } from '../../services/bookshelf-api';
import styles from './Appbar.module.css';

export default function Appbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleClose = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setAuthError('');
    setAuthSuccess('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setAuthSuccess('Ви вийшли з акаунту');
  };

  const handleRegister = async formData => {
    setLoading(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      const user = await registerUser(formData);
      setCurrentUser(user);
      setAuthSuccess('Реєстрація пройшла успішно');
      setIsRegisterOpen(false);
    } catch (error) {
      setAuthError('Помилка реєстрації');
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async formData => {
    setLoading(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      const users = await getUsers({ email: formData.email });
      const existing = Array.isArray(users) ? users.find(user => user.password === formData.password) : null;

      if (existing) {
        setCurrentUser(existing);
        setAuthSuccess('Вхід виконано успішно');
        setIsLoginOpen(false);
      } else {
        setAuthError('Користувача не знайдено або пароль невірний');
      }
    } catch (error) {
      setAuthError('Помилка входу');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className={styles.header}>
      <Navigation />
      <div className={styles.actions}>
        {currentUser ? (
          <>
            <span className={styles.welcome}>Привіт, {currentUser.name || currentUser.email}</span>
            <button type="button" className={styles.button} onClick={handleLogout}>
              Вийти
            </button>
          </>
        ) : (
          <>
            <button type="button" className={styles.button} onClick={() => setIsLoginOpen(true)}>
              Увійти
            </button>
            <button type="button" className={styles.buttonSecondary} onClick={() => setIsRegisterOpen(true)}>
              Реєстрація
            </button>
          </>
        )}
      </div>

      <AuthModal
        type="login"
        isOpen={isLoginOpen}
        onClose={handleClose}
        onSubmit={handleLogin}
        loading={loading}
        serverError={authError}
        successMessage={authSuccess}
      />
      <AuthModal
        type="register"
        isOpen={isRegisterOpen}
        onClose={handleClose}
        onSubmit={handleRegister}
        loading={loading}
        serverError={authError}
        successMessage={authSuccess}
      />
    </header>
  );
}

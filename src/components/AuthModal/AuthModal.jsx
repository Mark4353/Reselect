import { useState, useEffect } from 'react';
import styles from './AuthModal.module.css';

export default function AuthModal({ type, isOpen, onClose, onSubmit, loading, serverError, successMessage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name: name.trim(), email: email.trim(), password: password.trim() });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={event => event.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.title}>{type === 'register' ? 'Реєстрація' : 'Вхід'}</h2>
        <p className={styles.description}>
          {type === 'register'
            ? 'Введіть email та пароль для реєстрації.'
            : 'Введіть email та пароль для входу.'}
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          {type === 'register' && (
            <label className={styles.field}>
              Ім'я
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ваше ім'я"
                required
              />
            </label>
          )}

          <label className={styles.field}>
            Електронна пошта
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </label>

          <label className={styles.field}>
            Пароль
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Мінімум 6 символів"
              minLength={6}
              required
            />
          </label>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Надсилаємо...' : type === 'register' ? 'Зареєструватися' : 'Увійти'}
          </button>
        </form>

        {serverError && <p className={styles.error}>{serverError}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </div>
    </div>
  );
}

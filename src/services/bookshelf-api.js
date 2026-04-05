import axios from 'axios';

// MockAPI для списка книг и авторов
const mockApiClient = axios.create({
  baseURL: 'https://69d0ea8090cd06523d5da323.mockapi.io',
});

// JSON Server для подробной информации о книге
const jsonServerClient = axios.create({
  baseURL: 'http://localhost:5000',
});

export async function fetchAuthors() {
  const { data } = await mockApiClient.get(`/authors`);
  return data;
}

export async function fetchBooks() {
  const { data } = await mockApiClient.get(`/books`);
  return data;
}

export async function fetchBookById(bookId, options = {}) {
  try {
    // Пытаемся загрузить из JSON Server (локальный db.json)
    const { data } = await jsonServerClient.get(`/books/${bookId}`, options);
    return data;
  } catch (error) {
    console.warn(`⚠️ JSON Server недоступен для книги ${bookId}, попытка загрузки из MockAPI...`);
    // Если JSON Server недоступен, загружаем из MockAPI
    try {
      const { data } = await mockApiClient.get(`/books/${bookId}`, options);
      return data;
    } catch (fallbackError) {
      console.error(`❌ Не удалось загрузить книгу ${bookId}:`, fallbackError.message);
      throw fallbackError;
    }
  }
}

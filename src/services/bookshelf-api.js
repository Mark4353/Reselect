import axios from 'axios';

const mockApiClient = axios.create({
  baseURL: 'https://69d0ea8090cd06523d5da323.mockapi.io',
});

const jsonServerClient = axios.create({
  baseURL: 'http://localhost:5000',
});

export async function fetchAuthors() {
  const { data } = await mockApiClient.get('/authors');
  return data;
}

export async function fetchBooks() {
  const { data } = await mockApiClient.get('/books');
  return data;
}

export async function fetchBookById(bookId, options = {}) {
  try {
    const { data } = await jsonServerClient.get(`/books/${bookId}`, options);
    return data;
  } catch {
    const { data } = await mockApiClient.get(`/books/${bookId}`, options);
    return data;
  }
}

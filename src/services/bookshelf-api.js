import axios from 'axios';

axios.defaults.baseURL = 'https://69d0ea8090cd06523d5da323.mockapi.io';

export async function fetchAuthors() {
  const { data } = await axios.get(`/authors`);
  return data;
}

export async function fetchBooks() {
  const { data } = await axios.get(`/books`);
  return data;
}

export async function fetchBookById(bookId, options = {}) {
  const { data } = await axios.get(`/books/${bookId}`, options);
  return data;
}

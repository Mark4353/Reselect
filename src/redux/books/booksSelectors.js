import { createSelector } from 'reselect';

export const getBooks = state => state.books.entities;

export const getBooksCount = createSelector([getBooks], books => books.length);

export const getBooksByGenre = genre =>
  createSelector([getBooks], books =>
    books.filter(book => book.genre === genre),
  );

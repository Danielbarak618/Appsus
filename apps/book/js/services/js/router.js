import homePage from '../pages/home-page.js';
import bookApp from '../pages/book-app.js';
import bookDetails from '../pages/book-details.js';
import aboutPage from '../pages/about-page.js';
import bookReview from './cmps/book-review.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/about',
    component: aboutPage,
  },
  {
    path: '/book',
    component: bookApp,
  },
  {
    path: '/book/:bookId',
    component: bookDetails,
  },
  {
    path: '/book/review/:bookId?',
    component: bookReview,
  },
];

export const router = new VueRouter({ routes });

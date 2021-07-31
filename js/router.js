import homePage from './pages/home-page.js';
import mailPage from '../apps/mail/js/pages/mail-app.js';
import keepPage from '../apps/keep/js/pages/keep-app.js';
import bookApp from '../apps/book/pages/book-app.js';
import bookDetails from '../apps/book/pages/book-details.js';
import bookReview from '../apps/book/js/cmps/book-review.js';
const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/mail',
    component: mailPage,
  },
  {
    path: '/mail/:mailId',
    component: mailPage,
  },
  {
    path: '/mail/sent',
    component: mailPage,
  },
  {
    path: '/mail/star',
    component: mailPage,
  },
  {
    path: '/mail/draft',
    component: mailPage,
  },
  {
    path: '/keep',
    component: keepPage,
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

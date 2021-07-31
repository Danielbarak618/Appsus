import { bookService } from '../js/services/book-service.js';
import bookList from '../js/cmps/book-list.js';
import bookDetails from './book-details.js';
import bookFilter from '../js/cmps/book-filter.js';
import bookAdd from '../js/cmps/book-add.js';
import { eventBus } from '../../../js/services/event-bus-service.js';

{
  /* <book-details v-else :book="selectedBook" @close="closeDetails">
                    
                    </book-details>  */
}

export default {
  template: `
            <section class="book-app">
              <book-add @addBook="addBook"></book-add>
                <book-filter @filtered="setFilter" />    
                <book-list :books="booksToShow"/>                        
            </section>    
    `,
  data() {
    return {
      books: [],

      filterBy: null,
    };
  },
  created() {
    this.loadBooks();
    // this.getGoogleBooks();
  },
  methods: {
    // selectBook(bookId) {
    //   const book = bookService.getBookById(bookId);
    //   this.selectedBook = book;
    // },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    loadBooks() {
      bookService.query().then((books) => (this.books = books));
    },
    addBook(newBook) {
      bookService
        .addBook(newBook)
        .then(() => {
          const msg = {
            txt: 'Added successfuly',
            type: 'success',
            link: '/book',
          };
          eventBus.$emit('show-msg', msg);
          this.loadBooks();
        })
        .catch((err) => {
          console.log(err);
          const msg = {
            txt: 'Error please try again!',
            type: 'error',
            link: '/book',
          };
          eventBus.$emit('show-msg', msg);
        });
    },
  },
  computed: {
    booksToShow() {
      //   if (!this.filterBy) return this.books;
      if (
        !this.filterBy ||
        (this.filterBy.title === '' &&
          this.filterBy.fromPrice === '' &&
          this.filterBy.toPrice === '')
      )
        return this.books;
      const searchStr = this.filterBy.title.toLowerCase();
      const booksToShow = this.books.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchStr) &&
          book.listPrice.amount >= this.filterBy.fromPrice &&
          book.listPrice.amount < this.filterBy.toPrice
        );
      });
      return booksToShow;
    },
  },
  components: {
    bookList,
    bookDetails,
    bookFilter,
    bookAdd,
  },
};

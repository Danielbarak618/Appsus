import { bookService } from '../js/services/book-service.js';
import bookReview from '../js/cmps/book-review.js';
import bookReviewList from '../js/cmps/book-review-list.js';
import { storageService } from '../js/services/async-storage-service.js';
import { eventBus } from '../../../js/services/event-bus-service.js';

export default {
  components: {
    bookReview,
    bookReviewList,
  },
  template: `
    <section class='book-details' v-if="book">
        <h2 class="title">{{book.title}}</h2>
        <p>Authors:{{book.authors[0]}}</p>
        <p>Pages:{{getPageCount}}</p>
        <p>{{getPublishDate}}</p>
        <p>Categories:</p>
        <ul class="categories">
          <li v-for="category in book.categories">
            {{category}}
          </li>
        </li>
        </ul>
        <img :src="book.thumbnail">
        <p>Price:<span :class="getCurrPrice">{{book.listPrice.amount}}</span></p>
        <div class="text">
            {{getDescriptionLength}}
            <button @click="toggleShow" class="show-more-btn">{{getButtonText}}</button>
        </div>
        <pre v-if="isOnSale">SALE!!!!</pre>
        
        <book-review-list :bookReview="book.reviews" @remove="removeReview"></book-review-list>
        <book-review :bookId="book.id" @save="saveReview">

        </book-review>
        <router-link :to="'/book/' + prevBookId" class="next-btn">Previous Book</router-link>
        <router-link to="/book" class='close-link'>Close</router-link >
        <router-link :to="'/book/' + nextBookId" class="next-btn">Next Book</router-link>
        
    </section>

  `,
  data() {
    return {
      book: null,
      isOpen: false,
      isModalOpen: false,
      nextBookId: null,
      prevBookId: null,
    };
  },
  computed: {
    getPageCount() {
      if (this.book.pageCount > 500) return 'Long reading';
      if (this.book.pageCount > 200) return 'Decent reading';
      if (this.book.pageCount < 100) return 'Light reading';
      return this.book.pageCount;
    },
    getPublishDate() {
      const currYear = new Date().getFullYear();
      const diff = currYear - this.book.publishedDate;
      if (diff >= 10) return 'Veteran Book';
      if (diff <= 1) return 'New book!';
    },
    getCurrPrice() {
      return {
        red: this.book.listPrice.amount > 150,
        green: this.book.listPrice.amount < 20,
      };
    },
    isOnSale() {
      return this.book.listPrice.isOnSale;
    },
    getDescriptionLength() {
      if (!this.isOpen) return this.book.description.substring(0, 100);
      else return this.book.description;
    },
    getButtonText() {
      return this.isOpen ? 'Show less' : 'Show more';
    },
  },
  methods: {
    toggleShow() {
      this.isOpen = !this.isOpen;
    },
    closePreview() {
      this.isModalOpen = !this.isModalOpen;
    },
    removeReview(reviewId) {
      bookService
        .removeReview(reviewId, this.book.id)
        .then((book) => {
          const msg = {
            txt: 'Deleted successfuly',
            type: 'success',
            link: '/book/:bookId',
          };
          eventBus.$emit('show-msg', msg);
          this.book = book;
        })
        .catch((err) => {
          console.log(err);
          const msg = {
            txt: 'Error please try again!',
            type: 'error',
            link: '/book/:bookId',
          };
          eventBus.$emit('show-msg', msg);
        });

      // this.$router.push('/book/');
    },
    saveReview(review) {
      console.log(review);
      console.log(this.book, 'before');

      bookService
        .addReview(this.book.id, review)
        .then((book) => {
          const msg = {
            txt: 'Review Added successfuly',
            type: 'success',
            link: '/book/:bookId',
          };
          eventBus.$emit('show-msg', msg);
          this.book = book;
        })
        .catch((err) => {
          console.log(err);
          const msg = {
            txt: 'Error please try again!',
            type: 'error',
            link: '/book/:bookId',
          };
          eventBus.$emit('show-msg', msg);
        });
    },
    getGoogleBooks() {
      bookService.getGoogleBooks();
    },
  },
  created() {
    const { bookId } = this.$route.params;

    bookService.getBookById(bookId).then((book) => (this.book = book));
    this.prevBookId = bookId;
    // this.getGoogleBooks();
  },
  watch: {
    '$route.params.bookId': {
      immediate: true,
      handler() {
        const { bookId } = this.$route.params;
        bookService.getBookById(bookId).then((book) => (this.book = book));
        bookService
          .getNextBookId(bookId)
          .then((bookId) => (this.nextBookId = bookId));
        bookService
          .getPrevBookId(bookId)
          .then((bookId) => (this.prevBookId = bookId));
      },
    },
  },
};

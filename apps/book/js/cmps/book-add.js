import { bookService } from '../services/book-service.js';

export default {
  template: `<section>
    <div class="add-book-title">
      <h3>Add a book:</h3>
      <input v-model="searchWord" type="text" @input="getGoogleBooks" placeholder="Search book" class="add-book-input">
      </div>
        <ul class="add-book-container">
            
            <li v-for="googleBook in googleBooks" :key="googleBook.id" class="add-book">
                {{googleBook.volumeInfo.title}}
                <button class='add-book-btn'@click="makeBook(googleBook)"><i class="far fa-plus-square"></i></button>
            </li>
        </ul>
    </section>`,
  data() {
    return {
      searchWord: '',
      googleBooks: [],
      bookToAdd: null,
    };
  },
  methods: {
    search() {
      this.$emit('searchBook', this.searchWord);
    },
    getGoogleBooks() {
      bookService.getGoogleBooks(this.searchWord).then((googleBooks) => {
        this.googleBooks = googleBooks;
        // console.log(this.googleBooks);
      });
    },
    makeBook(googleBook) {
      this.$emit('addBook', googleBook);
    },
  },
  created() {},
};

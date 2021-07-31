import { bookService } from '../services/book-service.js';

export default {
  template: `<section>
      <h3>Add a book:</h3>
      <input v-model="searchWord" type="text" @input="getGoogleBooks">
        <ul>
            
            <li v-for="googleBook in googleBooks" :key="googleBook.id">
                {{googleBook.volumeInfo.title}}
                <button @click="makeBook(googleBook)">+</button>
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

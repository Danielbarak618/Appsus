import bookPreview from './book-preview.js';

export default {
  props: ['books'],
  template: `
    <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-preview-container">
            <book-preview :book="book" >
             
            </book-preview>
        </li>
    </ul>
  `,
  components: {
    bookPreview,
  },
  methods: {},
};

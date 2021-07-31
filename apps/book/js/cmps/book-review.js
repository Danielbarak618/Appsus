import { bookService } from '../services/book-service.js';

export default {
  props: ['bookId'],
  template: `
  <section class="book-review">
    <h3>Add a review:</h3>
    <form @submit.prevent="save">
      <label>Name:</label>
      <input v-model="bookToReview.name" type="text" placeholder="Your name?">
      <label>Rate</label>
      <select v-model="bookToReview.rate">
        <option disabled value="">Book Rate</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <label>Read at:</label>
      <input v-model="bookToReview.readAt" type="date">
      <label>More...:</label>
      <textarea v-model="bookToReview.freeText" placeholder="more"></textarea>
        <button><i class="fas fa-save"></i></button>
    </form>
    
    </section>
    `,

  data() {
    return {
      bookToReview: null,
    };
  },
  created() {
    this.bookToReview = bookService.getEmptyReview();
    console.log(this.bookToReview);
  },
  methods: {
    save() {
      console.log('jkjk');
      this.$emit('save', this.bookToReview);
    },
  },
};

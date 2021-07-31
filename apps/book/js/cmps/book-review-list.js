export default {
  props: ['bookReview'],
  template: `
        <ul class="book-reviews">
            <li v-for="review in bookReview" class="review-container">
                <p>Name:{{review.name}}</p>
                <p>Rate:{{review.rate}}</p>
                <p>Read at:{{review.readAt}}</p>
                <p>Comments:{{review.freeText}}</p>
                <button @click="remove(review.id)"><i class="fas fa-trash"></i></button>
            </li>
        </ul>
    `,
  methods: {
    remove(reviewId) {
      console.log('removing review id', reviewId);
      this.$emit('remove', reviewId);
    },
  },
};

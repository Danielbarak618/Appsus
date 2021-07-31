export default {
  props: ['book'],
  template: `
  <router-link :to="'/book/'+book.id"> 
    <div class="book-preview">
        <p class="book-header">{{book.title}}</p>
        <p class="book-price">{{book.listPrice.amount}}{{getCurrentCurrncy}} </p>
        <p><img :src="book.thumbnail"></p>
    </div>
    </router-link>
    `,
  computed: {
    getCurrentCurrncy() {
      if (this.book.listPrice.currencyCode === 'EUR') return '€';
      if (this.book.listPrice.currencyCode === 'USD') return '$';
      if (this.book.listPrice.currencyCode === 'ILS') return '₪';
    },
  },
};

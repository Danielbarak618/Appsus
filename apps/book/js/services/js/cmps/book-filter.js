export default {
  template: `
        <section class="book-filter">
            <label>Search:</label>
            <input v-model="filterBy.title" type="text" @input="filter" placeholder="Search...">
            <input v-model="filterBy.fromPrice" type="number" @input="filter" placeholder="Search...">
            <input v-model="filterBy.toPrice" type="number" @input="filter" placeholder="Search...">
        </section>
    `,
  data() {
    return {
      filterBy: {
        title: '',
        fromPrice: 0,
        toPrice: Infinity,
      },
    };
  },
  methods: {
    filter() {
      console.log(this.filterBy);
      this.$emit('filtered', this.filterBy);
    },
  },
};

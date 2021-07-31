export default {
	template: `
    <section class="note-filter">
    <label>Search:</label>
    <input v-model="filterBy" type="text" @input="filter" placeholder="Search..">
    </section>
    `,
	data() {
		return {
			filterBy: '',
		}
	},
	methods: {
		filter() {
			this.$emit('filtered', this.filterBy)
		},
	},
}

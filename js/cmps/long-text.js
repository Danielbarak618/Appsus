export default {
  props: { text: String, maxLength: Number },
  template: `
        <span>{{formattedDescription}}</span>
    `,
  computed: {
    formattedDescription() {
      if (!this.text) return "Couln't load text";
      if (this.text.length < this.maxLength) return this.text;
      return this.text.substring(0, this.maxLength) + '...';
    },
  },
};

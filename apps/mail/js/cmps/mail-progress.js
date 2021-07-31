export default {
	props: { readMails: Number, mails: Array },
	template: `
        <progress max="100" :value="progress"><span></span></progress>
    `,
	computed: {
		progress() {
			if (!this.readMails || !this.mails.length) return 0
			return ((100 / this.mails.length) * this.readMails).toFixed(0)
		},
	},
}

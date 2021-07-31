export default {
	props: { mail: Object },
	template: `
        <section class="mail-peek">
            <section class="mail-peek-header">
                <h2>{{mail.subject}}</h2>
            </section>
            <section class="mail-peek-sender-info">
                <h4>{{mail.sender.name}}</h4>
                <p>{{senderMail}}</p>
            </section>
            <section class="mail-peek-body">
                <p class="mail-peek-body-text">{{mail.body}}</p>
            </section>
        </section>
    `,
	methods: {},
	computed: {
		senderMail() {
			return `<${this.mail.sender.name}@gmail.com>`
		},
	},
}

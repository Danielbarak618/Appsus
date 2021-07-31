import { eventBus } from '../../../../js/services/event-bus-service.js'

export default {
	props: { mail: Object },
	template: `
        <section class="mail-compose">
            <section class="mail-compose-header">
                <h3>New Message</h3>
            </section>
            <label>
                To:
                <input type="text" v-model="mailData.to"/>
            </label>
            <label>
                Cc:
                <input type="text" v-model="mailData.cc"/>
            </label>
            <label>
                Bcc:
                <input type="text" v-model="mailData.bcc"/>
            </label>
            <label>
                Subject:
                <input type="text" v-model="mailData.subject"/>
            </label>
            <textarea name="body" v-model="mailData.body"></textarea>
            <section class="actions">
                <button class="send" @click="onSendMail">Send</button>
				<button class="save" @click="onSaveMail">
					Save as note
					<i class="far fa-sticky-note"></i>
				</button>
                <button @click="onCloseCompose">
					<i class="fas fa-trash compose-trash"></i>
				</button>
            </section>
        </section>
    `,
	data() {
		return {
			mailData: {
				to: null,
				cc: null,
				bcc: null,
				subject: null,
				body: null,
				color: null,
			},
		}
	},
	methods: {
		resetData() {
			this.mailData.to = null
			this.mailData.cc = null
			this.mailData.bcc = null
			this.mailData.subject = null
			this.mailData.body = null
			this.mailData.color = null
		},
		onCloseCompose() {
			this.resetData()
			this.$emit('close-compose')
		},
		onSendMail() {
			this.$emit('send-mail', this.mailData)
		},
		onSaveMail() {
			eventBus.$emit('save-mail-as-note', this.mailData)
		},
	},
	created() {
		if (this.mail) {
			const { cc, bcc, subject, body, color } = this.mail
			this.mailData.to = 'Dandan'
			if (this.mail.to) this.mailData.to = this.mail.to
			this.mailData.cc = cc
			this.mailData.bcc = bcc
			this.mailData.subject = 'Re: ' + subject
			this.mailData.body = body
			this.mailData.color = color
		}
	},
}

import { mailService } from '../services/mail-service.js'
import { eventBus } from '../../../../js/services/event-bus-service.js'

export default {
	template: `
		<section v-if="mail" class="mail-details">
			<section class="mail-details-header">
				<h2>{{mail.subject}}</h2>
				<section class="mail-details-links">
					<router-link :to="'/mail/' + prevMailId">
						<i class="fas fa-arrow-left"></i>
						Prev Mail
					</router-link>
					<router-link :to="'/mail/' + nextMailId">
						Next Mail
						<i class="fas fa-arrow-right"></i>
					</router-link>
				</section>
				<button @click="closeDetails">X</button>
			</section>
			<section class="mail-details-sender-info">
				<h4>{{mail.sender.name}}</h4>
				<p>{{senderMail}}</p>
			</section>
			<section class="mail-details-body">
				<p class="mail-details-body-text">{{mail.body}}</p>
			</section>
		</section>
    `,
	data() {
		return {
			mail: null,
			nextMailId: null,
			prevMailId: null,
		}
	},
	methods: {
		setMail() {
			mailService.getMailById(this.$route.params.mailId).then(mail => {
				this.mail = mail
			})
		},
		closeDetails() {
			eventBus.$emit('close-details')
		},
	},
	created() {
		this.setMail()
	},
	computed: {
		senderMail() {
			return `<${this.mail.sender.name}@gmail.com>`
		},
	},
	watch: {
		'$route.params.mailId': {
			immediate: true,
			handler() {
				const { mailId } = this.$route.params
				mailService.getMailById(mailId).then(mail => (this.mail = mail))
				mailService.getNextMailId(mailId).then(mailId => (this.nextMailId = mailId))
				mailService.getPrevMailId(mailId).then(mailId => (this.prevMailId = mailId))
			},
		},
	},
}

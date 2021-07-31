import progressBar from './mail-progress.js'

export default {
	components: {
		progressBar,
	},
	props: { readMails: Number, mails: Array, isOpen: Boolean },
	template: `
        <aside :class="openClass">
            <button @click="onCompose">
				<i class="fas fa-plus"></i>Compose
			</button>
            <ul class="mail-folders">
                <li v-for="link in links">
					<router-link :to="link.to">
						<i :class="link.class"></i>
						{{link.text}}
					</router-link>
				</li>
            </ul>
			<progress-bar :read-mails="readMails" :mails="mails"/>
        </aside>
    `,
	data() {
		return {
			links: [
				{ to: '/mail', text: 'Inbox', class: 'fas fa-inbox' },
				{ to: '/mail/sent', text: 'Sent Mail', class: 'fas fa-paper-plane' },
				{ to: '/mail/star', text: 'Starred', class: 'far fa-star' },
			],
		}
	},
	methods: {
		onCompose() {
			this.$emit('open-compose')
		},
	},
	computed: {
		openClass() {
			return this.isOpen
				? { open: true, 'mail-sidebar': true }
				: { open: false, 'mail-sidebar': true }
		},
	},
}

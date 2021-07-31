import longText from '../../../../js/cmps/long-text.js'

export default {
	components: { longText },
	props: { mail: Object, recentUnread: String },
	template: `
        <article :class="readClass" @click="markAsRead" @mouseenter="onShowActions" @mouseleave="onHideActions">
            <section class="preview-left-mobile">
                <div :style="{backgroundColor: mail.color}">{{senderFirstLetter}}</div>
                <section class="content-mobile">
                <p class="mail-sender">
                    <long-text :text="mail.sender.name" :maxLength="20"/>
                </p>
                    <section class="text-mobile">
                        <p class="mail-subject">
                            <long-text :text="mail.subject" :maxLength="20"/>
                        </p> 
                        <p class="body">
                            <long-text :text="mail.body" :maxLength="40"/>
                        </p>
                    </section>
                </section>
            </section>
            <div class="time-container">
                <p v-if="!showActions">{{formattedTime}}</p>
            </div>
            <section class="mail-preview-actions" v-if="showActions">
                <button @click.stop="onDeleteMail(mail.id)" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
                <button @click.stop="onForwardMail(mail.id)" title="Reply">
                    <i class="fas fa-reply"></i>
                </button>
                <button @click.stop="onMarkUnread(mail.id)" title="Mark as Unread">
                    <i class="fas fa-envelope-open"></i>
                </button>
                <button title="Expand" @click.stop="onExpandMail(mail.id)">
                    <i class="fas fa-expand"></i>
                </button>
                <button title="Star" @click.stop="onToggleStar(mail.id)">
                    <i :class="[mail.isStarred ? 'fas fa-star' : 'far fa-star']"></i>
                </button>
            </section>
        </article>
    `,
	data() {
		return {
			isShowActions: false,
		}
	},
	methods: {
		markAsRead() {
			this.$emit('read-mail', this.mail.id)
			if (this.recentUnread === this.mail.id) {
				this.$emit('open-peek', this.mail.id)
			}
		},
		onDeleteMail(mailId) {
			this.$emit('delete-mail', mailId)
		},
		onForwardMail(mailId) {
			this.$emit('forward-mail', mailId)
		},
		onMarkUnread(mailId) {
			this.$emit('unread-mail', mailId)
		},
		onToggleStar(mailId) {
			this.$emit('toggle-star', mailId)
		},
		onExpandMail(mailId) {
			this.$emit('expand-mail', mailId)
		},
		onShowActions() {
			this.isShowActions = true
		},
		onHideActions() {
			this.isShowActions = false
		},
	},
	computed: {
		formattedTime() {
			const fullTime = new Date(this.mail.sentAt)
			const formattedFullTime = fullTime
				.toLocaleString()
				.substring(0, fullTime.toLocaleString().length - 3)
			const date = formattedFullTime.split(',')[0]
			// const time = formattedFullTime.split(',')[1]

			let hours = new Date().getHours()
			let minutes = new Date().getMinutes()
			if (hours < 10) hours = '0' + hours
			if (minutes < 10) minutes = '0' + minutes
			const time = hours + ':' + minutes

			// if mail was sent more than 24 hours ago, return date instead of time
			return Date.now() - this.mail.sentAt > 86400000 ? date : time
		},
		readClass() {
			return this.mail.isRead ? 'read' : ''
		},
		showActions() {
			return this.isShowActions
		},
		senderFirstLetter() {
			return this.mail.sender.name.charAt(0)
		},
	},
}

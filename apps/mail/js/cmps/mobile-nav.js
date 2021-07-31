import { eventBus } from '../../../../js/services/event-bus-service.js'

export default {
	template: `
        <section class="mobile-nav">
            <i class="fas fa-bars" @click="openNav"></i>
        </section>
    `,
	data() {
		return {
			data: [],
		}
	},
	methods: {
		openNav() {
			eventBus.$emit('open-nav')
		},
	},
}

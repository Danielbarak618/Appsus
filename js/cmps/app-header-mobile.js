import appFilter from './app-filter.js'

export default {
	components: { appFilter },
	template: `
        <header class="main-header">
            <div class="main-header-content">
                <router-link to="/" class="main-logo"><img src="https://i.ibb.co/hYxD3x4/logo.png" class="logo"/></router-link>
                <i class="fas fa-th" @click="toggleMenu"></i>
                <nav class="main-nav" v-if="isOpen">
                    <router-link to="/">
                        <i class="fas fa-home" @click="toggleMenu"></i>
                        <p @click="toggleMenu">Home</p>
                    </router-link>
                    <router-link to="/mail">
                        <i class="fas fa-envelope" @click="toggleMenu"></i>
                        <p @click="toggleMenu">Mail</p>
                    </router-link>
                    <router-link to="/keep">
                        <i class="fas fa-sticky-note" @click="toggleMenu"></i>
                        <p @click="toggleMenu">Keep</p>
                    </router-link>
                    <router-link to="/book">
                        <i class="fas fa-book-open" @click="toggleMenu"></i>
                        <p @click="toggleMenu">Books</p>
                    </router-link>
                </nav>
            </div>
            <app-filter />
        </header>
    `,
	data() {
		return {
			isMenuOpen: false,
		}
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		},
	},
	computed: {
		isOpen() {
			return this.isMenuOpen
		},
	},
	created() {
		this.isMenuOpen = false
	},
}

import appFilter from './app-filter.js'

export default {
	components: { appFilter },
	template: `
        <header class="main-header">
            <router-link to="/" class="main-logo"><img src="https://i.ibb.co/hYxD3x4/logo.png" class="logo"/></router-link>
            <app-filter />
            <nav class="main-nav">
                <router-link to="/">Home</router-link>
                <router-link to="/mail">Mail</router-link>
                <router-link to="/keep">Keep</router-link>
                <router-link to="/book">Books</router-link>
            </nav>
        </header>
    `,
}

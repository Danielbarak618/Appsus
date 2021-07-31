export default {
	template: `
        <section class="home-page main-app">
            <section class="mail">
                <section class="home-page-content">
                    <h2>Mails</h2>
                    <p>Use our mail client to communicate with your friends and colleagues!</p>
                    <router-link to="/mail">
                        Get Started
                        <i class="fas fa-arrow-right"></i>
                    </router-link>
                </section>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fgoogle-new-logos-1%2F32%2Fgmail_new_logo-512.png&f=1&nofb=1" alt="gmail" />
            </section>
            <section class="notes">
                <section class="home-page-content">
                    <h2>Notes</h2>
                    <p>Use our innovative post-it system to keep your work organized!</p>
                    <router-link to="/keep">
                        Get Started
                        <i class="fas fa-arrow-right"></i>
                    </router-link>
                </section>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2FLogos%2Fgoogle_keep1600.png&f=1&nofb=1" alt="note" />
            </section>
            <section class="books">
                <section class="home-page-content">
                    <h2>Books</h2>
                    <p>Browse our unique collection of limited edition books!</p>
                    <router-link to="/book">
                        Get Started
                        <i class="fas fa-arrow-right"></i>
                    </router-link>
                </section>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopenclipart.org%2Fimage%2F2400px%2Fsvg_to_png%2F275692%2F1489798288.png&f=1&nofb=1" alt="books" />
            </section>
        </section>
    `,
}

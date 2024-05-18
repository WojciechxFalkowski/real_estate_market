// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		'@vee-validate/nuxt',
		'@pinia/nuxt',
		// https://nuxtseo.com/sitemap/getting-started/installation
		'@nuxtjs/sitemap',
		// https://nuxtseo.com/robots/getting-started/features
		'nuxt-simple-robots'
	],
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		public: {
			//https://stackoverflow.com/questions/72041740/how-to-set-global-api-baseurl-used-in-usefetch-in-nuxt-3
			BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
		},
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false,
			extensions: ['.vue']
		},
	],
	site: {
		indexable: true,
		url: 'https://wellrent-nieruchomosci.pl',
	},
	sitemap: {
		exclude: ['/cms/**', '/logowanie/**', '/rejestracja/**'],
	},
	robots: {
		allow: ['', '/zarzadzanie-najmem', '/mieszkania-na-wynajem', '/faq', '/kontakt'],
		disallow: ['/cms', '/logowanie', '/rejestracja'],
		enabled: true,
		sitemap: 'https://wellrent-nieruchomosci.pl/sitemap.xml'
	},
})

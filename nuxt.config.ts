// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		'@vee-validate/nuxt',
		'@pinia/nuxt',
	],
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		public: {
			//https://stackoverflow.com/questions/72041740/how-to-set-global-api-baseurl-used-in-usefetch-in-nuxt-3
			BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
		},
	},

})

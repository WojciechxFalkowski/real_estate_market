// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		'@vee-validate/nuxt',
	],
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
})

// plugins/toastify.ts
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('toastify', Toastify);
});

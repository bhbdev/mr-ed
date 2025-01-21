import './scss/theme.scss'
import "bootstrap/scss/bootstrap.scss";

import App from './App.vue'
import router from './router'
import siteConfig from '../site.config'
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate'
//import { createGtm } from '@gtm-support/vue-gtm';
//import { useScratchList, useChatLog } from '@/stores'

const app = createApp(App)
app.provide('site', siteConfig)

const pinia = createPinia()
pinia.use(createPersistedState({
  storage: sessionStorage,
}))

app.use(pinia)
app.use(router)

	
//const NewsLib = useNewsLib()
//NewsLib.fetchChannels().then(()=>{
	app.mount('#app')
//})
	
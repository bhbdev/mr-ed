import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { useScratchList, useChatLog } from '@/stores'	
//import { AutoSub } from '@/api'
import Assistant from '@/components/ai/Assistant.vue'
import QuizMaker from '@/components/ai/QuizMaker.vue'
//import Story from '@/channel/Story.vue'



const pages = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   // { path: '/', component: Assistant, props:true, name:'assistant' }, 
    { path: '/quizmaker', component: QuizMaker, props:true, name:'quizmaker' }, 
//    { path: '/:channelpath+/s-:storyid', component: Story, props:true, name:'story' }, 
    ...pages
  ],
  linkActiveClass: 'active',
	scrollBehavior(to, from, savedPosition) {
	  return { top: 0, left: 0 }
	},
})


router.beforeEach((to, from, next) => {
  const chatLog = useChatLog()
  const scratchList = useScratchList()
  next()
})


export default router

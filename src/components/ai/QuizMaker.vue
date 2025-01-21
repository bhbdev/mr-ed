<script setup lang="ts">
import { ref,inject,computed, onMounted,onUnmounted, provide } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useScratchList, useChatLog } from '@/stores'
import { quizAssistant } from '@/lib/agents'
import QuizEditor from '@/components/modals/QuizEditor.vue'

const props = defineProps(['path'])
const router = useRouter()

const chatLog = useChatLog()
const scratchList = useScratchList()

const greeted = ref(false)
const curQuiz = ref(null)
const quizEditor = ref(null)
const userText = ref('')
const chatText = ref('')


function openQuizEditor(quiz) {
    curQuiz.value = quiz
    quizEditor.value.show()
}

const filteredChat = ()=> {
    return chatLog.getMessages().filter(m => m.role != 'system').reverse()
}

function copyText(e) {
  navigator.clipboard.writeText(e.target.innerText)
  alert('copied')
}

function updateLog(role, msg) {
  chatLog.addMessage({ role: role, content: msg })
}


function clearChat() {
  chatLog.$reset()
}


function askEdAssistant()  {
  updateLog('user', userText.value)
  userText.value = ''
  const tools = {
    openQuizEditor,
  }

  quizAssistant.generateAIText(tools).then((res)=>{
    try {
      const { message, jsonMessage } = JSON.parse(res)
      updateLog('assistant', message)
      if (jsonMessage) {
        updateLog('assistant', JSON.stringify(jsonMessage,null,2))
      }
    } catch (e) {
      updateLog('assistant', res)
    }
  })
}

// const greeting = 'Hello! I am the  <span class="fs-6">🎩</span> Quiz Maker. How can I help you today?'

// function greetUser() {
//     updateLog('assistant', greeting)
// }
// function removeGreeting() {
//     let msgidx = chatLog.getMessages().findIndex(m => m.content == greeting)
//     if (msgidx >= 0) {
//         chatLog.removeMessage(msgidx)
//     }
// }


// onMounted(()=>{
//    if (chatLog.getMessages().length == 0)
//     greetUser()
// })
// onUnmounted(()=>{
//     removeGreeting()
// })

</script>

<template>
  <main class="page container-fluid p-4">
    
    <div class="row">
      <div class="col-7">
        
        <h3><i class="fa fa-wand-sparkles"></i> Quiz Maker</h3>
        <form @submit.prevent="askEdAssistant">
        <div class="input-group">
          <input v-model="userText" placeholder="What would you like to do..." class="form-control"  >
          <button type="submit" class="btn btn-primary">Ask</button>
          <button type="button" class="btn btn-secondary" @click="clearChat">Clear</button>
        </div>
        </form>    

        <div class="">
           <div class="overflow-auto border-start" style="height:75vh;background-color:#f8f8f8">
             <ul class="list-group list-group-flush p-3" style="font-size: small;">
               <li class="list-group-item border-0 py-2" v-for="msg of filteredChat()" :key="msg.content">
                 <template v-if="msg.role=='user'">
                   <span>YOU:</span>
                   <div v-html="msg.content" class="rounded-4" speech-bubble ptop aleft style="--bbColor:#e8e8e8;font-weight:600;color:#334155">
    
                   </div>
                 </template>
                 <template v-else>
                   <span>MR_ED:</span>
                   <div class="rounded-4" speech-bubble ptop aleft style="--bbColor:#d6eff7;font-weight:600">
                    <template v-if="msg.content.includes('{')">
                      <pre @click="copyText">{{msg.content}}</pre>
                    </template>
                    <template v-else>
                     <div v-html="msg.content"></div>
                    </template>
                   </div>
                 </template>
               </li>
             </ul>
           </div>
        </div>
      </div>
      <div class="col-5 ps-3 border-start">
        <button @click="newList" class="btn btn-dark">New List</button>
        <button @click="openQuizEditor(null)" class="btn btn-dark">Quiz Editor</button>
        <hr>
        <div v-if="scratchList != null" class="card border-0">
            <div class="card-body form-floating">
                <div class="input-group">
                    <span class="input-group-text border-0 bg-white"><i class="fa fa-list"></i></span>
                    <input id="list_name" :value="scratchList.getName()" placeholder="List Name" class="fs-5 form-control border-0 shadow-none rounded-0 border-bottom" />    
                </div>
                
                <ul class="list-group list-group-flush my-2">
                    <li class="list-group-item d-flex" v-for="(item, index) in scratchList.getList()" :key="index" @click="openQuizEditor(item)">
                        <div class="align-self-start pe-3">{{index+1}}.</div>
                        <div class="flex-grow-1">{{ item.question }}</div>
                        <button @click="scratchList.removeListItem(index)" class="btn btn-sm align-self-start ms-3 btn-link text-muted"><i class="fa fa-x"></i></button>
                    </li>
                    <li class="list-group-item">
                        <small class="text-muted">
                            <i class="fa fa-lightbulb"></i> Tip: Use the chat to add a quiz:
                            <div class="p-2 ps-2">"Add a quiz about tacos to the list"</div> 
                        </small>
                    </li>
                </ul>
                <button @click="scratchList.$reset" class="btn btn-sm text-white btn-danger" title="Clear the list">Clear List</button>
            </div>
        </div>

      </div>
    </div>
    <QuizEditor ref="quizEditor" :quiz="curQuiz" />
  </main>
</template>

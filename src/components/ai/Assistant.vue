<script setup lang="ts">
import { ref,inject,computed, onMounted,reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { generateText,generateObject,streamText,tool } from 'ai';
//import { useChat } from '@ai-sdk/vue'
import { createOpenAI } from '@ai-sdk/openai'; // Ensure OPENAI_API_KEY environment variable is set
import { z } from 'zod'
import { useChatLog } from '@/stores'

const quizSchema = z.object({
  quiz: z.object({
    question: z.string(),
    answer: z.string(),
    choices: z.array(z.string()),
  }),
});

// import { useNewsLib } from '@/stores'

const openai = createOpenAI({ 
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_OPENAI_BASE_URL,
})

const props = defineProps(['path'])
const router = useRouter()


const gdoc = reactive({
    docid: '', 
    content: ''
})

const chatLog = useChatLog()

const userText = ref('')
const chatText = ref('')

function handleSubmit() {
  if (input.value) {
    messages.value.push({ role: 'user', content: input.value });
    input.value = '';
  }
}
// const { messages, input, handleInputChange, handleSubmit } = useChat({
//     keepLastMessageOnError: true,
// });

function clearChat() {
  chatLog.$reset()
}

const filteredChat = ()=> {
    return chatLog.getMessages().filter(m => m.role != 'system').reverse()
}

function copyText(e) {
  navigator.clipboard.writeText(e.target.innerText)
  alert('copied')
}

function updateLog(role: string, msg: string) {
  chatLog.addMessage({ role: role, content: msg })
}

function askEdAssistant()  {
  updateLog('user', userText.value)
  userText.value = ''
  generateAIText().then((res)=>{
    // try {
    //   const { message, jsonMessage } = JSON.parse(res)
    //   updateLog('assistant', message)
    //   if (jsonMessage) {
    //     updateLog('assistant', JSON.stringify(jsonMessage,null,2))
    //   }
    // } catch (e) {
    //   updateLog('assistant', res)
    // }
    try {
      updateLog('assistant', res)
    } catch (e) {
      updateLog('assistant', "Error: " + e)
    }

    // if (res.includes('```json')) {
    //   generateAIObject(res).then((res2)=>{
    //     updateLog('assistant', JSON.stringify(res2,null,2))
    //   })
    // } else
    //   updateLog('assistant', res)
  })
}

// tool to fetch google docs by docid
const fetchGoogleDoc = tool({
  description: 'Tool to fetch google docs by docid. ',
  parameters: z.object({
    docid: z.string(),
  }),
  execute: async ({ docid }) => {
    if (gdoc.docid === docid) {
      return gdoc.content
    }
   //const response = await fetch(`https://docs.google.com/document/d/${docid}/export?format=txt`)
    const response = await fetch(`http://localhost:8888/?docid=${docid}`)
    const msg = await response.json()
    gdoc.docid = docid
    return gdoc.content = msg
  }
})

const updateGoogleDoc = tool({
  description: 'Tool to set or update gdoc content after editing or fetching google docs. ',
  parameters: z.object({
    content: z.string(),
  }),
  execute: async ({ content }) => {
    gdoc.content = content
  }
})

const openRoute = tool({
  description: 'Tool to open various pages and assistants. ' +
               'The current path routes are: ' + JSON.stringify(router.getRoutes().map(r => r.path)) +
               '\n ALWAYS use one of the paths in the routes array.',
  parameters: z.object({
    path: z.string(),
    }),
    execute: ({ path }) => router.push({ path }),
})

// const aiResponse = tool({
//     description: 'A tool for providing the assistant content response.',
//     parameters: z.object({
//         message: z.string(),
//         jsonMessage: z.object({}),
//     })
// // no execute function - invoking it will terminate the agent
// })


async function generateAIText() {
  
  const { text } = await generateText({
    //model: openai('gpt-4-turbo', { structuredOutputs: true }),
    model: openai('gpt-4-turbo', { structuredOutputs: true }),
    maxTokens: 1024,
    maxSteps: 10,
    tools: {
      openRoute,
      fetchGoogleDoc,
      updateGoogleDoc,
   //  aiResponse,
    },
    system: 'You are a friendly, super-intelligent assistant named Mr. Ed! ' +
            'Your goal is to assist editors with various tasks.' +
            'Including editing documents, converting text to html, creating trivia quizzes and lists of them, or opening other assistant pages. ' +
            //  'You must ALWAYS respond in JSON format.' +
            //  'The JSON response should contain the following keys: ' +
            //  '"message" : The string message to the user. ' +
            //  '"jsonMessage" : An object. ' +
            //  'The jsonMessage is optional and can be a single object or an array of objects. ' +
            //  'You must always respond with a JSON object containing those keys. ' +
            //  'An example response is: ' +
            //  `{
            //     "message": "Here is a quiz for you.",
            //     "jsonMessage": {
            //         "question": {
            //             "text": "What is the capital of France?"
            //         }, 
            //         "answer": {
            //             "key": "Paris", 
            //             "description": "Paris is the capital of France."
            //         }, 
            //         "choices": ["Paris", "London", "Berlin", "Madrid"]
            //     }
            //  }` +
             'You can use the tools provided to assist you. ' +
             'For example, you can use the openRoute tool to open various pages and assistants. ' +
             'Before you use the openRoute tool, you should ALWAYS respond with a message. ' +
             'Another tool you can use is the fetchGoogleDoc tool. ' +
             'You can use this tool to fetch google docs by docid. It is NOT for quizzes.' +
             'You must use the updateGoogleDoc tool to set or update gdoc content after editing or fetching google docs. ' +
             //'Always use the fetchGoogleDoc response as the message in the aiResponse' +
            // 'The aiResponse tool is used to provide the final completion message.' +
             'Act cheeky and like a bro. ' ,
//    prompt: userPrompt,
    messages: chatLog.getMessages(),
    // onStepFinished: (step) => {
    //   updateLog('assistant', step.message);
    // },
  });
  return text
}

async function generateAIObject(userPrompt) {
  const result = await generateObject({
    model: openai('gpt-4-turbo'),
    //output: 'no-schema', 
    schema: quizSchema,
    prompt: 'Extract and return and array of quizzes from the ```json object from the string: ' + userPrompt
  })
  return result
}


</script>

<template>
    <div class="row">
  <div class="col-6">
    <h3> Hello, I'm Mr. Ed</h3>
    <form @submit.prevent="askEdAssistant">
    <div class="input-group">
        <input v-model="userText" placeholder="Ask me something..." class="form-control"  >
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
  <div class="col-5" v-if="gdoc.content">
    <h3>Doc Preview</h3>
    <div class="input-group">
    <button class="btn" @click="showRawContent"><i class="fa fa-file-edit"></i></button>
    <button class="btn" @click="showPreview"><i class="fa fa-eye"></i></button>
</div>
    <div class="bg-light border-0 w-100 h-100 p-3 " style="font-size: 12px">
        {{ gdoc.content }}
    </div>
  </div>
</div>
</template>

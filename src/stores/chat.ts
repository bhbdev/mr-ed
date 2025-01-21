import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

// store to keep track of chat messages
export const useChatLog = defineStore('chatLog', () => {
  
    type ChatLog = {
        messages: string[]
    }

    const _chatLog = ref({ messages: [] } as ChatLog)
    
    function getMessages() {
        return _chatLog.value.messages
    }

    function addMessage(message: string) {
        _chatLog.value.messages.push(message)
    }

    function removeMessage(index: number) {
        _chatLog.value.messages.splice(index, 1)
    }

    function streamMessage(index: number, msg: string) {
        if (_chatLog.value.messages[index])
            _chatLog.value.messages[index] = msg
        else
            _chatLog.value.messages.push(msg)
    }

    function $indexOf(message: string) {
        return _chatLog.value.messages.indexOf(message)
    }
    
    function $reset() {
        _chatLog.value = { messages: [] }
    }
    
    return {
        chatLog: _chatLog,
        addMessage,
        getMessages,
        removeMessage,
        streamMessage,
        $indexOf,
        $reset
    }
  
}, {
    persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useChatLog, import.meta.hot))
}
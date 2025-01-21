<script setup>

import { ref,reactive,watch } from 'vue'
import BaseModal from '@/components/modals/BaseModal.vue'

const props = defineProps(['quiz'])
const quizModal = ref(null)

const quiz = reactive({
    question: '',
    choices: ['', '', '', ''],
    answer: '',
    explanation: ''
})

watch(() => props.quiz, (newQuiz) => {
    if (newQuiz) {
        quiz.question = newQuiz.question
        quiz.choices = newQuiz.choices
        quiz.answer = newQuiz.answer
        quiz.explanation = newQuiz.explanation
    }
})

const processing = ref(false)

function saveQuiz() {
	processing.value = true	
    // save quiz

}

defineExpose({
    show: () => quizModal.value.show(),
    hide: () => quizModal.value.hide()
})

</script>

<style>
.subresult {
	font-size: .9rem;
}
</style>


<template>
    <Teleport to="body">
        <BaseModal ref="quizModal" id="quiz-editor" size="lg">
        <template #body>
            <div class="card-group d-flex flex-column flex-md-row ">
                <div class="card border-0 p-3 ps-1">
                    <div v-if="!processing && quiz" class="text-center">
                       
                        <h5><i class="fa fa-edit"></i> Quiz Editor</h5>
                        <form @submit.prevent="">

                            <div class="form-group text-start">
                                <label class="px-3 p-2 flex-grow-0"><i class="fa fa-question-circle"></i> Question</label>
                                <div class="input-group">
                                    <span class="input-group-text border-0 bg-white align-self-start" title="Question">&nbsp;</span>
                                    <textarea v-model="quiz.question" placeholder="Question" class="form-control  border-1 shadow-none rounded-0 ">
                                    </textarea>
                                </div>
                            </div>
                            
                            <div class="form-group py-1 g-1 text-start"> 
                                <label class="px-3 p-2 flex-grow-0"><i class="fa fa-sm fa-list-ol"></i> Choices</label>
                                <div class="form-group g-1 row ps-5">
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fa fa-sm fa-1"></i></span>
                                    <input v-model="quiz.choices[0]" placeholder="Choice 1" class="form-control  shadow-none rounded-0" />
                                </div>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fa fa-sm fa-2"></i></span>
                                    <input v-model="quiz.choices[1]" placeholder="Choice 2" class="form-control  shadow-none rounded-0" />
                                </div> 
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fa fa-sm fa-3"></i></span>
                                    <input v-model="quiz.choices[2]" placeholder="Choice 3" class="form-control shadow-none rounded-0" />
                                </div>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fa fa-sm fa-4"></i></span>
                                    <input v-model="quiz.choices[3]" placeholder="Choice 4" class="form-control  shadow-none rounded-0" />
                                </div>
                                </div>
                            </div>
                            <div class="form-group py-1 g-1 text-start"> 
                                <label class="px-3 p-2 flex-grow-0"><i class="fa fa-key"></i> Answer</label>
                                <div class="input-group">
                                    <span class="input-group-text border-0 bg-white" title="Answer">&nbsp;</span>
                                    <input v-model="quiz.answer" placeholder="The answer should match one of the choices" class="form-control border-1 shadow-none rounded-0 " />
                                </div>
                            </div>
                            <div class="form-group py-1 g-1 text-start"> 
                                <label class="px-3 p-2 flex-grow-0"><i class="fa fa-info-circle"></i> Explanation</label>
                                <div class="input-group">
                                    <span class="input-group-text border-0 bg-white align-self-start" title="Explanation">&nbsp;</span>
                                    <textarea placeholder="Explanation" class="form-control border-1 shadow-none rounded-0 "></textarea>
                                </div> 
                            </div>

                            <button type="submit" class="btn btn-primary">Save</button>
                        </form>


                    </div>
                    <div v-else>
                        <i class="fa fa-spinner spin"></i> processing...
                    </div>
                </div>
            </div>
        </template>
        </BaseModal>
    </Teleport>
</template>

import { generateText,generateObject, tool } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import { useScratchList, useChatLog } from '@/stores';
import { quizSchema, listSchema } from '@/lib/schemas'

const openai = createOpenAI({ 
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
})

async function generateAIText(tools: any) {
    const scratchList = useScratchList()
    const chatLog = useChatLog()

    const { text } = await generateText({
        model: openai('gpt-4-turbo', { structuredOutputs: true }),
        maxTokens: 1024,
        tools: {
            newList: tool({
                description: 'A tool for creating a new scratch list',
                parameters: listSchema,
                execute:  async (item) => {
                    scratchList.newList(item.name)
                    return 'Created a new scratch list'
                }
            }),
            addListItem: tool({
                description: 'A tool for adding a quiz to the scratch list',
                parameters: quizSchema,
                execute:  async ({ quiz }) => {
                    //scratchList.value.items.push(quiz)
                    scratchList.addListItem(quiz)
                    return `Added ${quiz} to the list`
                }
            }),
            removeListItem: tool({
                description: 'A tool for removing a quiz from the scratch list',
                parameters: z.object({
                    index: z.number()
                }),
                execute:  async ({ index }) => {
                    scratchList.removeListItem(index)
                    return `Removed item at index ${index} from the list`
                }
            }),
            resetList: tool({
                description: 'A tool for resetting the scratch list',
                parameters: z.object({}),
                execute:  async () => {
                    scratchList.clearList()
                    return 'Cleared the scratch list'
                }
            }),
            editQuiz: tool({
                description: 'A tool for editing a quiz in the scratch list. ' +
                             'This tool will open the quiz editor passing the quiz into it.' +
                             'This tool should end the conversation.',
                parameters: z.object({
                    index: z.number(),
                    item: quizSchema
                }),
                execute:  async ({ index, item }) => {
                    // open quiz editor
                    console.log('editing',index, item.quiz)
                    tools.openQuizEditor(item.quiz)
                    return `Editing quiz at index ${index} in the list`
                }
            }),
            // answer tool: the LLM will provide a structured answer
            response: tool({
                description: 'A tool for providing the final response.',
                parameters: z.object({
                    message: z.string(),
                    jsonMessage: quizSchema,
                })
            // no execute function - invoking it will terminate the agent
            }),
        },
        //toolChoice: 'required',
        maxSteps: 10,
        system: 'You are a friendly assistant named Mr. Ed! ' +
                'Your goal is to assist editors with creating trivia quizzes. ' +
                'You can help them generate quiz questions and answers. ' + 
                'The quizzes should be in the format of a JSON object. ' +
                'An example of one quiz is:' +
                `{
                    "question": {
                        "text": "What is the capital of France?"
                    }, 
                    "answer": {
                        "key": "Paris", 
                        "description": "Paris is the capital of France."
                    }, 
                    "choices": ["Paris", "London", "Berlin", "Madrid"]
                }` +
                'Your primary task is to generate a quiz object from the user prompt. ' +
                'If asked for more than one quiz or quizzes your should generate an array of quiz objects. ' +
                'You should not provide any additional information or context in the JSON. ' +
                'Make sure to follow the quiz schema provided and do not duplicate quizzes. ' +
                'Always send the response in JSON format.' +
                'The JSON response should contain the following keys: ' +
                'message: The message to the user. ' +
                'jsonMessage: A json object. ' +
                'The jsonMessage is optional and can be a single object or an array of objects. ' +
                'You MUST always respond in this JSON response format. ' +
                'An example response is: ' +
                `{
                    "message": "Here is a quiz for you.",
                    "jsonMessage": {
                        "question": {
                            "text": "What is the capital of France?"
                        }, 
                        "answer": {
                            "key": "Paris", 
                            "description": "Paris is the capital of France."
                        }, 
                        "choices": ["Paris", "London", "Berlin", "Madrid"]
                    }
                }` +
                'There are various tools available to you to help you with your task. ' +
                'The last tool you should use is the response tool. ' +
                'Always provide a message to the response tool about what you have done.' +
                'When asked to add a quiz to the scratch list you should add the quiz to the list. ' +
                'After you add a quiz to the scratch list you should respond with a message. ' +
                'When asked to remove a quiz from the scratch list you should remove the quiz from the list. ' +
                'When asked to edit a quiz in the scratch list you should open the quiz editor. ' +
                'Always pass the index and quiz from the list to the quiz editor. ' +
                'When opening the quiz editor you should always provide a quiz object from the list. ' +
                'The current list of quizzes is: ```json' +
                JSON.stringify(scratchList.getList()) +
                '```\nAct cheeky and like a bro. ' ,
    //    prompt: userPrompt,
        messages: chatLog.getMessages()
    });
    return text
}
  
async function generateAIObject() {
    const result = await generateObject({
        model: openai('gpt-4-turbo'),
        //output: 'no-schema', 
        schema: quizSchema,
        prompt: 'Extract and return and array of quizzes from the ```json object from the string: ' + userPrompt
    })
    return result
}

export const quizAssistant = {
    generateAIText,
    generateAIObject
}

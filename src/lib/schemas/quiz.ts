import { z } from "zod";

export const quizSchema = z.object({
    quiz: z.object({
        question: z.string(),
        answer: z.string(),
        choices: z.array(z.string()),
    }),
});
  
import { Configuration, OpenAIApi } from 'openai';
import dontenv from 'dotenv';

dontenv.config();

const GPT_API_key = process.env.GPT_API as string;

const config = new Configuration({
    apiKey: GPT_API_key,
});

const openai = new OpenAIApi(config);

async function answerQuestion(question: string, choices: string[], mode: string) {
    if (mode === 'bank') {
      let answers = ''
      for (let i = 0; i < choices.length; i++) {
          answers += choices[i]+ ', '
      }
      const ans = await openai.createCompletion({
          
          model: 'text-davinci-003',
          prompt: `explain this question for me \n ${question} \n and tell me which one is correct \n ${answers} \n`,
          temperature: 0.7,
          max_tokens: 4000,
      });
      return ans.data.choices[0].text;
    } else if (mode === 'question') {
      const ans = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: question,
          temperature: 0.7,
          max_tokens: 4000,
      });
      return ans.data.choices[0].text;
    }
}

export default answerQuestion;
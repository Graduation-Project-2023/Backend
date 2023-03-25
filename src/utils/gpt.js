// import { Configuration, OpenAIApi } from 'openai';
const { Configuration, OpenAIApi } = require('openai');
// import dontenv from 'dotenv';
const dotenv = require('dotenv').config();

// dontenv.config();

const GPT_API_key = process.env.GPT_API;

const config = new Configuration({
    apiKey: GPT_API_key,
});

const openai = new OpenAIApi(config);

async function answerQuestion(question, choices) {
    let answers = ''
    for (let i = 0; i < choices.length; i++) {
        answers += choices[i]+ ', '
    }
    // console.log('anss' ,answers)
    const ans = await openai.createCompletion({
        
        model: 'text-davinci-003',
        prompt: `explain this question for me \n ${question} \n and tell me which one is correct \n ${answers} \n`,
        temperature: 0.7,
        max_tokens: 300,
    });
    // console.log(`explain this question for me \n ${question} \n and tell me which one is correct \n ${answers} \n`);
    return ans.data.choices[0].text;
}

const r = answerQuestion('what is a localhost? ', ['10.10.10.10', '127.0.0.1', ':1', '192.168.0.1'])
    .then((res) => {
        console.log(res);
    })
// export default answerQuestion;
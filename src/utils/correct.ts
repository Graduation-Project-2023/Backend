
function checkAnswers(userAnswers: any, modelAnswers: any): number {
    let score = 0;

    for (let userAnswer of userAnswers) {
        const question = modelAnswers.find((q: { id: any; }) => q.id === userAnswer.questionId);
        if (!question) {
        continue;
        }

        const correctAnswers = question.answer.map((a: string) => a.toLowerCase());

        // check if userAnswer.answer is an array of answers
        let userChoices;
        if (Array.isArray(userAnswer.answer)) {
            userChoices = userAnswer.answer.map((a: string) => a.toLowerCase());
        } else {
            userChoices = [userAnswer.answer.toLowerCase()];
        }

        let isCorrect = true;
        for (let userChoice of userChoices) {
        if (!correctAnswers.includes(userChoice)) {
            isCorrect = false;
            break;
        }
        }
        if (isCorrect) {
            score++;
        }
  }
  return score;
}


export default checkAnswers;
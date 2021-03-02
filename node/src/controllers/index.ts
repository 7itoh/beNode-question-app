import { RequestHandler } from 'express'
import fetch from 'node-fetch'
import dotENV from 'dotenv'

dotENV.config();

export const quizController: RequestHandler = (req, res, next): void => {
    const data = {
        script: 'js/main.js',
    }
    res.render('../views/quizForm.ejs', data);
}

export const quizApiController: RequestHandler = async (req, res, next) => {
    try {
      const url = process.env.ENV_API_URL!;
  
      await fetch(url)
      .then(response => response.json())
      .then(qzData => {
        const quiz = {
          questions: [],
          answersBox: []
        }
        function shuffle ([...onsection]) {
          for (let i = onsection.length - 1; i >= 0; i--) { 
              const j = Math.floor(Math.random() * (i + 1));
              [onsection[i], onsection[j]] = [onsection[j], onsection[i]];
          }
          quiz.answersBox.push(onsection);
        }
        if(qzData.results){
          quiz.questions = qzData.results.slice() ;
          for(let i = 0; i < quiz.questions.length; i++ ){
            const questionAnswersBox = quiz.questions[i].incorrect_answers;
            const qzTrue = quiz.questions[i].correct_answer;
            questionAnswersBox.push(qzTrue);
            shuffle(questionAnswersBox);
          }
        }
        res.json(quiz);
      }).catch(e => console.log(e));
    } catch(err) {
      console.log(err);
    }
  }
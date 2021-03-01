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
        const data = {
          questions: []
        }
        if(qzData.results){
          data.questions = qzData.results;
        }
        res.json(data.questions);
      }).catch(e => console.log(e));
    } catch(err) {
      console.log(err);
    }
  }
import { RequestHandler } from 'express'

export const quizController: RequestHandler = (req, res, next): void => {
    const data = {
        script: 'js/main.js',
    }
    res.render('../views/quizForm.ejs', data);
}
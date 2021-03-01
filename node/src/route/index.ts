import { Router } from 'express'
import { quizController, quizApiController } from '../controllers/index'

const router = Router();

router
    .get('/', (req, res, next): void => {res.redirect('quiz');})
    .get('/quiz', quizController)
    .get('/quiz/api', quizApiController)

export default router;
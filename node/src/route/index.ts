import { Router } from 'express'
import { quizController } from '../controllers/index'

const router = Router();

router.get('/', (req, res, next): void => {
    res.redirect('quiz');
})

router.get('/quiz', quizController);

export default router;
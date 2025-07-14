import { Router } from 'express';
import { fetchQuestions, fetchQuestion, searchQuestion, postQuestion, getQuestionsByUser } from './questions.service';

const router = Router();

router.get('/get-questions', fetchQuestions);
router.get('/get-question/:id', fetchQuestion);
router.get('/searchquestion', searchQuestion);
router.get('/myquestions', getQuestionsByUser);
router.post('', postQuestion);

export default router;

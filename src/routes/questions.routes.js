import { Router } from "express";
import { getQuestion, getQuestions, updateQuestion, createQuestion, deleteQuestion } from "../controllers/questions.controllers.js";
import validateToken from "../middlewares/validateToken.js";
import isAdmin from "../middlewares/isAdmin.js";


const router = Router()
    
router.get('/questions', getQuestions)

router.get('/question/:id', getQuestion)

router.post('/questions', validateToken, isAdmin, createQuestion )

router.patch('/question/:id', validateToken, isAdmin, updateQuestion)

router.delete('/question/:id', validateToken, isAdmin, deleteQuestion)

export default router 
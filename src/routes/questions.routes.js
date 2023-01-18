import { Router } from "express";
import { getQuestion, getQuestions, updateQuestion, createQuestion, deleteQuestion } from "../controllers/questions.controllers.js";
import validateToken from "../middlewares/validateToken.js";
import isAdmin from "../middlewares/isAdmin.js";
import { pool } from "../../db.js";


const router = Router()
    
router.get('/ping', async (req,res)=>{
    const result = await pool.query('SELECT 1 +1 AS result')
    res.json(result)
    // res.send('pong 1+1')
})

router.get('/questions', getQuestions)

router.get('/question/:id', getQuestion)

router.post('/questions', validateToken, isAdmin, createQuestion )

router.patch('/question/:id', validateToken, isAdmin, updateQuestion)

router.delete('/question/:id', validateToken, isAdmin, deleteQuestion)

export default router 
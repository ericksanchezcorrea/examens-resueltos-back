import { Router } from "express";
import { singUp, loginUser, createAdmin, updatePassword, deleteUser } from "../controllers/users.controllers.js";
import isSuperAdmin from "../middlewares/isSuperAdmin.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router()

router.post('/login', loginUser)
router.post('/admin', validateToken, isSuperAdmin ,createAdmin)
router.patch('/updatePassword', validateToken, updatePassword)
router.delete('/admin/:id', validateToken, isSuperAdmin, deleteUser)


// Sin efecto *******
// router.post('/signUp', singUp)


export default router 
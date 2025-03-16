import express, { Router } from 'express'
import UserController from '../controllers/userController'
// import errorHandler from '../services/errorHandler'
const router:Router = express.Router()

router.route("/register").post(UserController.register)
router.route("/login").post(UserController.login)
router.route("/forgetpassword").post(UserController.handleForgotPassword)
export default router
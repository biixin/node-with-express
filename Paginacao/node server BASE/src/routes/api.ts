import { Router } from "express";
import * as AccountController from '../controllers/AccountController'
import * as UserController from '../controllers/UserController'
import * as FormController from '../controllers/FormController'
import { Auth } from './../middlewares/auth';

const router = Router()

router.get('/ping', AccountController.ping)

// Account Controller
router.post('/login', AccountController.Login)
router.post('/request', Auth.private, AccountController.AccountREQUEST)
router.post('/register', AccountController.Register)

//Formulario Controller

router.get('/form', FormController.read)
router.post('/form', FormController.create)
router.delete('/form/:id', FormController.destroy)





// User Controller
router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.post('/users', UserController.create)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.destroy)

export default router 
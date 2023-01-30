import { Router } from "express";
import * as AccountController from '../controllers/AccountController'
import * as UserController from '../controllers/UserController'
import * as RepositoryController from '../controllers/RepositoryController'
import { Auth } from './../middlewares/auth';

const router = Router()

router.get('/ping', AccountController.ping)

// Account Controller
router.post('/login', AccountController.Login)
router.post('/request', Auth.private, AccountController.AccountREQUEST)
router.post('/register', AccountController.Register)

// User Controller
router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.post('/users', UserController.create)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.destroy)

// Repository Controller
router.get('/users/:user_id/repositories', Auth.private, RepositoryController.index)
router.post('/users/:user_id/repositories', Auth.private, RepositoryController.create)
router.delete('/users/:user_id/repositories/:_id', Auth.private, RepositoryController.destroy)

export default router 
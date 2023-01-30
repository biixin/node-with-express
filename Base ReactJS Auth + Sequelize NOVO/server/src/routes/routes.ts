import { Router, Request } from 'express';
import * as Controller from '../controllers/Controller';
import * as AuthController from '../controllers/AuthController';

import { Auth } from '../middlewares/Auth';
import {AuthValidator} from '../validators/AuthValidator'
import { UserValidator } from './../validators/UserValidator';
import { upload } from '../middlewares/uploadFile';



const router = Router();

router.get('/ping', Controller.ping);

// Auth ---------
router.post('/user/signup', AuthValidator.signup, AuthController.signup);
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.get('/user/request', Auth.private, AuthController.AccountREQUEST);

export default router;
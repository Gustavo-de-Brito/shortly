import { Router } from 'express';
import { setNewUser, signin } from '../controllers/authControllers.js';
import newUserValidation from '../middlewares/newUserValidation.js';
import loginValidation from '../middlewares/loginValidation.js';

const router = Router();

router.post('/signup', newUserValidation, setNewUser);

router.post('/signin', loginValidation, signin);

export default router;
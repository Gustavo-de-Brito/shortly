import { Router } from 'express';
import { getUserData } from '../controllers/usersControllers.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = Router();

router.get('/users/me', tokenValidation, getUserData);

export default router;
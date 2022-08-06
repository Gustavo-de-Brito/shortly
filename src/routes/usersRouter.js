import { Router } from 'express';
import { getUserData, getRanking } from '../controllers/usersControllers.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = Router();

router.get('/users/me', tokenValidation, getUserData);
router.get('/ranking', getRanking);

export default router;
import { Router } from 'express';
import { setNewUser } from '../controllers/authControllers.js';
import newUserValidation from '../middlewares/newUserValidation.js';

const router = Router();

router.post('/signup', newUserValidation, setNewUser);

export default router;
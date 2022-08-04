import { Router } from 'express';
import { shortUrl } from '../controllers/urlsControllers.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = Router();

router.post('/urls/shorten', tokenValidation, shortUrl);

export default router;
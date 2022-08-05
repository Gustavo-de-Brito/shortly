import { Router } from 'express';
import { decreaseUrl, getUrl, directShortUrl } from '../controllers/urlsControllers.js';
import tokenValidation from '../middlewares/tokenValidation.js';
import urlValidation from '../middlewares/urlValidation.js';

const router = Router();

router.post('/urls/shorten', tokenValidation, urlValidation, decreaseUrl);
router.get('/urls/:id', getUrl);
router.get('/urls/open/:shortUrl', directShortUrl);

export default router;
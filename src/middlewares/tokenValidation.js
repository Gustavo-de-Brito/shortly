import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function tokenValidation(req, res, next) {
  const { token } = req.headers;

  const formatedToken = token?.replace('Bearer ', '');

  try {
    const sessionId = jwt.verify(formatedToken, process.env.PRIVATE_KEY_JWT);

    res.locals.sessionId = sessionId;

    next();
  }catch(err) {
    res.sendStatus(401);
  }
}

export default tokenValidation;
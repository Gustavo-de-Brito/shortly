import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');

  try {
    const { userId } = jwt.verify(token, process.env.PRIVATE_KEY_JWT);

    res.locals.userId = userId;

    next();
  }catch(err) {
    res.sendStatus(401);
  }
}

export default tokenValidation;
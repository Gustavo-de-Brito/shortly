import loginSchema from '../schemas/loginSchema.js';

function loginValidation(req, res, next) {
  const loginData = req.body;

  const { error } = loginSchema.validate(loginData, {abortEarly: false});

  if(error) {
    const errors = error.details.map(err => err.message);
    return res.status(422).send(errors);
  }

  next();
}

export default loginValidation;
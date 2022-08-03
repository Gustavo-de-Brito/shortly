import registerSchema from '../schemas/registerSchema.js';

function newUserValidation(req, res, next) {
  const newUserData = req.body;

  const { error } = registerSchema.validate(newUserData, {abortEarly: false});

  if(error) {
    const errors = error.details.map(err => err.message);
    return res.status(422).send(errors);
  }

  next();
}

export default newUserValidation;
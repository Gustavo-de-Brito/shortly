import urlSchema from '../schemas/urlSchema.js';

function urlValidation(req, res, next) {
  const url = req.body;

  const { error } = urlSchema.validate(url);

  if(error) {
    const errors = error.details.map(err => err.message);
    return res.status(422).send(errors);
  }

  next();
}
export default urlValidation;
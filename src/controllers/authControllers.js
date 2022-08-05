import connection from '../databases/postgres.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// routes process and validations functions
async function isUserAlredyRegistered(email, name) {
  const { rows: emailRegistered } = await connection.query(
    `SELECT * FROM users WHERE email = $1`,
    [ email ]
  );

  if(emailRegistered[0]) return 'email já registrado';
  
  const { rows: nameRegistered } = await connection.query(
    `SELECT * FROM users WHERE name = $1`,
    [ name ]
  );

  if(nameRegistered[0]) return 'nome já registrado';
}

async function isValidLogin(email, password) {
  const { rows: userData } = await connection.query(
    `SELECT * FROM users WHERE email = $1`,
    [ email ]
  );

  if(!userData[0]) return false;

  const validPassword = bcrypt.compareSync(password, userData[0].password);

  if(!validPassword) return false;

  return userData;
}

// routes functions
export async function setNewUser(req, res) {
  const { name, email, password} = req.body;

  try {
    const isUserRegistered = await isUserAlredyRegistered(email, name);

    if(isUserRegistered) return res.status(409).send(isUserRegistered);

    const cryptedPassword = bcrypt.hashSync(password, 10);

    await connection.query(
      `
      INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3);
      `,
      [ name, email, cryptedPassword ]
    );

    res.sendStatus(201);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const userData = await isValidLogin(email, password);

    if(!userData) return res.sendStatus(401);

    const expirationTime = { expiresIn: 60 * 60 * 2 };
    const token = jwt.sign({userId: userData[0].id}, process.env.PRIVATE_KEY_JWT, expirationTime);

    res.status(200).send({ token });
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
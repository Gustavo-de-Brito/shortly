import connection from '../databases/postgres.js';
import bcrypt from 'bcrypt';

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
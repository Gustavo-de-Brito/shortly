import connection from '../databases/postgres.js';
import bcrypt from 'bcrypt';

export async function setNewUser(req, res) {
  const { name, email, password} = req.body;

  try {
    res.sendStatus(201);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
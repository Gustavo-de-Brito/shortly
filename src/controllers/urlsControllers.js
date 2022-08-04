import connection from '../databases/postgres.js';

export async function shortUrl(req, res) {
  try {
    res.sendStatus(201);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
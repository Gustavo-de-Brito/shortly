import connection from '../databases/postgres.js';
import { nanoid } from 'nanoid';

export async function decreaseUrl(req, res) {
  const { sessionId } = res.locals;
  const { url } = req.body;

  try {
    const shortUrl = nanoid();

    const { rows:userSession } = await connection.query(
      `SELECT * FROM sessions WHERE id = $1`,
      [ sessionId ]
    );

    await connection.query(
      `INSERT INTO urls
      ( url, "shortUrl", "userId")
      VALUES ( $1, $2, $3 )`,
      [ url, shortUrl, userSession[0].userId ]
    );

    res.status(201).send({ shortUrl });
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
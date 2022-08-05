import connection from '../databases/postgres.js';
import { nanoid } from 'nanoid';

export async function decreaseUrl(req, res) {
  const { userId } = res.locals;
  const { url } = req.body;

  try {
    const shortUrl = nanoid();

    const { rows:userData } = await connection.query(
      `SELECT * FROM users WHERE id = $1;`,
      [ userId ]
    );

    await connection.query(
      `INSERT INTO urls
      ( url, "shortUrl", "userId")
      VALUES ( $1, $2, $3 );`,
      [ url, shortUrl, userId ]
    );

    res.status(201).send({ shortUrl });
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const { id: urlId } = req.params;

  try {

    const { rows: urlData } = await connection.query(
      `SELECT id, "shortUrl", url
      FROM urls
      WHERE id = $1;`,
      [ urlId]
    );

    if(!urlData[0]) return res.sendStatus(404);

    res.status(200).send(urlData[0]);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
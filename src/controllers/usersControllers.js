import connection from '../databases/postgres.js';

const sumVisits = (total, userUrlData) => {
  // acess and sum visitCount from object returned from query
  return total.dataUrl.visitCount + userUrlData.dataUrl.visitCount
}


export async function getUserData(req, res) {
  const { userId } = res.locals;

  try {
    const { rows: userData } = await connection.query(
      `SELECT 
      json_build_object(
        'id', users.id,
        'name', users.name
      ) AS "userData",
      json_build_object(
        'id', urls.id,
        'shortUrl', urls."shortUrl",
        'url', urls.url,
        'visitCount', urls."visitCount"
      ) AS "dataUrl"
      FROM users
      JOIN urls
      ON urls."userId" = users.id
      WHERE users.id = $1
      GROUP BY users.id, urls.id;`,
      [ userId ]
    );

    const formatedData = {
      ...userData[0].userData,
      visitCount: userData.reduce(sumVisits),
      shortenedUrls: userData.map(userUrlData => userUrlData.dataUrl)
    };

    res.status(200).send(formatedData);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
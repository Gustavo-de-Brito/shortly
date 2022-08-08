import connection from '../databases/postgres.js';

// routes process and validations functions
const sumVisits = (userData) => {
  // acess and sum visitCount from object returned from query
  let qtdVisits = 0;

  userData.forEach(userUrlData => qtdVisits += userUrlData.dataUrl.visitCount);

  return qtdVisits;
}

function formatUserData(userData) {
  let visitCount = 0;
  let shortenedUrls = [];
  const theresRegisteredUrl = userData[0].dataUrl.visitCount;

  if(theresRegisteredUrl) {
    visitCount =sumVisits(userData);
    shortenedUrls =userData.map(userUrlData => userUrlData.dataUrl);
  }

  const formatedData = {
    ...userData[0].userData,
    visitCount,
    shortenedUrls 
  };

  return formatedData;
}

function formatAndOrderRanking(topTenData) {
  const rankData = topTenData.map(userData => {
    if(userData.visitCount === null) {
      return { ...userData, visitCount: "0" };
  }
    return userData;
  });

  const rankingOrdened = [...rankData].sort((a, b) => {
    return b.visitCount - a.visitCount;
  });

  return rankingOrdened;
}

// routes functions
export async function getUserData(req, res) {
  const { userId } = res.locals;

  try {
    const { rows: queryUserData } = await connection.query(
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
      LEFT JOIN urls
      ON urls."userId" = users.id
      WHERE users.id = $1
      GROUP BY users.id, urls.id;`,
      [ userId ]
    );

    const userData = formatUserData(queryUserData);

    res.status(200).send(userData);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const { rows: topTenData } = await connection.query(
      `
      SELECT users.id, users.name, 
      COUNT(urls.id) AS "linksCount",
      SUM(urls."visitCount") AS "visitCount"
      FROM users
      LEFT JOIN urls
      ON urls."userId" = users.id
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10;
      `
    );

    const rankData = formatAndOrderRanking(topTenData);

    res.status(200).send(rankData);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
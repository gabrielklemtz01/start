import database from "infra/database.js";

export default async function status(req, res) {
  const updatedAt = new Date().toISOString(); // Data no formato ISO 8601

  const versionPost = await database.query("SHOW server_version;");
  const versionPostValue = versionPost.rows[0].server_version;

  const userMax = await database.query("SHOW max_connections;");
  const userMaxValue = userMax.rows[0].max_connections;

  const userUp = await database.query(
    "SELECT count(*) FROM pg_stat_activity WHERE datname = 'staging';"
  );

  const userUpValue = userUp.rows[0].count;

  console.log(userUpValue);

  res.status(200).json({
    updated_At: updatedAt,
    dependecies: {
      database: {
        user_Up: parseInt(userUpValue),
        user_Max: parseInt(userMaxValue),
        version: versionPostValue,
      },
    },
  });
}

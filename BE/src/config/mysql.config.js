module.exports = function (user) {
  switch (user) {
    case "dev":
      return {
        user: process.env.RDS_MYSQL_USER,
        password: process.env.RDS_MYSQL_PASSWORD,
        database: "bob_hub",
        host: process.env.RDS_MYSQL_HOST,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      };
    case "production":
      return {
        user: process.env.RDS_MYSQL_USER,
        password: process.env.RDS_MYSQL_PASSWORD,
        database: "bob_hub",
        host: process.env.RDS_MYSQL_HOST,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      };
    default:
      return {
        user: "root",
        password: process.env.LOCAL_MYSQL_PASSWORD,
        database: "bob_hub",
        host: "127.0.0.1",
        port: 6000,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      };
  }
};

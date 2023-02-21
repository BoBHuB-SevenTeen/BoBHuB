const mysql = require("mysql2/promise");
const path = require("path");
const { logger } = require("../utils");

const env = process.env.NODE_ENV || "local";
const config = require(path.resolve(__dirname, "../config/mysql.config.js"))(env);

const pool = mysql.createPool(config);

pool
  .getConnection()
  .then(() => logger.info("정상적으로 db 접속에 성공하였습니다."))
  .catch((err) => {
    logger.info("db 접속에 실패하였습니다.");
    logger.error(err);
  });

module.exports = { pool };

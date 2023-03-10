const { pool } = require("../index");
const o = new (require("../../utils/build-query"))("comment");
const { buildRes, logger } = require("../../utils");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class CommentModel {
  async create(commentDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(commentDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      logger.info(query);

      const [result] = await pool.query(query);
      return buildRes("c", result);
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async getAll() {
    try {
      const query = o.makeSelectQuery({});
      logger.info(query);
      const [comments] = await pool.query(query);
      return comments;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async getByShopId(shopId) {
    try {
      const query = `select * from comment join (SELECT userId
        , nickname, profile
     FROM user ) u on u.userId = comment.userId  where shopId = ?`;

      logger.info(query);

      const [comments] = await pool.query(query, [shopId]);
      return comments;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async getByCommentId(commentId) {
    try {
      const whereArr = o.objToQueryArray({ commentId });
      const query = o.makeSelectQuery({ whereArr });
      logger.info(query);

      const [comment] = await pool.query(query);
      return comment;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async getByUserId(userId) {
    try {
      const whereArr = o.objToQueryArray({ userId });
      const query = o.makeSelectQuery({ whereArr });
      logger.info(query);

      const [comment] = await pool.query(query);
      return comment;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async update(newCommentDTO, commentDTO) {
    try {
      const newDTO = o.objToQueryArray(newCommentDTO);
      const oldDTO = o.objToQueryArray(commentDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);

      logger.info(query);
      const [result] = await pool.query(query);
      return buildRes("u", result);
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async deleteById(commentId) {
    try {
      const whereArr = o.objToQueryArray({ commentId });
      const query = o.makeDeleteQuery(whereArr);
      logger.info(query);

      const [result] = await pool.query(query);
      return buildRes("d", result);
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }
}

const commentModel = new CommentModel();

module.exports = { commentModel };

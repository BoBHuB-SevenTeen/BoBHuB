const { pool } = require("../mysql-pool");
const o = new (require("../../util/build-query"))("elice");

class EliceModel {
  async create(eliceDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(eliceDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);

      const [result] = await pool.query(query, console.log(query));
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      const query = o.makeSelectQuery();
      console.log(query);

      const [elices] = await pool.query(query);
      return elices;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newEliceDTO, eliceDTO) {
    try {
      const newDTO = o.objToQueryArray(newEliceDTO);
      const oldDTO = o.objToQueryArray(eliceDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      console.log(query);
      const [updatedElice] = await pool.query(query);
      return updatedElice;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(elice) {
    try {
      const whereArr = o.objToQueryArray({ elice });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const [deletedElice] = await pool.query(query);
      return deletedElice;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const eliceModel = new EliceModel();

module.exports = { eliceModel };

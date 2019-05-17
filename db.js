/**
* Класс обертка для PG RefCursor
*/

const Pg = require("pg");
const config = require("./config");

Pg.defaults.poolSize = config.db.poolSize;
const postgresPool = new Pg.Pool(config.db);

class PgHelper {

  static async instance() {
    const instance = new PgHelper();
    instance.connection = await postgresPool.connect();
    return instance;
  }

  constructor() {
    this.connection = null;
    this.pool = postgresPool;
  }

  query(sql,params) {
    return this.connection.query(sql,params);
  }

  async queryCursor(sql,params) {

    const portalRes = await this.connection.query(sql,params);
    const cursorName = Object.keys(portalRes.rows[0])[0];
    const portalName = portalRes.rows[0][cursorName];
    const cursorRes = await this.query(`FETCH ALL IN "${portalName}"`);

    return cursorRes.rows;
  }

  static async queryAlone(sql,params) {
    let instance;
    try {
      instance = await PgHelper.instance();
      const rows = await instance.query(sql,params);
      await instance.close();
      return rows;
    } catch(e) {
      if (instance.connection) {
        await instance.close();
      }
      throw e;
    }
  }

  static async queryCursorAlone(sql,params) {
    let instance;
    try {
      instance = await this.instance();
      await instance.begin();
      const rows = await instance.queryCursor(sql,params);
      //await instance.end()
      await instance.close(true);
      return rows;
    } catch(e) {
      if (instance && instance.connection) {
        //await instance.end()
        await instance.close(true);
      }
      throw e;
    }
  }

  begin() {
    this.connection.query("BEGIN");
    return this;
    //return this.connection.query("BEGIN");
  }

  end() {
    return this.connection.query("END");
  }

  commit() {
    return this.connection.query("COMMIT");
  }

  rollback() {
    return this.connection.query("ROLLBACK");
  }

  async close(end) {
    if (this.connection) {
      if (end) {
        await this.end();
      }
      return this.connection.release();
    }
    return null;
  }

}

module.exports = PgHelper;

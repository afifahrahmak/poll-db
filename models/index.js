"use strict";

const Softdrink = require("./SoftDrink");
const pool = require("../config/connection");

class Model {
  static getSoftDrink(keyword, cb) {
    let querySQL
    if (!keyword) {
      querySQL = `SELECT s.*, c.name as company FROM "Softdrinks" s 
          JOIN "Companies" c ON c.id = s."CompanyId" ORDER BY s.id;`;
    } else {
      querySQL = `SELECT s.*, c.name as company FROM "Softdrinks" s 
          JOIN "Companies" c ON c.id = s."CompanyId"
          WHERE c.name ILIKE '%${keyword}%'
          ORDER BY s.id;`;
    }
    pool.query(querySQL, (err, result) => {
      console.log(err)
      if (err) {
        cb(err, null);
      } else {
        let instances = result.rows.map(
          (e) =>
            new Softdrink(e.id, e.variant, e.name, e.genre, e.price, e.CompanyId, e.company, e.createdAt),
        );
        cb(null, instances);
      }
    });
  }

  static getCompany(cb) {
    pool.query(`SELECT * FROM "Companies"`, (err, res) => {
      if (err) {
        cb(err);
      } else {
        const instanceCompany = res.rows;
        cb(null, instanceCompany);
      }
    });
  }

  static createSoftDrink(variant, name, price, CompanyId, cb) {
    let errors = Model.validation(variant, name, price, CompanyId)

    if (errors.length) {
      cb(errors)
    } else {
      let queryInsert = `INSERT INTO "Softdrinks" (variant, name, price, "CompanyId")
          VALUES ('${variant}','${name}',${price},${CompanyId});`;
      pool.query(queryInsert, (err, res) => {
        if (err) {
          cb(err);
        } else {
          cb(null);
        }
      });
    }

  }

  static validation(variant, name, price, CompanyId) {
    let errors = []

    if (!variant) errors.push('variant tidak boleh kosong')
    if (!name) errors.push('name tidak boleh kosong')
    if (!price) errors.push('price tidak boleh kosong')
    if (!CompanyId) errors.push('company harus di pilih')

    return errors
  }


  static getById(id, cb) {
    let query = `SELECT s.*, c.name AS company FROM "Softdrinks" s
    JOIN "Companies" c ON c.id = s."CompanyId"
    WHERE s.id = ${id}`
    pool.query(query, (err, res) => {
      if (err) cb(err)
      else {
        let data = res.rows[0]
        let softdrink = new Softdrink(data.id, data.variant, data.name, data.genre, data.price, data.CompanyId, data.company, data.createdAt)
        cb(null, softdrink)
      }
    })
  }

  static update(id, data, cb) {
    let query = `UPDATE "Softdrinks" SET 
    variant='${data.variant}', 
    name='${data.name}',
    genre='${data.genre}', 
    price=${data.price},
    "CompanyId"=${data.CompanyId}
    WHERE id = ${id}`

    pool.query(query, (err, res) => {
      console.log(err)
      if (err) cb(err)
      else cb(null)
    })
  }
}

module.exports = Model;

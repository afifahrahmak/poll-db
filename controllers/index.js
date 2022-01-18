"use strict";

const Model = require("../models");

class Controller {
  static getHome(req, res) {
    res.render('home')
  }

  static readAll(req, res) {
    console.log(req.query.search, '======')
    Model.getSoftDrink(req.query.search, (err, softdrinks) => {
      if (err) {
        res.send(err);
      } else {
        res.render("list", { softdrinks });
      }
    });
  }

  static addGet(req, res) {
    Model.getCompany((err, companies) => {
      if (err) {
        res.send(err);
      } else {
        res.render("add", { companies, errors: req.query.error });
      }
    });
  }

  static addPost(req, res) {
    console.log(req.body)
    const { variant, name, price, CompanyId } = req.body;
    Model.createSoftDrink(variant, name, price, +CompanyId, (err) => {
      if (err) {
        res.redirect(`/softdrinks/add?error=${err}`);
      } else {
        res.redirect("/softdrinks");
      }
    });
  }

  static editGet(req, res) {
    Model.getCompany((err, companies) => {
      if (err) {
        res.send(err);
      } else {
        Model.getById(+req.params.id, (err, softdrink) => {
          if (err) res.send(err)
          else res.render('edit', { companies, data: softdrink })
        })
      }
    })
  }

  static editPost(req, res) {
    console.log(req.params.id, req.body)
    let { variant, name, CompanyId, price, genre } = req.body
    Model.update(+req.params.id, { variant, name, CompanyId, price, genre }, (err) => {
      if (err) res.send(err)
      else res.redirect('/softdrinks')
    })
  }
}

module.exports = Controller;

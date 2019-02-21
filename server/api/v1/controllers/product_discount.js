"use strict"
const ProductDiscount = require("../models").product_discount

module.exports = {
  create(req, res) {
    return ProductDiscount.create({
      product_id: req.body.product_id,
      discount_id: req.body.discount_id
    })
      .then(productDiscount => res.status(201).json(productDiscount))
      .catch(error => res.status(400).send(error))
  },

  findByDiscountId(req, res) {
    const filter = req.query.filter
    const query =
      filter === "active"
        ? "select pd.id,c.name as `category`, s.name as `sub_category`, true as `assigned`, p.code,p.name from product_discount pd inner join product p on p.id = pd.product_id inner join category c on c.id = p.category_id inner join sub_category s on s.id = p.sub_category_id where p.status_id = 1 and pd.discount_id = " +
          req.params.id
        : "select p.id,c.name as `category`, s.name as `sub_category`, false as `assigned`, p.code,p.name from product p inner join category c on c.id = p.category_id inner join sub_category s on s.id = p.sub_category_id where p.status_id = 1 and p.id not in (select product_id from product_discount where discount_id = " +
          req.params.id +
          ")"

    const mysql = require("mysql2")

    const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "escng_totem",
      password: "M1a4$1t4E8r0",
      database: "escng_totem"
    })

    con.connect(function(err) {
      con.query(query, (err, result, fields) => {
        res.json(result)
      })
    })
  },

  delete(req, res) {
    return ProductDiscount.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(productDiscount =>
        productDiscount.destroy().then(result => {
          res.status(204).json(result)
        })
      )
      .catch(error => res.status(400).send(error))
  }
}

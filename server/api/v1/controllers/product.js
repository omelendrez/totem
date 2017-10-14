"use strict";
const Product = require("../models").product;
const sequelize = require("sequelize");
module.exports = {
  create(req, res) {
    let last_id = 0;
    Product.max("id").then(max => {
      last_id = max;
      if (isNaN(last_id)) {
        last_id = 0;
      }
      last_id = ("0".repeat(3) + (Number(last_id.toString()) + 1).toString()).slice(-3);
      const cat = ("0".repeat(2) + (Number(req.body.category_id)).toString()).slice(-2);
      const sub_cat = ("0".repeat(2) + (Number(req.body.sub_category_id)).toString()).slice(-2);
      const code = cat + '-' + sub_cat + '-' + last_id;
      return Product
        .create({
          code: code,
          name: req.body.name,
          description: req.body.description,
          category_id: req.body.category_id,
          sub_category_id: req.body.sub_category_id,
          status_id: req.body.status_id,
          price: req.body.price
        })
        .then(product => res.status(201).send(product))
        .catch(error => res.status(400).send(error));
    });
  },

  findAll(req, res) {
    const Category = require("../models").category;
    const SubCategory = require("../models").sub_category;
    const Status = require("../models").status;

    Product.belongsTo(Category);
    Product.belongsTo(SubCategory);
    Product.belongsTo(Status);

    return Product
      .findAll({
        include: [{
          model: Category,
          where: {
            id: sequelize.col('product.category_id')
          }
        }, {
          model: SubCategory,
          where: {
            id: sequelize.col('product.sub_category_id')
          }
        }, {
          model: Status,
          where: {
            id: sequelize.col('product.status_id')
          }
        }],
        attributes: [
          'id',
          'code',
          'name',
          'description',
          'price'
        ]
      })
      .then(products => res.json(products))
      .catch(error => res.status(400).send(error));
  },

  findById(req, res) {
    const Category = require("../models").category;
    const SubCategory = require("../models").sub_category;
    const Status = require("../models").status;

    Product.belongsTo(Category);
    Product.belongsTo(Status);
    Product.belongsTo(SubCategory);

    return Product
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: Category,
          where: {
            id: sequelize.col('product.category_id')
          }
        }, {
          model: SubCategory,
          where: {
            id: sequelize.col('product.sub_category_id')
          }
        }, {
          model: Status,
          where: {
            id: sequelize.col('product.status_id')
          }
        }],
        attributes: [
          'id',
          'code',
          'name',
          'description',
          'price',
          'category_id',
          'sub_category_id',
          'status_id', [sequelize.fn('date_format', sequelize.col('product.created_at'), '%d-%b-%y %H:%i'), 'created_at'],
          [sequelize.fn('date_format', sequelize.col('product.updated_at'), '%d-%b-%y %H:%i'), 'updated_at']
        ]
      })
      .then(product => product ? res.json(product) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  findByCategory(req, res) {
    return Product
      .findOne({
        where: {
          category_id: req.params.id
        }
      })
      .then(product => product ? res.json(product) : res.status(404).json({
        "error": "Not found"
      }))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Product
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(product => product.destroy()
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Product
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(product => product.update({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        sub_category_id: req.body.sub_category_id,
        status_id: req.body.status_id,
        price: req.body.price
      })
        .then(result => {
          res.json(result);
        }))
      .catch(error => res.status(400).send(error));
  },

  upload(req, res) {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    const imageFile = req.files.imageFile;
    imageFile.mv('/somewhere/on/your/server/filename.jpg', (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201);
    });
  }
};
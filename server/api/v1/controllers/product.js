'use strict'
const Product = require('../models').product
const Config = require('./config')
const sequelize = require('sequelize')
const Op = sequelize.Op

const update = val => {
  return Config.update(val)
}

module.exports = {
  create(req, res) {
    let last_id = 0
    Product.max('id').then(max => {
      last_id = max
      if (isNaN(last_id)) {
        last_id = 0
      }
      last_id = (
        '0'.repeat(3) + (Number(last_id.toString()) + 1).toString()
      ).slice(-3)
      const cat = (
        '0'.repeat(2) + Number(req.body.category_id).toString()
      ).slice(-2)
      const code = cat + '-' + last_id

      return Product.create({
        code: code,
        name: req.body.name,
        description: req.body.description,
        kitchen_text: req.body.kitchen_text,
        ticket_text: req.body.ticket_text,
        category_id: req.body.category_id,
        image: req.body.image,
        status_id: req.body.status_id,
        price: req.body.price
      })
        .then(product => {
          update().catch(err => console.log(err))
          res.status(201).json(product)
        })
        .catch(error => res.status(400).send(error))
    })
  },

  findAll(req, res) {
    const Category = require('../models').category
    const Status = require('../models').status

    Product.belongsTo(Category)
    Product.belongsTo(Status)

    const page = parseInt(req.query.page ? req.query.page : 0)
    const size = parseInt(req.query.size ? req.query.size : 1000)
    const sort = req.query.sort ? req.query.sort : 'name'
    const type = req.query.type ? req.query.type : 'asc'
    const filter = req.query.filter ? req.query.filter : ''
    const status = req.query.status ? [req.query.status] : [1, 2]

    const ord = [[sort, type]]

    return Product.findAndCountAll({
      where: {
        name: {
          $like: '%' + filter + '%'
        },
        status_id: {
          [Op.in]: status
        }
      },
      order: ord,
      offset: size !== 1000 ? (page - 1) * size : 0,
      limit: size,
      include: [
        {
          model: Category,
          where: {
            id: sequelize.col('product.category_id'),
            status_id: {
              [Op.in]: status
            }
          }
        },
        {
          model: Status,
          where: {
            id: sequelize.col('product.status_id')
          }
        }
      ],
      attributes: [
        'id',
        'code',
        'name',
        'description',
        'kitchen_text',
        'ticket_text',
        'image',
        'price',
        'category_id'
      ]
    })
      .then(products => {
        res.status(200).json(products)
      })
      .catch(error => res.status(400).send(error))
  },

  totemFindAll(req, res) {
    const Category = require('../models').category
    Product.belongsTo(Category)
    return Product.findAndCountAll({
      where: { status_id: 1 },
      include: [
        {
          model: Category,
          where: {
            id: sequelize.col('product.category_id'),
            status_id: 1
          }
        }
      ],
      attributes: [
        'id',
        'name',
        'description',
        'kitchen_text',
        'ticket_text',
        'image',
        'price',
        'category_id'
      ]
    })
      .then(products => {
        res.status(200).json(products)
      })
      .catch(error => res.status(400).send(error))
  },

  findById(req, res) {
    const Category = require('../models').category
    const Status = require('../models').status

    Product.belongsTo(Category)
    Product.belongsTo(Status)

    return Product.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Category,
          where: {
            id: sequelize.col('product.category_id')
          }
        },
        {
          model: Status,
          where: {
            id: sequelize.col('product.status_id')
          }
        }
      ],
      attributes: [
        'id',
        'code',
        'name',
        'description',
        'kitchen_text',
        'ticket_text',
        'price',
        'image',
        'category_id',
        'status_id',
        [
          sequelize.fn(
            'date_format',
            sequelize.col('product.created_at'),
            '%d-%b-%y %H:%i'
          ),
          'created_at'
        ],
        [
          sequelize.fn(
            'date_format',
            sequelize.col('product.updated_at'),
            '%d-%b-%y %H:%i'
          ),
          'updated_at'
        ]
      ]
    })
      .then(product =>
        product
          ? res.status(200).json(product)
          : res.status(404).json({
              error: 'Not found'
            })
      )
      .catch(error => res.status(400).send(error))
  },

  findByCategory(req, res) {
    return Product.findOne({
      where: {
        category_id: req.params.id
      }
    })
      .then(product =>
        product
          ? res.status(200).json(product)
          : res.status(404).json({
              error: 'Not found'
            })
      )
      .catch(error => res.status(400).send(error))
  },

  delete(req, res) {
    return Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(product =>
        product.destroy().then(result => {
          update()
          res.status(204).json(result)
        })
      )
      .catch(error => res.status(400).send(error))
  },

  update(req, res) {
    return Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(product =>
        product
          .update({
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            kitchen_text: req.body.kitchen_text,
            ticket_text: req.body.ticket_text,
            category_id: req.body.category_id,
            image: req.body.image,
            status_id: req.body.status_id,
            price: req.body.price
          })
          .then(result => {
            update()
            res.json(result)
          })
      )
      .catch(error => res.status(400).send(error))
  },

  upload(req, res) {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.')
    }
    const imageFile = req.files.imageFile
    imageFile.mv('/somewhere/on/your/server/filename.jpg', err => {
      if (err) {
        return res.status(500).send(err)
      }
      res.status(201)
    })
  }
}

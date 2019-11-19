'use strict'
const Product = require('../models').product
const Config = require('./config')
const sequelize = require('sequelize')
const Joi = require('joi')
const Op = sequelize.Op

const schema = {
  id: Joi.number(),
  code: Joi.string(),
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  kitchen_text: Joi.any().optional(),
  ticket_text: Joi.string().required(),
  category_id: Joi.number().required(),
  image: Joi.any().optional(),
  is_combo: Joi.number(),
  has_alcohol: Joi.number(),
  status_id: Joi.number(),
  price: Joi.number().required(),
  small_price: Joi.number(),
  medium_price: Joi.number(),
  big_price: Joi.number(),
  flavor_1: Joi.any().optional(),
  flavor_2: Joi.any().optional(),
  flavor_3: Joi.any().optional(),
  flavor_4: Joi.any().optional(),
  created_at: Joi.string(),
  updated_at: Joi.string(),
  category: Joi.object(),
  status: Joi.object()
}

const validateProduct = product => Joi.validate(product, schema)

const update = val => {
  return Config.update(val)
}

module.exports = {
  create(req, res) {
    const { error } = validateProduct(req.body)
    if (error) return res.status(400).send(error.details)
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

      const {
        name,
        description,
        kitchen_text,
        ticket_text,
        category_id,
        price,
        small_price,
        medium_price,
        big_price,
        flavor_1,
        flavor_2,
        flavor_3,
        flavor_4,
        is_combo,
        has_alcohol,
      } = req.body

      return Product.create({
        code,
        name,
        description,
        kitchen_text,
        ticket_text,
        category_id,
        price,
        small_price,
        medium_price,
        big_price,
        flavor_1,
        flavor_2,
        flavor_3,
        flavor_4,
        is_combo,
        has_alcohol
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
          [Op.like]: '%' + filter + '%'
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
        'small_price',
        'medium_price',
        'big_price',
        'flavor_1',
        'flavor_2',
        'flavor_3',
        'flavor_4',
        'category_id',
        'is_combo',
        'has_alcohol'
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
      where: {
        status_id: {
          [Op.eq]: 1
        },
        image: {
          [Op.ne]: ''
        }
      },
      order: [['category_id', 'asc'], ['price', 'desc']],
      include: [
        {
          model: Category,
          where: {
            id: sequelize.col('product.category_id'),
            status_id: 1
          },
          attributes: [
            'id',
            'name',
            'image'
          ]
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
        'small_price',
        'medium_price',
        'big_price',
        'flavor_1',
        'flavor_2',
        'flavor_3',
        'flavor_4',
        'category_id',
        'is_combo',
        'has_alcohol'
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
        'small_price',
        'medium_price',
        'big_price',
        'flavor_1',
        'flavor_2',
        'flavor_3',
        'flavor_4',
        'image',
        'category_id',
        'status_id',
        'is_combo',
        'has_alcohol',
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
    const { error } = validateProduct(req.body)
    if (error) return res.status(400).send(error.details)
    const {
      code,
      name,
      description,
      kitchen_text,
      ticket_text,
      category_id,
      image,
      status_id,
      price,
      small_price,
      medium_price,
      big_price,
      flavor_1,
      flavor_2,
      flavor_3,
      flavor_4,
      is_combo,
      has_alcohol

    } = req.body
    return Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(product =>
        product
          .update({
            code,
            name,
            description,
            kitchen_text,
            ticket_text,
            category_id,
            image,
            status_id,
            price,
            small_price,
            medium_price,
            big_price,
            flavor_1,
            flavor_2,
            flavor_3,
            flavor_4,
            is_combo,
            has_alcohol
          })
          .then(result => {
            update()
            res.status(200).json(result)
          })
      )
      .catch(error => res.status(400).send(error))
  },
  updateImage(req, res) {
    const { fileName } = req.body
    return Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(product =>
        product
          .update({
            image: fileName
          })
          .then(product => {
            res.status(200).json(product)
          })
      )
      .catch(error => res.status(400).send(error))
  }
}

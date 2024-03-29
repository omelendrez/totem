'use strict'
const User = require('../models').user
const sequelize = require('sequelize')
const Op = sequelize.Op
const bcrypt = require('bcrypt')

module.exports = {
  create(req, res) {
    return User.create({
      user_name: req.body.user_name,
      password: req.body.password,
      full_name: req.body.full_name
    })
      .then(user => res.status(201).json(user))
      .catch(error => res.status(400).send(error))
  },

  findAll(req, res) {
    const Status = require('../models').status
    User.belongsTo(Status)

    const page = parseInt(req.query.page ? req.query.page : 0)
    const size = parseInt(req.query.size ? req.query.size : 1000)
    const sort = req.query.sort ? req.query.sort : 'full_name'
    const type = req.query.type ? req.query.type : 'asc'
    const filter = req.query.filter ? req.query.filter : ''

    return User.findAndCountAll({
      where: {
        full_name: {
          [Op.like]: '%' + filter + '%'
        }
      },
      order: [[sort, type]],
      offset: size !== 1000 ? (page - 1) * size : 0,
      limit: size,
      include: [
        {
          model: Status,
          where: {
            id: sequelize.col('user.status_id')
          }
        }
      ],
      attributes: ['id', 'user_name', 'full_name']
    })
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json(error))
  },

  findById(req, res) {
    const Status = require('../models').status
    User.belongsTo(Status)

    return User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Status,
          where: {
            id: sequelize.col('user.status_id')
          }
        }
      ],
      attributes: [
        'id',
        'user_name',
        'full_name',
        'status_id',
        [
          sequelize.fn(
            'date_format',
            sequelize.col('user.created_at'),
            '%d-%b-%y %H:%i'
          ),
          'created_at'
        ],
        [
          sequelize.fn(
            'date_format',
            sequelize.col('user.updated_at'),
            '%d-%b-%y %H:%i'
          ),
          'updated_at'
        ]
      ]
    })
      .then(user =>
        user ? res.status(200).json(user) : res.status(404).json({ error: 'Not found' })
      )
      .catch(error => res.status(400).send(error))
  },

  login(req, res) {
    return User.findOne({
      where: {
        user_name: req.body.user_name,
        status_id: 1
      }
    })
      .then(user => {
        bcrypt.compare(req.body.password, user.password).then(ok => {
          if (ok) {
            res.status(200).json(user)
          } else {
            res.status(401).json({ error: 'Unauthorized' })
          }
        })
      })
      .catch(error => res.status(400).send(error))
  },

  delete(req, res) {
    return User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(user =>
        user.destroy().then(result => {
          res.status(200).json(result)
        })
      )
      .catch(error => res.status(400).send(error))
  },

  update(req, res) {
    const { user_name, full_name, status_id } = req.body
    return User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(user =>
        user
          .update({
            user_name: user_name,
            full_name: full_name,
            status_id: status_id
          })
          .then(result => {
            res.status(200).json(result)
          })
      )
      .catch(error => res.status(400).send(error))
  }
}

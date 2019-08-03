'use strict'
const Totem = require('../models').totem

module.exports = {
  create(req, res) {
    const { name } = req.body
    return Totem.create({
      name
    })
      .then(totem => res.status(201).json(totem))
      .catch(error => res.status(400).send(error))
  },
  findById(req, res) {
    return Totem.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(totem => {
        res.status(200).json(totem)
      })
      .catch(error => res.status(400).send(error))
  },
  findAll(req, res) {
    return Totem.findAndCountAll({
      order: [['name', 'asc']],
      attributes: ['id', 'name', 'status_id']
    })
      .then(totem => {
        res.status(200).json(totem)
      })
      .catch(error => res.status(400).send(error))
  },
  changeStatus(req, res) {
    return Totem.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(totem => {
        const status_id = totem.status_id === 0 ? 1 : 0
        totem
          .update({
            status_id
          })
          .then(result => res.status(200).json(result))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },
  activate(req, res) {
    return Totem.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(totem => {
        totem
          .update({
            status_id: 1
          })
          .then(result => res.status(200).json(result))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },
  deActivate(req, res) {
    return Totem.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(totem => {
        totem
          .update({
            status_id: 0
          })
          .then(result => res.status(200).json(result))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }
}

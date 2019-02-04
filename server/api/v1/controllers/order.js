'use strict'
const Order = require('../models').order
const OrderItems = require('../models').order_items
const sequelize = require('sequelize')
const Op = sequelize.Op

/**
 * status_id
 * 0 - Created - Payment pending
 * 1 - Paid - Kitchen and Counter to prepare
 * 2 - Food ready - Kitchen finished / Counter to finalize
 * 3 - Ready for collection
 * 4 - Collected
 */

module.exports = {
  create(req, res) {
    var order_number = ('0'.repeat(5) + (1).toString()).slice(-5)
    const items = req.body.basket
    const data = []
    let total_order = 0

    Order.max('order_number')
      .then(max => {
        order_number = ('0'.repeat(5) + (Number(max) + 1).toString()).slice(-5)
        Order.create({
          order_number
        })
          .then(order => {
            const orderId = order.id
            order_number = order.order_number
            items.map(item => {
              data.push({
                order_id: orderId,
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.totalPrice,
                discount: 0,
                net_price: item.totalPrice
              })
              total_order = total_order + parseFloat(item.totalPrice)
            })
            OrderItems.bulkCreate(data).then(items => {
              Order.findOne({ where: { id: orderId } }).then(order => {
                order
                  .update({
                    total_price: total_order,
                    net_price: total_order
                  })
                  .then(() => {
                    res.json(201, {
                      order_number,
                      total_order,
                      items
                    })
                  })
              })
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log('err', err))
  },

  findAll(req, res) {
    OrderItems.belongsTo(Order)
    Order.hasMany(OrderItems)
    Order.findAll({
      include: [
        {
          model: OrderItems,
          where: {
            order_id: sequelize.col('order.id')
          },
          attributes: ['product_name', 'quantity', 'unit_price', 'total_price']
        }
      ],
      attributes: ['order_number', 'total_price', 'status_id']
    })
      .then(orders => res.json(200, orders))
      .catch(error => res.status(400).send(error))
  },

  findOrders(req, res) {
    Order.findAll({
      where: {
        status_id: 0
      },
      order: [['id', 'asc']],
      attributes: ['order_number', 'total_price']
    })
      .then(orders => res.json(200, orders))
      .catch(error => res.status(400).send(error))
  },

  findOrderTurns(req, res) {
    Order.findAll({
      where: {
        status_id: {
          [Op.or]: [1, 2, 3]
        }
      },
      order: [['updated_at', 'desc']],
      attributes: ['order_number', 'status_id', 'updated_at']
    })
      .then(orders => res.json(200, orders))
      .catch(error => res.status(400).send(error))
  },

  findItems(req, res) {
    OrderItems.belongsTo(Order)
    Order.hasMany(OrderItems)
    OrderItems.findAll({
      order: [['id', 'asc']],
      where: {
        status_id: 0
      },
      include: [
        {
          model: Order,
          where: {
            id: sequelize.col('order_items.order_id'),
            status_id: 1
          },
          attributes: ['order_number']
        }
      ],
      attributes: ['id', 'product_name', 'quantity']
    })
      .then(items => res.json(200, items))
      .catch(error => res.status(400).send(error))
  },

  findOrderItems(req, res) {
    OrderItems.belongsTo(Order)
    Order.hasMany(OrderItems)
    Order.findAll({
      where: {
        status_id: 1
      },
      include: [
        {
          model: OrderItems,
          where: {
            order_id: sequelize.col('order.id')
          },
          attributes: [
            'product_name',
            'quantity',
            'unit_price',
            'total_price',
            'status_id'
          ]
        }
      ],
      attributes: ['order_number', 'total_price', 'status_id']
    })
      .then(orders => res.json(200, orders))
      .catch(error => res.status(400).send(error))
  },

  findById(req, res) {
    return Order.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(order =>
        order
          ? res.json(200, order)
          : res.status(404).json({
              error: 'Not found'
            })
      )
      .catch(error => res.status(400).send(error))
  },

  findByNumber(req, res) {
    return Order.findAll({
      where: {
        order_number: req.params.id
      }
    })
      .then(order =>
        order
          ? res.json(200, order)
          : res.status(404).json({
              error: 'Not found'
            })
      )
      .catch(error => res.status(400).send(error))
  },

  updateOrderStatus(req, res) {
    return Order.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(order => {
        if (req.body.payment_method) {
          order
            .update({
              status_id: req.body.status_id,
              payment_method: req.body.payment_method
            })
            .then(result => {
              res.json(result)
            })
        } else {
          order.update({ status_id: req.body.status_id }).then(result => {
            res.json(result)
          })
        }
      })
      .catch(error => res.status(400).send(error))
  },

  updateItemStatus(req, res) {
    return OrderItems.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(item =>
        item.update({ status_id: req.body.status_id }).then(result => {
          res.json(result)
        })
      )
      .catch(error => res.status(400).send(error))
  },

  delete(req, res) {
    return Order.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(order =>
        order.destroy().then(result => {
          res.json(result)
        })
      )
      .catch(error => res.status(400).send(error))
  }
}

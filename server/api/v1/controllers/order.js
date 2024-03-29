'use strict'
const Order = require('../models').order
const OrderItems = require('../models').order_items
const Totem = require('../models').totem
const CCPayment = require("../models").cc_payment
const sequelize = require('sequelize')
const Op = sequelize.Op
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
const seq = new sequelize(
  config.database,
  config.username,
  config.password,
  config
);
/**
 * status_id
 * 0 - Created - Payment pending
 * 1 - Paid - Kitchen and Counter to prepare (if kitchen_text)
 * 2 - Food ready for collection
 */

module.exports = {
  create(req, res) {
    var order_number = ('0'.repeat(5) + (1).toString()).slice(-5)
    const { items, paymentMethod, statusId, totemId } = req.body.order
    const data = []
    let total_order = 0

    Order.max('order_number')
      .then(max => {
        order_number = ('0'.repeat(5) + (Number(max) + 1).toString()).slice(-5)
        Order.create({
          order_number,
          payment_method: paymentMethod,
          status_id: statusId,
          totem_id: totemId
        })
          .then(order => {
            const orderId = order.id
            items.map(item => {
              data.push({
                order_id: orderId,
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.totalPrice,
                kitchen_text: item.kitchen_text,
                ticket_text: item.ticket_text,
                discount: 0,
                net_price: item.totalPrice
              })
              total_order = total_order + parseFloat(item.totalPrice)
            })
            OrderItems.bulkCreate(data).then(() => {
              Order.findOne({ where: { id: orderId } }).then(order => {
                order
                  .update({
                    total_price: total_order,
                    net_price: total_order
                  })
                  .then(order => {
                    res.status(201).json(order)
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
      .then(orders => res.status(200).json(orders))
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
      .then(orders => res.status(200).json(orders))
      .catch(error => res.status(400).send(error))
  },

  listAll(req, res) {
    const page = parseInt(req.query.page ? req.query.page : 0)
    const size = parseInt(req.query.size ? req.query.size : 1000)
    const sort = req.query.sort ? req.query.sort : 'order_number'
    const type = req.query.type ? req.query.type : 'asc'
    const filter = req.query.filter ? req.query.filter : ''
    Order.belongsTo(Totem)
    Totem.hasMany(Order)

    Order.findAndCountAll({
      where: {
        order_number: {
          [Op.like]: '%' + filter + '%'
        }
      },
      order: [[sort, type]],
      offset: size !== 1000 ? (page - 1) * size : 0,
      limit: size,
      include: [
        {
          model: Totem,
          where: {
            id: sequelize.col('order.totem_id')
          },
          attributes: ['name']
        }
      ],
      attributes: ['order_number', 'total_price', 'payment_method', 'status_id', [
        sequelize.fn(
          'date_format',
          sequelize.col('order.created_at'),
          '%d-%b-%y %H:%i'
        ),
        'created_at'
      ]]
    })
      .then(orders => res.status(200).json(orders))
      .catch(error => res.status(400).send(error))
  },

  findOrderTurns(req, res) {
    Order.findAll({
      where: {
        status_id: {
          [Op.or]: [1, 2, 3]
        },
        stock_printed: 0
      },
      order: [['updated_at', 'desc']],
      attributes: ['order_number', 'status_id', 'updated_at'],
      limit: 24
    })
      .then(orders => res.status(200).json(orders))
      .catch(error => res.status(400).send(error))
  },

  findItems(req, res) {
    OrderItems.belongsTo(Order)
    Order.hasMany(OrderItems)
    OrderItems.findAll({
      order: [['id', 'asc']],
      where: {
        status_id: 0,
        kitchen_text: {
          [Op.ne]: ''
        }
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
      attributes: ['id', 'product_name', 'kitchen_text', 'quantity']
    })
      .then(items => res.status(200).json(items))
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
            'ticket_text',
            'status_id'
          ]
        }
      ],
      attributes: ['order_number', 'total_price', 'status_id']
    })
      .then(orders => res.status(200).json(orders))
      .catch(error => res.status(400).send(error))
  },

  findById(req, res) {
    OrderItems.belongsTo(Order)
    Order.hasMany(OrderItems)
    Order.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: OrderItems,
          where: {
            order_id: sequelize.col('order.id')
          },
          attributes: ['quantity', 'unit_price', 'total_price', 'ticket_text']
        }
      ],
      attributes: [
        'id',
        'order_number',
        'total_price',
        [
          sequelize.fn(
            'date_format',
            sequelize.col('order.created_at'),
            '%d-%b-%Y'
          ),
          'date'
        ],
        [
          sequelize.fn(
            'date_format',
            sequelize.col('order.created_at'),
            '%H:%i:%s'
          ),
          'time'
        ],
        'status_id',
        'payment_method',
        'order_printed'
      ]
    })
      .then(order => res.status(200).json(order))
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
          ? res.status(200).json(order)
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
        const statusId = order.status_id === 0 ? 1 : 2
        order.update({ status_id: statusId }).then(result => {
          res.status(200).json(result)
        })
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
          res.status(200).json(result)
        })
      )
      .catch(error => res.status(400).send(error))
  },

  setOrderPrinted(req, res) {
    return Order.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(order =>
        order.update({ order_printed: 1 }).then(result => {
          res.status(200).json(result)
        })
      )
      .catch(error => res.status(400).send(error))
  },

  delete(req, res) {
    return Order.findOne({
      where: {
        id: req.params.id,
        status_id: {
          [Op.not]: 2
        }
      }
    })
      .then(order =>
        order.destroy().then(result => {
          res.status(200).json(result)
        })
      )
      .catch(error => res.status(400).send(error))
  },

  destroyOrders(req, res) {
    const options = { truncate: true }
    const result = {}
    OrderItems.destroy(options)
      .then(orderItems => {
        result['OrderItems'] = orderItems
        Order.destroy(options)
          .then(orders => {
            result['Orders'] = orders
            CCPayment.destroy(options)
              .then(() => res.status(200).json(result))
          })
      })
  },

  getStockToPrint(req, res) {
    const queryList = `SELECT product, SUM(qty) as qty
    from(

      SELECT oi1.ticket_text as product, count(1) as qty
      FROM escng_totem.order_items as oi1
      WHERE oi1.id not in (select id from escng_totem.order_items as oi3 where LOCATE('C/',oi1.ticket_text) >0)
        AND oi1.order_id in (SELECT id from escng_totem.order where stock_printed = 0 and status_id = 2)
      GROUP BY ticket_text

    union all

      SELECT SUBSTRING(SUBSTRING(oi2.ticket_text, LOCATE('C/',oi2.ticket_text)),3) as product, count(1) as qty
      FROM escng_totem.order_items as oi2
      WHERE oi2.id in (select id from escng_totem.order_items as oi4 where LOCATE('C/',ticket_text) >0)
      AND oi2.order_id in (SELECT id from escng_totem.order where stock_printed = 0 and status_id = 2)
      GROUP BY SUBSTRING(SUBSTRING(oi2.ticket_text, LOCATE('C/',oi2.ticket_text)),3)

    union all

      SELECT LEFT(oi3.ticket_text, LOCATE('C/',oi3.ticket_text)-2) as product, count(1) as qty
      FROM escng_totem.order_items as oi3
      WHERE oi3.id in (select id from escng_totem.order_items as oi5 where LOCATE('C/',ticket_text) >0)
      AND oi3.order_id in (SELECT id from escng_totem.order where stock_printed = 0 and status_id = 2)
      GROUP BY LEFT(oi3.ticket_text, LOCATE('C/',oi3.ticket_text)-2)

    ) t
    GROUP BY product
    ORDER BY product;
    `
    seq.query(queryList)
      .then(stock => res.status(200).json(stock[0]))
  },

  setStockPrinted(req, res) {
    Order.update({ stock_printed: 1 }, {
      where: {
        stock_printed: 0,
        status_id: 2
      },
      order: [['id', 'desc']]
    })
      .then(updated => res.status(200).json(updated))
  }
}

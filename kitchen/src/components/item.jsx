import React from 'react'

const Item = ({ item, selectedItem }) => (
  <div
    action="true"
    className={`item ${
      item.id === selectedItem.id ? 'active' : ''
      }`}
  >
    {item.kitchen_text} <br />
    <span className="order-number">Orden # {item.order.order_number.substr(2, 3)}</span>
  </div>
)

export default Item

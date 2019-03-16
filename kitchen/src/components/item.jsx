import React from 'react'

const Item = ({ item, selectedItem }) => (
  <li
    action="true"
    className={`list-group-item item ${
      item.id === selectedItem.id ? 'active' : ''
    }`}
  >
    {item.kitchen_text}
  </li>
)

export default Item

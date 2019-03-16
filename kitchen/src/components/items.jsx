import React from 'react'
import Item from './item'
const Items = ({ items, selectedItem }) => {
  return (
    <ul className="list-group items">
      {items.map(item => (
        <Item key={item.id} item={item} selectedItem={selectedItem} />
      ))}
    </ul>
  )
}

export default Items

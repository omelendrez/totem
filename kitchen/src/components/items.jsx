import React from 'react'
import Item from './item'
const Items = ({ items, selectedItem }) => {
  return (
    <div className="items">
      {items.map(item => (
        <Item key={item.id} item={item} selectedItem={selectedItem} />
      ))}
    </div>
  )
}

export default Items

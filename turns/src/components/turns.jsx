import React from 'react'
import Turn from './turn'
const Turns = ({ title, turns, icon }) => {
  return (
    <React.Fragment>
      <div className="sub-title">{title}</div>
      {turns.map(turn => (
        <Turn key={turn.order_number} turn={turn.order_number} icon={icon} />
      ))}
    </React.Fragment>
  )
}

export default Turns

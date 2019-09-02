import React from 'react'
import Turn from './turn'
const Turns = ({ title, turns, icon }) => {
  return (
    <React.Fragment>
      <div className="sub-title">{title}</div>
      <div className="turns">
        {turns.map(turn => (
          <Turn key={turn.order_number} turn={turn.order_number} icon={icon} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default Turns

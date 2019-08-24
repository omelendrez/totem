import React from 'react'

const Turn = ({ turn, icon }) => (
  <div className="turn">
    <span className="order-number">
      {turn.substring(turn.length - 3, turn.length)}
    </span>
    <span className="icon">{icon}</span>
  </div>
)

export default Turn

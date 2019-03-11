import React from 'react'

const Turn = ({ turn, icon }) => (
  <div>
    <div className="order-number">
      {turn.substring(turn.length - 3, turn.length)}
    </div>
    <div className="icon">{icon}</div>
  </div>
)

export default Turn

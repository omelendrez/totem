import React, { Component } from 'react'
import Turn from './turn'
class Turns extends Component {
  render() {
    const { title, turns, icon } = this.props
    return (
      <React.Fragment>
        <h1>
          <span className="badge view-title">{title}</span>
        </h1>
        <div>
          {turns.map(turn => (
            <Turn key={turn.order_number} turn={turn.order_number} icon={icon} />
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default Turns

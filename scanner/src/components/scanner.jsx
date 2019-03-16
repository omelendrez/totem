import React, { Component } from 'react'
import {
  changeOrderStatus,
  loadOrderData,
  printOrder,
  setOrderPrinted,
  printerError
} from '../services'

class Scanner extends Component {
  constructor(props) {
    super(props)
    this.state = { orderId: '' }
  }

  componentDidMount() {
    this.orderId.focus()
  }
  handleChange = event => {
    this.setState({ orderId: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.processOrder()
    this.setState({ orderId: '' })
    this.orderId.focus()
  }

  processOrder = async () => {
    let order = await changeOrderStatus(this.state.orderId)
    let resp = await loadOrderData(order.id)
    order = resp.data[0]
    if (order.status_id === 1) {
      order.printerId = 2 // Command printer
      printOrder(order)
        .then(resp => {
          order = resp.data.order
          setOrderPrinted(order.id).then(order => console.log(order))
        })
        .catch(err => printerError(err.response))
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="col-sm-12">
          <span className="badge view-title">{this.props.title}</span>
        </h1>
        <form onSubmit={this.handleSubmit} className="scanner-form  col-sm-4">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.orderId}
            ref={input => {
              this.orderId = input
            }}
          />
        </form>
      </React.Fragment>
    )
  }
}

export default Scanner

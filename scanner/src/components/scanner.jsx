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
    document.addEventListener('mousemove', () => this.orderId.focus(), false)
    document.addEventListener('mousedown', () => this.orderId.focus(), false)
    document.addEventListener('click', () => this.orderId.focus(), false)
    document.addEventListener('keypress', () => this.orderId.focus(), false)
    document.addEventListener('touchmove', () => this.orderId.focus(), false)
  }

  handleChange = event => {
    const { value } = event.target
    if (!value.match(/^\d+$/)) return
    this.setState({ orderId: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (!this.state.orderId) return
    this.processOrder()
    this.setState({ orderId: '' })
    this.orderId.focus()
  }

  processOrder = async () => {
    let order = await changeOrderStatus(this.state.orderId)
    let resp = await loadOrderData(order.id)
    order = resp.data
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
            autoFocus
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

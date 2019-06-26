import React, { Component } from 'react'
import { backendServer, refreshInterval } from './config'
import { loadKitchenItems, changeKitchenItemStatus } from './services'
import Items from './components/items'
import './App.css'

class App extends Component {
  state = {
    items: [],
    selectedItem: {
      id: 0
    },
    index: 0
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.loadData(), refreshInterval)
    this.loadData()
    document.addEventListener('keydown', this.handleKeys)
  }

  loadData = async () => {
    let resp = await loadKitchenItems()
    const items = resp.data
    const selectedItem =
      this.state.selectedItem.id === 0 && items.length
        ? items[0]
        : this.state.selectedItem
    this.setState({
      items,
      selectedItem
    })
  }

  handleKeys = event => {
    let index = this.state.index
    switch (event.key) {
      case 'ArrowDown':
        if (index < this.state.items.length - 1) {
          index++
        }
        break
      case 'ArrowUp':
        if (index > 0) {
          index--
        }
        break
      case 'Enter':
        clearInterval(this.intervalId)
        const data = { itemId: this.state.selectedItem.id, statusId: 1 }
        changeKitchenItemStatus(data).then(() => {
          this.setState({ selectedItem: { id: 0 }, index: 0 })
          this.intervalId = setInterval(() => this.loadData(), refreshInterval)
          this.loadData()
        })
        break
      default:
        console.log(event.key)
    }
    this.setState({
      selectedItem: this.state.items[index]
        ? this.state.items[index]
        : { id: 0 },
      index
    })
  }

  render() {
    const logo = `${backendServer}/logo.png`
    const { items, selectedItem } = this.state
    return (
      <div className="App row">
        <div className="col-sm-12 header">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <h1 className="col-sm-12">
          <span className="badge view-title">Cocina</span>
        </h1>
        <div className="col-sm-12">
          <Items
            items={items}
            onKeyUp={this.handleKeyUp}
            selectedItem={selectedItem}
          />
        </div>
      </div>
    )
  }
}

export default App

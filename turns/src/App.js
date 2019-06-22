import React, { Component } from 'react'
import Turns from './components/turns'
import { backendServer } from './config'
import { loadTurns } from './services'
import { icons, ordersToShowCount, timeRefresh } from './utils'
import './App.css'

class App extends Component {
  state = {
    turns: []
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.loadData(), timeRefresh)
    this.loadData()
  }

  loadData = async () => {
    let resp = await loadTurns()
    this.setState({
      turns: resp.data
    })
  }

  render() {
    const { turns } = this.state
    const inProgress = turns.filter(item => item.status_id === 1).slice(0, ordersToShowCount)
    const completed = turns.filter(item => item.status_id === 2).slice(0, ordersToShowCount)
    const logo = `${backendServer}/logo.png`
    return (
      <div className="App row">
        <div className="col-sm-12 header">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="col-sm-6">
          <Turns title="En Preparación" turns={inProgress} icon={icons.wait} />
        </div>

        <div className="col-sm-6">
          <Turns title="Para retirar" turns={completed} icon={icons.done} />
        </div>
      </div>
    )
  }
}

export default App

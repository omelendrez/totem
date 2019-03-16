import React, { Component } from 'react'
import Turns from './components/turns'
import { backendServer } from './config'
import { loadTurns } from './services'
import { icons } from './utils'
import './App.css'

class App extends Component {
  state = {
    turns: []
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.loadData(), 5000)
    this.loadData()
  }

  loadData = async () => {
    let resp = await loadTurns()
    this.setState({
      turns: resp.data
    })
  }

  render() {
    const inProgress = this.state.turns.filter(item => item.status_id === 1)
    const completed = this.state.turns.filter(item => item.status_id === 2)
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

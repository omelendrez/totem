import React, { Component } from 'react'
import Scanner from './components/scanner'
import { backendServer } from './config'
import './App.css'

class App extends Component {
  render() {
    const logo = `${backendServer}/logo.png`
    return (
      <div className="App">
        <div className="col-sm-12 header">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="row justify-content-md-center">
          <Scanner title="Scanner" />
        </div>
      </div>
    )
  }
}

export default App

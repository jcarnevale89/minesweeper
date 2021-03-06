import React, { Component } from 'react'
import 'normalize.css'
import './App.css'
import Grid from './components/Grid'

class App extends Component {

  constructor() {
    super()

    /*
    Minesweeper Defaults
    Beginner: 9x9 - 9 Mines
    Intermediate: 16x16 - 40 Mines
    Beginner: 16x30 - 99 Mines
    */

    this.state = {
      tileSize: 25,
      columns: 9,
      rows: 9,
      mines: 9,
    }
  }

  componentDidMount(){
    const gridWidth = this.state.tileSize * this.state.columns
    const tileSize = gridWidth / this.state.columns
    this.setState({ gridWidth, tileSize })
  }

  render() {
    const css = {
      width: `${this.state.gridWidth}px`
    }

    return (
      <div className="gridContainer" style={css}>
        <Grid
          columns={this.state.columns}
          rows={this.state.rows}
          mines={this.state.mines}
          tileSize={this.state.tileSize}
        />
      </div>
    )
  }
}

export default App

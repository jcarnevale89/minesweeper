import React, { Component } from 'react'
import Tile from './Tile'

class Grid extends Component {

  constructor(props) {
    super(props)

    this.generateGrid = this.generateGrid.bind(this)
    this.generateMines = this.generateMines.bind(this)
    this.getMineCount = this.getMineCount.bind(this)
    this.show = this.show.bind(this)
    this.showAll = this.showAll.bind(this)
    this.getCoords = this.getCoords.bind(this)

    this.state = {
      columns: 10,
      rows: 10,
      mines: 10,
      tiles: [],
      tileKeys: [],
      gameOver: false,
    }

    this.defaultState = this.state
  }

  componentDidMount(){
    this.generateGrid()
  }

  generateGrid() {
    this.setState(this.defaultState)

    const tiles = []

    for (var y = 1; y <= this.state.rows; y++) {
      for (var x = 1; x <= this.state.columns; x++) {
        tiles.push({
          coords: {
            x: x,
            y: y,
          },
          tileID: `${x}x${y}`,
          mineCount: 0,
          covered: true,
          surroundingTiles: [],
        })
      }
    }

    const tileKeys = tiles.map(tile => tile.tileID)

    this.setState({ tiles, tileKeys }, () => {
      console.log('Grid Generated!')
      this.generateMines()
    })

  }

  generateMines() {
    const tiles = [...this.state.tiles]
    const mines = []

    while(mines.length < this.state.mines){
      var randomnumber = Math.ceil(Math.random()*(this.state.columns*this.state.rows)) - 1
      if(mines.indexOf(randomnumber) > -1) continue;
      mines[mines.length] = randomnumber;
    }

    mines.forEach((mine) => {
      tiles[mine].mineCount = -1
    })

    this.setState({ tiles }, () => {
      console.log('Mines Generated!')
      this.getMineCount()
    })
  }

  getMineCount() {
    const tiles = [...this.state.tiles]

    tiles.forEach((tile, i) => {
      let mineCount = -1
      const surroundingTiles = []

      if (tile.mineCount !== -1) {
        mineCount = 0
        const coords = this.getCoords(i)

        for (var y = coords.yMin; y <= coords.yMax; y++) {
          for (var x = coords.xMin; x <= coords.xMax; x++) {
            if (!(coords.x === x && coords.y === y)) {
              const index = this.state.tileKeys.indexOf(`${x}x${y}`)
              surroundingTiles.push(index)
              if (tiles[index].mineCount === -1) {
                mineCount++
              }
            }
          }
        }
      }

      tile.mineCount = mineCount
      tile.surroundingTiles = surroundingTiles
    })

     this.setState({ tiles }, () => {
      console.log('Mines Count Completed!')
    })
  }

  getCoords(tileKey) {

    const x = this.state.tiles[tileKey].coords.x
    const y = this.state.tiles[tileKey].coords.y
    const xMin = (x > 1) ? x - 1 : x
    const xMax = (x < this.state.columns) ? x + 1 : x
    const yMin = (y > 1) ? y - 1 : y
    const yMax = (y < this.state.rows) ? y + 1 : y

    return {
      x,
      y,
      xMin,
      xMax,
      yMin,
      yMax,
    }
  }

  show(tileID) {
    const tiles = [...this.state.tiles]

    tiles[tileID].covered = false

    if (tiles[tileID].mineCount < 0) {
      this.setState({ gameOver: true })
    }

    this.setState({ tiles })
  }

  showAll() {
    const tiles = [...this.state.tiles]
    tiles.map(tile => tile.covered = false)
    this.setState({ tiles })
  }

  render() {

    return (
      <div className="gridWrapper">
        {
          (this.state.gameOver)
          ?
          <div className="gameOver">
            you ded
            <br/>
            <button onClick={this.generateGrid}>New Game</button>
          </div>
          :
          ''
        }
        <div className="grid">
          {
            this.state.tiles.map((tile, i) => {
              return (
                <Tile
                  key={tile.tileID}
                  details={tile}
                  tileID={i}
                  show={this.show}
                  columns={this.state.columns}
                />
              )
            })
          }
        </div>
        <br/>
        <button onClick={this.generateGrid}>Generate New Grid</button>
        <button onClick={this.showAll}>Show All Bombs</button>
      </div>
    )
  }
}

export default Grid

import React, { Component } from 'react'
import Tile from './Tile'

class Grid extends Component {

  constructor(props) {
    super(props)

    this.generateGrid = this.generateGrid.bind(this)
    this.showTile = this.showTile.bind(this)
    this.showAll = this.showAll.bind(this)
    this.getMineCount = this.getMineCount.bind(this)

    this.state = {
      columns: 10,
      rows: 10,
      mines: 10,
      tiles: [],
    }
  }

  componentDidMount(){
    this.generateGrid()
  }

  generateGrid() {

    const tiles = []
    const mines = []

    for (var y = 1; y <= this.state.rows; y++) {
      for (var x = 1; x <= this.state.columns; x++) {
        tiles.push({
          cords: {
            x: x,
            y: y,
          },
          tileID: `${x}x${y}`,
          mine: false,
          mineCount: 0,
          covered: true,
        })
      }
    }

    while(mines.length < this.state.mines){
      var randomnumber = Math.ceil(Math.random()*(this.state.columns*this.state.rows)) - 1
      if(mines.indexOf(randomnumber) > -1) continue;
      mines[mines.length] = randomnumber;
    }

    mines.forEach(mine => {
      tiles[mine].mine = true
    })

    const tileKeys = tiles.map(tile => tile.tileID)

    tiles.map(tile => tile.mineCount = this.getMineCount(tile, tiles, tileKeys))

    this.setState({ tiles })

  }

  getMineCount(tile, tiles, tileKeys) {

    const x = tile.cords.x
    const y = tile.cords.y
    const xMin = (x > 1) ? x - 1 : x
    const xMax = (x < this.state.columns) ? x + 1 : x
    const yMin = (y > 1) ? y - 1 : y
    const yMax = (y < this.state.rows) ? y + 1 : y

    let mineCount = 0

    for (var yCounter = yMin; yCounter <= yMax; yCounter++) {
      for (var xCounter = xMin; xCounter <= xMax; xCounter++) {
        if (!(x === xCounter && y === yCounter)) {
          const index = tileKeys.indexOf(`${xCounter}x${yCounter}`)
          if (tiles[index].mine) {
            mineCount++
          }
        }
      }
    }

    return mineCount
  }

  showTile(tileID) {
    const tiles = [...this.state.tiles]
    tiles[tileID].covered = false
    this.setState({ tiles })
  }

  showAll() {
    const tiles = [...this.state.tiles]
    tiles.map(tile => tile.covered = false)
    this.setState({ tiles })
  }

  render() {

    return (
      <div>
        <div className="grid">
          {
            this.state.tiles.map((tile, i) => {
              return (
                <Tile
                  key={tile.tileID}
                  details={tile}
                  tileID={i}
                  showTile={this.showTile}
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

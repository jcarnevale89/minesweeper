import React, { Component } from 'react'
import Tile from './Tile'

class Grid extends Component {

  constructor(props) {
    super(props)

    this.generateGrid = this.generateGrid.bind(this)
    this.showTile = this.showTile.bind(this)
    this.getMineCount = this.getMineCount.bind(this)

    this.state = {
      columns: 10,
      rows: 10,
      mines: 10,
      tiles: {},
    }
  }

  componentDidMount(){
    this.generateGrid()
  }

  generateGrid() {

    const tiles = Object.assign({}, this.state.tiles)
    const mines = []

    for (var y = 1; y <= this.state.rows; y++) {
      for (var x = 1; x <= this.state.columns; x++) {
        tiles[`${x}x${y}`] = {
          cords: {
            x: x,
            y: y,
          },
          mine: false,
          mineCount: 0,
          // covered: false,
          covered: true,
        }
      }
    }

    while(mines.length < this.state.mines){
      var randomnumber = Math.ceil(Math.random()*(this.state.columns*this.state.rows)) - 1
      if(mines.indexOf(randomnumber) > -1) continue;
      mines[mines.length] = randomnumber;
    }

    const keys = Object.keys(tiles)
    mines
    .forEach(mine => {
      tiles[keys[mine]].mine = true
    })

    Object.entries(tiles).map(tile => tiles[tile[0]].mineCount = this.getMineCount(tile, tiles))

    this.setState({ tiles })

  }

  getMineCount(tile, tiles) {

    const x = tile[1].cords.x
    const y = tile[1].cords.y
    const xMin = (x > 1) ? x - 1 : x
    const xMax = (x < this.state.columns) ? x + 1 : x
    const yMin = (y > 1) ? y - 1 : y
    const yMax = (y < this.state.rows) ? y + 1 : y

    let mineCount = 0

    for (var yCounter = yMin; yCounter <= yMax; yCounter++) {
      for (var xCounter = xMin; xCounter <= xMax; xCounter++) {
        if (!(x === xCounter && y === yCounter)) {
          if (tiles[`${xCounter}x${yCounter}`].mine) {
            mineCount++
          }
        }
      }
    }

    return mineCount
  }

  showTile(tileID) {
    const tiles = Object.assign({}, this.state.tiles)
    tiles[tileID].covered = false
    this.setState({ tiles })
  }

  render() {

    const tiles = Object.entries(this.state.tiles)

    return (
      <div>
        <div className="grid">
          {
            tiles.map((tile) => {
              return (
                <Tile
                  key={tile[0]}
                  details={tile[1]}
                  tileID={tile[0]}
                  showTile={this.showTile}
                  columns={this.state.columns}
                />
              )
            })
          }
        </div>
        <button onClick={this.generateGrid}>Generate New Grid</button>
      </div>
    )
  }
}

export default Grid

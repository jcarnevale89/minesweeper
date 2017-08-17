import React, { Component } from 'react'
import Tile from './Tile'

class Grid extends Component {

  constructor(props) {
    super(props)

    this.generateGrid = this.generateGrid.bind(this)
    this.show = this.show.bind(this)
    this.flag = this.flag.bind(this)
    this.showAll = this.showAll.bind(this)

    this.state = {
      tiles: [],
      flagCount: 0,
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

    for (var y = 1; y <= this.props.rows; y++) {
      for (var x = 1; x <= this.props.columns; x++) {
        tiles.push({
          coords: {
            x: x,
            y: y,
          },
          tileID: `${x}x${y}`,
          mineCount: 0,
          covered: true,
          flagged: false,
          surroundingTiles: [],
        })
      }
    }

    this.setState({ tiles }, () => {
      console.log('Grid Generated!')
      this.generateMines()
    })

  }

  generateMines() {
    const tiles = [...this.state.tiles]
    const mines = []

    while(mines.length < this.props.mines){
      var randomnumber = Math.ceil(Math.random()*(this.props.columns*this.props.rows)) - 1
      if(mines.indexOf(randomnumber) > -1) continue;
      mines[mines.length] = randomnumber;
    }

    mines.forEach((mine) => {
      tiles[mine].mineCount = -1
    })

    this.setState({ tiles }, () => {
      console.log('Mines Generated!')
      this.generateMineCount()
    })
  }

  generateMineCount() {
    const tiles = [...this.state.tiles]
    const tileKeys = tiles.map(tile => tile.tileID)

    tiles.forEach((tile, i) => {
      let mineCount = -1
      const surroundingTiles = []

      if (tile.mineCount !== -1) {
        mineCount = 0
        const coords = this.getCoordinates(i)

        for (var y = coords.yMin; y <= coords.yMax; y++) {
          for (var x = coords.xMin; x <= coords.xMax; x++) {
            if (!(coords.x === x && coords.y === y)) {
              const index = tileKeys.indexOf(`${x}x${y}`)
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

  getCoordinates(tileKey) {

    const x = this.state.tiles[tileKey].coords.x
    const y = this.state.tiles[tileKey].coords.y
    const xMin = (x > 1) ? x - 1 : x
    const xMax = (x < this.props.columns) ? x + 1 : x
    const yMin = (y > 1) ? y - 1 : y
    const yMax = (y < this.props.rows) ? y + 1 : y

    return {
      x,
      y,
      xMin,
      xMax,
      yMin,
      yMax,
    }
  }

  clear(tileID) {
    this.state.tiles[tileID].surroundingTiles.forEach((tileID) => {
      const tile = this.state.tiles[tileID]
      if (tile.covered) {
        this.show(tileID)
      }
    })
  }

  flag(tileID) {
    if (!this.state.tiles[tileID].covered) return
    const tiles = [...this.state.tiles]

    tiles[tileID].flagged = !tiles[tileID].flagged

    const flagCount = tiles.filter((tile) => {
      return tile.flagged
    }).length

    this.setState({ tiles, flagCount })
  }

  show(tileID) {
    if (this.state.tiles[tileID].flagged) return

    const tiles = [...this.state.tiles]
    tiles[tileID].covered = false

    if (tiles[tileID].mineCount < 0) {
      tiles.filter((tile) => {
        return tile.mineCount === -1
      })
      .forEach((tile) => {
        tile.covered = false
      })

      this.setState({ gameOver: true })
    }

    if (tiles[tileID].mineCount === 0) {
      this.clear(tileID)
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
      <div>
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
                    columns={this.props.columns}
                    details={tile}
                    tileID={i}
                    tileSize={this.props.tileSize}
                    show={this.show}
                    flag={this.flag}
                  />
                )
              })
            }
          </div>
        </div>
        <button onClick={this.generateGrid}>Generate New Grid</button>
        <button onClick={this.showAll}>Show All Bombs</button>
      </div>
    )
  }
}

export default Grid

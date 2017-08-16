import React from 'react'

const Tile = (props) => {

  const css = {
    // backgroundColor: props.details.mine ? '#CC0000' : '#999999',
    width: `${100/props.columns}%`,
  }

  const tileCover = (props.details.covered) ? 'tileCover' : 'tileCover shown'
  const mine = (props.details.mine) ? 'innerTile mine' : 'innerTile'

  return (
    <div className="tile" style={css} onClick={() => props.showTile(props.tileID)}>
      <div className={tileCover}></div>
      <div className={mine}>
        {/*`${props.details.cords.x}x${props.details.cords.y}`*/}
        {props.details.mineCount}
      </div>
    </div>
  )
}

export default Tile

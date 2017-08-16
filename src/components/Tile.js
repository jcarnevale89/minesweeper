import React from 'react'

const Tile = (props) => {

  const css = {
    width: `${100/props.columns}%`,
  }

  const tileCover = (props.details.covered) ? 'tileCover' : 'tileCover shown'
  const mine = (props.details.mine) ? 'innerTile mine' : 'innerTile'

  return (
    <div className="tile" style={css} onClick={() => props.showTile(props.tileID)}>
      <div className={tileCover}></div>
      <div className={mine}>
        {props.details.mineCount}
      </div>
    </div>
  )
}

export default Tile

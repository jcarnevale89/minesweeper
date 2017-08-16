import React from 'react'

const Tile = (props) => {

  const css = {
    width: `${100/props.columns}%`,
  }

  const tileCover = (props.details.covered) ? 'tileCover' : 'tileCover shown'
  const mine = (props.details.mineCount === -1) ? 'innerTile mine' : 'innerTile'

  const show = () => {
    props.show(props.tileID)
  }

  return (
    <div className="tile" style={css} onClick={show}>
      <div className={tileCover}></div>
      <div className={mine}>
        {props.details.mineCount}
      </div>
    </div>
  )
}

export default Tile

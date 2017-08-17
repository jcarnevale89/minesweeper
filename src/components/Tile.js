import React from 'react'

const Tile = (props) => {

  const css = {
    width: `${100/props.columns}%`,
    height: `${props.tileSize}px`,
  }

  const tileCover = ['tileCover']
  const innerTile = ['innerTile']

  if (!props.details.covered) {
    tileCover.push('shown')
  } else if (props.details.flagged) {
    tileCover.push('flagged')
  }

  switch (props.details.mineCount) {
    case -1:
      innerTile.push('mine')
    break

    case 1:
      innerTile.push('color-1')
    break

    case 2:
      innerTile.push('color-2')
    break

    case 3:
      innerTile.push('color-3')
    break

    case 4:
      innerTile.push('color-4')
    break

    case 5:
      innerTile.push('color-5')
    break

    case 6:
      innerTile.push('color-6')
    break

    case 7:
      innerTile.push('color-7')
    break

    case 8:
      innerTile.push('color-8')
    break

    default:
      innerTile.push('color-0')
  }

  if (props.details.mineCount === -1) {

  }

  const show = () => {
    props.show(props.tileID)
  }

  const flag = (e) => {
    e.preventDefault()
    props.flag(props.tileID)
    return false
  }

  return (
    <div className="tile" style={css} onClick={show} onContextMenu={flag}>
      <div className={tileCover.join(' ')}></div>
      <div className={innerTile.join(' ')}>
        {
          props.details.mineCount > 0
          ? props.details.mineCount
          : ''
        }
      </div>
    </div>
  )
}

export default Tile

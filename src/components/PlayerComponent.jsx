import React, { Component } from 'react'
import playerCircle from '../smallPlayerCircle.png'

class PlayerComponent extends Component {
  
  style = (props) => {
    const { x, y } = this.props.playerPosition
    const { playerSize } = this.props
    return {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: playerSize
    }
  }
  
  render() {
    return (
      <img src={playerCircle} alt="Player" style={this.style()} onKeyDown={this.props.handlePlayerMovement} tabIndex="0" />
    )
  }

}

export default PlayerComponent
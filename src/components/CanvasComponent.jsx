import React, { Component } from 'react';
import PlayerComponent from './PlayerComponent'

class CanvasComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      boardSize: props.boardSize
    }
  }

  style = () => {
    return {
      width: `${this.state.boardSize}px`,
      height: `${this.state.boardSize}px`,
      margin: '0 auto',
      border: '5px black solid'
    }
  }

  render() {
    const { playerPosition, playerSize, handlePlayerMovement } = this.props
    return (
      <div className="CanvasComponent" style={this.style()}>
        <PlayerComponent playerPosition={playerPosition} playerSize={playerSize} handlePlayerMovement={handlePlayerMovement} />
      </div>
    )
  }
}

export default CanvasComponent
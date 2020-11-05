import React, { Component } from 'react'
import enemyCircle from '../blackSpike.png'


class EnemyComponent extends Component {
  
  style = () => {
    const { x, y } = this.props.enemy
    const { enemySize } = this.props
    return {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: `${enemySize}px`
    }
  }
  
  render() {
    return (
      <img src={enemyCircle} alt="Enemy" style={this.style()} />
    )
  }

  componentDidUpdate() {
    const { enemySize, playerPosition, enemy } = this.props
    if (playerPosition.x < (enemy.x + enemySize) && 
        playerPosition.y  < (enemy.y + enemySize)  &&
        (playerPosition.x + enemySize) > enemy.x &&
        (playerPosition.y  + enemySize) > enemy.y) {
          this.props.gameOver()
    }
  }

}

export default EnemyComponent
import React, { Component } from 'react'
import enemyCircle from '../circle7038.png'

class EnemyComponent extends Component {
  
  style = () => {
    return {
      position: 'absolute',
      left: `300px`,
      top: `300px`,
      width: '50px'
    }
  }
  
  render() {
    return (
      <img src={enemyCircle} alt="Enemy" style={this.style()} />
    )
  }

}

export default EnemyComponent
import React, { Component } from 'react';
import CanvasComponent from '../components/CanvasComponent'
import GameStats from '../components/GameStats'
import PlayerComponent from '../components/PlayerComponent'
import EnemyComponent from '../components/EnemyComponent'

class GameContainer extends Component {

  constructor(props) {
    super(props)
    const { boardSize, playerSize } = this.props
    this.state = {
      boardSize: boardSize,
      playerSize: playerSize,
      finished: false,
      score: 0,
      timeElapsed: 0,
      onScreenEnemies: 0,
      speed: 8,
      positions: {
        player: {
          x: (boardSize / 2) - (playerSize / 2),
          y: (boardSize / 2) - (playerSize / 2)
        },
        enemies: [],
      }
    }
  }

  randomSide = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  createNewEnemy = () => {
    const { player } = this.state.positions
    const { boardSize, playerSize } = this.state
    let newEnemy;

    this.setState({
      onScreenEnemies: this.state.onScreenEnemies + 1
    })

    switch(this.randomSide(1, 4)) {
      case 1:  // Left
        newEnemy = { key: this.state.onScreenEnemies, x: 0, y: player.y, direction: "Left" }
        break;
      case 2:  // Up
        newEnemy = { key: this.state.onScreenEnemies, x: player.x, y: 0, direction: "Up" }
        break;
      case 3:  // Right
        newEnemy = { key: this.state.onScreenEnemies, x: boardSize - playerSize, y: player.y, direction: "Right" }
        break;
      case 4:  // Down
        newEnemy = { key: this.state.onScreenEnemies, x: player.x, y: boardSize - playerSize, direction: "Down" }
        break;
      default:
        return;
    }

    this.setState({
      positions: {
        ...this.state.positions,
        enemies: [...this.state.positions.enemies].concat(newEnemy)
      }
    })
  }

  updateEnemyPositions = () => {
    const { boardSize, playerSize, speed, positions: {enemies}, positions: {player} } = this.state
    this.setState({
      positions: {
        ...this.state.positions,
        enemies: enemies.filter(enemy => !enemy.remove).map(enemy => {
          if (enemy.y < 0 || enemy.y > boardSize - playerSize || 
            enemy.x < 0 || enemy.x > boardSize - playerSize) {
              enemy.remove = true
              return enemy;
          }

          switch(enemy.direction) {
            case "Left":
              enemy.x += speed;
              break;
            case "Up":
              enemy.y += speed;
              break;
            case "Right":
              enemy.x -= speed;
              break;
            case "Down":
              enemy.y -= speed;
              break;
            default:
              break;
          }

          return enemy
        })
      }
    })
  }

  componentDidMount() {
    this.startGame()
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
    clearInterval(this.enemyInterval)
    clearInterval(this.enemyCreationInterval)
  }

  startGame = () => {
    console.log("Game Started!")
    this.createNewEnemy()
    this.timeInterval = setInterval(this.updateGame, 1000) // starts timer
    this.enemyInterval = setInterval(this.updateEnemyPositions, 50)
    this.enemyCreationInterval = setInterval(this.createNewEnemy, 5000)
  }

  updateGame = () => {  // Had to include state below, why doesn't this work without it?
    this.setState((state) => ({
      timeElapsed: state.timeElapsed + 1,
      score: state.score + 10
    }));
  }

  gameOver = () => {
    console.log("Game Over")
    this.setState({
      positions: {
        ...this.state.positions,
        enemies: []
      }
    })
  }

  handlePlayerMovement = (e) => {
    const { x, y } = this.state.positions.player
    const { boardSize, playerSize } = this.state


    switch (e.key) {
      case "ArrowUp":
        if (y <= 0) {
          return;
        } else {
          this.setState({
            positions: {
              ...this.state.positions,
              player: {
                x,
                y: y - 10
              }
            }
          })
        }
        break;
      case "ArrowDown":
        if (y > boardSize - playerSize) {
          return;
        } else {
          this.setState({
            positions: {
              ...this.state.positions,
              player: {
                x,
                y: y + 10
              }
            }
          })
        }
        break;
      case "ArrowLeft":
        if (x < 0) {
          return;
        } else {
          this.setState({
            positions: {
              ...this.state.positions,
              player: {
                x: x - 10,
                y
              }
            }
          })
        }
        break;
      case "ArrowRight":
        if (x > (boardSize - playerSize)) {
          return;
        } else {
          this.setState({
            positions: {
              ...this.state.positions,
              player: {
                x: x + 10,
                y
              }
            }
          })
        }
        break;
      default:
        return;
    }

  }

  render() {
    const { playerSize, score, boardSize, timeElapsed, positions } = this.state
    return (
      <div className="GameContainer">
        <CanvasComponent boardSize={boardSize}>
          <PlayerComponent playerPosition={positions.player} playerSize={playerSize} handlePlayerMovement={this.handlePlayerMovement} />
          {this.state.positions.enemies.map(enemy =>
            <EnemyComponent 
              key={enemy.key}
              enemy={enemy}
              playerPosition={positions.player}
              enemySize={playerSize}
              gameOver={this.gameOver}
            />
          )}
        </CanvasComponent>
        <GameStats score={score} timeElapsed={timeElapsed} />
      </div>
    )
  }
}

export default GameContainer
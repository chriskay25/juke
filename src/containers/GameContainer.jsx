import React, { Component } from 'react';
import CanvasComponent from '../components/CanvasComponent'
import GameStats from '../components/GameStats'

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
      onScreenEnemies: 1,
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
        newEnemy = { key: this.state.onScreenEnemies, x: 0, y: player.y }
        break;
      case 2:  // Up
        newEnemy = { key: this.state.onScreenEnemies, x: player.x, y: 0 }
        break;
      case 3:  // Right
        newEnemy = { key: this.state.onScreenEnemies, x: boardSize, y: player.y }
        break;
      case 4:  // Down
        newEnemy = { key: this.state.onScreenEnemies, x: player.x, y: boardSize }
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

  componentDidMount() {
    this.startGame()
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  startGame = () => {
    console.log("Game Started!")
    this.timeInterval = setInterval(this.updateGame, 1000) // starts timer
  }

  updateGame = () => {  // Had to include state below, why doesn't this work without it?
    this.setState((state) => ({
      timeElapsed: state.timeElapsed + 1,
      score: state.score + 10
    }));
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
        <CanvasComponent boardSize={boardSize} time={timeElapsed} playerPosition={positions.player} playerSize={playerSize} handlePlayerMovement={this.handlePlayerMovement} />
        <GameStats score={score} timeElapsed={timeElapsed} />
      </div>
    )
  }
}

export default GameContainer
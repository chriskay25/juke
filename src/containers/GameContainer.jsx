import React, { Component } from 'react';
import CanvasComponent from '../components/CanvasComponent'
import GameStats from '../components/GameStats'

class GameContainer extends Component {

  state = {
    boardSize: this.props.boardSize,
    playerSize: this.props.playerSize,
    finished: false,
    score: 0,
    timeElapsed: 0,
    positions: {
      player: {
        x: (this.props.boardSize / 2) - (this.props.playerSize / 2),
        y: (this.props.boardSize / 2) - (this.props.playerSize / 2)
      },
      enemy: {
        x: 0,
        y: 0
      }
    }
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

  updateGame = () => {
    this.setState((state) => ({
      timeElapsed: state.timeElapsed + 1,
      score: state.score + 10
    }));
  }

  handlePlayerMovement = (e) => {
    const { x, y } = this.state.positions.player
    console.log("Horiz Pos: ", x)
    console.log("Vert Pos: ", y)
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
      <div className="GameContainer" >
        <CanvasComponent boardSize={boardSize} time={timeElapsed} playerPosition={positions.player} playerSize={playerSize} handlePlayerMovement={this.handlePlayerMovement} />
        <GameStats score={score} timeElapsed={timeElapsed} />
      </div>
    )
  }
}

export default GameContainer
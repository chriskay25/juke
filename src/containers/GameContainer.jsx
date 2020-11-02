import React, { Component } from 'react';
import CanvasComponent from '../components/CanvasComponent'

class GameContainer extends Component {

  state = {
    boardSize: window.visualViewport.width / 2,
    finished: false,
    score: 0,
    timeElapsed: 0,
    positions: {
      player: {
        x: window.visualViewport.width / 2,
        y: 50
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
      timeElapsed: state.timeElapsed + 1
    }));
  }

  handlePlayerMovement = (e) => {
    const { x, y } = this.state.positions.player
    console.log("Horiz Pos: ", x)
    console.log("Vert Pos: ", y)
    const { boardSize } = this.state.boardSize
    console.log("Board Size: ", boardSize)

    switch (e.key) {
      case "ArrowUp":
        if (y === 0) {
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
        if (y === boardSize) {
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
        if (x === 0) {
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
        if (x === boardSize) {
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
    const { boardSize, timeElapsed, positions } = this.state
    return (
      <div className="GameContainer" >
        <CanvasComponent boardSize={boardSize} time={timeElapsed} playerPosition={positions.player} handlePlayerMovement={this.handlePlayerMovement} />
        <div className="timer" style={{backgroundColor: "black", color: "yellow", width: boardSize, margin: 'auto', fontWeight: 'bold'}}>
          TIMER: {timeElapsed}...
        </div>
      </div>
    )
  }
}

export default GameContainer
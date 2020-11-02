import React from 'react'

const GameStats = ({ score, timeElapsed }) => {
  return (
    <div className="GameStats" style={{backgroundColor: "black", color: "yellow", margin: 'auto', fontWeight: 'bold'}}>
      <div className="Score">Score: {score}</div>
      <div className="Timer">Time: {timeElapsed}</div>
    </div>
  )
}

export default GameStats
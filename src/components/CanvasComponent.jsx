import React, { Component } from 'react';

class CanvasComponent extends Component {

  style = () => {
    return {
      position: 'relative',
      width: `${this.props.boardSize}px`,
      height: `${this.props.boardSize}px`,
      margin: '0 auto',
      border: '5px black solid'
    }
  }

  render() {
    return (
      <div className="CanvasComponent" style={this.style()}>
        {this.props.children}
      </div>
    )
  }
}

export default CanvasComponent
import './App.css';
import GameContainer from './containers/GameContainer';

function App() {
  const boardSize = window.visualViewport.width / 2
  return (
    <div className="App">
      <GameContainer boardSize={boardSize} playerSize={50} />
    </div>
  );
}

export default App;

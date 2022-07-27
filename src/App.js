import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/home'
/* 
import Game from './components/game'
import GameOver from './components/gameover'
*/

function App() {
  return (
    <Router>
      <Home/>
      {/* 
      <Game/>
      <GameOver/>
      */}
    </Router>
  );
}

export default App;

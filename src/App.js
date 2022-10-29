import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home'
import Game from './components/game'
/* 
import GameOver from './components/gameover'
*/

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/play' element={<Game/>} />
        {/* 
        <GameOver/>
        */}
      </Routes>
    </Router>
  );
}

export default App;

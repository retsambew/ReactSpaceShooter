import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home'
import Game from './components/game'
import HelpScreen from './components/help';
import Difficulty from './components/difficulty';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/play' element={<Game />} />
        <Route path='/help' element={<HelpScreen />} />
        <Route path='/difficulty' element={<Difficulty />} />
      </Routes>
    </Router>
  );
}

export default App;

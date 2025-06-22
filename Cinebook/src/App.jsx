// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import AboutPage from'./pages/About'; // you must create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<MoviePage />} />
         <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;

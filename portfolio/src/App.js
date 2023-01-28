import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

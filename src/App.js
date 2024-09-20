import './App.css';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';

import ToDo from './pages/ToDo'

function App() {
  return (
    <div className="app">
      <NavBar />
      <ToDo />
      <Footer />
    </div>
  );
}

export default App;

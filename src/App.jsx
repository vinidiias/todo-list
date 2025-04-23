import { UserProvider } from './Context/UserContext';
import { Routes } from './Router/Routes';

import './App.css';

import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';

function App() {
  console.log('App carregado')
  return (
    <UserProvider>
      <Content />
    </UserProvider>
  );
}

function Content() {
  console.log('Content carregado')
  return (
    <div className="app">
      <NavBar />
      <Routes  /> {/* Certifique-se de que userData esteja definido */}
      <Footer />
    </div>
  );
}

export default App;

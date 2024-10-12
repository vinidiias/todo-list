import { UserProvider, UserContext } from './Context/UserContext';
import { useContext } from 'react';

import { Routes } from './Router/Routes';

import './App.css';

import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';

function App() {
  return (
    <UserProvider>
      <Content />
    </UserProvider>
  );
}

function Content() {
  const [userData] = useContext(UserContext); // Use o contexto corretamente

  return (
    <div className="app">
      <NavBar />
      <Routes isLogged={userData.isLogged} /> {/* Certifique-se de que userData esteja definido */}
      <Footer />
    </div>
  );
}

export default App;

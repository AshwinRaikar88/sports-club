// import './App.css';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/LoginPage.jsx'
import Main from './Pages/Main.jsx'

import RegistrationPage from './Pages/RegistrationPage.jsx'
import MatchHistory from './Pages/MatchHistory.jsx'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/play" element={<Main />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/match_history" element={<MatchHistory />} />
      </Routes>
      {/* <Main />  */}
    </div>
  );
}

export default App;

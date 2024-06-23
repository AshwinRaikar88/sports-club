import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Header from './components/Header/Header.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/LoginPage.jsx';
import Main from './Pages/Main.jsx';
import RegistrationPage from './Pages/RegistrationPage.jsx';
import MatchHistory from './Pages/MatchHistory.jsx';

import './App.css';

function PrivateRoute({ element, ...rest }) {
  const { isLoggedIn } = React.useContext(AuthContext);
  return isLoggedIn ? element : <Navigate to="/" />;
}

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/play" element={<PrivateRoute element={<Main />} />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/match_history" element={<PrivateRoute element={<MatchHistory />} />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

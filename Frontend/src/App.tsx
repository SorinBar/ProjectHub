import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import Auth from './routes/Auth';
import { UserContextProvider } from './context/UserContext';
import Dashboard from './routes/Dashboard';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/auth" replace />} />
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;

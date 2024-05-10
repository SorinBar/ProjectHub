import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import logo from './logo.png';

function App() {
  return (
    <Router>
    <div className="App">

      <div className="header">
        <div className="logo">
        <img src={logo} alt="logo"></img>
        </div>
      </div>

      <div className="main">  	
        <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form>
          <label htmlFor="chk">Sign up</label>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="pswd" placeholder="Password" required />
          <button>Sign up</button>
        </form>
      </div>

      <div className="login">
        <form>
          <label htmlFor="chk">Login</label>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="pswd" placeholder="Password" required />
          <button>Login</button>
        </form>
      </div>
      
      </div>
    </div>

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </Router>
  );
}

export default App;

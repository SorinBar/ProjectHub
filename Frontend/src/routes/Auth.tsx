import { useContext, useState } from 'react';

import logo from '../logo.png';
import '../style/Auth.css'
import axios, { Axios, AxiosError, isAxiosError } from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();
  const { setUserEmail, setUserRole, setUserJwt } = useContext(UserContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('Employee');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleSignUp = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Selected role:', role);

    const data = {
      email: email,
      password: password,
      role: role
    };

    axios.post('http://localhost:8080/api/signup', data)
      .then(response => {
        console.log('Success');
        // TODO sa apara un info de succes
      })
      .catch(error => {
        console.log("User already exists(email)");
        // TODO sa apara un warning
      });
  };

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    const data = {
      email: email,
      password: password,
    };

    axios.post('http://localhost:8080/api/signin', data)
      .then(response => {
        console.log('Success');
        console.log(response.data);
        setUserJwt(response.data.jwtToken);
        setUserEmail(response.data.user.email);
        setUserRole(response.data.user.role);
        // TODO sa intre in meniu
        navigate('/dashboard');
        
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          console.log(error.response?.status);
          if (error.response?.status === 404) {
            console.log("User not found");
            // TODO warning nu avem user
          } else if (error.request.status === 400) {
            console.log("Wrong password");
            // TODO warning
          }
          
        }
      });
  };
    
  return (
    <div className="App">
      <div className="header">
        <div className="logo">
        <img src={logo} alt="logo"></img>
        </div>
      </div>
      <div className="main">  	
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form className='auth-form'>
            <label htmlFor="chk">Sign up</label>
            <input type="email" name="email" placeholder="Email" onChange={handleEmailChange} required />
            <input type="password" name="pswd" placeholder="Password" onChange={handlePasswordChange} required />
            <select id='auth-select' value={role} onChange={handleRoleChange}>
              <option value="Employee">Employee</option>
              <option value="Project Manager">Project Manager</option>
            </select>
            <button className='auth-button' onClick={handleSignUp}>Sign up</button>
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk">Login</label>
            <input type="email" name="email" placeholder="Email" onChange={handleEmailChange} required />
            <input type="password" name="pswd" placeholder="Password" onChange={handlePasswordChange} required />
            <button className='auth-button' onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
  }
  
  export default Auth;
  
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
  const toggleRole = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setRole(prevRole => prevRole === 'Employee' ? 'Project Manager' : 'Employee');
  };

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

    if(data.email === '') {
      console.log("Email is empty");
      alert('Email is empty');
    }
    else if(data.password === '') {
      console.log("Password is empty");
      alert('Password is empty');
    }
    else if(data.role === '') {
      console.log("Role is empty");
      alert('Role is empty');
    }
    else {
      axios.post('http://localhost:8080/api/signup', data)
        .then(response => {
          console.log('Success');
          alert('User created successfully');
        })
        .catch((error: AxiosError) => {
          if(isAxiosError(error)) {
            console.log(error.response?.status);
            if(error.response?.status == 409) {
              console.log("User already exists");
              alert('User already exists');
            }
          }
        });
    }
    setEmail('');
    setPassword('');
    setRole('Employee');

  };

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    const data = {
      email: email,
      password: password,
    };

    if(data.email === '') {
      console.log("Email is empty");
      alert('Email is empty');
    }
    else if(data.password === '') {
      console.log("Password is empty");
      alert('Password is empty');
    }
    else {
      axios.post('http://localhost:8080/api/signin', data)
        .then(response => {
          console.log('Success');
          console.log(response.data);
          setUserJwt(response.data.jwtToken);
          setUserEmail(response.data.user.email);
          setUserRole(response.data.user.role);
          navigate('/dashboard');
          
        })
        .catch((error: AxiosError) => {
          if (isAxiosError(error)) {
            console.log(error.response?.status);
            if (error.response?.status === 404) {
              console.log("User not found");
              alert('User not found');
            } else if (error.response?.status === 400) {
              console.log("Wrong password");
              alert('Wrong password');
            }
            
          }
        });
      }
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
        <button className='auth-button' onClick={handleSignUp}>Sign up</button>
        <div id="app-cover" onClick={toggleRole}>
          <div className="row">
            <div className="toggle-button-cover">
              <div className="button-cover">
                <div className="button r" id="button-1">
                  <input type="checkbox" className="checkbox" checked={role === 'Project Manager'} readOnly />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  
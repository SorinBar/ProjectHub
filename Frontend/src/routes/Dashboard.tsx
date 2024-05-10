import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

// TODO Creare Design Dashboard

function Dashboard() {
    const navigate = useNavigate();
    const { userEmail, userRole, userJwt } = useContext(UserContext);

    return (
        <div>
            <div>{userEmail}</div>
            <div>{userRole}</div>
            <div>{userJwt}</div>
        </div>
    );
}
  
  export default Dashboard;
  
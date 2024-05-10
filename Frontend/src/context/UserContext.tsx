import React, { ReactNode, createContext, useContext, useState } from 'react';

interface UserContextType {
  userEmail: string;
  setUserEmail: (email: string) => void;
  userRole: string;
  setUserRole: (role: string) => void;
  userJwt: string;
  setUserJwt: (jwt: string) => void;
}

export const UserContext = createContext<UserContextType>({
    userEmail: '',
    setUserEmail: (email: string) => {},
    userRole: '',
    setUserRole: (role: string) => {},
    userJwt: '',
    setUserJwt: (jwt: string) => {}
});

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');
    const [userJwt, setUserJwt] = useState<string>('');
  
    return (
      <UserContext.Provider value={{ userEmail, setUserEmail, userRole, setUserRole, userJwt, setUserJwt }}>
        {children}
      </UserContext.Provider>
    );
};


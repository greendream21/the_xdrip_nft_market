import { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '../firebase/services'; 

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (userId) => {
    const user = await getUser(userId);
    setCurrentUser(user);
    setLoading(false);
  };

  const value = {
    currentUser,
    fetchUser,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

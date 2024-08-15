import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../axios';

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  is_admin: boolean | number;
  email: string;
}

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isUserFetched, setIsUserFetched] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      const response = await api.get('v1/me');
      setUser(response.data as IUser);
      setIsUserFetched(true);
    } catch (e) {
      console.log('Erro ao buscar dados do usuário');
      console.error('Erro ao buscar dados do usuário:', e);
    }
  };

  useEffect(() => {
    if (!isUserFetched) {
      fetchUser();
    }
  }, [isUserFetched]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

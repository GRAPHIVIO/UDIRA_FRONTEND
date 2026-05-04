import { createContext, useContext, useState } from 'react';
import { MOCK_USERS } from '../utils/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // For direct role login (Quick Access)
    if (email === 'admin' || email === 'teacher' || email === 'lecturer') {
      const roleToFind = email === 'lecturer' ? 'admin' : email;
      const foundUser = MOCK_USERS.find(u => u.role === roleToFind);
      if (foundUser) {
        setUser(foundUser.data);
        return { success: true };
      }
    }

    // For form login
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser.data);
      return { success: true };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

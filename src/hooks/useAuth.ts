import { useState } from 'react';
import { User, LoginForm, RegisterForm } from '../types';
import { initialUsers } from '../data/mockData';
import { getNextId } from '../utils/helpers';

export const useAuth = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (loginForm: LoginForm): boolean => {
    const user = users.find(u => u.rollNo === loginForm.rollNo && u.password === loginForm.password);
    
    if (user) {
      setCurrentUser(user);
      setShowLogin(false);
      return true;
    }
    return false;
  };

  const handleRegister = (registerForm: RegisterForm): boolean => {
    if (registerForm.password !== registerForm.confirmPassword) {
      return false;
    }
    
    if (users.find(u => u.rollNo === registerForm.rollNo)) {
      return false;
    }
    
    const newUser: User = {
      id: getNextId(users),
      rollNo: registerForm.rollNo,
      name: registerForm.name,
      role: registerForm.role,
      password: registerForm.password
    };
    
    setUsers([...users, newUser]);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(true);
  };

  return {
    users,
    currentUser,
    showLogin,
    handleLogin,
    handleRegister,
    handleLogout
  };
};
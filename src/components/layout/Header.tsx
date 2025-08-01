import React from 'react';
import { Package, User, LogOut } from 'lucide-react';
import { User as UserType } from '../../types';

interface HeaderProps {
  currentUser: UserType;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">Robotics Component Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
              {currentUser.role}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Package } from 'lucide-react';
import { LoginForm as LoginFormType } from '../../types';

interface LoginFormProps {
  loginForm: LoginFormType;
  setLoginForm: (form: LoginFormType) => void;
  onLogin: () => void;
  onShowRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginForm,
  setLoginForm,
  onLogin,
  onShowRegister
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Package className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Robotics Component Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to book components</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College Roll Number</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your roll number"
              value={loginForm.rollNo}
              onChange={(e) => setLoginForm({...loginForm, rollNo: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && onLogin()}
            />
          </div>
          
          <button
            onClick={onLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Sign In
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onShowRegister}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
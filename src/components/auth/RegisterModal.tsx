import React from 'react';
import { User } from 'lucide-react';
import { RegisterForm as RegisterFormType } from '../../types';

interface RegisterModalProps {
  isVisible: boolean;
  registerForm: RegisterFormType;
  setRegisterForm: (form: RegisterFormType) => void;
  onRegister: () => void;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isVisible,
  registerForm,
  setRegisterForm,
  onRegister,
  onClose
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4">
        <div className="text-center mb-6">
          <User className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Register for component booking</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="College Roll Number"
            value={registerForm.rollNo}
            onChange={(e) => setRegisterForm({...registerForm, rollNo: e.target.value})}
          />
          
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Full Name"
            value={registerForm.name}
            onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
          />
          
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={registerForm.role}
            onChange={(e) => setRegisterForm({...registerForm, role: e.target.value as 'student' | 'staff'})}
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
          
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Password"
            value={registerForm.password}
            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
          />
          
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Confirm Password"
            value={registerForm.confirmPassword}
            onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
          />
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onRegister}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Register
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
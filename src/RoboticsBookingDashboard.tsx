import React, { useState } from 'react';
import { TabType, LoginForm as LoginFormType, RegisterForm, BookingForm, ComponentForm } from './types';

// Components
import LoginForm from './components/auth/LoginForm';
import RegisterModal from './components/auth/RegisterModal';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Overview from './components/dashboard/Overview';
import Inventory from './components/dashboard/Inventory';
import Requests from './components/dashboard/Requests';
import Returns from './components/dashboard/Returns';
import Analytics from './components/dashboard/Analytics';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useComponents } from './hooks/useComponents';
import { useBookings } from './hooks/useBookings';

const RoboticsBookingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loginForm, setLoginForm] = useState<LoginFormType>({ rollNo: '', password: '' });
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    rollNo: '', name: '', role: 'student', password: '', confirmPassword: ''
  });
  const [showRegister, setShowRegister] = useState(false);

  // Custom hooks
  const { users, currentUser, showLogin, handleLogin, handleRegister, handleLogout } = useAuth();
  const { components, handleAddComponent, handleDeleteComponent, updateComponentAvailability } = useComponents();
  const { bookings, handleBookingRequest, handleBookingAction, handleMarkReturned, removeBookingsByComponent } = useBookings();

  const onLogin = () => {
    const success = handleLogin(loginForm);
    if (success) {
      setLoginForm({ rollNo: '', password: '' });
    } else {
      alert('Invalid credentials. Please check your roll number and password.');
    }
  };

  const onRegister = () => {
    const success = handleRegister(registerForm);
    if (success) {
      setRegisterForm({ rollNo: '', name: '', role: 'student', password: '', confirmPassword: '' });
      setShowRegister(false);
      alert('Registration successful! You can now login.');
    } else {
      if (registerForm.password !== registerForm.confirmPassword) {
        alert('Passwords do not match');
      } else {
        alert('Roll number already exists');
      }
    }
  };

  const onAddComponent = (componentForm: ComponentForm) => {
    if (currentUser?.role === 'admin') {
      handleAddComponent(componentForm);
      alert('Component added successfully!');
    }
  };

  const onDeleteComponent = (id: number) => {
    if (currentUser?.role === 'admin') {
      const success = handleDeleteComponent(id);
      if (success) {
        removeBookingsByComponent(id);
        alert('Component deleted successfully!');
      }
    }
  };

  const onBookingRequest = (bookingForm: BookingForm) => {
    if (currentUser) {
      handleBookingRequest(bookingForm, currentUser.id);
      alert('Booking request submitted successfully!');
    }
  };

  const onBookingAction = (bookingId: number, action: 'approved' | 'rejected') => {
    if (currentUser?.role === 'admin') {
      handleBookingAction(bookingId, action);
      
      if (action === 'approved') {
        const booking = bookings.find(b => b.id === bookingId);
        if (booking) {
          updateComponentAvailability(booking.componentId, -booking.quantity);
        }
      }
    }
  };

  const onMarkReturned = (bookingId: number, componentId: number, quantity: number) => {
    handleMarkReturned(bookingId);
    updateComponentAvailability(componentId, quantity);
  };

  if (showLogin) {
    return (
      <>
        <LoginForm
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          onLogin={onLogin}
          onShowRegister={() => setShowRegister(true)}
        />
        <RegisterModal
          isVisible={showRegister}
          registerForm={registerForm}
          setRegisterForm={setRegisterForm}
          onRegister={onRegister}
          onClose={() => {
            setShowRegister(false);
            setRegisterForm({ rollNo: '', name: '', role: 'student', password: '', confirmPassword: '' });
          }}
        />
      </>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <Overview components={components} bookings={bookings} users={users} />
          )}
          
          {activeTab === 'inventory' && (
            <Inventory
              components={components}
              currentUser={currentUser}
              onAddComponent={onAddComponent}
              onDeleteComponent={onDeleteComponent}
            />
          )}
          
          {activeTab === 'requests' && (
            <Requests
              bookings={bookings}
              components={components}
              users={users}
              currentUser={currentUser}
              onBookingRequest={onBookingRequest}
              onBookingAction={onBookingAction}
            />
          )}
          
          {activeTab === 'returns' && (
            <Returns
              bookings={bookings}
              components={components}
              users={users}
              currentUser={currentUser}
              onMarkReturned={onMarkReturned}
            />
          )}
          
          {activeTab === 'analytics' && (
            <Analytics bookings={bookings} components={components} />
          )}
        </main>
      </div>
    </div>
  );
};

export default RoboticsBookingDashboard;
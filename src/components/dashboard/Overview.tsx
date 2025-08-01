import React from 'react';
import { Package, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Component, Booking, User } from '../../types';
import { calculateTotalComponents, calculateAvailableComponents, filterBookingsByStatus, getUserName, getComponentName } from '../../utils/helpers';

interface OverviewProps {
  components: Component[];
  bookings: Booking[];
  users: User[];
}

const Overview: React.FC<OverviewProps> = ({ components, bookings, users }) => {
  const totalComponents = calculateTotalComponents(components);
  const availableComponents = calculateAvailableComponents(components);
  const pendingBookings = filterBookingsByStatus(bookings, 'pending');
  const approvedBookings = filterBookingsByStatus(bookings, 'approved');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Components</p>
              <p className="text-2xl font-bold text-gray-900">{totalComponents}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">{availableComponents}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingBookings.length}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Bookings</p>
              <p className="text-2xl font-bold text-blue-600">{approvedBookings.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{getComponentName(components, booking.componentId)}</p>
                  <p className="text-sm text-gray-600">Requested by {getUserName(users, booking.userId)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'approved' 
                    ? 'bg-green-100 text-green-800'
                    : booking.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
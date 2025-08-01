import React from 'react';
import { Booking, Component } from '../../types';
import { filterBookingsByStatus } from '../../utils/helpers';

interface AnalyticsProps {
  bookings: Booking[];
  components: Component[];
}

const Analytics: React.FC<AnalyticsProps> = ({ bookings, components }) => {
  const approvedBookings = filterBookingsByStatus(bookings, 'approved');
  const pendingBookings = filterBookingsByStatus(bookings, 'pending');
  const rejectedBookings = filterBookingsByStatus(bookings, 'rejected');

  const popularComponents = components
    .sort((a, b) => (b.total - b.available) - (a.total - a.available))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">User Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Booking Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Requests:</span>
              <span className="font-medium">{bookings.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Approved:</span>
              <span className="font-medium text-green-600">{approvedBookings.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending:</span>
              <span className="font-medium text-yellow-600">{pendingBookings.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Rejected:</span>
              <span className="font-medium text-red-600">{rejectedBookings.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Components</h3>
          <div className="space-y-3">
            {popularComponents.map((component) => (
              <div key={component.id} className="flex justify-between items-center">
                <span className="text-sm">{component.name}</span>
                <span className="text-sm font-medium text-blue-600">
                  {component.total - component.available} borrowed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
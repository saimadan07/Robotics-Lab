import React from 'react';
import { Booking, Component, User } from '../../types';
import { filterBookingsByStatus, getComponentName, getUserName, isBookingOverdue } from '../../utils/helpers';

interface ReturnsProps {
  bookings: Booking[];
  components: Component[];
  users: User[];
  currentUser: User;
  onMarkReturned: (bookingId: number, componentId: number, quantity: number) => void;
}

const Returns: React.FC<ReturnsProps> = ({
  bookings,
  components,
  users,
  currentUser,
  onMarkReturned
}) => {
  const approvedBookings = filterBookingsByStatus(bookings, 'approved');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Component Returns</h2>
      
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Active Bookings</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {approvedBookings.map((booking) => {
              const overdue = isBookingOverdue(booking.returnDate);
              return (
                <div key={booking.id} className={`border rounded-lg p-4 ${overdue ? 'border-red-200 bg-red-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{getComponentName(components, booking.componentId)}</h4>
                      <p className="text-sm text-gray-600">
                        Borrowed by {getUserName(users, booking.userId)} • Qty: {booking.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Return Due:</strong> {booking.returnDate}
                        {overdue && <span className="text-red-600 font-medium ml-2">(OVERDUE)</span>}
                      </p>
                    </div>
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => onMarkReturned(booking.id, booking.componentId, booking.quantity)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Mark Returned
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
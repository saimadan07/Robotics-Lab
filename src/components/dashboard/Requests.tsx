import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Booking, BookingForm, Component, User } from '../../types';
import { getComponentName, getUserName, filterBookingsByUser } from '../../utils/helpers';

interface RequestsProps {
  bookings: Booking[];
  components: Component[];
  users: User[];
  currentUser: User;
  onBookingRequest: (form: BookingForm) => void;
  onBookingAction: (bookingId: number, action: 'approved' | 'rejected') => void;
}

const Requests: React.FC<RequestsProps> = ({
  bookings,
  components,
  users,
  currentUser,
  onBookingRequest,
  onBookingAction
}) => {
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    componentId: '',
    quantity: '',
    returnDate: '',
    purpose: ''
  });

  const handleBookingRequest = () => {
    if (!bookingForm.componentId || !bookingForm.quantity || !bookingForm.returnDate || !bookingForm.purpose) {
      alert('Please fill in all fields');
      return;
    }

    onBookingRequest(bookingForm);
    setBookingForm({ componentId: '', quantity: '', returnDate: '', purpose: '' });
  };

  const userBookings = filterBookingsByUser(bookings, currentUser.id);
  const displayBookings = currentUser.role === 'admin' ? bookings : userBookings;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Component Requests</h2>

      {currentUser.role !== 'admin' && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Request Component</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="px-3 py-2 border rounded-lg"
              value={bookingForm.componentId}
              onChange={(e) => setBookingForm({...bookingForm, componentId: e.target.value})}
            >
              <option value="">Select Component</option>
              {components.filter(c => c.available > 0).map(component => (
                <option key={component.id} value={component.id}>
                  {component.name} ({component.available} available)
                </option>
              ))}
            </select>
            
            <input
              type="number"
              placeholder="Quantity"
              min="1"
              className="px-3 py-2 border rounded-lg"
              value={bookingForm.quantity}
              onChange={(e) => setBookingForm({...bookingForm, quantity: e.target.value})}
            />
            
            <input
              type="date"
              className="px-3 py-2 border rounded-lg"
              value={bookingForm.returnDate}
              onChange={(e) => setBookingForm({...bookingForm, returnDate: e.target.value})}
            />
            
            <input
              type="text"
              placeholder="Purpose/Project Description"
              className="px-3 py-2 border rounded-lg"
              value={bookingForm.purpose}
              onChange={(e) => setBookingForm({...bookingForm, purpose: e.target.value})}
            />
            
            <button
              onClick={handleBookingRequest}
              className="md:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">
            {currentUser.role === 'admin' ? 'All Requests' : 'My Requests'}
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {displayBookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{getComponentName(components, booking.componentId)}</h4>
                    <p className="text-sm text-gray-600">
                      Requested by {getUserName(users, booking.userId)} • Qty: {booking.quantity}
                    </p>
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
                
                <div className="text-sm text-gray-600 mb-3">
                  <p><strong>Purpose:</strong> {booking.purpose}</p>
                  <p><strong>Return Date:</strong> {booking.returnDate}</p>
                  <p><strong>Request Date:</strong> {booking.requestDate}</p>
                </div>

                {currentUser.role === 'admin' && booking.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onBookingAction(booking.id, 'approved')}
                      className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      <CheckCircle className="h-3 w-3" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => onBookingAction(booking.id, 'rejected')}
                      className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      <XCircle className="h-3 w-3" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
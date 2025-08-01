import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Component, ComponentForm, User } from '../../types';

interface InventoryProps {
  components: Component[];
  currentUser: User;
  onAddComponent: (component: ComponentForm) => void;
  onDeleteComponent: (id: number) => void;
}

const Inventory: React.FC<InventoryProps> = ({
  components,
  currentUser,
  onAddComponent,
  onDeleteComponent
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newComponent, setNewComponent] = useState<ComponentForm>({
    name: '',
    category: '',
    total: '',
    description: ''
  });

  const handleAddComponent = () => {
    if (!newComponent.name || !newComponent.category || !newComponent.total || !newComponent.description) {
      alert('Please fill in all fields');
      return;
    }
    
    onAddComponent(newComponent);
    setNewComponent({ name: '', category: '', total: '', description: '' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Component Inventory</h2>
        {currentUser.role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Component</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {components.map((component) => (
          <div key={component.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{component.name}</h3>
                <p className="text-sm text-gray-600">{component.category}</p>
              </div>
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => onDeleteComponent(component.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{component.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Available:</span>
                <span className="font-medium text-green-600">{component.available}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total:</span>
                <span className="font-medium text-gray-900">{component.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(component.available / component.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Component</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Component Name"
                className="w-full px-3 py-2 border rounded-lg"
                value={newComponent.name}
                onChange={(e) => setNewComponent({...newComponent, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full px-3 py-2 border rounded-lg"
                value={newComponent.category}
                onChange={(e) => setNewComponent({...newComponent, category: e.target.value})}
              />
              <input
                type="number"
                placeholder="Total Quantity"
                className="w-full px-3 py-2 border rounded-lg"
                value={newComponent.total}
                onChange={(e) => setNewComponent({...newComponent, total: e.target.value})}
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-lg"
                value={newComponent.description}
                onChange={(e) => setNewComponent({...newComponent, description: e.target.value})}
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleAddComponent}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Component
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNewComponent({ name: '', category: '', total: '', description: '' });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
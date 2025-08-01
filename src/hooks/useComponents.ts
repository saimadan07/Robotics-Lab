import { useState } from 'react';
import { Component, ComponentForm } from '../types';
import { initialComponents } from '../data/mockData';
import { getNextId } from '../utils/helpers';

export const useComponents = () => {
  const [components, setComponents] = useState<Component[]>(initialComponents);

  const handleAddComponent = (componentForm: ComponentForm) => {
    const newComponent: Component = {
      id: getNextId(components),
      ...componentForm,
      available: parseInt(componentForm.total),
      total: parseInt(componentForm.total)
    };
    
    setComponents([...components, newComponent]);
  };

  const handleDeleteComponent = (id: number) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      setComponents(components.filter(c => c.id !== id));
      return true;
    }
    return false;
  };

  const updateComponentAvailability = (componentId: number, quantityChange: number) => {
    setComponents(components.map(c => 
      c.id === componentId 
        ? { ...c, available: c.available + quantityChange }
        : c
    ));
  };

  return {
    components,
    handleAddComponent,
    handleDeleteComponent,
    updateComponentAvailability
  };
};
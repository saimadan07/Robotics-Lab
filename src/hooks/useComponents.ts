import { useState } from 'react';
import { Component, ComponentForm } from '../types';
import { getComponentsFromStorage, saveComponentsToStorage } from '../utils/localStorage';
import { getNextId } from '../utils/helpers';

export const useComponents = () => {
  const [components, setComponents] = useState<Component[]>(() => getComponentsFromStorage());

  const updateComponents = (newComponents: Component[]) => {
    setComponents(newComponents);
    saveComponentsToStorage(newComponents);
  };

  const handleAddComponent = (componentForm: ComponentForm) => {
    const newComponent: Component = {
      id: getNextId(components),
      ...componentForm,
      available: parseInt(componentForm.total),
      total: parseInt(componentForm.total)
    };
    
    const newComponents = [...components, newComponent];
    updateComponents(newComponents);
  };

  const handleDeleteComponent = (id: number) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      const newComponents = components.filter(c => c.id !== id);
      updateComponents(newComponents);
      return true;
    }
    return false;
  };

  const updateComponentAvailability = (componentId: number, quantityChange: number) => {
    const newComponents = components.map(c => 
      c.id === componentId 
        ? { ...c, available: c.available + quantityChange }
        : c
    );
    updateComponents(newComponents);
  };

  return {
    components,
    handleAddComponent,
    handleDeleteComponent,
    updateComponentAvailability
  };
};
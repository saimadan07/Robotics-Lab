import React from 'react';
import { TrendingUp, Package, Calendar, Clock, User } from 'lucide-react';
import { TabType } from '../../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: TrendingUp },
    { id: 'inventory' as TabType, label: 'Inventory', icon: Package },
    { id: 'requests' as TabType, label: 'Requests', icon: Calendar },
    { id: 'returns' as TabType, label: 'Returns', icon: Clock },
    { id: 'analytics' as TabType, label: 'Analytics', icon: User },
  ];

  return (
    <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
      <div className="p-6">
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
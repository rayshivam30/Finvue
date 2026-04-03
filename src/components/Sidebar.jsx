import React from 'react';
import { useFinance } from '../context/finance-context';
import {
  LayoutDashboard,
  ArrowRightLeft,
  PieChart,
  Settings,
  LogOut,
  ChevronLeft,
  ShieldCheck,
  Eye
} from 'lucide-react';
import './sidebar.css';

export const Sidebar = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const { user, setRole } = useFinance();
  const closeSidebarOnMobile = () => {
    if (window.matchMedia('(max-width: 768px)').matches && isOpen) {
      toggleSidebar();
    }
  };

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'transactions', icon: ArrowRightLeft, label: 'Transactions' },
    { id: 'insights', icon: PieChart, label: 'Insights' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">F</div>
          <span className="logo-text">FinVue</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="toggle-btn"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              closeSidebarOnMobile();
            }}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            aria-label={item.label}
          >
            <item.icon size={22} />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="role-switcher">
          <div className="role-label">
            Current Role: <span className="role-badge">{user.role}</span>
          </div>
          <p className="role-desc">
            {user.role === 'admin' ? 'Full access to edit data' : 'Read-only access to data'}
          </p>
          <button
            className="switch-btn"
            onClick={() => setRole(user.role === 'admin' ? 'viewer' : 'admin')}
            aria-label={`Switch to ${user.role === 'admin' ? 'viewer' : 'admin'} role`}
          >
            {user.role === 'admin' ? <Eye size={16} /> : <ShieldCheck size={16} />}
            <span>Switch to {user.role === 'admin' ? 'Viewer' : 'Admin'}</span>
          </button>
        </div>

        <div className="nav-divider"></div>

        <button className="nav-item" aria-label="Settings">
          <Settings size={22} />
          <span className="nav-label">Settings</span>
        </button>
        <button className="nav-item text-danger" aria-label="Logout">
          <LogOut size={22} />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

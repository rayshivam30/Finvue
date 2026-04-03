import React, { Suspense, lazy, useState } from 'react';
import { Sidebar } from './Sidebar';
import { SummaryCards } from './SummaryCards';
import { useFinance } from '../context/finance-context';
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react';
import './dashboard-layout.css';

const Charts = lazy(() => import('./Charts').then((module) => ({ default: module.Charts })));
const TransactionTable = lazy(() =>
  import('./TransactionTable').then((module) => ({ default: module.TransactionTable }))
);
const Insights = lazy(() => import('./Insights').then((module) => ({ default: module.Insights })));

export const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 768);
  const { user, theme, toggleTheme, filters, setFilters } = useFinance();

  return (
    <div className="layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      {isSidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className={`main-content ${!isSidebarOpen ? 'collapsed' : ''}`}>
        <header className="header">
          <div className="header-left">
            {!isSidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="mobile-toggle"
                aria-label="Open sidebar"
              >
                <Menu size={24} />
              </button>
            )}
            <div>
              <h1 className="page-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
              <p className="welcome-text">Welcome back, {user.name}</p>
            </div>
          </div>

          <div className="header-actions">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={filters.search}
                aria-label="Global transaction search"
                onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
              />
            </div>
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-label="Toggle color theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="icon-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="dot"></span>
            </button>
            <div className="user-profile">
              <img src={user.avatar} alt={user.name} />
              <div className="user-info">
                <span className="name">{user.name}</span>
                <span className="role">{user.role}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="content">
          {activeTab === 'overview' && (
            <div className="tab-content animate-fade-in">
              <SummaryCards />
              <Suspense fallback={<div className="loading-state">Loading charts...</div>}>
                <Charts />
              </Suspense>
              <div className="recent-activity">
                <div className="section-header">
                  <h2>Recent Transactions</h2>
                  <button onClick={() => setActiveTab('transactions')}>View All</button>
                </div>
                <Suspense fallback={<div className="loading-state">Loading transactions...</div>}>
                  <TransactionTable limit={5} />
                </Suspense>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="tab-content animate-fade-in">
              <Suspense fallback={<div className="loading-state">Loading transactions...</div>}>
                <TransactionTable />
              </Suspense>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="tab-content animate-fade-in">
              <Suspense fallback={<div className="loading-state">Loading insights...</div>}>
                <Insights onNavigateTab={setActiveTab} />
              </Suspense>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

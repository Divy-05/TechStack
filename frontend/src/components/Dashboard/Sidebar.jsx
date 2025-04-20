import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bell,
  Calendar,
  CreditCard,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  Lock,
  Shield,
} from 'lucide-react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Overview');
  const [securityLock, setSecurityLock] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(prefersDark);
    }
    
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  const toggleSecurityLock = () => {
    setSecurityLock(!securityLock);
    if (!securityLock) {
      // Add security measures when locked
      document.addEventListener('contextmenu', preventDefault);
      document.addEventListener('keydown', preventDevTools);
    } else {
      // Remove security measures when unlocked
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('keydown', preventDevTools);
    }
  };

  const preventDefault = (e) => e.preventDefault();
  const preventDevTools = (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
    }
  };

  const navItems = [
    { icon: Home, label: 'Overview' },
    { icon: Users, label: 'Students' },
    { icon: User, label: 'Teachers' },
    { icon: Calendar, label: 'Attendance' },
    { icon: FileText, label: 'Exams' },
    { icon: CreditCard, label: 'Fees' },
    { icon: BarChart, label: 'Reports' },
    { icon: MessageSquare, label: 'Messages' },
  ];

  const securityItems = [
    { icon: Lock, label: 'Privacy Settings' },
    { icon: Shield, label: 'Security Dashboard' },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 z-50 flex-col border-r shadow-sm hidden md:flex transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          bg-gradient-to-b from-card-light to-card-light-2 dark:from-card-dark dark:to-card-dark-2`}
      >
        <div className="flex h-16 items-center border-b border-border-light/30 dark:border-border-dark/30 px-4">
          {isSidebarOpen ? (
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark bg-clip-text text-transparent">
              TeechTrack
            </h2>
          ) : (
            <span className="mx-auto font-bold text-primary-light dark:text-primary-dark">TT</span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="ml-auto p-2 rounded-full hover:bg-hover-light/50 dark:hover:bg-hover-dark/50 transition-colors group"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4 text-text-light dark:text-text-dark group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 text-text-light dark:text-text-dark group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-auto py-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-border-light dark:scrollbar-thumb-border-dark">
          <div className="px-3 py-2">
            {isSidebarOpen && (
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-light dark:text-muted-dark">
                Dashboard
              </h3>
            )}
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveItem(item.label)}
                  className={`flex items-center w-full p-3 rounded-lg transition-all duration-200
                    ${activeItem === item.label 
                      ? 'bg-primary-light/10 dark:bg-primary-dark/10 border-l-4 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark font-medium' 
                      : 'text-text-light dark:text-text-dark hover:bg-hover-light/30 dark:hover:bg-hover-dark/30'}
                    ${!isSidebarOpen ? 'justify-center px-0' : 'justify-start px-3'}`}
                >
                  <item.icon className={`h-5 w-5 ${isSidebarOpen && 'mr-3'}`} />
                  {isSidebarOpen && (
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {isSidebarOpen && (
            <>
              <div className="px-3 py-2 border-t border-border-light/20 dark:border-border-dark/20 mt-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-light dark:text-muted-dark">
                  Security
                </h3>
                <div className="space-y-1">
                  {securityItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center w-full p-3 rounded-lg text-text-light dark:text-text-dark hover:bg-hover-light/30 dark:hover:bg-hover-dark/30 transition-colors"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2">
                <button
                  onClick={toggleSecurityLock}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    securityLock
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}
                >
                  <Shield className="h-5 w-5 mr-3" />
                  <span>Security {securityLock ? 'Active' : 'Inactive'}</span>
                </button>
              </div>
            </>
          )}
        </nav>

        <div className="mt-auto border-t border-border-light/30 dark:border-border-dark/30 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-white">AD</span>
            </div>
            {isSidebarOpen && (
              <>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="text-sm font-medium text-text-light dark:text-text-dark truncate">
                    Admin User
                  </span>
                  <span className="text-xs text-muted-light dark:text-muted-dark truncate">
                    admin@teechtrack.com
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-hover-light/50 dark:hover:bg-hover-dark/50 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-indigo-500" />
                    )}
                  </button>
                  <button 
                    className="p-2 rounded-full hover:bg-hover-light/50 dark:hover:bg-hover-dark/50 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5 text-text-light dark:text-text-dark" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-4 bg-card-light dark:bg-card-dark border-b border-border-light/30 dark:border-border-dark/30">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md hover:bg-hover-light/50 dark:hover:bg-hover-dark/50"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-text-light dark:text-text-dark" />
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark bg-clip-text text-transparent">
            TeechTrack
          </h1>
          <div className="w-6"></div> {/* Spacer */}
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile Sidebar Content */}
        <aside
          className={`fixed top-0 left-0 z-40 h-full w-64 bg-gradient-to-b from-card-light to-card-light-2 dark:from-card-dark dark:to-card-dark-2 border-r border-border-light/30 dark:border-border-dark/30 shadow-xl transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b border-border-light/30 dark:border-border-dark/30">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark bg-clip-text text-transparent">
              TeechTrack
            </h2>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full hover:bg-hover-light/50 dark:hover:bg-hover-dark/50"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-text-light dark:text-text-dark" />
            </button>
          </div>

          <nav className="h-[calc(100%-4rem)] overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-border-light dark:scrollbar-thumb-border-dark">
            <div className="px-3 py-2">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-light dark:text-muted-dark">
                Dashboard
              </h3>
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveItem(item.label);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-200
                      ${activeItem === item.label 
                        ? 'bg-primary-light/10 dark:bg-primary-dark/10 border-l-4 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark font-medium' 
                        : 'text-text-light dark:text-text-dark hover:bg-hover-light/30 dark:hover:bg-hover-dark/30'}`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-3 py-2 border-t border-border-light/20 dark:border-border-dark/20 mt-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-light dark:text-muted-dark">
                Security
              </h3>
              <div className="space-y-1">
                {securityItems.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center w-full p-3 rounded-lg text-text-light dark:text-text-dark hover:bg-hover-light/30 dark:hover:bg-hover-dark/30 transition-colors"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-3 py-2">
              <button
                onClick={toggleSecurityLock}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  securityLock
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400'
                }`}
              >
                <Shield className="h-5 w-5 mr-3" />
                <span>Security {securityLock ? 'Active' : 'Inactive'}</span>
              </button>
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
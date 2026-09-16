import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Users, Compass, UserCircle, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { getUnreadNotifications } = useApp();
  const unread = getUnreadNotifications();

  const tabs = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Trips', path: '/trips' },
    { icon: Users, label: 'Groups', path: '/groups' },
    { icon: Map, label: 'Map', path: '/map' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      <div className="flex-1 overflow-y-auto pb-20">
        {children}
      </div>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          {tabs.map(tab => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-200 ${
                  isActive ? 'text-emerald-600 scale-110' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-emerald-600' : ''}`}>
                  {tab.label}
                </span>
                {tab.label === 'Home' && unread > 0 && (
                  <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Notification Button */}
      <button
        onClick={() => navigate('/notifications')}
        className="fixed bottom-24 right-4 w-12 h-12 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-all z-40"
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}

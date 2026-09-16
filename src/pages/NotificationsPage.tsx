import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { ArrowLeft, Bell, MessageCircle, MapPin, AlertTriangle, Users, Shield, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPage() {
  const { notifications, currentUser, markNotificationRead } = useApp();
  const navigate = useNavigate();

  const myNotifs = notifications
    .filter(n => n.userId === currentUser?.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getIcon = (type: string) => {
    switch (type) {
      case 'MESSAGE': return MessageCircle;
      case 'ALERT': return AlertTriangle;
      case 'THREAT': return Shield;
      case 'LOCATION': return MapPin;
      case 'MEMBER': return Users;
      default: return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'MESSAGE': return 'bg-blue-100 text-blue-600';
      case 'ALERT': return 'bg-red-100 text-red-600';
      case 'THREAT': return 'bg-orange-100 text-orange-600';
      case 'LOCATION': return 'bg-emerald-100 text-emerald-600';
      case 'MEMBER': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTime = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-5 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => navigate(-1)} className="text-white/80 mb-3 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-white text-2xl font-bold">Notifications</h1>
        <p className="text-white/70 text-sm">{myNotifs.filter(n => !n.isRead).length} unread</p>
      </div>

      <div className="px-5 -mt-4 space-y-2 pb-6">
        {myNotifs.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500 font-medium">No notifications</p>
            <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          myNotifs.map(notif => {
            const Icon = getIcon(notif.type);
            const color = getColor(notif.type);
            return (
              <button
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`w-full rounded-2xl shadow-sm p-4 flex items-start gap-3 text-left transition-all ${
                  notif.isRead ? 'bg-white' : 'bg-emerald-50 border border-emerald-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium truncate ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notif.title}
                    </p>
                    {!notif.isRead && <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{notif.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{formatTime(notif.timestamp)}</p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </Layout>
  );
}

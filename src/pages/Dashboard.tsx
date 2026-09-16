import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Plus, Users, MapPin, MessageCircle, AlertTriangle, Shield, Compass, TrendingUp, Search } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, groups, trips, alerts, notifications } = useApp();
  const navigate = useNavigate();

  const myGroups = groups.filter(g => g.memberIds.includes(currentUser?.id || ''));
  const upcomingTrips = trips.filter(t => t.status === 'upcoming');
  const recentAlerts = alerts.slice(-3).reverse();
  const recentNotifs = notifications.filter(n => !n.isRead).slice(0, 3);

  return (
    <Layout>
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm">Welcome back,</p>
            <h1 className="text-white text-xl font-bold">{currentUser?.fullName || 'Traveler'} 👋</h1>
          </div>
          <button onClick={() => navigate('/search')} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Search className="text-white" size={18} />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-white text-2xl font-bold">{myGroups.length}</p>
            <p className="text-white/70 text-xs">Groups</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-white text-2xl font-bold">{upcomingTrips.length}</p>
            <p className="text-white/70 text-xs">Trips</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-white text-2xl font-bold">{currentUser?.travelHistory.length || 0}</p>
            <p className="text-white/70 text-xs">Places</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 space-y-6 pb-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Plus, label: 'Create Trip', color: 'bg-emerald-100 text-emerald-600', action: () => navigate('/groups/create') },
              { icon: Users, label: 'Join Group', color: 'bg-blue-100 text-blue-600', action: () => navigate('/groups/join') },
              { icon: MapPin, label: 'Open Map', color: 'bg-purple-100 text-purple-600', action: () => navigate('/map') },
              { icon: AlertTriangle, label: 'Send Alert', color: 'bg-red-100 text-red-600', action: () => navigate('/groups') },
              { icon: Shield, label: 'Report Threat', color: 'bg-orange-100 text-orange-600', action: () => navigate('/groups') },
              { icon: MessageCircle, label: 'Start Chat', color: 'bg-cyan-100 text-cyan-600', action: () => myGroups[0] && navigate(`/groups/${myGroups[0].id}`) },
              { icon: Compass, label: 'My Trips', color: 'bg-pink-100 text-pink-600', action: () => navigate('/trips') },
              { icon: TrendingUp, label: 'Statistics', color: 'bg-amber-100 text-amber-600', action: () => navigate('/stats') },
            ].map((item, i) => (
              <button key={i} onClick={item.action} className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-all">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                  <item.icon size={18} />
                </div>
                <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* My Groups */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">My Groups</h3>
            <button onClick={() => navigate('/groups')} className="text-sm text-emerald-600 font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {myGroups.slice(0, 3).map(group => (
              <button
                key={group.id}
                onClick={() => navigate(`/groups/${group.id}`)}
                className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-all text-left"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {group.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">{group.name}</h4>
                  <p className="text-sm text-gray-500 truncate">📍 {group.destination}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{group.memberIds.length} members • Code: {group.groupCode}</p>
                </div>
                <div className="text-emerald-500">→</div>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Trips */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Trips</h3>
            <button onClick={() => navigate('/trips')} className="text-sm text-emerald-600 font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {upcomingTrips.slice(0, 2).map(trip => (
              <button
                key={trip.id}
                onClick={() => navigate(`/trips/${trip.id}`)}
                className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-all text-left"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                  <Compass size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">{trip.name}</h4>
                  <p className="text-sm text-gray-500">{trip.startingLocation} → {trip.destination}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        {recentAlerts.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Recent Alerts</h3>
            <div className="space-y-2">
              {recentAlerts.map(alert => (
                <div key={alert.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    alert.severity === 'critical' ? 'bg-red-100' : alert.severity === 'high' ? 'bg-orange-100' : 'bg-yellow-100'
                  }`}>
                    <AlertTriangle size={16} className={
                      alert.severity === 'critical' ? 'text-red-600' : alert.severity === 'high' ? 'text-orange-600' : 'text-yellow-600'
                    } />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{alert.alertType}</p>
                    <p className="text-xs text-gray-500 truncate">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Notifications */}
        {recentNotifs.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Notifications</h3>
            <div className="space-y-2">
              {recentNotifs.map(notif => (
                <div key={notif.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 border-l-4 border-emerald-500">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                    <p className="text-xs text-gray-500">{notif.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

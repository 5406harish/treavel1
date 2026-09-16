import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { ArrowLeft, Compass, MapPin, Camera, Video, MessageCircle, AlertTriangle, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StatsPage() {
  const { currentUser, trips, groups, messages, alerts, threats } = useApp();
  const navigate = useNavigate();

  const stats = [
    { icon: Compass, label: 'Total Trips', value: currentUser?.tripsCount || 0, color: 'from-purple-400 to-indigo-500', bgColor: 'bg-purple-50' },
    { icon: MapPin, label: 'Countries/Cities', value: currentUser?.travelHistory.length || 0, color: 'from-emerald-400 to-teal-500', bgColor: 'bg-emerald-50' },
    { icon: Users, label: 'Groups Joined', value: groups.filter(g => g.memberIds.includes(currentUser?.id || '')).length, color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50' },
    { icon: MessageCircle, label: 'Messages Sent', value: messages.filter(m => m.senderId === currentUser?.id).length + 47, color: 'from-pink-400 to-rose-500', bgColor: 'bg-pink-50' },
    { icon: Camera, label: 'Photos Shared', value: 89, color: 'from-amber-400 to-orange-500', bgColor: 'bg-amber-50' },
    { icon: Video, label: 'Videos Shared', value: 12, color: 'from-red-400 to-pink-500', bgColor: 'bg-red-50' },
    { icon: MapPin, label: 'Locations Shared', value: 34, color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-50' },
    { icon: AlertTriangle, label: 'Alerts Generated', value: alerts.length, color: 'from-yellow-400 to-amber-500', bgColor: 'bg-yellow-50' },
  ];

  const chartData = [
    { month: 'Jan', trips: 2 },
    { month: 'Feb', trips: 3 },
    { month: 'Mar', trips: 5 },
    { month: 'Apr', trips: 4 },
    { month: 'May', trips: 6 },
    { month: 'Jun', trips: 3 },
  ];

  const maxTrips = Math.max(...chartData.map(d => d.trips));

  return (
    <Layout>
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-5 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => navigate(-1)} className="text-white/80 mb-3 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-white text-2xl font-bold">Travel Statistics</h1>
        <p className="text-white/70 text-sm">Your travel analytics at a glance</p>
      </div>

      <div className="px-5 -mt-4 space-y-5 pb-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mb-2`}>
                <stat.icon size={18} className="text-gray-700" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp size={16} className="text-indigo-500" />
              Trip Activity
            </h3>
            <span className="text-xs text-gray-400">Last 6 months</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative flex items-end justify-center" style={{ height: '100px' }}>
                  <div
                    className="w-full max-w-[32px] bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(d.trips / maxTrips) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Travel History */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Places Visited</h3>
          <div className="flex flex-wrap gap-2">
            {currentUser?.travelHistory.map((place, i) => (
              <span key={i} className="text-sm bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1.5 rounded-full font-medium border border-indigo-100">
                📍 {place}
              </span>
            ))}
          </div>
        </div>

        {/* Distance Traveled */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Distance</p>
              <p className="text-3xl font-bold">4,280 km</p>
              <p className="text-white/60 text-xs mt-1">Across {currentUser?.travelHistory.length || 0} destinations</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Compass size={28} />
            </div>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Top Destinations</h3>
          <div className="space-y-3">
            {[
              { name: 'Kerala', visits: 4, percentage: 80 },
              { name: 'Goa', visits: 3, percentage: 60 },
              { name: 'Rajasthan', visits: 2, percentage: 40 },
              { name: 'Himachal Pradesh', visits: 1, percentage: 20 },
            ].map((dest, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{dest.name}</span>
                  <span className="text-xs text-gray-500">{dest.visits} visits</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all duration-700"
                    style={{ width: `${dest.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

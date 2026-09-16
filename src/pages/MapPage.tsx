import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { MapPin, Navigation, Users, AlertTriangle, Shield, ZoomIn, ZoomOut, Filter } from 'lucide-react';

export default function MapPage() {
  const { currentUser, groups, users, locations, alerts, threats, toggleLocationSharing } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const myGroups = groups.filter(g => g.memberIds.includes(currentUser?.id || ''));
  const sharingMembers = users.filter(u => u.locationSharing && myGroups.some(g => g.memberIds.includes(u.id)));

  const filters = [
    { id: 'all', label: 'All', icon: MapPin },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'threats', label: 'Threats', icon: Shield },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-5 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">Live Map</h1>
            <p className="text-white/70 text-sm">Group location tracking</p>
          </div>
          <button onClick={toggleLocationSharing}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              currentUser?.locationSharing ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60'
            }`}>
            {currentUser?.locationSharing ? '🟢 Sharing' : '⚪ Off'}
          </button>
        </div>
      </div>

      <div className="px-5 -mt-4 space-y-4 pb-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl shadow-sm p-2">
          {filters.map(f => (
            <button key={f.id} onClick={() => setSelectedFilter(f.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedFilter === f.id ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}>
              <f.icon size={14} />
              {f.label}
            </button>
          ))}
        </div>

        {/* Map Area */}
        <div className="bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 rounded-2xl shadow-sm overflow-hidden relative" style={{ height: '350px' }}>
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 400 350" className="w-full h-full">
              <path d="M50,100 Q100,50 150,80 T250,90 T350,70" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
              <path d="M30,200 Q80,150 130,180 T230,170 T330,190" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
              <path d="M60,280 Q110,230 160,260 T260,250 T360,270" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.4" />
              <circle cx="100" cy="120" r="30" fill="#10b981" opacity="0.1" />
              <circle cx="250" cy="180" r="40" fill="#3b82f6" opacity="0.1" />
              <circle cx="180" cy="260" r="25" fill="#8b5cf6" opacity="0.1" />
            </svg>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
            <button onClick={() => setZoom(Math.min(zoom + 0.2, 2))} className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center">
              <ZoomIn size={14} className="text-gray-600" />
            </button>
            <button onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))} className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center">
              <ZoomOut size={14} className="text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center">
              <Navigation size={14} className="text-emerald-600" />
            </button>
          </div>

          {/* Member Markers */}
          {(selectedFilter === 'all' || selectedFilter === 'members') && (
            <>
              <button onClick={() => setSelectedMarker('user-1')}
                className="absolute top-[25%] left-[20%] z-10 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold animate-bounce" style={{ animationDuration: '2s' }}>
                    H
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rotate-45" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg px-2 py-1 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="font-bold">Harish</p>
                    <p className="text-gray-500">📍 Chennai</p>
                  </div>
                </div>
              </button>

              <button onClick={() => setSelectedMarker('user-2')}
                className="absolute top-[40%] left-[55%] z-10 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rotate-45" />
                </div>
              </button>

              <button onClick={() => setSelectedMarker('user-5')}
                className="absolute top-[60%] left-[35%] z-10 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-pink-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                    P
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rotate-45" />
                </div>
              </button>
            </>
          )}

          {/* Alert Markers */}
          {(selectedFilter === 'all' || selectedFilter === 'alerts') && (
            <>
              <div className="absolute top-[30%] left-[70%] z-10">
                <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                  <AlertTriangle size={12} className="text-white" />
                </div>
              </div>
            </>
          )}

          {/* Threat Markers */}
          {(selectedFilter === 'all' || selectedFilter === 'threats') && (
            <>
              <div className="absolute top-[50%] left-[75%] z-10">
                <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <Shield size={12} className="text-white" />
                </div>
              </div>
              <div className="absolute top-[70%] left-[60%] z-10">
                <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                  <Shield size={12} className="text-white" />
                </div>
              </div>
            </>
          )}

          {/* Destination Marker */}
          <div className="absolute top-[15%] left-[80%] z-10">
            <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <MapPin size={14} className="text-white" />
            </div>
            <p className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-medium text-purple-700 whitespace-nowrap">Munnar</p>
          </div>
        </div>

        {/* Selected Marker Info */}
        {selectedMarker && (
          <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-emerald-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {users.find(u => u.id === selectedMarker)?.fullName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{users.find(u => u.id === selectedMarker)?.fullName}</p>
                <p className="text-sm text-gray-500">📍 {users.find(u => u.id === selectedMarker)?.travelHistory[0] || 'Chennai, India'}</p>
                <p className="text-xs text-gray-400">Last updated: 20 seconds ago</p>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">Map Legend</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full" />
              <span className="text-xs text-gray-600">Group Members</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full" />
              <span className="text-xs text-gray-600">Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full" />
              <span className="text-xs text-gray-600">Threats</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full" />
              <span className="text-xs text-gray-600">Destination</span>
            </div>
          </div>
        </div>

        {/* Location Sharing Status */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">Sharing Members ({sharingMembers.length})</h4>
          <div className="space-y-2">
            {sharingMembers.map(m => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {m.fullName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{m.fullName}</p>
                  <p className="text-xs text-gray-400">📍 {m.travelHistory[0] || 'Unknown'}</p>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

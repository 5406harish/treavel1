import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Search, MessageCircle, Users, MapPin, AlertTriangle, Image, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const { groups, messages, users, trips, alerts, threats } = useApp();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const filters = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'trips', label: 'Trips', icon: Compass },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'media', label: 'Media', icon: Image },
  ];

  const q = query.toLowerCase();

  const results = {
    messages: messages.filter(m => m.messageText.toLowerCase().includes(q)),
    members: users.filter(u => u.fullName.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)),
    trips: trips.filter(t => t.name.toLowerCase().includes(q) || t.destination.toLowerCase().includes(q)),
    alerts: alerts.filter(a => a.alertType.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)),
    threats: threats.filter(t => t.threatType.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)),
    groups: groups.filter(g => g.name.toLowerCase().includes(q)),
  };

  const showSection = (section: string) => activeFilter === 'all' || activeFilter === section;

  return (
    <Layout>
      <div className="bg-white px-5 pt-12 pb-4 border-b border-gray-200 sticky top-0 z-30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search messages, members, trips..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            autoFocus
          />
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {filters.map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === f.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
              <f.icon size={12} />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 space-y-4 pb-6">
        {!query && (
          <div className="text-center py-12">
            <Search className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500 font-medium">Search everything</p>
            <p className="text-gray-400 text-sm mt-1">Find messages, members, trips, and more</p>
          </div>
        )}

        {query && (
          <>
            {showSection('members') && results.members.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Members ({results.members.length})</h4>
                <div className="space-y-2">
                  {results.members.map(m => (
                    <div key={m.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                        {m.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{m.fullName}</p>
                        <p className="text-xs text-gray-500">@{m.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showSection('messages') && results.messages.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Messages ({results.messages.length})</h4>
                <div className="space-y-2">
                  {results.messages.slice(0, 5).map(m => (
                    <div key={m.id} className="bg-white rounded-xl shadow-sm p-3">
                      <p className="text-xs text-emerald-600 font-medium mb-1">{users.find(u => u.id === m.senderId)?.fullName}</p>
                      <p className="text-sm text-gray-700 truncate">{m.messageText}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showSection('trips') && results.trips.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Trips ({results.trips.length})</h4>
                <div className="space-y-2">
                  {results.trips.map(t => (
                    <button key={t.id} onClick={() => navigate(`/trips/${t.id}`)}
                      className="w-full bg-white rounded-xl shadow-sm p-3 text-left">
                      <p className="text-sm font-medium text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.destination}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showSection('alerts') && results.alerts.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Alerts ({results.alerts.length})</h4>
                <div className="space-y-2">
                  {results.alerts.map(a => (
                    <div key={a.id} className="bg-red-50 rounded-xl p-3 border border-red-100">
                      <p className="text-sm font-medium text-red-700">{a.alertType}</p>
                      <p className="text-xs text-gray-600">{a.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Object.values(results).every(arr => arr.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500">No results found for "{query}"</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

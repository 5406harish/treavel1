import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Compass, MapPin, Calendar, Users, Plus } from 'lucide-react';

export default function TripsPage() {
  const { currentUser, trips, groups } = useApp();
  const navigate = useNavigate();

  const myTrips = trips.filter(t => t.userId === currentUser?.id);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 px-5 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">My Trips</h1>
            <p className="text-white/70 text-sm">{myTrips.length} trips planned</p>
          </div>
          <button onClick={() => navigate('/groups/create')}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Plus className="text-white" size={20} />
          </button>
        </div>
      </div>

      <div className="px-5 -mt-4 space-y-4 pb-6">
        {myTrips.map(trip => {
          const group = groups.find(g => g.id === trip.groupId);
          return (
            <button key={trip.id} onClick={() => navigate(`/trips/${trip.id}`)}
              className="w-full bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all text-left">
              <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg">{trip.name}</h3>
                    <p className="text-white/80 text-sm">{trip.destination}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1">
                    <span className="text-white text-xs font-medium capitalize">{trip.status}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{trip.startingLocation} → {trip.destination}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} className="text-gray-400" />
                  <span>
                    {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                {group && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={14} className="text-gray-400" />
                    <span>{group.name} • {group.memberIds.length} members</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {trip.placesToVisit.map((place, i) => (
                    <span key={i} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                      📍 {place}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}

        {myTrips.length === 0 && (
          <div className="text-center py-12">
            <Compass className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500 font-medium">No trips yet</p>
            <p className="text-gray-400 text-sm mt-1">Create a group to plan your first trip</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

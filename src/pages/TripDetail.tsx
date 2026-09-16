import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { ArrowLeft, MapPin, Calendar, Camera, Video, FileText, Music, Users } from 'lucide-react';
import { mockTimeline } from '../data/mockData';

export default function TripDetail() {
  const { id } = useParams();
  const { trips, groups, users } = useApp();
  const navigate = useNavigate();

  const trip = trips.find(t => t.id === id);
  const group = trip ? groups.find(g => g.id === trip.groupId) : null;
  const members = group ? users.filter(u => group.memberIds.includes(u.id)) : [];
  const timeline = mockTimeline.filter(t => t.tripId === id);

  if (!trip) return <Layout><div className="p-8 text-center">Trip not found</div></Layout>;

  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 px-5 pt-12 pb-8 rounded-b-3xl">
        <button onClick={() => navigate('/trips')} className="text-white/80 mb-3 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-white text-2xl font-bold">{trip.name}</h1>
        <p className="text-white/80 text-sm mt-1">{trip.startingLocation} → {trip.destination}</p>
        <div className="flex items-center gap-4 mt-3">
          <span className="text-white/70 text-xs flex items-center gap-1">
            <Calendar size={12} /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-white text-xs capitalize">{trip.status}</span>
        </div>
      </div>

      <div className="px-5 -mt-4 space-y-5 pb-6">
        {/* Trip Overview */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Trip Overview</h3>
          <p className="text-sm text-gray-600">{trip.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {trip.placesToVisit.map((place, i) => (
              <span key={i} className="text-xs bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full font-medium">
                📍 {place}
              </span>
            ))}
          </div>
        </div>

        {/* Members */}
        {group && (
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Users size={16} /> Members ({members.length})
              </h3>
              <button onClick={() => navigate(`/groups/${group.id}`)} className="text-xs text-purple-600 font-medium">View Group →</button>
            </div>
            <div className="flex -space-x-2">
              {members.slice(0, 5).map(m => (
                <div key={m.id} className="w-9 h-9 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  {m.fullName.charAt(0)}
                </div>
              ))}
              {members.length > 5 && (
                <div className="w-9 h-9 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs font-bold">
                  +{members.length - 5}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Travel Timeline */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Travel Timeline</h3>
          <div className="space-y-4">
            {timeline.map((entry, idx) => (
              <div key={entry.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs font-bold">
                    D{entry.day}
                  </div>
                  {idx < timeline.length - 1 && <div className="w-0.5 flex-1 bg-purple-200 mt-1" />}
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium text-sm text-gray-800 flex items-center gap-1">
                    <MapPin size={12} className="text-purple-500" /> {entry.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {entry.photos > 0 && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Camera size={10} /> {entry.photos} Photos
                      </span>
                    )}
                    {entry.videos > 0 && (
                      <span className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Video size={10} /> {entry.videos} Videos
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 italic">{entry.notes}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {entry.activities.map((act, i) => (
                      <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{act}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Media Preview */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Shared Media</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200',
              'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200',
              'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200',
            ].map((url, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

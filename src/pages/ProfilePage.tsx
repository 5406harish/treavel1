import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Camera, Edit3, MapPin, Users, Compass, Shield, Bell, LogOut, ChevronRight, Globe, Lock } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, logout, toggleLocationSharing, groups } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const myGroups = groups.filter(g => g.memberIds.includes(currentUser.id));

  return (
    <Layout>
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-5 pt-12 pb-16 rounded-b-3xl relative">
        <div className="absolute top-12 right-5">
          <button onClick={() => navigate('/stats')} className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Globe className="text-white" size={16} />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30 shadow-xl">
              {currentUser.fullName.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
              <Camera size={14} className="text-gray-600" />
            </button>
          </div>
          <h2 className="text-white text-xl font-bold mt-3">{currentUser.fullName}</h2>
          <p className="text-white/70 text-sm">@{currentUser.username}</p>
        </div>
      </div>

      <div className="px-5 -mt-8 space-y-4 pb-6">
        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{currentUser.tripsCount}</p>
              <p className="text-xs text-gray-500">Trips</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{myGroups.length}</p>
              <p className="text-xs text-gray-500">Groups</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{currentUser.travelHistory.length}</p>
              <p className="text-xs text-gray-500">Places</p>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Profile Information</h3>
            <button className="text-emerald-600"><Edit3 size={16} /></button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500 w-20">Email</span>
              <span className="text-sm text-gray-800 font-medium">{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-3 py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500 w-20">Phone</span>
              <span className="text-sm text-gray-800 font-medium">{currentUser.phone}</span>
            </div>
            <div className="flex items-center gap-3 py-2">
              <span className="text-sm text-gray-500 w-20">Places</span>
              <div className="flex flex-wrap gap-1">
                {currentUser.travelHistory.map((place, i) => (
                  <span key={i} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">{place}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <h3 className="font-semibold text-gray-800 px-4 pt-4 pb-2">Settings</h3>
          
          <button onClick={toggleLocationSharing}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                <MapPin size={16} className="text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">Location Sharing</p>
                <p className="text-xs text-gray-500">{currentUser.locationSharing ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
            <div className={`w-10 h-6 rounded-full transition-all ${currentUser.locationSharing ? 'bg-emerald-500' : 'bg-gray-300'} relative`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${currentUser.locationSharing ? 'right-1' : 'left-1'}`} />
            </div>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all">
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bell size={16} className="text-blue-600" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-medium text-gray-800">Notifications</p>
              <p className="text-xs text-gray-500">Manage alerts & sounds</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all">
            <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield size={16} className="text-purple-600" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-medium text-gray-800">Privacy</p>
              <p className="text-xs text-gray-500">Manage privacy settings</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all">
            <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
              <Lock size={16} className="text-amber-600" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-medium text-gray-800">Change Password</p>
              <p className="text-xs text-gray-500">Update your password</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Logout */}
        <button onClick={() => { logout(); navigate('/login'); }}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 hover:bg-red-50 transition-all group">
          <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200">
            <LogOut size={16} className="text-red-600" />
          </div>
          <span className="text-sm font-medium text-red-600">Sign Out</span>
        </button>
      </div>
    </Layout>
  );
}

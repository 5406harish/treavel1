import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { Plus, Users, Calendar, MapPin, Copy } from 'lucide-react';
import { useState } from 'react';

export default function GroupsPage() {
  const { currentUser, groups } = useApp();
  const navigate = useNavigate();
  const [copied, setCopied] = useState('');

  const myGroups = groups.filter(g => g.memberIds.includes(currentUser?.id || ''));

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-5 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-white text-2xl font-bold mb-1">My Groups</h1>
        <p className="text-white/70 text-sm">{myGroups.length} active groups</p>
      </div>

      <div className="px-5 -mt-4 space-y-4 pb-6">
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button onClick={() => navigate('/groups/create')}
            className="flex-1 bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Plus className="text-emerald-600" size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-sm">Create Group</p>
              <p className="text-xs text-gray-500">Start a new trip group</p>
            </div>
          </button>
          <button onClick={() => navigate('/groups/join')}
            className="flex-1 bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="text-blue-600" size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-sm">Join Group</p>
              <p className="text-xs text-gray-500">Enter group code</p>
            </div>
          </button>
        </div>

        {/* Groups List */}
        <div className="space-y-3">
          {myGroups.map(group => {
            const isAdmin = group.adminId === currentUser?.id;
            return (
              <div key={group.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                <button onClick={() => navigate(`/groups/${group.id}`)} className="w-full p-4 flex items-center gap-4 text-left">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md flex-shrink-0">
                    {group.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800 truncate">{group.name}</h4>
                      {isAdmin && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">Admin</span>}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                      <MapPin size={12} />
                      <span className="truncate">{group.destination}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Users size={11} /> {group.memberIds.length}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={11} /> {new Date(group.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </button>
                {isAdmin && (
                  <div className="px-4 pb-3 flex items-center justify-between border-t border-gray-100 pt-2">
                    <span className="text-xs text-gray-500">Group Code:</span>
                    <button onClick={() => copyCode(group.groupCode)}
                      className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-gray-700 hover:bg-gray-200 transition-all">
                      {group.groupCode}
                      <Copy size={12} />
                    </button>
                    {copied === group.groupCode && <span className="text-xs text-emerald-600">Copied!</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {myGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 font-medium">No groups yet</p>
            <p className="text-gray-400 text-sm mt-1">Create or join a group to get started</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

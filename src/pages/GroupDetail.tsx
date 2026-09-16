import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { ArrowLeft, MessageCircle, Map, Image, AlertTriangle, Users, Send, Camera, Mic, MapPin, Shield, AlertOctagon, MoreVertical } from 'lucide-react';

export default function GroupDetail() {
  const { id } = useParams();
  const { currentUser, groups, users, getGroupMessages, sendMessage, createAlert, createThreat, removeMember, regenerateGroupCode } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'chat' | 'map' | 'media' | 'alerts' | 'members'>('chat');
  const [messageText, setMessageText] = useState('');
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [showThreatForm, setShowThreatForm] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [alertType, setAlertType] = useState('Emergency');
  const [alertDesc, setAlertDesc] = useState('');
  const [threatType, setThreatType] = useState('Theft');
  const [threatDesc, setThreatDesc] = useState('');
  const [threatSeverity, setThreatSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');

  const group = groups.find(g => g.id === id);
  const messages = id ? getGroupMessages(id) : [];
  const members = group ? users.filter(u => group.memberIds.includes(u.id)) : [];
  const isAdmin = group?.adminId === currentUser?.id;

  if (!group) return <Layout><div className="p-8 text-center">Group not found</div></Layout>;

  const handleSend = () => {
    if (!messageText.trim() || !currentUser || !id) return;
    sendMessage({
      groupId: id,
      senderId: currentUser.id,
      messageType: 'TEXT',
      messageText: messageText.trim(),
    });
    setMessageText('');
  };

  const handleAlert = () => {
    if (!alertDesc.trim() || !currentUser || !id) return;
    createAlert({
      groupId: id,
      senderId: currentUser.id,
      alertType,
      description: alertDesc,
      latitude: 13.0827 + (Math.random() - 0.5) * 2,
      longitude: 80.2707 + (Math.random() - 0.5) * 2,
      severity: alertType === 'Emergency' ? 'critical' : 'medium',
    });
    sendMessage({
      groupId: id,
      senderId: currentUser.id,
      messageType: 'ALERT',
      messageText: `🚨 ${alertType}: ${alertDesc}`,
    });
    setShowAlertForm(false);
    setAlertDesc('');
  };

  const handleThreat = () => {
    if (!threatDesc.trim() || !currentUser || !id) return;
    createThreat({
      groupId: id,
      reporterId: currentUser.id,
      threatType,
      description: threatDesc,
      latitude: 13.0827 + (Math.random() - 0.5) * 2,
      longitude: 80.2707 + (Math.random() - 0.5) * 2,
      severity: threatSeverity,
    });
    sendMessage({
      groupId: id,
      senderId: currentUser.id,
      messageType: 'THREAT',
      messageText: `⚠️ Threat Report (${threatSeverity.toUpperCase()}): ${threatType} - ${threatDesc}`,
    });
    setShowThreatForm(false);
    setThreatDesc('');
  };

  const getSenderName = (senderId: string) => users.find(u => u.id === senderId)?.fullName || 'Unknown';
  const getSenderInitial = (senderId: string) => {
    const name = getSenderName(senderId);
    return name.charAt(0).toUpperCase();
  };
  const isMyMessage = (senderId: string) => senderId === currentUser?.id;

  const formatTime = (ts: string) => {
    return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const tabs = [
    { id: 'chat' as const, icon: MessageCircle, label: 'Chat' },
    { id: 'map' as const, icon: Map, label: 'Map' },
    { id: 'media' as const, icon: Image, label: 'Media' },
    { id: 'alerts' as const, icon: AlertTriangle, label: 'Alerts' },
    { id: 'members' as const, icon: Users, label: 'Members' },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 pt-10 pb-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/groups')} className="p-1">
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
            {group.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-800 text-sm truncate">{group.name}</h2>
            <p className="text-xs text-gray-500">{members.length} members • {group.destination}</p>
          </div>
          <button onClick={() => setShowSOS(true)} className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
            <AlertOctagon size={16} className="text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-3 bg-gray-100 rounded-xl p-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'
              }`}>
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[calc(100vh-220px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${isMyMessage(msg.senderId) ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${isMyMessage(msg.senderId) ? 'order-1' : ''}`}>
                    {!isMyMessage(msg.senderId) && (
                      <p className="text-xs text-gray-500 mb-1 ml-1">{getSenderName(msg.senderId)}</p>
                    )}
                    {msg.messageType === 'TEXT' && (
                      <div className={`px-4 py-2.5 rounded-2xl ${
                        isMyMessage(msg.senderId) ? 'bg-emerald-500 text-white rounded-br-md' : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
                      }`}>
                        <p className="text-sm">{msg.messageText}</p>
                      </div>
                    )}
                    {msg.messageType === 'IMAGE' && (
                      <div className={`rounded-2xl overflow-hidden shadow-sm ${isMyMessage(msg.senderId) ? 'rounded-br-md' : 'rounded-bl-md'}`}>
                        {msg.mediaUrl && <img src={msg.mediaUrl} alt="" className="w-56 h-40 object-cover" />}
                        {msg.messageText && <p className="text-xs text-gray-500 px-3 py-1 bg-white">{msg.messageText}</p>}
                      </div>
                    )}
                    {msg.messageType === 'AUDIO' && (
                      <div className={`px-4 py-3 rounded-2xl flex items-center gap-2 ${
                        isMyMessage(msg.senderId) ? 'bg-emerald-500 text-white rounded-br-md' : 'bg-white shadow-sm rounded-bl-md'
                      }`}>
                        <Mic size={16} />
                        <div className="flex-1 h-1 bg-current opacity-30 rounded-full">
                          <div className="h-full w-2/3 bg-current rounded-full opacity-60" />
                        </div>
                        <span className="text-xs">0:12</span>
                      </div>
                    )}
                    {msg.messageType === 'VIDEO' && (
                      <div className={`rounded-2xl overflow-hidden shadow-sm ${isMyMessage(msg.senderId) ? 'rounded-br-md' : 'rounded-bl-md'}`}>
                        <div className="w-56 h-32 bg-gray-800 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                    {msg.messageType === 'LOCATION' && (
                      <div className={`px-4 py-3 rounded-2xl ${
                        isMyMessage(msg.senderId) ? 'bg-emerald-500 text-white rounded-br-md' : 'bg-white shadow-sm rounded-bl-md'
                      }`}>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <div>
                            <p className="text-sm font-medium">📍 Shared Location</p>
                            <p className="text-xs opacity-75">{msg.latitude?.toFixed(4)}, {msg.longitude?.toFixed(4)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {(msg.messageType === 'ALERT' || msg.messageType === 'THREAT') && (
                      <div className={`px-4 py-3 rounded-2xl border-2 ${
                        msg.messageType === 'ALERT' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'
                      }`}>
                        <p className="text-sm font-medium text-gray-800">{msg.messageText}</p>
                        <p className="text-xs text-gray-500 mt-1">User-generated warning • Not verified</p>
                      </div>
                    )}
                    <p className={`text-[10px] mt-1 ${isMyMessage(msg.senderId) ? 'text-right text-gray-400' : 'text-gray-400'} ml-1`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Bar */}
            <div className="px-4 py-2 flex gap-2 border-t border-gray-100">
              <button onClick={() => setShowAlertForm(true)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-medium flex items-center justify-center gap-1">
                <AlertTriangle size={14} /> Alert
              </button>
              <button onClick={() => setShowThreatForm(true)} className="flex-1 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-medium flex items-center justify-center gap-1">
                <Shield size={14} /> Threat
              </button>
              <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-medium flex items-center justify-center gap-1">
                <MapPin size={14} /> Location
              </button>
              <button className="flex-1 py-2 bg-purple-50 text-purple-600 rounded-xl text-xs font-medium flex items-center justify-center gap-1">
                <Camera size={14} /> Photo
              </button>
            </div>

            {/* Message Input */}
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Mic size={20} />
                </button>
                <input
                  type="text"
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 py-2.5 px-4 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button onClick={handleSend}
                  className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-emerald-600 transition-all">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="p-4">
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                <div className="absolute top-20 right-20 w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              </div>
              <div className="text-center z-10">
                <Map className="text-emerald-600 mx-auto mb-2" size={48} />
                <p className="text-gray-700 font-semibold">Live Group Map</p>
                <p className="text-gray-500 text-sm">3 members sharing location</p>
                <div className="mt-3 space-y-2">
                  {members.filter(m => m.locationSharing).slice(0, 3).map(m => (
                    <div key={m.id} className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="font-medium">{m.fullName}</span>
                      <span className="text-gray-400">📍 {m.travelHistory[0] || 'Nearby'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200',
                'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200',
                'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200',
                'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200',
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200',
              ].map((url, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  <img src={url} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="p-4 space-y-3">
            <button onClick={() => setShowAlertForm(true)}
              className="w-full py-3 bg-red-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-md">
              <AlertTriangle size={18} /> Send New Alert
            </button>
            <button onClick={() => setShowThreatForm(true)}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-md">
              <Shield size={18} /> Report Threat
            </button>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Active Alerts</h4>
              <div className="space-y-2">
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-600" />
                    <span className="font-medium text-sm text-red-700">Road Block - Salem</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Construction work. Use NH44 alternate route.</p>
                  <p className="text-xs text-gray-400 mt-1">Reported by Rahul • 30 min ago</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-yellow-600" />
                    <span className="font-medium text-sm text-yellow-700">Bad Weather - Munnar</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Heavy rainfall expected. Carry rain gear.</p>
                  <p className="text-xs text-gray-400 mt-1">Reported by Karthik • 15 min ago</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-orange-600" />
                    <span className="font-medium text-sm text-orange-700">Wild Animals - Thekkady</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Elephants spotted near forest road. Avoid night travel.</p>
                  <p className="text-xs text-gray-400 mt-1">Reported by Arun • 10 min ago</p>
                  <p className="text-[10px] text-gray-400 italic">User-generated warning • Not officially verified</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="p-4 space-y-3">
            {isAdmin && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-800">Admin Controls</p>
                    <p className="text-xs text-amber-600">Group Code: {group.groupCode}</p>
                  </div>
                  <button onClick={() => regenerateGroupCode(group.id)}
                    className="text-xs bg-amber-200 text-amber-800 px-3 py-1.5 rounded-lg font-medium">
                    Regenerate Code
                  </button>
                </div>
              </div>
            )}
            {members.map(member => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  {member.fullName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm text-gray-800">{member.fullName}</p>
                    {member.id === group.adminId && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Admin</span>}
                  </div>
                  <p className="text-xs text-gray-500">@{member.username}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className={`w-2 h-2 rounded-full ${member.locationSharing ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <span className="text-[10px] text-gray-400">{member.locationSharing ? 'Sharing location' : 'Location off'}</span>
                  </div>
                </div>
                {isAdmin && member.id !== currentUser?.id && (
                  <button onClick={() => removeMember(group.id, member.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert Form Modal */}
      {showAlertForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">🚨 Send Alert</h3>
              <button onClick={() => setShowAlertForm(false)} className="text-gray-400">✕</button>
            </div>
            <select value={alertType} onChange={e => setAlertType(e.target.value)}
              className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm">
              {['Emergency', 'Accident', 'Road Block', 'Bad Weather', 'Dangerous Area', 'Vehicle Problem', 'Medical Assistance', 'Security Issue', 'Lost Person', 'Fire', 'Flood', 'Other'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <textarea value={alertDesc} onChange={e => setAlertDesc(e.target.value)}
              placeholder="Describe the alert..." rows={3}
              className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm resize-none" />
            <button onClick={handleAlert}
              className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold">
              Send Alert to Group
            </button>
          </div>
        </div>
      )}

      {/* Threat Form Modal */}
      {showThreatForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">⚠️ Report Threat</h3>
              <button onClick={() => setShowThreatForm(false)} className="text-gray-400">✕</button>
            </div>
            <select value={threatType} onChange={e => setThreatType(e.target.value)}
              className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm">
              {['Theft', 'Unsafe Road', 'Accident', 'Flood', 'Landslide', 'Wild Animal', 'Fire', 'Crime', 'Harassment', 'Unsafe Area', 'Weather Hazard', 'Other'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select value={threatSeverity} onChange={e => setThreatSeverity(e.target.value as any)}
              className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm">
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🟠 High</option>
              <option value="critical">🔴 Critical</option>
            </select>
            <textarea value={threatDesc} onChange={e => setThreatDesc(e.target.value)}
              placeholder="Describe the threat..." rows={3}
              className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm resize-none" />
            <p className="text-xs text-gray-400 italic">Note: This is a user-generated warning, not verified official information.</p>
            <button onClick={handleThreat}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold">
              Submit Threat Report
            </button>
          </div>
        </div>
      )}

      {/* SOS Confirmation */}
      {showSOS && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertOctagon size={32} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Emergency SOS</h3>
            <p className="text-gray-500 text-sm">This will notify all group members with your current location. Are you sure?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowSOS(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-600">Cancel</button>
              <button onClick={() => {
                handleAlert();
                setAlertType('Emergency');
                setAlertDesc('SOS! I need help immediately!');
                setShowSOS(false);
              }}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold">Send SOS</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

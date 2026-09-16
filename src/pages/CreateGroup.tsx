import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { ArrowLeft, Copy, Check, Users, MapPin, Calendar, FileText, Image } from 'lucide-react';

export default function CreateGroup() {
  const { currentUser, createGroup } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [createdCode, setCreatedCode] = useState('');
  const [form, setForm] = useState({
    name: '',
    tripName: '',
    destination: '',
    startingLocation: '',
    destinationLocation: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [copied, setCopied] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    if (!currentUser) return;
    const code = createGroup({
      ...form,
      groupImage: '',
      adminId: currentUser.id,
      memberIds: [currentUser.id],
      isActive: true,
    });
    setCreatedCode(code);
    setStep(2);
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(createdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 2) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-emerald-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Group Created!</h2>
            <p className="text-gray-500 text-sm mb-6">Share this code with your travel buddies</p>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-xs text-gray-500 mb-1">Group Code</p>
              <p className="text-2xl font-mono font-bold text-emerald-600 tracking-wider">{createdCode}</p>
            </div>

            <button onClick={copyCode}
              className="w-full py-3 bg-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 mb-3">
              {copied ? <><Check size={18} /> Copied!</> : <><Copy size={18} /> Copy Code</>}
            </button>
            <button onClick={() => navigate('/groups')}
              className="w-full py-3 border border-gray-200 rounded-xl font-medium text-gray-600">
              Go to Groups
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-5 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => navigate('/groups')} className="text-white/80 mb-3 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-white text-2xl font-bold">Create Group</h1>
        <p className="text-white/70 text-sm">Set up your travel group</p>
      </div>

      <div className="px-5 -mt-4 pb-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Users size={14} /> Group Name
            </label>
            <input type="text" value={form.name} onChange={e => updateField('name', e.target.value)}
              placeholder="e.g., Kerala Adventure 2026"
              className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FileText size={14} /> Trip Name
            </label>
            <input type="text" value={form.tripName} onChange={e => updateField('tripName', e.target.value)}
              placeholder="e.g., Kerala Adventure"
              className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin size={14} /> From
              </label>
              <input type="text" value={form.startingLocation} onChange={e => updateField('startingLocation', e.target.value)}
                placeholder="Starting city"
                className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin size={14} /> To
              </label>
              <input type="text" value={form.destination} onChange={e => updateField('destination', e.target.value)}
                placeholder="Destination"
                className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar size={14} /> Start Date
              </label>
              <input type="date" value={form.startDate} onChange={e => updateField('startDate', e.target.value)}
                className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar size={14} /> End Date
              </label>
              <input type="date" value={form.endDate} onChange={e => updateField('endDate', e.target.value)}
                className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={e => updateField('description', e.target.value)}
              placeholder="Describe your trip..." rows={3}
              className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            <Image className="text-gray-400 mx-auto mb-2" size={24} />
            <p className="text-sm text-gray-500">Add group photo (optional)</p>
          </div>

          <button onClick={handleCreate}
            disabled={!form.name || !form.destination}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50">
            Create Group & Generate Code
          </button>
        </div>
      </div>
    </Layout>
  );
}

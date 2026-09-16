import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { ArrowLeft, Check, X, Users } from 'lucide-react';

export default function JoinGroup() {
  const { joinGroup } = useApp();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleJoin = () => {
    if (!code.trim()) return;
    const success = joinGroup(code.trim().toUpperCase());
    if (success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg('Invalid group code or group not found. Try: KER-7X92AB');
    }
  };

  if (status === 'success') {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-emerald-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Joined Successfully!</h2>
            <p className="text-gray-500 text-sm mb-6">You're now part of the travel group</p>
            <button onClick={() => navigate('/groups')}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold">
              View Groups
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-5 pt-12 pb-6 rounded-b-3xl">
        <button onClick={() => navigate('/groups')} className="text-white/80 mb-3 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-white text-2xl font-bold">Join Group</h1>
        <p className="text-white/70 text-sm">Enter the group code to join</p>
      </div>

      <div className="px-5 -mt-4 pb-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="text-blue-600" size={28} />
            </div>
            <p className="text-gray-600 text-sm">Ask your group admin for the group code</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Group Code</label>
            <input
              type="text"
              value={code}
              onChange={e => { setCode(e.target.value.toUpperCase()); setStatus('idle'); }}
              placeholder="e.g., TRV-8K4P2X"
              className="w-full py-4 px-4 border-2 border-gray-200 rounded-2xl text-center text-xl font-mono font-bold tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none uppercase"
              maxLength={10}
            />
          </div>

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 flex items-center gap-2">
              <X size={16} />
              {errorMsg}
            </div>
          )}

          <button onClick={handleJoin}
            disabled={!code.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50">
            Join Group
          </button>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 text-center">
              💡 Demo code: <strong>KER-7X92AB</strong> (Kerala Adventure 2026)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

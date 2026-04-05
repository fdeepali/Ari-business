import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users, FileText, TrendingUp, MessageSquareQuote, Briefcase } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    axios.get(`${BACKEND_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => setStats(data))
      .catch(() => {
        localStorage.removeItem('admin_token');
        navigate('/login');
      });
  }, [navigate]);

  const cards = [
    { label: 'Total Contacts',    value: stats?.contacts       ?? '—', icon: Users,               color: 'bg-blue-500',   link: '/contacts' },
    { label: 'Questionnaires',    value: stats?.questionnaires ?? '—', icon: FileText,             color: 'bg-green-500',  link: '/questionnaires' },
    { label: 'Paid Submissions',  value: stats?.questionnaires ?? '—', icon: TrendingUp,           color: 'bg-yellow-500', link: '/questionnaires' },
    { label: 'Testimonials',      value: stats?.testimonials   ?? '—', icon: MessageSquareQuote,   color: 'bg-purple-500', link: '/testimonials' },
    { label: 'Services',          value: stats?.services       ?? '—', icon: Briefcase,            color: 'bg-orange-500', link: '/services' },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
      <p className="text-gray-500 mb-8">Overview of all submissions and content</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ label, value, icon: Icon, color, link }) => (
          <button
            key={label}
            onClick={() => navigate(link)}
            className="bg-white rounded-2xl shadow p-6 flex items-center gap-5 hover:shadow-md transition-shadow text-left"
          >
            <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={28} className="text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const COLORS = ['blue', 'green', 'purple', 'yellow', 'red', 'gray'];

const emptyForm = { quote: '', author: '', company: '', color: 'blue', order: 0, active: true };

export default function Testimonials() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const token = () => localStorage.getItem('admin_token');
  const headers = () => ({ Authorization: `Bearer ${token()}` });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: res } = await axios.get(`${BACKEND_URL}/api/admin/testimonials`, { headers: headers() });
      setData(res.data);
    } catch {
      localStorage.removeItem('admin_token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (t) => { setForm({ quote: t.quote, author: t.author, company: t.company, color: t.color, order: t.order, active: t.active }); setEditId(t._id); setShowForm(true); };

  const handleSave = async () => {
    if (!form.quote.trim() || !form.author.trim() || !form.company.trim()) return;
    setSaving(true);
    try {
      if (editId) {
        await axios.put(`${BACKEND_URL}/api/admin/testimonials/${editId}`, form, { headers: headers() });
      } else {
        await axios.post(`${BACKEND_URL}/api/admin/testimonials`, form, { headers: headers() });
      }
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await axios.delete(`${BACKEND_URL}/api/admin/testimonials/${id}`, { headers: headers() });
    fetchData();
  };

  const toggleActive = async (t) => {
    await axios.put(`${BACKEND_URL}/api/admin/testimonials/${t._id}`, { ...t, active: !t.active }, { headers: headers() });
    fetchData();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
          <p className="text-gray-500 text-sm mt-1">{data.length} total — shown on the website home page</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-xl transition-colors">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent" />
        </div>
      ) : (
        <div className="grid gap-4">
          {data.length === 0 && (
            <div className="bg-white rounded-2xl shadow p-12 text-center text-gray-400">
              No testimonials yet. Click "Add Testimonial" to create one.
            </div>
          )}
          {data.map(t => (
            <div key={t._id} className={`bg-white rounded-2xl shadow p-6 border-l-4 ${t.active ? 'border-green-400' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-gray-700 italic mb-3">"{t.quote}"</p>
                  <p className="font-semibold text-gray-800">— {t.author}</p>
                  <p className="text-sm text-gray-500">{t.company}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium bg-${t.color}-100 text-${t.color}-700`}>
                      {t.color}
                    </span>
                    <span className="text-xs text-gray-400">Order: {t.order}</span>
                    <span className={`text-xs font-medium ${t.active ? 'text-green-600' : 'text-gray-400'}`}>
                      {t.active ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(t)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                    {t.active ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} />}
                  </button>
                  <button onClick={() => openEdit(t)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(t._id)} className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-400">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">{editId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Quote *</label>
                <textarea
                  rows={4}
                  value={form.quote}
                  onChange={e => setForm(p => ({ ...p, quote: e.target.value }))}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none resize-none"
                  placeholder="What the client said..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Author *</label>
                  <input
                    value={form.author}
                    onChange={e => setForm(p => ({ ...p, author: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none"
                    placeholder="Julie, Founder"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company *</label>
                  <input
                    value={form.company}
                    onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none"
                    placeholder="Eco-Friendly Home Goods"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Color</label>
                  <select
                    value={form.color}
                    onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none"
                  >
                    {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Order (sort)</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={e => setForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none"
                  />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={e => setForm(p => ({ ...p, active: e.target.checked }))}
                  className="w-5 h-5 accent-yellow-500"
                />
                <span className="text-sm font-medium text-gray-700">Visible on website</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowForm(false)} className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.quote.trim() || !form.author.trim() || !form.company.trim()}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

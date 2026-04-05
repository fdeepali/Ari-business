import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const CATEGORIES = ['digital', 'catalog', 'account', 'logistics', 'finance', 'support'];
const ICONS = ['Zap', 'FileText', 'TrendingUp', 'Truck', 'DollarSign', 'BookOpen', 'Globe', 'Shield', 'BarChart3', 'Users', 'Package', 'Award', 'AlertCircle', 'Code', 'Palette'];

const emptyForm = { title: '', description: '', highlight: '', features: [], category: 'digital', icon: 'Zap', order: 0, active: true };

export default function Services() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const navigate = useNavigate();

  const token = () => localStorage.getItem('admin_token');
  const headers = () => ({ Authorization: `Bearer ${token()}` });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: res } = await axios.get(`${BACKEND_URL}/api/admin/services`, { headers: headers() });
      setData(res.data);
    } catch {
      localStorage.removeItem('admin_token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setFeatureInput(''); setShowForm(true); };
  const openEdit = (s) => {
    setForm({ title: s.title, description: s.description, highlight: s.highlight || '', features: s.features || [], category: s.category, icon: s.icon, order: s.order, active: s.active });
    setEditId(s._id);
    setFeatureInput('');
    setShowForm(true);
  };

  const addFeature = () => {
    const val = featureInput.trim();
    if (!val) return;
    setForm(p => ({ ...p, features: [...p.features, val] }));
    setFeatureInput('');
  };

  const removeFeature = (i) => setForm(p => ({ ...p, features: p.features.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) return;
    setSaving(true);
    try {
      if (editId) {
        await axios.put(`${BACKEND_URL}/api/admin/services/${editId}`, form, { headers: headers() });
      } else {
        await axios.post(`${BACKEND_URL}/api/admin/services`, form, { headers: headers() });
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
    if (!confirm('Delete this service?')) return;
    await axios.delete(`${BACKEND_URL}/api/admin/services/${id}`, { headers: headers() });
    fetchData();
  };

  const toggleActive = async (s) => {
    await axios.put(`${BACKEND_URL}/api/admin/services/${s._id}`, { ...s, active: !s.active }, { headers: headers() });
    fetchData();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Services</h2>
          <p className="text-gray-500 text-sm mt-1">{data.length} total — shown in the Services Summary section on the home page</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-xl transition-colors">
          <Plus size={18} /> Add Service
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
              No services yet. Click "Add Service" to create one.
            </div>
          )}
          {data.map(s => (
            <div key={s._id} className={`bg-white rounded-2xl shadow p-6 border-l-4 ${s.active ? 'border-yellow-400' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-lg">{s.icon}</span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">{s.category}</span>
                    <span className="text-xs text-gray-400">Order: {s.order}</span>
                    <span className={`text-xs font-medium ${s.active ? 'text-green-600' : 'text-gray-400'}`}>
                      {s.active ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{s.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{s.description}</p>
                  {s.highlight && <p className="text-xs text-yellow-700 bg-yellow-50 px-3 py-1 rounded-lg inline-block">{s.highlight}</p>}
                  {s.features?.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {s.features.map((f, i) => (
                        <li key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{f}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(s)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                    {s.active ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} />}
                  </button>
                  <button onClick={() => openEdit(s)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(s._id)} className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-400">
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h3 className="text-lg font-bold text-gray-800">{editId ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none"
                  placeholder="e.g. Amazon PPC Management"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none resize-none"
                  placeholder="Brief description of the service..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Highlight (optional)</label>
                <input
                  value={form.highlight}
                  onChange={e => setForm(p => ({ ...p, highlight: e.target.value }))}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none"
                  placeholder="e.g. Proven to reduce ACoS by 30%"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={featureInput}
                    onChange={e => setFeatureInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-yellow-500 focus:outline-none text-sm"
                    placeholder="Type a feature and press Enter or Add"
                  />
                  <button onClick={addFeature} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.features.map((f, i) => (
                    <span key={i} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-lg">
                      {f}
                      <button onClick={() => removeFeature(i)} className="text-gray-400 hover:text-red-500 ml-1">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Icon</label>
                  <select
                    value={form.icon}
                    onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none"
                  >
                    {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Order (sort position)</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={e => setForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none"
                />
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
                disabled={saving || !form.title.trim() || !form.description.trim()}
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

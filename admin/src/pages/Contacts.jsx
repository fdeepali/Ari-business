import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Contacts() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const fetchContacts = async (p = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const { data: res } = await axios.get(`${BACKEND_URL}/api/admin/contacts?page=${p}&limit=20`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
      setPages(res.pages);
      setTotal(res.total);
      setPage(p);
    } catch {
      localStorage.removeItem('admin_token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(1); }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Contact Submissions</h2>
          <p className="text-gray-500 text-sm mt-1">{total} total submissions</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Name', 'Email', 'Phone', 'Store URL', 'Goals', 'Date'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map(c => (
                  <tr
                    key={c._id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelected(c)}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.email}</td>
                    <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[120px] truncate">{c.storeUrl || '—'}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">{c.goals}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {new Date(c.submittedAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">Page {page} of {pages}</p>
            <div className="flex gap-2">
              <button
                onClick={() => fetchContacts(page - 1)}
                disabled={page <= 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => fetchContacts(page + 1)}
                disabled={page >= pages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {selected && (
        <Modal title={`Contact: ${selected.name}`} onClose={() => setSelected(null)}>
          <DetailRow label="Name" value={selected.name} />
          <DetailRow label="Email" value={selected.email} />
          <DetailRow label="Phone" value={selected.phone} />
          <DetailRow label="Store URL" value={selected.storeUrl || '—'} />
          <DetailRow label="Goals" value={selected.goals} multiline />
          <DetailRow label="Submitted" value={new Date(selected.submittedAt).toLocaleString('en-IN')} />
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6 space-y-4">{children}</div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, multiline }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-gray-800 ${multiline ? 'whitespace-pre-wrap' : ''}`}>{value}</p>
    </div>
  );
}

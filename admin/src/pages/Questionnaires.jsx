import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Questionnaires() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (p = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const { data: res } = await axios.get(`${BACKEND_URL}/api/admin/questionnaires?page=${p}&limit=20`, {
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

  useEffect(() => { fetchData(1); }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Questionnaire Submissions</h2>
          <p className="text-gray-500 text-sm mt-1">{total} total submissions (paid)</p>
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
                  {['Name', 'Email', 'Phone', 'Business', 'Payment', 'Amount', 'Date'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map(q => (
                  <tr
                    key={q._id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelected(q)}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{q.contactInfo?.name}</td>
                    <td className="px-4 py-3 text-gray-600">{q.contactInfo?.email}</td>
                    <td className="px-4 py-3 text-gray-600">{q.contactInfo?.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{q.contactInfo?.businessName || '—'}</td>
                    <td className="px-4 py-3">
                      {q.payment?.status === 'paid' ? (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <CheckCircle size={14} /> Paid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-500">
                          <XCircle size={14} /> {q.payment?.status || 'pending'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {q.payment?.amount ? `₹${(q.payment.amount / 100).toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {new Date(q.submittedAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">Page {page} of {pages}</p>
            <div className="flex gap-2">
              <button onClick={() => fetchData(page - 1)} disabled={page <= 1} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => fetchData(page + 1)} disabled={page >= pages} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {selected && (
        <QuestionnaireModal q={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function QuestionnaireModal({ q, onClose }) {
  const details = q.businessDetails || {};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-lg font-bold text-gray-800">Questionnaire — {q.contactInfo?.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <section>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contact Information</h4>
            <div className="grid grid-cols-2 gap-3">
              <InfoItem label="Name" value={q.contactInfo?.name} />
              <InfoItem label="Email" value={q.contactInfo?.email} />
              <InfoItem label="Phone" value={q.contactInfo?.phone} />
              <InfoItem label="Business" value={q.contactInfo?.businessName || '—'} />
            </div>
          </section>

          {/* Payment Info */}
          <section>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Payment</h4>
            <div className="grid grid-cols-2 gap-3">
              <InfoItem label="Status" value={q.payment?.status} />
              <InfoItem label="Amount" value={q.payment?.amount ? `₹${(q.payment.amount / 100).toLocaleString('en-IN')}` : '—'} />
              <InfoItem label="Payment ID" value={q.payment?.razorpay_payment_id || '—'} />
              <InfoItem label="Order ID" value={q.payment?.razorpay_order_id || '—'} />
            </div>
          </section>

          {/* Business Details */}
          <section>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Business Details</h4>
            <div className="space-y-3">
              {Object.entries(details).map(([key, value]) => {
                if (key.endsWith('_other')) return null;
                const displayVal = Array.isArray(value) ? value.join(', ') : value;
                const otherVal = details[`${key}_other`];
                return (
                  <div key={key} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 font-medium mb-1">{formatKey(key)}</p>
                    <p className="text-gray-800 text-sm">{displayVal}{otherVal ? ` — ${otherVal}` : ''}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <p className="text-xs text-gray-400 text-right">
            Submitted: {new Date(q.submittedAt).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className="text-gray-800 text-sm font-medium">{value}</p>
    </div>
  );
}

function formatKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
}

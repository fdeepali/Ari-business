import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, MessageCircle, Mail,
  CheckCircle, User, Phone, Building, CreditCard
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const RAZORPAY_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const questions = [
  { id: 'businessType', question: 'Are you a trader or a manufacturer?', type: 'single', options: ['Trader', 'Manufacturer', 'Both'] },
  { id: 'objective', question: 'Are you:', type: 'single', options: ['New to Amazon and want to start selling', 'Already selling on Amazon and need support', 'Both (new region + existing account issues)'] },
  { id: 'targetRegions', question: 'Which Amazon regions are you interested in?', type: 'multiple', options: ['India (IN)', 'USA (US)', 'UK', 'EU', 'Canada (CA)', 'UAE (AE)', 'Australia (AU)', 'Others'], hasOther: true },
  { id: 'hasAmazonAccount', question: 'Do you already have an Amazon seller account?', type: 'single', options: ['Yes', 'No'] },
  { id: 'accountStatus', question: 'If yes, what is your account status?', type: 'single', options: ['Active', 'Deactivated', 'Suspended', 'N/A'] },
  { id: 'productCategory', question: 'What is your primary product category?', type: 'single', options: ['Apparel & Fashion', 'Electronics', 'Food & Beverages', 'Home & Kitchen', 'Beauty & Personal Care', 'Health & Wellness', 'Industrial Supplies', 'Handicrafts', 'Others'], hasOther: true },
  { id: 'productSource', question: 'Are your products:', type: 'single', options: ['Own manufactured items', 'Private label / White label', 'Trading / Reselling branded goods'] },
  { id: 'hasTrademark', question: 'Do you have a registered trademark?', type: 'single', options: ['Yes - registered', 'Application filed but not yet registered', 'No, but want help filing', 'No'] },
  { id: 'hasBrandRegistry', question: 'Do you have Brand Registry on any Amazon marketplace?', type: 'single', options: ['Yes', 'No'] },
  { id: 'restrictedProducts', question: 'Do your products fall under restricted or sensitive categories?', type: 'single', options: ['Yes', 'No', 'Not sure'] },
  { id: 'certifications', question: 'Do your products require mandatory certifications (FSSAI, BIS, FDA, CE, FCC, etc.)?', type: 'single', options: ['Yes - already have all required', 'Yes - have some, need others', 'Yes - need all certifications', 'No certifications required', 'Not sure'] },
  { id: 'fulfillmentModel', question: 'Do you plan to use:', type: 'single', options: ['FBA (Fulfillment by Amazon)', 'FBM (Self-ship)', 'Both (depends on SKU)', 'Not decided yet'] },
  { id: 'hasProductPhotography', question: 'Do you have product photography?', type: 'single', options: ['Yes - studio quality', 'Yes - basic quality', 'No - need support'] },
  { id: 'hasListingContent', question: 'Do you have existing product listings (titles, descriptions, bullet points)?', type: 'single', options: ['Yes', 'Partially', 'No'] },
  { id: 'ppcExperience', question: 'Have you previously run Amazon Sales Growth Campaigns?', type: 'single', options: ['Yes - self-managed', 'Yes - via agency', 'No'] },
  { id: 'servicesNeeded', question: 'What specific help are you looking for? (Select all that apply)', type: 'multiple', options: ['New account registration and setup', 'Product research', 'Listing creation & optimization', 'Brand building (A+ content, Storefront)', 'Sales Growth Campaigns/Ads and marketing', 'Inventory / FBA / logistics setup', 'Compliance, documentation, and taxation', 'Account health / suspension / appeal', 'Other'], hasOther: true },
  { id: 'monthlyBudget', question: 'What is your approximate monthly budget for Amazon services?', type: 'single', options: ['₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000 - ₹1,00,000', 'Above ₹1,00,000', 'Not decided yet'] },
  { id: 'timeline', question: 'How soon are you looking to start?', type: 'single', options: ['Immediately', 'Within 2 weeks', 'Within 1-3 months', 'Just exploring options'] },
  { id: 'mainObjective', question: 'What is your main objective in the next 6-12 months?', type: 'single', options: ['Launch new products', 'Scale revenue on existing products', 'Expand to new regions', 'Fix compliance or account issues', 'Build brand presence', 'Other'], hasOther: true }
];

const contactFields = [
  { id: 'name', label: 'Full Name', required: true, icon: User, placeholder: 'John Doe' },
  { id: 'email', label: 'Email', required: true, icon: Mail, placeholder: 'john@company.com' },
  { id: 'phone', label: 'WhatsApp/Phone', required: true, icon: Phone, placeholder: '+91 98765 43210' },
  { id: 'businessName', label: 'Business Name', required: false, icon: Building, placeholder: 'Your Brand / Company' }
];

function QuestionnaireSubmission() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', businessName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT_SRC}"]`);
    if (existing) { setRazorpayLoaded(true); return; }
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => toast.error('Failed to load payment gateway. Please refresh.');
    document.body.appendChild(script);
  }, []);

  const totalSteps = questions.length + 1;
  const progress = (currentStep / totalSteps) * 100;

  const handleSingleAnswer = (id, value) => setAnswers(p => ({ ...p, [id]: value }));
  const handleMultipleAnswer = (id, value) => setAnswers(p => {
    const cur = Array.isArray(p[id]) ? p[id] : [];
    return { ...p, [id]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] };
  });
  const handleOtherChange = (id, value) => setAnswers(p => ({ ...p, [`${id}_other`]: value }));
  const handleContactChange = (field, value) => setContactInfo(p => ({ ...p, [field]: value }));

  const handleNext = () => { if (currentStep < questions.length) setCurrentStep(p => p + 1); };
  const handlePrevious = () => { if (currentStep > 0) setCurrentStep(p => p - 1); };

  const isContactInfoComplete = () =>
    contactFields.every(f => !f.required || (contactInfo[f.id] && contactInfo[f.id].trim()));

  const isStepComplete = () => {
    if (currentStep >= questions.length) return isContactInfoComplete();
    const q = questions[currentStep];
    const ans = answers[q.id];
    if (q.type === 'single') {
      if (!ans) return false;
      if (q.hasOther && (ans === 'Others' || ans === 'Other') && !answers[`${q.id}_other`]) return false;
      return true;
    }
    if (q.type === 'multiple') {
      const arr = Array.isArray(ans) ? ans : [];
      if (!arr.length) return false;
      if (q.hasOther && arr.some(v => v === 'Others' || v === 'Other') && !answers[`${q.id}_other`]) return false;
      return true;
    }
    return true;
  };

  const generateSummary = () => {
    let summary = '';
    questions.forEach((q, i) => {
      const ans = answers[q.id];
      if (!ans || (Array.isArray(ans) && !ans.length)) return;
      let ansText = Array.isArray(ans) ? ans.join(', ') : ans;
      if (q.hasOther && answers[`${q.id}_other`]) ansText += ` - ${answers[`${q.id}_other`]}`;
      summary += `${i + 1}. ${q.question}\n   ✅ ${ansText}\n\n`;
    });
    return summary;
  };

  const generateWhatsAppMessage = () => {
    const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
    return (
      `🔔 *NEW QUESTIONNAIRE SUBMISSION*\n` +
      `================================\n\n` +
      `📋 *CONTACT INFORMATION*\n` +
      `👤 Name: ${contactInfo.name}\n` +
      `🏢 Business: ${contactInfo.businessName || '-'}\n` +
      `📧 Email: ${contactInfo.email}\n` +
      `📱 Phone: ${contactInfo.phone}\n\n` +
      `📊 *BUSINESS DETAILS*\n` +
      `================================\n\n` +
      generateSummary() +
      `================================\n` +
      `📅 Submitted: ${date}\n\n` +
      `💼 ARI Business Network`
    );
  };

  const openWhatsApp = () => {
    const msg = generateWhatsAppMessage();
    window.open(`https://wa.me/919137696515?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const sendEmailJS = async (paymentId) => {
    const params = {
      from_name: contactInfo.name,
      from_email: contactInfo.email,
      phone: contactInfo.phone,
      business_name: contactInfo.businessName || 'N/A',
      summary: generateSummary(),
      payment_id: paymentId,
      submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      // Template sends to admin; user gets a copy via reply_to or separate send
      to_email: 'sanketbelekar270306@gmail.com',
      user_email: contactInfo.email,
      reply_to: contactInfo.email,
    };

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_QUESTIONNAIRE_TEMPLATE_ID,
      params,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  };

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded || !window.Razorpay) {
      toast.error('Payment gateway is still loading. Please wait and try again.');
      return;
    }
    if (!isContactInfoComplete()) {
      toast.error('Please fill in all required contact fields first.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderRes = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: contactInfo.email })
      });
      if (!orderRes.ok) throw new Error('Failed to create payment order');
      const { data: order } = await orderRes.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID_TEST,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'ARI Business Network',
        description: 'Amazon Business Questionnaire',
        order_id: order.id,
        prefill: { name: contactInfo.name, email: contactInfo.email, contact: contactInfo.phone },
        theme: { color: '#facc15' },
        handler: async (response) => {
          try {
            // Save to DB (backend re-verifies signature)
            const saveRes = await fetch(`${BACKEND_URL}/api/questionnaire`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contactInfo,
                businessDetails: answers,
                payment: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  amount: order.amount,
                  currency: order.currency
                }
              })
            });
            if (!saveRes.ok) throw new Error('Failed to save questionnaire');

            // Send EmailJS (admin + user via template)
            try {
              await sendEmailJS(response.razorpay_payment_id);
            } catch (e) {
              console.warn('EmailJS failed:', e);
            }

            toast.success('Payment successful! Questionnaire submitted.');
            setTimeout(openWhatsApp, 800);

            setCurrentStep(0);
            setAnswers({});
            setContactInfo({ name: '', email: '', phone: '', businessName: '' });
          } catch (err) {
            toast.error(err.message || 'Post-payment error. Please contact support.');
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            toast.info('Payment cancelled. Questionnaire not submitted.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || 'Failed to initiate payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setAnswers({});
    setContactInfo({ name: '', email: '', phone: '', businessName: '' });
  };

  return (
    <section className="mt-5 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
            Let&apos;s Get to Know Your Amazon Business
          </h1>
          <p className="text-xl text-gray-600">Answer a few questions so we can design the right Amazon growth strategy for you.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
            <CreditCard size={16} />
            One-time fee: ₹4,999 — paid securely via Razorpay after completing the form
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              {currentStep < questions.length ? `Question ${currentStep + 1} of ${questions.length}` : 'Contact Details'}
            </span>
            <span className="text-sm font-semibold text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep < questions.length ? (
            <QuestionStep
              key={questions[currentStep].id}
              question={questions[currentStep]}
              answers={answers}
              onSingle={handleSingleAnswer}
              onMultiple={handleMultipleAnswer}
              onOther={handleOtherChange}
              onNext={handleNext}
              onPrev={handlePrevious}
              isFirst={currentStep === 0}
              isComplete={isStepComplete()}
            />
          ) : (
            <ContactStep
              key="contact"
              contactInfo={contactInfo}
              contactFields={contactFields}
              onChange={handleContactChange}
              onPrev={handlePrevious}
              onReset={resetForm}
              onPay={handleRazorpayPayment}
              isComplete={isContactInfoComplete()}
              isSubmitting={isSubmitting}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function QuestionStep({ question, answers, onSingle, onMultiple, onOther, onNext, onPrev, isFirst, isComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-200"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">{question.question}</h2>

      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
        {question.options.map((option, index) => {
          const isSingle = question.type === 'single';
          const isSelected = isSingle
            ? answers[question.id] === option
            : Array.isArray(answers[question.id]) && answers[question.id].includes(option);

          return (
            <motion.label
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all group hover:border-black ${
                isSelected ? 'border-black bg-gradient-to-r from-yellow-50 to-orange-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type={isSingle ? 'radio' : 'checkbox'}
                name={question.id}
                value={option}
                checked={isSelected}
                onChange={() => isSingle ? onSingle(question.id, option) : onMultiple(question.id, option)}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 transition-all ${
                isSelected ? 'border-black bg-black' : 'border-gray-300 group-hover:border-black'
              }`}>
                {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-white rounded-full" />}
              </div>
              <span className={`text-lg font-medium transition-colors ${isSelected ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}>
                {option}
              </span>
            </motion.label>
          );
        })}

        {question.hasOther && (
          answers[question.id] === 'Others' || answers[question.id] === 'Other' ||
          (Array.isArray(answers[question.id]) && answers[question.id].some(v => v === 'Others' || v === 'Other'))
        ) && (
          <motion.input
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            type="text"
            placeholder="Please specify"
            value={answers[`${question.id}_other`] || ''}
            onChange={e => onOther(question.id, e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg mt-2"
          />
        )}
      </div>

      <div className="flex justify-between mt-12">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            isFirst ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft size={20} /> Previous
        </button>
        <button
          onClick={onNext}
          disabled={!isComplete}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            isComplete ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

function ContactStep({ contactInfo, contactFields, onChange, onPrev, onReset, onPay, isComplete, isSubmitting }) {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-200"
    >
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <User size={48} className="text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Almost There!</h2>
        <p className="text-xl text-gray-600">Share your contact details, then complete the ₹4,999 payment to submit.</p>
      </div>

      <div className="space-y-6">
        {contactFields.map(field => {
          const Icon = field.icon;
          return (
            <div key={field.id}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.label}{field.required && <span className="text-red-500"> *</span>}
              </label>
              <div className="relative">
                <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={field.id === 'email' ? 'email' : 'text'}
                  placeholder={field.placeholder}
                  value={contactInfo[field.id]}
                  onChange={e => onChange(field.id, e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
          <p className="font-semibold mb-1">What happens after payment?</p>
          <ul className="list-disc list-inside space-y-1 text-yellow-700">
            <li>Your questionnaire is saved securely to our database</li>
            <li>You and our team receive a detailed email summary</li>
            <li>A WhatsApp message with your responses opens automatically</li>
            <li>Our team will reach out within 24 hours</li>
          </ul>
        </div>

        <button
          onClick={onPay}
          disabled={!isComplete || isSubmitting}
          className={`w-full flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-bold text-lg transition-all shadow-lg ${
            isComplete && !isSubmitting
              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700 hover:scale-[1.02]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <CreditCard size={24} />
          )}
          {isSubmitting ? 'Processing...' : 'Pay ₹4,999 & Submit via Razorpay'}
        </button>

        {!isComplete && (
          <p className="text-center text-red-500 mt-3 text-sm">* Please fill in all required fields to continue</p>
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onPrev}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all"
        >
          Start Over
        </button>
      </div>
    </motion.div>
  );
}

export default QuestionnaireSubmission;

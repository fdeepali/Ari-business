import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Mail,
  CheckCircle,
  User,
  Phone,
  Building
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

export default function QuestionnairePageNew() {
  const [currentStep, setCurrentStep] = useState(0);

  // Answers to all non-contact questions
  const [answers, setAnswers] = useState({});

  // Contact details (from contactDetails config)
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ----------------- QUESTION CONFIG -----------------
  const questions = [
    {
      id: 'businessType',
      question: 'Are you a trader or a manufacturer?',
      type: 'single',
      options: ['Trader', 'Manufacturer', 'Both']
    },
    {
      id: 'objective',
      question: 'Are you:',
      type: 'single',
      options: [
        'New to Amazon and want to start selling',
        'Already selling on Amazon and need support',
        'Both (new region + existing account issues)'
      ]
    },
    {
      id: 'targetRegions',
      question: 'Which Amazon regions are you interested in?',
      type: 'multiple',
      options: [
        'India (IN)',
        'USA (US)',
        'UK',
        'EU',
        'Canada (CA)',
        'UAE (AE)',
        'Australia (AU)',
        'Others'
      ],
      hasOther: true
    },
    {
      id: 'hasAmazonAccount',
      question: 'Do you already have an Amazon seller account?',
      type: 'single',
      options: ['Yes', 'No']
    },
    {
      id: 'accountStatus',
      question: 'If yes, what is your account status?',
      type: 'single',
      options: ['Active', 'Deactivated', 'Suspended', 'N/A']
    },
    {
      id: 'productCategory',
      question: 'What is your primary product category?',
      type: 'single',
      options: [
        'Apparel & Fashion',
        'Electronics',
        'Food & Beverages',
        'Home & Kitchen',
        'Beauty & Personal Care',
        'Health & Wellness',
        'Industrial Supplies',
        'Handicrafts',
        'Others'
      ],
      hasOther: true
    },
    {
      id: 'productSource',
      question: 'Are your products:',
      type: 'single',
      options: [
        'Own manufactured items',
        'Private label / White label',
        'Trading / Reselling branded goods'
      ]
    },
    {
      id: 'hasTrademark',
      question: 'Do you have a registered trademark?',
      type: 'single',
      options: [
        'Yes - registered',
        'Application filed but not yet registered',
        'No, but want help filing',
        'No'
      ]
    },
    {
      id: 'hasBrandRegistry',
      question: 'Do you have Brand Registry on any Amazon marketplace?',
      type: 'single',
      options: ['Yes', 'No']
    },
    {
      id: 'restrictedProducts',
      question:
        'Do your products fall under restricted or sensitive categories (health supplements, cosmetics, food, baby products, electronics, batteries, etc.)?',
      type: 'single',
      options: ['Yes', 'No', 'Not sure']
    },
    {
      id: 'certifications',
      question:
        'Do your products require mandatory certifications (FSSAI, BIS, FDA, CE, FCC, etc.)?',
      type: 'single',
      options: [
        'Yes - already have all required',
        'Yes - have some, need others',
        'Yes - need all certifications',
        'No certifications required',
        'Not sure'
      ]
    },
    {
      id: 'fulfillmentModel',
      question: 'Do you plan to use:',
      type: 'single',
      options: [
        'FBA (Fulfillment by Amazon)',
        'FBM (Self-ship)',
        'Both (depends on SKU)',
        'Not decided yet'
      ]
    },
    {
      id: 'hasProductPhotography',
      question: 'Do you have product photography?',
      type: 'single',
      options: ['Yes - studio quality', 'Yes - basic quality', 'No - need support']
    },
    {
      id: 'hasListingContent',
      question:
        'Do you have existing product listings (titles, descriptions, bullet points)?',
      type: 'single',
      options: ['Yes', 'Partially', 'No']
    },
    {
      id: 'ppcExperience',
      question: 'Have you previously run Amazon PPC campaigns?',
      type: 'single',
      options: ['Yes - self-managed', 'Yes - via agency', 'No']
    },
    {
      id: 'servicesNeeded',
      question: 'What specific help are you looking for? (Select all that apply)',
      type: 'multiple',
      options: [
        'New account registration and setup',
        'Product research',
        'Listing creation & optimization',
        'Brand building (A+ content, Storefront)',
        'PPC/Ads and marketing',
        'Inventory / FBA / logistics setup',
        'Compliance, documentation, and taxation',
        'Account health / suspension / appeal',
        'Other'
      ],
      hasOther: true
    },
    {
      id: 'monthlyBudget',
      question: 'What is your approximate monthly budget for Amazon services?',
      type: 'single',
      options: [
        '₹10,000 - ₹25,000',
        '₹25,000 - ₹50,000',
        '₹50,000 - ₹1,00,000',
        'Above ₹1,00,000',
        'Not decided yet'
      ]
    },
    {
      id: 'timeline',
      question: 'How soon are you looking to start?',
      type: 'single',
      options: ['Immediately', 'Within 2 weeks', 'Within 1-3 months', 'Just exploring options']
    },
    {
      id: 'mainObjective',
      question: 'What is your main objective in the next 6-12 months?',
      type: 'single',
      options: [
        'Launch new products',
        'Scale revenue on existing products',
        'Expand to new regions',
        'Fix compliance or account issues',
        'Build brand presence',
        'Other'
      ],
      hasOther: true
    }
  ];

  // Contact fields config
  const contactFields = [
    { id: 'name', label: 'Full Name', required: true, icon: User, placeholder: 'John Doe' },
    {
      id: 'email',
      label: 'Email',
      required: true,
      icon: Mail,
      placeholder: 'john@company.com'
    },
    {
      id: 'phone',
      label: 'WhatsApp/Phone',
      required: true,
      icon: Phone,
      placeholder: '+91 98765 43210'
    },
    {
      id: 'businessName',
      label: 'Business Name',
      required: false,
      icon: Building,
      placeholder: 'Your Brand / Company'
    }
  ];

  const totalSteps = questions.length + 1; // questions + contact step
  const progress = (currentStep / totalSteps) * 100;

  // ----------------- HANDLERS -----------------

  const handleSingleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultipleAnswer = (questionId, value) => {
    setAnswers(prev => {
      const current = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      const exists = current.includes(value);
      const updated = exists ? current.filter(v => v !== value) : [...current, value];
      return {
        ...prev,
        [questionId]: updated
      };
    });
  };

  const handleOtherChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [`${questionId}_other`]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepComplete = () => {
    // Contact step
    if (currentStep >= questions.length) {
      return isContactInfoComplete();
    }

    const currentQuestion = questions[currentStep];
    const ans = answers[currentQuestion.id];

    if (currentQuestion.type === 'single') {
      if (!ans) return false;

      if (
        currentQuestion.hasOther &&
        (ans === 'Others' || ans === 'Other') &&
        !answers[`${currentQuestion.id}_other`]
      ) {
        return false;
      }
      return true;
    }

    if (currentQuestion.type === 'multiple') {
      const arr = Array.isArray(ans) ? ans : [];
      if (arr.length === 0) return false;

      if (
        currentQuestion.hasOther &&
        arr.some(v => v === 'Others' || v === 'Other') &&
        !answers[`${currentQuestion.id}_other`]
      ) {
        return false;
      }
      return true;
    }

    return true;
  };

  const isContactInfoComplete = () => {
    return contactFields.every(field => {
      if (!field.required) return true;
      const value = contactInfo[field.id];
      return value && value.trim() !== '';
    });
  };

  // ----------------- MESSAGE & WHATSAPP -----------------

  const generateMessage = () => {
    let message = '🔔 NEW QUESTIONNAIRE SUBMISSION\n';
    message += '================================\n\n';

    message += '📋 CONTACT INFORMATION\n';
    message += '--------------------------------\n';
    message += `👤 Name: ${contactInfo.name || '-'}\n`;
    message += `🏢 Business Name: ${contactInfo.businessName || '-'}\n`;
    message += `📧 Email: ${contactInfo.email || '-'}\n`;
    message += `📱 WhatsApp/Phone: ${contactInfo.phone || '-'}\n`;
    message += '\n';

    message += '📊 BUSINESS DETAILS\n';
    message += '================================\n\n';

    questions.forEach((q, index) => {
      const ans = answers[q.id];
      if (!ans || (Array.isArray(ans) && ans.length === 0)) return;

      message += `${index + 1}. ${q.question}\n`;

      let answerText = '';

      if (q.type === 'multiple') {
        const arr = Array.isArray(ans) ? ans : [];
        answerText = arr.join(', ');
      } else {
        answerText = ans;
      }

      if (q.hasOther && answers[`${q.id}_other`]) {
        answerText += ` - ${answers[`${q.id}_other`]}`;
      }

      message += `   ✅ ${answerText}\n\n`;
    });

    message += '================================\n';
    message +=
      '📅 Submitted on: ' +
      new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    message += '\n\n💼 ARI Business Network Team';

    return message;
  };

  const openWhatsApp = () => {
    const message = generateMessage();
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919137696515?text=${encodedMessage}`, '_blank');
  };

  // ----------------- SUBMIT HANDLER (BACKEND + WHATSAPP) -----------------

  const handleSubmitAndWhatsApp = async () => {
    setError('');

    if (!isContactInfoComplete() || currentStep < questions.length || !isStepComplete()) {
      const msg = 'Please complete all questions and required contact fields.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);

    try {
      // Build payload expected by backend submitQuestionnaire controller
      const payload = {
        contactInfo,
        businessDetails: answers
      };

      const response = await fetch('https://ari-business-backend-mongodb-production.up.railway.app/api/send-email-to-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit questionnaire');
      }

      toast.success('Questionnaire submitted successfully! Opening WhatsApp...');
      // 1) open WhatsApp
      openWhatsApp();

      // 2) reset form
      setCurrentStep(0);
      setAnswers({});
      setContactInfo({
        name: '',
        email: '',
        phone: '',
        businessName: ''
      });
    } catch (err) {
      console.error('[QUESTIONNAIRE] submit error:', err);
      toast.error(err.message || 'Server error while submitting questionnaire.');
      setError(err.message || 'Server error while submitting questionnaire.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------- RENDER -----------------

  return (
    <section className="mt-5 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-6">
      <ToastContainer />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
            Let's Get to Know Your Amazon Business
          </h1>
          <p className="text-xl text-gray-600">
            Answer a few questions so we can design the right Amazon growth strategy for you.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              {currentStep < questions.length
                ? `Question ${currentStep + 1} of ${questions.length}`
                : 'Contact Details'}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {Math.round(progress)}% Complete
            </span>
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

        {error && (
          <p className="mb-4 text-center text-red-500 text-sm">
            {error}
          </p>
        )}

        <AnimatePresence mode="wait">
          {currentStep < questions.length ? (
            <motion.div
              key={questions[currentStep].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-200"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
                {questions[currentStep].question}
              </h2>

              <div
                className="space-y-4 max-h-[420px] overflow-y-auto pr-2
               scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
              >
                {questions[currentStep].options.map((option, index) => {
                  const q = questions[currentStep];
                  const isSingle = q.type === 'single';
                  const isMultiple = q.type === 'multiple';

                  const selectedSingle = answers[q.id] === option;
                  const selectedMultiple =
                    Array.isArray(answers[q.id]) && answers[q.id].includes(option);

                  const isSelected = isSingle ? selectedSingle : selectedMultiple;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <label
                        className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all group hover:border-black ${
                          isSelected
                            ? 'border-black bg-gradient-to-r from-yellow-50 to-orange-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type={isSingle ? 'radio' : 'checkbox'}
                          name={q.id}
                          value={option}
                          checked={isSelected}
                          onChange={e => {
                            if (isSingle) {
                              handleSingleAnswer(q.id, e.target.value);
                            } else {
                              handleMultipleAnswer(q.id, option);
                            }
                          }}
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                            isSelected
                              ? 'border-black bg-black'
                              : 'border-gray-300 group-hover:border-black'
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 bg-white rounded-full"
                            />
                          )}
                        </div>
                        <span
                          className={`text-lg font-medium transition-colors ${
                            isSelected
                              ? 'text-black'
                              : 'text-gray-700 group-hover:text-black'
                          }`}
                        >
                          {option}
                        </span>
                      </label>
                    </motion.div>
                  );
                })}

                {questions[currentStep].hasOther && (
                  <>
                    {(answers[questions[currentStep].id] === 'Others' ||
                      answers[questions[currentStep].id] === 'Other' ||
                      (Array.isArray(answers[questions[currentStep].id]) &&
                        answers[questions[currentStep].id].some(
                          v => v === 'Others' || v === 'Other'
                        ))) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <input
                          type="text"
                          placeholder="Please specify details"
                          value={answers[`${questions[currentStep].id}_other`] || ''}
                          onChange={e =>
                            handleOtherChange(questions[currentStep].id, e.target.value)
                          }
                          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                        />
                      </motion.div>
                    )}
                  </>
                )}
              </div>

              <div className="flex justify-between mt-12">
                <motion.button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
                  whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
                >
                  <ChevronLeft size={20} />
                  Previous
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  disabled={!isStepComplete()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    isStepComplete()
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={isStepComplete() ? { scale: 1.05 } : {}}
                  whileTap={isStepComplete() ? { scale: 0.95 } : {}}
                >
                  Next
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-200"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <User size={48} className="text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  Almost There! Share Your Contact Details
                </h2>
                <p className="text-xl text-gray-600">
                  Help us reach out to you with a personalised Amazon strategy.
                </p>
              </div>

              <div className="space-y-6">
                {contactFields.map(field => {
                  const Icon = field.icon;
                  return (
                    <div key={field.id}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500"> *</span>}
                      </label>
                      <div className="relative">
                        <Icon
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type={field.id === 'email' ? 'email' : 'text'}
                          placeholder={field.placeholder}
                          value={contactInfo[field.id]}
                          onChange={e => handleContactChange(field.id, e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12">
                <p className="text-center text-gray-600 mb-6">
                  Submit your details and we will send them to our team and open WhatsApp with a
                  pre-filled message.
                </p>
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  <motion.button
                    onClick={handleSubmitAndWhatsApp}
                    disabled={!isContactInfoComplete() || isSubmitting}
                    className={`flex-1 flex flex-col items-center justify-center p-8 rounded-2xl transition-all shadow-lg group ${
                      isContactInfoComplete() && !isSubmitting
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 cursor-pointer'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={
                      isContactInfoComplete() && !isSubmitting
                        ? { scale: 1.05, boxShadow: '0 20px 40px rgba(22, 163, 74, 0.4)' }
                        : {}
                    }
                    whileTap={isContactInfoComplete() && !isSubmitting ? { scale: 0.95 } : {}}
                  >
                    <CheckCircle
                      size={48}
                      className="mb-4 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-2xl font-bold mb-2">
                      {isSubmitting ? 'Submitting...' : 'Submit & Open WhatsApp'}
                    </span>
                    <span
                      className={`text-center ${
                        isContactInfoComplete() && !isSubmitting ? 'text-green-50' : 'text-gray-500'
                      }`}
                    >
                      We will save your responses, email them to our team and then open WhatsApp
                      with your details.
                    </span>
                  </motion.button>

                  <motion.div className="flex-1 flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-green-400 bg-green-50 text-green-700">
                    <MessageCircle size={40} className="mb-3" />
                    <span className="font-semibold mb-1">WhatsApp Confirmation</span>
                    <span className="text-sm text-center">
                      After successful submission, a WhatsApp chat with us will open automatically
                      with your responses filled in.
                    </span>
                  </motion.div>
                </div>

                {!isContactInfoComplete() && (
                  <p className="text-center text-red-500 mt-4 text-sm">
                    * Please fill in all required fields to continue
                  </p>
                )}
              </div>

              <motion.button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setContactInfo({
                    name: '',
                    email: '',
                    phone: '',
                    businessName: ''
                  });
                  setError('');
                }}
                className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft size={20} />
                Start Over
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

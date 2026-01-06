import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Mail,
  CheckCircle,
  User,
  Phone,
  Building,
  CreditCard
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Script URLs
const RAZORPAY_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';
const PAYPAL_SCRIPT_SRC = 'https://www.paypal.com/sdk/js?client-id=' + import.meta.env.VITE_PAYPAL_CLIENT_ID + '&currency=USD';

function QuestionnaireSubmission() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // Backend URL - change for production
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // ----------------- LOAD PAYMENT SCRIPTS -----------------
  useEffect(() => {
    // Load Razorpay
    const existingRazorpay = document.querySelector(`script[src="${RAZORPAY_SCRIPT_SRC}"]`);
    if (existingRazorpay) {
      setRazorpayLoaded(true);
    } else {
      const razorpayScript = document.createElement('script');
      razorpayScript.src = RAZORPAY_SCRIPT_SRC;
      razorpayScript.async = true;
      razorpayScript.onload = () => setRazorpayLoaded(true);
      razorpayScript.onerror = () => {
        setRazorpayLoaded(false);
        toast.error('Failed to load Razorpay. Please refresh.');
      };
      document.body.appendChild(razorpayScript);
    }

    // Load PayPal
    const existingPaypal = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
    if (existingPaypal) {
      setPaypalLoaded(true);
    } else {
      const paypalScript = document.createElement('script');
      paypalScript.src = PAYPAL_SCRIPT_SRC;
      paypalScript.async = true;
      paypalScript.onload = () => setPaypalLoaded(true);
      paypalScript.onerror = () => {
        setPaypalLoaded(false);
        toast.error('Failed to load PayPal. Please refresh.');
      };
      document.body.appendChild(paypalScript);
    }
  }, []);

  // ----------------- QUESTION CONFIG -----------------
  const questions = [
    {
      id: 'businessType',
      question: 'Are you a trader or a manufacturer?',
      type: 'single',
      options: ['Trader', 'Manufacturer', 'Both']
    },
    // {
    //   id: 'objective',
    //   question: 'Are you:',
    //   type: 'single',
    //   options: [
    //     'New to Amazon and want to start selling',
    //     'Already selling on Amazon and need support',
    //     'Both (new region + existing account issues)'
    //   ]
    // },
    // {
    //   id: 'targetRegions',
    //   question: 'Which Amazon regions are you interested in?',
    //   type: 'multiple',
    //   options: [
    //     'India (IN)',
    //     'USA (US)',
    //     'UK',
    //     'EU',
    //     'Canada (CA)',
    //     'UAE (AE)',
    //     'Australia (AU)',
    //     'Others'
    //   ],
    //   hasOther: true
    // },
    // {
    //   id: 'hasAmazonAccount',
    //   question: 'Do you already have an Amazon seller account?',
    //   type: 'single',
    //   options: ['Yes', 'No']
    // },
    // {
    //   id: 'accountStatus',
    //   question: 'If yes, what is your account status?',
    //   type: 'single',
    //   options: ['Active', 'Deactivated', 'Suspended', 'N/A']
    // },
    // {
    //   id: 'productCategory',
    //   question: 'What is your primary product category?',
    //   type: 'single',
    //   options: [
    //     'Apparel & Fashion',
    //     'Electronics',
    //     'Food & Beverages',
    //     'Home & Kitchen',
    //     'Beauty & Personal Care',
    //     'Health & Wellness',
    //     'Industrial Supplies',
    //     'Handicrafts',
    //     'Others'
    //   ],
    //   hasOther: true
    // },
    // {
    //   id: 'productSource',
    //   question: 'Are your products:',
    //   type: 'single',
    //   options: [
    //     'Own manufactured items',
    //     'Private label / White label',
    //     'Trading / Reselling branded goods'
    //   ]
    // },
    // {
    //   id: 'hasTrademark',
    //   question: 'Do you have a registered trademark?',
    //   type: 'single',
    //   options: [
    //     'Yes - registered',
    //     'Application filed but not yet registered',
    //     'No, but want help filing',
    //     'No'
    //   ]
    // },
    // {
    //   id: 'hasBrandRegistry',
    //   question: 'Do you have Brand Registry on any Amazon marketplace?',
    //   type: 'single',
    //   options: ['Yes', 'No']
    // },
    // {
    //   id: 'restrictedProducts',
    //   question:
    //     'Do your products fall under restricted or sensitive categories (health supplements, cosmetics, food, baby products, electronics, batteries, etc.)?',
    //   type: 'single',
    //   options: ['Yes', 'No', 'Not sure']
    // },
    // {
    //   id: 'certifications',
    //   question:
    //     'Do your products require mandatory certifications (FSSAI, BIS, FDA, CE, FCC, etc.)?',
    //   type: 'single',
    //   options: [
    //     'Yes - already have all required',
    //     'Yes - have some, need others',
    //     'Yes - need all certifications',
    //     'No certifications required',
    //     'Not sure'
    //   ]
    // },
    // {
    //   id: 'fulfillmentModel',
    //   question: 'Do you plan to use:',
    //   type: 'single',
    //   options: [
    //     'FBA (Fulfillment by Amazon)',
    //     'FBM (Self-ship)',
    //     'Both (depends on SKU)',
    //     'Not decided yet'
    //   ]
    // },
    // {
    //   id: 'hasProductPhotography',
    //   question: 'Do you have product photography?',
    //   type: 'single',
    //   options: ['Yes - studio quality', 'Yes - basic quality', 'No - need support']
    // },
    // {
    //   id: 'hasListingContent',
    //   question:
    //     'Do you have existing product listings (titles, descriptions, bullet points)?',
    //   type: 'single',
    //   options: ['Yes', 'Partially', 'No']
    // },
    // {
    //   id: 'ppcExperience',
    //   question: 'Have you previously run Amazon Sales Growth Campaigns campaigns?',
    //   type: 'single',
    //   options: ['Yes - self-managed', 'Yes - via agency', 'No']
    // },
    // {
    //   id: 'servicesNeeded',
    //   question: 'What specific help are you looking for? (Select all that apply)',
    //   type: 'multiple',
    //   options: [
    //     'New account registration and setup',
    //     'Product research',
    //     'Listing creation & optimization',
    //     'Brand building (A+ content, Storefront)',
    //     'Sales Growth Campaigns/Ads and marketing',
    //     'Inventory / FBA / logistics setup',
    //     'Compliance, documentation, and taxation',
    //     'Account health / suspension / appeal',
    //     'Other'
    //   ],
    //   hasOther: true
    // },
    // {
    //   id: 'monthlyBudget',
    //   question: 'What is your approximate monthly budget for Amazon services?',
    //   type: 'single',
    //   options: [
    //     '₹10,000 - ₹25,000',
    //     '₹25,000 - ₹50,000',
    //     '₹50,000 - ₹1,00,000',
    //     'Above ₹1,00,000',
    //     'Not decided yet'
    //   ]
    // },
    // {
    //   id: 'timeline',
    //   question: 'How soon are you looking to start?',
    //   type: 'single',
    //   options: ['Immediately', 'Within 2 weeks', 'Within 1-3 months', 'Just exploring options']
    // },
    // {
    //   id: 'mainObjective',
    //   question: 'What is your main objective in the next 6-12 months?',
    //   type: 'single',
    //   options: [
    //     'Launch new products',
    //     'Scale revenue on existing products',
    //     'Expand to new regions',
    //     'Fix compliance or account issues',
    //     'Build brand presence',
    //     'Other'
    //   ],
    //   hasOther: true
    // }
  ];

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

  const totalSteps = questions.length + 1;
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

  const isContactInfoComplete = () => {
    return contactFields.every(field => {
      if (!field.required) return true;
      const value = contactInfo[field.id];
      return value && value.trim() !== '';
    });
  };

  const isStepComplete = () => {
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

  // ----------------- BACKEND SUBMISSION HELPERS -----------------
  const submitQuestionnaireToBackend = async () => {
    const backendPayload = {
      contactInfo,
      businessDetails: answers
    };

    const backendResponse = await fetch(`${BACKEND_URL}/api/questionnaire`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(backendPayload)
    });

    if (!backendResponse.ok) {
      const text = await backendResponse.text();
      throw new Error(text || 'Backend questionnaire submission failed');
    }

    const backendData = await backendResponse.json();
    console.log('Questionnaire saved:', backendData);
    return backendData;
  };

  const submitToWeb3Forms = async () => {
    const formData = new FormData();
    formData.append('access_key', 'fcac1743-0e41-404a-bba1-70105e78370b');
    formData.append('subject', `🔔 New Amazon Questionnaire - ${contactInfo.name}`);
    formData.append('message', generateMessage());
    formData.append('name', contactInfo.name);
    formData.append('email', contactInfo.email);
    formData.append('phone', contactInfo.phone);
    formData.append('businessName', contactInfo.businessName || '');

    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const web3Data = await web3Response.json();
    return web3Data;
  };

  // ----------------- RAZORPAY PAYMENT FLOW -----------------
  const createRazorpayOrder = async () => {
    const res = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: contactInfo.email })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to create Razorpay order');
    }

    const data = await res.json();
    if (!data?.data?.id) {
      throw new Error('Invalid order response from backend');
    }
    return data.data;
  };

  const verifyRazorpayPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const res = await fetch(`${BACKEND_URL}/api/payment/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Payment verification failed');
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error('Payment signature mismatch');
    }
    return data;
  };

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded || !window.Razorpay) {
      toast.error('Razorpay is still loading. Please wait a moment and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createRazorpayOrder();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_RlrlyR48l9GaOu',
        amount: order.amount,
        currency: order.currency || 'USD',
        name: 'ARI Business Network',
        description: 'Amazon Business Questionnaire Fee',
        order_id: order.id,
        prefill: {
          name: contactInfo.name,
          email: contactInfo.email,
          contact: contactInfo.phone
        },
        theme: {
          color: '#facc15'
        },
        handler: async function (response) {
          try {
            await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            await submitQuestionnaireToBackend();

            const web3Data = await submitToWeb3Forms();
            if (!web3Data.success) {
              toast.warning('Payment successful & saved, but email delivery failed.');
            } else {
              toast.success('Payment & questionnaire submitted successfully!');
            }

            setTimeout(() => {
              openWhatsApp();
            }, 800);

            setCurrentStep(0);
            setAnswers({});
            setContactInfo({ name: '', email: '', phone: '', businessName: '' });
            setShowPaymentOptions(false);
          } catch (err) {
            console.error('Post-payment flow error:', err);
            toast.error(err.message || 'Failed after payment. Please contact support.');
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            toast.info('Payment popup closed. Questionnaire not submitted.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('[RAZORPAY] payment init error:', err);
      toast.error(err.message || 'Failed to initiate Razorpay payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  // ----------------- PAYPAL PAYMENT FLOW -----------------
  const handlePayPalPayment = async () => {
    if (!paypalLoaded || !window.paypal) {
      toast.error('PayPal is still loading. Please wait a moment and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create PayPal order on backend
      const res = await fetch(`${BACKEND_URL}/api/paypal/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          origin: window.location.origin
        },
        body: JSON.stringify({ email: contactInfo.email })
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to create PayPal order');
      }

      const orderData = await res.json();
      
      if (!orderData.id) {
        throw new Error('Invalid PayPal order response');
      }

      // Open PayPal modal
      window.paypal.Buttons({
        createOrder: function() {
          return orderData.id;
        },
        onApprove: async function(data) {
          try {
            // Capture payment
            const captureRes = await fetch(`${BACKEND_URL}/api/paypal/capture-order`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                orderID: data.orderID,
                email: contactInfo.email 
              })
            });

            if (!captureRes.ok) {
              throw new Error('Failed to capture PayPal payment');
            }

            const captureData = await captureRes.json();
            
            if (captureData.success) {
              // Save questionnaire
              await submitQuestionnaireToBackend();

              // Send to Web3Forms
              const web3Data = await submitToWeb3Forms();
              if (!web3Data.success) {
                toast.warning('Payment successful & saved, but email delivery failed.');
              } else {
                toast.success('PayPal payment & questionnaire submitted successfully!');
              }

              setTimeout(() => {
                openWhatsApp();
              }, 800);

              setCurrentStep(0);
              setAnswers({});
              setContactInfo({ name: '', email: '', phone: '', businessName: '' });
              setShowPaymentOptions(false);
            } else {
              throw new Error('Payment capture failed');
            }
          } catch (err) {
            console.error('PayPal capture error:', err);
            toast.error(err.message || 'Failed after PayPal payment. Please contact support.');
          } finally {
            setIsSubmitting(false);
          }
        },
        onCancel: function() {
          setIsSubmitting(false);
          toast.info('PayPal payment cancelled.');
        },
        onError: function(err) {
          console.error('PayPal error:', err);
          setIsSubmitting(false);
          toast.error('PayPal payment failed. Please try again.');
        }
      }).render('#paypal-button-container');

    } catch (err) {
      console.error('[PAYPAL] payment init error:', err);
      toast.error(err.message || 'Failed to initiate PayPal payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  // ----------------- SHOW PAYMENT OPTIONS -----------------
  const handleShowPaymentOptions = () => {
    setError('');

    if (!isContactInfoComplete() || currentStep < questions.length || !isStepComplete()) {
      const msg = 'Please complete all questions and required contact fields.';
      toast.error(msg);
      return;
    }

    setShowPaymentOptions(true);
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
            Let&apos;s Get to Know Your Amazon Business
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
          ) : !showPaymentOptions ? (
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
                  Submit your details and choose your preferred payment method to complete your questionnaire.
                </p>
                <div className="flex flex-col gap-6 items-stretch">
                  <motion.button
                    onClick={handleShowPaymentOptions}
                    disabled={!isContactInfoComplete() || isSubmitting}
                    className={`flex items-center justify-center gap-3 p-6 rounded-2xl transition-all shadow-lg ${
                      isContactInfoComplete() && !isSubmitting
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 cursor-pointer'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={
                      isContactInfoComplete() && !isSubmitting
                        ? { scale: 1.02, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }
                        : {}
                    }
                    whileTap={isContactInfoComplete() && !isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <CreditCard size={32} />
                    <span className="text-2xl font-bold">
                      Continue to Payment Options
                    </span>
                  </motion.button>

                  {!isContactInfoComplete() && (
                    <p className="text-center text-red-500 text-sm">
                      * Please fill in all required fields to continue
                    </p>
                  )}
                </div>
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
          ) : (
            <motion.div
              key="payment"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-200"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CreditCard size={48} className="text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  Choose Your Payment Method
                </h2>
                <p className="text-xl text-gray-600 mb-2">
                  Complete your payment of $52 to submit your questionnaire
                </p>
                <p className="text-sm text-gray-500">
                  After successful payment, your responses will be saved and sent to our team via email, and WhatsApp will open automatically.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Razorpay Option */}
                <motion.button
                  onClick={handleRazorpayPayment}
                  disabled={isSubmitting || !razorpayLoaded}
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all ${
                    razorpayLoaded && !isSubmitting
                      ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:border-yellow-500 hover:shadow-xl cursor-pointer'
                      : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                  }`}
                  whileHover={razorpayLoaded && !isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={razorpayLoaded && !isSubmitting ? { scale: 0.95 } : {}}
                >
                  <div className="w-20 h-20 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 512 512" className="w-full h-full">
                      <path fill="#0C2451" d="M234.9 265.8L146.8 387.5c-3.8 5.2-10.1 8-16.7 7.9-10.2-.3-18.4-8.8-18.1-19 .1-3.2 1-6.4 2.7-9.1l107.8-172.8h-99.3c-11.3 0-20.5-9.2-20.5-20.5s9.2-20.5 20.5-20.5h217.6c6.5 0 12.5 3.1 16.3 8.3 5.4 7.5 3.8 17.9-3.5 23.5l-118.7 81.5z"/>
                      <path fill="#5F259F" d="M477.5 153.5h-106c-11.3 0-20.5-9.2-20.5-20.5s9.2-20.5 20.5-20.5h106c11.3 0 20.5 9.2 20.5 20.5s-9.2 20.5-20.5 20.5zm-49.6 87.5h-56.4c-11.3 0-20.5-9.2-20.5-20.5s9.2-20.5 20.5-20.5h56.4c11.3 0 20.5 9.2 20.5 20.5s-9.2 20.5-20.5 20.5z"/>
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-gray-800 mb-2">Pay with Razorpay</span>
                  <span className="text-sm text-gray-600 text-center">
                    {razorpayLoaded ? 'Credit/Debit Card, UPI, Netbanking' : 'Loading...'}
                  </span>
                  <span className="text-2xl font-bold text-yellow-600 mt-3">$52</span>
                </motion.button>

                {/* PayPal Option */}
                {/* <motion.button
                  onClick={handlePayPalPayment}
                  disabled={isSubmitting || !paypalLoaded}
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all ${
                    paypalLoaded && !isSubmitting
                      ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 hover:border-blue-500 hover:shadow-xl cursor-pointer'
                      : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                  }`}
                  whileHover={paypalLoaded && !isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={paypalLoaded && !isSubmitting ? { scale: 0.95 } : {}}
                >
                  <div className="w-20 h-20 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 512 512" className="w-full h-full">
                      <path fill="#003087" d="M377 184.8L180.7 399h-72L134 124.8h121.9c42.6 0 72.7 9.3 90.4 27.8 17.7 18.5 26.6 45.5 26.6 81 .1 19.2-2.9 36.7-8.9 52.2z"/>
                      <path fill="#009CDE" d="M380.2 184.8c-1.5 10.7-4.1 20.9-7.7 30.5-15.2 40.6-53.2 62.2-113.4 62.2h-28.3L209 399h-72l25.3-124.7h28.3c60.2 0 98.2-21.6 113.4-62.2 3.6-9.6 6.2-19.8 7.7-30.5 0 0 31.3.4 68.5 2.2z"/>
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-gray-800 mb-2">Pay with PayPal</span>
                  <span className="text-sm text-gray-600 text-center">
                    {paypalLoaded ? 'International payment method' : 'Loading...'}
                  </span>
                  <span className="text-2xl font-bold text-blue-600 mt-3">$52</span>
                </motion.button> */}
              </div>

              {/* PayPal Button Container (Hidden but necessary) */}
              <div id="paypal-button-container" className="hidden"></div>

              <div className="flex items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-green-400 bg-green-50 text-green-700 mb-6">
                <MessageCircle size={32} />
                <div className="text-left">
                  <span className="font-semibold block mb-1">WhatsApp Confirmation</span>
                  <span className="text-sm">
                    After successful payment, a WhatsApp chat with us will open automatically with your responses.
                  </span>
                </div>
              </div>

              {isSubmitting && (
                <p className="text-center text-blue-600 font-semibold mb-4">
                  Processing payment... Please wait.
                </p>
              )}

              <motion.button
                onClick={() => setShowPaymentOptions(false)}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft size={20} />
                Back to Contact Details
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default QuestionnaireSubmission;

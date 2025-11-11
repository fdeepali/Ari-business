import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MessageCircle, Mail, CheckCircle, User, Phone, MapPin, Globe, Building } from 'lucide-react';

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    businessType: '',
    hasLogo: '',
    hasTrademark: '',
    isRegisteredBrand: '',
    isPrivateLimited: '',
    partnerCount: '',
    productCategory: '',
    categoryOther: '',
    tradeType: '',
    hasMediaAssets: ''
  });

  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  });

  const questions = [
    {
      id: 'businessType',
      question: 'Are you a trader or a manufacturer?',
      type: 'single',
      options: ['Trader', 'Manufacturer']
    },
    {
      id: 'hasLogo',
      question: 'Do you have a logo?',
      type: 'single',
      options: ['Yes', "No, but I'd like you to design one for me"]
    },
    {
      id: 'hasTrademark',
      question: 'Do you have a registered trademark?',
      type: 'single',
      options: ['Yes', "No, but I'd like to get it registered"]
    },
    {
      id: 'isRegisteredBrand',
      question: 'Are you a registered brand?',
      type: 'single',
      options: ['Yes', 'No']
    },
    {
      id: 'isPrivateLimited',
      question: 'Are you a Private Limited company?',
      type: 'single',
      options: ['Yes', 'No']
    },
    {
      id: 'partnerCount',
      question: 'How many partners do you have?',
      type: 'single',
      options: ['1', '2–5', '6–10', 'More than 10']
    },
    {
      id: 'productCategory',
      question: 'What kind of product category do you fall under?',
      type: 'single',
      options: [
        'Apparel & Fashion',
        'Electronics',
        'Food & Beverages',
        'Furniture & Home Decor',
        'Industrial Supplies',
        'Health & Beauty',
        'Handicrafts',
        'Others'
      ],
      hasOther: true
    },
    {
      id: 'tradeType',
      question: 'Are you looking for domestic or international trade?',
      type: 'single',
      options: ['Domestic', 'International (We can help you obtain an IEC code)']
    },
    {
      id: 'hasMediaAssets',
      question: 'Do you have product photography or videography?',
      type: 'single',
      options: ['Yes', "No, but I'd like to get it done"]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
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
    if (currentStep >= questions.length) return true;
    const currentQuestion = questions[currentStep];
    const answer = answers[currentQuestion.id];
    
    if (!answer) return false;
    if (currentQuestion.hasOther && answer === 'Others' && !answers.categoryOther) {
      return false;
    }
    return true;
  };

  const isContactInfoComplete = () => {
    return contactInfo.fullName.trim() !== '' &&
           contactInfo.email.trim() !== '' &&
           contactInfo.phone.trim() !== '' &&
           contactInfo.companyName.trim() !== '' &&
           contactInfo.city.trim() !== '' &&
           contactInfo.country.trim() !== '';
  };

  const generateMessage = () => {
    let message = "🔔 NEW QUESTIONNAIRE SUBMISSION\n";
    message += "================================\n\n";
    
    message += "📋 CONTACT INFORMATION\n";
    message += "--------------------------------\n";
    message += `👤 Name: ${contactInfo.fullName}\n`;
    message += `🏢 Company: ${contactInfo.companyName}\n`;
    message += `📧 Email: ${contactInfo.email}\n`;
    message += `📱 Phone: ${contactInfo.phone}\n`;
    message += `📍 Location: ${contactInfo.city}${contactInfo.state ? ', ' + contactInfo.state : ''}, ${contactInfo.country}\n`;
    if (contactInfo.pincode) message += `📮 Pincode: ${contactInfo.pincode}\n`;
    if (contactInfo.address) message += `🏠 Address: ${contactInfo.address}\n`;
    message += "\n";
    
    message += "📊 BUSINESS DETAILS\n";
    message += "================================\n\n";
    
    questions.forEach((q, index) => {
      const answer = answers[q.id];
      if (answer) {
        message += `${index + 1}. ${q.question}\n`;
        message += `   ✅ ${answer}`;
        if (q.id === 'productCategory' && answer === 'Others' && answers.categoryOther) {
          message += ` - ${answers.categoryOther}`;
        }
        message += '\n\n';
      }
    });
    
    message += "================================\n";
    message += "📅 Submitted on: " + new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    message += "\n\n💼 ARI Business Network Team";
    
    return message;
  };

  const handleWhatsApp = () => {
    const message = generateMessage();
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919137696515?text=${encodedMessage}`, '_blank');
  };

  const handleEmail = () => {
    const message = generateMessage();
    const subject = encodeURIComponent(`New Lead: ${contactInfo.fullName} - ${contactInfo.companyName} | Questionnaire Response`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:info@aribusinessnetwork.com?subject=${subject}&body=${body}`;
  };

  const progress = ((currentStep) / questions.length) * 100;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
            Let's Get to Know Your Business
          </h1>
          <p className="text-xl text-gray-600">
            Answer a few questions to help us understand your needs better
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              {currentStep < questions.length ? `Question ${currentStep + 1} of ${questions.length}` : 'Contact Details'}
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
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          {currentStep < questions.length ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-200"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
                {questions[currentStep].question}
              </h2>

              <div className="space-y-4">
                {questions[currentStep].options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <label
                      className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all group hover:border-black ${
                        answers[questions[currentStep].id] === option
                          ? 'border-black bg-gradient-to-r from-yellow-50 to-orange-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={questions[currentStep].id}
                        value={option}
                        checked={answers[questions[currentStep].id] === option}
                        onChange={(e) => handleAnswer(questions[currentStep].id, e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                        answers[questions[currentStep].id] === option
                          ? 'border-black bg-black'
                          : 'border-gray-300 group-hover:border-black'
                      }`}>
                        {answers[questions[currentStep].id] === option && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-white rounded-full"
                          />
                        )}
                      </div>
                      <span className={`text-lg font-medium transition-colors ${
                        answers[questions[currentStep].id] === option
                          ? 'text-black'
                          : 'text-gray-700 group-hover:text-black'
                      }`}>
                        {option}
                      </span>
                    </label>
                  </motion.div>
                ))}

                {/* Other input field */}
                {questions[currentStep].hasOther && answers[questions[currentStep].id] === 'Others' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <input
                      type="text"
                      placeholder="Please specify your category"
                      value={answers.categoryOther}
                      onChange={(e) => setAnswers(prev => ({ ...prev, categoryOther: e.target.value }))}
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                    />
                  </motion.div>
                )}
              </div>

              {/* Navigation Buttons */}
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
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <User size={48} className="text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  Almost There! Share Your Contact Details
                </h2>
                <p className="text-xl text-gray-600">
                  Help us reach out to you with the perfect solutions
                </p>
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={contactInfo.fullName}
                      onChange={(e) => handleContactChange('fullName', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Your Company Pvt Ltd"
                      value={contactInfo.companyName}
                      onChange={(e) => handleContactChange('companyName', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        placeholder="john@company.com"
                        value={contactInfo.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={contactInfo.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                    <textarea
                      placeholder="123 Business Street, Commercial Area"
                      value={contactInfo.address}
                      onChange={(e) => handleContactChange('address', e.target.value)}
                      rows={2}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg resize-none"
                    />
                  </div>
                </div>

                {/* City, State, Country, Pincode */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="Mumbai"
                      value={contactInfo.city}
                      onChange={(e) => handleContactChange('city', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      placeholder="Maharashtra"
                      value={contactInfo.state}
                      onChange={(e) => handleContactChange('state', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="India"
                        value={contactInfo.country}
                        onChange={(e) => handleContactChange('country', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pincode/ZIP
                    </label>
                    <input
                      type="text"
                      placeholder="400001"
                      value={contactInfo.pincode}
                      onChange={(e) => handleContactChange('pincode', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Options */}
              <div className="mt-12">
                <p className="text-center text-gray-600 mb-6">
                  Choose how you'd like to send us your information
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.button
                    onClick={handleWhatsApp}
                    disabled={!isContactInfoComplete()}
                    className={`flex flex-col items-center justify-center p-8 rounded-2xl transition-all shadow-lg group ${
                      isContactInfoComplete()
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 cursor-pointer'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={isContactInfoComplete() ? { scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" } : {}}
                    whileTap={isContactInfoComplete() ? { scale: 0.95 } : {}}
                  >
                    <MessageCircle size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold mb-2">WhatsApp</span>
                    <span className={`text-center ${isContactInfoComplete() ? 'text-green-100' : 'text-gray-500'}`}>
                      Send your responses via WhatsApp
                    </span>
                    <span className={`text-sm mt-2 ${isContactInfoComplete() ? 'text-green-100' : 'text-gray-500'}`}>
                      +91 91376 96515
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={handleEmail}
                    disabled={!isContactInfoComplete()}
                    className={`flex flex-col items-center justify-center p-8 rounded-2xl transition-all shadow-lg group ${
                      isContactInfoComplete()
                        ? 'bg-gradient-to-br from-black to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 cursor-pointer'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={isContactInfoComplete() ? { scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" } : {}}
                    whileTap={isContactInfoComplete() ? { scale: 0.95 } : {}}
                  >
                    <Mail size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold mb-2">Email</span>
                    <span className={`text-center ${isContactInfoComplete() ? 'text-gray-300' : 'text-gray-500'}`}>
                      Send your responses via email
                    </span>
                    <span className={`text-sm mt-2 ${isContactInfoComplete() ? 'text-gray-300' : 'text-gray-500'}`}>
                      info@aribusinessnetwork.com
                    </span>
                  </motion.button>
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
                  setAnswers({
                    businessType: '',
                    hasLogo: '',
                    hasTrademark: '',
                    isRegisteredBrand: '',
                    isPrivateLimited: '',
                    partnerCount: '',
                    productCategory: '',
                    categoryOther: '',
                    tradeType: '',
                    hasMediaAssets: ''
                  });
                  setContactInfo({
                    fullName: '',
                    email: '',
                    phone: '',
                    companyName: '',
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                    pincode: ''
                  });
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
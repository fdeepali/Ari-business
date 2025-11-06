import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Target, Package, Globe, TrendingUp, DollarSign, Shield, Truck, BarChart3, Users, AlertCircle, CheckCircle, Zap } from 'lucide-react';

const CrossBorderSellerQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questionFlows = [
    {
      id: 'seller-stage',
      category: 'Business Stage',
      icon: Target,
      color: 'from-blue-500 to-blue-700',
      question: 'What stage is your business currently at?',
      type: 'single',
      options: [
        { value: 'exploring', label: 'Exploring cross-border selling', description: 'Just researching opportunities' },
        { value: 'planning', label: 'Planning to launch', description: 'Ready to start within 3-6 months' },
        { value: 'new-seller', label: 'New seller (0-6 months)', description: 'Recently started selling' },
        { value: 'established', label: 'Established seller (6+ months)', description: 'Active with consistent sales' },
        { value: 'scaling', label: 'Scaling operations', description: 'Looking to expand significantly' }
      ]
    },
    {
      id: 'target-markets',
      category: 'Market Expansion',
      icon: Globe,
      color: 'from-purple-500 to-purple-700',
      question: 'Which Amazon marketplaces are you selling in or planning to sell in?',
      type: 'multiple',
      options: [
        { value: 'usa', label: 'USA (Amazon.com)', flag: '🇺🇸' },
        { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
        { value: 'germany', label: 'Germany', flag: '🇩🇪' },
        { value: 'france', label: 'France', flag: '🇫🇷' },
        { value: 'italy', label: 'Italy', flag: '🇮🇹' },
        { value: 'spain', label: 'Spain', flag: '🇪🇸' },
        { value: 'canada', label: 'Canada', flag: '🇨🇦' },
        { value: 'japan', label: 'Japan', flag: '🇯🇵' },
        { value: 'australia', label: 'Australia', flag: '🇦🇺' },
        { value: 'uae', label: 'UAE', flag: '🇦🇪' },
        { value: 'india', label: 'India (Domestic)', flag: '🇮🇳' }
      ]
    },
    {
      id: 'product-catalog',
      category: 'Product Management',
      icon: Package,
      color: 'from-green-500 to-green-700',
      question: 'What is your current catalog status?',
      type: 'single',
      options: [
        { value: 'no-products', label: 'No products listed yet', description: 'Starting from scratch' },
        { value: '1-10', label: '1-10 products', description: 'Small catalog' },
        { value: '11-50', label: '11-50 products', description: 'Growing catalog' },
        { value: '51-200', label: '51-200 products', description: 'Medium catalog' },
        { value: '200+', label: '200+ products', description: 'Large catalog' }
      ]
    },
    {
      id: 'catalog-optimization',
      category: 'Content Quality',
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      question: 'How would you rate your product listings?',
      type: 'single',
      options: [
        { value: 'basic', label: 'Basic listings', description: 'Minimal content, few images' },
        { value: 'average', label: 'Average optimization', description: 'Some keywords, decent images' },
        { value: 'good', label: 'Well optimized', description: 'Good content, quality images' },
        { value: 'excellent', label: 'Fully optimized', description: 'A+ content, all 9 images, perfect SEO' },
        { value: 'need-help', label: 'Need professional help', description: 'Not sure where to start' }
      ]
    },
    {
      id: 'fulfillment-method',
      category: 'Fulfillment Strategy',
      icon: Truck,
      color: 'from-indigo-500 to-indigo-700',
      question: 'What fulfillment method are you using or planning to use?',
      type: 'multiple',
      options: [
        { value: 'fba', label: 'FBA (Fulfillment by Amazon)', description: 'Amazon handles storage & shipping' },
        { value: 'fbm', label: 'FBM (Fulfilled by Merchant)', description: 'You handle shipping' },
        { value: '3pl', label: 'Third-party logistics (3PL)', description: 'External warehouse partner' },
        { value: 'hybrid', label: 'Hybrid approach', description: 'Combination of methods' },
        { value: 'undecided', label: 'Still deciding', description: 'Need guidance' }
      ]
    },
    {
      id: 'logistics-challenges',
      category: 'Logistics & Supply Chain',
      icon: AlertCircle,
      color: 'from-red-500 to-red-700',
      question: 'What logistics challenges are you facing or concerned about?',
      type: 'multiple',
      options: [
        { value: 'international-shipping', label: 'International shipping costs', description: 'High freight expenses' },
        { value: 'customs', label: 'Customs & duties', description: 'Complex regulations' },
        { value: 'inventory-management', label: 'Inventory management', description: 'Stock optimization' },
        { value: 'fba-prep', label: 'FBA preparation', description: 'Labeling & packaging requirements' },
        { value: 'returns', label: 'Returns handling', description: 'Cross-border returns' },
        { value: 'excess-inventory', label: 'Excess inventory', description: 'Overstock issues' },
        { value: 'none', label: 'No major challenges', description: 'Running smoothly' }
      ]
    },
    {
      id: 'advertising-budget',
      category: 'Advertising & Marketing',
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-700',
      question: 'What is your monthly advertising budget or planned budget?',
      type: 'single',
      options: [
        { value: 'no-budget', label: 'Not advertising yet', description: '$0/month' },
        { value: 'small', label: 'Small budget', description: 'Under $1,000/month' },
        { value: 'medium', label: 'Medium budget', description: '$1,000 - $5,000/month' },
        { value: 'large', label: 'Large budget', description: '$5,000 - $20,000/month' },
        { value: 'enterprise', label: 'Enterprise budget', description: '$20,000+/month' }
      ]
    },
    {
      id: 'ppc-experience',
      category: 'PPC Management',
      icon: BarChart3,
      color: 'from-teal-500 to-cyan-700',
      question: 'How do you currently manage Amazon PPC?',
      type: 'single',
      options: [
        { value: 'not-using', label: 'Not using PPC yet', description: 'Organic only' },
        { value: 'basic-auto', label: 'Basic automatic campaigns', description: 'Set and forget' },
        { value: 'manual-management', label: 'Manual management', description: 'Managing campaigns myself' },
        { value: 'agency-managed', label: 'Agency/consultant managed', description: 'Outsourced to professionals' },
        { value: 'need-optimization', label: 'Need optimization', description: 'Not seeing good ROAS' }
      ]
    },
    {
      id: 'accounting-taxes',
      category: 'Financial Management',
      icon: DollarSign,
      color: 'from-emerald-500 to-green-700',
      question: 'How are you handling accounting and tax compliance?',
      type: 'multiple',
      options: [
        { value: 'diy', label: 'Managing myself', description: 'Self-handled bookkeeping' },
        { value: 'local-accountant', label: 'Local accountant', description: 'Domestic expert' },
        { value: 'international-expert', label: 'International tax expert', description: 'Cross-border specialist' },
        { value: 'need-help', label: 'Need professional help', description: 'Overwhelmed with compliance' },
        { value: 'forex-concerns', label: 'Foreign exchange issues', description: 'Currency fluctuation concerns' },
        { value: 'vat-gst', label: 'VAT/GST registration', description: 'Multi-country tax registration' }
      ]
    },
    {
      id: 'brand-protection',
      category: 'Brand & IP Protection',
      icon: Shield,
      color: 'from-violet-500 to-purple-700',
      question: 'What brand protection measures do you have in place?',
      type: 'multiple',
      options: [
        { value: 'brand-registry', label: 'Amazon Brand Registry', description: 'Enrolled and active' },
        { value: 'trademark', label: 'Trademark registration', description: 'Registered in target markets' },
        { value: 'transparency', label: 'Transparency program', description: 'Anti-counterfeiting codes' },
        { value: 'ip-monitoring', label: 'IP violation monitoring', description: 'Active enforcement' },
        { value: 'none-yet', label: 'Not protected yet', description: 'Need to start' },
        { value: 'not-needed', label: 'Not applicable', description: 'Reselling branded products' }
      ]
    },
    {
      id: 'account-health',
      category: 'Account Management',
      icon: CheckCircle,
      color: 'from-blue-500 to-indigo-700',
      question: 'What is your current account health status?',
      type: 'single',
      options: [
        { value: 'excellent', label: 'Excellent health', description: 'All metrics in green' },
        { value: 'good', label: 'Good with minor issues', description: 'Mostly healthy' },
        { value: 'at-risk', label: 'At risk', description: 'Some policy warnings' },
        { value: 'suspended', label: 'Currently suspended', description: 'Need reinstatement' },
        { value: 'not-started', label: 'Haven\'t started yet', description: 'Planning to launch' }
      ]
    },
    {
      id: 'growth-goals',
      category: 'Business Goals',
      icon: Target,
      color: 'from-orange-500 to-red-600',
      question: 'What are your primary growth goals for the next 12 months?',
      type: 'multiple',
      options: [
        { value: 'increase-revenue', label: 'Increase revenue', description: '2-5x growth target' },
        { value: 'expand-markets', label: 'Expand to new markets', description: 'Geographic expansion' },
        { value: 'add-products', label: 'Add more products', description: 'Catalog expansion' },
        { value: 'improve-margins', label: 'Improve profit margins', description: 'Cost optimization' },
        { value: 'build-brand', label: 'Build brand presence', description: 'Brand recognition' },
        { value: 'automate-operations', label: 'Automate operations', description: 'Efficiency improvement' },
        { value: 'scale-advertising', label: 'Scale advertising', description: 'Increased ad spend' }
      ]
    },
    {
      id: 'support-needs',
      category: 'Support Requirements',
      icon: Users,
      color: 'from-cyan-500 to-blue-700',
      question: 'What kind of support do you need most?',
      type: 'multiple',
      options: [
        { value: 'account-management', label: 'Full account management', description: 'End-to-end handling' },
        { value: 'consulting', label: 'Strategic consulting', description: 'Expert guidance' },
        { value: 'training', label: 'Training & education', description: 'Learn to manage yourself' },
        { value: 'specific-services', label: 'Specific services', description: 'Content, PPC, logistics, etc.' },
        { value: 'emergency-support', label: 'Emergency support', description: 'Account issues/suspensions' },
        { value: 'automation-tools', label: 'Tools & automation', description: 'Software solutions' }
      ]
    }
  ];

  const handleAnswer = (questionId, value, isMultiple = false) => {
    if (isMultiple) {
      const currentValues = answers[questionId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setAnswers({ ...answers, [questionId]: newValues });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const isAnswered = (questionId, type) => {
    if (type === 'multiple') {
      return answers[questionId] && answers[questionId].length > 0;
    }
    return answers[questionId] !== undefined;
  };

  const nextStep = () => {
    if (currentStep < questionFlows.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    // Based on seller stage
    if (answers['seller-stage'] === 'exploring' || answers['seller-stage'] === 'planning') {
      recommendations.push({
        title: 'Launch Support Package',
        services: ['Seller Training', 'Account Setup', 'Market Research', 'Product Sourcing Guidance'],
        priority: 'high'
      });
    }

    // Based on catalog optimization
    if (answers['catalog-optimization'] === 'basic' || answers['catalog-optimization'] === 'need-help') {
      recommendations.push({
        title: 'Catalog Enhancement Suite',
        services: ['Professional Imaging (9 images)', 'SEO Optimization', 'A+ Content Creation', 'Enhanced Brand Content'],
        priority: 'high'
      });
    }

    // Based on logistics challenges
    if (answers['logistics-challenges']?.length > 0) {
      recommendations.push({
        title: 'Logistics Optimization',
        services: ['FBA Preparation', 'International Shipping', 'Customs Management', 'Inventory Repositioning'],
        priority: 'medium'
      });
    }

    // Based on PPC experience
    if (answers['ppc-experience'] === 'not-using' || answers['ppc-experience'] === 'need-optimization') {
      recommendations.push({
        title: 'Advertising Management',
        services: ['Advanced PPC Campaigns', 'ROI Optimization', 'Keyword Research', 'Performance Analytics'],
        priority: 'high'
      });
    }

    // Based on accounting needs
    if (answers['accounting-taxes']?.includes('need-help') || answers['accounting-taxes']?.includes('forex-concerns')) {
      recommendations.push({
        title: 'Financial & Tax Services',
        services: ['International Tax Compliance', 'Foreign Exchange Management', 'Financial Reporting', 'Multi-currency Accounting'],
        priority: 'medium'
      });
    }

    // Based on brand protection
    if (answers['brand-protection']?.includes('none-yet')) {
      recommendations.push({
        title: 'Brand Protection Package',
        services: ['Trademark Registration', 'Amazon Brand Registry', 'IP Monitoring', 'Transparency Program'],
        priority: 'medium'
      });
    }

    // Based on account health
    if (answers['account-health'] === 'suspended' || answers['account-health'] === 'at-risk') {
      recommendations.push({
        title: 'Account Reinstatement & Protection',
        services: ['Legal Team Support', '24/7 Account Monitoring', 'Policy Compliance', 'Appeal Writing'],
        priority: 'critical'
      });
    }

    return recommendations;
  };

  const calculateCompletionScore = () => {
    const answeredQuestions = Object.keys(answers).length;
    return Math.round((answeredQuestions / questionFlows.length) * 100);
  };

  if (showResults) {
    const recommendations = getRecommendations();
    const completionScore = calculateCompletionScore();

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-black" size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-2">Your Personalized Amazon Growth Plan</h2>
              <p className="text-gray-300">Based on your responses, here's what we recommend</p>
              <div className="mt-6 bg-white/10 rounded-xl p-4 inline-block">
                <div className="text-4xl font-bold">{completionScore}%</div>
                <div className="text-sm text-gray-300">Assessment Complete</div>
              </div>
            </div>

            <div className="p-8">
              {/* Journey Summary */}
              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-l-4 border-blue-500">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Target size={24} className="text-blue-600" />
                  Your Seller Journey Snapshot
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Stage:</span>{' '}
                    {questionFlows.find(q => q.id === 'seller-stage')?.options.find(o => o.value === answers['seller-stage'])?.label || 'Not specified'}
                  </div>
                  <div>
                    <span className="font-semibold">Markets:</span>{' '}
                    {answers['target-markets']?.length || 0} selected
                  </div>
                  <div>
                    <span className="font-semibold">Catalog Size:</span>{' '}
                    {questionFlows.find(q => q.id === 'product-catalog')?.options.find(o => o.value === answers['product-catalog'])?.label || 'Not specified'}
                  </div>
                  <div>
                    <span className="font-semibold">Ad Budget:</span>{' '}
                    {questionFlows.find(q => q.id === 'advertising-budget')?.options.find(o => o.value === answers['advertising-budget'])?.label || 'Not specified'}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <h3 className="text-2xl font-bold mb-6">Recommended Services for Your Growth</h3>
              <div className="space-y-4 mb-8">
                {recommendations.map((rec, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-2xl border-2 ${
                      rec.priority === 'critical' 
                        ? 'border-red-500 bg-red-50' 
                        : rec.priority === 'high'
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold">{rec.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rec.priority === 'critical'
                          ? 'bg-red-500 text-white'
                          : rec.priority === 'high'
                          ? 'bg-yellow-500 text-black'
                          : 'bg-gray-500 text-white'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rec.services.map((service, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-black text-white rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Recommendation */}
              <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-2xl mb-6">
                <h3 className="text-2xl font-bold mb-4">Suggested Package</h3>
                <p className="text-gray-300 mb-6">
                  Based on your needs, we recommend starting with our{' '}
                  <span className="text-yellow-400 font-bold">
                    {recommendations.length >= 4 ? 'Platinum' : recommendations.length >= 2 ? 'Gold' : 'Silver'}
                  </span>{' '}
                  package, which covers {recommendations.length >= 4 ? '100%' : recommendations.length >= 2 ? '80%' : '50%'} of services.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-yellow-400">₹{recommendations.length >= 4 ? '19,999' : recommendations.length >= 2 ? '14,999' : '9,999'}</div>
                    <div className="text-sm text-gray-300">per month</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-yellow-400">{recommendations.length >= 4 ? '100%' : recommendations.length >= 2 ? '80%' : '50%'}</div>
                    <div className="text-sm text-gray-300">Service Coverage</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-yellow-400">24/7</div>
                    <div className="text-sm text-gray-300">Support</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.location.href = '#contact'}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all flex items-center justify-center gap-2"
                >
                  Get Free Strategy Session
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={resetQuestionnaire}
                  className="px-8 py-4 border-2 border-black text-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questionFlows[currentStep];
  const IconComponent = currentQuestion.icon;
  const progress = ((currentStep + 1) / questionFlows.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Cross-Border Seller Assessment</h1>
              <p className="text-gray-600">Question {currentStep + 1} of {questionFlows.length}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-black">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-black to-gray-700 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Category Header */}
          <div className={`bg-gradient-to-r ${currentQuestion.color} text-white p-6`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <IconComponent size={32} />
              </div>
              <div>
                <div className="text-sm font-semibold opacity-90">{currentQuestion.category}</div>
                <h2 className="text-2xl md:text-3xl font-bold mt-1">{currentQuestion.question}</h2>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="p-6 md:p-8">
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.type === 'multiple'
                  ? answers[currentQuestion.id]?.includes(option.value)
                  : answers[currentQuestion.id] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value, currentQuestion.type === 'multiple')}
                    className={`w-full text-left p-4 md:p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-black bg-black text-white shadow-lg scale-[1.02]'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        isSelected ? 'border-white bg-white' : 'border-gray-300'
                      }`}>
                        {isSelected && <Check size={16} className="text-black" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {option.flag && <span className="text-2xl">{option.flag}</span>}
                          <div className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {option.label}
                          </div>
                        </div>
                        {option.description && (
                          <div className={`text-sm ${isSelected ? 'text-gray-300' : 'text-gray-600'}`}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={!isAnswered(currentQuestion.id, currentQuestion.type)}
                className="flex-1 bg-gradient-to-r from-black to-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:from-gray-800 hover:to-black disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {currentStep === questionFlows.length - 1 ? 'Get My Results' : 'Continue'}
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {questionFlows.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentStep
                  ? 'bg-black w-8'
                  : index < currentStep
                  ? 'bg-gray-400'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your responses are helping us create a personalized growth strategy</p>
          <p className="mt-1">
            <span className="font-semibold text-black">{Object.keys(answers).length}</span> questions answered
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrossBorderSellerQuestionnaire;
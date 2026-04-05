/**
 * QuestionnairePageNew.jsx - WITH TEST DATA INTEGRATION
 * =====================================================
 * This file shows how to integrate test data into the questionnaire component
 * 
 * HOW TO USE:
 * 1. Copy the relevant sections below
 * 2. Paste into your QuestionnairePageNew.jsx component
 * 3. Uncomment the test data initialization lines
 * 4. The form will load with all test data pre-filled
 * 
 * OPTIONAL: Add a test submission button (see below)
 */

// ====================================================================
// SECTION 1: IMPORTS (Add these at the top of QuestionnairePageNew.jsx)
// ====================================================================

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

// ← ADD THESE IMPORTS:
// import {
//   TEST_PREFILLED_ANSWERS,
//   TEST_PREFILLED_CONTACT_INFO,
//   TEST_COMPLETE_SUBMISSION_PAYLOAD,
//   TEST_SUBMISSION_MANUFACTURER,
//   TEST_SUBMISSION_STARTUP,
//   submitTestQuestionnaire
// } from '../testData/questionnaireTestData';

// ====================================================================
// SECTION 2: COMPONENT STATE (Replace existing state with this)
// ====================================================================

export default function QuestionnairePageNew() {
  const [currentStep, setCurrentStep] = useState(0);

  // OPTION A: Start empty (production)
  // const [answers, setAnswers] = useState({});
  // const [contactInfo, setContactInfo] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   businessName: ''
  // });

  // OPTION B: Pre-fill with test data (for testing)
  // Uncomment these lines to test with pre-filled data:
  // const [answers, setAnswers] = useState(TEST_PREFILLED_ANSWERS);
  // const [contactInfo, setContactInfo] = useState(TEST_PREFILLED_CONTACT_INFO);

  // OPTION C: Pre-fill with different test scenarios
  // const [answers, setAnswers] = useState(TEST_SUBMISSION_MANUFACTURER.businessDetails);
  // const [contactInfo, setContactInfo] = useState(TEST_SUBMISSION_MANUFACTURER.contactInfo);
  
  // const [answers, setAnswers] = useState(TEST_SUBMISSION_STARTUP.businessDetails);
  // const [contactInfo, setContactInfo] = useState(TEST_SUBMISSION_STARTUP.contactInfo);

  // Default (no pre-fill):
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ... rest of component code stays the same

  // ====================================================================
  // SECTION 3: ADD TEST SUBMISSION BUTTON (Optional)
  // ====================================================================
  // Add this function to your component:

  const handleTestSubmission = async (testScenario = 'complete') => {
    let testPayload;
    
    switch (testScenario) {
      case 'manufacturer':
        testPayload = TEST_SUBMISSION_MANUFACTURER;
        toast.info('📦 Submitting manufacturer test scenario...');
        break;
      case 'startup':
        testPayload = TEST_SUBMISSION_STARTUP;
        toast.info('🚀 Submitting startup test scenario...');
        break;
      case 'complete':
      default:
        testPayload = TEST_COMPLETE_SUBMISSION_PAYLOAD;
        toast.info('📤 Submitting complete test data...');
    }

    try {
      setIsSubmitting(true);
      const result = await submitTestQuestionnaire(testPayload);
      
      if (result.success) {
        toast.success('✅ Test submission successful!');
        console.log('Response:', result.data);
        
        // Optionally reset form
        setTimeout(() => {
          setCurrentStep(0);
          setAnswers({});
          setContactInfo({ name: '', email: '', phone: '', businessName: '' });
        }, 1500);
      } else {
        toast.error('❌ Test submission failed: ' + result.error);
      }
    } catch (error) {
      toast.error('❌ Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ====================================================================
  // SECTION 4: ADD TEST BUTTONS TO JSX (Optional)
  // ====================================================================
  // Add these buttons in your JSX render section (before main form):

  // <!-- Test Buttons Section -->
  // {process.env.NODE_ENV === 'development' && (
  //   <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
  //     <p className="text-sm text-yellow-800 mb-3 font-semibold">🧪 Test Mode - Pre-fill Options:</p>
  //     <div className="flex gap-2 flex-wrap">
  //       <button
  //         onClick={() => {
  //           setAnswers(TEST_PREFILLED_ANSWERS);
  //           setContactInfo(TEST_PREFILLED_CONTACT_INFO);
  //           setCurrentStep(0);
  //           toast.info('Loaded: Complete Trader Scenario');
  //         }}
  //         className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
  //       >
  //         Fill: Complete
  //       </button>
  //       <button
  //         onClick={() => {
  //           setAnswers(TEST_SUBMISSION_MANUFACTURER.businessDetails);
  //           setContactInfo(TEST_SUBMISSION_MANUFACTURER.contactInfo);
  //           setCurrentStep(0);
  //           toast.info('Loaded: Manufacturer Scenario');
  //         }}
  //         className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
  //       >
  //         Fill: Manufacturer
  //       </button>
  //       <button
  //         onClick={() => {
  //           setAnswers(TEST_SUBMISSION_STARTUP.businessDetails);
  //           setContactInfo(TEST_SUBMISSION_STARTUP.contactInfo);
  //           setCurrentStep(0);
  //           toast.info('Loaded: Startup Scenario');
  //         }}
  //         className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
  //       >
  //         Fill: Startup
  //       </button>
  //     </div>
  //     <div className="flex gap-2 flex-wrap mt-3">
  //       <button
  //         onClick={() => handleTestSubmission('complete')}
  //         disabled={isSubmitting}
  //         className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
  //       >
  //         {isSubmitting ? '⏳ Submitting...' : '📤 Submit Test (Complete)'}
  //       </button>
  //       <button
  //         onClick={() => handleTestSubmission('manufacturer')}
  //         disabled={isSubmitting}
  //         className="px-3 py-1 text-sm bg-teal-500 text-white rounded hover:bg-teal-600 disabled:opacity-50"
  //       >
  //         {isSubmitting ? '⏳ Submitting...' : '📤 Submit Test (Mfr)'}
  //       </button>
  //       <button
  //         onClick={() => handleTestSubmission('startup')}
  //         disabled={isSubmitting}
  //         className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
  //       >
  //         {isSubmitting ? '⏳ Submitting...' : '📤 Submit Test (Startup)'}
  //       </button>
  //     </div>
  //   </div>
  // )}

  return (
    <section className="mt-5 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-6">
      <ToastContainer />

      <div className="max-w-4xl mx-auto">
        {/* Rest of your component JSX */}
      </div>
    </section>
  );
}

// ====================================================================
// SECTION 5: QUICK START GUIDE
// ====================================================================

/*
STEP 1: Add imports at the top:
-------
import {
  TEST_PREFILLED_ANSWERS,
  TEST_PREFILLED_CONTACT_INFO,
  TEST_COMPLETE_SUBMISSION_PAYLOAD,
  submitTestQuestionnaire
} from '../testData/questionnaireTestData';

STEP 2: Replace state initialization:
-------
// Before:
const [answers, setAnswers] = useState({});
const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', businessName: '' });

// After (choose one):
// Option A - Pre-fill with test data:
const [answers, setAnswers] = useState(TEST_PREFILLED_ANSWERS);
const [contactInfo, setContactInfo] = useState(TEST_PREFILLED_CONTACT_INFO);

// Option B - Different scenario:
const [answers, setAnswers] = useState({});
const [contactInfo, setContactInfo] = useState(TEST_PREFILLED_CONTACT_INFO);

STEP 3: Add test button handler:
-------
const handleTestSubmission = async (testScenario = 'complete') => {
  const result = await submitTestQuestionnaire(TEST_COMPLETE_SUBMISSION_PAYLOAD);
  if (result.success) {
    toast.success('Test submission successful!');
  } else {
    toast.error('Test submission failed: ' + result.error);
  }
};

STEP 4: Add buttons to JSX (optional):
-------
<button onClick={() => handleTestSubmission('complete')}>
  Submit Test Data
</button>

STEP 5: Test!
-------
The form will now load with all test data pre-filled and ready to submit.
*/

// ====================================================================
// SECTION 6: TESTING IN BROWSER CONSOLE
// ====================================================================

/*
Once files are imported, run in browser console:

// Test 1: Pre-fill form with test data
import { TEST_PREFILLED_ANSWERS } from './testData/questionnaireTestData.js';
console.log('Test data:', TEST_PREFILLED_ANSWERS);

// Test 2: Submit test questionnaire
import { submitTestQuestionnaire, TEST_COMPLETE_SUBMISSION_PAYLOAD } from './testData/questionnaireTestData.js';
await submitTestQuestionnaire(TEST_COMPLETE_SUBMISSION_PAYLOAD);

// Test 3: Run full demo
import { demonstrateProperSubmission } from './testData/submissionDemo.js';
await demonstrateProperSubmission();

// Test 4: Show all demos
import { runAllDemos } from './testData/submissionDemo.js';
await runAllDemos();
*/

// ====================================================================
// EXPECTED OUTPUT AFTER SUBMISSION
// ====================================================================

/*
✅ Success Response:
{
  success: true,
  data: {
    _id: "507f1f77bcf86cd799439011",
    contactInfo: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@businessmail.com",
      phone: "+91 98765 43210",
      businessName: "Kumar Trading Enterprises"
    },
    businessDetails: {
      businessType: "Trader",
      objective: "Already selling on Amazon and need support",
      // ... all other fields
    },
    submittedAt: "2025-03-30T10:30:00Z"
  }
}

✅ Email sent to: info@aribusinessnetwork.com
✅ WhatsApp message sent to: +919137696515
✅ Admin dashboard updated with new submission
*/

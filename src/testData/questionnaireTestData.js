/**
 * Test Data for Questionnaire Submission
 * ======================================
 * This file contains complete test variables demonstrating proper submission
 * of the appointment booking/Amazon questionnaire with all required fields.
 */

/**
 * TEST CONTACT INFORMATION
 * This is the minimal required information for submission
 */
export const TEST_CONTACT_INFO = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@businessmail.com',
  phone: '+91 98765 43210',
  businessName: 'Kumar Trading Enterprises'
};

/**
 * COMPLETE BUSINESS DETAILS - All Questions Answered
 * This demonstrates every field properly filled for a complete submission
 */
export const TEST_BUSINESS_DETAILS_COMPLETE = {
  businessType: 'Trader',
  objective: 'Already selling on Amazon and need support',
  targetRegions: ['India (IN)', 'USA (US)', 'UAE (AE)'],
  targetRegions_other: 'Singapore',
  hasAmazonAccount: 'Yes',
  accountStatus: 'Active',
  productCategory: 'Electronics',
  productCategory_other: '',
  productSource: 'Trading / Reselling branded goods',
  hasTrademark: 'Yes - registered',
  hasBrandRegistry: 'Yes',
  restrictedProducts: 'No',
  certifications: 'No certifications required',
  fulfillmentModel: 'FBA (Fulfillment by Amazon)',
  hasProductPhotography: 'Yes - studio quality',
  hasListingContent: 'Yes',
  ppcExperience: 'Yes - via agency',
  servicesNeeded: [
    'Listing creation & optimization',
    'PPC/Ads and marketing',
    'Inventory / FBA / logistics setup'
  ],
  servicesNeeded_other: 'Brand consulting',
  monthlyBudget: '₹50,000 - ₹1,00,000',
  timeline: 'Within 2 weeks',
  mainObjective: 'Scale revenue on existing products',
  mainObjective_other: ''
};

/**
 * BUSINESS DETAILS - Manufacturing Company
 * Alternative test scenario for a manufacturer
 */
export const TEST_BUSINESS_DETAILS_MANUFACTURER = {
  businessType: 'Manufacturer',
  objective: 'New to Amazon and want to start selling',
  targetRegions: ['India (IN)', 'EU'],
  targetRegions_other: 'Southeast Asia',
  hasAmazonAccount: 'No',
  accountStatus: 'N/A',
  productCategory: 'Handicrafts',
  productCategory_other: 'Handmade Organic Items',
  productSource: 'Own manufactured items',
  hasTrademark: 'No, but want help filing',
  hasBrandRegistry: 'No',
  restrictedProducts: 'Yes',
  certifications: 'Yes - need all certifications',
  fulfillmentModel: 'Both (depends on SKU)',
  hasProductPhotography: 'Yes - basic quality',
  hasListingContent: 'No',
  ppcExperience: 'No',
  servicesNeeded: [
    'New account registration and setup',
    'Product research',
    'Listing creation & optimization',
    'Compliance, documentation, and taxation'
  ],
  servicesNeeded_other: 'Certification assistance',
  monthlyBudget: '₹25,000 - ₹50,000',
  timeline: 'Within 1-3 months',
  mainObjective: 'Launch new products',
  mainObjective_other: ''
};

/**
 * BUSINESS DETAILS - Startup (Just Exploring)
 * Test scenario for a new business exploring options
 */
export const TEST_BUSINESS_DETAILS_STARTUP = {
  businessType: 'Both',
  objective: 'Both (new region + existing account issues)',
  targetRegions: ['USA (US)', 'UK', 'Canada (CA)'],
  targetRegions_other: '',
  hasAmazonAccount: 'Yes',
  accountStatus: 'Suspended',
  productCategory: 'Beauty & Personal Care',
  productCategory_other: '',
  productSource: 'Private label / White label',
  hasTrademark: 'Application filed but not yet registered',
  hasBrandRegistry: 'No',
  restrictedProducts: 'Yes',
  certifications: 'Yes - have some, need others',
  fulfillmentModel: 'FBM (Self-ship)',
  hasProductPhotography: 'Yes - studio quality',
  hasListingContent: 'Partially',
  ppcExperience: 'Yes - self-managed',
  servicesNeeded: [
    'Account health / suspension / appeal',
    'Listing creation & optimization',
    'PPC/Ads and marketing',
    'Other'
  ],
  servicesNeeded_other: 'Competitive analysis and market research',
  monthlyBudget: 'Above ₹1,00,000',
  timeline: 'Immediately',
  mainObjective: 'Fix compliance or account issues',
  mainObjective_other: ''
};

/**
 * COMPLETE SUBMISSION PAYLOAD
 * This is the exact format sent to the backend
 * Ready to use for testing the /api/questionnaire endpoint
 */
export const TEST_COMPLETE_SUBMISSION_PAYLOAD = {
  contactInfo: TEST_CONTACT_INFO,
  businessDetails: TEST_BUSINESS_DETAILS_COMPLETE
};

/**
 * ALTERNATIVE SUBMISSION PAYLOADS
 * Different scenarios for testing
 */
export const TEST_SUBMISSION_MANUFACTURER = {
  contactInfo: {
    name: 'Priya Sharma',
    email: 'priya.sharma@crafts.com',
    phone: '+91 97654 32109',
    businessName: 'Sharma Handicrafts Studio'
  },
  businessDetails: TEST_BUSINESS_DETAILS_MANUFACTURER
};

export const TEST_SUBMISSION_STARTUP = {
  contactInfo: {
    name: 'Amir Patel',
    email: 'amir@beautybrand.in',
    phone: '+91 96543 21098',
    businessName: 'Beauty Innovations Co.'
  },
  businessDetails: TEST_BUSINESS_DETAILS_STARTUP
};

/**
 * MINIMAL SUBMISSION (Only Required Fields)
 * Use this to test validation - should be accepted but with warnings
 */
export const TEST_MINIMAL_SUBMISSION = {
  contactInfo: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91 90000 00000',
    businessName: ''
  },
  businessDetails: {
    businessType: 'Trader',
    objective: 'New to Amazon and want to start selling'
  }
};

/**
 * STATE FOR TESTING IN REACT COMPONENT
 * Use this to set initial state in QuestionnairePageNew.jsx
 */
export const TEST_PREFILLED_ANSWERS = {
  businessType: 'Trader',
  objective: 'Already selling on Amazon and need support',
  targetRegions: ['India (IN)', 'USA (US)', 'UAE (AE)'],
  targetRegions_other: 'Singapore',
  hasAmazonAccount: 'Yes',
  accountStatus: 'Active',
  productCategory: 'Electronics',
  productCategory_other: '',
  productSource: 'Trading / Reselling branded goods',
  hasTrademark: 'Yes - registered',
  hasBrandRegistry: 'Yes',
  restrictedProducts: 'No',
  certifications: 'No certifications required',
  fulfillmentModel: 'FBA (Fulfillment by Amazon)',
  hasProductPhotography: 'Yes - studio quality',
  hasListingContent: 'Yes',
  ppcExperience: 'Yes - via agency',
  servicesNeeded: [
    'Listing creation & optimization',
    'PPC/Ads and marketing',
    'Inventory / FBA / logistics setup'
  ],
  servicesNeeded_other: 'Brand consulting',
  monthlyBudget: '₹50,000 - ₹1,00,000',
  timeline: 'Within 2 weeks',
  mainObjective: 'Scale revenue on existing products',
  mainObjective_other: ''
};

export const TEST_PREFILLED_CONTACT_INFO = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@businessmail.com',
  phone: '+91 98765 43210',
  businessName: 'Kumar Trading Enterprises'
};

/**
 * SUBMISSION FUNCTION EXAMPLE
 * Usage in QuestionnairePageNew.jsx to test with real data
 */
export const submitTestQuestionnaire = async (testPayload = TEST_COMPLETE_SUBMISSION_PAYLOAD) => {
  try {
    console.log('📤 Submitting test questionnaire...');
    console.log('Payload:', JSON.stringify(testPayload, null, 2));

    const response = await fetch(
      'https://ari-business-network-3.onrender.com/api/questionnaire',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testPayload)
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    console.log('✅ Submission successful:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Submission failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * VALIDATION CHECKER
 * Validates that test data meets submission requirements
 */
export const validateTestData = (contactInfo, businessDetails) => {
  const errors = [];

  // Contact info validation
  if (!contactInfo?.name?.trim()) errors.push('✗ Contact name is required');
  if (!contactInfo?.email?.trim()) errors.push('✗ Contact email is required');
  if (!contactInfo?.phone?.trim()) errors.push('✗ Contact phone is required');

  // Business details validation
  if (!businessDetails || Object.keys(businessDetails).length === 0) {
    errors.push('✗ Business details cannot be empty');
  }

  if (errors.length === 0) {
    console.log('✅ All validation checks passed!');
    return { valid: true, errors: [] };
  } else {
    console.error('❌ Validation failed:');
    errors.forEach(err => console.error(err));
    return { valid: false, errors };
  }
};

/**
 * USAGE EXAMPLES
 * ================
 *
 * 1. Testing in browser console:
 *    import { TEST_COMPLETE_SUBMISSION_PAYLOAD, submitTestQuestionnaire } from './testData/questionnaireTestData.js';
 *    await submitTestQuestionnaire(TEST_COMPLETE_SUBMISSION_PAYLOAD);
 *
 * 2. Pre-filling form in component:
 *    const [answers, setAnswers] = useState(TEST_PREFILLED_ANSWERS);
 *    const [contactInfo, setContactInfo] = useState(TEST_PREFILLED_CONTACT_INFO);
 *
 * 3. Validating test data:
 *    import { validateTestData, TEST_CONTACT_INFO, TEST_BUSINESS_DETAILS_COMPLETE } from './testData/questionnaireTestData.js';
 *    validateTestData(TEST_CONTACT_INFO, TEST_BUSINESS_DETAILS_COMPLETE);
 *
 * 4. Testing different scenarios:
 *    await submitTestQuestionnaire(TEST_SUBMISSION_MANUFACTURER);
 *    await submitTestQuestionnaire(TEST_SUBMISSION_STARTUP);
 */

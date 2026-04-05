/**
 * Questionnaire Submission Demo
 * =============================
 * This file demonstrates proper questionnaire submission flow
 * using test data and proper error handling
 */

import {
  TEST_COMPLETE_SUBMISSION_PAYLOAD,
  TEST_SUBMISSION_MANUFACTURER,
  TEST_SUBMISSION_STARTUP,
  TEST_CONTACT_INFO,
  TEST_BUSINESS_DETAILS_COMPLETE,
  validateTestData,
  submitTestQuestionnaire
} from '../testData/questionnaireTestData';

/**
 * DEMO: Step-by-step proper submission
 * Shows validation, error handling, and success flow
 */
export const demonstrateProperSubmission = async () => {
  console.log('🚀 Starting questionnaire submission demo...\n');

  // ============================================
  // STEP 1: Validate Test Data
  // ============================================
  console.log('📋 STEP 1: Validating test data...');
  const validation = validateTestData(
    TEST_CONTACT_INFO,
    TEST_BUSINESS_DETAILS_COMPLETE
  );

  if (!validation.valid) {
    console.error('❌ Validation failed. Stopping submission.');
    return { success: false, reason: 'Validation failed' };
  }
  console.log('✅ Validation passed!\n');

  // ============================================
  // STEP 2: Prepare Payload
  // ============================================
  console.log('📦 STEP 2: Preparing submission payload...');
  console.log('Contact Info:', TEST_CONTACT_INFO);
  console.log('Business Details fields:', Object.keys(TEST_BUSINESS_DETAILS_COMPLETE).length);
  console.log('Sample answers:', {
    businessType: TEST_BUSINESS_DETAILS_COMPLETE.businessType,
    objective: TEST_BUSINESS_DETAILS_COMPLETE.objective,
    targetRegions: TEST_BUSINESS_DETAILS_COMPLETE.targetRegions,
    servicesNeeded: TEST_BUSINESS_DETAILS_COMPLETE.servicesNeeded,
    monthlyBudget: TEST_BUSINESS_DETAILS_COMPLETE.monthlyBudget
  });
  console.log('Full payload ready ✓\n');

  // ============================================
  // STEP 3: Submit to Backend
  // ============================================
  console.log('📤 STEP 3: Submitting to backend...');
  const result = await submitTestQuestionnaire(TEST_COMPLETE_SUBMISSION_PAYLOAD);

  if (!result.success) {
    console.error('❌ Submission failed:', result.error);
    return { success: false, reason: result.error };
  }

  // ============================================
  // STEP 4: Handle Success
  // ============================================
  console.log('✅ STEP 4: Submission successful!');
  console.log('Response:', result.data);
  console.log('\n🎉 Questionnaire successfully submitted!\n');

  return { success: true, data: result.data };
};

/**
 * DEMO: Multiple Test Scenarios
 * Shows how to test different business types
 */
export const demonstrateMultipleScenarios = async () => {
  const scenarios = [
    {
      name: 'Trading Company',
      payload: TEST_COMPLETE_SUBMISSION_PAYLOAD,
      description: 'Established trader looking to scale on Amazon'
    },
    {
      name: 'Manufacturing Business',
      payload: TEST_SUBMISSION_MANUFACTURER,
      description: 'Manufacturer new to Amazon, needs compliance help'
    },
    {
      name: 'Startup with Issues',
      payload: TEST_SUBMISSION_STARTUP,
      description: 'Business with suspended account needing account recovery'
    }
  ];

  console.log('🧪 Testing Multiple Scenarios\n');
  console.log('='.repeat(50));

  for (const scenario of scenarios) {
    console.log(`\n📌 Scenario: ${scenario.name}`);
    console.log(`   Description: ${scenario.description}`);
    console.log(`   Contact: ${scenario.payload.contactInfo.name}`);
    console.log(`   Business Type: ${scenario.payload.businessDetails.businessType}`);
    console.log(`   Objective: ${scenario.payload.businessDetails.objective}`);

    // Validate before submission
    const isValid = validateTestData(
      scenario.payload.contactInfo,
      scenario.payload.businessDetails
    );

    if (isValid.valid) {
      console.log('   Status: ✅ Ready to submit');
    } else {
      console.log('   Status: ❌ Validation failed');
      isValid.errors.forEach(err => console.log(`   ${err}`));
    }
  }

  console.log('\n' + '='.repeat(50));
};

/**
 * DEMO: Required vs Optional Fields
 * Shows which fields MUST be filled vs which are optional
 */
export const demonstrateRequiredFields = () => {
  console.log('📋 Required vs Optional Fields\n');
  console.log('='.repeat(60));

  console.log('\n✅ REQUIRED FIELDS (Every submission must have):');
  console.log('  Contact Information:');
  console.log('    - name: ' + TEST_CONTACT_INFO.name);
  console.log('    - email: ' + TEST_CONTACT_INFO.email);
  console.log('    - phone: ' + TEST_CONTACT_INFO.phone);
  console.log('  At least one business detail field must be provided');

  console.log('\n⚠️  SEMI-REQUIRED FIELDS (Should be filled for complete submission):');
  const criticalFields = [
    'businessType',
    'objective',
    'productCategory',
    'productSource',
    'servicesNeeded',
    'monthlyBudget',
    'timeline'
  ];
  criticalFields.forEach(field => {
    console.log(`    - ${field}: ${TEST_BUSINESS_DETAILS_COMPLETE[field]}`);
  });

  console.log('\n❓ CONDITIONAL FIELDS (Required only if another field has specific value):');
  console.log('    - targetRegions_other: Required if targetRegions includes "Others"');
  console.log('      Current value:', TEST_BUSINESS_DETAILS_COMPLETE.targetRegions_other);
  console.log('    - productCategory_other: Required if productCategory is "Others"');
  console.log('      Current value:', TEST_BUSINESS_DETAILS_COMPLETE.productCategory_other);
  console.log('    - servicesNeeded_other: Required if servicesNeeded includes "Other"');
  console.log('      Current value:', TEST_BUSINESS_DETAILS_COMPLETE.servicesNeeded_other);
  console.log('    - mainObjective_other: Required if mainObjective is "Other"');
  console.log('      Current value:', TEST_BUSINESS_DETAILS_COMPLETE.mainObjective_other);

  console.log('\n' + '='.repeat(60) + '\n');
};

/**
 * DEMO: Error Handling
 * Shows how submission handles various error scenarios
 */
export const demonstrateErrorHandling = async () => {
  console.log('🚨 Error Handling Demo\n');
  console.log('='.repeat(50));

  const testCases = [
    {
      name: 'Missing Name',
      payload: {
        contactInfo: { name: '', email: 'test@example.com', phone: '+91 98765 43210', businessName: 'Test Co' },
        businessDetails: { businessType: 'Trader' }
      }
    },
    {
      name: 'Missing Email',
      payload: {
        contactInfo: { name: 'Test User', email: '', phone: '+91 98765 43210', businessName: 'Test Co' },
        businessDetails: { businessType: 'Trader' }
      }
    },
    {
      name: 'Empty Business Details',
      payload: {
        contactInfo: { name: 'Test User', email: 'test@example.com', phone: '+91 98765 43210', businessName: 'Test Co' },
        businessDetails: {}
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n❌ Testing: ${testCase.name}`);
    const validation = validateTestData(testCase.payload.contactInfo, testCase.payload.businessDetails);
    
    if (!validation.valid) {
      validation.errors.forEach(err => console.log(`   ${err}`));
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');
};

/**
 * DEMO: Response Message Generation
 * Shows the message that gets sent to WhatsApp/Email
 */
export const demonstrateMessageGeneration = () => {
  const contactInfo = TEST_CONTACT_INFO;
  const answers = TEST_BUSINESS_DETAILS_COMPLETE;

  let message = '🔔 NEW QUESTIONNAIRE SUBMISSION\n';
  message += '================================\n\n';

  message += '📋 CONTACT INFORMATION\n';
  message += '--------------------------------\n';
  message += `👤 Name: ${contactInfo.name}\n`;
  message += `🏢 Business Name: ${contactInfo.businessName}\n`;
  message += `📧 Email: ${contactInfo.email}\n`;
  message += `📱 Phone: ${contactInfo.phone}\n`;
  message += '\n';

  message += '📊 BUSINESS DETAILS\n';
  message += '================================\n\n';
  message += `1. Business Type: ${answers.businessType}\n`;
  message += `2. Objective: ${answers.objective}\n`;
  message += `3. Target Regions: ${Array.isArray(answers.targetRegions) ? answers.targetRegions.join(', ') : answers.targetRegions}\n`;
  if (answers.targetRegions_other) message += `   (Other: ${answers.targetRegions_other})\n`;
  message += `4. Has Amazon Account: ${answers.hasAmazonAccount}\n`;
  message += `5. Product Category: ${answers.productCategory}\n`;
  message += `6. Services Needed: ${Array.isArray(answers.servicesNeeded) ? answers.servicesNeeded.join(', ') : answers.servicesNeeded}\n`;
  message += `7. Monthly Budget: ${answers.monthlyBudget}\n`;
  message += `8. Timeline: ${answers.timeline}\n`;

  message += '\n================================\n';
  message += `📅 Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}\n`;
  message += '\n💼 ARI Business Network Team';

  console.log('📨 Message that will be sent:\n');
  console.log(message);
};

/**
 * RUN ALL DEMOS
 * Uncomment functions below to run specific demos
 */
export const runAllDemos = async () => {
  console.clear();
  console.log('🎯 QUESTIONNAIRE SUBMISSION DEMO - Complete Guide\n');
  console.log('='.repeat(70));

  // Demo 1: Required Fields
  demonstrateRequiredFields();

  // Demo 2: Error Handling
  await demonstrateErrorHandling();

  // Demo 3: Message Generation
  console.log('\n📨 MESSAGE FORMAT DEMO\n');
  demonstrateMessageGeneration();

  // Demo 4: Multiple Scenarios
  await demonstrateMultipleScenarios();

  console.log('\n' + '='.repeat(70));
  console.log('✅ Demo complete! All scenarios validated.\n');
};

/**
 * QUICK START
 * ============
 * To run this demo in browser console:
 *
 * 1. Import the functions:
 *    import { demonstrateProperSubmission, runAllDemos } from './submissionDemo.js';
 *
 * 2. Run single demo:
 *    await demonstrateProperSubmission();
 *
 * 3. Run all demos:
 *    await runAllDemos();
 */

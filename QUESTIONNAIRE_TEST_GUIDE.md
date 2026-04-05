<!-- Questionnaire Test Data Implementation Guide -->

# 📋 Questionnaire Submission - Test Data & Implementation Guide

## Overview

This guide explains how to use the test variables to properly demonstrate and test questionnaire submissions. Three files have been created:

1. **`questionnaireTestData.js`** - Complete test data and variables
2. **`submissionDemo.js`** - Demo functions showing proper submission flow
3. **This guide** - Implementation instructions

---

## 📦 Test Data Files Location

```
src/
├── testData/
│   ├── questionnaireTestData.js     ← Test variables & test data
│   └── submissionDemo.js            ← Demo functions & examples
└── page/
    └── QuestionnairePageNew.jsx     ← Main questionnaire component
```

---

## 🚀 Quick Start - How to Use Test Data

### 1. **Running Submission Demo in Browser Console**

```javascript
// Step 1: Import and run the complete demo
import { demonstrateProperSubmission } from './testData/submissionDemo.js';
await demonstrateProperSubmission();

// Expected Output:
// 🚀 Starting questionnaire submission demo...
// 📋 STEP 1: Validating test data...
// ✅ Validation passed!
// 📦 STEP 2: Preparing submission payload...
// 📤 STEP 3: Submitting to backend...
// ✅ Submission successful!
// 🎉 Questionnaire successfully submitted!
```

---

## 📝 Available Test Data Sets

### **1. Complete Trader Submission**
```javascript
import { TEST_COMPLETE_SUBMISSION_PAYLOAD } from './testData/questionnaireTestData.js';

// Structure:
{
  contactInfo: {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@businessmail.com',
    phone: '+91 98765 43210',
    businessName: 'Kumar Trading Enterprises'
  },
  businessDetails: {
    businessType: 'Trader',
    objective: 'Already selling on Amazon and need support',
    targetRegions: ['India (IN)', 'USA (US)', 'UAE (AE)'],
    // ... 20+ more fields
  }
}
```

**Use Case:** Testing a trading business that's already selling and needs scaling help.

---

### **2. Manufacturer Submission**
```javascript
import { TEST_SUBMISSION_MANUFACTURER } from './testData/questionnaireTestData.js';

// Contact: Priya Sharma (Sharma Handicrafts Studio)
// Scenario: Manufacturer new to Amazon, needs compliance & certification help
```

**Use Case:** Testing a manufacturing company with certification & compliance requirements.

---

### **3. Startup with Issues**
```javascript
import { TEST_SUBMISSION_STARTUP } from './testData/questionnaireTestData.js';

// Contact: Amir Patel (Beauty Innovations Co.)
// Scenario: Startup with suspended account needing account recovery
```

**Use Case:** Testing account recovery and suspension appeal scenarios.

---

## 🔧 Integration with React Component

### **Method 1: Pre-fill Form with Test Data**

Edit `QuestionnairePageNew.jsx` to pre-fill with test data:

```jsx
import { TEST_PREFILLED_ANSWERS, TEST_PREFILLED_CONTACT_INFO } from '../testData/questionnaireTestData';

export default function QuestionnairePageNew() {
  // Replace initial state with test data for demo
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(TEST_PREFILLED_ANSWERS);  // ← Pre-filled!
  const [contactInfo, setContactInfo] = useState(TEST_PREFILLED_CONTACT_INFO);  // ← Pre-filled!
  
  // ... rest of component
}
```

**Result:** Form loads with all test data already filled in, ready to submit.

---

### **Method 2: Add Test Submission Button**

Add a button to the component that submits test data:

```jsx
import { submitTestQuestionnaire, TEST_COMPLETE_SUBMISSION_PAYLOAD } from '../testData/questionnaireTestData';

// Add this button to the component's JSX:
<button
  onClick={async () => {
    const result = await submitTestQuestionnaire(TEST_COMPLETE_SUBMISSION_PAYLOAD);
    if (result.success) {
      toast.success('Test submission successful!');
    } else {
      toast.error('Test submission failed: ' + result.error);
    }
  }}
  className="px-4 py-2 bg-yellow-500 text-white rounded"
>
  📤 Submit Test Data
</button>
```

---

### **Method 3: Run Demonstrations**

```javascript
// In browser console:
import { runAllDemos } from './testData/submissionDemo.js';
await runAllDemos();

// This will show:
// 1. Required vs Optional Fields
// 2. Error Handling Examples
// 3. Message Format
// 4. Multiple Test Scenarios
```

---

## ✅ Complete Submission Checklist

Every proper questionnaire submission requires:

### **Contact Information (REQUIRED)**
- ✅ Full Name: "Rajesh Kumar"
- ✅ Email: "rajesh.kumar@businessmail.com"
- ✅ Phone: "+91 98765 43210"
- ⚠️ Business Name: Can be empty but recommended

### **Business Details (REQUIRED - At least 1 field)**
Minimum one field from these categories:
- ✅ Primary business info: businessType, objective
- ✅ Market info: targetRegions, productCategory
- ✅ Account info: hasAmazonAccount, accountStatus
- ✅ Service needs: servicesNeeded, monthlyBudget

### **Best Practice: Full Submission**
Include all major sections:
- ✅ Business type and objectives
- ✅ Amazon experience and account status
- ✅ Product information
- ✅ Services needed
- ✅ Budget and timeline

---

## 📊 Test Data Structure

### Contact Info
```javascript
{
  name: string (required),          // Minimum 2 characters
  email: string (required),         // Valid email format
  phone: string (required),         // Preferred: +91 format
  businessName: string (optional)   // Company/brand name
}
```

### Business Details
```javascript
{
  // Single-select questions
  businessType: 'Trader' | 'Manufacturer' | 'Both',
  objective: string,
  hasAmazonAccount: 'Yes' | 'No',
  accountStatus: 'Active' | 'Suspended' | etc.,
  
  // Multiple-select questions (arrays)
  targetRegions: ['India (IN)', 'USA (US)', ...],
  servicesNeeded: ['Listing creation', 'PPC Ads', ...],
  
  // Conditional "Other" fields
  targetRegions_other: string,      // If "Others" selected
  productCategory_other: string,    // If "Others" selected
  servicesNeeded_other: string,     // If "Other" selected
  mainObjective_other: string       // If "Other" selected
}
```

---

## 🧪 Testing Different Scenarios

### Scenario 1: Test Happy Path (Full Submission)
```javascript
import { TEST_COMPLETE_SUBMISSION_PAYLOAD, submitTestQuestionnaire } from './testData/questionnaireTestData';

const result = await submitTestQuestionnaire(TEST_COMPLETE_SUBMISSION_PAYLOAD);
console.log('Result:', result);
// Expected: { success: true, data: {...} }
```

### Scenario 2: Test Validation
```javascript
import { validateTestData, TEST_CONTACT_INFO, TEST_BUSINESS_DETAILS_COMPLETE } from './testData/questionnaireTestData';

const validation = validateTestData(TEST_CONTACT_INFO, TEST_BUSINESS_DETAILS_COMPLETE);
console.log('Valid:', validation.valid);  // true
console.log('Errors:', validation.errors);  // []
```

### Scenario 3: Test with Different Business Type
```javascript
import { TEST_SUBMISSION_MANUFACTURER, submitTestQuestionnaire } from './testData/questionnaireTestData';

const result = await submitTestQuestionnaire(TEST_SUBMISSION_MANUFACTURER);
// Tests manufacturer workflow
```

---

## 🔍 Expected Backend Response

When submission succeeds, you'll receive:

```javascript
{
  success: true,
  message: "Questionnaire submitted successfully",
  data: {
    _id: "507f1f77bcf86cd799439011",
    contactInfo: { name, email, phone, businessName },
    businessDetails: { /* all answers */ },
    submittedAt: "2025-03-30T10:30:00Z"
  }
}
```

---

## ❌ Common Errors & Solutions

### Error: "Missing required contact details"
```javascript
// ❌ Wrong
{
  contactInfo: { name: '', email: 'test@test.com', phone: '' },
  businessDetails: { /* ... */ }
}

// ✅ Correct
{
  contactInfo: { name: 'John Doe', email: 'test@test.com', phone: '+91 9876543210' },
  businessDetails: { /* ... */ }
}
```

### Error: "Business details cannot be empty"
```javascript
// ❌ Wrong
{ contactInfo: { /* ... */ }, businessDetails: {} }

// ✅ Correct
{ 
  contactInfo: { /* ... */ }, 
  businessDetails: { businessType: 'Trader' }  // At least one field
}
```

### Error: Network timeout
```javascript
// Solution: Check backend is running
// https://ari-business-network-3.onrender.com should be accessible
```

---

## 📱 Complete Flow Example

```javascript
// 1. Import test data
import { 
  TEST_COMPLETE_SUBMISSION_PAYLOAD,
  validateTestData,
  submitTestQuestionnaire 
} from './testData/questionnaireTestData';

// 2. Validate test data
const { valid, errors } = validateTestData(
  TEST_COMPLETE_SUBMISSION_PAYLOAD.contactInfo,
  TEST_COMPLETE_SUBMISSION_PAYLOAD.businessDetails
);

if (!valid) {
  console.error('Validation failed:', errors);
  return;
}

// 3. Submit questionnaire
const result = await submitTestQuestionnaire(TEST_COMPLETE_SUBMISSION_PAYLOAD);

// 4. Handle response
if (result.success) {
  console.log('✅ Submitted successfully!');
  console.log('Response data:', result.data);
} else {
  console.error('❌ Submission failed:', result.error);
}
```

---

## 🎯 Key Test Variables Quick Reference

| Variable | Description | Usage |
|----------|-------------|-------|
| `TEST_CONTACT_INFO` | Basic contact data | For validation testing |
| `TEST_BUSINESS_DETAILS_COMPLETE` | All questions answered | For complete submission |
| `TEST_COMPLETE_SUBMISSION_PAYLOAD` | Full payload ready to submit | Direct submission |
| `TEST_SUBMISSION_MANUFACTURER` | Manufacturer scenario | Testing different workflow |
| `TEST_SUBMISSION_STARTUP` | Startup scenario | Testing account recovery |
| `TEST_PREFILLED_ANSWERS` | State for React component | Pre-filling the form |
| `TEST_PREFILLED_CONTACT_INFO` | Contact state for React | Pre-filling contact fields |

---

## 📞 Submission Endpoints

### Primary Endpoint
```
POST https://ari-business-network-3.onrender.com/api/questionnaire
Content-Type: application/json

Body: {
  contactInfo: { /* ... */ },
  businessDetails: { /* ... */ }
}
```

### Response
```javascript
{
  success: true,
  message: "Questionnaire submitted successfully",
  data: { _id, contactInfo, businessDetails, submittedAt }
}
```

---

## 🚀 Next Steps

1. **Test in Browser Console**
   ```javascript
   import { demonstrateProperSubmission } from './testData/submissionDemo.js';
   await demonstrateProperSubmission();
   ```

2. **Pre-fill Component with Test Data**
   - Edit `QuestionnairePageNew.jsx`
   - Import test variables
   - Set initial state with test data

3. **Run All Demos**
   ```javascript
   import { runAllDemos } from './testData/submissionDemo.js';
   await runAllDemos();
   ```

4. **Submit to Backend**
   - Use `TEST_COMPLETE_SUBMISSION_PAYLOAD`
   - Test different scenarios
   - Verify email/WhatsApp notifications

---

## 📂 Files Created

1. **`src/testData/questionnaireTestData.js`** (570 lines)
   - All test data constants
   - Validation functions
   - Submission helper functions

2. **`src/testData/submissionDemo.js`** (280 lines)
   - Step-by-step demo functions
   - Error handling examples
   - Message generation demo
   - Multi-scenario testing

3. **`QUESTIONNAIRE_TEST_GUIDE.md`** (This file)
   - Complete implementation guide
   - Usage examples
   - Troubleshooting

---

## ✅ Verification Checklist

- ✅ Contact information is complete (name, email, phone)
- ✅ At least 5-10 business detail fields are filled
- ✅ All conditional "Other" fields are properly filled
- ✅ Arrays (like targetRegions) are properly formatted
- ✅ Backend endpoint is accessible
- ✅ Response includes success status and data ID
- ✅ Email is sent to admin
- ✅ WhatsApp message is generated
- ✅ Admin dashboard shows the submission

---

**Happy Testing! 🎉**

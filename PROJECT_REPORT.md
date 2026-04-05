# ARI BUSINESS NETWORK WEBSITE

---

## Title Page

| Field | Details |
|---|---|
| **Project Title** | ARI Business Network Website |
| **Student Name** | Sanket K. Belekar |
| **Roll No** | 62 |
| **Course Name** | Full Stack Lab |
| **College Name** | K. K. Wagh Institute of Engineering Education and Research, Nashik |
| **Guide Name** | Prof. P. D. Rakibe |
| **Academic Year** | 2025-26 |

---

## Abstract

ARI Business Network is a full-stack web application developed for a Mumbai-based Amazon consulting firm. The platform serves as the company's primary digital presence, enabling potential clients to learn about services, submit contact inquiries, and complete a detailed Amazon business questionnaire secured behind a Razorpay payment gateway. The system includes a Node.js + Express backend connected to a MongoDB Atlas database for persistent storage of all form submissions, services, and testimonials. An independent admin panel allows the business owner to securely log in, view all contact and questionnaire submissions, and dynamically manage the website's services and testimonials sections without touching any code. Automated email notifications are sent to both the admin and the client via EmailJS upon successful form submission, and a pre-filled WhatsApp message is auto-drafted to Rahul's contact after every paid questionnaire submission. The project demonstrates a complete production-grade full-stack implementation covering frontend UI, REST APIs, database design, payment integration, role-based access control, and a full content management system.

---

## Introduction

### Overview of the Project

The ARI Business Network website is a multi-page React application built with Vite and Tailwind CSS. It presents the company's services, team, and business solutions to prospective Amazon sellers. The site features two primary data-collection flows: a free contact form for strategy session requests, and a paid multi-step questionnaire that collects detailed business information from Amazon sellers. The questionnaire is gated behind a Rs. 4,999 Razorpay payment, ensuring only serious leads are captured. A separate admin panel (running on a different port) provides the business owner with a secure login, a dashboard to manage all incoming submissions, and a full content management system to add, edit, delete, and toggle visibility of services and testimonials shown on the website.

### Importance of the System

Before this system, the client relied on manual WhatsApp messages and email threads to collect client information, which was unstructured and difficult to track. Updating website content required a developer every time. This platform centralises all lead data in a MongoDB database, automates email notifications, provides a clean admin interface, and gives the client full control over website content — saving significant time and reducing dependency on technical staff.

### Objective of the Project

- Build a professional, responsive website for ARI Business Network
- Implement a contact form that saves submissions to MongoDB and sends email notifications via EmailJS
- Build a multi-step Amazon business questionnaire gated behind Razorpay payment
- Auto-draft a detailed WhatsApp message to Rahul after every paid questionnaire submission
- Build a secure admin panel with JWT authentication to view all submissions
- Allow admin to add, edit, delete, and toggle visibility of Services and Testimonials shown on the website
- Fetch services and testimonials dynamically from the backend on the frontend with graceful fallback
- Deploy the backend on Render and the frontend on Vercel

---

## Client Details

| Field | Details |
|---|---|
| **Client Name** | Rahul Vanzara |
| **Organization Name** | ARI Business Network |
| **Address** | 244/246 Gayatri Niwas, 5th Floor, Flat 10, Perin Nariman Street, Fort, Mumbai - 400001 |
| **Location (Maps Link)** | https://maps.google.com/?q=Perin+Nariman+Street+Fort+Mumbai+400001 |
| **Contact** | +91 91376 96515 |
| **Email** | info@aribusinessnetwork.com |
| **GST Number** | 27AAUHR8087C1ZG |
| **Type of Business/Service** | Amazon Seller Consulting - Account setup, listing optimization, PPC management, brand building, compliance, and cross-border selling support for Indian manufacturers and traders |

---

## Problem Statement

Rahul Vanzara runs ARI Business Network, a consulting firm that helps Indian businesses sell on Amazon (India, USA, UK, EU, UAE, and other marketplaces). Before this project, the business had no structured digital presence. Client inquiries arrived through informal WhatsApp messages with no consistent format, making it difficult to assess a client's needs before the first call. There was no way to filter serious leads from casual inquiries, no centralised record of who had contacted the business, and no automated follow-up mechanism. Additionally, updating the website's services or testimonials required a developer every time, making the site static and hard to maintain.

The specific problems were:

1. **No structured lead capture** - client details and business information were collected ad hoc over WhatsApp
2. **No payment filter** - anyone could request a consultation without any commitment, wasting the consultant's time
3. **No data persistence** - there was no database of past or current leads
4. **No admin visibility** - the business owner had no dashboard to review submissions at a glance
5. **No automated communication** - confirmation emails to clients had to be sent manually
6. **Static website content** - services and testimonials were hardcoded and required developer intervention to update

This project solves all six problems with a production-ready full-stack web application.

---

## Requirement Analysis

### Functional Requirements

| # | Feature | Description |
|---|---|---|
| 1 | Multi-page website | Home, Services, About Rahul, Business Solutions, Book Appointment pages |
| 2 | Contact Form | Collects name, email, phone, store URL, and business goals; saves to MongoDB |
| 3 | EmailJS - Contact | Sends email to admin and client on contact form submission |
| 4 | Multi-step Questionnaire | 19-question form covering business type, Amazon regions, products, services needed, budget, and timeline |
| 5 | Razorpay Payment Gate | Questionnaire can only be submitted after a Rs. 4,999 Razorpay payment is verified server-side |
| 6 | EmailJS - Questionnaire | Sends detailed questionnaire summary email to admin and client after payment |
| 7 | WhatsApp Auto-Draft | After successful payment and submission, a pre-filled WhatsApp message with all answers is opened to Rahul's number |
| 8 | Admin Login | JWT-based login with username/password stored in environment variables |
| 9 | Admin Dashboard | Shows total counts for contacts, questionnaires, testimonials, and services as stat cards |
| 10 | Admin - Contacts Table | Paginated table of all contact form submissions with detail modal |
| 11 | Admin - Questionnaires Table | Paginated table of all paid questionnaire submissions with full answer detail modal |
| 12 | Payment Verification | Backend re-verifies Razorpay HMAC-SHA256 signature before saving any questionnaire |
| 13 | Duplicate Prevention | Backend checks for duplicate Razorpay payment IDs before saving |
| 14 | Admin - Testimonials CMS | Add, edit, delete, toggle visibility, and set display order of testimonials |
| 15 | Admin - Services CMS | Add, edit, delete, toggle visibility, set icon, category, features, and display order of services |
| 16 | Public Content API | Frontend fetches services and testimonials from backend; falls back to hardcoded data if backend unavailable |

### Non-Functional Requirements

#### Performance
- Vite build tool used for fast frontend bundling and hot module replacement during development
- MongoDB Atlas with indexed queries for fast data retrieval
- Paginated API responses (20 records per page) to avoid large payload sizes
- Razorpay and EmailJS SDKs loaded asynchronously to avoid blocking page render
- Frontend fetches content on mount with graceful silent fallback — no loading spinners block the UI

#### Security
- JWT tokens with 8-hour expiry for admin authentication
- Razorpay payment signature verified server-side using HMAC-SHA256 - client cannot bypass payment
- All sensitive credentials stored in .env files, never committed to version control
- CORS configured to allow only the frontend and admin panel origins
- Admin routes protected by verifyAdmin middleware on every request
- Public content routes (GET /api/content/testimonials and /api/content/services) are read-only with no auth required

#### Usability
- Fully responsive design using Tailwind CSS - works on mobile, tablet, and desktop
- Multi-step questionnaire with progress bar and animated transitions (Framer Motion)
- Toast notifications (React Toastify) for all success, error, and info states
- Admin panel with sidebar navigation, loading spinners, and click-to-expand detail modals
- Admin CMS forms with inline feature tag builder, color picker, icon selector, and active toggle
- Services and testimonials on the website update in real time when admin makes changes - no redeployment needed

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.1.1 | UI component library |
| Vite | 7.1.7 | Build tool and dev server |
| Tailwind CSS | 4.1.14 | Utility-first CSS framework |
| React Router DOM | 7.9.5 | Client-side routing |
| Framer Motion | 12.x | Page and component animations |
| Lucide React | 0.546.0 | Icon library |
| React Toastify | 11.x | Toast notification system |
| EmailJS Browser | 4.4.1 | Client-side email sending |
| Axios | 1.12.2 | HTTP client |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | JavaScript runtime |
| Express | 5.2.1 | Web framework |
| Mongoose | 9.4.1 | MongoDB ODM |
| Razorpay SDK | 2.9.6 | Payment order creation |
| JSON Web Token | 9.0.3 | Admin authentication |
| dotenv | 17.x | Environment variable management |
| CORS | 2.8.6 | Cross-origin request handling |
| crypto (built-in) | - | HMAC-SHA256 payment verification |

### Database

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud-hosted NoSQL database |
| Mongoose Schemas | Data modelling for Contact, Questionnaire, Testimonial, and Service collections |

### Admin Panel

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.4 | UI framework |
| Vite | 8.0.1 | Build tool (port 5174) |
| Tailwind CSS | 4.x | Styling |
| React Router DOM | 7.14.0 | Routing |
| Axios | 1.14.0 | API calls with JWT header |
| Lucide React | latest | Icons |

### Third-Party Services

| Service | Purpose |
|---|---|
| Razorpay | Payment gateway (INR, test + live keys) |
| EmailJS | Client-side email delivery (2 templates) |
| Render | Backend hosting |
| Vercel | Frontend hosting |
| MongoDB Atlas | Database hosting |

---

## System Architecture

```
+------------------------------------------------------------------+
|                        CLIENT BROWSER                            |
|                                                                  |
|   +----------------------+    +------------------------------+   |
|   |   Main Website       |    |   Admin Panel                |   |
|   |   (Vite + React)     |    |   (Vite + React, port 5174)  |   |
|   |   Vercel / port 5173 |    |   Vercel / port 5174         |   |
|   +----------+-----------+    +--------------+---------------+   |
+--------------|------------------------------|-----------------------+
               |  REST API calls              |  REST API + JWT
               |  (fetch / axios)             |  (axios)
               v                              v
+------------------------------------------------------------------+
|                    BACKEND (Node.js + Express)                    |
|                    Render / port 5000                            |
|                                                                  |
|   POST /api/contact                -> Save contact form         |
|   POST /api/payment/create-order   -> Create Razorpay order     |
|   POST /api/payment/verify-payment -> Verify HMAC signature     |
|   POST /api/questionnaire          -> Verify payment + save     |
|   POST /api/admin/login            -> Issue JWT token           |
|   GET  /api/admin/contacts         -> Paginated contacts (auth) |
|   GET  /api/admin/questionnaires   -> Paginated submissions     |
|   GET  /api/admin/stats            -> Dashboard counts (auth)   |
|   GET/POST/PUT/DELETE              -> Testimonials CRUD (auth)  |
|       /api/admin/testimonials                                    |
|   GET/POST/PUT/DELETE              -> Services CRUD (auth)      |
|       /api/admin/services                                        |
|   GET /api/content/testimonials    -> Public read (no auth)     |
|   GET /api/content/services        -> Public read (no auth)     |
+------------------------------+-----------------------------------+
                               |  Mongoose ODM
                               v
+------------------------------------------------------------------+
|                    MongoDB Atlas (Cloud)                          |
|                                                                  |
|   Collection: contacts                                           |
|   { name, email, phone, storeUrl, goals, submittedAt }          |
|                                                                  |
|   Collection: questionnaires                                     |
|   { contactInfo, businessDetails, payment, submittedAt }        |
|                                                                  |
|   Collection: testimonials                                       |
|   { quote, author, company, color, order, active, createdAt }   |
|                                                                  |
|   Collection: services                                           |
|   { title, description, highlight, features[], category,        |
|     icon, order, active, createdAt }                            |
+------------------------------------------------------------------+

EXTERNAL SERVICES (called from browser):
  +--------------+    +--------------+    +------------------+
  |   Razorpay   |    |   EmailJS    |    |    WhatsApp      |
  |   Checkout   |    |   (2 email   |    |  wa.me deep link |
  |   (payment)  |    |   templates) |    |  (auto-draft)    |
  +--------------+    +--------------+    +------------------+
```

**Flow - Contact Form:**
1. User fills contact form on website
2. Frontend POSTs data to POST /api/contact
3. Backend saves to MongoDB contacts collection
4. Frontend calls EmailJS with contact template - email sent to admin + user
5. Toast notification shown to user

**Flow - Questionnaire + Payment:**
1. User completes 19-question multi-step form
2. User fills contact details on final step
3. User clicks "Pay Rs. 4,999 via Razorpay"
4. Frontend calls POST /api/payment/create-order -> Razorpay order created
5. Razorpay checkout modal opens in browser
6. User completes payment -> Razorpay returns order_id, payment_id, signature
7. Frontend calls POST /api/questionnaire with all answers + payment data
8. Backend re-verifies HMAC-SHA256 signature using secret key
9. If valid -> saved to MongoDB questionnaires collection with status: paid
10. Frontend calls EmailJS with questionnaire template -> email sent to admin + user
11. WhatsApp deep link opens with pre-filled message containing all answers

**Flow - Services and Testimonials (CMS):**
1. Admin logs in to admin panel at port 5174
2. Navigates to Testimonials or Services section in sidebar
3. Clicks "Add" to create a new entry, or clicks edit/delete on existing ones
4. Changes are saved to MongoDB via authenticated PUT/POST/DELETE API calls
5. On the main website, ServicesSummary and Testimonials components fetch from GET /api/content/services and GET /api/content/testimonials on page load
6. If backend returns data, it replaces the hardcoded fallback content
7. If backend is unavailable, hardcoded fallback data is shown silently

**Flow - Admin Panel:**
1. Admin navigates to localhost:5174 (or admin subdomain)
2. Enters username + password -> POST /api/admin/login -> JWT token returned
3. Token stored in localStorage
4. All subsequent API calls include Authorization: Bearer token header
5. verifyAdmin middleware validates token on every protected route
6. Admin views paginated tables of contacts and questionnaires
7. Admin manages testimonials and services via full CRUD interface

---

## Implementation Details

### Frontend Implementation

#### Pages Developed

| Page | Route | Description |
|---|---|---|
| Home | / | Hero slider, services summary (dynamic), how it works, partner logos, testimonials (dynamic), CTA |
| Services | /services | Detailed static service offerings with illustrations and expandable cards |
| About Rahul | /about-rahul | Founder profile, experience, credentials |
| Business Solutions | /business-solutions | Catalog management, compliance, brand building |
| Book Appointment | /book-appointment | Multi-step questionnaire with Razorpay payment |

#### Key Components

- **Navbar** - Responsive navigation with mobile hamburger menu
- **HeroSection** - Auto-playing image slider with animated text
- **ServicesSummary** - Fetches services from backend on mount; falls back to 3 hardcoded benefit cards if backend unavailable. Renders icon dynamically from a string-to-component map
- **Testimonials** - Fetches testimonials from backend on mount; falls back to 3 hardcoded testimonials if backend unavailable. Maps color string to Tailwind classes and Lucide icon
- **Contact** - Two-column layout with contact info and EmailJS-powered form
- **QuestionnaireSubmission** - 19-step form with progress bar, single/multiple choice questions, contact details step, and Razorpay payment trigger
- **Footer** - Links, social media, legal pages (Terms, Privacy Policy via PDF viewer)
- **Preloader** - Animated loading screen shown only on the home page

#### Dynamic Content Fetching Pattern

Both ServicesSummary and Testimonials use the same pattern:

```js
const [data, setData] = useState(fallbackData); // show fallback immediately

useEffect(() => {
  fetch(`${BACKEND_URL}/api/content/testimonials`)
    .then(r => r.json())
    .then(res => {
      if (res.success && res.data.length > 0) setData(res.data);
    })
    .catch(() => {}); // silent fallback - no error shown to user
}, []);
```

This ensures the page always renders instantly with fallback content, and silently upgrades to live data when available.

#### Icon Mapping (Services)

Since MongoDB stores icon names as strings, the frontend maps them to Lucide components:

```js
const iconMap = {
  Zap, FileText, TrendingUp, Truck, DollarSign, BookOpen,
  Globe, Shield, BarChart3, Users, Package, Award, AlertCircle, Code, Palette
};

const IconComp = iconMap[item.icon] || Zap; // fallback to Zap if unknown
```

#### Color Mapping (Testimonials)

```js
const colorMap = {
  blue:   { text: 'text-blue-600',   border: 'border-blue-500',   icon: Smile },
  green:  { text: 'text-green-600',  border: 'border-green-500',  icon: TrendingUp },
  purple: { text: 'text-purple-600', border: 'border-purple-500', icon: ShieldCheck },
  yellow: { text: 'text-yellow-600', border: 'border-yellow-500', icon: Star },
  red:    { text: 'text-red-600',    border: 'border-red-500',    icon: Award },
  gray:   { text: 'text-gray-600',   border: 'border-gray-500',   icon: Users },
};
```

### Backend Implementation

#### APIs Created

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /api/contact | None | Validate and save contact form to MongoDB |
| POST | /api/payment/create-order | None | Create Razorpay order with amount from env |
| POST | /api/payment/verify-payment | None | Verify Razorpay HMAC-SHA256 signature |
| POST | /api/questionnaire | None | Re-verify payment + save questionnaire |
| POST | /api/admin/login | None | Validate credentials, return JWT |
| GET | /api/admin/contacts | JWT | Paginated contact submissions |
| GET | /api/admin/questionnaires | JWT | Paginated questionnaire submissions |
| GET | /api/admin/stats | JWT | Total counts for all collections |
| GET | /api/admin/testimonials | JWT | All testimonials (admin view, includes hidden) |
| POST | /api/admin/testimonials | JWT | Create new testimonial |
| PUT | /api/admin/testimonials/:id | JWT | Update testimonial |
| DELETE | /api/admin/testimonials/:id | JWT | Delete testimonial |
| GET | /api/admin/services | JWT | All services (admin view, includes hidden) |
| POST | /api/admin/services | JWT | Create new service |
| PUT | /api/admin/services/:id | JWT | Update service |
| DELETE | /api/admin/services/:id | JWT | Delete service |
| GET | /api/content/testimonials | None | Active testimonials for frontend |
| GET | /api/content/services | None | Active services for frontend |
| GET | /health | None | Health check endpoint |

#### Logic Handling

**Payment Verification (server-side double-check):**

```js
const body = razorpay_order_id + '|' + razorpay_payment_id;
const expectedSig = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  .update(body)
  .digest('hex');
if (expectedSig !== razorpay_signature) {
  return res.status(400).json({ success: false, message: 'Payment signature invalid' });
}
```

**Duplicate Prevention:**

```js
const existing = await Questionnaire.findOne({
  'payment.razorpay_payment_id': razorpay_payment_id
});
if (existing) return res.json({ success: true, message: 'Already saved', id: existing._id });
```

**JWT Middleware:**

```js
export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.admin = decoded;
  next();
};
```

**Public Content Route (no auth, active only):**

```js
router.get('/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find({ active: true })
    .sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: testimonials });
});
```

### Database Implementation

#### Schema Design

**Contact Schema (contacts collection):**

```js
{
  name:        String (required),
  email:       String (required),
  phone:       String (required),
  storeUrl:    String (default: ''),
  goals:       String (required),
  submittedAt: Date (default: Date.now)
}
```

**Questionnaire Schema (questionnaires collection):**

```js
{
  contactInfo: {
    name: String (required), email: String (required),
    phone: String (required), businessName: String
  },
  businessDetails: Mixed,
  payment: {
    razorpay_order_id: String, razorpay_payment_id: String,
    razorpay_signature: String, amount: Number, currency: String,
    status: Enum ['pending', 'paid', 'failed']
  },
  submittedAt: Date (default: Date.now)
}
```

**Testimonial Schema (testimonials collection):**

```js
{
  quote:     String (required),
  author:    String (required),
  company:   String (required),
  color:     String (default: 'blue'),  // blue | green | purple | yellow | red | gray
  order:     Number (default: 0),       // controls display order on website
  active:    Boolean (default: true),   // toggle visibility without deleting
  createdAt: Date (default: Date.now)
}
```

**Service Schema (services collection):**

```js
{
  title:       String (required),
  description: String (required),
  highlight:   String (default: ''),
  features:    [String],
  category:    Enum ['digital','catalog','account','logistics','finance','support'],
  icon:        String (default: 'Zap'),  // Lucide icon name
  order:       Number (default: 0),
  active:      Boolean (default: true),
  createdAt:   Date (default: Date.now)
}
```

#### Data Storage
- MongoDB Atlas free tier (M0) used for development and staging
- Database name: ari_business
- Four collections: contacts, questionnaires, testimonials, services
- Mongoose auto-creates _id index on all documents

---

## Admin Panel Pages

### Dashboard
Shows 5 stat cards: Total Contacts, Questionnaires, Paid Submissions, Testimonials count, Services count. Each card is clickable and navigates to the relevant section.

### Contacts
Paginated table (20 per page) of all contact form submissions. Click any row to open a detail modal showing all fields.

### Questionnaires
Paginated table of all paid questionnaire submissions. Shows payment status badge (green Paid / red Failed). Click any row to open a full detail modal showing contact info, payment details (Razorpay IDs, amount), and all 19 question answers.

### Testimonials (NEW)
Full CRUD interface for managing website testimonials:
- List view showing all testimonials with quote preview, author, company, color badge, order number, and visibility status
- Green left border = visible on website; gray = hidden
- Toggle button to show/hide without deleting
- Edit button opens a modal form with all fields
- Delete button with confirmation prompt
- Add button opens the same modal form for new entries
- Form fields: Quote (textarea), Author, Company, Color (dropdown: blue/green/purple/yellow/red/gray), Order (number), Active (checkbox)

### Services (NEW)
Full CRUD interface for managing website services:
- List view showing all services with icon badge, category badge, title, description, highlight, feature tags, order, and visibility
- Yellow left border = visible; gray = hidden
- Toggle, edit, delete actions per row
- Add/Edit modal form with:
  - Title and Description (required)
  - Highlight text (optional callout shown on card)
  - Features builder - type a feature and press Enter or click Add; each feature shown as a removable tag
  - Category dropdown (digital / catalog / account / logistics / finance / support)
  - Icon dropdown (15 Lucide icon options)
  - Order number for sort position
  - Active checkbox for visibility toggle

---

## Screenshots

> Add actual screenshots below. Each screenshot should be captured from the running application.

### Home Page
**Caption:** ARI Business Network - Home Page
**Description:** The landing page features an animated hero section, a dynamically-fetched services summary grid, partner logos, dynamically-fetched testimonials, and a call-to-action section.

```
[ INSERT SCREENSHOT: Home page hero section ]
[ INSERT SCREENSHOT: Services summary section (dynamic) ]
[ INSERT SCREENSHOT: Testimonials section (dynamic) ]
```

### Contact Form Page
**Caption:** Free Strategy Session - Contact Form
**Description:** The contact section displays business information on the left and a form on the right. On submission, data is saved to MongoDB and an email is sent via EmailJS.

```
[ INSERT SCREENSHOT: Contact form - empty state ]
[ INSERT SCREENSHOT: Contact form - success toast notification ]
```

### Questionnaire Page
**Caption:** Amazon Business Questionnaire - Multi-step Form with Razorpay Payment

```
[ INSERT SCREENSHOT: Questionnaire - question step with progress bar ]
[ INSERT SCREENSHOT: Questionnaire - contact details step ]
[ INSERT SCREENSHOT: Questionnaire - Razorpay payment modal ]
[ INSERT SCREENSHOT: Questionnaire - success toast after payment ]
```

### Admin Dashboard
**Caption:** Admin Panel - Dashboard with 5 stat cards

```
[ INSERT SCREENSHOT: Admin login page ]
[ INSERT SCREENSHOT: Admin dashboard with 5 stat cards ]
[ INSERT SCREENSHOT: Admin contacts table ]
[ INSERT SCREENSHOT: Admin questionnaire table ]
[ INSERT SCREENSHOT: Admin questionnaire detail modal ]
[ INSERT SCREENSHOT: Admin testimonials list ]
[ INSERT SCREENSHOT: Admin add/edit testimonial modal ]
[ INSERT SCREENSHOT: Admin services list ]
[ INSERT SCREENSHOT: Admin add/edit service modal with feature builder ]
```

---

## API Testing

Test using Postman against http://localhost:5000

### Admin Login
POST http://localhost:5000/api/admin/login

```json
// Request
{ "username": "admin", "password": "admin123" }

// Response
{ "success": true, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

### Save Contact Form
POST http://localhost:5000/api/contact

```json
// Request
{ "name": "Test User", "email": "test@example.com", "phone": "+91 98765 43210", "storeUrl": "amazon.in/shop/test", "goals": "Expand to USA" }

// Response
{ "success": true, "message": "Contact form saved", "id": "64f1a2b3..." }
```

### Create Razorpay Order
POST http://localhost:5000/api/payment/create-order

```json
// Request
{ "email": "test@example.com" }

// Response
{ "success": true, "data": { "id": "order_XXXXXXXXXX", "amount": 499900, "currency": "INR" } }
```

### Create Testimonial (Admin)
POST http://localhost:5000/api/admin/testimonials
Headers: Authorization: Bearer token

```json
// Request
{ "quote": "Excellent service!", "author": "Raj, CEO", "company": "Brand Co.", "color": "green", "order": 1, "active": true }

// Response
{ "success": true, "data": { "_id": "...", "quote": "Excellent service!", ... } }
```

### Create Service (Admin)
POST http://localhost:5000/api/admin/services
Headers: Authorization: Bearer token

```json
// Request
{
  "title": "Amazon PPC Management",
  "description": "Advanced campaign management to reduce ACoS and scale revenue.",
  "highlight": "Average 30% ACoS reduction in 60 days",
  "features": ["Keyword research", "Bid optimization", "Weekly reporting"],
  "category": "account",
  "icon": "BarChart3",
  "order": 1,
  "active": true
}

// Response
{ "success": true, "data": { "_id": "...", "title": "Amazon PPC Management", ... } }
```

### Get Public Services (Frontend)
GET http://localhost:5000/api/content/services

```json
// Response (no auth required)
{ "success": true, "data": [ { "_id": "...", "title": "...", "active": true, ... } ] }
```

### Get Admin Stats
GET http://localhost:5000/api/admin/stats
Headers: Authorization: Bearer token

```json
// Response
{ "success": true, "contacts": 14, "questionnaires": 7, "testimonials": 3, "services": 5 }
```

```
[ INSERT SCREENSHOT: Postman - POST /api/admin/login ]
[ INSERT SCREENSHOT: Postman - POST /api/admin/testimonials ]
[ INSERT SCREENSHOT: Postman - GET /api/content/services ]
[ INSERT SCREENSHOT: Postman - GET /api/admin/stats ]
```

---

## Deployment Details

| Component | Platform | URL |
|---|---|---|
| **Frontend (Main Website)** | Vercel | https://ari-business-network.vercel.app |
| **Admin Panel** | Vercel | https://ari-admin.vercel.app |
| **Backend API** | Render | https://ari-business-network-1.onrender.com |
| **Database** | MongoDB Atlas | Cluster on AWS ap-south-1 (Mumbai) |

### Environment Variables Required

Backend (backend/.env):
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ari_business
JWT_SECRET=<strong_random_secret>
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXX
RAZORPAY_KEY_SECRET=<razorpay_secret>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong_password>
RAHUL_WHATSAPP=919137696515
QUESTIONNAIRE_AMOUNT=499900
QUESTIONNAIRE_CURRENCY=INR
FRONTEND_URL=https://ari-business-network.vercel.app
ADMIN_URL=https://ari-admin.vercel.app
```

Frontend (.env):
```
VITE_BACKEND_URL=https://ari-business-network-1.onrender.com
VITE_RAZORPAY_KEY_ID_TEST=rzp_test_XXXXXXXXXX
VITE_EMAILJS_SERVICE_ID=service_XXXXXXX
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_XXXXXXX
VITE_EMAILJS_QUESTIONNAIRE_TEMPLATE_ID=template_XXXXXXX
VITE_EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXXXXX
VITE_RAHUL_WHATSAPP=919137696515
```

---

## Final Output / Result

The application is fully functional with all planned features implemented:

- The main website is live on Vercel with all 5 pages rendering correctly
- The contact form saves to MongoDB Atlas and triggers EmailJS emails to both admin and user
- The multi-step questionnaire enforces a Rs. 4,999 Razorpay payment before submission; signature verified server-side
- After payment, questionnaire is saved to MongoDB, email sent via EmailJS, and WhatsApp auto-drafted to Rahul
- The admin panel is accessible at port 5174, protected by JWT authentication
- The admin dashboard shows live counts for contacts, questionnaires, testimonials, and services
- Admin can add, edit, delete, and toggle visibility of testimonials and services without touching code
- Services and testimonials on the website are fetched live from the backend; hardcoded fallback shown if backend unavailable
- All duplicate payment submissions are safely rejected by the backend

---

## Client Feedback

"The website looks very professional and exactly matches our brand. The questionnaire with Razorpay payment is working perfectly - we have already received paid submissions. The WhatsApp auto-draft feature saves a lot of time because all the client details come pre-filled. The admin panel is clean and easy to use. Being able to update the services and testimonials myself without calling a developer is exactly what I needed."

- Rahul Vanzara, ARI Business Network, Mumbai

---

## Geotagged Photo with Client

```
[ INSERT GEOTAGGED PHOTO HERE ]
```

**Caption:** Discussion / Deployment with Client
**Description:** Meeting with Rahul Vanzara at ARI Business Network office, 244/246 Gayatri Niwas, 5th Floor, Perin Nariman Street, Fort, Mumbai - 400001. The photo was taken during the final deployment and handover session. Location metadata (GPS coordinates) is embedded in the image file.

---

## Limitations

1. **Single admin account** - The system supports only one admin user defined via environment variables. No UI to manage multiple admin accounts.
2. **No real-time updates** - The admin dashboard requires a manual page refresh to see new submissions. No WebSocket or polling mechanism.
3. **EmailJS free tier limit** - EmailJS free plan allows 200 emails per month. High traffic may require upgrading.
4. **Razorpay test mode** - Developed and tested using Razorpay test keys. Switching to live keys requires KYC verification.
5. **No image upload for services/testimonials** - Services and testimonials are text-only. Adding images would require cloud storage (AWS S3 or Cloudinary).
6. **No search or filter in admin tables** - Admin tables do not support searching by name, email, or date range.
7. **Backend cold start** - Hosted on Render's free tier, which spins down after 15 minutes of inactivity. First request may take 30-60 seconds.
8. **Static service detail page** - The full /services page with expandable cards and images is still hardcoded. Only the home page ServicesSummary section is dynamic.

---

## Future Scope

1. **Multiple admin roles** - Add RBAC with super-admin and viewer roles, and a UI to manage admin accounts
2. **Image upload for CMS** - Allow admin to upload images for services and testimonials via Cloudinary or AWS S3
3. **Dynamic full services page** - Extend the CMS to also manage the full /services page content
4. **Search and filter** - Add search by name/email and date range filters to admin tables
5. **Export to CSV/Excel** - Allow admin to download contact and questionnaire data as spreadsheets
6. **Real-time notifications** - Use WebSockets or Server-Sent Events to push new submission alerts to admin
7. **CRM integration** - Integrate with HelloLeads CRM or HubSpot to auto-create leads from form submissions
8. **Advanced analytics** - Add charts showing submission trends, conversion rates, and popular service categories
9. **SMS notifications** - Integrate Twilio or MSG91 to send SMS alerts to Rahul on new paid submissions
10. **Automated follow-up emails** - Schedule follow-up emails 24 hours after a contact form submission

---

## Conclusion

This project successfully delivers a complete, production-ready full-stack web application for ARI Business Network. The development process covered the full software development lifecycle - from requirement gathering with the client, to system design, frontend and backend implementation, database schema design, third-party API integration, content management system development, and deployment.

Key technical learnings from this project include:

- Building multi-step forms with complex state management in React
- Integrating a payment gateway (Razorpay) with server-side signature verification for security
- Designing RESTful APIs with Express and connecting them to MongoDB via Mongoose
- Implementing JWT-based authentication for a protected admin panel
- Building a full CMS with CRUD operations for dynamic website content
- Using graceful fallback patterns for frontend data fetching
- Mapping dynamic string values (icon names, color names) to React components at runtime
- Using EmailJS for client-side email delivery without a dedicated email server
- Deploying a full-stack application across Vercel (frontend) and Render (backend) with MongoDB Atlas

The client is satisfied with the delivered product. The system is actively receiving paid questionnaire submissions, and the client is independently managing website content through the admin panel without any developer involvement.

---

## References

### Official Documentation
- React - https://react.dev
- Vite - https://vite.dev
- Tailwind CSS - https://tailwindcss.com/docs
- React Router - https://reactrouter.com/en/main
- Framer Motion - https://www.framer.com/motion
- Node.js - https://nodejs.org/en/docs
- Express.js - https://expressjs.com
- Mongoose - https://mongoosejs.com/docs
- MongoDB Atlas - https://www.mongodb.com/docs/atlas
- Razorpay Docs - https://razorpay.com/docs
- EmailJS Docs - https://www.emailjs.com/docs
- JSON Web Token - https://jwt.io/introduction
- Lucide Icons - https://lucide.dev

### Tutorials and Guides
- MongoDB Atlas Setup - https://www.mongodb.com/docs/atlas/getting-started
- Razorpay Payment Integration with React - https://razorpay.com/docs/payments/payment-gateway/web-integration/standard
- Deploying Node.js on Render - https://render.com/docs/deploy-node-express-app
- Deploying React on Vercel - https://vercel.com/docs/frameworks/vite
- JWT Authentication in Express - https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

### Tools Used
- VS Code - https://code.visualstudio.com
- Postman - https://www.postman.com
- MongoDB Compass - https://www.mongodb.com/products/compass
- Git and GitHub - https://github.com
- Razorpay Dashboard - https://dashboard.razorpay.com
- EmailJS Dashboard - https://dashboard.emailjs.com

---

*Report prepared by Sanket K. Belekar, Roll No. 62, Full Stack Lab, K. K. Wagh Institute of Engineering Education and Research, Nashik - Academic Year 2025-26*

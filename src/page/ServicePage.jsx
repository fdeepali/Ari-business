import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, ArrowRight, ChevronDown, ChevronUp, Image as ImageIcon, FileText,
  TrendingUp, Package, DollarSign, Award, Shield, Globe, Truck, BarChart3,
  Users, BookOpen, AlertCircle, Zap, Code, Layout, Palette
} from 'lucide-react';

// Image imports
import supportAccount from '../assets/services-img1.png';
import supportGlobal from '../assets/services-img2.png';
import supportTraining from '../assets/services-img3.png';
import supportBrand from '../assets/services-img4.jpg';

// --- Framer Motion Variants (Kept existing, but will apply them more thoroughly) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 }
  }
};

const supportBlockVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.98 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

// Reusable block for the stacked "Comprehensive Amazon Support" sections (Refactored)
function SupportBlock({ imageSrc, captionIcon: Icon, captionTitle, captionText }) {
  return (
    <motion.div
        className="mb-12 border border-gray-100 p-4 rounded-3xl bg-white shadow-xl"
        variants={supportBlockVariants}
        whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl overflow-hidden bg-gray-100 relative">
          <img
            src={imageSrc}
            alt={captionTitle}
            className="w-full h-56 md:h-64 object-cover transition-transform duration-500 hover:scale-105"
          />

            {/* Caption overlay integrated with the image container */}
            <div className="absolute bottom-4 left-4 right-4 max-w-lg">
              <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200 p-4 shadow-lg flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                    <Icon className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{captionTitle}</h3>
                  <p className="text-sm text-gray-600 leading-snug">
                    {captionText}
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}


function ServicePage() {
  const [expandedService, setExpandedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  // --- Service Data (Unchanged) ---
  const serviceCategories = [
    {
      id: 'digital',
      name: 'Digital & Creative',
      icon: Zap,
      color: 'from-pink-500 to-red-600',
      services: [
        {
          title: "Social Media Management",
          icon: Users,
          description: "Develop and execute tailored social media strategies across all major platforms to build brand awareness, engage customers, and drive direct traffic to your Amazon listings.",
          features: [
            "Platform-specific content creation (Meta, TikTok, X)",
            "Community management and engagement",
            "Performance tracking and reporting",
            "Social media advertising campaigns"
          ],
          highlight: "Seamless integration of social presence to support and amplify Amazon sales funnels."
        },
        {
          title: "Influencer Management",
          icon: TrendingUp,
          description: "Strategically identify, vet, and manage micro and macro-influencers to create authentic product endorsements and generate buzz that drives traffic to your Amazon store.",
          features: [
            "Influencer discovery and relationship management",
            "Campaign development and execution",
            "Affiliate and commission tracking",
            "Content review and approval"
          ],
          highlight: "Leverage authentic voices to rapidly scale brand trust and sales velocity."
        },
        {
          title: "Website and App Development",
          icon: Code,
          description: "Design and build high-performance e-commerce websites and mobile apps, offering multi-channel sales and a dedicated brand presence outside of Amazon.",
          features: [
            "Custom e-commerce store setup (e.g., Shopify, WooCommerce)",
            "Seamless integration with inventory systems",
            "**Integration of Razorpay payment gateway**",
            "**Integration of Hello Leads CRM tool**",
            "Mobile-first, responsive design",
            "iOS/Android application development"
          ],
          highlight: "Establish a robust digital footprint for greater brand control and customer data ownership."
        },
        {
          title: "Logo and Packaging Designing",
          icon: Palette,
          description: "Professional graphic design services for creating a memorable brand identity, including logo creation and compliance-focused, appealing product packaging.",
          features: [
            "Full brand style guide development",
            "Print and digital logo variants",
            "Amazon FBA/FBM compliant packaging design",
            "3D mockups and visualization"
          ],
          highlight: "Visually stunning design that ensures Amazon compliance and resonates with your target market."
        }
      ]
    },
    {
      id: 'catalog',
      name: 'Catalog & Content',
      icon: FileText,
      color: 'from-blue-500 to-blue-700',
      services: [
        {
          title: "Imaging",
          icon: ImageIcon,
          description: "Professional photography that maximizes all 9 image spaces Amazon provides. Strategic visual storytelling that sets you apart from competitors using random photos.",
          features: [
            "Utilize all 9 Amazon image slots strategically",
            "Professional lifestyle photography",
            "Infographic creation with compelling visuals",
            "A+ Content imagery optimization"
          ],
          highlight: "Unlike competitors, we maximize every visual opportunity Amazon offers"
        },
        {
          title: "Cataloging",
          icon: Package,
          description: "Optimize every word space in your listings. Our unique approach enhances product visibility and sales algorithms while reducing advertising costs.",
          features: [
            "Strategic keyword placement in all available spaces",
            "SEO optimization for Amazon's A9 algorithm",
            "Bullet point optimization for conversions",
            "Backend search term maximization"
          ],
          highlight: "Our cataloging strategy leads to reduced advertising costs and increased profitability"
        },
        {
          title: "Enhanced Brand Content",
          icon: Award,
          description: "Create compelling A+ Content reviewed by specialized regional experts. Leverage detailed descriptions and brand stories for comprehensive promotion.",
          features: [
            "A+ Content design and implementation",
            "Brand story development",
            "Comparison charts and modules",
            "Regional expert review and optimization"
          ],
          highlight: "Meticulous use of every word space for enhanced algorithms and sales performance"
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Advertising',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-700',
      services: [
        {
          title: "Account Management",
          icon: Users,
          description: "Comprehensive monitoring of Seller Central. Expert placement in relevant categories, proactive notification management, and positive account health.",
          features: [
            "Daily Seller Central monitoring",
            "Accurate category placement",
            "Performance notification management",
            "Account health optimization"
          ],
          highlight: "Thorough monitoring ensuring optimal account performance at all times"
        },
        {
          title: "Advertising Optimization",
          icon: BarChart3,
          description: "Advanced PPC strategies that drive traffic and sales. Uniform optimization across Amazon and social media platforms.",
          features: [
            "Advanced PPC campaign management",
            "Cross-platform optimization",
            "ROI-focused bidding strategies",
            "Continuous performance analysis"
          ],
          highlight: "Consistent optimization across all platforms for maximum efficiency"
        },
        {
          title: "Seller Reinstatement",
          icon: Shield,
          description: "Dedicated legal team to investigate and reinstate suspended accounts with precision and professionalism.",
          features: [
            "Professional appeal writing",
            "Complete documentation preparation",
            "Direct Amazon communication",
            "Preventive strategy implementation"
          ],
          highlight: "Expert legal team specialized in account recovery"
        }
      ]
    },
    {
      id: 'logistics',
      name: 'Logistics & Fulfillment',
      icon: Truck,
      color: 'from-green-500 to-green-700',
      services: [
        {
          title: "FBA Preparation",
          icon: Package,
          description: "Streamlined FBA prep ensuring your products meet all Amazon requirements for seamless fulfillment.",
          features: [
            "Professional labeling services",
            "Packaging compliance verification",
            "Shipment creation and planning",
            "Inventory prep and inspection"
          ],
          highlight: "Complete FBA readiness for smooth operations"
        },
        {
          title: "International Shipping & Returns",
          icon: Globe,
          description: "Navigate cross-border logistics and customs with ease. Expert handling of global shipments and returns.",
          features: [
            "Global logistics coordination",
            "Customs clearance assistance",
            "Return processing and management",
            "International customer support"
          ],
          highlight: "Seamless global operations with expert guidance"
        },
        {
          title: "Excess Inventory Solutions",
          icon: AlertCircle,
          description: "Strategic solutions for surplus inventory including relocation, repositioning, and optimized packaging to reduce logistics costs.",
          features: [
            "Inventory repositioning strategies",
            "Packaging optimization",
            "Cost-effective logistics partnerships",
            "Complete inventory liquidation plans"
          ],
          highlight: "Practical solutions ensuring complete sales and minimized costs"
        }
      ]
    },
    {
      id: 'finance',
      name: 'Accounting & Taxes',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-700',
      services: [
        {
          title: "Accounting Services",
          icon: FileText,
          description: "Accurate bookkeeping, financial reports, and transaction management for both domestic and international operations.",
          features: [
            "Complete financial record management",
            "Payables and receivables tracking",
            "Financial reporting and analysis",
            "Multi-currency transaction handling"
          ],
          highlight: "Expert chartered accountants managing complex financial operations"
        },
        {
          title: "Tax Compliance",
          icon: DollarSign,
          description: "Navigate complex international taxation and foreign exchange. Expert solutions optimizing profitability amid fluctuating rates.",
          features: [
            "Domestic and international tax filing",
            "Sales tax compliance across regions",
            "Foreign exchange optimization",
            "Legal formality navigation"
          ],
          highlight: "Specialized expertise in international tax complexity and FX management"
        }
      ]
    },
    {
      id: 'support',
      name: 'Training & Support',
      icon: BookOpen,
      color: 'from-red-500 to-red-700',
      services: [
        {
          title: "Seller Training",
          icon: BookOpen,
          description: "Comprehensive training programs equipping your team with skills to navigate Amazon's complex ecosystem.",
          features: [
            "One-on-one training sessions",
            "Video tutorial library",
            "Best practices documentation",
            "Market trend insights"
          ],
          highlight: "Expert guidance helping teams master Amazon operations"
        },
        {
          title: "Dedicated Support",
          icon: Users,
          description: "Personalized attention with ongoing expert advice to keep you ahead of industry changes.",
          features: [
            "Priority response times",
            "Dedicated account manager",
            "Proactive strategy updates",
            "Industry change notifications"
          ],
          highlight: "Personalized support ensuring you never miss important updates"
        }
      ]
    }
  ];

  const pricingTiers = [
    { name: "Silver", coverage: "50% Services", price: { inr: "9,999", usd: "121" }, color: "from-gray-400 to-gray-600", popular: false },
    { name: "Gold", coverage: "80% Services", price: { inr: "14,999", usd: "181" }, color: "from-yellow-400 to-yellow-600", popular: true },
    { name: "Platinum", coverage: "100% Services", price: { inr: "19,999", usd: "241" }, color: "from-purple-400 to-purple-600", popular: false },
    { name: "Bespoke", coverage: "120% Services", price: { inr: "Custom", usd: "Custom" }, color: "from-black to-gray-800", popular: false }
  ];

  const allServices = serviceCategories.flatMap(cat => cat.services);
  const displayServices = activeCategory === 'all'
    ? allServices
    : serviceCategories.find(cat => cat.id === activeCategory)?.services || [];

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Comprehensive E-commerce & Digital Marketing Services
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            From a powerful Amazon presence to a robust overall digital brand, we provide end-to-end solutions for your business success.
          </motion.p>
        </motion.div>

        {/* --- Service Category Filters --- */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Services
          </motion.button>

          {serviceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent size={18} />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* --- Services Grid (Interactive Cards) --- */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <AnimatePresence mode="popLayout">
            {displayServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden cursor-pointer group"
                  onClick={() => toggleService(index)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-black to-gray-700 flex items-center justify-center text-white"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent size={24} />
                        </motion.div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedService === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {expandedService === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </motion.div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {service.highlight && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg mb-4 border-l-4 border-black">
                        <p className="text-sm font-semibold text-gray-800">{service.highlight}</p>
                      </div>
                    )}

                    <AnimatePresence>
                      {expandedService === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="border-t-2 border-gray-100 pt-4 mt-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              Key Features:
                            </h4>
                            <ul className="space-y-2">
                              {service.features.map((feature, featureIndex) => (
                                <motion.li
                                  key={featureIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: featureIndex * 0.1 }}
                                  className="flex items-start gap-2 text-gray-700"
                                >
                                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-sm">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      className="flex items-center gap-2 text-black mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span>{expandedService === index ? "Show less" : "Learn more"}</span>
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* --- Comprehensive Amazon Support (Refactored Parent) --- */}
        <motion.div
            className="relative py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
              End-to-End Amazon Success Pillars 🏗️
            </h2>
          <div className="space-y-10">
            <SupportBlock
              imageSrc={supportAccount}
              captionIcon={Users}
              captionTitle="Account Management"
              captionText="We provide ongoing support and proactive recommendations to help you manage and optimize your Amazon seller account for long-term health and success."
            />

            <motion.div 
                className="h-px bg-gray-200 w-full" 
                variants={itemVariants} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.8 }} 
            />

            <SupportBlock
              imageSrc={supportGlobal}
              captionIcon={Globe}
              captionTitle="Global Payments and Logistics"
              captionText="Streamline your international payments and fulfillment needs with expert guidance on global payment solutions and efficient FBA warehousing."
            />

            <motion.div 
                className="h-px bg-gray-200 w-full" 
                variants={itemVariants}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.8 }}
            />

            <SupportBlock
              imageSrc={supportTraining}
              captionIcon={BookOpen}
              captionTitle="Training and Onboarding"
              captionText="Benefit from our 90-day seller training program, designed to equip you and your team with the knowledge and skills needed to thrive on the Amazon platform."
            />

            <motion.div 
                className="h-px bg-gray-200 w-full" 
                variants={itemVariants}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.8 }}
            />

            <SupportBlock
              imageSrc={supportBrand}
              captionIcon={Award}
              captionTitle="Brand Building & A+ Content"
              captionText="Elevate your brand's presence on Amazon with our expert support in creating compelling Enhanced Brand Content (EBC/A+), including free page creation."
            />
          </div>
        </motion.div>

        {/* --- CTA --- */}
        <motion.div
          className="text-center p-12 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-3xl relative overflow-hidden mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

          <div className="relative z-10">
            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Ready to Transform Your Amazon Business?
            </motion.h3>
            <motion.p
              className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Let's discuss how our comprehensive services can streamline your operations, boost sales, and maximize your success on Amazon.
            </motion.p>
            <motion.button
              className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicePage;
import React from 'react';
import { motion } from 'framer-motion';
import {
    Check, ArrowRight, BookOpen, Truck, Users, Layout, Shield, TrendingUp, Zap, Star,
    Package
} from 'lucide-react';

// --- Dummy Image Imports ---
import heroIllustration from '../assets/services-hero-illustration.webp';
import complianceFssai from '../assets/compliance-fssai.webp';
import complianceIso from '../assets/compliance-iso.png';
import complianceDrug from '../assets/compliance-drug.webp';
import complianceMsme from '../assets/compliance-msme.svg';
import setupGst from '../assets/setup-gst.jpg';
import setupCompanyReg from '../assets/setup-company-reg.webp';
import setupNidhi from '../assets/setup-nidhi.jpg';
import brandLogo from '../assets/brand-logo-design.webp';
import brandPackaging from '../assets/brand-packaging.jpg';
import brandSocial from '../assets/brand-social.webp';
import storeFrontend from '../assets/store-frontend-setup.webp';
import storeLogistics from '../assets/store-logistics-suggestions.jpg';
import storeTranslate from '../assets/store-translation.jpg';
import legalTrademark from '../assets/legal-trademark.avif';
import legalIp from '../assets/legal-ip.avif';
import legalReinstatement from '../assets/legal-reinstatement.webp';
import financeVisual from '../assets/finance-visual.jpg';
import consultingIllustration from '../assets/consulting-illustration.webp';
import ctaImage from '../assets/cta-image.png';
import complianceWorkflow from '../assets/compliance-workflow.jpg';

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" }
    }
};

// --- Reusable Components ---
function SectionHeader({ title, children }) {
    return (
        <motion.header
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
            <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-3 h-8 bg-amber-500 rounded-full"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h2>
                <div className="w-3 h-8 bg-amber-500 rounded-full"></div>
            </div>
            {children && <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">{children}</p>}
        </motion.header>
    );
}

function GridCard({ icon: Icon, title, children }) {
    return (
        <motion.div
            className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col items-start relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ 
                y: -8,
                scale: 1.02
            }}
        >
            {/* Golden accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
            
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl group-hover:from-amber-200 group-hover:to-yellow-200 transition-colors duration-300">
                    <Icon className="text-amber-700" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-800 transition-colors duration-300">{title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{children}</p>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-yellow-50/0 group-hover:from-amber-50/30 group-hover:to-yellow-50/30 transition-all duration-500 rounded-2xl"></div>
        </motion.div>
    );
}

function RegulatoryItem({ title, description, imageSrc }) {
    return (
        <motion.div
            className="group flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
            variants={itemVariants}
            whileHover={{ y: -5 }}
        >
            <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">{title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
            </div>
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 group-hover:from-amber-100 group-hover:to-yellow-100 transition-colors duration-300">
                <img src={imageSrc} alt={`${title} logo`} className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300" />
            </div>
        </motion.div>
    );
}

// --- Main Component ---
function BusinessSolutions() {
    return (
        <motion.section
            className="py-20 px-6 bg-gradient-to-b from-gray-50 to-amber-50/30 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto">

                {/* Section 1: Amazon Account Management */}
                <SectionHeader title="Amazon Account Management">
                    Comprehensive solutions for your Amazon presence, optimization, and profit maximization.
                </SectionHeader>

                <motion.div className="flex justify-center mb-20" variants={imageVariants}>
                    <div className="relative">
                        <img 
                            src={heroIllustration} 
                            alt="Amazon Account Management Illustration" 
                            className="w-full max-w-4xl h-auto rounded-3xl shadow-2xl border-4 border-white" 
                        />
                        <div className="absolute inset-0 rounded-3xl shadow-inner"></div>
                    </div>
                </motion.div>

                <motion.div className="grid md:grid-cols-3 gap-8 mb-20" variants={containerVariants}>
                    <GridCard icon={Zap} title="Amazon Boost Service Package">
                        Comprehensive solutions to optimize your Amazon presence and drive sales velocity.
                    </GridCard>
                    <GridCard icon={Shield} title="Brand Registry">
                        Protect your brand and intellectual property on the Amazon platform using official registry tools.
                    </GridCard>
                    <GridCard icon={Layout} title="Amazon Accounting & Taxation">
                        Ensure compliance and maximize your Amazon profits with expert financial services and tax advice.
                    </GridCard>
                </motion.div>

                <motion.div className="h-1 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full w-full mb-20" variants={itemVariants} />

                {/* Section 2: Business Setup */}
                <SectionHeader title="Business Setup & Registration" />

                <motion.div className="grid md:grid-cols-3 gap-8 text-center mb-20" variants={containerVariants}>
                    {[
                        { num: 1, title: "GST Registration", desc: "Ensure compliance with Goods and Services Tax regulations.", img: setupGst },
                        { num: 2, title: "Company Registration", desc: "Establishing your business structure, from sole proprietorship to public limited.", img: setupCompanyReg },
                        { num: 3, title: "Nidhi Company", desc: "Set up a specialized financial service company with Rahul's guidance.", img: setupNidhi }
                    ].map((item, index) => (
                        <motion.div 
                            key={index}
                            className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mb-4 mx-auto text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                {item.num}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">{item.title}</h3>
                            <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
                            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 group-hover:from-amber-100 group-hover:to-yellow-100 transition-colors duration-300">
                                <img src={item.img} alt={item.title} className="w-32 h-20 object-contain mx-auto group-hover:scale-105 transition-transform duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="h-1 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full w-full mb-20" variants={itemVariants} />

                {/* Section 3: Regulatory Compliance */}
                <SectionHeader title="Regulatory Compliance" />

                <motion.div className="grid md:grid-cols-2 gap-12 mb-20" variants={containerVariants}>
                    <div className="space-y-6">
                        <RegulatoryItem title="FSSAI License" description="Obtain the necessary food safety certification to operate your business in the food sector." imageSrc={complianceFssai} />
                        <RegulatoryItem title="ISO Certification" description="Enhance your brand credibility with internationally recognized quality standards." imageSrc={complianceIso} />
                        <RegulatoryItem title="Drug License" description="Secure the appropriate licenses to sell pharmaceutical or medical products." imageSrc={complianceDrug} />
                        <RegulatoryItem title="MSME License" description="Unlock government benefits and support for your enterprise." imageSrc={complianceMsme} />
                    </div>

                    <motion.div 
                        className="relative group"
                        variants={imageVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <img 
                            src={complianceWorkflow} 
                            alt="Compliance Workflow" 
                            className="w-full rounded-3xl shadow-2xl border-4 border-white group-hover:shadow-3xl transition-all duration-500" 
                        />
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.div>
                </motion.div>

                <motion.div className="h-1 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full w-full mb-20" variants={itemVariants} />

                {/* Section 4: Branding & Marketing */}
                <SectionHeader title="Branding & Marketing" />

                <motion.div className="grid md:grid-cols-3 gap-8 text-center mb-20" variants={containerVariants}>
                    {[
                        { icon: Zap, title: "Logo Design", desc: "Create a distinctive visual identity for your brand.", img: brandLogo, color: "pink" },
                        { icon: Package, title: "Packaging Suggestions", desc: "Enhance product presentation and improve conversions.", img: brandPackaging, color: "yellow" },
                        { icon: Star, title: "Social Media Services", desc: "Develop a strong digital presence and audience engagement.", img: brandSocial, color: "purple" }
                    ].map((item, index) => (
                        <motion.div 
                            key={index}
                            className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 flex items-center justify-center mb-4 mx-auto text-${item.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">{item.title}</h3>
                            <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
                            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl overflow-hidden group-hover:from-amber-100 group-hover:to-yellow-100 transition-colors duration-300">
                                <img src={item.img} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="h-1 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full w-full mb-20" variants={itemVariants} />

                {/* Section 5: Amazon Store Setup */}
                <SectionHeader title="Amazon Store Setup" />

                <motion.div className="grid md:grid-cols-3 gap-8 mb-20" variants={containerVariants}>
                    {[
                        { title: "Amazon Storefront Setup", desc: "Professional store setup and optimization.", img: storeFrontend },
                        { title: "Logistics Suggestions", desc: "Efficient delivery & packaging recommendations.", img: storeLogistics },
                        { title: "Translation Services", desc: "Localize your Amazon content globally.", img: storeTranslate }
                    ].map((item, index) => (
                        <motion.div 
                            key={index}
                            className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 text-center"
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">{item.title}</h3>
                            <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
                            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl overflow-hidden group-hover:from-amber-100 group-hover:to-yellow-100 transition-colors duration-300">
                                <img src={item.img} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="h-1 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full w-full mb-20" variants={itemVariants} />

                {/* Section 6: Legal & IP */}
                <SectionHeader title="Legal & Intellectual Property" />

                <motion.div className="grid md:grid-cols-3 gap-8 text-center mb-20" variants={containerVariants}>
                    {[
                        { num: 1, title: "Trademark Registration", desc: "Protect your brand's identity.", img: legalTrademark },
                        { num: 2, title: "IP Services", desc: "Safeguard your creative assets.", img: legalIp },
                        { num: 3, title: "Account Reinstatement", desc: "Resolve account suspensions fast.", img: legalReinstatement }
                    ].map((item, index) => (
                        <motion.div 
                            key={index}
                            className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 mx-auto text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                {item.num}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">{item.title}</h3>
                            <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
                            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 group-hover:from-amber-100 group-hover:to-yellow-100 transition-colors duration-300">
                                <img src={item.img} alt={item.title} className="w-32 h-20 object-contain mx-auto group-hover:scale-105 transition-transform duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="h-1 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full w-full mb-20" variants={itemVariants} />

                {/* Section 7: Financial Services */}
                <SectionHeader title="Financial Services" />

                <motion.div className="grid md:grid-cols-3 gap-8 mb-20" variants={containerVariants}>
                    <div className="md:col-span-2 space-y-6">
                        <GridCard icon={Check} title="GST Return Filing">
                            Ensure timely and accurate filing for your business.
                        </GridCard>
                        <GridCard icon={Check} title="Virtual GST Place">
                            Establish a compliant virtual office for GST needs.
                        </GridCard>
                        <GridCard icon={Check} title="Funding Services">
                            Secure business funding and capital support.
                        </GridCard>
                    </div>

                    <motion.div 
                        className="flex items-center justify-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-500"
                        variants={imageVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <img src={financeVisual} alt="Financial Services" className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-500" />
                    </motion.div>
                </motion.div>

                <motion.div className="h-1 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full w-full mb-20" variants={itemVariants} />

                {/* Section 8: Business Consulting */}
                <SectionHeader title="Business Consulting" />

                <motion.div className="grid md:grid-cols-2 gap-12 mb-20" variants={containerVariants}>
                    <motion.div className="space-y-6" variants={containerVariants}>
                        <GridCard icon={BookOpen} title="Brand Franchise Development">
                            Strategize and execute a strong franchise model.
                        </GridCard>
                        <GridCard icon={Truck} title="Brand Sell-off">
                            Seamless business transfer guidance.
                        </GridCard>
                    </motion.div>

                    <motion.div 
                        className="flex items-center justify-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-500"
                        variants={imageVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <img src={consultingIllustration} alt="Business Consulting" className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-500" />
                    </motion.div>
                </motion.div>

                <motion.div className="h-1 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full w-full mb-20" variants={itemVariants} />

                {/* Section 9: Tailored Solutions */}
                <motion.div 
                    className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-br from-white to-amber-50 p-12 rounded-3xl shadow-2xl border-t-4 border-amber-500 relative overflow-hidden"
                    variants={containerVariants}
                    whileHover={{ y: -5 }}
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500 rounded-full translate-y-12 -translate-x-12"></div>
                    </div>
                    
                    <div className="text-left relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Tailored Solutions</h2>
                        <motion.p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Rahul Vanzara specializes in providing <span className="font-bold text-amber-700">customized solutions</span> that address your unique business needs.
                            Connect today for a <span className="font-bold text-amber-700">personalized consultation</span> and discuss your specific requirements.
                        </motion.p>
                        <motion.button
                            className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started <ArrowRight size={20} />
                        </motion.button>
                    </div>

                    <motion.div 
                        className="flex justify-center relative z-10"
                        variants={imageVariants}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-4 shadow-inner">
                            <img src={ctaImage} alt="Tailored Business Solutions" className="w-64 h-auto rounded-lg" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="mt-20 bg-gradient-to-br from-gray-900 to-black text-white p-16 rounded-3xl shadow-2xl text-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Golden accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                    
                    <h3 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">Ready to Succeed on Amazon?</h3>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10 relative z-10">
                        <motion.button
                            className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Rahul
                        </motion.button>

                        <motion.button
                            className="bg-gray-800 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-amber-500/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                    </div>

                    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed relative z-10">
                        Take the first step toward unlocking your business's full potential on Amazon. Connect with Rahul Vanzara, a trusted <span className="font-bold text-amber-300">Amazon Channel Partner</span>,
                        and begin your journey toward e-commerce success.
                    </p>

                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 right-10 w-20 h-20 bg-amber-500 rounded-full"></div>
                        <div className="absolute bottom-10 left-10 w-16 h-16 bg-amber-500 rounded-full"></div>
                    </div>
                </motion.div>

            </div>
        </motion.section>
    );
}

export default BusinessSolutions;
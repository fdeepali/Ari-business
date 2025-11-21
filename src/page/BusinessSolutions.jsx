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
import storeTranslate from '../assets/store-translation.webp';
import legalTrademark from '../assets/legal-trademark.avif';
import legalIp from '../assets/legal-ip.avif';
import legalReinstatement from '../assets/legal-reinstatement.webp';
import financeVisual from '../assets/finance-visual.jpg';
import consultingIllustration from '../assets/consulting-illustration.webp';
import ctaImage from '../assets/cta-image.png';

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
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
            {children && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{children}</p>}
        </motion.header>
    );
}

function GridCard({ icon: Icon, title, children }) {
    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-start"
            variants={itemVariants}
            whileHover={{ y: -5 }}
        >
            <div className="flex items-center gap-3 mb-3">
                <Icon className="text-blue-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{children}</p>
        </motion.div>
    );
}

function RegulatoryItem({ title, description, imageSrc }) {
    return (
        <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-200"
            variants={itemVariants}
        >
            <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="flex-shrink-0 w-24 h-auto">
                <img src={imageSrc} alt={`${title} logo`} className="w-full object-contain" />
            </div>
        </motion.div>
    );
}

// --- Main Component ---
function BusinessSolutions() {
    return (
        <motion.section
            className="py-16 px-6 bg-gray-50 overflow-hidden"
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

                <motion.div className="flex justify-center mb-16" variants={imageVariants}>
                    <img src={heroIllustration} alt="Amazon Account Management Illustration" className="w-full max-w-4xl h-auto" />
                </motion.div>

                <motion.div className="grid md:grid-cols-3 gap-8 mb-16" variants={containerVariants}>
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

                <motion.div className="h-px bg-gray-200 w-full mb-16" variants={itemVariants} />

                {/* Section 2: Business Setup */}
                <SectionHeader title="Business Setup & Registration" />

                <motion.div className="grid md:grid-cols-3 gap-8 text-center mb-16" variants={containerVariants}>
                    <motion.div className="flex flex-col items-center" variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-blue-600 font-bold">1</div>
                        <h3 className="text-xl font-semibold mb-2">GST Registration</h3>
                        <p className="text-gray-600 mb-4">Ensure compliance with Goods and Services Tax regulations.</p>
                        <img src={setupGst} alt="GST Logo" className="w-32 h-auto" />
                    </motion.div>

                    <motion.div className="flex flex-col items-center" variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-blue-600 font-bold">2</div>
                        <h3 className="text-xl font-semibold mb-2">Company Registration</h3>
                        <p className="text-gray-600 mb-4">Establishing your business structure, from sole proprietorship to public limited.</p>
                        <img src={setupCompanyReg} alt="Company Registration stamp" className="w-32 h-auto" />
                    </motion.div>

                    <motion.div className="flex flex-col items-center" variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-blue-600 font-bold">3</div>
                        <h3 className="text-xl font-semibold mb-2">Nidhi Company</h3>
                        <p className="text-gray-600 mb-4">Set up a specialized financial service company with Rahul's guidance.</p>
                        <img src={setupNidhi} alt="Nidhi Company Illustration" className="w-32 h-auto" />
                    </motion.div>
                </motion.div>

                <motion.div className="h-px bg-gray-200 w-full mb-16" variants={itemVariants} />

                {/* Section 3: Regulatory Compliance */}
                <SectionHeader title="Regulatory Compliance" />

                <motion.div className="grid md:grid-cols-2 gap-8 mb-16" variants={containerVariants}>
                    <div className="space-y-6">
                        <RegulatoryItem title="FSSAI License" description="Obtain the necessary food safety certification to operate your business in the food sector." imageSrc={complianceFssai} />
                        <RegulatoryItem title="ISO Certification" description="Enhance your brand credibility with internationally recognized quality standards." imageSrc={complianceIso} />
                        <RegulatoryItem title="Drug License" description="Secure the appropriate licenses to sell pharmaceutical or medical products." imageSrc={complianceDrug} />
                        <RegulatoryItem title="MSME License" description="Unlock government benefits and support for your enterprise." imageSrc={complianceMsme} />
                    </div>

                    <motion.div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-md" variants={imageVariants}>
                        <p className="text-gray-500 italic">Visual placeholder for compliance processes</p>
                    </motion.div>
                </motion.div>

                <motion.div className="h-px bg-gray-200 w-full mb-16" variants={itemVariants} />

                {/* Section 4: Branding & Marketing */}
                <SectionHeader title="Branding & Marketing" />

                <motion.div className="grid md:grid-cols-3 gap-8 text-center mb-16" variants={containerVariants}>
                    {/* Ensuring uniform image sizes */}
                    <motion.div className="flex flex-col items-center" variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-3 text-pink-600">
                            <Zap size={28} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Logo Design</h3>
                        <p className="text-gray-600 mb-4">Create a distinctive visual identity for your brand.</p>
                        <img src={brandLogo} alt="Logo Design" className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md" />
                    </motion.div>

                    <motion.div className="flex flex-col items-center" variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-3 text-yellow-600">
                            <Package size={28} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Packaging Suggestions</h3>
                        <p className="text-gray-600 mb-4">Enhance product presentation and improve conversions.</p>
                        <img src={brandPackaging} alt="Packaging Suggestions" className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md" />
                    </motion.div>

                    <motion.div className="flex flex-col items-center" variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3 text-purple-600">
                            <Star size={28} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Social Media Services</h3>
                        <p className="text-gray-600 mb-4">Develop a strong digital presence and audience engagement.</p>
                        <img src={brandSocial} alt="Social Media Services" className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md" />
                    </motion.div>
                </motion.div>

                <motion.div className="h-px bg-gray-200 w-full mb-16" variants={itemVariants} />

                {/* Section 5: Amazon Store Setup */}
                <SectionHeader title="Amazon Store Setup" />

                <motion.div className="grid md:grid-cols-3 gap-8 mb-16" variants={containerVariants}>
                    <motion.div className="flex flex-col items-center text-center" variants={itemVariants}>
                        <h3 className="text-xl font-semibold mb-2">Amazon Storefront Setup</h3>
                        <p className="text-gray-600 mb-4">Professional store setup and optimization.</p>
                        <img src={storeFrontend} alt="Amazon Store Setup" className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md" />
                    </motion.div>

                    <motion.div className="flex flex-col items-center text-center" variants={itemVariants}>
                        <h3 className="text-xl font-semibold mb-2">Logistics Suggestions</h3>
                        <p className="text-gray-600 mb-4">Efficient delivery & packaging recommendations.</p>
                        <img src={storeLogistics} alt="Logistics" className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md" />
                    </motion.div>

                    <motion.div className="flex flex-col items-center text-center" variants={itemVariants}>
                        <h3 className="text-xl font-semibold mb-2">Translation Services</h3>
                        <p className="text-gray-600 mb-4">Localize your Amazon content globally.</p>
                        <img src={storeTranslate} alt="Translation Service" className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md" />
                    </motion.div>
                </motion.div>

                <motion.div className="h-px bg-gray-200 w-full mb-16" variants={itemVariants} />

                {/* Section 6: Legal & IP */}
                <SectionHeader title="Legal & Intellectual Property" />

                <motion.div className="grid md:grid-cols-3 gap-8 text-center mb-16" variants={containerVariants}>
                    <motion.div className="flex flex-col items-center" variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-3 text-red-600 font-bold">1</div>
                        <h3 className="text-xl font-semibold mb-2">Trademark Registration</h3>
                        <p className="text-gray-600 mb-4">Protect your brand’s identity.</p>
                        <img src={legalTrademark} alt="Trademark Registration" className="w-32 h-auto" />
                    </motion.div>

                    <motion.div className="flex flex-col items-center" variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-3 text-red-600 font-bold">2</div>
                        <h3 className="text-xl font-semibold mb-2">IP Services</h3>
                        <p className="text-gray-600 mb-4">Safeguard your creative assets.</p>
                        <img src={legalIp} alt="IP Services" className="w-32 h-auto" />
                    </motion.div>

                    <motion.div className="flex flex-col items-center" variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-3 text-red-600 font-bold">3</div>
                        <h3 className="text-xl font-semibold mb-2">Account Reinstatement</h3>
                        <p className="text-gray-600 mb-4">Resolve account suspensions fast.</p>
                        <img src={legalReinstatement} alt="Account Reinstatement" className="w-32 h-auto" />
                    </motion.div>
                </motion.div>

                <motion.div className="h-px bg-gray-200 w-full mb-16" variants={itemVariants} />

                {/* Section 7: Financial Services */}
                <SectionHeader title="Financial Services" />

                <motion.div className="grid md:grid-cols-3 gap-8 mb-16" variants={containerVariants}>
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

                    <motion.div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-md" variants={imageVariants}>
                        <img src={financeVisual} alt="Financial Services" className="w-full h-auto rounded-lg" />
                    </motion.div>
                </motion.div>

                <motion.div className="h-px bg-gray-200 w-full mb-16" variants={itemVariants} />

                {/* Section 8: Business Consulting */}
                <SectionHeader title="Business Consulting" />

                <motion.div className="grid md:grid-cols-2 gap-8 mb-16" variants={containerVariants}>
                    <motion.div className="space-y-6" variants={containerVariants}>
                        <GridCard icon={BookOpen} title="Brand Franchise Development">
                            Strategize and execute a strong franchise model.
                        </GridCard>
                        <GridCard icon={Truck} title="Brand Sell-off">
                            Seamless business transfer guidance.
                        </GridCard>
                    </motion.div>

                    <motion.div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-md" variants={imageVariants}>
                        <img src={consultingIllustration} alt="Business Consulting" className="w-full h-auto rounded-lg" />
                    </motion.div>
                </motion.div>

                <motion.div className="h-px bg-gray-200 w-full mb-16" variants={itemVariants} />

                {/* Section 9: Tailored Solutions */}
                <motion.div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-3xl shadow-2xl border-t-4 border-blue-600" variants={containerVariants}>
                    <div className="text-left">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tailored Solutions</h2>
                        <motion.p className="text-gray-600 text-lg leading-relaxed">
                            Rahul Vanzara specializes in providing <b>customized solutions</b> that address your unique business needs.
                            Connect today for a <b>personalized consultation</b> and discuss your specific requirements.
                        </motion.p>
                    </div>

                    <motion.div className="flex justify-center" variants={imageVariants}>
                        <img src={ctaImage} alt="Tailored Business Solutions" className="w-64 h-auto" />
                    </motion.div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="mt-16 bg-gray-100 text-gray-800 p-12 rounded-3xl shadow-xl text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Succeed on Amazon?</h3>

                    <div className="flex justify-center gap-6 mb-8">
                        <motion.button
                            className="bg-gray-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Rahul
                        </motion.button>

                        <motion.button
                            className="bg-gray-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                    </div>

                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Take the first step toward unlocking your business’s full potential on Amazon. Connect with Rahul Vanzara, a trusted <b>Amazon Channel Partner</b>,
                        and begin your journey toward e-commerce success.
                    </p>
                </motion.div>

            </div>
        </motion.section>
    );
}

export default BusinessSolutions;

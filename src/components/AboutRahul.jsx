import React, { useState, useEffect } from 'react';
import { BadgeCheck, LineChart, Globe2, UserCheck, ChevronRight, Award, TrendingUp, Users, Shield } from 'lucide-react';

// Dummy images you can replace later
import hero1 from '../assets/about-rahul-hero1.jpg';
import hero2 from '../assets/about-rahul-hero2.webp';
import venn from '../assets/about-rahul-venn.png';
import rahulProfile from '../assets/pfp_rahul.jpeg';

function Pill({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md bg-yellow-500 text-black font-bold select-none ${className}`}>
      {children}
    </span>
  );
}

function StatCard({ icon: Icon, title, children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 p-3">
        <Icon className="text-yellow-600" size={24} />
      </div>
      <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}

function TimelineItem({ number, title, children, isLast = false }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), number * 200);
    return () => clearTimeout(timer);
  }, [number]);

  return (
    <div className={`relative pl-12 pb-10 ${!isLast ? 'border-l-2 border-yellow-200' : ''}`}>
      <div className={`absolute -left-6 top-0 transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
      }`}>
        <div className="relative">
          <Pill className="w-12 h-12 text-lg relative z-10">{number}</Pill>
          <div className="absolute -inset-2 bg-yellow-200 rounded-full animate-ping opacity-30"></div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}

function ExperienceCard({ number, title, children, icon: Icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-bl-2xl transform translate-x-4 -translate-y-4"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <Pill>{number}</Pill>
          {Icon && <Icon className="text-yellow-600" size={24} />}
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{children}</p>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 transition-transform duration-300 ${
        isHovered ? 'scale-x-100' : 'scale-x-0'
      }`}></div>
    </div>
  );
}

export default function AboutRahul() {
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '100+', label: 'Clients Served' },
    { number: '$10M+', label: 'Revenue Generated' },
    { number: '15+', label: 'Countries Covered' },
  ];

  return (
    <section className="bg-gradient-to-br mt-7 from-gray-50 via-white to-amber-50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-6">
            <Award size={16} className="mr-2" />
            Official Amazon Channel Partner
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-4">
            Meet <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Rahul</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming businesses through e-commerce excellence, fintech innovation, and global expansion strategies
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {animatedStats ? stat.number : '0'}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Top images with overlay */}
        <div className="grid gap-6 md:grid-cols-2 mb-16">
          <div className="relative rounded-2xl overflow-hidden group">
            <img
              src={hero1}
              alt="Rahul helping clients succeed"
              className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">Driving Business Growth</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img
              src={hero2}
              alt="Global e-commerce expertise"
              className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">Global Expansion Specialist</p>
            </div>
          </div>
        </div>

        {/* Four value props */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          <StatCard icon={BadgeCheck} title="Amazon Partnership" delay={100}>
            Official Amazon Channel Partner leveraging the platform's vast resources to drive business success and scalability.
          </StatCard>
          <StatCard icon={LineChart} title="Sales Excellence" delay={200}>
            Proven track record in driving revenue growth with strategic sales and marketing expertise across multiple industries.
          </StatCard>
          <StatCard icon={Globe2} title="Global Expansion" delay={300}>
            Extensive experience helping businesses scale internationally through e-commerce, banking, and digitization strategies.
          </StatCard>
          <StatCard icon={UserCheck} title="Client Success" delay={400}>
            Personalized service approach with tailored solutions that ensure client success on the Amazon platform and beyond.
          </StatCard>
        </div>

        {/* Professional Journey */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A proven track record of success across e-commerce, fintech, and corporate banking
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TimelineItem number={1} title="Amazon Channel Partner">
              Currently serving as an official Amazon Channel Partner, helping businesses of all sizes optimize their presence and maximize sales on the world's largest e-commerce platform.
            </TimelineItem>
            
            <TimelineItem number={2} title="Fintech & Payments Leadership">
              Held senior sales roles at leading fintech companies including PingPong Payments and Skyee, specializing in cross-border payments, digital banking, and financial technology solutions.
            </TimelineItem>
            
            <TimelineItem number={3} title="Corporate Banking Expertise" isLast={true}>
              Provided tailored financial services as a Corporate Account Executive at Currencies Direct, helping businesses navigate international payments and currency exchange.
            </TimelineItem>
          </div>
        </div>

        {/* Diverse Experience */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Diverse Expertise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A unique blend of skills across multiple domains that creates exceptional value for clients
            </p>
          </div>

          {/* Top row: two items */}
          <div className="grid gap-8 md:grid-cols-2 items-start mb-10">
            <ExperienceCard 
              number={1} 
              title="E-commerce Specialist" 
              icon={TrendingUp}
            >
              Extensive e-commerce expertise with hands-on experience helping businesses optimize their online presence and drive sales growth across global marketplaces.
            </ExperienceCard>

            <ExperienceCard 
              number={2} 
              title="Fintech & Payments Expert" 
              icon={Shield}
            >
              Deep knowledge in fintech and digital payments, with senior roles at industry leaders specializing in cross-border transactions and financial technology solutions.
            </ExperienceCard>
          </div>

          {/* Center image (Venn diagram placeholder) */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <img
                src={venn}
                alt="Rahul's diverse expertise Venn diagram"
                className="w-full max-w-md rounded-2xl border border-gray-200 shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Bottom row: two items */}
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <ExperienceCard 
              number={3} 
              title="Risk & Fraud Prevention" 
              icon={Shield}
            >
              Expertise in risk mitigation and fraud prevention from senior analyst roles, protecting businesses from financial threats while ensuring compliance and security.
            </ExperienceCard>

            <ExperienceCard 
              number={4} 
              title="Customer Experience" 
              icon={Users}
            >
              Client-focused approach honed through customer service roles at leading financial institutions, ensuring exceptional service delivery and relationship management.
            </ExperienceCard>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
            Leverage Rahul's expertise to scale your e-commerce presence, expand globally, and drive sustainable growth.
          </p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center">
            Start Your Journey <ChevronRight size={20} className="ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
}
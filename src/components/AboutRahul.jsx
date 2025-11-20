import React from 'react';
import { BadgeCheck, LineChart, Globe2, UserCheck } from 'lucide-react';

// Dummy images you can replace later
import hero1 from '../assets/about-rahul-hero1.jpg';
import hero2 from '../assets/about-rahul-hero2.webp';
import venn from '../assets/about-rahul-venn.png';

function Pill({ children }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-yellow-500 text-black font-bold select-none">
      {children}
    </span>
  );
}

function StatCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-yellow-50 p-3">
        <Icon className="text-yellow-600" size={24} />
      </div>
      <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}

export default function AboutRahul() {
  return (
    <section className="bg-gradient-to-br mt-7 from-gray-50 to-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section 1: Proven Track Record */}
        <header className="mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Rahul&apos;s Proven Track Record
          </h1>
        </header>

        {/* Top images */}
        <div className="grid gap-6 md:grid-cols-2 mb-10">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={hero1}
              alt="Proven track record banner"
              className="w-full h-64 md:h-72 object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src={hero2}
              alt="Sales skills illustration"
              className="w-full h-64 md:h-72 object-cover"
            />
          </div>
        </div>

        {/* Four value props */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          <StatCard icon={BadgeCheck} title="Amazon Partnership">
            Rahul is an official Amazon Channel Partner, leveraging the platform&apos;s vast resources to help businesses succeed.
          </StatCard>
          <StatCard icon={LineChart} title="Sales Expertise">
            With his strong sales and marketing skills, Rahul has a proven track record of driving business growth.
          </StatCard>
          <StatCard icon={Globe2} title="Global Expansion">
            Rahul&apos;s extensive experience in e-commerce, banking, and digitization enables him to support businesses in expanding internationally.
          </StatCard>
          <StatCard icon={UserCheck} title="Client-Centric Approach">
            Rahul&apos;s focus on personalized service and tailored solutions ensures his clients&apos; success on the Amazon platform.
          </StatCard>
        </div>

        {/* Section 2: Professional Journey */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Rahul&apos;s Professional Journey
          </h2>

          {/* Vertical timeline */}
          <div className="relative pl-10">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

            <div className="relative mb-10">
              <div className="absolute -left-[30px]">
                <Pill>1</Pill>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Amazon Channel Partner</h3>
              <p className="text-gray-600 leading-relaxed">
                Rahul currently serves as an Amazon Channel Partner, helping businesses of all sizes succeed on the e-commerce giant&apos;s platform.
              </p>
            </div>

            <div className="relative mb-10">
              <div className="absolute -left-[30px]">
                <Pill>2</Pill>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Payments and Fintech</h3>
              <p className="text-gray-600 leading-relaxed">
                Rahul has held senior sales roles at leading fintech companies like PingPong Payments and Skyee, leveraging his expertise in cross-border payments and digital banking solutions.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[30px]">
                <Pill>3</Pill>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Corporate Banking</h3>
              <p className="text-gray-600 leading-relaxed">
                Rahul&apos;s experience includes working as a Corporate Account Executive at Currencies Direct, where he provided tailored financial services to businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Diverse Experience */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Rahul&apos;s Diverse Experience
          </h2>

          {/* Top row: two items */}
          <div className="grid gap-8 md:grid-cols-2 items-start mb-10">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <Pill>1</Pill>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">E-commerce Specialist</h3>
              <p className="text-gray-600 leading-relaxed">
                Rahul has extensive experience in the e-commerce industry, having worked as an E-commerce Account Executive at Currencies Direct.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <Pill>2</Pill>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Fintech and Payments Expert</h3>
              <p className="text-gray-600 leading-relaxed">
                Rahul&apos;s background includes roles in the fintech and digital payments space, such as Senior Sales Manager at PingPong Payments.
              </p>
            </div>
          </div>

          {/* Center image (Venn diagram placeholder) */}
          <div className="flex justify-center mb-10">
            <img
              src={venn}
              alt="Diverse experience Venn diagram"
              className="w-full max-w-md rounded-2xl border border-gray-200"
            />
          </div>

          {/* Bottom row: two items */}
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <Pill>3</Pill>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Fraud Prevention Specialist</h3>
              <p className="text-gray-600 leading-relaxed">
                Rahul&apos;s experience as a Senior Fraud Analyst at Radius Global Solutions LLC showcases his expertise in risk mitigation and fraud prevention.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <Pill>4</Pill>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Customer Service Professional</h3>
              <p className="text-gray-600 leading-relaxed">
                Rahul&apos;s early career included a role as a Customer Service Specialist at JPMorgan Chase &amp; Co., where he honed his client-focused approach.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

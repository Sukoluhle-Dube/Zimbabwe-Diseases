
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { MalariaHeatmap, HIVCascadeChart, TBTrendChart } from './components/Diagrams';
import { ArrowDown, Menu, X, FileText, Download } from 'lucide-react';

const KeyStatCard = ({ value, label, delay }: { value: string, label: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-6 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[200px] hover:border-health-crimson/30" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-3xl text-health-crimson font-bold text-center mb-2">{value}</h3>
      <div className="w-8 h-0.5 bg-stone-200 mb-3"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{label}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-health-crimson selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/95 backdrop-blur-md shadow-sm py-4 border-b border-stone-200' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-health-crimson rounded flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">Z</div>
            <div className="flex flex-col leading-none">
                <span className={`font-sans font-bold text-sm tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-80'}`}>
                HEALTH INSIGHTS
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500">Zimbabwe 2025</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-stone-600 uppercase">
            <a href="#overview" onClick={scrollToSection('overview')} className="hover:text-health-crimson transition-colors cursor-pointer">Overview</a>
            <a href="#malaria" onClick={scrollToSection('malaria')} className="hover:text-health-crimson transition-colors cursor-pointer">Malaria</a>
            <a href="#hiv" onClick={scrollToSection('hiv')} className="hover:text-health-crimson transition-colors cursor-pointer">HIV/AIDS</a>
            <a href="#tb" onClick={scrollToSection('tb')} className="hover:text-health-crimson transition-colors cursor-pointer">Tuberculosis</a>
            <button 
              onClick={handleDownload}
              className="px-4 py-2 bg-stone-900 text-white rounded hover:bg-health-crimson transition-colors shadow-sm cursor-pointer flex items-center gap-2"
              title="Print or Save as PDF"
            >
              <FileText size={14} /> Report
            </button>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#overview" onClick={scrollToSection('overview')} className="hover:text-health-crimson transition-colors cursor-pointer">Overview</a>
            <a href="#malaria" onClick={scrollToSection('malaria')} className="hover:text-health-crimson transition-colors cursor-pointer">Malaria</a>
            <a href="#hiv" onClick={scrollToSection('hiv')} className="hover:text-health-crimson transition-colors cursor-pointer">HIV/AIDS</a>
            <a href="#tb" onClick={scrollToSection('tb')} className="hover:text-health-crimson transition-colors cursor-pointer">Tuberculosis</a>
            <button 
              onClick={handleDownload}
              className="px-6 py-3 bg-stone-900 text-white rounded-full flex items-center gap-2 mt-4"
            >
              <FileText size={18} /> Download Report
            </button>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.85)_0%,rgba(249,248,244,0.5)_50%,rgba(249,248,244,0.2)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-health-crimson text-health-crimson text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/50">
            Epidemiological Report • 2025
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6 text-stone-900 drop-shadow-sm">
            Zimbabwe <br/><span className="text-stone-500">Public Health Outlook</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-10">
            A comprehensive analysis of progress and challenges in the fight against Malaria, HIV, and Tuberculosis over the last decade.
          </p>
          
          <div className="flex justify-center">
             <a href="#overview" onClick={scrollToSection('overview')} className="group flex flex-col items-center gap-2 text-xs font-bold tracking-widest text-stone-400 hover:text-stone-900 transition-colors cursor-pointer uppercase">
                <span>Explore Data</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Overview */}
        <section id="overview" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Executive Summary</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">The Triple Burden</h2>
              <div className="w-16 h-1 bg-health-crimson mb-6"></div>
              <p className="text-stone-600 leading-relaxed text-sm">
                  Data Sources: MoHCC, WHO Global Reports, ZimSTAT.
              </p>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-health-crimson">Z</span>imbabwe has made remarkable strides in public health since 2015. Through robust government programs and international partnerships, the country has achieved the <strong className="text-stone-900">95-95-95</strong> targets for HIV and significantly reduced TB incidence.
              </p>
              <p>
                However, challenges remain. <strong className="text-stone-900">Malaria</strong> outbreaks in border regions persist due to climate variability, and drug-resistant TB strains require continued vigilance. This report visualizes the data trends from 2015 to the 2025 projections.
              </p>
            </div>
          </div>
          
          {/* Key Stats Row */}
          <div className="container mx-auto px-6 mt-16 flex flex-wrap justify-center gap-6">
             <KeyStatCard value="-60%" label="New HIV Infections (Since 2010)" delay="0s" />
             <KeyStatCard value="95%" label="HIV Viral Suppression" delay="0.1s" />
             <KeyStatCard value="29" label="Malaria Incidence (per 1k)" delay="0.2s" />
             <KeyStatCard value="89%" label="TB Treatment Success" delay="0.3s" />
          </div>
        </section>

        {/* Malaria Section */}
        <section id="malaria" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-orange-100">
                            VECTOR CONTROL
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Malaria</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           While Zimbabwe has successfully eliminated malaria in most central provinces, transmission remains high in the low-lying border areas.
                        </p>
                        <ul className="space-y-4 text-stone-600 mb-8">
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-health-crimson"></div>
                                <span><strong>Seasonal Transmission:</strong> Peak cases occur during the rainy season (Nov-Apr).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-health-crimson"></div>
                                <span><strong>IRS Coverage:</strong> Indoor Residual Spraying covers >90% of high-risk districts.</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <MalariaHeatmap />
                    </div>
                </div>
            </div>
        </section>

        {/* HIV Section */}
        <section id="hiv" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-7">
                    <HIVCascadeChart />
                </div>
                <div className="md:col-span-5 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-teal-600 uppercase">EPIDEMIC CONTROL</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">HIV / AIDS</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        Zimbabwe is a global leader in the HIV response. By achieving the 95-95-95 targets, the country has ensured that 95% of people living with HIV know their status, 95% of those are on treatment, and 95% of those on treatment are virally suppressed.
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                        Focus has now shifted to sustainability and addressing gaps in pediatric care and adolescent key populations.
                    </p>
                </div>
             </div>
        </section>

        {/* TB Section */}
        <section id="tb" className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="w-96 h-96 rounded-full bg-health-crimson blur-[120px] absolute top-[-100px] left-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <TBTrendChart />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-white text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            Notification Trends
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Tuberculosis</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            TB remains a major public health threat, largely driven by HIV co-infection. However, the estimated incidence rate has fallen significantly over the last decade.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            <strong>Challenge:</strong> Multi-Drug Resistant TB (MDR-TB) requires complex treatment regimens. Investments in GeneXpert machines have improved rapid detection.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Future / Research */}
        <section className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">Genomic Surveillance & Research</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">2025 - 2030 STRATEGY</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">The Path Forward</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        The Ministry of Health and Child Care (MoHCC) aims to strengthen health systems resilience. Key pillars for 2025 include:
                    </p>
                    <ul className="space-y-4 text-stone-700 mb-8 font-medium">
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-health-crimson"></div> Integrated service delivery for HIV/TB/Malaria.
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-health-crimson"></div> Domestic financing to reduce donor dependency.
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-health-crimson"></div> Digital health records and real-time surveillance.
                        </li>
                    </ul>
                </div>
             </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Zimbabwe Health Insights</div>
                <p className="text-sm">Data visualization for the 2025 Epidemiological Outlook.</p>
            </div>
            <div className="flex gap-8 text-sm">
                <a href="#" className="hover:text-white transition-colors">Ministry of Health</a>
                <a href="#" className="hover:text-white transition-colors">WHO Zimbabwe</a>
                <a href="#" className="hover:text-white transition-colors">NAC</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            Sources: Global Fund, UNAIDS, WHO. This is a demonstration visualization.
        </div>
      </footer>
    </div>
  );
};

export default App;

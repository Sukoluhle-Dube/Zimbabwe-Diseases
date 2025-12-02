/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingDown, Target, Map } from 'lucide-react';

// --- MALARIA HEATMAP ---
export const MalariaHeatmap: React.FC = () => {
  // Simplified grid representing provinces or districts
  // Values: 1 = Low, 2 = Moderate, 3 = High Risk
  const initialGrid = [
    [2, 3, 3, 2, 1], // Northern Borders (High)
    [2, 3, 2, 1, 1],
    [1, 2, 1, 1, 1], // Central (Lower)
    [1, 2, 2, 3, 2], // Eastern Borders (High)
    [1, 1, 2, 2, 2], // South
  ];

  const [hoveredCell, setHoveredCell] = useState<{r: number, c: number} | null>(null);

  const getCellColor = (val: number) => {
    switch(val) {
      case 3: return 'bg-health-crimson';
      case 2: return 'bg-orange-400';
      default: return 'bg-stone-200';
    }
  };

  const getLabel = (val: number) => {
     switch(val) {
        case 3: return 'High Transmission Zone (>50 cases/1000)';
        case 2: return 'Moderate Risk';
        default: return 'Low Transmission / Pre-elimination';
     }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <div className="flex items-center gap-2 mb-4">
        <Map className="text-health-crimson" size={20} />
        <h3 className="font-serif text-xl text-stone-800">Malaria Stratification 2024</h3>
      </div>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        Regional incidence analysis showing persistent transmission zones in border provinces (Manicaland, Mashonaland East/Central).
      </p>
      
      <div className="relative p-4 bg-[#F5F4F0] rounded-lg border border-stone-200">
         <div className="grid grid-rows-5 gap-1.5">
            {initialGrid.map((row, rIndex) => (
                <div key={rIndex} className="grid grid-cols-5 gap-1.5">
                    {row.map((val, cIndex) => (
                        <motion.div
                            key={`${rIndex}-${cIndex}`}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-sm cursor-pointer ${getCellColor(val)}`}
                            whileHover={{ scale: 1.1 }}
                            onMouseEnter={() => setHoveredCell({r: rIndex, c: cIndex})}
                            onMouseLeave={() => setHoveredCell(null)}
                        />
                    ))}
                </div>
            ))}
         </div>
      </div>

      <div className="mt-6 h-8 text-sm font-medium text-stone-600">
        {hoveredCell ? getLabel(initialGrid[hoveredCell.r][hoveredCell.c]) : "Hover over regions for details"}
      </div>
      
      <div className="mt-4 flex gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-health-crimson rounded-sm"></div> High</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-400 rounded-sm"></div> Moderate</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-stone-200 rounded-sm"></div> Low</div>
      </div>
    </div>
  );
};

// --- HIV CASCADE (95-95-95) ---
export const HIVCascadeChart: React.FC = () => {
  // Data roughly based on recent Zimbabwe progress reports (e.g. they hit 95-95-95 ahead of schedule)
  const targets = [
    { label: "Diagnosed", value: 96, color: "bg-stone-800" },
    { label: "On Treatment", value: 97, color: "bg-health-crimson" },
    { label: "Virally Suppressed", value: 95, color: "bg-teal-600" },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8 w-full">
      <div className="flex items-center gap-2 mb-2">
        <Target className="text-teal-600" size={20} />
        <h3 className="font-serif text-xl text-stone-900">HIV Care Cascade 2025</h3>
      </div>
      <p className="text-sm text-stone-600 mb-8 text-center max-w-md">
        Progress against the UNAIDS 95-95-95 targets. Zimbabwe is one of the few nations to achieve epidemic control.
      </p>

      <div className="flex flex-col md:flex-row gap-8 items-end justify-center w-full max-w-2xl h-64">
        {targets.map((target, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full w-full">
                <div className="text-2xl font-serif font-bold mb-2 text-stone-800">{target.value}%</div>
                <div className="w-full bg-stone-200 rounded-t-lg relative h-48 overflow-hidden group">
                    {/* Background Target Line at 95% */}
                    <div className="absolute bottom-[95%] w-full h-[2px] bg-stone-400 z-20 border-t border-dashed border-stone-500"></div>
                    
                    <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${target.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: idx * 0.2 }}
                        className={`w-full absolute bottom-0 left-0 right-0 ${target.color} opacity-90 group-hover:opacity-100 transition-opacity`}
                    />
                </div>
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-stone-500 text-center">{target.label}</div>
            </div>
        ))}
      </div>
      
      <div className="mt-6 text-xs text-stone-400 italic">Target: 95% across all indicators by 2025</div>
    </div>
  );
};

// --- TB TREND CHART ---
export const TBTrendChart: React.FC = () => {
    // Mock data reflecting downward trend in incidence per 100k
    const data = [
        { year: 2015, cases: 242 },
        { year: 2017, cases: 221 },
        { year: 2019, cases: 199 },
        { year: 2021, cases: 178 },
        { year: 2023, cases: 155 },
        { year: 2025, cases: 132 }, // Projected
    ];

    const maxVal = 300;

    return (
        <div className="flex flex-col gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg w-full">
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-2 text-health-crimson">
                    <TrendingDown size={20} />
                    <h3 className="font-serif text-xl text-white">TB Notification Rate</h3>
                </div>
                <p className="text-stone-400 text-sm max-w-lg leading-relaxed">
                   Incidence per 100,000 population. Consistent decline due to improved ART coverage and active case finding, though MDR-TB remains a challenge.
                </p>
            </div>
            
            <div className="relative w-full max-w-3xl h-64 bg-stone-800/30 rounded-xl border border-stone-700/50 p-6 flex items-end justify-between gap-2">
                {/* Y-Axis Grid */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-20">
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                </div>

                {data.map((d, i) => (
                    <div key={d.year} className="flex-1 flex flex-col justify-end items-center h-full z-10 group">
                        <div className="relative w-full flex justify-center items-end h-full">
                             <motion.div 
                                className="w-3/4 md:w-12 bg-health-crimson rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                                initial={{ height: 0 }}
                                whileInView={{ height: `${(d.cases / maxVal) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                             >
                                <div className="absolute -top-6 w-full text-center text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    {d.cases}
                                </div>
                             </motion.div>
                        </div>
                        <div className="mt-3 text-xs font-mono text-stone-500">{d.year}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
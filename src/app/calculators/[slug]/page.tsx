'use client';

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import React from 'react';

// A mapping from slug to calculator component and title
const calculatorMap = {
  'emi': { component: dynamic(() => import('@/components/calculators/EmiCalculator')), title: 'EMI Calculator' },
  'sip': { component: dynamic(() => import('@/components/calculators/SipCalculator')), title: 'SIP Calculator' },
  'mutual-fund': { component: dynamic(() => import('@/components/calculators/MutualFundCalculator')), title: 'Mutual Fund Calculator' },
  'capital-gains-tax': { component: dynamic(() => import('@/components/calculators/CapitalGainsTaxCalculator')), title: 'Capital Gains Tax Calculator' },
  'fd': { component: dynamic(() => import('@/components/calculators/FdCalculator')), title: 'Fixed Deposit Calculator' },
  'real-estate-roi': { component: dynamic(() => import('@/components/calculators/RealEstateRoiCalculator')), title: 'Real Estate ROI Calculator' },
  'retirement': { component: dynamic(() => import('@/components/calculators/RetirementPlanner')), title: 'Retirement Planner' },
  'insurance': { component: dynamic(() => import('@/components/calculators/InsurancePremiumCalculator')), title: 'Insurance Premium Calculator' },
  'risk-analyzer': { component: dynamic(() => import('@/components/calculators/InvestmentRiskAnalyzer')), title: 'Investment Risk Analyzer' },
  'currency-exchange': { component: dynamic(() => import('@/components/calculators/CurrencyExchange')), title: 'Currency Exchange' },
};

// Define a type for the calculator slugs
type CalculatorSlug = keyof typeof calculatorMap;

const CalculatorPage = () => {
  const params = useParams();
  const slug = params.slug as CalculatorSlug; // Assert the type here

  // A simple guard against invalid slugs
  if (!slug || !Object.keys(calculatorMap).includes(slug)) {
    return (
        <div className="text-center">
            <h2>Calculator Not Found</h2>
            <p>The calculator you are looking for does not exist.</p>
        </div>
    );
  }

  const calculator = calculatorMap[slug];
  const CalculatorComponent = calculator.component;

  return (
    <div>
      <h1 className="mb-4 text-center">{calculator.title}</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <CalculatorComponent />
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;

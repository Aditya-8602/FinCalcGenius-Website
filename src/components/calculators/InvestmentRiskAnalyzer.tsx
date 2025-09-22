'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const questions = [
  {
    text: 'What is your primary investment goal?',
    name: 'goal',
    options: [
      { text: 'Capital Preservation', value: '1' },
      { text: 'Steady Income', value: '2' },
      { text: 'Balanced Growth', value: '3' },
      { text: 'Aggressive Growth', value: '4' },
    ],
  },
  {
    text: 'How long is your investment horizon?',
    name: 'horizon',
    options: [
      { text: 'Less than 3 years', value: '1' },
      { text: '3 to 5 years', value: '2' },
      { text: '5 to 10 years', value: '3' },
      { text: 'More than 10 years', value: '4' },
    ],
  },
  {
    text: 'How would you react to a sudden 20% drop in your portfolio value?',
    name: 'reaction',
    options: [
      { text: 'Sell everything', value: '1' },
      { text: 'Sell some', value: '2' },
      { text: 'Do nothing', value: '3' },
      { text: 'Buy more', value: '4' },
    ],
  },
    {
    text: 'What percentage of your income are you comfortable investing?',
    name: 'percentage',
    options: [
      { text: 'Less than 5%', value: '1' },
      { text: '5% to 15%', value: '2' },
      { text: '15% to 25%', value: '3' },
      { text: 'More than 25%', value: '4' },
    ],
  },
];

interface RiskProfile {
  profile: string;
  description: string;
}

const getProfile = (score: number) => {
    if (score <= 6) return { profile: 'Conservative', description: 'You prioritize protecting your principal over seeking high returns. You are best suited for low-risk investments like fixed deposits and government bonds.' };
    if (score <= 10) return { profile: 'Moderate', description: 'You are willing to take on some risk for potentially higher returns, but are still cautious. A balanced portfolio of stocks and bonds might suit you.' };
    if (score <= 13) return { profile: 'Growth', description: 'You are comfortable with taking on a significant amount of risk for high growth potential. Your portfolio would likely be heavily weighted in equities.' };
    return { profile: 'Aggressive', description: 'You are highly risk-tolerant and seek maximum returns, understanding the potential for significant losses. You are suited for high-growth stocks, and alternative investments.' };
}

const InvestmentRiskAnalyzer = () => {
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);

  const formik = useFormik({
    initialValues: {
      goal: '',
      horizon: '',
      reaction: '',
      percentage: '',
    },
    validationSchema: Yup.object({
        goal: Yup.string().required('An answer is required.'),
        horizon: Yup.string().required('An answer is required.'),
        reaction: Yup.string().required('An answer is required.'),
        percentage: Yup.string().required('An answer is required.'),
    }),
    onSubmit: values => {
        const score = Object.values(values).reduce((acc, val) => acc + parseInt(val), 0);
        setRiskProfile(getProfile(score));
    },
  });

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
            {questions.map((q, index) => (
                <div key={index} className="mb-4">
                    <p className="fw-bold">{index + 1}. {q.text}</p>
                    {q.options.map(opt => (
                        <div className="form-check" key={opt.value}>
                            <input className="form-check-input" type="radio" name={q.name} id={`${q.name}-${opt.value}`} value={opt.value} onChange={formik.handleChange} checked={formik.values[q.name as keyof typeof formik.values] === opt.value} />
                            <label className="form-check-label" htmlFor={`${q.name}-${opt.value}`}>{opt.text}</label>
                        </div>
                    ))}
                    {formik.touched[q.name as keyof typeof formik.values] && formik.errors[q.name as keyof typeof formik.values] ? <div className="text-danger small mt-1">{formik.errors[q.name as keyof typeof formik.values]}</div> : null}
                </div>
            ))}
          <button type="submit" className="btn btn-primary">Analyze My Risk Profile</button>
        </form>

        {riskProfile && (
          <div className="mt-4">
            <h3 className="text-center">Your Risk Profile</h3>
            <div className="alert alert-info text-center">
                <h4 className="alert-heading">{riskProfile.profile}</h4>
                <p>{riskProfile.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentRiskAnalyzer;

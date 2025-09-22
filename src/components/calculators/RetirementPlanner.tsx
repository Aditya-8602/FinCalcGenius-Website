'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RetirementPlanner = () => {
  const [retirementCorpus, setRetirementCorpus] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalGains, setTotalGains] = useState(0);

  const formik = useFormik({
    initialValues: {
      currentAge: '',
      retirementAge: '',
      currentSavings: '0',
      monthlyContribution: '',
      returnRate: '',
    },
    validationSchema: Yup.object({
      currentAge: Yup.number().required('Required').min(18, 'Must be at least 18'),
      retirementAge: Yup.number().required('Required').min(Yup.ref('currentAge'), 'Must be greater than current age'),
      currentSavings: Yup.number().min(0, 'Cannot be negative'),
      monthlyContribution: Yup.number().required('Required').min(0, 'Cannot be negative'),
      returnRate: Yup.number().required('Required').min(0.1, 'Must be greater than 0'),
    }),
    onSubmit: values => {
      const yearsToRetirement = parseFloat(values.retirementAge) - parseFloat(values.currentAge);
      const n = yearsToRetirement * 12;
      const r = parseFloat(values.returnRate) / 100 / 12;
      
      const p = parseFloat(values.currentSavings) || 0;
      const s = parseFloat(values.monthlyContribution);

      const fvLumpSum = p * Math.pow(1 + r, n);
      const fvSip = s * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      
      const totalCorpus = fvLumpSum + fvSip;
      const totalInvested = p + (s * n);
      const gains = totalCorpus - totalInvested;

      setRetirementCorpus(totalCorpus);
      setTotalInvestment(totalInvested);
      setTotalGains(gains);
    },
  });

  const chartData = {
    labels: ['Total Investment', 'Total Gains'],
    datasets: [
      {
        data: [totalInvestment, totalGains],
        backgroundColor: ['#36A2EB', '#FF9F40'],
        hoverBackgroundColor: ['#36A2EB', '#FF9F40'],
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="currentAge" className="form-label">Current Age</label>
              <input id="currentAge" name="currentAge" type="number" className={`form-control ${formik.touched.currentAge && formik.errors.currentAge ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.currentAge} />
              {formik.touched.currentAge && formik.errors.currentAge ? <div className="invalid-feedback">{formik.errors.currentAge}</div> : null}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="retirementAge" className="form-label">Retirement Age</label>
              <input id="retirementAge" name="retirementAge" type="number" className={`form-control ${formik.touched.retirementAge && formik.errors.retirementAge ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.retirementAge} />
              {formik.touched.retirementAge && formik.errors.retirementAge ? <div className="invalid-feedback">{formik.errors.retirementAge}</div> : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="currentSavings" className="form-label">Current Savings (Optional)</label>
            <input id="currentSavings" name="currentSavings" type="number" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.currentSavings} />
          </div>
          <div className="mb-3">
            <label htmlFor="monthlyContribution" className="form-label">Monthly Contribution</label>
            <input id="monthlyContribution" name="monthlyContribution" type="number" className={`form-control ${formik.touched.monthlyContribution && formik.errors.monthlyContribution ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.monthlyContribution} />
            {formik.touched.monthlyContribution && formik.errors.monthlyContribution ? <div className="invalid-feedback">{formik.errors.monthlyContribution}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="returnRate" className="form-label">Pre-Retirement Annual Return Rate (%)</label>
            <input id="returnRate" name="returnRate" type="number" className={`form-control ${formik.touched.returnRate && formik.errors.returnRate ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.returnRate} />
            {formik.touched.returnRate && formik.errors.returnRate ? <div className="invalid-feedback">{formik.errors.returnRate}</div> : null}
          </div>
          <button type="submit" className="btn btn-primary">Calculate</button>
        </form>

        {retirementCorpus > 0 && (
          <div className="mt-4">
            <h3 className="text-center">Results</h3>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">Estimated Retirement Corpus<span>? {retirementCorpus.toFixed(2)}</span></li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total Investment<span>? {totalInvestment.toFixed(2)}</span></li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total Gains<span>? {totalGains.toFixed(2)}</span></li>
                </ul>
              </div>
              <div className="col-md-6"><Doughnut data={chartData} /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetirementPlanner;

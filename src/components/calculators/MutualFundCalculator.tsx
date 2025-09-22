'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MutualFundCalculator = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);

  const formik = useFormik({
    initialValues: {
      initialInvestment: '0',
      monthlySip: '',
      returnRate: '',
      period: '',
    },
    validationSchema: Yup.object({
      initialInvestment: Yup.number().min(0, 'Cannot be negative'),
      monthlySip: Yup.number().required('Required').min(1, 'Must be greater than 0'),
      returnRate: Yup.number().required('Required').min(0.1, 'Must be greater than 0'),
      period: Yup.number().required('Required').min(1, 'Must be greater than 0'),
    }),
    onSubmit: values => {
      const p = parseFloat(values.initialInvestment) || 0;
      const s = parseFloat(values.monthlySip);
      const r = parseFloat(values.returnRate) / 100 / 12;
      const n = parseFloat(values.period) * 12;

      const fvLumpSum = p * Math.pow(1 + r, n);
      const fvSip = s * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      
      const total = fvLumpSum + fvSip;
      const totalInvested = p + (s * n);
      const returns = total - totalInvested;

      setTotalValue(total);
      setTotalInvestment(totalInvested);
      setEstimatedReturns(returns);
    },
  });

  const chartData = {
    labels: ['Total Investment', 'Estimated Returns'],
    datasets: [
      {
        data: [totalInvestment, estimatedReturns],
        backgroundColor: ['#36A2EB', '#4BC0C0'],
        hoverBackgroundColor: ['#36A2EB', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="initialInvestment" className="form-label">Initial Investment (Optional)</label>
            <input id="initialInvestment" name="initialInvestment" type="number" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.initialInvestment} />
          </div>
          <div className="mb-3">
            <label htmlFor="monthlySip" className="form-label">Monthly SIP Amount</label>
            <input id="monthlySip" name="monthlySip" type="number" className={`form-control ${formik.touched.monthlySip && formik.errors.monthlySip ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.monthlySip} />
            {formik.touched.monthlySip && formik.errors.monthlySip ? <div className="invalid-feedback">{formik.errors.monthlySip}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="returnRate" className="form-label">Expected Annual Return Rate (%)</label>
            <input id="returnRate" name="returnRate" type="number" className={`form-control ${formik.touched.returnRate && formik.errors.returnRate ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.returnRate} />
            {formik.touched.returnRate && formik.errors.returnRate ? <div className="invalid-feedback">{formik.errors.returnRate}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="period" className="form-label">Investment Period (Years)</label>
            <input id="period" name="period" type="number" className={`form-control ${formik.touched.period && formik.errors.period ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.period} />
            {formik.touched.period && formik.errors.period ? <div className="invalid-feedback">{formik.errors.period}</div> : null}
          </div>
          <button type="submit" className="btn btn-primary">Calculate</button>
        </form>

        {totalValue > 0 && (
          <div className="mt-4">
            <h3 className="text-center">Results</h3>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total Investment<span>? {totalInvestment.toFixed(2)}</span></li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Estimated Returns<span>? {estimatedReturns.toFixed(2)}</span></li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total Value<span>? {totalValue.toFixed(2)}</span></li>
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

export default MutualFundCalculator;

'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FdCalculator = () => {
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const formik = useFormik({
    initialValues: {
      principal: '',
      rate: '',
      tenure: '',
      compounding: '1', // Default to Annually
    },
    validationSchema: Yup.object({
      principal: Yup.number().required('Required').min(1, 'Must be greater than 0'),
      rate: Yup.number().required('Required').min(0.1, 'Must be greater than 0'),
      tenure: Yup.number().required('Required').min(1, 'Must be at least 1 year'),
    }),
    onSubmit: values => {
      const p = parseFloat(values.principal);
      const r = parseFloat(values.rate) / 100;
      const t = parseFloat(values.tenure);
      const n = parseInt(values.compounding);

      const amount = p * Math.pow(1 + r / n, n * t);
      const interest = amount - p;

      setMaturityAmount(amount);
      setTotalInterest(interest);
    },
  });

  const chartData = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [formik.values.principal, totalInterest],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="principal" className="form-label">Principal Amount</label>
            <input id="principal" name="principal" type="number" className={`form-control ${formik.touched.principal && formik.errors.principal ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.principal} />
            {formik.touched.principal && formik.errors.principal ? <div className="invalid-feedback">{formik.errors.principal}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="rate" className="form-label">Annual Interest Rate (%)</label>
            <input id="rate" name="rate" type="number" className={`form-control ${formik.touched.rate && formik.errors.rate ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rate} />
            {formik.touched.rate && formik.errors.rate ? <div className="invalid-feedback">{formik.errors.rate}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="tenure" className="form-label">Tenure (Years)</label>
            <input id="tenure" name="tenure" type="number" className={`form-control ${formik.touched.tenure && formik.errors.tenure ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tenure} />
            {formik.touched.tenure && formik.errors.tenure ? <div className="invalid-feedback">{formik.errors.tenure}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="compounding" className="form-label">Compounding Frequency</label>
            <select id="compounding" name="compounding" className="form-select" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.compounding}>
              <option value="1">Annually</option>
              <option value="2">Half-Yearly</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Calculate</button>
        </form>

        {maturityAmount > 0 && (
          <div className="mt-4">
            <h3 className="text-center">Results</h3>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">Maturity Amount<span>? {maturityAmount.toFixed(2)}</span></li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total Interest<span>? {totalInterest.toFixed(2)}</span></li>
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

export default FdCalculator;

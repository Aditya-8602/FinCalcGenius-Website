'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SipCalculator = () => {
  const [maturityValue, setMaturityValue] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalGains, setTotalGains] = useState(0);

  const formik = useFormik({
    initialValues: {
      investment: '',
      rate: '',
      tenure: '',
    },
    validationSchema: Yup.object({
      investment: Yup.number().required('Required').min(1, 'Must be greater than 0'),
      rate: Yup.number().required('Required').min(0.1, 'Must be greater than 0'),
      tenure: Yup.number().required('Required').min(1, 'Must be greater than 0'),
    }),
    onSubmit: values => {
      const investment = parseFloat(values.investment);
      const rate = parseFloat(values.rate) / 100 / 12;
      const tenure = parseFloat(values.tenure) * 12;

      const maturity = investment * ((Math.pow(1 + rate, tenure) - 1) / rate) * (1 + rate);
      const totalInvested = investment * tenure;
      const gains = maturity - totalInvested;

      setMaturityValue(maturity);
      setTotalInvestment(totalInvested);
      setTotalGains(gains);
    },
  });

  const chartData = {
    labels: ['Total Investment', 'Total Gains'],
    datasets: [
      {
        data: [totalInvestment, totalGains],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="investment" className="form-label">Monthly Investment</label>
            <input
              id="investment"
              name="investment"
              type="number"
              className={`form-control ${formik.touched.investment && formik.errors.investment ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.investment}
            />
            {formik.touched.investment && formik.errors.investment ? (
              <div className="invalid-feedback">{formik.errors.investment}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="rate" className="form-label">Expected Annual Return Rate (%)</label>
            <input
              id="rate"
              name="rate"
              type="number"
              className={`form-control ${formik.touched.rate && formik.errors.rate ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rate}
            />
            {formik.touched.rate && formik.errors.rate ? (
              <div className="invalid-feedback">{formik.errors.rate}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="tenure" className="form-label">Investment Tenure (Years)</label>
            <input
              id="tenure"
              name="tenure"
              type="number"
              className={`form-control ${formik.touched.tenure && formik.errors.tenure ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tenure}
            />
            {formik.touched.tenure && formik.errors.tenure ? (
              <div className="invalid-feedback">{formik.errors.tenure}</div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary">Calculate</button>
        </form>

        {maturityValue > 0 && (
          <div className="mt-4">
            <h3 className="text-center">Results</h3>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Maturity Value
                    <span>? {maturityValue.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total Investment
                    <span>? {totalInvestment.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total Gains
                    <span>? {totalGains.toFixed(2)}</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <Doughnut data={chartData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SipCalculator;

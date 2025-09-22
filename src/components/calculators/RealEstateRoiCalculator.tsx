'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RealEstateRoiCalculator = () => {
  const [annualNoi, setAnnualNoi] = useState(0);
  const [roi, setRoi] = useState(0);

  const formik = useFormik({
    initialValues: {
      purchasePrice: '',
      initialCosts: '',
      rentalIncome: '',
      monthlyExpenses: '',
    },
    validationSchema: Yup.object({
      purchasePrice: Yup.number().required('Required').min(1, 'Must be greater than 0'),
      initialCosts: Yup.number().required('Required').min(0, 'Cannot be negative'),
      rentalIncome: Yup.number().required('Required').min(0, 'Cannot be negative'),
      monthlyExpenses: Yup.number().required('Required').min(0, 'Cannot be negative'),
    }),
    onSubmit: values => {
      const totalInvestment = parseFloat(values.purchasePrice) + parseFloat(values.initialCosts);
      const netAnnualIncome = (parseFloat(values.rentalIncome) - parseFloat(values.monthlyExpenses)) * 12;
      const capRate = (netAnnualIncome / totalInvestment) * 100;

      setAnnualNoi(netAnnualIncome);
      setRoi(capRate);
    },
  });

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="purchasePrice" className="form-label">Property Purchase Price</label>
            <input id="purchasePrice" name="purchasePrice" type="number" className={`form-control ${formik.touched.purchasePrice && formik.errors.purchasePrice ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.purchasePrice} />
            {formik.touched.purchasePrice && formik.errors.purchasePrice ? <div className="invalid-feedback">{formik.errors.purchasePrice}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="initialCosts" className="form-label">Closing Costs / Other Initial Costs</label>
            <input id="initialCosts" name="initialCosts" type="number" className={`form-control ${formik.touched.initialCosts && formik.errors.initialCosts ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.initialCosts} />
            {formik.touched.initialCosts && formik.errors.initialCosts ? <div className="invalid-feedback">{formik.errors.initialCosts}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="rentalIncome" className="form-label">Monthly Rental Income</label>
            <input id="rentalIncome" name="rentalIncome" type="number" className={`form-control ${formik.touched.rentalIncome && formik.errors.rentalIncome ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rentalIncome} />
            {formik.touched.rentalIncome && formik.errors.rentalIncome ? <div className="invalid-feedback">{formik.errors.rentalIncome}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="monthlyExpenses" className="form-label">Monthly Expenses (Maintenance, Taxes, etc.)</label>
            <input id="monthlyExpenses" name="monthlyExpenses" type="number" className={`form-control ${formik.touched.monthlyExpenses && formik.errors.monthlyExpenses ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.monthlyExpenses} />
            {formik.touched.monthlyExpenses && formik.errors.monthlyExpenses ? <div className="invalid-feedback">{formik.errors.monthlyExpenses}</div> : null}
          </div>
          <button type="submit" className="btn btn-primary">Calculate</button>
        </form>

        {formik.submitCount > 0 && (
          <div className="mt-4">
            <h3 className="text-center">Results</h3>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">Annual Net Operating Income (NOI)<span>? {annualNoi.toFixed(2)}</span></li>
              <li className="list-group-item d-flex justify-content-between align-items-center">Return on Investment (Cap Rate)<span>{roi.toFixed(2)} %</span></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealEstateRoiCalculator;

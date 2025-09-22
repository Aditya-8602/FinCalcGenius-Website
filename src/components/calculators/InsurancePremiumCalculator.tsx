'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const InsurancePremiumCalculator = () => {
  const [annualPremium, setAnnualPremium] = useState(0);

  const formik = useFormik({
    initialValues: {
      age: '',
      gender: 'male',
      coverage: '',
      health: 'average',
    },
    validationSchema: Yup.object({
      age: Yup.number().required('Required').min(18, 'Must be at least 18').max(70, 'Age limit is 70 for this illustration'),
      coverage: Yup.number().required('Required').min(10000, 'Minimum coverage is 10,000'),
    }),
    onSubmit: values => {
      // This is a fictional, illustrative formula and NOT a real insurance quote.
      const basePremium = 250;
      const ageFactor = (parseFloat(values.age) - 18) * 8;
      const coverageFactor = parseFloat(values.coverage) / 1000 * 0.5;
      
      let genderMultiplier = 1.0;
      if (values.gender === 'male') genderMultiplier = 1.1;

      let healthMultiplier = 1.0;
      if (values.health === 'good') healthMultiplier = 0.9;
      if (values.health === 'excellent') healthMultiplier = 0.8;

      const premium = (basePremium + ageFactor + coverageFactor) * genderMultiplier * healthMultiplier;
      setAnnualPremium(premium);
    },
  });

  return (
    <div className="card">
      <div className="card-body">
        <div className="alert alert-warning" role="alert">
          <strong>Disclaimer:</strong> This is an illustrative tool, not a real insurance quote. Premiums are based on a fictional formula.
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input id="age" name="age" type="number" className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} />
              {formik.touched.age && formik.errors.age ? <div className="invalid-feedback">{formik.errors.age}</div> : null}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select id="gender" name="gender" className="form-select" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="coverage" className="form-label">Desired Coverage Amount</label>
            <input id="coverage" name="coverage" type="number" className={`form-control ${formik.touched.coverage && formik.errors.coverage ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.coverage} />
            {formik.touched.coverage && formik.errors.coverage ? <div className="invalid-feedback">{formik.errors.coverage}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="health" className="form-label">General Health Status</label>
            <select id="health" name="health" className="form-select" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.health}>
              <option value="average">Average</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Estimate Premium</button>
        </form>

        {annualPremium > 0 && (
          <div className="mt-4">
            <h3 className="text-center">Results</h3>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">Estimated Annual Premium<span>? {annualPremium.toFixed(2)}</span></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsurancePremiumCalculator;

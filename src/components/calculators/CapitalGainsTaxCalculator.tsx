'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CapitalGainsTaxCalculator = () => {
  const [capitalGain, setCapitalGain] = useState(0);
  const [gainType, setGainType] = useState('');
  const [tax, setTax] = useState(0);

  const formik = useFormik({
    initialValues: {
      purchasePrice: '',
      salePrice: '',
      holdingPeriod: '', // in months
    },
    validationSchema: Yup.object({
      purchasePrice: Yup.number().required('Required').min(0, 'Cannot be negative'),
      salePrice: Yup.number().required('Required').min(0, 'Cannot be negative'),
      holdingPeriod: Yup.number().required('Required').min(1, 'Must be at least 1 month'),
    }),
    onSubmit: values => {
      const gain = parseFloat(values.salePrice) - parseFloat(values.purchasePrice);
      const period = parseFloat(values.holdingPeriod);
      
      // Simplified tax logic
      const isLongTerm = period > 12;
      const type = isLongTerm ? 'Long-Term Capital Gain' : 'Short-Term Capital Gain';
      const taxRate = isLongTerm ? 0.10 : 0.15; // 10% for LTCG, 15% for STCG
      const calculatedTax = gain > 0 ? gain * taxRate : 0;

      setCapitalGain(gain);
      setGainType(type);
      setTax(calculatedTax);
    },
  });

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="purchasePrice" className="form-label">Purchase Price</label>
            <input id="purchasePrice" name="purchasePrice" type="number" className={`form-control ${formik.touched.purchasePrice && formik.errors.purchasePrice ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.purchasePrice} />
            {formik.touched.purchasePrice && formik.errors.purchasePrice ? <div className="invalid-feedback">{formik.errors.purchasePrice}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="salePrice" className="form-label">Sale Price</label>
            <input id="salePrice" name="salePrice" type="number" className={`form-control ${formik.touched.salePrice && formik.errors.salePrice ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.salePrice} />
            {formik.touched.salePrice && formik.errors.salePrice ? <div className="invalid-feedback">{formik.errors.salePrice}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="holdingPeriod" className="form-label">Holding Period (in Months)</label>
            <input id="holdingPeriod" name="holdingPeriod" type="number" className={`form-control ${formik.touched.holdingPeriod && formik.errors.holdingPeriod ? 'is-invalid' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.holdingPeriod} />
            {formik.touched.holdingPeriod && formik.errors.holdingPeriod ? <div className="invalid-feedback">{formik.errors.holdingPeriod}</div> : null}
          </div>
          <button type="submit" className="btn btn-primary">Calculate</button>
        </form>

        {formik.submitCount > 0 && (
          <div className="mt-4">
            <h3 className="text-center">Results</h3>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {capitalGain >= 0 ? 'Capital Gain' : 'Capital Loss'}
                <span>? {Math.abs(capitalGain).toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">Gain Type<span>{gainType}</span></li>
              <li className="list-group-item d-flex justify-content-between align-items-center">Estimated Tax<span>? {tax.toFixed(2)}</span></li>
            </ul>
            <p className="text-muted small mt-2">Note: This is a simplified calculation. Tax laws are complex and can change. Consult a financial advisor for accurate calculations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapitalGainsTaxCalculator;

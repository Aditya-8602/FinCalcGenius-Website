'use client';

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// NOTE: You need to get a free API key from a provider like https://www.exchangerate-api.com/
// and add it to your environment variables as NEXT_PUBLIC_EXCHANGE_RATE_API_KEY
const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY || 'YOUR_API_KEY_HERE';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}`;

const CurrencyExchange = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      if (apiKey === 'YOUR_API_KEY_HERE') {
          setError('API key not configured. Please see comments in the code.');
          setLoading(false);
          setCurrencies(['USD', 'EUR', 'GBP', 'JPY', 'INR']); // Fallback for UI
          return;
      }
      try {
        const response = await fetch(`${apiUrl}/codes`);
        const data = await response.json();
        if (data.result === 'success') {
          setCurrencies(data.supported_codes.map((c: [string, string]) => c[0]));
        } else {
          setError(data['error-type'] || 'Failed to fetch currency codes.');
        }
      } catch (err) {
        setError('Failed to connect to the currency API.');
      }
      setLoading(false);
    };
    fetchCurrencies();
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: '1',
      from: 'USD',
      to: 'INR',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Required').min(0.01, 'Must be greater than 0'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setResult(null);
      setError('');
      try {
        const response = await fetch(`${apiUrl}/pair/${values.from}/${values.to}/${values.amount}`);
        const data = await response.json();
        if (data.result === 'success') {
          setResult(data.conversion_result);
        } else {
          setError(data['error-type'] || 'Failed to perform conversion.');
        }
      } catch (err) {
        setError('Failed to connect to the currency API.');
      }
      setLoading(false);
    },
  });

  return (
    <div className="card">
      <div className="card-body">
        {apiKey === 'YOUR_API_KEY_HERE' && <div className="alert alert-danger">API Key is not configured. This component will not work until you add a valid key.</div>}
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input id="amount" name="amount" type="number" className={`form-control ${formik.touched.amount && formik.errors.amount ? 'is-invalid' : ''}`} onChange={formik.handleChange} value={formik.values.amount} />
              {formik.touched.amount && formik.errors.amount ? <div className="invalid-feedback">{formik.errors.amount}</div> : null}
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="from" className="form-label">From</label>
              <select id="from" name="from" className="form-select" onChange={formik.handleChange} value={formik.values.from}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="to" className="form-label">To</label>
              <select id="to" name="to" className="form-select" onChange={formik.handleChange} value={formik.values.to}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading || !!error}>{loading ? 'Converting...' : 'Convert'}</button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {result !== null && (
          <div className="mt-4">
            <h3 className="text-center">Conversion Result</h3>
            <div className="alert alert-success text-center">
                <h4 className="alert-heading">{formik.values.amount} {formik.values.from} = {result.toFixed(4)} {formik.values.to}</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyExchange;

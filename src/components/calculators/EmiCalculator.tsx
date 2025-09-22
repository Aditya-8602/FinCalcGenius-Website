'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

ChartJS.register(ArcElement, Tooltip, Legend);

const EmiCalculator = () => {
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const formik = useFormik({
    initialValues: {
      principal: '',
      rate: '',
      tenure: '',
    },
    validationSchema: Yup.object({
      principal: Yup.number().required('Required').min(1, 'Must be greater than 0'),
      rate: Yup.number().required('Required').min(0.1, 'Must be greater than 0'),
      tenure: Yup.number().required('Required').min(1, 'Must be greater than 0'),
    }),
    onSubmit: values => {
      const principal = parseFloat(values.principal);
      const rate = parseFloat(values.rate) / 100 / 12;
      const tenure = parseFloat(values.tenure) * 12;

      const emiValue = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      const totalPaymentValue = emiValue * tenure;
      const totalInterestValue = totalPaymentValue - principal;

      setEmi(emiValue);
      setTotalInterest(totalInterestValue);
      setTotalPayment(totalPaymentValue);
    },
  });

  const chartData = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [formik.values.principal, totalInterest],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.text("EMI Calculation Results", 20, 20);
    doc.text(`Loan Amount: ${formik.values.principal}`, 20, 30);
    doc.text(`Annual Interest Rate: ${formik.values.rate}%`, 20, 40);
    doc.text(`Loan Tenure: ${formik.values.tenure} years`, 20, 50);
    doc.text("------------------------------", 20, 60);
    doc.text(`Monthly EMI: ${emi.toFixed(2)}`, 20, 70);
    doc.text(`Total Interest: ${totalInterest.toFixed(2)}`, 20, 80);
    doc.text(`Total Payment: ${totalPayment.toFixed(2)}`, 20, 90);
    doc.save("emi-results.pdf");
  };

  const handleExportExcel = () => {
    const data = [
      ["Loan Amount", formik.values.principal],
      ["Annual Interest Rate (%)", formik.values.rate],
      ["Loan Tenure (Years)", formik.values.tenure],
      ["", ""],
      ["Monthly EMI", emi.toFixed(2)],
      ["Total Interest", totalInterest.toFixed(2)],
      ["Total Payment", totalPayment.toFixed(2)],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "EMI Results");
    XLSX.writeFile(wb, "emi-results.xlsx");
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          {/* Form fields remain the same */}
          <div className="mb-3">
            <label htmlFor="principal" className="form-label">Loan Amount (Principal)</label>
            <input
              id="principal"
              name="principal"
              type="number"
              className={`form-control ${formik.touched.principal && formik.errors.principal ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.principal}
            />
            {formik.touched.principal && formik.errors.principal ? (
              <div className="invalid-feedback">{formik.errors.principal}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="rate" className="form-label">Annual Interest Rate (%)</label>
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
            <label htmlFor="tenure" className="form-label">Loan Tenure (Years)</label>
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

        {emi > 0 && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-center mb-0">Results</h3>
                <div>
                    <button className="btn btn-secondary btn-sm me-2" onClick={handleExportPdf}>Export as PDF</button>
                    <button className="btn btn-secondary btn-sm" onClick={handleExportExcel}>Export as Excel</button>
                </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Monthly EMI
                    <span>? {emi.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total Interest
                    <span>? {totalInterest.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total Payment
                    <span>? {totalPayment.toFixed(2)}</span>
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

export default EmiCalculator;

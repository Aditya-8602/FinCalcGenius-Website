import React from 'react';

const AboutPage = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">About FinCalcGenius</h1>
      <div className="card p-4">
        <img
          src="/images/Image2.jpg"
          alt="About FinCalcGenius"
          className="img-fluid mx-auto d-block my-4"
          style={{ maxWidth: '35%', height: 'auto' }} // Reduced maxWidth to 35%
        />
        <p>
          FinCalcGenius is your ultimate online resource for comprehensive and user-friendly financial calculators.
          Our mission is to empower individuals, from students and freelancers to working professionals,
          with the tools they need to make informed financial decisions.
        </p>
        <p>
          We believe that understanding personal finance shouldn't be complicated. That's why we've designed
          a suite of intuitive calculators covering everything from investment planning (SIP, Mutual Funds)
          and loan management (EMI) to retirement planning and real estate analysis.
        </p>
        <p>
          Our goal is to simplify complex financial concepts, providing clear results and insights
          to help you plan your future with confidence.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

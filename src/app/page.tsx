import Link from 'next/link';

const calculators = [
  { name: 'SIP Calculator', href: '/calculators/sip', description: 'Plan your Systematic Investment Plan.', icon: '/images/icons/icon-sip.svg' },
  { name: 'Mutual Fund Calculator', href: '/calculators/mutual-fund', description: 'Estimate returns on your mutual fund investments.', icon: '/images/icons/icon-mutual-fund.svg' },
  { name: 'Capital Gains Tax Calculator', href: '/calculators/capital-gains-tax', description: 'Calculate taxes on your capital gains.', icon: '/images/icons/icon-tax.svg' },
  { name: 'EMI Calculator', href: '/calculators/emi', description: 'Calculate your Equated Monthly Installments for loans.', icon: '/images/icons/icon-emi.svg' },
  { name: 'Fixed Deposit (FD) Calculator', href: '/calculators/fd', description: 'Calculate maturity amount of your Fixed Deposit.', icon: '/images/icons/icon-fd.svg' },
  { name: 'Real Estate ROI Calculator', href: '/calculators/real-estate-roi', description: 'Analyze the return on your real estate investment.', icon: '/images/icons/icon-real-estate.svg' },
  { name: 'Retirement Planner', href: '/calculators/retirement', description: 'Plan for your retirement savings.', icon: '/images/icons/icon-retirement.svg' },
  { name: 'Insurance Premium Calculator', href: '/calculators/insurance', description: 'Estimate your insurance premium.', icon: '/images/icons/icon-insurance.svg' },
  { name: 'Investment Risk Analyzer', href: '/calculators/risk-analyzer', description: 'Assess the risk profile of your investments.', icon: '/images/icons/icon-risk.svg' },
  { name: 'Currency Exchange', href: '/calculators/currency-exchange', description: 'Get real-time currency exchange rates.', icon: '/images/icons/icon-currency.svg' },
];

export default function HomePage() {
  return (
    <div>
      <section className="d-flex flex-column align-items-center py-5"> {/* Changed classes for centering */}
        <h1 className="display-4">Welcome to FinCalcGenius</h1>
        <p className="lead">Your one-stop destination for all financial calculations. Empower your financial decisions with our easy-to-use calculators.</p>
        <img
          src="/images/Finance.png"
          alt="Finance Image"
          className="img-fluid mt-4 mb-4"
          style={{
            maxWidth: '90%',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), 0 6px 6px rgba(0, 0, 0, 0.23)',
            borderRadius: '8px',
          }}
        />
      </section>

      <section id="calculators" className="py-5">
        <h2 className="text-center mb-4">Our Calculators</h2>
        <div className="row">
          {calculators.map((calc) => (
            <div className="col-md-4 mb-4" key={calc.href}>
              <div className="card h-100 calculator-card">
                <div className="card-body d-flex flex-column align-items-center">
                  <img src={calc.icon} alt={`${calc.name} Icon`} className="mb-3" style={{ width: '50px', height: '50px' }} /> {/* Use calc.icon */}
                  <h5 className="card-title">{calc.name}</h5>
                  <p className="card-text text-center">{calc.description}</p>
                  <Link href={calc.href} className="btn btn-primary mt-auto">
                    Calculate
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

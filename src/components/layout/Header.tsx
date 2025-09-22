import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className="h4 text-white text-decoration-none d-flex align-items-center">
          <img src="/images/Icon2.0.png" alt="FinCalcGenius Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} /> {/* Increased size to 50px */}
          FinCalcGenius
        </Link>
        <nav>
          <Link href="/#calculators" className="text-white ms-3 text-decoration-none">Calculators</Link>
          <Link href="/about" className="text-white ms-3 text-decoration-none">About</Link>
          <Link href="/contact" className="text-white ms-3 text-decoration-none">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import { Link } from 'react-router-dom';
import {
  Shield,
  Building2,
  Coins,
  Banknote,
  ArrowRight,
  ChevronRight,
  MapPin,
  Landmark,
  FileCheck,
  Wallet,
  PieChart,
  Globe,
  Lock,
  Scale,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { label: 'Assets Under Management', value: 'AED 125M+' },
  { label: 'Verified Investors', value: '1,200+' },
  { label: 'Properties Listed', value: '18' },
  { label: 'Average Annual Yield', value: '9.2%' },
];

const steps = [
  {
    icon: Shield,
    title: 'Register & Verify',
    description: 'Complete KYC verification powered by Sumsub in minutes — fast, secure, and fully compliant.',
  },
  {
    icon: Building2,
    title: 'Browse Properties',
    description: 'Explore curated Dubai real estate listings with transparent financials and yield projections.',
  },
  {
    icon: Coins,
    title: 'Buy Tokens',
    description: 'Purchase fractional property tokens using AED fiat payments through TAP Payments — no crypto needed.',
  },
  {
    icon: Banknote,
    title: 'Earn Rent',
    description: 'Receive automatic monthly rental distributions directly to your wallet, proportional to your holdings.',
  },
];

const featuredProperties = [
  {
    name: 'Marina Gate Tower III',
    location: 'Dubai Marina',
    type: 'residential',
    yield: '8.7%',
    pricePerToken: 'AED 500',
    sold: 72,
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    name: 'Business Bay Office Hub',
    location: 'Business Bay',
    type: 'commercial',
    yield: '10.1%',
    pricePerToken: 'AED 1,000',
    sold: 45,
    gradient: 'from-emerald-400 to-teal-600',
  },
  {
    name: 'JVC Garden Residences',
    location: 'Jumeirah Village Circle',
    type: 'residential',
    yield: '9.4%',
    pricePerToken: 'AED 250',
    sold: 88,
    gradient: 'from-purple-400 to-pink-600',
  },
];

const partners = [
  {
    name: 'TAP Payments',
    role: 'CBUAE-licensed payment gateway',
    description: 'Secure fiat AED payment processing for seamless token purchases and distributions.',
  },
  {
    name: 'Ctrl Alt',
    role: 'Blockchain-as-a-Service',
    description: 'Enterprise-grade blockchain infrastructure for tokenization, custody, and smart contracts.',
  },
  {
    name: 'Sumsub',
    role: 'KYC / AML Compliance',
    description: 'Automated identity verification and anti-money laundering checks for regulatory compliance.',
  },
  {
    name: 'Zand Bank',
    role: 'CBUAE-licensed digital bank',
    description: 'Regulated banking partner for escrow accounts, settlement, and fund custody.',
  },
];

const capabilities = [
  {
    icon: Building2,
    title: 'Property Tokenization',
    description: 'Convert real estate assets into tradeable digital tokens on a regulated blockchain.',
  },
  {
    icon: Shield,
    title: 'KYC / AML Compliance',
    description: 'Automated investor verification meeting UAE and international regulatory standards.',
  },
  {
    icon: Wallet,
    title: 'Fiat Payment Rails',
    description: 'AED-only payments — no cryptocurrency complexity for investors or operators.',
  },
  {
    icon: Banknote,
    title: 'Rental Distribution',
    description: 'Automated monthly rent payouts proportional to token holdings.',
  },
  {
    icon: PieChart,
    title: 'Portfolio Management',
    description: 'Real-time dashboard tracking holdings, yields, and transaction history.',
  },
  {
    icon: FileCheck,
    title: 'Smart Contract Governance',
    description: 'Immutable on-chain rules enforcing investor rights and distribution logic.',
  },
  {
    icon: Scale,
    title: 'Regulatory Framework',
    description: 'Built for UAE compliance with CBUAE-licensed partners and VARA alignment.',
  },
  {
    icon: Globe,
    title: 'Secondary Market',
    description: 'Peer-to-peer token trading with built-in compliance and transfer restrictions.',
  },
  {
    icon: Lock,
    title: 'Institutional-Grade Security',
    description: 'Multi-layer security with encrypted custody, audit trails, and role-based access.',
  },
];

const navLinks = [
  { label: 'Properties', href: '#properties' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Partners', href: '#partners' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ============================================================ */}
      {/*  NAVBAR                                                      */}
      {/* ============================================================ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center">
                <Landmark className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                DAREK
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-primary-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/investor/dashboard"
                className="text-sm font-medium text-slate-700 hover:text-primary-700 px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/kyc"
                className="text-sm font-semibold text-white bg-primary-700 hover:bg-primary-800 px-5 py-2.5 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary-700 rounded-lg hover:bg-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/investor/dashboard"
                className="text-center text-sm font-medium text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/kyc"
                className="text-center text-sm font-semibold text-white bg-primary-700 hover:bg-primary-800 px-4 py-2.5 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative pt-16 overflow-hidden">
        <div className="bg-gradient-to-br from-primary-900 to-primary-700">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-white/80 tracking-wide">
                  Regulated in the UAE
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Own Dubai Real Estate,
                <br />
                <span className="text-primary-200">One Token at a Time</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
                Invest in premium Dubai properties through fractional ownership.
                Fully regulated, AED fiat-only, with automated rental distributions
                — starting from just AED 250 per token.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/kyc"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary-800 font-semibold rounded-lg hover:bg-primary-50 transition-colors text-sm"
                >
                  Start Investing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/investor/properties"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm"
                >
                  View Properties
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS BAR                                                   */}
      {/* ============================================================ */}
      <section className="relative -mt-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm -mt-10 relative z-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white px-6 py-8 text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-primary-800 tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                */}
      {/* ============================================================ */}
      <section id="how-it-works" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
              Simple Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              From signup to earning rent — four straightforward steps to invest in Dubai real estate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative group">
                {/* Connector line (hidden on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-slate-200" />
                )}

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors relative">
                    <step.icon className="w-8 h-8 text-primary-700" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary-700 text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURED PROPERTIES                                         */}
      {/* ============================================================ */}
      <section id="properties" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
                Featured Listings
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Featured Properties
              </h2>
              <p className="mt-3 text-lg text-slate-500">
                Hand-picked Dubai properties with strong yields and full transparency.
              </p>
            </div>
            <Link
              to="/investor/properties"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((prop) => (
              <Link
                key={prop.name}
                to="/investor/properties"
                className="block bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Gradient placeholder */}
                <div className={`h-48 bg-gradient-to-br ${prop.gradient} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Building2 className="w-20 h-20 text-white" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/90 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded">
                      {prop.type}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {prop.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{prop.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">Price / Token</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">
                        {prop.pricePerToken}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">Annual Yield</p>
                      <p className="text-sm font-semibold text-emerald-600 mt-0.5">
                        {prop.yield}
                      </p>
                    </div>
                  </div>

                  {/* Token progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span>Tokens available</span>
                      <span className="font-medium text-slate-700">{prop.sold}% sold</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${prop.sold}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile "View All" link */}
          <div className="sm:hidden mt-8 text-center">
            <Link
              to="/investor/properties"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700"
            >
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PARTNERS / TRUST                                            */}
      {/* ============================================================ */}
      <section id="partners" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
              Trusted Partners
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Built on Regulated Infrastructure
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Every layer of the DAREK platform is powered by licensed, institutional-grade partners.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-6 text-center hover:border-primary-200 hover:bg-primary-50/30 transition-all"
              >
                {/* Partner logo placeholder */}
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-primary-700">
                    {partner.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {partner.name}
                </h3>
                <p className="text-xs font-medium text-primary-600 mt-1 mb-3">
                  {partner.role}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PLATFORM CAPABILITIES                                       */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
              Platform
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              End-to-End Capabilities
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Everything needed to tokenize, manage, and invest in real estate — in one platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-md hover:border-primary-200 transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <cap.icon className="w-5 h-5 text-primary-700" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1.5">
                  {cap.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                         */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-br from-primary-900 to-primary-700 overflow-hidden">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Ready to Invest in Dubai Real Estate?
              </h2>
              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
                Join 1,200+ verified investors earning passive rental income from premium Dubai properties.
              </p>
              <Link
                to="/kyc"
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-primary-800 font-semibold rounded-lg hover:bg-primary-50 transition-colors text-sm"
              >
                Create Your Account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary-700 flex items-center justify-center">
                  <Landmark className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  DAREK
                </span>
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                UAE-based real estate tokenization platform. Fractional ownership made simple, transparent, and regulated.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <a href="#properties" className="text-slate-500 hover:text-primary-700 transition-colors">
                Properties
              </a>
              <a href="#how-it-works" className="text-slate-500 hover:text-primary-700 transition-colors">
                How It Works
              </a>
              <a href="#partners" className="text-slate-500 hover:text-primary-700 transition-colors">
                Partners
              </a>
              <Link to="/kyc" className="text-slate-500 hover:text-primary-700 transition-colors">
                Get Started
              </Link>
              <Link to="/investor/dashboard" className="text-slate-500 hover:text-primary-700 transition-colors">
                Login
              </Link>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} DAREK. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Shield className="w-3.5 h-3.5 text-primary-500" />
              <span>Regulated in the UAE &middot; CBUAE-licensed partners</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

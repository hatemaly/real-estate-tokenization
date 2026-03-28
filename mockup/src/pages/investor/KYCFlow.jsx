import {
  CheckCircle2,
  User,
  ShieldCheck,
  Landmark,
  PartyPopper,
  Upload,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { investors } from '../../data/mockData';
import PageHeader from '../../components/PageHeader';

const CURRENT_USER_ID = 101;
const currentUser = investors.find((i) => i.id === CURRENT_USER_ID);

const steps = [
  { key: 'personal', label: 'Personal Information', icon: User },
  { key: 'identity', label: 'Identity Verification', icon: ShieldCheck },
  { key: 'bank', label: 'Bank Account', icon: Landmark },
  { key: 'complete', label: 'Verification Complete', icon: PartyPopper },
];

function VerifiedTag() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
      <CheckCircle2 className="w-3.5 h-3.5" />
      Verified
    </span>
  );
}

function DisabledField({ label, value }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700">
        {value}
      </div>
    </div>
  );
}

function UploadArea({ label, verified }) {
  return (
    <div className="border border-dashed border-slate-200 rounded-lg p-4 bg-slate-50/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Upload className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">Document uploaded and verified</p>
          </div>
        </div>
        {verified && <VerifiedTag />}
      </div>
    </div>
  );
}

export default function KYCFlow() {
  return (
    <div>
      <PageHeader
        title="KYC Verification"
        subtitle="Your verification is complete. All steps have been approved."
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Step Progress Indicator */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">
              Verification Steps
            </h3>
            <div className="space-y-0">
              {steps.map((step, idx) => {
                const isLast = idx === steps.length - 1;
                return (
                  <div key={step.key} className="flex gap-3">
                    {/* Vertical line + circle */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                      </div>
                      {!isLast && <div className="w-0.5 h-10 bg-emerald-300" />}
                    </div>
                    {/* Label */}
                    <div className="pt-1 pb-4">
                      <p className="text-sm font-medium text-slate-900">{step.label}</p>
                      <p className="text-xs text-emerald-600 mt-0.5">Completed</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Step Content */}
        <div className="flex-1 space-y-6">
          {/* Step 1: Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-50 rounded-lg">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-slate-900">Step 1: Personal Information</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Basic details for your investor profile
                </p>
              </div>
              <VerifiedTag />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DisabledField label="Full Name" value={currentUser?.name || 'Ahmed Al Maktoum'} />
              <DisabledField
                label="Email Address"
                value={currentUser?.email || 'ahmed.almaktoum@email.ae'}
              />
              <DisabledField
                label="Phone Number"
                value={currentUser?.phone || '+971-50-123-4567'}
              />
              <DisabledField label="Nationality" value="United Arab Emirates" />
              <DisabledField label="UAE Residence Status" value="UAE Resident" />
              <DisabledField label="Date of Birth" value="15 March 1988" />
            </div>
          </div>

          {/* Step 2: Identity Verification */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-50 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-slate-900">Step 2: Identity Verification</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Government-issued ID and biometric verification
                </p>
              </div>
              <VerifiedTag />
            </div>
            <div className="space-y-3">
              <UploadArea label="Emirates ID" verified />
              <UploadArea label="Passport Copy" verified />
              <div className="border border-dashed border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Camera className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Selfie Verification</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Liveness check completed successfully
                      </p>
                    </div>
                  </div>
                  <VerifiedTag />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Bank Account */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-50 rounded-lg">
                <Landmark className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-slate-900">Step 3: Bank Account</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Linked bank account for investments and distributions
                </p>
              </div>
              <VerifiedTag />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DisabledField label="IBAN" value="AE07 0331 2345 6789 0123 456" />
              <DisabledField label="Bank Name" value="Emirates NBD" />
              <DisabledField
                label="Account Holder"
                value={currentUser?.name || 'Ahmed Al Maktoum'}
              />
              <DisabledField label="Account Status" value="Verified & Active" />
            </div>
          </div>

          {/* Step 4: Verification Complete */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-4">
                <PartyPopper className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Verification Complete!</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                Your identity has been verified and your bank account is linked. You are fully
                onboarded and ready to invest in tokenized real estate properties.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm mb-8">
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>KYC Approved</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bank Linked</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ready to Invest</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm px-8 py-3 rounded-lg transition-colors">
                Start Investing
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

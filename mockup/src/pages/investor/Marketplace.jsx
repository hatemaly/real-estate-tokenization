import { useState } from 'react';
import {
  ArrowLeftRight,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  ListFilter,
  Tag,
  ChevronDown,
} from 'lucide-react';
import { properties, investors, marketplaceListings, transactions } from '../../data/mockData';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import PageHeader from '../../components/PageHeader';

const CURRENT_USER_ID = 101;
const currentUser = investors.find((i) => i.id === CURRENT_USER_ID);

// Mask a name like "Ahmed Al Maktoum" -> "A***d A."
function maskName(name) {
  const parts = name.split(' ');
  if (parts.length === 0) return '***';
  const first = parts[0];
  const masked = first[0] + '***' + first[first.length - 1];
  const lastInitial = parts.length > 1 ? ' ' + parts[parts.length - 1][0] + '.' : '';
  return masked + lastInitial;
}

// Compute premium/discount % for a listing relative to the property's original pricePerToken
function getPremiumPct(listing) {
  const prop = properties.find((p) => p.id === listing.propertyId);
  if (!prop) return 0;
  return (((listing.pricePerToken - prop.pricePerToken) / prop.pricePerToken) * 100).toFixed(1);
}

// Stats
const activeListings = marketplaceListings.filter((l) => l.status === 'active');
const completedTrades = transactions.filter((t) => t.type === 'secondary-trade');
const volume24h = completedTrades.reduce((sum, t) => sum + t.amount, 0);
const avgPremium =
  activeListings.length > 0
    ? (
        activeListings.reduce((sum, l) => sum + parseFloat(getPremiumPct(l)), 0) /
        activeListings.length
      ).toFixed(1)
    : '0.0';

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [sellTokens, setSellTokens] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  const tabs = [
    { key: 'buy', label: 'Buy Tokens' },
    { key: 'sell', label: 'Sell Tokens' },
  ];

  // Properties the current user holds tokens in (for the sell form)
  const userHoldings = currentUser?.tokensOwned || [];

  // Recent trades from transactions (secondary trades + purchases for marketplace context)
  const recentTrades = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  return (
    <div>
      <PageHeader
        title="Secondary Marketplace"
        subtitle="Buy and sell property tokens from other investors"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        <StatCard icon={ListFilter} label="Active Listings" value={activeListings.length} />
        <StatCard
          icon={BarChart3}
          label="24h Volume"
          value={`AED ${(volume24h / 1000000).toFixed(1)}M`}
          change={12.4}
        />
        <StatCard icon={TrendingUp} label="Avg Premium / Discount" value={`${avgPremium}%`} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Buy Tokens Section */}
      {activeTab === 'buy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          {activeListings.map((listing) => {
            const prop = properties.find((p) => p.id === listing.propertyId);
            const seller = investors.find((i) => i.id === listing.sellerId);
            const premium = getPremiumPct(listing);
            const isDiscount = parseFloat(premium) < 0;
            const totalCost = listing.tokensListed * listing.pricePerToken;

            return (
              <div
                key={listing.id}
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{prop?.name || 'Unknown'}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{prop?.location}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isDiscount
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {isDiscount ? '' : '+'}
                    {premium}%
                  </span>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <p className="text-slate-400 text-xs">Seller</p>
                    <p className="font-medium text-slate-700">
                      {seller ? maskName(seller.name) : '***'}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Tokens Available</p>
                    <p className="font-medium text-slate-700">
                      {listing.tokensListed.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Price / Token</p>
                    <p className="font-medium text-slate-900">
                      AED {listing.pricePerToken.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Total Cost</p>
                    <p className="font-medium text-slate-900">
                      AED {totalCost.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Original price reference */}
                <p className="text-xs text-slate-400 mb-4">
                  Original issue price: AED {prop?.pricePerToken.toLocaleString()}
                </p>

                <div className="mt-auto">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Buy Tokens
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sell Tokens Section */}
      {activeTab === 'sell' && (
        <div className="max-w-lg mb-10">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-primary-50 rounded-lg">
                <Tag className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Create Listing</h3>
                <p className="text-xs text-slate-500">
                  List your tokens for sale on the marketplace
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Property select */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Select Property
                </label>
                <div className="relative">
                  <select
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Choose a property from your holdings...</option>
                    {userHoldings.map((h) => {
                      const prop = properties.find((p) => p.id === h.propertyId);
                      return (
                        <option key={h.propertyId} value={h.propertyId}>
                          {prop?.name} ({h.tokens.toLocaleString()} tokens)
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Number of tokens */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Number of Tokens
                </label>
                <input
                  type="number"
                  value={sellTokens}
                  onChange={(e) => setSellTokens(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {selectedProperty && (
                  <p className="text-xs text-slate-400 mt-1">
                    Max:{' '}
                    {userHoldings
                      .find((h) => h.propertyId === Number(selectedProperty))
                      ?.tokens.toLocaleString()}{' '}
                    tokens
                  </p>
                )}
              </div>

              {/* Price per token */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Price per Token (AED)
                </label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  placeholder="e.g. 1650"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {selectedProperty && (
                  <p className="text-xs text-slate-400 mt-1">
                    Original price: AED{' '}
                    {properties
                      .find((p) => p.id === Number(selectedProperty))
                      ?.pricePerToken.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Summary */}
              {sellTokens && sellPrice && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Total Listing Value</span>
                    <span className="font-semibold text-slate-900">
                      AED {(Number(sellTokens) * Number(sellPrice)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-slate-500">Platform Fee (1.5%)</span>
                    <span className="font-medium text-slate-600">
                      AED{' '}
                      {Math.round(Number(sellTokens) * Number(sellPrice) * 0.015).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2">
                <ArrowLeftRight className="w-4 h-4" />
                List for Sale
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Trades Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Recent Trades</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Property
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Seller
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTrades.map((trade) => {
                const prop = properties.find((p) => p.id === trade.propertyId);
                const buyer = investors.find((i) => i.id === trade.to);
                const seller = investors.find((i) => i.id === trade.from);

                return (
                  <tr key={trade.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap">{trade.date}</td>
                    <td className="px-6 py-3.5 font-medium text-slate-900 whitespace-nowrap">
                      {prop?.name || '—'}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap">
                      {buyer ? maskName(buyer.name) : '—'}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap">
                      {seller ? maskName(seller.name) : trade.type === 'purchase' ? 'Primary Sale' : '—'}
                    </td>
                    <td className="px-6 py-3.5 text-right font-medium text-slate-900 whitespace-nowrap">
                      AED {trade.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                      <StatusBadge status={trade.status} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

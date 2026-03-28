import { useState } from 'react';
import { properties } from '../../data/mockData';
import PageHeader from '../../components/PageHeader';
import PropertyCard from '../../components/PropertyCard';

const TYPE_TABS = ['All', 'Apartment', 'Villa', 'Commercial'];

// Map the mock data propertyType to the gradient key expected by PropertyCard
const typeToGradientKey = {
  apartment: 'residential',
  villa: 'villa',
  commercial: 'commercial',
};

export default function Properties() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All'
      ? properties
      : properties.filter(
          (p) => p.propertyType.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <div>
      <PageHeader
        title="Available Properties"
        subtitle="Browse and invest in tokenized real estate across Dubai."
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {TYPE_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Property Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-16 text-center">
          <p className="text-sm text-slate-400">No properties found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={{
                ...property,
                type: typeToGradientKey[property.propertyType] || 'residential',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

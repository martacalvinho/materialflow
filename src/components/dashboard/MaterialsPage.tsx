import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { mockDatabase } from '../../utils/mockData';

interface ExpandedState {
  [key: number]: {
    basic: boolean;
    detailed: boolean;
  };
}

const MaterialsPage: React.FC = () => {
  const [expandedState, setExpandedState] = useState<ExpandedState>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories
  const categories = Array.from(new Set(mockDatabase.materials.map(m => m.category)));

  // Filter materials based on category and search
  const filteredMaterials = mockDatabase.materials.filter(material => {
    const matchesCategory = !selectedCategory || material.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (materialId: number, level: 'basic' | 'detailed') => {
    setExpandedState(prev => ({
      ...prev,
      [materialId]: {
        ...prev[materialId],
        [level]: !prev[materialId]?.[level]
      }
    }));
  };

  // Get unique locations across all projects for a material
  const getUniqueLocations = (material: typeof mockDatabase.materials[0]) => {
    const locations = new Set<string>();
    material.projects.forEach(project => {
      project.locations.forEach(location => locations.add(location));
    });
    return Array.from(locations);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-surface-900">Materials Library</h1>
      </div>

      <div className="bg-white rounded-lg border border-surface-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-surface-200 flex justify-between">
          <div className="flex items-center gap-4">
            <div className="w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-surface-400" />
              </div>
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-surface-200 rounded-lg text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  !selectedCategory
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedCategory === category
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <Filter size={14} />
            <span>Filter</span>
          </Button>
        </div>

        <div className="divide-y divide-surface-200">
          {filteredMaterials.map(material => (
            <div key={material.id} className="p-4">
              {/* Material Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleExpand(material.id, 'basic')}
                    className="p-1 hover:bg-surface-100 rounded-full transition-colors"
                  >
                    {expandedState[material.id]?.basic ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </button>
                  <div>
                    <Link
                      to={`/dashboard/materials/${material.id}`}
                      className="font-medium hover:text-primary-600"
                    >
                      {material.name}
                    </Link>
                    <div className="text-sm text-surface-600">
                      {material.supplier} • Used in {material.usage} projects
                    </div>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
                  {material.category}
                </span>
              </div>

              {/* Basic Expansion */}
              {expandedState[material.id]?.basic && (
                <div className="mt-4 pl-9">
                  <div className="p-4 bg-surface-50 rounded-lg">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-medium">Projects</h3>
                      <button
                        onClick={() => toggleExpand(material.id, 'detailed')}
                        className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                      >
                        <span>Show Locations</span>
                        {expandedState[material.id]?.detailed ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {material.projects.map((project, index) => (
                        <div key={index}>
                          <Link
                            to={`/dashboard/projects/${mockDatabase.projects.find(p => p.name === project.name)?.id}`}
                            className="text-sm hover:text-primary-600"
                          >
                            {project.name}
                          </Link>
                          {expandedState[material.id]?.detailed && (
                            <div className="mt-2 pl-4 text-sm text-surface-600">
                              <div>Locations: {project.locations.join(', ')}</div>
                              {project.area && <div>Area: {project.area} sq.ft</div>}
                              {project.quantity && <div>Quantity: {project.quantity} units</div>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {expandedState[material.id]?.detailed && (
                    <div className="mt-4 p-4 bg-surface-50 rounded-lg">
                      <h3 className="font-medium mb-3">Common Locations</h3>
                      <div className="flex flex-wrap gap-2">
                        {getUniqueLocations(material).map(location => (
                          <span
                            key={location}
                            className="px-2 py-1 bg-white text-sm rounded-full border border-surface-200"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;
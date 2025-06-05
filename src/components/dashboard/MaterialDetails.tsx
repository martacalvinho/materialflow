import React from 'react';
import { ArrowLeft, Package, Building2, Calendar, DollarSign, Factory } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../ui/Button';
import { mockDatabase } from '../../utils/mockData';

const MaterialDetails: React.FC = () => {
  const { id } = useParams();

  // Find material in mock database
  const material = mockDatabase.materials.find(m => m.id === Number(id));

  if (!material) {
    return <div>Material not found</div>;
  }

  // Find manufacturer details
  const manufacturer = mockDatabase.manufacturers.find(m => m.materials.includes(material.name));

  // Calculate total area and quantity across all projects
  const totalArea = material.projects.reduce((sum, project) => sum + (project.area || 0), 0);
  const totalQuantity = material.projects.reduce((sum, project) => sum + (project.quantity || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/materials">
            <Button variant="ghost" className="p-2">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-surface-900">{material.name}</h1>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
            {material.category}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Material Overview</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Package size={16} />
                  <span className="text-sm">Total Uses</span>
                </div>
                <span className="font-medium">{material.usage} projects</span>
              </div>
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Factory size={16} />
                  <span className="text-sm">Manufacturer</span>
                </div>
                {manufacturer ? (
                  <Link 
                    to={`/dashboard/manufacturers/${manufacturer.id}`}
                    className="font-medium text-primary-600 hover:text-primary-700"
                  >
                    {manufacturer.name}
                  </Link>
                ) : (
                  <span className="font-medium">{material.supplier}</span>
                )}
              </div>
              {totalArea > 0 && (
                <div className="p-4 bg-surface-50 rounded-lg">
                  <div className="flex items-center gap-2 text-surface-600 mb-2">
                    <DollarSign size={16} />
                    <span className="text-sm">Total Area</span>
                  </div>
                  <span className="font-medium">{totalArea} sq.ft</span>
                </div>
              )}
              {totalQuantity > 0 && (
                <div className="p-4 bg-surface-50 rounded-lg">
                  <div className="flex items-center gap-2 text-surface-600 mb-2">
                    <Package size={16} />
                    <span className="text-sm">Total Units</span>
                  </div>
                  <span className="font-medium">{totalQuantity}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Projects Using This Material</h2>
            <div className="space-y-4">
              {material.projects.map((project, index) => {
                const fullProject = mockDatabase.projects.find(p => p.name === project.name);
                
                return (
                  <Link
                    key={index}
                    to={fullProject ? `/dashboard/projects/${fullProject.id}` : '#'}
                    className="block"
                  >
                    <div className="p-4 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-surface-900">{project.name}</h3>
                          {fullProject && (
                            <div className="text-sm text-surface-600">Client: {fullProject.client}</div>
                          )}
                        </div>
                        {fullProject && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
                            {fullProject.type}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-surface-600">
                        <div>Locations: {project.locations.join(', ')}</div>
                        {project.area && <div>Area: {project.area} sq.ft</div>}
                        {project.quantity && <div>Quantity: {project.quantity} units</div>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Usage Statistics</h2>
            <div className="space-y-4">
              <div className="p-4 bg-surface-50 rounded-lg">
                <h3 className="text-sm font-medium text-surface-600 mb-2">Project Types</h3>
                <div className="space-y-2">
                  {material.projects.map(project => {
                    const fullProject = mockDatabase.projects.find(p => p.name === project.name);
                    return fullProject?.type;
                  })
                  .filter((type, index, self) => type && self.indexOf(type) === index)
                  .map(type => (
                    <div key={type} className="text-sm">{type}</div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-surface-50 rounded-lg">
                <h3 className="text-sm font-medium text-surface-600 mb-2">Common Locations</h3>
                <div className="space-y-2">
                  {Array.from(new Set(material.projects.flatMap(p => p.locations))).map(location => (
                    <div key={location} className="text-sm">{location}</div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-surface-50 rounded-lg">
                <h3 className="text-sm font-medium text-surface-600 mb-2">Usage Trend</h3>
                <div className="font-medium text-green-600">↑ Increasing</div>
                <p className="text-sm text-surface-600 mt-1">
                  Used in {material.usage} projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetails;
import React from 'react';
import { ArrowLeft, Package, Building2, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../ui/Button';
import { mockDatabase } from '../../utils/mockData';

const ClientDetails: React.FC = () => {
  const { id } = useParams();

  // Find client's projects in mock database
  const clientProjects = mockDatabase.projects.filter(p => p.client === 'Davidson Family');

  // Get all materials used by this client
  const clientMaterials = clientProjects.flatMap(project => 
    project.materials.map(material => {
      const fullMaterial = mockDatabase.materials.find(m => m.name === material.name);
      return {
        ...material,
        id: fullMaterial?.id,
        pricePerSqFt: fullMaterial?.pricePerSqFt
      };
    })
  );

  // Count material usage
  const materialUsage = clientMaterials.reduce((acc, material) => {
    if (!acc[material.name]) {
      acc[material.name] = {
        count: 0,
        id: material.id,
        pricePerSqFt: material.pricePerSqFt
      };
    }
    acc[material.name].count++;
    return acc;
  }, {} as Record<string, { count: number; id?: number; pricePerSqFt?: number }>);

  // Sort by usage count
  const mostUsedMaterials = Object.entries(materialUsage)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/clients">
            <Button variant="ghost" className="p-2">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-surface-900">Davidson Family</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Client Overview</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Building2 size={16} />
                  <span className="text-sm">Total Projects</span>
                </div>
                <span className="font-medium">{clientProjects.length}</span>
              </div>
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Package size={16} />
                  <span className="text-sm">Total Materials</span>
                </div>
                <span className="font-medium">{clientMaterials.length}</span>
              </div>
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Calendar size={16} />
                  <span className="text-sm">Last Project</span>
                </div>
                <span className="font-medium">Mar 15, 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Projects</h2>
            <div className="space-y-4">
              {clientProjects.map(project => (
                <Link
                  key={project.id}
                  to={`/dashboard/projects/${project.id}`}
                  className="block"
                >
                  <div className="p-4 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-surface-900">{project.name}</h3>
                        <div className="text-sm text-surface-600 mt-1">
                          {project.materials.length} materials
                        </div>
                      </div>
                      <Link
                        to={`/dashboard/projects?type=${project.type}`}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.type}
                      </Link>
                    </div>
                    <div className="text-sm text-surface-600">
                      Status: {project.status}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Most Used Materials</h2>
            <div className="space-y-3">
              {mostUsedMaterials.map(([name, data]) => (
                <Link
                  key={name}
                  to={data.id ? `/dashboard/materials/${data.id}` : '#'}
                  className="p-3 bg-surface-50 rounded-lg flex flex-col hover:bg-surface-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{name}</span>
                    <span className="text-sm text-surface-600">
                      {data.count} projects
                    </span>
                  </div>
                  {data.pricePerSqFt ? (
                    <span className="text-xs text-surface-500 mt-1">
                      ${data.pricePerSqFt.toFixed(2)}/sq.ft
                    </span>
                  ) : (
                    <span className="text-xs text-surface-500 mt-1 italic">
                      Price not available
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
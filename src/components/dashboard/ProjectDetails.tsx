import React from 'react';
import { ArrowLeft, Clock, Building2, FileText, Package } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../ui/Button';
import { mockDatabase } from '../../utils/mockData';

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  
  // Find project in mock database
  const project = mockDatabase.projects.find(p => p.id === Number(id));

  if (!project) {
    return <div>Project not found</div>;
  }

  // Group materials by category
  const materialsByCategory = project.materials.reduce((acc, material) => {
    // Find full material details from mockDatabase
    const fullMaterial = mockDatabase.materials.find(m => m.name === material.name);
    const category = fullMaterial?.category || 'Other';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      ...material,
      id: fullMaterial?.id
    });
    return acc;
  }, {} as Record<string, Array<typeof project.materials[0] & { id?: number }>>);

  const categories = Object.keys(materialsByCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/projects">
            <Button variant="ghost" className="p-2">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-surface-900">{project.name}</h1>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
            {project.type}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Project Overview</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Clock size={16} />
                  <span className="text-sm">Status</span>
                </div>
                <span className="font-medium">{project.status}</span>
              </div>
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Building2 size={16} />
                  <span className="text-sm">Client</span>
                </div>
                <Link 
                  to={`/dashboard/clients/${id}`}
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  {project.client}
                </Link>
              </div>
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Package size={16} />
                  <span className="text-sm">Materials</span>
                </div>
                <span className="font-medium">{project.materials.length} total</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Materials List</h2>
            <div className="space-y-6">
              {categories.map(category => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-surface-600 mb-3">{category}</h3>
                  <div className="space-y-2">
                    {materialsByCategory[category].map(material => (
                      <Link
                        key={material.name}
                        to={material.id ? `/dashboard/materials/${material.id}` : '#'}
                        className="block"
                      >
                        <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors">
                          <div>
                            <div className="font-medium">{material.name}</div>
                            <div className="text-sm text-surface-600">
                              {material.locations.join(', ')}
                            </div>
                          </div>
                          <div className="text-sm text-surface-600">
                            {material.area && `${material.area} sq.ft`}
                            {material.quantity && `${material.quantity} units`}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Documents</h2>
            <div className="space-y-3">
              {['Project Specs.pdf', 'Material Schedule.pdf'].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg">
                  <FileText size={16} className="text-surface-600" />
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Material Stats</h2>
            <div className="space-y-4">
              {categories.map((category) => {
                const count = materialsByCategory[category].length;
                const percentage = (count / project.materials.length) * 100;
                
                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category}</span>
                      <span className="text-surface-600">{count} materials</span>
                    </div>
                    <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
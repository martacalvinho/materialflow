import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpDown, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '../ui/Button';

const ProjectsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get('type');
  
  const projects = [
    { 
      id: 1, 
      name: 'Coastal Villa Renovation', 
      client: 'Davidson Family', 
      type: 'Residential', 
      materials: 34, 
      lastUpdated: '2023-04-12',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Downtown Office Tower', 
      client: 'Apex Investments', 
      type: 'Commercial', 
      materials: 78, 
      lastUpdated: '2023-03-28',
      status: 'Completed'
    },
    { 
      id: 3, 
      name: 'Mountain Lodge', 
      client: 'Alpine Resorts', 
      type: 'Hospitality', 
      materials: 52, 
      lastUpdated: '2023-02-15',
      status: 'Processing',
      estimatedCompletion: '2024-03-20'
    },
    { 
      id: 4, 
      name: 'Urban Apartment Complex', 
      client: 'Metro Living', 
      type: 'Residential', 
      materials: 41, 
      lastUpdated: '2023-01-10',
      status: 'Completed'
    },
    { 
      id: 5, 
      name: 'Riverfront Restaurant', 
      client: 'Taste Ventures', 
      type: 'Commercial', 
      materials: 29, 
      lastUpdated: '2022-12-05',
      status: 'Active'
    },
    { 
      id: 6, 
      name: 'Modern Art Museum', 
      client: 'Arts Foundation', 
      type: 'Cultural', 
      materials: 63, 
      lastUpdated: '2022-11-20',
      status: 'Completed'
    }
  ];

  const projectTypes = [...new Set(projects.map(p => p.type))];
  const filteredProjects = currentType 
    ? projects.filter(p => p.type === currentType)
    : projects;

  const handleTypeFilter = (type: string | null) => {
    if (type) {
      setSearchParams({ type });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-surface-900">Projects</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>New Project</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-surface-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-surface-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-surface-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="block w-full pl-10 pr-3 py-2 border border-surface-200 rounded-lg text-sm"
              />
            </div>
            <div className="flex gap-2">
              {projectTypes.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    currentType === type
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }`}
                >
                  {type}
                </button>
              ))}
              {currentType && (
                <button
                  onClick={() => handleTypeFilter(null)}
                  className="px-3 py-1.5 rounded-full text-sm bg-surface-100 text-surface-600 hover:bg-surface-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <Filter size={14} />
            <span>Filter</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-200">
            <thead className="bg-surface-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Project Name</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Client</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Materials</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Last Updated</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-surface-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className={`hover:bg-surface-50 ${project.status === 'Processing' ? 'opacity-60' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-surface-900">{project.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-surface-700">{project.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleTypeFilter(project.type)}
                      className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100"
                    >
                      {project.type}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700">
                    {project.materials}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700">
                    {project.status === 'Processing' ? (
                      <span>Est. completion: {new Date(project.estimatedCompletion).toLocaleDateString()}</span>
                    ) : (
                      new Date(project.lastUpdated).toLocaleDateString()
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                      project.status === 'Active' 
                        ? 'bg-green-50 text-green-700'
                        : project.status === 'Processing'
                        ? 'bg-primary-50 text-primary-700'
                        : 'bg-surface-100 text-surface-700'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {project.status === 'Processing' ? (
                      <span className="text-surface-500">Processing...</span>
                    ) : (
                      <Link to={`/dashboard/projects/${project.id}`}>
                        <Button variant="link" className="text-primary-600 hover:text-primary-900">
                          View
                        </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-surface-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button variant="outline" className="text-sm">
              Previous
            </Button>
            <Button variant="outline" className="ml-3 text-sm">
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-surface-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProjects.length}</span> of{' '}
                <span className="font-medium">{filteredProjects.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-surface-300 bg-white text-sm font-medium text-surface-500 hover:bg-surface-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-surface-300 bg-white text-sm font-medium text-surface-500 hover:bg-surface-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
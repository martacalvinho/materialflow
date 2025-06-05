import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const ClientsPage: React.FC = () => {
  const clients = [
    {
      id: 1,
      name: 'Davidson Family',
      projects: 3,
      totalMaterials: 89,
      lastProject: '2024-02-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Apex Investments',
      projects: 5,
      totalMaterials: 156,
      lastProject: '2024-01-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Alpine Resorts',
      projects: 2,
      totalMaterials: 67,
      lastProject: '2023-12-10',
      status: 'Completed'
    },
    {
      id: 4,
      name: 'Metro Living',
      projects: 4,
      totalMaterials: 112,
      lastProject: '2023-11-05',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-surface-900">Clients</h1>
      </div>

      <div className="bg-white rounded-lg border border-surface-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-surface-200 flex justify-between">
          <div className="w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-surface-400" />
            </div>
            <input
              type="text"
              placeholder="Search clients..."
              className="block w-full pl-10 pr-3 py-2 border border-surface-200 rounded-lg text-sm"
            />
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
                    <span>Client Name</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Projects</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Total Materials</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Last Project</span>
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
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-surface-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-surface-900">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700">
                    {client.projects}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700">
                    {client.totalMaterials}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700">
                    {new Date(client.lastProject).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                      client.status === 'Active' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-surface-100 text-surface-700'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/dashboard/clients/${client.id}`}>
                      <Button variant="link" className="text-primary-600 hover:text-primary-900">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
import React from 'react';
import { Search, Filter, Plus, ArrowUpDown, Phone, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const ManufacturersPage: React.FC = () => {
  const manufacturers = [
    {
      id: 1,
      name: 'John Smith',
      company: 'WoodCo Supplies',
      position: 'Sales Representative',
      email: 'john.smith@woodco.com',
      phone: '+1 (555) 123-4567',
      website: 'https://woodco.com',
      lastContacted: '2024-03-15',
      materialsCount: 12,
      projectsCount: 8,
      notes: 'Waiting for oak flooring samples for Davidson project'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'StoneWorks International',
      position: 'Regional Manager',
      email: 'sarah.j@stoneworks.com',
      phone: '+1 (555) 987-6543',
      website: 'https://stoneworks.com',
      lastContacted: '2024-03-10',
      materialsCount: 8,
      projectsCount: 5,
      notes: 'Following up on marble pricing for Office Tower'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-surface-900">Manufacturers</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add Manufacturer</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-surface-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-surface-200 flex justify-between">
          <div className="w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-surface-400" />
            </div>
            <input
              type="text"
              placeholder="Search manufacturers..."
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
                    <span>Name</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Company</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Materials</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <span>Last Contacted</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-surface-200">
              {manufacturers.map((manufacturer) => (
                <tr key={manufacturer.id} className="hover:bg-surface-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-surface-900">{manufacturer.name}</div>
                    <div className="text-sm text-surface-500">{manufacturer.position}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-surface-900">{manufacturer.company}</div>
                    <a 
                      href={manufacturer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                    >
                      <Globe size={14} />
                      <span>Website</span>
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <a 
                        href={`mailto:${manufacturer.email}`}
                        className="text-sm text-surface-600 hover:text-surface-900 flex items-center gap-1"
                      >
                        <Mail size={14} />
                        <span>{manufacturer.email}</span>
                      </a>
                      <a 
                        href={`tel:${manufacturer.phone}`}
                        className="text-sm text-surface-600 hover:text-surface-900 flex items-center gap-1"
                      >
                        <Phone size={14} />
                        <span>{manufacturer.phone}</span>
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-surface-600">
                      {manufacturer.materialsCount} materials
                    </div>
                    <div className="text-sm text-surface-600">
                      {manufacturer.projectsCount} projects
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-surface-600">
                      {new Date(manufacturer.lastContacted).toLocaleDateString()}
                    </div>
                    {manufacturer.notes && (
                      <div className="text-sm text-surface-500 mt-1">
                        {manufacturer.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/dashboard/manufacturers/${manufacturer.id}`}>
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

export default ManufacturersPage;
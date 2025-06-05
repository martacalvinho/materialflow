import React, { useState } from 'react';
import { Upload, ArrowRight, Clock, Sparkles, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import UploadModal from './modals/UploadModal';
import ReportModal from './modals/ReportModal';

const DashboardHome: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'discontinued',
      title: 'XStone Marble Discontinued',
      description: 'Used in 12 projects (2015-2022)',
      severity: 'high',
      date: '2024-03-15'
    },
    {
      id: 2,
      type: 'sustainability',
      title: 'Sustainability Alert',
      description: '3/5 top paints below average rating',
      severity: 'medium',
      date: '2024-03-14'
    },
    {
      id: 3,
      type: 'trend',
      title: 'Usage Trend Alert',
      description: 'Material ABC usage declining',
      severity: 'low',
      date: '2024-03-13'
    }
  ]);

  const recentProjects = [
    { 
      id: 1, 
      name: 'Coastal Villa Renovation', 
      type: 'Residential', 
      materials: 34, 
      lastUpdated: '2 days ago', 
      progress: 85,
      completedMaterials: 29
    },
    { 
      id: 2, 
      name: 'Downtown Office Tower', 
      type: 'Commercial', 
      materials: 78, 
      lastUpdated: '1 week ago', 
      progress: 65,
      completedMaterials: 51
    },
    { 
      id: 3, 
      name: 'Mountain Lodge', 
      type: 'Hospitality', 
      materials: 52, 
      lastUpdated: '3 weeks ago', 
      progress: 90,
      completedMaterials: 47
    },
    { 
      id: 4, 
      name: 'Urban Apartment Complex', 
      type: 'Residential', 
      materials: 41, 
      lastUpdated: '1 month ago', 
      progress: 75,
      completedMaterials: 31
    }
  ];

  const topMaterials = [
    { id: 1, name: 'Oak Hardwood Flooring', count: 18, color: 'bg-terracotta-400' },
    { id: 2, name: 'Matte White Wall Paint', count: 15, color: 'bg-surface-400' },
    { id: 3, name: 'Carrara Marble Countertop', count: 12, color: 'bg-primary-400' },
    { id: 4, name: 'Brass Cabinet Hardware', count: 10, color: 'bg-secondary-400' },
    { id: 5, name: 'Polished Concrete Floor', count: 8, color: 'bg-accent-400' }
  ];

  const removeAlert = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-2 border-accent-500 bg-accent-50';
      case 'medium':
        return 'border-l-2 border-primary-500 bg-primary-50';
      case 'low':
        return 'border-l-2 border-terracotta-500 bg-terracotta-50';
      default:
        return 'border-l-2 border-surface-200 bg-surface-50';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <Upload size={16} />
          <span>Upload PDF</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-surface-200 shadow-sm col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-surface-900">Recent Projects</h2>
            <Link to="/dashboard/projects">
              <Button variant="ghost" className="flex items-center gap-1 text-primary-600">
                <span>View all</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentProjects.map(project => (
              <Link 
                key={project.id}
                to={`/dashboard/projects/${project.id}`}
                className="block border border-surface-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-surface-900">{project.name}</h3>
                  <Link 
                    to={`/dashboard/projects?type=${project.type}`}
                    className="text-xs px-2 py-1 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.type}
                  </Link>
                </div>
                <div className="flex items-center text-xs text-surface-500 mb-4">
                  <Clock size={14} className="mr-1" />
                  <span>Updated {project.lastUpdated}</span>
                </div>
                <div className="mb-3 flex justify-between text-sm">
                  <span>Materials: {project.completedMaterials}/{project.materials}</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-surface-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-surface-900">Alerts</h2>
            <span className="bg-accent-100 text-accent-700 text-xs rounded-full px-2 py-1">{alerts.length} New</span>
          </div>
          
          <div className="space-y-4">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-r-md relative ${getSeverityStyles(alert.severity)}`}
              >
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="absolute top-2 right-2 text-surface-400 hover:text-surface-600"
                >
                  <X size={14} />
                </button>
                <p className="text-sm font-medium text-surface-800 pr-6">{alert.title}</p>
                <p className="text-xs text-surface-600 mt-1">{alert.description}</p>
              </div>
            ))}
            
            <Link to="/dashboard/alerts">
              <Button variant="ghost" className="w-full justify-center text-primary-600 mt-2">
                View all alerts
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-surface-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-surface-900">Top Used Materials</h2>
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <Filter size={14} />
            <span>Filter</span>
          </Button>
        </div>

        <div className="space-y-5">
          {topMaterials.map(material => (
            <Link 
              key={material.id}
              to={`/dashboard/materials/${material.id}`}
              className="flex items-center gap-4 group hover:bg-surface-50 p-2 rounded-lg transition-colors"
            >
              <div 
                className={`h-8 rounded-md ${material.color}`} 
                style={{ width: `${(material.count / 20) * 100}%` }}
              ></div>
              <div className="flex items-center justify-between flex-1">
                <span className="text-sm font-medium group-hover:text-primary-600">{material.name}</span>
                <span className="text-sm text-surface-500">{material.count} projects</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center pt-6 border-t border-surface-200">
          <div>
            <h3 className="text-sm font-medium text-surface-900">Material Insights</h3>
            <p className="text-xs text-surface-500 mt-1">Based on 254 materials across 28 projects</p>
          </div>
          <Button 
            className="flex items-center gap-2 text-sm"
            onClick={() => setIsReportModalOpen(true)}
          >
            <Sparkles size={14} />
            <span>Generate Report</span>
          </Button>
        </div>
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
      
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default DashboardHome;
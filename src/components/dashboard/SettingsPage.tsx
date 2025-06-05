import React, { useState } from 'react';
import { Building2, Image, Bell, Mail, ChevronDown, CreditCard, Tag, FolderArchive, Clock, Trash2, Plus, FileBarChart, Download } from 'lucide-react';
import Button from '../ui/Button';
import NewProjectModal from './modals/NewProjectModal';
import TagsModal from './modals/TagsModal';
import ArchiveModal from './modals/ArchiveModal';
import DeleteProjectModal from './modals/DeleteProjectModal';
import { reportStore } from '../../utils/reportGenerator';

const SettingsPage: React.FC = () => {
  const [studioName, setStudioName] = useState('Archi Studio');
  const [email, setEmail] = useState('contact@archistudio.com');
  const [notifications, setNotifications] = useState({
    reorderAlerts: true,
    discontinuedMaterialAlerts: true,
    monthlyReports: true
  });

  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle logo upload
      console.log('Uploading logo:', file.name);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDownloadReport = (report: typeof reportStore.reports[0]) => {
    const url = URL.createObjectURL(report.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = report.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Mock recent projects data
  const recentProjects = [
    {
      name: 'Mountain Lodge',
      client: 'Alpine Resorts',
      uploadDate: '2024-03-18',
      status: 'processing',
      estimatedCompletion: '2024-03-20'
    },
    {
      name: 'Urban Apartment',
      client: 'Metro Living',
      uploadDate: '2024-03-15',
      status: 'completed',
      completedDate: '2024-03-17'
    },
    {
      name: 'Coastal Villa',
      client: 'Davidson Family',
      uploadDate: '2024-03-12',
      status: 'processing',
      estimatedCompletion: '2024-03-14'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Studio Settings */}
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Studio Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">
                  Studio Name
                </label>
                <input
                  type="text"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">
                  Studio Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-surface-100 rounded-lg flex items-center justify-center">
                    <Building2 className="text-surface-400" size={24} />
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      <Image size={16} />
                      <span>Upload Logo</span>
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <p className="text-xs text-surface-500 mt-1">
                      Recommended: 512x512px PNG or JPG
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects & Data Control */}
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Projects & Data Control</h2>
            <div className="space-y-4">
              {/* Project Management */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-surface-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Tag size={20} className="text-surface-600" />
                    <div>
                      <h3 className="font-medium">Project Tags</h3>
                      <p className="text-sm text-surface-600">Organize by client or type</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsTagsModalOpen(true)}
                  >
                    Manage Tags
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-surface-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FolderArchive size={20} className="text-surface-600" />
                    <div>
                      <h3 className="font-medium">Archive Projects</h3>
                      <p className="text-sm text-surface-600">Hide projects without deleting</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsArchiveModalOpen(true)}
                  >
                    View Archive
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-surface-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Trash2 size={20} className="text-accent-600" />
                    <div>
                      <h3 className="font-medium text-accent-600">Delete Projects</h3>
                      <p className="text-sm text-surface-600">Permanently remove projects</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-accent-600 border-accent-200 hover:bg-accent-50"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Report History */}
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Generated Reports</h2>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileBarChart size={16} />
                <span>Generate New Report</span>
              </Button>
            </div>
            <div className="space-y-4">
              {reportStore.getReports().map((report) => (
                <div 
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-surface-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg">
                      <FileBarChart size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-surface-600">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleDownloadReport(report)}
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </Button>
                </div>
              ))}
              {reportStore.getReports().length === 0 && (
                <div className="text-center py-8 text-surface-600">
                  <FileBarChart className="mx-auto h-12 w-12 text-surface-400 mb-3" />
                  <p>No reports generated yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recent Projects</h2>
              <Button 
                className="flex items-center gap-2"
                onClick={() => setIsNewProjectModalOpen(true)}
              >
                <Plus size={16} />
                <span>Add Project</span>
              </Button>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div 
                  key={index}
                  className="p-4 bg-surface-50 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-surface-600">{project.client}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'processing' 
                        ? 'bg-primary-50 text-primary-700'
                        : 'bg-green-50 text-green-700'
                    }`}>
                      {project.status === 'processing' ? 'Processing' : 'Completed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-surface-500">
                    <Clock size={14} />
                    <span>
                      {project.status === 'processing'
                        ? `Est. completion: ${new Date(project.estimatedCompletion).toLocaleDateString()}`
                        : `Completed: ${new Date(project.completedDate).toLocaleDateString()}`
                      }
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <Bell size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Reorder Alerts</h3>
                    <p className="text-sm text-surface-600">Get notified when materials need reordering</p>
                  </div>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.reorderAlerts ? 'bg-primary-600' : 'bg-surface-200'
                  }`}
                  onClick={() => handleNotificationChange('reorderAlerts')}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.reorderAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent-50 rounded-lg">
                    <Bell size={20} className="text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Discontinued Material Alerts</h3>
                    <p className="text-sm text-surface-600">Get notified when materials are discontinued</p>
                  </div>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.discontinuedMaterialAlerts ? 'bg-primary-600' : 'bg-surface-200'
                  }`}
                  onClick={() => handleNotificationChange('discontinuedMaterialAlerts')}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.discontinuedMaterialAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-terracotta-50 rounded-lg">
                    <Mail size={20} className="text-terracotta-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Monthly Summary Reports</h3>
                    <p className="text-sm text-surface-600">Receive monthly usage reports via email</p>
                  </div>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.monthlyReports ? 'bg-primary-600' : 'bg-surface-200'
                  }`}
                  onClick={() => handleNotificationChange('monthlyReports')}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.monthlyReports ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Subscription */}
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Subscription</h2>
            <div className="p-4 bg-surface-50 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Pro Plan</span>
                <span className="text-sm text-surface-600">€350/month</span>
              </div>
              <div className="text-sm text-surface-600">Next billing date: Apr 1, 2024</div>
            </div>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-center flex items-center gap-2"
              >
                <CreditCard size={16} />
                <span>Update Billing</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-center flex items-center gap-2"
              >
                <ChevronDown size={16} />
                <span>Change Plan</span>
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Danger Zone</h2>
            <Button 
              variant="outline" 
              className="w-full justify-center text-accent-600 border-accent-200 hover:bg-accent-50 flex items-center gap-2"
            >
              <Trash2 size={16} />
              <span>Cancel Subscription</span>
            </Button>
          </div>
        </div>
      </div>

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />

      <TagsModal
        isOpen={isTagsModalOpen}
        onClose={() => setIsTagsModalOpen(false)}
      />

      <ArchiveModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
      />

      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default SettingsPage;
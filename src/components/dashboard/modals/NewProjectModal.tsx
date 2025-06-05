import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Upload, Plus, Clock, FileText, RefreshCw } from 'lucide-react';
import Button from '../../ui/Button';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectData {
  name: string;
  client: string;
  type: string;
  customType: string;
  startDate: string;
  endDate: string;
  notes: string;
  status: 'active' | 'completed';
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'details' | 'upload'>('details');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    client: '',
    type: 'residential',
    customType: '',
    startDate: '',
    endDate: '',
    notes: '',
    status: 'active'
  });

  const [uploadStatus, setUploadStatus] = useState<{
    file: File | null;
    isUploading: boolean;
  }>({
    file: null,
    isUploading: false
  });

  // Mock data - would come from your database
  const existingClients = [
    'Davidson Family',
    'Alpine Resorts',
    'Metro Living',
    'Apex Investments'
  ];

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
    }
  ];

  const projectTypes = [
    'residential',
    'commercial',
    'healthcare',
    'hospitality',
    'education',
    'custom'
  ];

  const [showClientInput, setShowClientInput] = useState(false);

  const handleClientSelect = (client: string) => {
    if (client === 'new') {
      setShowClientInput(true);
      setProjectData(prev => ({ ...prev, client: '' }));
    } else {
      setShowClientInput(false);
      setProjectData(prev => ({ ...prev, client }));
    }
  };

  const handleProjectCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('upload');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadStatus({
        file,
        isUploading: false
      });
    }
  };

  const handleUploadAndProcess = () => {
    if (!uploadStatus.file) return;
    
    setUploadStatus(prev => ({ ...prev, isUploading: true }));
    
    // Simulate upload process and add to recent projects
    setTimeout(() => {
      // Add to recent projects
      const newProject = {
        name: projectData.name,
        client: projectData.client,
        uploadDate: new Date().toISOString(),
        status: 'processing' as const,
        estimatedCompletion: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
      };
      
      recentProjects.unshift(newProject);
      
      // If client is new, add to existing clients
      if (showClientInput && !existingClients.includes(projectData.client)) {
        existingClients.push(projectData.client);
      }
      
      // If project type is custom, add to project types
      if (projectData.type === 'custom' && !projectTypes.includes(projectData.customType.toLowerCase())) {
        projectTypes.push(projectData.customType.toLowerCase());
      }
      
      onClose();
      // Reset state
      setStep('details');
      setUploadStatus({ file: null, isUploading: false });
      setProjectData({
        name: '',
        client: '',
        type: 'residential',
        customType: '',
        startDate: '',
        endDate: '',
        notes: '',
        status: 'active'
      });
    }, 1500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={() => {
          onClose();
          setStep('details');
          setSelectedFile(null);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-surface-900">
                    {step === 'details' ? 'New Project' : 'Upload Materials PDF'}
                  </h3>
                  <button
                    onClick={() => {
                      onClose();
                      setStep('details');
                      setSelectedFile(null);
                    }}
                    className="text-surface-500 hover:text-surface-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Title>

                {step === 'details' ? (
                  <form onSubmit={handleProjectCreate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={projectData.name}
                        onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">
                        Client
                      </label>
                      {!showClientInput ? (
                        <div className="flex gap-2">
                          <select
                            value={projectData.client}
                            onChange={(e) => handleClientSelect(e.target.value)}
                            className="flex-1 px-3 py-2 border border-surface-200 rounded-lg text-sm"
                            required
                          >
                            <option value="">Select a client</option>
                            {existingClients.map(client => (
                              <option key={client} value={client}>{client}</option>
                            ))}
                            <option value="new">+ Add New Client</option>
                          </select>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={projectData.client}
                            onChange={(e) => setProjectData({ ...projectData, client: e.target.value })}
                            placeholder="Enter client name"
                            className="flex-1 px-3 py-2 border border-surface-200 rounded-lg text-sm"
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowClientInput(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">
                        Project Type
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={projectData.type}
                          onChange={(e) => setProjectData({ ...projectData, type: e.target.value })}
                          className="flex-1 px-3 py-2 border border-surface-200 rounded-lg text-sm"
                          required
                        >
                          {projectTypes.map(type => (
                            <option key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      {projectData.type === 'custom' && (
                        <input
                          type="text"
                          value={projectData.customType}
                          onChange={(e) => setProjectData({ ...projectData, customType: e.target.value })}
                          placeholder="Enter custom project type"
                          className="mt-2 w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                          required
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={projectData.startDate}
                          onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })}
                          className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1">
                          End Date (if completed)
                        </label>
                        <input
                          type="date"
                          value={projectData.endDate}
                          onChange={(e) => setProjectData({ ...projectData, endDate: e.target.value })}
                          className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                          min={projectData.startDate}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">
                        Notes (Optional)
                      </label>
                      <textarea
                        value={projectData.notes}
                        onChange={(e) => setProjectData({ ...projectData, notes: e.target.value })}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                        rows={3}
                      />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          onClose();
                          setStep('details');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Continue
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="border-2 border-dashed border-surface-200 rounded-lg p-6">
                      {!uploadStatus.file ? (
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-surface-400" />
                          <p className="mt-2 text-sm text-surface-600">
                            Upload materials PDF for {projectData.name}
                          </p>
                          <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileSelect}
                            id="pdf-upload"
                          />
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => document.getElementById('pdf-upload')?.click()}
                          >
                            Select PDF
                          </Button>
                        </div>
                      ) : (
                        <div className="p-4 bg-surface-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-md">
                              <FileText className="h-6 w-6 text-primary-600" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-medium text-surface-900">{uploadStatus.file.name}</p>
                              <p className="text-sm text-surface-600">
                                {formatFileSize(uploadStatus.file.size)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setUploadStatus({ file: null, isUploading: false })}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8">
                      <h4 className="text-sm font-medium text-surface-700 mb-3">Recent Projects</h4>
                      <div className="space-y-3">
                        {recentProjects.map((project, index) => (
                          <div 
                            key={index}
                            className="p-3 bg-surface-50 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h5 className="font-medium text-sm">{project.name}</h5>
                                <p className="text-xs text-surface-500">{project.client}</p>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                project.status === 'processing' 
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'bg-green-50 text-green-700'
                              }`}>
                                {project.status === 'processing' ? 'Processing' : 'Completed'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-surface-500">
                              <Clock size={12} />
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

                    <div className="mt-6 flex justify-end gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep('details')}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleUploadAndProcess}
                        disabled={!uploadStatus.file || uploadStatus.isUploading}
                        className="flex items-center gap-2"
                      >
                        {uploadStatus.isUploading ? (
                          <>
                            <span className="animate-spin">
                              <RefreshCw size={16} />
                            </span>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={16} />
                            <span>Upload and Process</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewProjectModal;
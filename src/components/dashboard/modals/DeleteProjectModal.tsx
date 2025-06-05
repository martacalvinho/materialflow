import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import Button from '../../ui/Button';

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({ isOpen, onClose }) => {
  const [projects] = useState([
    { 
      id: 1, 
      name: 'Coastal Villa Renovation',
      client: 'Davidson Family',
      lastUpdated: '2024-02-15'
    },
    { 
      id: 2, 
      name: 'Mountain Lodge',
      client: 'Alpine Resorts',
      lastUpdated: '2023-08-20'
    }
  ]);

  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

  const handleToggleProject = (projectId: number) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleDelete = () => {
    // Handle delete logic
    console.log('Deleting projects:', selectedProjects);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                  <h3 className="text-lg font-medium text-surface-900">Delete Projects</h3>
                  <button
                    onClick={onClose}
                    className="text-surface-500 hover:text-surface-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Title>

                <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 text-accent-700">
                    <AlertTriangle size={20} />
                    <p className="text-sm">
                      Warning: This action cannot be undone. All selected projects and their data will be permanently deleted.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {projects.map(project => (
                    <div
                      key={project.id}
                      className="flex items-center gap-3 p-4 border border-surface-200 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(project.id)}
                        onChange={() => handleToggleProject(project.id)}
                        className="h-4 w-4 text-primary-600 rounded border-surface-300"
                      />
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-surface-600">{project.client}</p>
                        <p className="text-xs text-surface-500">
                          Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    className="text-accent-600 border-accent-200 hover:bg-accent-50 flex items-center gap-2"
                    onClick={handleDelete}
                    disabled={selectedProjects.length === 0}
                  >
                    <Trash2 size={16} />
                    <span>Delete Selected</span>
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteProjectModal;
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Archive, RefreshCw } from 'lucide-react';
import Button from '../../ui/Button';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArchiveModal: React.FC<ArchiveModalProps> = ({ isOpen, onClose }) => {
  const [archivedProjects] = useState([
    { 
      id: 1, 
      name: 'Urban Loft Renovation',
      client: 'Smith Family',
      archivedDate: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Beach House',
      client: 'Johnson & Co',
      archivedDate: '2023-12-20'
    }
  ]);

  const handleUnarchive = (projectId: number) => {
    // Handle unarchive logic
    console.log('Unarchiving project:', projectId);
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
                  <h3 className="text-lg font-medium text-surface-900">Archived Projects</h3>
                  <button
                    onClick={onClose}
                    className="text-surface-500 hover:text-surface-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Title>

                <div className="space-y-4">
                  {archivedProjects.map(project => (
                    <div
                      key={project.id}
                      className="p-4 border border-surface-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-surface-600">{project.client}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleUnarchive(project.id)}
                        >
                          <RefreshCw size={14} />
                          <span>Unarchive</span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-surface-500">
                        <Archive size={14} />
                        <span>Archived on {new Date(project.archivedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}

                  {archivedProjects.length === 0 && (
                    <div className="text-center py-8 text-surface-600">
                      <Archive className="mx-auto h-12 w-12 text-surface-400 mb-3" />
                      <p>No archived projects</p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Button className="w-full justify-center" onClick={onClose}>
                    Close
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

export default ArchiveModal;
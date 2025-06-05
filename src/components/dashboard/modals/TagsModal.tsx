import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Plus, Tag } from 'lucide-react';
import Button from '../../ui/Button';

interface TagsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TagsModal: React.FC<TagsModalProps> = ({ isOpen, onClose }) => {
  const [newTag, setNewTag] = useState('');
  const [newProjectType, setNewProjectType] = useState('');
  const [tags, setTags] = useState([
    { id: 1, name: 'Residential', type: 'project' },
    { id: 2, name: 'Commercial', type: 'project' },
    { id: 3, name: 'Healthcare', type: 'project' },
    { id: 4, name: 'Davidson Family', type: 'client' },
    { id: 5, name: 'Alpine Resorts', type: 'client' }
  ]);

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { id: Date.now(), name: newTag.trim(), type: 'client' }]);
      setNewTag('');
    }
  };

  const handleAddProjectType = () => {
    if (newProjectType.trim()) {
      setTags([...tags, { id: Date.now(), name: newProjectType.trim(), type: 'project' }]);
      setNewProjectType('');
    }
  };

  const handleDeleteTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
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
                  <h3 className="text-lg font-medium text-surface-900">Manage Tags</h3>
                  <button
                    onClick={onClose}
                    className="text-surface-500 hover:text-surface-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Title>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Add New Client
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Enter client name"
                        className="flex-1 px-3 py-2 border border-surface-200 rounded-lg text-sm"
                      />
                      <Button onClick={handleAddTag}>
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Add Project Type
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newProjectType}
                        onChange={(e) => setNewProjectType(e.target.value)}
                        placeholder="Enter project type"
                        className="flex-1 px-3 py-2 border border-surface-200 rounded-lg text-sm"
                      />
                      <Button onClick={handleAddProjectType}>
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-surface-700 mb-3">Project Types</h4>
                    <div className="space-y-2">
                      {tags.filter(tag => tag.type === 'project').map(tag => (
                        <div
                          key={tag.id}
                          className="flex items-center justify-between p-2 bg-surface-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Tag size={16} className="text-surface-600" />
                            <span className="text-sm">{tag.name}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteTag(tag.id)}
                            className="text-surface-400 hover:text-accent-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-surface-700 mb-3">Clients</h4>
                    <div className="space-y-2">
                      {tags.filter(tag => tag.type === 'client').map(tag => (
                        <div
                          key={tag.id}
                          className="flex items-center justify-between p-2 bg-surface-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Tag size={16} className="text-surface-600" />
                            <span className="text-sm">{tag.name}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteTag(tag.id)}
                            className="text-surface-400 hover:text-accent-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full justify-center" onClick={onClose}>
                    Done
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

export default TagsModal;
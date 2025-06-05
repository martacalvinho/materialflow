import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Upload } from 'lucide-react';
import Button from '../../ui/Button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('Uploading file:', file.name);
    }
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
                  <h3 className="text-lg font-medium text-surface-900">Upload Project PDF</h3>
                  <button
                    onClick={onClose}
                    className="text-surface-500 hover:text-surface-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Title>

                <div className="mt-4">
                  <div className="border-2 border-dashed border-surface-200 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-surface-400" />
                    <p className="mt-4 text-sm text-surface-600">
                      Drag and drop your PDF here, or click to select a file
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileUpload}
                      id="file-upload"
                    />
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Select File
                    </Button>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full justify-center" onClick={onClose}>
                    Upload and Process
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

export default UploadModal;
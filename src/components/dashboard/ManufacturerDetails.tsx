import React, { useState } from 'react';
import { ArrowLeft, Building2, Package, Calendar, Phone, Mail, Globe, FileText, Plus, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../ui/Button';
import { mockDatabase } from '../../utils/mockData';

interface Note {
  id: number;
  date: string;
  content: string;
  project: string | null;
}

const ManufacturerDetails: React.FC = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      date: '2024-03-15',
      content: 'Waiting for oak flooring samples for Davidson project',
      project: 'Coastal Villa Renovation'
    },
    {
      id: 2,
      date: '2024-03-10',
      content: 'Discussed bulk pricing for upcoming projects',
      project: null
    }
  ]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({
    content: '',
    project: ''
  });

  // Mock manufacturer data - would come from your database
  const manufacturer = {
    id: Number(id),
    name: 'John Smith',
    company: 'WoodCo Supplies',
    position: 'Sales Representative',
    email: 'john.smith@woodco.com',
    phone: '+1 (555) 123-4567',
    website: 'https://woodco.com',
    lastContacted: '2024-03-15',
    materials: [
      { 
        id: 1, 
        name: 'Oak Hardwood Flooring', 
        pricePerSqFt: 8.50,
        projects: 5,
        lastUsed: '2024-02-15'
      },
      { 
        id: 2, 
        name: 'Maple Hardwood Flooring', 
        pricePerSqFt: 9.75,
        projects: 3,
        lastUsed: '2024-01-20'
      }
    ],
    projects: [
      {
        id: 1,
        name: 'Coastal Villa Renovation',
        client: 'Davidson Family',
        materials: ['Oak Hardwood Flooring'],
        lastUpdated: '2024-02-15'
      },
      {
        id: 2,
        name: 'Mountain Lodge',
        client: 'Alpine Resorts',
        materials: ['Maple Hardwood Flooring', 'Oak Hardwood Flooring'],
        lastUpdated: '2023-08-20'
      }
    ]
  };

  const handleAddNote = () => {
    if (newNote.content.trim()) {
      const note: Note = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        content: newNote.content.trim(),
        project: newNote.project || null
      };
      setNotes(prev => [note, ...prev]);
      setNewNote({ content: '', project: '' });
      setIsAddingNote(false);
    }
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/manufacturers">
            <Button variant="ghost" className="p-2">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-surface-900">{manufacturer.name}</h1>
            <p className="text-surface-600">{manufacturer.position} at {manufacturer.company}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Mail size={16} />
                  <span className="text-sm">Email</span>
                </div>
                <a href={`mailto:${manufacturer.email}`} className="text-primary-600 hover:text-primary-700">
                  {manufacturer.email}
                </a>
              </div>
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Phone size={16} />
                  <span className="text-sm">Phone</span>
                </div>
                <a href={`tel:${manufacturer.phone}`} className="text-primary-600 hover:text-primary-700">
                  {manufacturer.phone}
                </a>
              </div>
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Globe size={16} />
                  <span className="text-sm">Website</span>
                </div>
                <a 
                  href={manufacturer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700"
                >
                  {manufacturer.website.replace('https://', '')}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Materials</h2>
            <div className="space-y-4">
              {manufacturer.materials.map(material => (
                <Link
                  key={material.id}
                  to={`/dashboard/materials/${material.id}`}
                  className="block"
                >
                  <div className="p-4 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-surface-900">{material.name}</h3>
                        <p className="text-sm text-surface-600 mt-1">
                          ${material.pricePerSqFt.toFixed(2)}/sq.ft
                        </p>
                      </div>
                      <span className="text-sm text-surface-600">
                        {material.projects} projects
                      </span>
                    </div>
                    <div className="text-sm text-surface-600">
                      Last used: {new Date(material.lastUsed).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Projects</h2>
            <div className="space-y-4">
              {manufacturer.projects.map(project => (
                <Link
                  key={project.id}
                  to={`/dashboard/projects/${project.id}`}
                  className="block"
                >
                  <div className="p-4 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-surface-900">{project.name}</h3>
                        <Link 
                          to={`/dashboard/clients/${project.id}`}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          {project.client}
                        </Link>
                      </div>
                    </div>
                    <div className="text-sm text-surface-600">
                      Materials: {project.materials.join(', ')}
                    </div>
                    <div className="text-sm text-surface-600 mt-2">
                      Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-surface-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notes</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAddingNote(true)}
              >
                <Plus size={16} />
                <span>Add Note</span>
              </Button>
            </div>
            <div className="space-y-4">
              {isAddingNote && (
                <div className="p-4 bg-surface-50 rounded-lg">
                  <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Enter note..."
                    className="w-full p-2 text-sm border border-surface-200 rounded-lg mb-2"
                    rows={3}
                  />
                  <select
                    value={newNote.project}
                    onChange={(e) => setNewNote({ ...newNote, project: e.target.value })}
                    className="w-full p-2 text-sm border border-surface-200 rounded-lg mb-2"
                  >
                    <option value="">No project</option>
                    {manufacturer.projects.map(project => (
                      <option key={project.id} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsAddingNote(false);
                        setNewNote({ content: '', project: '' });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAddNote}
                      disabled={!newNote.content.trim()}
                    >
                      Save Note
                    </Button>
                  </div>
                </div>
              )}
              {notes.map(note => (
                <div key={note.id} className="p-4 bg-surface-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-surface-600">
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      {note.project && (
                        <Link
                          to={`/dashboard/projects/${manufacturer.projects.find(p => p.name === note.project)?.id}`}
                          className="text-xs px-2 py-1 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100"
                        >
                          {note.project}
                        </Link>
                      )}
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-surface-400 hover:text-surface-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-surface-700">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDetails;
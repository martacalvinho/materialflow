import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, FileBarChart, Filter, Calendar, Building2, Package, Users, Eye, Download, ChevronRight } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import Button from '../../ui/Button';
import { generatePDF } from '../../../utils/reportGenerator';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FilterState {
  projects: string[];
  clients: string[];
  materialTypes: string[];
  manufacturers: string[];
  dateRange: {
    start: string;
    end: string;
  } | null;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState<'internal' | 'client'>('internal');
  const [showPreview, setShowPreview] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    projects: [],
    clients: [],
    materialTypes: [],
    manufacturers: [],
    dateRange: null
  });

  // Mock data - would come from your database
  const availableFilters = {
    projects: ['Coastal Villa Renovation', 'Mountain Lodge', 'Urban Apartment'],
    clients: ['Davidson Family', 'Alpine Resorts', 'Metro Living'],
    materialTypes: ['Wood', 'Stone', 'Metal', 'Fabric', 'Paint'],
    manufacturers: ['WoodCo', 'StoneWorks', 'MetalCraft', 'FabricHouse', 'ColorMax']
  };

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    if (value === 'All') {
      setFilters(prev => ({
        ...prev,
        [type]: prev[type].length === availableFilters[type].length ? [] : [...availableFilters[type]]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value]
      }));
    }
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange || { start: '', end: '' },
        [field]: value
      }
    }));
  };

  const generateReportData = () => {
    // Generate report data based on filters
    return {
      type: reportType,
      filters,
      sections: {
        overview: {
          totalMaterials: 156,
          totalSquareMeters: 2500,
          avgMaterialsPerProject: 32,
          includedProjects: filters.projects.length ? filters.projects : availableFilters.projects
        },
        topMaterials: {
          mostSpecified: [
            { name: 'Oak Hardwood', manufacturer: 'WoodCo', projects: 8, totalArea: 1200 },
            { name: 'Matte White Paint', manufacturer: 'ColorMax', projects: 6, totalArea: 2500 }
          ],
          discontinued: [
            { name: 'XStone Marble', usedIn: 12, dateRange: '2015-2022' }
          ]
        },
        categories: {
          byType: {
            wood: 45,
            paint: 30,
            stone: 25
          },
          byProjectType: {
            residential: 60,
            commercial: 40
          }
        },
        manufacturers: {
          top5: [
            { name: 'WoodCo', percentage: 25 },
            { name: 'ColorMax', percentage: 20 }
          ]
        },
        pricing: reportType === 'internal' ? {
          avgPricePerMeter: 85,
          mostExpensive: 'Carrara Marble',
          totalCost: 125000
        } : null
      }
    };
  };

  const handleGenerateReport = () => {
    const reportData = generateReportData();
    generatePDF(reportData);
    onClose();
  };

  const ReportPreview = ({ data }) => {
    const materialTypeData = {
      labels: Object.keys(data.sections.categories.byType),
      datasets: [{
        data: Object.values(data.sections.categories.byType),
        backgroundColor: [
          'rgba(109, 40, 217, 0.8)',
          'rgba(225, 29, 72, 0.8)',
          'rgba(234, 88, 12, 0.8)'
        ]
      }]
    };

    const projectTypeData = {
      labels: Object.keys(data.sections.categories.byProjectType),
      datasets: [{
        label: 'Projects by Type',
        data: Object.values(data.sections.categories.byProjectType),
        backgroundColor: 'rgba(109, 40, 217, 0.8)'
      }]
    };

    return (
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="space-y-12">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-surface-900">Material Usage Report</h1>
            <p className="text-surface-600 mt-2">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Usage Overview</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 bg-surface-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary-600">
                  {data.sections.overview.totalMaterials}
                </div>
                <div className="text-surface-600 mt-2">Total Materials</div>
              </div>
              <div className="p-6 bg-surface-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary-600">
                  {data.sections.overview.totalSquareMeters}m²
                </div>
                <div className="text-surface-600 mt-2">Total Area</div>
              </div>
              <div className="p-6 bg-surface-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary-600">
                  {data.sections.overview.avgMaterialsPerProject}
                </div>
                <div className="text-surface-600 mt-2">Avg Materials/Project</div>
              </div>
            </div>
          </section>

          {/* Distribution Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Material Distribution</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">By Material Type</h3>
                <div className="h-64">
                  <Doughnut 
                    data={materialTypeData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">By Project Type</h3>
                <div className="h-64">
                  <Bar 
                    data={projectTypeData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Top Materials Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Most Used Materials</h2>
            <div className="space-y-4">
              {data.sections.topMaterials.mostSpecified.map((material, index) => (
                <div key={index} className="p-4 bg-surface-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{material.name}</h4>
                      <p className="text-sm text-surface-600">Manufacturer: {material.manufacturer}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{material.projects} projects</div>
                      <div className="text-sm text-surface-600">{material.totalArea}m² total area</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Discontinued Materials */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Discontinued Materials</h2>
            <div className="space-y-4">
              {data.sections.topMaterials.discontinued.map((material, index) => (
                <div key={index} className="p-4 bg-accent-50 border border-accent-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-accent-700">{material.name}</h4>
                      <p className="text-sm text-accent-600">Used in {material.usedIn} projects ({material.dateRange})</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Analysis (Internal Only) */}
          {reportType === 'internal' && data.sections.pricing && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">Pricing Analysis</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-surface-50 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary-600">
                    €{data.sections.pricing.avgPricePerMeter}
                  </div>
                  <div className="text-surface-600 mt-2">Average Price/m²</div>
                </div>
                <div className="p-6 bg-surface-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-primary-600">
                    {data.sections.pricing.mostExpensive}
                  </div>
                  <div className="text-surface-600 mt-2">Most Expensive Material</div>
                </div>
                <div className="p-6 bg-surface-50 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary-600">
                    €{data.sections.pricing.totalCost.toLocaleString()}
                  </div>
                  <div className="text-surface-600 mt-2">Total Material Cost</div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={() => {
          setShowPreview(false);
          onClose();
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
              <Dialog.Panel className={`w-full transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all ${
                showPreview ? 'max-w-6xl' : 'max-w-2xl'
              }`}>
                <div className="p-6">
                  <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-surface-900">
                      {showPreview ? 'Report Preview' : 'Generate Report'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowPreview(false);
                        onClose();
                      }}
                      className="text-surface-500 hover:text-surface-700 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </Dialog.Title>

                  {!showPreview ? (
                    <>
                      {/* Report Configuration */}
                      <div className="space-y-6">
                        {/* Report Type Selection */}
                        <div>
                          <label className="text-sm font-medium text-surface-900 block mb-3">
                            Report Type
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              className={`p-4 rounded-lg border text-center ${
                                reportType === 'internal'
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-surface-200 text-surface-600 hover:bg-surface-50'
                              }`}
                              onClick={() => setReportType('internal')}
                            >
                              <FileBarChart className="mx-auto h-6 w-6 mb-2" />
                              <span className="text-sm font-medium">Internal Report</span>
                              <p className="text-xs mt-1">Includes pricing and cost analysis</p>
                            </button>
                            <button
                              className={`p-4 rounded-lg border text-center ${
                                reportType === 'client'
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-surface-200 text-surface-600 hover:bg-surface-50'
                              }`}
                              onClick={() => setReportType('client')}
                            >
                              <Users className="mx-auto h-6 w-6 mb-2" />
                              <span className="text-sm font-medium">Client Report</span>
                              <p className="text-xs mt-1">Excludes sensitive pricing data</p>
                            </button>
                          </div>
                        </div>

                        {/* Filters */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Filter size={16} />
                            <label className="text-sm font-medium text-surface-900">
                              Report Filters
                            </label>
                          </div>

                          <div className="space-y-4">
                            {/* Projects Filter */}
                            <div>
                              <label className="text-sm text-surface-600 block mb-2">
                                Select Projects
                              </label>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleFilterChange('projects', 'All')}
                                  className={`px-3 py-1.5 rounded-full text-sm ${
                                    filters.projects.length === availableFilters.projects.length
                                      ? 'bg-primary-100 text-primary-700'
                                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                                  }`}
                                >
                                  All Projects
                                </button>
                                {availableFilters.projects.map(project => (
                                  <button
                                    key={project}
                                    onClick={() => handleFilterChange('projects', project)}
                                    className={`px-3 py-1.5 rounded-full text-sm ${
                                      filters.projects.includes(project)
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                                    }`}
                                  >
                                    {project}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Material Types Filter */}
                            <div>
                              <label className="text-sm text-surface-600 block mb-2">
                                Material Types
                              </label>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleFilterChange('materialTypes', 'All')}
                                  className={`px-3 py-1.5 rounded-full text-sm ${
                                    filters.materialTypes.length === availableFilters.materialTypes.length
                                      ? 'bg-primary-100 text-primary-700'
                                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                                  }`}
                                >
                                  All Types
                                </button>
                                {availableFilters.materialTypes.map(type => (
                                  <button
                                    key={type}
                                    onClick={() => handleFilterChange('materialTypes', type)}
                                    className={`px-3 py-1.5 rounded-full text-sm ${
                                      filters.materialTypes.includes(type)
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                                    }`}
                                  >
                                    {type}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Manufacturers Filter */}
                            <div>
                              <label className="text-sm text-surface-600 block mb-2">
                                Manufacturers
                              </label>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleFilterChange('manufacturers', 'All')}
                                  className={`px-3 py-1.5 rounded-full text-sm ${
                                    filters.manufacturers.length === availableFilters.manufacturers.length
                                      ? 'bg-primary-100 text-primary-700'
                                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                                  }`}
                                >
                                  All Manufacturers
                                </button>
                                {availableFilters.manufacturers.map(manufacturer => (
                                  <button
                                    key={manufacturer}
                                    onClick={() => handleFilterChange('manufacturers', manufacturer)}
                                    className={`px-3 py-1.5 rounded-full text-sm ${
                                      filters.manufacturers.includes(manufacturer)
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                                    }`}
                                  >
                                    {manufacturer}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Date Range */}
                            <div>
                              <label className="text-sm text-surface-600 block mb-2">
                                Date Range (Optional)
                              </label>
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="date"
                                  value={filters.dateRange?.start || ''}
                                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                                  className="px-3 py-2 border border-surface-200 rounded-lg text-sm"
                                />
                                <input
                                  type="date"
                                  value={filters.dateRange?.end || ''}
                                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                                  className="px-3 py-2 border border-surface-200 rounded-lg text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <Button variant="outline" onClick={onClose}>
                          Cancel
                        </Button>
                        <Button 
                          className="flex items-center gap-2"
                          onClick={() => setShowPreview(true)}
                        >
                          <Eye size={16} />
                          <span>Preview Report</span>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="max-h-[70vh] overflow-y-auto">
                        <ReportPreview data={generateReportData()} />
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowPreview(false)}
                        >
                          Back to Filters
                        </Button>
                        <Button 
                          className="flex items-center gap-2"
                          onClick={handleGenerateReport}
                        >
                          <Download size={16} />
                          <span>Download PDF</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReportModal;
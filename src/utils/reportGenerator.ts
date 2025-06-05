import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

interface ReportData {
  type: 'internal' | 'client';
  filters: {
    projects: string[];
    clients: string[];
    materialTypes: string[];
    manufacturers: string[];
    dateRange: {
      start: string;
      end: string;
    } | null;
  };
  sections: {
    overview: {
      totalMaterials: number;
      totalSquareMeters: number;
      avgMaterialsPerProject: number;
      includedProjects: string[];
    };
    topMaterials: {
      mostSpecified: Array<{
        name: string;
        manufacturer: string;
        projects: number;
        totalArea: number;
      }>;
      discontinued: Array<{
        name: string;
        usedIn: number;
        dateRange: string;
      }>;
    };
    categories: {
      byType: Record<string, number>;
      byProjectType: Record<string, number>;
    };
    manufacturers: {
      top5: Array<{
        name: string;
        percentage: number;
      }>;
    };
    pricing?: {
      avgPricePerMeter: number;
      mostExpensive: string;
      totalCost: number;
    } | null;
  };
}

export interface GeneratedReport {
  id: number;
  name: string;
  type: 'PDF' | 'Excel';
  date: string;
  size: string;
  data: Blob;
}

// Store for generated reports
export const reportStore = {
  reports: [] as GeneratedReport[],
  addReport(report: GeneratedReport) {
    this.reports.unshift(report);
    // Keep only last 10 reports
    if (this.reports.length > 10) {
      this.reports.pop();
    }
  },
  getReports() {
    return this.reports;
  }
};

export const generatePDF = async (data: ReportData): Promise<GeneratedReport> => {
  const doc = new jsPDF();
  let yPos = 20;
  const pageHeight = doc.internal.pageSize.getHeight();
  const bottomMargin = 20;
  const leftMargin = 20;
  const contentWidth = doc.internal.pageSize.getWidth() - leftMargin * 2;

  // Helper to check and add page if needed
  const checkAddPage = (spaceNeeded: number = 20) => {
    if (yPos + spaceNeeded > pageHeight - bottomMargin) {
      doc.addPage();
      yPos = 20;
    }
  };

  const addText = (text: string, x: number, y: number, options: { size?: number; color?: string; bold?: boolean; maxWidth?: number } = {}) => {
    const { size = 12, color = '#000000', bold = false, maxWidth } = options;
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(color);
    if (maxWidth) {
      doc.text(text, x, y, { maxWidth });
    } else {
      doc.text(text, x, y);
    }
  };

  const addSection = (title: string) => {
    checkAddPage(30);
    addText(title, leftMargin, yPos, { size: 16, bold: true });
    yPos += 10;
  };

  const addMetric = (label: string, value: string | number, labelWidth: number = 115) => {
    checkAddPage(20);
    
    doc.setFillColor(245, 245, 245);
    doc.rect(leftMargin, yPos - 6, contentWidth, 10, 'F');

    addText(label, leftMargin + 5, yPos, { size: 10 });
    const valueAsString = value.toString();
    const valueXPos = leftMargin + labelWidth + 10;
    addText(valueAsString, valueXPos, yPos, { size: 10, bold: true, maxWidth: contentWidth - labelWidth - 15});

    yPos += 15;
  };

  // Generate report content
  checkAddPage(50);
  addText('Material Usage Report', leftMargin, yPos, { size: 24, bold: true });
  yPos += 10;
  addText(`Generated on ${new Date().toLocaleDateString()}`, leftMargin, yPos, { size: 10, color: '#666666' });
  yPos += 20;

  // Overview
  addSection('Overview');
  addMetric('Total Materials', data.sections.overview.totalMaterials);
  addMetric('Total Square Meters', `${data.sections.overview.totalSquareMeters}m²`);
  addMetric('Average Materials per Project', data.sections.overview.avgMaterialsPerProject);

  if (data.sections.overview.includedProjects.length > 0) {
    checkAddPage(20);
    addText('Included Projects:', leftMargin + 5, yPos, { size: 10, bold: true });
    yPos += 7;
    const projectsText = data.sections.overview.includedProjects.join(', ');
    const projectLines = doc.splitTextToSize(projectsText, contentWidth - 10);
    addText(projectLines.join('\n'), leftMargin + 5, yPos, { size: 9, maxWidth: contentWidth -10 });
    yPos += projectLines.length * 5 + 5;
  }

  // Most Used Materials
  if (data.sections.topMaterials.mostSpecified.length > 0) {
    addSection('Most Used Materials');
    data.sections.topMaterials.mostSpecified.forEach(material => {
      const materialLabel = `${material.name} (${material.manufacturer})`;
      addMetric(materialLabel, `${material.projects} projects (${material.totalArea}m²)`);
    });
  }

  // Discontinued materials
  if (data.sections.topMaterials.discontinued.length > 0) {
    addSection('Potentially Discontinued Materials');
    data.sections.topMaterials.discontinued.forEach(material => {
      addMetric(material.name, `Used in ${material.usedIn} projects (Range: ${material.dateRange})`);
    });
  }

  // Categories
  if (Object.keys(data.sections.categories.byType).length > 0) {
    addSection('Material Categories (by Type)');
    Object.entries(data.sections.categories.byType).forEach(([type, value]) => {
      addMetric(type, `${value}% of total specified`);
    });
  }

  // Pricing (Internal Only)
  if (data.type === 'internal' && data.sections.pricing) {
    addSection('Pricing Analysis');
    addMetric('Average Price per m²', `€${data.sections.pricing.avgPricePerMeter.toFixed(2)}`);
    addMetric('Most Expensive Material', data.sections.pricing.mostExpensive);
    addMetric('Total Material Cost', `€${data.sections.pricing.totalCost.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`);
  }

  // Generate PDF blob
  const pdfBlob = doc.output('blob');
  
  // Create report entry
  const report: GeneratedReport = {
    id: Date.now(),
    name: `Material Usage Report - ${new Date().toLocaleDateString()}`,
    type: 'PDF',
    date: new Date().toISOString(),
    size: `${Math.round(pdfBlob.size / 1024)} KB`,
    data: pdfBlob
  };

  // Add to report store
  reportStore.addReport(report);

  return report;
};

export const generateExcel = (data: ReportData): GeneratedReport => {
  const wb = XLSX.utils.book_new();

  // Overview Sheet
  const overviewData = [
    ['Material Usage Overview'],
    ['Total Materials', data.sections.overview.totalMaterials],
    ['Total Square Meters', data.sections.overview.totalSquareMeters],
    ['Average Materials per Project', data.sections.overview.avgMaterialsPerProject],
    ['Included Projects', data.sections.overview.includedProjects.join(', ')],
  ];
  const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);
  XLSX.utils.book_append_sheet(wb, wsOverview, 'Overview');

  // Top Materials Sheet
  const materialsHeader = ['Material', 'Manufacturer', 'Projects Where Specified', 'Total Area (m²)'];
  const materialsRows = data.sections.topMaterials.mostSpecified.map(m => [
    m.name,
    m.manufacturer,
    m.projects,
    m.totalArea
  ]);
  const wsMaterials = XLSX.utils.aoa_to_sheet([materialsHeader, ...materialsRows]);
  XLSX.utils.book_append_sheet(wb, wsMaterials, 'Materials Analysis');

  // Categories Sheet
  const categoriesData = [
    ['Category', 'Percentage'],
    ...Object.entries(data.sections.categories.byType)
  ];
  const wsCategories = XLSX.utils.aoa_to_sheet(categoriesData);
  XLSX.utils.book_append_sheet(wb, wsCategories, 'Categories');

  // Pricing Sheet (Internal Only)
  if (data.type === 'internal' && data.sections.pricing) {
    const pricingData = [
      ['Pricing Analysis'],
      ['Average Price per m²', data.sections.pricing.avgPricePerMeter],
      ['Most Expensive Material', data.sections.pricing.mostExpensive],
      ['Total Material Cost', data.sections.pricing.totalCost]
    ];
    const wsPricing = XLSX.utils.aoa_to_sheet(pricingData);
    XLSX.utils.book_append_sheet(wb, wsPricing, 'Pricing');
  }

  // Generate Excel blob
  const excelBlob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  // Create report entry
  const report: GeneratedReport = {
    id: Date.now(),
    name: `Material Analysis - ${new Date().toLocaleDateString()}`,
    type: 'Excel',
    date: new Date().toISOString(),
    size: `${Math.round(excelBlob.size / 1024)} KB`,
    data: excelBlob
  };

  // Add to report store
  reportStore.addReport(report);

  return report;
};
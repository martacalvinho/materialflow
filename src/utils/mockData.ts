import { Project, Material, Manufacturer } from './types';

// Mock data store for the chat assistant to reference
export const mockDatabase = {
  materials: [
    { 
      id: 1, 
      name: 'Oak Hardwood Flooring', 
      category: 'Flooring',
      supplier: 'WoodCo',
      usage: 18,
      projects: [
        {
          name: 'Coastal Villa Renovation',
          locations: ['Living Room', 'Master Bedroom', 'Hallway'],
          area: 1200
        },
        {
          name: 'Mountain Lodge',
          locations: ['Living Room', 'Bedrooms'],
          area: 800
        }
      ]
    },
    { 
      id: 2, 
      name: 'Matte White Wall Paint',
      category: 'Paint',
      supplier: 'ColorMax',
      usage: 15,
      projects: [
        {
          name: 'Coastal Villa Renovation',
          locations: ['All Rooms'],
          area: 2500
        },
        {
          name: 'Urban Apartment Complex',
          locations: ['Living Areas', 'Bedrooms'],
          area: 1800
        }
      ]
    },
    { 
      id: 3, 
      name: 'Carrara Marble Countertop',
      category: 'Surfaces',
      supplier: 'StoneWorks',
      usage: 12,
      projects: [
        {
          name: 'Coastal Villa Renovation',
          locations: ['Kitchen', 'Master Bath'],
          area: 100
        },
        {
          name: 'Downtown Office Tower',
          locations: ['Reception', 'Executive Kitchen'],
          area: 150
        }
      ]
    },
    { 
      id: 4, 
      name: 'Brass Cabinet Hardware',
      category: 'Hardware',
      supplier: 'MetalCraft',
      usage: 10,
      projects: [
        {
          name: 'Coastal Villa Renovation',
          locations: ['Kitchen', 'Bathrooms'],
          quantity: 48
        },
        {
          name: 'Urban Apartment Complex',
          locations: ['All Units'],
          quantity: 240
        }
      ]
    },
    { 
      id: 5, 
      name: 'Polished Concrete Floor',
      category: 'Flooring',
      supplier: 'ConcreteWorks',
      usage: 8,
      projects: [
        {
          name: 'Downtown Office Tower',
          locations: ['Lobby', 'Common Areas'],
          area: 3000
        },
        {
          name: 'Urban Apartment Complex',
          locations: ['Parking', 'Storage'],
          area: 5000
        }
      ]
    }
  ],
  projects: [
    {
      id: 1,
      name: 'Coastal Villa Renovation',
      client: 'Davidson Family',
      type: 'Residential',
      materials: [
        {
          name: 'Oak Hardwood Flooring',
          locations: ['Living Room', 'Master Bedroom', 'Hallway'],
          area: 1200
        },
        {
          name: 'Matte White Wall Paint',
          locations: ['All Rooms'],
          area: 2500
        },
        {
          name: 'Carrara Marble Countertop',
          locations: ['Kitchen', 'Master Bath'],
          area: 100
        },
        {
          name: 'Brass Cabinet Hardware',
          locations: ['Kitchen', 'Bathrooms'],
          quantity: 48
        }
      ],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Downtown Office Tower',
      client: 'Apex Investments',
      type: 'Commercial',
      materials: [
        {
          name: 'Polished Concrete Floor',
          locations: ['Lobby', 'Common Areas'],
          area: 3000
        },
        {
          name: 'Carrara Marble Countertop',
          locations: ['Reception', 'Executive Kitchen'],
          area: 150
        }
      ],
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Urban Apartment Complex',
      client: 'Metro Living',
      type: 'Residential',
      materials: [
        {
          name: 'Matte White Wall Paint',
          locations: ['Living Areas', 'Bedrooms'],
          area: 1800
        },
        {
          name: 'Brass Cabinet Hardware',
          locations: ['All Units'],
          quantity: 240
        },
        {
          name: 'Polished Concrete Floor',
          locations: ['Parking', 'Storage'],
          area: 5000
        }
      ],
      status: 'Active'
    }
  ],
  manufacturers: [
    {
      id: 1,
      name: 'WoodCo',
      materials: ['Oak Hardwood Flooring'],
      reliability: 'High',
      leadTime: '2-3 weeks'
    },
    {
      id: 2,
      name: 'ColorMax',
      materials: ['Matte White Wall Paint'],
      reliability: 'High',
      leadTime: '1 week'
    }
  ]
};

// Helper function to query the mock database
export const queryDatabase = (query: string): string => {
  const q = query.toLowerCase();
  
  // List all projects
  if (q.includes('list projects')) {
    return mockDatabase.projects.map(p => 
      `${p.name}\n• Client: ${p.client}\n• Type: ${p.type}\n• Status: ${p.status}\n• Materials: ${p.materials.length}`
    ).join('\n\n');
  }

  // List materials for a specific project
  const projectMatch = mockDatabase.projects.find(p => 
    q.includes(p.name.toLowerCase())
  );
  if (projectMatch && (q.includes('materials') || q.includes('used in'))) {
    const materialsList = projectMatch.materials.map(m => 
      `${m.name} (${m.locations.join(', ')}${m.area ? `, ${m.area} sq.ft` : ''}${m.quantity ? `, ${m.quantity} units` : ''})`
    ).join('\n• ');
    return `Materials used in ${projectMatch.name}:\n• ${materialsList}`;
  }

  // Most used material
  if (q.includes('most used') || q.includes('popular')) {
    const mostUsed = mockDatabase.materials.reduce((prev, current) => 
      prev.usage > current.usage ? prev : current
    );
    const projectsList = mostUsed.projects.map(p => 
      `${p.name} (${p.locations.join(', ')})`
    ).join('\n• ');
    return `The most frequently used material is ${mostUsed.name} (used in ${mostUsed.usage} projects).\n\nProjects using this material:\n• ${projectsList}`;
  }

  // Material details
  const materialMatch = mockDatabase.materials.find(m => 
    q.includes(m.name.toLowerCase())
  );
  if (materialMatch) {
    const projectsList = materialMatch.projects.map(p => 
      `${p.name} (${p.locations.join(', ')})`
    ).join('\n• ');
    return `${materialMatch.name} is supplied by ${materialMatch.supplier} and has been used in ${materialMatch.usage} projects.\n\nProjects using this material:\n• ${projectsList}`;
  }

  // Project details
  if (projectMatch) {
    return `${projectMatch.name} is a ${projectMatch.type} project for ${projectMatch.client}, currently ${projectMatch.status}. It uses ${projectMatch.materials.length} materials.\n\nAsk about the materials used in this project!`;
  }

  // Manufacturer details
  const manufacturerMatch = mockDatabase.manufacturers.find(m => 
    q.includes(m.name.toLowerCase())
  );
  if (manufacturerMatch) {
    return `${manufacturerMatch.name} supplies ${manufacturerMatch.materials.join(', ')}. They have ${manufacturerMatch.reliability} reliability with typical lead times of ${manufacturerMatch.leadTime}.`;
  }

  return "I can help you find information about materials, projects, and manufacturers. Try asking:\n• What materials were used in [project name]?\n• Tell me about [material name]\n• Which projects use [material name]?\n• What's the most used material?";
};
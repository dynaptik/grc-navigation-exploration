// Shared Mock Data for GRC Portal Navigation Prototypes

// User Roles and Authentication
export const mockUsers = {
  architect: {
    id: 'user-architect',
    name: 'Sarah Chen',
    role: 'architect',
    permissions: ['view_all', 'edit_requirements', 'approve_assessments'],
    assignedAssets: ['asset-1', 'asset-2', 'asset-3', 'asset-4']
  },
  developer: {
    id: 'user-developer', 
    name: 'Marcus Rodriguez',
    role: 'developer',
    permissions: ['view_assigned', 'submit_assessments'],
    assignedAssets: ['asset-1', 'asset-2']
  },
  manager: {
    id: 'user-manager',
    name: 'Lisa Thompson',
    role: 'manager',
    permissions: ['view_all', 'generate_reports', 'approve_risks'],
    assignedAssets: ['asset-1', 'asset-2', 'asset-3', 'asset-4', 'asset-5']
  }
};

// Asset Portfolio
export const mockAssets = [
  {
    id: 'asset-1',
    name: 'Customer Portal API',
    type: 'api',
    domain: 'financial',
    attributes: {
      technology: ['Node.js', 'PostgreSQL', 'Docker'],
      hosting: 'cloud',
      access: 'public',
      dataClassification: 'confidential'
    },
    complianceScore: 85,
    riskCount: { critical: 0, high: 2, medium: 3, low: 1 },
    lastAssessed: '2024-01-15',
    description: 'REST API serving customer account data and transactions'
  },
  {
    id: 'asset-2',
    name: 'Mobile Banking App',
    type: 'mobile-app',
    domain: 'financial',
    attributes: {
      technology: ['React Native', 'Firebase', 'OAuth2'],
      hosting: 'cloud',
      access: 'public',
      dataClassification: 'restricted'
    },
    complianceScore: 92,
    riskCount: { critical: 0, high: 1, medium: 2, low: 0 },
    lastAssessed: '2024-01-20',
    description: 'Mobile application for customer banking services'
  },
  {
    id: 'asset-3',
    name: 'Internal Analytics Platform',
    type: 'web-app',
    domain: 'enterprise',
    attributes: {
      technology: ['Python', 'Django', 'Apache Spark'],
      hosting: 'hybrid',
      access: 'internal',
      dataClassification: 'internal'
    },
    complianceScore: 78,
    riskCount: { critical: 1, high: 1, medium: 4, low: 2 },
    lastAssessed: '2024-01-10',
    description: 'Business intelligence and analytics dashboard'
  },
  {
    id: 'asset-4',
    name: 'E-commerce Platform',
    type: 'platform',
    domain: 'retail',
    attributes: {
      technology: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
      hosting: 'cloud',
      access: 'public',
      dataClassification: 'confidential'
    },
    complianceScore: 88,
    riskCount: { critical: 0, high: 1, medium: 3, low: 1 },
    lastAssessed: '2024-01-18',
    description: 'Multi-tenant e-commerce platform with payment processing'
  },
  {
    id: 'asset-5',
    name: 'Healthcare Records System',
    type: 'web-app',
    domain: 'healthcare',
    attributes: {
      technology: ['C#', '.NET Core', 'SQL Server'],
      hosting: 'on-premise',
      access: 'restricted',
      dataClassification: 'restricted'
    },
    complianceScore: 95,
    riskCount: { critical: 0, high: 0, medium: 1, low: 0 },
    lastAssessed: '2024-01-22',
    description: 'Electronic health records management system'
  }
];

// Requirements by Domain
export const mockRequirements = {
  security: [
    {
      id: 'sec-001',
      title: 'Multi-Factor Authentication',
      description: 'All public-facing applications must implement multi-factor authentication for user access.',
      domain: 'security',
      category: 'Authentication',
      priority: 'mandatory',
      relevanceScore: 95,
      applicableTechnologies: ['web-app', 'mobile-app', 'api'],
      applicableDomains: ['financial', 'healthcare', 'retail'],
      hostingTypes: ['cloud', 'hybrid', 'on-premise'],
      implementationGuide: 'Implement OAuth2/OpenID Connect with TOTP or SMS-based second factor.',
      validationCriteria: ['MFA enabled for all user accounts', 'Backup authentication methods available'],
      tags: ['authentication', 'compliance', 'iso-27001']
    },
    {
      id: 'sec-002',
      title: 'Data Encryption at Rest',
      description: 'All confidential and restricted data must be encrypted when stored.',
      domain: 'security',
      category: 'Data Protection',
      priority: 'mandatory',
      relevanceScore: 90,
      applicableTechnologies: ['api', 'web-app', 'platform'],
      applicableDomains: ['financial', 'healthcare'],
      hostingTypes: ['cloud', 'on-premise'],
      implementationGuide: 'Use AES-256 encryption for database storage and file systems.',
      validationCriteria: ['Database encryption enabled', 'File system encryption configured'],
      tags: ['encryption', 'data-protection', 'gdpr']
    },
    {
      id: 'sec-003',
      title: 'API Rate Limiting',
      description: 'Public APIs must implement rate limiting to prevent abuse and ensure availability.',
      domain: 'security',
      category: 'API Security',
      priority: 'recommended',
      relevanceScore: 80,
      applicableTechnologies: ['api'],
      applicableDomains: ['financial', 'retail', 'enterprise'],
      hostingTypes: ['cloud', 'hybrid'],
      implementationGuide: 'Implement sliding window rate limiting with appropriate thresholds.',
      validationCriteria: ['Rate limiting configured', 'Monitoring and alerting in place'],
      tags: ['api-security', 'ddos-protection']
    }
  ],
  architecture: [
    {
      id: 'arch-001',
      title: 'Microservices Design Patterns',
      description: 'New platform services should follow microservices architecture patterns for scalability.',
      domain: 'architecture',
      category: 'Design Patterns',
      priority: 'recommended',
      relevanceScore: 85,
      applicableTechnologies: ['platform', 'api'],
      applicableDomains: ['enterprise', 'retail'],
      hostingTypes: ['cloud', 'hybrid'],
      implementationGuide: 'Follow domain-driven design principles with clear service boundaries.',
      validationCriteria: ['Services are independently deployable', 'Clear API contracts defined'],
      tags: ['microservices', 'scalability', 'ddd']
    },
    {
      id: 'arch-002',
      title: 'Event-Driven Architecture',
      description: 'Inter-service communication should use asynchronous event patterns where appropriate.',
      domain: 'architecture',
      category: 'Integration Patterns',
      priority: 'recommended',
      relevanceScore: 75,
      applicableTechnologies: ['platform', 'api'],
      applicableDomains: ['enterprise', 'financial'],
      hostingTypes: ['cloud'],
      implementationGuide: 'Use message brokers (Kafka, RabbitMQ) for event streaming.',
      validationCriteria: ['Event schema registry in place', 'Dead letter queue handling'],
      tags: ['event-driven', 'messaging', 'kafka']
    },
    {
      id: 'arch-003',
      title: 'API First Design',
      description: 'All services must be designed with API-first principles for better integration.',
      domain: 'architecture',
      category: 'API Design',
      priority: 'mandatory',
      relevanceScore: 90,
      applicableTechnologies: ['api', 'platform', 'web-app'],
      applicableDomains: ['enterprise', 'financial', 'retail'],
      hostingTypes: ['cloud', 'hybrid', 'on-premise'],
      implementationGuide: 'Define OpenAPI specifications before implementation begins.',
      validationCriteria: ['OpenAPI spec available', 'API documentation published'],
      tags: ['api-design', 'openapi', 'documentation']
    }
  ],
  quality: [
    {
      id: 'qa-001',
      title: 'Automated Testing Coverage',
      description: 'All applications must maintain minimum 80% code coverage with automated tests.',
      domain: 'quality',
      category: 'Testing',
      priority: 'mandatory',
      relevanceScore: 95,
      applicableTechnologies: ['web-app', 'mobile-app', 'api', 'platform'],
      applicableDomains: ['financial', 'healthcare', 'retail', 'enterprise'],
      hostingTypes: ['cloud', 'hybrid', 'on-premise'],
      implementationGuide: 'Implement unit, integration, and end-to-end test suites.',
      validationCriteria: ['Code coverage >= 80%', 'CI/CD pipeline includes tests'],
      tags: ['testing', 'automation', 'coverage']
    },
    {
      id: 'qa-002',
      title: 'Performance Monitoring',
      description: 'Applications must implement comprehensive performance monitoring and alerting.',
      domain: 'quality',
      category: 'Monitoring',
      priority: 'mandatory',
      relevanceScore: 90,
      applicableTechnologies: ['web-app', 'mobile-app', 'api', 'platform'],
      applicableDomains: ['financial', 'healthcare', 'retail', 'enterprise'],
      hostingTypes: ['cloud', 'hybrid'],
      implementationGuide: 'Use APM tools (DataDog, New Relic) for monitoring and alerting.',
      validationCriteria: ['Response time monitoring', 'Error rate alerting', 'Resource utilization tracking'],
      tags: ['monitoring', 'apm', 'performance']
    },
    {
      id: 'qa-003',
      title: 'Code Quality Gates',
      description: 'All code changes must pass quality gates including static analysis and security scans.',
      domain: 'quality',
      category: 'Code Quality',
      priority: 'mandatory',
      relevanceScore: 85,
      applicableTechnologies: ['web-app', 'mobile-app', 'api', 'platform'],
      applicableDomains: ['financial', 'healthcare', 'retail', 'enterprise'],
      hostingTypes: ['cloud', 'hybrid', 'on-premise'],
      implementationGuide: 'Integrate SonarQube and security scanning tools in CI/CD pipeline.',
      validationCriteria: ['Static analysis passing', 'Security vulnerabilities resolved'],
      tags: ['code-quality', 'static-analysis', 'security-scan']
    }
  ]
};

// IT Capabilities for Capability-Based Navigation
export const mockCapabilities = [
  {
    id: 'cap-api-management',
    name: 'API Management',
    description: 'Designing, implementing, and managing APIs',
    maturityLevel: 3,
    requirements: ['arch-003', 'sec-003', 'qa-001'],
    assets: ['asset-1', 'asset-4'],
    roadmapItems: [
      { id: 'r1', title: 'API Gateway Implementation', status: 'completed', dueDate: '2024-02-01' },
      { id: 'r2', title: 'Rate Limiting Enhancement', status: 'in-progress', dueDate: '2024-03-15' },
      { id: 'r3', title: 'API Analytics Dashboard', status: 'planned', dueDate: '2024-04-30' }
    ]
  },
  {
    id: 'cap-data-processing',
    name: 'Data Processing',
    description: 'ETL, data pipelines, and analytics processing',
    maturityLevel: 2,
    requirements: ['sec-002', 'arch-002', 'qa-002'],
    assets: ['asset-3'],
    roadmapItems: [
      { id: 'r4', title: 'Data Encryption Implementation', status: 'in-progress', dueDate: '2024-02-28' },
      { id: 'r5', title: 'Real-time Processing Pipeline', status: 'planned', dueDate: '2024-05-15' }
    ]
  },
  {
    id: 'cap-mobile-development',
    name: 'Mobile Development',
    description: 'Native and cross-platform mobile applications',
    maturityLevel: 4,
    requirements: ['sec-001', 'qa-001', 'qa-002'],
    assets: ['asset-2'],
    roadmapItems: [
      { id: 'r6', title: 'Biometric Authentication', status: 'completed', dueDate: '2024-01-15' },
      { id: 'r7', title: 'Offline Capability Enhancement', status: 'planned', dueDate: '2024-03-30' }
    ]
  },
  {
    id: 'cap-cloud-infrastructure',
    name: 'Cloud Infrastructure',
    description: 'Cloud-native architecture and deployment',
    maturityLevel: 3,
    requirements: ['arch-001', 'sec-002', 'qa-002'],
    assets: ['asset-1', 'asset-2', 'asset-4'],
    roadmapItems: [
      { id: 'r8', title: 'Multi-region Deployment', status: 'in-progress', dueDate: '2024-04-15' },
      { id: 'r9', title: 'Auto-scaling Implementation', status: 'planned', dueDate: '2024-06-01' }
    ]
  }
];

// Assessment Templates
export const mockAssessments = [
  {
    id: 'assessment-1',
    assetId: 'asset-1',
    title: 'API Security Assessment',
    description: 'Comprehensive security evaluation for Customer Portal API',
    questions: [
      {
        id: 'q1',
        question: 'Is multi-factor authentication implemented for API access?',
        type: 'yes-no',
        required: true,
        answer: 'yes',
        weight: 10
      },
      {
        id: 'q2',
        question: 'What rate limiting strategy is implemented?',
        type: 'multiple-choice',
        required: true,
        options: ['Token bucket', 'Fixed window', 'Sliding window', 'None'],
        answer: 'Sliding window',
        weight: 8
      }
    ],
    progress: { total: 15, completed: 12, percentage: 80 },
    complianceScore: 88,
    status: 'in-progress',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-20',
    assignedTo: ['user-architect', 'user-developer']
  },
  {
    id: 'assessment-2',
    assetId: 'asset-2',
    title: 'Mobile App Quality Assessment',
    description: 'Quality assurance evaluation for Mobile Banking App',
    questions: [],
    progress: { total: 20, completed: 20, percentage: 100 },
    complianceScore: 95,
    status: 'completed',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-18',
    completedAt: '2024-01-18',
    assignedTo: ['user-developer']
  }
];

// Dashboard Metrics
export const mockDashboardMetrics = {
  totalAssets: 5,
  complianceAverage: 87.6,
  openRisks: {
    critical: 1,
    high: 5,
    medium: 13,
    low: 4
  },
  assessmentProgress: {
    notStarted: 2,
    inProgress: 1,
    completed: 2
  },
  trendsData: {
    complianceHistory: [82, 84, 86, 88, 87.6],
    riskTrends: [28, 25, 27, 23, 23],
    assessmentCompletion: [60, 70, 75, 80, 85]
  }
};

// Standards Marketplace Data
export const mockStandardsMarketplace = [
  {
    id: 'std-iso-27001',
    name: 'ISO 27001 Information Security',
    description: 'International standard for information security management systems',
    category: 'Security',
    adoptionRate: 85,
    complexity: 'High',
    implementationTime: '6-12 months',
    requirements: ['sec-001', 'sec-002'],
    rating: 4.6,
    reviews: 127,
    tags: ['security', 'compliance', 'iso'],
    benefits: ['Risk reduction', 'Regulatory compliance', 'Customer trust'],
    prerequisites: ['Security team', 'Management commitment', 'Risk assessment framework']
  },
  {
    id: 'std-openapi',
    name: 'OpenAPI Specification',
    description: 'Standard for REST API documentation and design',
    category: 'Architecture',
    adoptionRate: 92,
    complexity: 'Medium',
    implementationTime: '2-4 weeks',
    requirements: ['arch-003'],
    rating: 4.8,
    reviews: 89,
    tags: ['api', 'documentation', 'standards'],
    benefits: ['Better API design', 'Improved documentation', 'Tool ecosystem'],
    prerequisites: ['API development experience', 'Documentation culture']
  }
];

// Utility Functions
export function getAssetsByUser(userRole) {
  const user = mockUsers[userRole];
  return mockAssets.filter(asset => user.assignedAssets.includes(asset.id));
}

export function getRequirementsForAsset(assetId) {
  const asset = mockAssets.find(a => a.id === assetId);
  if (!asset) return [];
  
  const allRequirements = [...mockRequirements.security, ...mockRequirements.architecture, ...mockRequirements.quality];
  
  return allRequirements.filter(req => {
    const techMatch = req.applicableTechnologies.includes(asset.type);
    const domainMatch = req.applicableDomains.includes(asset.domain);
    const hostingMatch = req.hostingTypes.includes(asset.attributes.hosting);
    
    return techMatch && domainMatch && hostingMatch;
  });
}

export function getRiskLevel(count) {
  if (count.critical > 0) return 'critical';
  if (count.high > 2) return 'high';
  if (count.medium > 5) return 'medium';
  return 'low';
}

export function getDomainColor(domain) {
  const colors = {
    security: '#EF4444',
    quality: '#10B981', 
    architecture: '#3B82F6'
  };
  return colors[domain] || '#6B7280';
}

// Navigation Analytics
export let navigationAnalytics = {
  interactions: [],
  timeSpent: {},
  pathTaken: []
};

export function trackInteraction(action, data) {
  navigationAnalytics.interactions.push({
    timestamp: new Date().toISOString(),
    action,
    data
  });
}

export function trackTimeSpent(section, timeMs) {
  if (!navigationAnalytics.timeSpent[section]) {
    navigationAnalytics.timeSpent[section] = 0;
  }
  navigationAnalytics.timeSpent[section] += timeMs;
}

export function trackNavigation(path) {
  navigationAnalytics.pathTaken.push({
    timestamp: new Date().toISOString(),
    path
  });
}

// Global variable exports for non-module usage
if (typeof window !== 'undefined') {
  window.mockUsers = mockUsers;
  window.mockAssets = mockAssets;
  window.mockRequirements = mockRequirements;
  window.mockCapabilities = mockCapabilities;
  window.mockStandards = mockStandards;
  window.navigationAnalytics = navigationAnalytics;
  window.getAssetsByUser = getAssetsByUser;
  window.getRequirementsForAsset = getRequirementsForAsset;
  window.trackInteraction = trackInteraction;
  window.trackTimeSpent = trackTimeSpent;
  window.trackNavigation = trackNavigation;
}
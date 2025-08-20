// Shared Components for GRC Portal Navigation Prototypes

import { trackInteraction, getDomainColor, getRiskLevel } from './mockData.js';

// Universal Search Component
export class UniversalSearch {
  constructor(container, onSearch = () => {}) {
    this.container = container;
    this.onSearch = onSearch;
    this.isOpen = false;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="relative">
        <div class="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Search requirements, assets, assessments..." 
            class="flex-1 outline-none text-sm text-gray-700"
            id="universal-search-input"
          >
          <div class="ml-2 text-xs text-gray-400 px-2 py-1 bg-gray-100 rounded">
            Ctrl+K
          </div>
        </div>
        <div id="search-results" class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg hidden z-50 max-h-96 overflow-y-auto">
          <!-- Search results will be inserted here -->
        </div>
      </div>
    `;
  }

  bindEvents() {
    const input = this.container.querySelector('#universal-search-input');
    const resultsContainer = this.container.querySelector('#search-results');

    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (query.length > 2) {
        this.showResults(query);
        trackInteraction('search', { query, timestamp: new Date() });
      } else {
        this.hideResults();
      }
    });

    input.addEventListener('focus', () => {
      if (input.value.trim().length > 2) {
        this.showResults(input.value.trim());
      }
    });

    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.hideResults();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        input.focus();
      }
    });
  }

  showResults(query) {
    const resultsContainer = this.container.querySelector('#search-results');
    const mockResults = this.generateMockResults(query);
    
    resultsContainer.innerHTML = mockResults.map(result => `
      <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0" 
           onclick="trackInteraction('search_result_click', { type: '${result.type}', id: '${result.id}' })">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="text-sm font-medium text-gray-900">${result.title}</div>
            <div class="text-xs text-gray-500">${result.description}</div>
          </div>
          <div class="ml-4">
            <span class="px-2 py-1 text-xs rounded-full bg-${result.type === 'requirement' ? 'blue' : result.type === 'asset' ? 'green' : 'purple'}-100 text-${result.type === 'requirement' ? 'blue' : result.type === 'asset' ? 'green' : 'purple'}-800">
              ${result.type}
            </span>
          </div>
        </div>
      </div>
    `).join('');
    
    resultsContainer.classList.remove('hidden');
    this.isOpen = true;
  }

  hideResults() {
    const resultsContainer = this.container.querySelector('#search-results');
    resultsContainer.classList.add('hidden');
    this.isOpen = false;
  }

  generateMockResults(query) {
    const results = [
      { id: 'sec-001', type: 'requirement', title: 'Multi-Factor Authentication', description: 'Security requirement for user authentication' },
      { id: 'asset-1', type: 'asset', title: 'Customer Portal API', description: 'REST API for customer services' },
      { id: 'assessment-1', type: 'assessment', title: 'API Security Assessment', description: 'Security evaluation for Customer Portal' },
      { id: 'qa-001', type: 'requirement', title: 'Automated Testing Coverage', description: 'Quality requirement for test coverage' },
      { id: 'asset-2', type: 'asset', title: 'Mobile Banking App', description: 'Customer-facing mobile application' }
    ];
    
    return results.filter(r => 
      r.title.toLowerCase().includes(query.toLowerCase()) || 
      r.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }
}

// Asset Context Switcher
export class AssetContextSwitcher {
  constructor(container, assets, onAssetChange = () => {}) {
    this.container = container;
    this.assets = assets;
    this.onAssetChange = onAssetChange;
    this.currentAsset = assets[0];
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="relative">
        <button id="asset-switcher-button" class="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <span class="text-sm font-medium">${this.getAssetIcon(this.currentAsset.type)}</span>
            </div>
            <div class="text-left">
              <div class="text-sm font-medium text-gray-900">${this.currentAsset.name}</div>
              <div class="text-xs text-gray-500">${this.currentAsset.type.replace('-', ' ')}</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <div id="asset-dropdown" class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg hidden z-50 max-h-64 overflow-y-auto">
          ${this.assets.map(asset => `
            <div class="asset-option px-4 py-3 hover:bg-gray-50 cursor-pointer ${asset.id === this.currentAsset.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}" 
                 data-asset-id="${asset.id}">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-${asset.id === this.currentAsset.id ? 'blue' : 'gray'}-100 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-sm">${this.getAssetIcon(asset.type)}</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">${asset.name}</div>
                    <div class="text-xs text-gray-500">${asset.type.replace('-', ' ')} • ${asset.domain}</div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="text-xs text-gray-600">${asset.complianceScore}%</div>
                  <div class="w-2 h-2 rounded-full bg-${this.getComplianceColor(asset.complianceScore)}"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    const button = this.container.querySelector('#asset-switcher-button');
    const dropdown = this.container.querySelector('#asset-dropdown');

    button.addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
    });

    this.container.querySelectorAll('.asset-option').forEach(option => {
      option.addEventListener('click', (e) => {
        const assetId = e.currentTarget.dataset.assetId;
        const asset = this.assets.find(a => a.id === assetId);
        if (asset) {
          this.currentAsset = asset;
          this.render();
          this.bindEvents();
          this.onAssetChange(asset);
          trackInteraction('asset_switch', { from: this.currentAsset.id, to: assetId });
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  getAssetIcon(type) {
    const icons = {
      'api': '🔌',
      'web-app': '🌐',
      'mobile-app': '📱',
      'platform': '🏗️'
    };
    return icons[type] || '📦';
  }

  getComplianceColor(score) {
    if (score >= 90) return 'green-500';
    if (score >= 75) return 'yellow-500';
    return 'red-500';
  }

  setCurrentAsset(assetId) {
    const asset = this.assets.find(a => a.id === assetId);
    if (asset) {
      this.currentAsset = asset;
      this.render();
      this.bindEvents();
    }
  }
}

// Role Selector Component
export class RoleSelector {
  constructor(container, roles, currentRole, onRoleChange = () => {}) {
    this.container = container;
    this.roles = roles;
    this.currentRole = currentRole;
    this.onRoleChange = onRoleChange;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="bg-white border border-gray-200 rounded-lg p-1 flex">
        ${this.roles.map(role => `
          <button class="role-button px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            role === this.currentRole 
              ? 'bg-blue-100 text-blue-700 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }" data-role="${role}">
            ${this.getRoleIcon(role)} ${role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        `).join('')}
      </div>
    `;
  }

  bindEvents() {
    this.container.querySelectorAll('.role-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const newRole = e.currentTarget.dataset.role;
        if (newRole !== this.currentRole) {
          this.currentRole = newRole;
          this.render();
          this.bindEvents();
          this.onRoleChange(newRole);
          trackInteraction('role_switch', { from: this.currentRole, to: newRole });
        }
      });
    });
  }

  getRoleIcon(role) {
    const icons = {
      architect: '🏗️',
      developer: '👨‍💻',
      manager: '👨‍💼'
    };
    return icons[role] || '👤';
  }
}

// Risk Indicator Component
export class RiskIndicator {
  static render(riskCount, size = 'md') {
    const level = getRiskLevel(riskCount);
    const total = riskCount.critical + riskCount.high + riskCount.medium + riskCount.low;
    
    const sizeClasses = {
      sm: 'w-4 h-4 text-xs',
      md: 'w-6 h-6 text-sm',
      lg: 'w-8 h-8 text-base'
    };

    const colorClasses = {
      critical: 'bg-red-500 text-white',
      high: 'bg-orange-500 text-white',
      medium: 'bg-yellow-500 text-white',
      low: 'bg-green-500 text-white'
    };

    return `
      <div class="flex items-center space-x-2">
        <div class="${sizeClasses[size]} ${colorClasses[level]} rounded-full flex items-center justify-center font-bold">
          ${total}
        </div>
        <div class="text-xs text-gray-600">
          ${level} risk
        </div>
      </div>
    `;
  }
}

// Requirement Card Component
export class RequirementCard {
  static render(requirement, relevanceScore = 100, compact = false) {
    const domainColor = getDomainColor(requirement.domain);
    
    return `
      <div class="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer"
           onclick="trackInteraction('requirement_click', { id: '${requirement.id}', domain: '${requirement.domain}' })">
        <div class="p-4 ${compact ? 'pb-2' : ''}">
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1">
              <div class="flex items-center mb-1">
                <span class="w-3 h-3 rounded-full mr-2" style="background-color: ${domainColor}"></span>
                <span class="text-xs font-medium text-gray-500 uppercase">${requirement.domain}</span>
                ${requirement.priority === 'mandatory' ? '<span class="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">MANDATORY</span>' : ''}
              </div>
              <h3 class="text-sm font-semibold text-gray-900 mb-1">${requirement.title}</h3>
              <p class="text-xs text-gray-600 ${compact ? 'line-clamp-2' : ''}">${requirement.description}</p>
            </div>
            <div class="ml-3 text-right">
              <div class="text-xs font-medium text-gray-600">${relevanceScore}%</div>
              <div class="text-xs text-gray-400">relevance</div>
            </div>
          </div>
          
          ${!compact ? `
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <div class="flex flex-wrap gap-1">
                ${requirement.tags.slice(0, 3).map(tag => `
                  <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">${tag}</span>
                `).join('')}
              </div>
              <button class="text-blue-600 hover:text-blue-800 text-xs font-medium">
                View Details →
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

// Asset Card Component
export class AssetCard {
  static render(asset, compact = false) {
    return `
      <div class="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer"
           onclick="trackInteraction('asset_click', { id: '${asset.id}', type: '${asset.type}' })">
        <div class="p-4">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span class="text-lg">${this.getAssetIcon(asset.type)}</span>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-900">${asset.name}</h3>
                <p class="text-xs text-gray-500">${asset.type.replace('-', ' ')} • ${asset.domain}</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-900">${asset.complianceScore}%</div>
              <div class="text-xs text-gray-500">compliance</div>
            </div>
          </div>
          
          ${!compact ? `
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <div class="flex items-center space-x-3">
                <div class="text-xs text-gray-600">
                  Risks: <span class="font-medium">${asset.riskCount.critical + asset.riskCount.high + asset.riskCount.medium + asset.riskCount.low}</span>
                </div>
                <div class="text-xs text-gray-600">
                  ${asset.attributes.hosting} • ${asset.attributes.access}
                </div>
              </div>
              ${RiskIndicator.render(asset.riskCount, 'sm')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  static getAssetIcon(type) {
    const icons = {
      'api': '🔌',
      'web-app': '🌐', 
      'mobile-app': '📱',
      'platform': '🏗️'
    };
    return icons[type] || '📦';
  }
}

// Loading Spinner
export class LoadingSpinner {
  static render(size = 'md') {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12'
    };

    return `
      <div class="flex items-center justify-center">
        <div class="${sizeClasses[size]} border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    `;
  }
}

// Toast Notification
export class Toast {
  static show(message, type = 'info', duration = 3000) {
    const toastId = `toast-${Date.now()}`;
    const colorClasses = {
      info: 'bg-blue-500 text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
      error: 'bg-red-500 text-white'
    };

    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${colorClasses[type]}`;
    toast.innerHTML = `
      <div class="flex items-center">
        <span class="mr-2">${message}</span>
        <button onclick="document.getElementById('${toastId}').remove()" class="ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
      toast.style.transform = 'translateX(full)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Analytics Dashboard (for tracking interactions)
export class AnalyticsDashboard {
  static render(analytics) {
    const totalInteractions = analytics.interactions.length;
    const uniqueActions = [...new Set(analytics.interactions.map(i => i.action))].length;
    
    return `
      <div class="bg-gray-50 border-t border-gray-200 p-4 text-xs">
        <div class="flex items-center justify-between text-gray-600">
          <div>Prototype Analytics:</div>
          <div class="flex items-center space-x-4">
            <span>${totalInteractions} interactions</span>
            <span>${uniqueActions} unique actions</span>
            <button onclick="console.log(${JSON.stringify(analytics)})" class="text-blue-600 hover:text-blue-800">
              View Full Data
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Global variable exports for non-module usage
if (typeof window !== 'undefined') {
  window.UniversalSearch = UniversalSearch;
  window.AssetContextSwitcher = AssetContextSwitcher;
  window.RoleSelector = RoleSelector;
  window.RequirementCard = RequirementCard;
  window.AssetCard = AssetCard;
  window.AnalyticsDashboard = AnalyticsDashboard;
}
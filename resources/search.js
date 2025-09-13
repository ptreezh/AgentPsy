// Basic Search Functionality for Resources Page

// Sample resource data for search functionality
const resourcesData = [
    {
        title: "Big Five Personality Assessment Guide",
        category: "Documentation",
        description: "Comprehensive guide to implementing Big Five personality assessments",
        keywords: ["personality", "big five", "assessment", "guide"]
    },
    {
        title: "Cognitive Stability Research Paper",
        category: "Academic Papers",
        description: "Research paper on cognitive stability in AI systems",
        keywords: ["cognitive", "stability", "research", "paper"]
    },
    {
        title: "API Integration Tutorial",
        category: "Training & Tutorials",
        description: "Step-by-step tutorial for integrating our API",
        keywords: ["api", "integration", "tutorial", "developer"]
    },
    {
        title: "Cognitive Trap Detection Methods",
        category: "Documentation",
        description: "Methods for detecting cognitive traps in AI systems",
        keywords: ["cognitive", "trap", "detection", "methods"]
    },
    {
        title: "DASS Scale Implementation",
        category: "Documentation",
        description: "Implementation guide for DASS scale in AI assessment",
        keywords: ["dass", "scale", "implementation", "assessment"]
    }
];

// Search function
function searchResources() {
    const searchInput = document.getElementById('resourceSearch');
    const searchResults = document.getElementById('searchResults');
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.length === 0) {
        searchResults.innerHTML = '';
        return;
    }
    
    const filteredResources = resourcesData.filter(resource => {
        // Check title
        if (resource.title.toLowerCase().includes(searchTerm)) return true;
        
        // Check description
        if (resource.description.toLowerCase().includes(searchTerm)) return true;
        
        // Check keywords
        if (resource.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))) return true;
        
        // Check category
        if (resource.category.toLowerCase().includes(searchTerm)) return true;
        
        return false;
    });
    
    displaySearchResults(filteredResources);
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="no-results">No resources found matching your search.</p>';
        return;
    }
    
    let html = '<div class="search-results-grid">';
    
    results.forEach(resource => {
        html += `
            <div class="search-result-item">
                <div class="result-category">${resource.category}</div>
                <h3 class="result-title">${resource.title}</h3>
                <p class="result-description">${resource.description}</p>
                <div class="result-keywords">
                    ${resource.keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('')}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    searchResults.innerHTML = html;
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for search functionality
    const searchInput = document.getElementById('resourceSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchResources();
            }
        });
    }
    
    // Add some visual feedback
    const searchButton = document.querySelector('button[onclick="searchResources()"]');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});
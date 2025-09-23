#!/usr/bin/env python3
"""
Comprehensive Link Analysis Tool for AgentPsy Website
Extracts and analyzes all links from HTML files
"""

import os
import re
import urllib.parse
from pathlib import Path
from typing import Dict, List, Set, Tuple
import json

class LinkAnalyzer:
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.links_data = {}
        self.broken_links = []
        self.external_links = []
        self.internal_links = []
        self.anchor_links = []
        self.email_links = []
        self.tel_links = []
        self.resource_links = []
        
        # Link patterns
        self.href_pattern = re.compile(r'href\s*=\s*["\']([^"\']+)["\']', re.IGNORECASE)
        self.src_pattern = re.compile(r'src\s*=\s*["\']([^"\']+)["\']', re.IGNORECASE)
        self.action_pattern = re.compile(r'action\s*=\s*["\']([^"\']+)["\']', re.IGNORECASE)
        
    def extract_links_from_file(self, file_path: Path) -> Dict:
        """Extract all links from a single HTML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            links = {
                'hrefs': [],
                'srcs': [],
                'actions': [],
                'file_path': str(file_path.relative_to(self.base_path))
            }
            
            # Extract href links
            href_matches = self.href_pattern.findall(content)
            links['hrefs'] = [link.strip() for link in href_matches if link.strip()]
            
            # Extract src links
            src_matches = self.src_pattern.findall(content)
            links['srcs'] = [link.strip() for link in src_matches if link.strip()]
            
            # Extract action links
            action_matches = self.action_pattern.findall(content)
            links['actions'] = [link.strip() for link in action_matches if link.strip()]
            
            return links
            
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return {'hrefs': [], 'srcs': [], 'actions': [], 'file_path': str(file_path.relative_to(self.base_path))}
    
    def categorize_link(self, link: str, source_file: str) -> Dict:
        """Categorize a link by type and check its validity"""
        link_info = {
            'url': link,
            'source_file': source_file,
            'type': 'unknown',
            'status': 'unknown',
            'target_path': None,
            'issues': []
        }
        
        # Skip empty links
        if not link or link.strip() == '#':
            return link_info
        
        # Remove leading/trailing whitespace
        link = link.strip()
        
        # Categorize by protocol/prefix
        if link.startswith('mailto:'):
            link_info['type'] = 'email'
            self.email_links.append(link_info)
            
        elif link.startswith('tel:'):
            link_info['type'] = 'telephone'
            self.tel_links.append(link_info)
            
        elif link.startswith(('http://', 'https://', '//')):
            link_info['type'] = 'external'
            self.external_links.append(link_info)
            
        elif link.startswith('#'):
            link_info['type'] = 'anchor'
            self.anchor_links.append(link_info)
            
        elif link.startswith(('./', '../')) or not any(link.startswith(proto) for proto in ['http://', 'https://', '//', '#', 'mailto:', 'tel:']):
            link_info['type'] = 'internal'
            self.internal_links.append(link_info)
            
            # Resolve relative path
            try:
                source_dir = Path(source_file).parent
                if link.startswith('./'):
                    target_path = source_dir / link[2:]
                elif link.startswith('../'):
                    # Handle multiple levels of ../
                    target_path = source_dir
                    path_parts = link.split('/')
                    for part in path_parts:
                        if part == '..':
                            target_path = target_path.parent
                        elif part and part != '.':
                            target_path = target_path / part
                else:
                    # Relative path without ./
                    target_path = source_dir / link
                
                # Make path relative to base directory
                target_path = self.base_path / target_path
                link_info['target_path'] = str(target_path.relative_to(self.base_path))
                
                # Check if target exists
                if target_path.exists():
                    link_info['status'] = 'valid'
                else:
                    link_info['status'] = 'broken'
                    link_info['issues'].append(f'Target file does not exist: {link_info["target_path"]}')
                    self.broken_links.append(link_info)
                    
            except Exception as e:
                link_info['issues'].append(f'Error resolving path: {e}')
                link_info['status'] = 'error'
                self.broken_links.append(link_info)
        
        else:
            link_info['type'] = 'unknown'
            link_info['issues'].append(f'Unrecognized link format: {link}')
        
        return link_info
    
    def analyze_all_files(self):
        """Analyze all HTML files in the directory"""
        html_files = list(self.base_path.rglob('*.html'))
        
        print(f"Found {len(html_files)} HTML files to analyze...")
        
        for html_file in html_files:
            print(f"Analyzing: {html_file.relative_to(self.base_path)}")
            
            # Extract links from file
            file_links = self.extract_links_from_file(html_file)
            self.links_data[str(html_file.relative_to(self.base_path))] = file_links
            
            # Categorize each link
            source_file = str(html_file.relative_to(self.base_path))
            
            for href in file_links['hrefs']:
                link_info = self.categorize_link(href, source_file)
                
            for src in file_links['srcs']:
                link_info = self.categorize_link(src, source_file)
                if link_info['type'] in ['internal', 'external']:
                    self.resource_links.append(link_info)
                    
            for action in file_links['actions']:
                link_info = self.categorize_link(action, source_file)
    
    def generate_report(self) -> str:
        """Generate a comprehensive report"""
        total_links = len(self.internal_links) + len(self.external_links) + len(self.anchor_links) + len(self.email_links) + len(self.tel_links)
        
        report = f"""
# AgentPsy Website Link Analysis Report

## Summary Statistics

- **Total HTML Files Analyzed**: {len(self.links_data)}
- **Total Links Found**: {total_links}
  - Internal Links: {len(self.internal_links)}
  - External Links: {len(self.external_links)}
  - Anchor Links: {len(self.anchor_links)}
  - Email Links: {len(self.email_links)}
  - Telephone Links: {len(self.tel_links)}
  - Resource Links (CSS/JS/Images): {len(self.resource_links)}
- **Broken Links**: {len(self.broken_links)}

## Broken Links Analysis

"""
        
        if self.broken_links:
            for broken_link in self.broken_links:
                report += f"""
### Broken Link: {broken_link['url']}
- **Source File**: {broken_link['source_file']}
- **Type**: {broken_link['type']}
- **Target Path**: {broken_link.get('target_path', 'N/A')}
- **Issues**: {', '.join(broken_link['issues'])}
"""
        else:
            report += "No broken internal links found!\n"
        
        report += f"""

## External Links Analysis

Found {len(self.external_links)} external links:

"""
        
        # Group external links by domain
        external_by_domain = {}
        for ext_link in self.external_links:
            try:
                domain = ext_link['url'].split('/')[2] if '/' in ext_link['url'] else 'unknown'
                if domain not in external_by_domain:
                    external_by_domain[domain] = []
                external_by_domain[domain].append(ext_link)
            except:
                if 'unknown' not in external_by_domain:
                    external_by_domain['unknown'] = []
                external_by_domain['unknown'].append(ext_link)
        
        for domain, links in sorted(external_by_domain.items()):
            report += f"### {domain} ({len(links)} links)\n"
            for link in links[:5]:  # Show first 5 links per domain
                report += f"- {link['url']} (from {link['source_file']})\n"
            if len(links) > 5:
                report += f"- ... and {len(links) - 5} more links\n"
            report += "\n"
        
        report += f"""
## Internal Links Analysis

Found {len(self.internal_links)} internal links:

"""
        
        # Group internal links by directory
        internal_by_dir = {}
        for int_link in self.internal_links:
            source_dir = Path(int_link['source_file']).parent
            if str(source_dir) not in internal_by_dir:
                internal_by_dir[str(source_dir)] = []
            internal_by_dir[str(source_dir)].append(int_link)
        
        for directory, links in sorted(internal_by_dir.items()):
            valid_count = sum(1 for link in links if link['status'] == 'valid')
            report += f"### Directory: {directory} ({len(links)} links, {valid_count} valid)\n"
            for link in links[:3]:  # Show first 3 links per directory
                status_icon = "✓" if link['status'] == 'valid' else "✗"
                report += f"- {status_icon} {link['url']} -> {link.get('target_path', 'N/A')} (from {link['source_file']})\n"
            if len(links) > 3:
                report += f"- ... and {len(links) - 3} more links\n"
            report += "\n"
        
        report += f"""
## Recommendations

1. **Fix Broken Internal Links**: {len(self.broken_links)} internal links need to be fixed
2. **Review External Links**: Consider checking external links for availability
3. **Standardize Link Formats**: Ensure consistent use of relative vs absolute paths
4. **Add Link Validation**: Implement automated link checking in build process

## Files with Most Links

"""
        
        # Count links per file
        links_per_file = {}
        for filename, file_data in self.links_data.items():
            total_file_links = len(file_data['hrefs']) + len(file_data['srcs']) + len(file_data['actions'])
            links_per_file[filename] = total_file_links
        
        # Sort by link count
        sorted_files = sorted(links_per_file.items(), key=lambda x: x[1], reverse=True)
        
        for filename, count in sorted_files[:10]:
            report += f"- {filename}: {count} links\n"
        
        return report
    
    def save_detailed_results(self, output_file: str):
        """Save detailed results to JSON file"""
        results = {
            'summary': {
                'total_files': len(self.links_data),
                'total_internal_links': len(self.internal_links),
                'total_external_links': len(self.external_links),
                'total_anchor_links': len(self.anchor_links),
                'total_email_links': len(self.email_links),
                'total_tel_links': len(self.tel_links),
                'total_resource_links': len(self.resource_links),
                'broken_links_count': len(self.broken_links)
            },
            'broken_links': self.broken_links,
            'external_links': self.external_links,
            'internal_links': self.internal_links,
            'anchor_links': self.anchor_links,
            'email_links': self.email_links,
            'tel_links': self.tel_links,
            'resource_links': self.resource_links,
            'files_data': self.links_data
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

def main():
    # Set base directory
    base_dir = r"D:\AIDevelop\webplan\webdeploy\v1"
    
    # Create analyzer
    analyzer = LinkAnalyzer(base_dir)
    
    # Analyze all files
    print("Starting comprehensive link analysis...")
    analyzer.analyze_all_files()
    
    # Generate report
    report = analyzer.generate_report()
    
    # Save report
    report_file = os.path.join(base_dir, 'link_analysis_report.md')
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    # Save detailed JSON results
    json_file = os.path.join(base_dir, 'link_analysis_detailed.json')
    analyzer.save_detailed_results(json_file)
    
    print(f"Analysis complete!")
    print(f"Report saved to: {report_file}")
    print(f"Detailed results saved to: {json_file}")
    
    # Print summary
    print(f"\nSummary:")
    print(f"- Total files analyzed: {len(analyzer.links_data)}")
    print(f"- Total links found: {len(analyzer.internal_links) + len(analyzer.external_links) + len(analyzer.anchor_links) + len(analyzer.email_links) + len(analyzer.tel_links)}")
    print(f"- Broken links: {len(analyzer.broken_links)}")
    print(f"- External links: {len(analyzer.external_links)}")

if __name__ == "__main__":
    main()
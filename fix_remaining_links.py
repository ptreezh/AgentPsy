#!/usr/bin/env python3
"""
Fix remaining link issues in AgentPsy Website
"""

import os
import re
from pathlib import Path

def fix_remaining_css_js_links():
    """Fix remaining CSS and JS link issues"""
    
    # Fix industries.html
    industries_file = Path(r"D:\AIDevelop\webplan\webdeploy\v1\industries.html")
    if industries_file.exists():
        with open(industries_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix CSS and JS links
        content = content.replace('href="industries.css"', 'href="industries/industries.css"')
        content = content.replace('src="industries.js"', 'src="industries/industries.js"')
        
        if content != original_content:
            with open(industries_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed industries links in {industries_file}")
    
    # Fix products.html
    products_file = Path(r"D:\AIDevelop\webplan\webdeploy\v1\products.html")
    if products_file.exists():
        with open(products_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix CSS and JS links
        content = content.replace('href="products.css"', 'href="products/products.css"')
        content = content.replace('src="products.js"', 'src="products/products.js"')
        
        if content != original_content:
            with open(products_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed products links in {products_file}")
    
    # Fix resources.html and temp_resources_index.html
    resource_files = [
        Path(r"D:\AIDevelop\webplan\webdeploy\v1\resources.html"),
        Path(r"D:\AIDevelop\webplan\webdeploy\v1\temp_resources_index.html")
    ]
    
    for resource_file in resource_files:
        if resource_file.exists():
            with open(resource_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Fix CSS link
            content = content.replace('href="search-styles.css"', 'href="resources/search-styles.css"')
            
            if content != original_content:
                with open(resource_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed resource links in {resource_file}")

def main():
    print("Fixing remaining link issues...")
    fix_remaining_css_js_links()
    print("Remaining fixes completed!")

if __name__ == "__main__":
    main()
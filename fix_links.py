#!/usr/bin/env python3
"""
Link Fix Script for AgentPsy Website
Automatically fixes identified link issues
"""

import os
import re
from pathlib import Path

def fix_assessment_links():
    """Fix assessment page links in assessment.html"""
    assessment_file = Path(r"D:\AIDevelop\webplan\webdeploy\v1\assessment.html")
    
    if not assessment_file.exists():
        print(f"File not found: {assessment_file}")
        return
    
    with open(assessment_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix broken assessment links
    fixes = [
        ('href="big-five.html"', 'href="assessment/big-five.html"'),
        ('href="cognitive-stability.html"', 'href="assessment/cognitive-stability.html"'),
        ('href="cognitive-trap.html"', 'href="assessment/cognitive-trap.html"'),
    ]
    
    original_content = content
    for old, new in fixes:
        content = content.replace(old, new)
    
    if content != original_content:
        with open(assessment_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed assessment links in {assessment_file}")
    else:
        print("No assessment links needed fixing")

def fix_contact_links():
    """Fix contact form links in application pages"""
    app_files = [
        r"D:\AIDevelop\webplan\webdeploy\v1\applications\education.html",
        r"D:\AIDevelop\webplan\webdeploy\v1\applications\emotional-support.html",
        r"D:\AIDevelop\webplan\webdeploy\v1\applications\finance.html",
        r"D:\AIDevelop\webplan\webdeploy\v1\applications\healthcare.html",
        r"D:\AIDevelop\webplan\webdeploy\v1\applications\legal.html",
        r"D:\AIDevelop\webplan\webdeploy\v1\applications\team-collaboration.html"
    ]
    
    for file_path in app_files:
        if not Path(file_path).exists():
            print(f"File not found: {file_path}")
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix contact links with query parameters
        content = re.sub(r'href="\.\./contact\.html\?[^"]*"', 'href="../contact.html"', content)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed contact links in {file_path}")
        else:
            print(f"No contact links needed fixing in {Path(file_path).name}")

def fix_cookie_links():
    """Fix cookie page links"""
    files_to_fix = [
        r"D:\AIDevelop\webplan\webdeploy\v1\current_website.html",
        r"D:\AIDevelop\webplan\webdeploy\v1\website_content.html"
    ]
    
    for file_path in files_to_fix:
        if not Path(file_path).exists():
            print(f"File not found: {file_path}")
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remove cookie links or replace with privacy policy
        content = content.replace('href="cookies.html"', 'href="privacy.html"')
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed cookie links in {file_path}")
        else:
            print(f"No cookie links needed fixing in {Path(file_path).name}")

def create_missing_asset_files():
    """Create placeholder files for missing assets"""
    # Create missing CSS and JS files
    missing_files = [
        r"D:\AIDevelop\webplan\webdeploy\v1\industries\industries.css",
        r"D:\AIDevelop\webplan\webdeploy\v1\industries\industries.js",
        r"D:\AIDevelop\webplan\webdeploy\v1\products\products.css",
        r"D:\AIDevelop\webplan\webdeploy\v1\products\products.js",
        r"D:\AIDevelop\webplan\webdeploy\v1\resources\search-styles.css"
    ]
    
    for file_path in missing_files:
        path = Path(file_path)
        if not path.exists():
            path.parent.mkdir(parents=True, exist_ok=True)
            
            if file_path.endswith('.css'):
                content = f"/* {path.name} - Placeholder file */\n"
            else:
                content = f"// {path.name} - Placeholder file\n"
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Created placeholder file: {file_path}")
        else:
            print(f"File already exists: {file_path}")

def main():
    print("Starting automatic link fixes...")
    
    # Apply fixes
    fix_assessment_links()
    fix_contact_links()
    fix_cookie_links()
    create_missing_asset_files()
    
    print("\nAutomatic fixes completed!")
    print("Please review the changes and run the link analysis again to verify fixes.")

if __name__ == "__main__":
    main()
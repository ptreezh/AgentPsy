import os
import re

# 定义要替换的中文术语映射
chinese_to_english = {
    '对抗': '',
    '抗干扰能力': 'interference resistance',
    '认知陷阱对抗': 'Cognitive Trap',
    'Program Trap对抗': 'Program Trap',
    'trap对抗': 'trap'
}

def replace_chinese_terms_in_file(file_path):
    """在单个文件中替换中文术语"""
    try:
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 记录是否进行了替换
        original_content = content
        replacements_made = []
        
        # 执行替换
        for chinese_term, english_term in chinese_to_english.items():
            if chinese_term in content:
                content = content.replace(chinese_term, english_term)
                replacements_made.append(f"'{chinese_term}' -> '{english_term}'")
        
        # 如果有替换发生，写回文件
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"Updated {file_path}:")
            for replacement in replacements_made:
                print(f"  {replacement}")
            return True
        else:
            print(f"No changes needed in {file_path}")
            return False
            
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return False

def process_directory(directory_path):
    """递归处理目录中的所有HTML文件"""
    files_updated = 0
    total_files = 0
    
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.html'):
                total_files += 1
                file_path = os.path.join(root, file)
                if replace_chinese_terms_in_file(file_path):
                    files_updated += 1
    
    print(f"\nProcessing complete!")
    print(f"Total HTML files processed: {total_files}")
    print(f"Files updated: {files_updated}")

if __name__ == "__main__":
    # 处理网站目录
    website_directory = "."
    print(f"Processing website directory: {os.path.abspath(website_directory)}")
    process_directory(website_directory)
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import subprocess
from pathlib import Path

def check_pandoc():
    """检查是否安装了 pandoc"""
    try:
        subprocess.run(['pandoc', '--version'], 
                      capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def check_xelatex():
    """检查是否安装了 xelatex"""
    try:
        subprocess.run(['xelatex', '--version'], 
                      capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def convert_md_to_docx(md_file, docx_file):
    """将 Markdown 文件转换为 DOCX 格式"""
    try:
        # 使用 pandoc 转换
        cmd = [
            'pandoc',
            str(md_file),
            '-o', str(docx_file),
            '--reference-doc=template.docx' if Path('template.docx').exists() else '',
            '--toc',  # 生成目录
            '--toc-depth=2'  # 目录深度
        ]
        # 移除空字符串参数
        cmd = [arg for arg in cmd if arg]
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"成功转换 {md_file} 为 {docx_file}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"转换 {md_file} 时出错: {e}")
        print(f"错误输出: {e.stderr}")
        return False
    except FileNotFoundError:
        print("错误: 未找到 pandoc 命令，请先安装 pandoc")
        return False

def convert_md_to_pdf(md_file, pdf_file):
    """将 Markdown 文件转换为 PDF 格式"""
    # 检查 xelatex 是否安装
    if not check_xelatex():
        print(f"错误: 未安装 xelatex，无法转换 {md_file} 为 PDF")
        print("请安装 TeX Live 或 MiKTeX 以获得 xelatex 支持")
        return False
    
    try:
        # 使用 pandoc 转换
        cmd = [
            'pandoc',
            str(md_file),
            '-o', str(pdf_file),
            '--pdf-engine=xelatex',  # 使用 xelatex 引擎支持中文
            '-V', 'CJKmainfont=SimSun',  # 设置中文字体
            '-V', 'mainfont=Arial',  # 设置西文字体
            '--toc',  # 生成目录
            '--toc-depth=2'  # 目录深度
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"成功转换 {md_file} 为 {pdf_file}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"转换 {md_file} 时出错: {e}")
        print(f"错误输出: {e.stderr}")
        return False
    except FileNotFoundError:
        print("错误: 未找到 pandoc 命令，请先安装 pandoc")
        return False

def main():
    # 检查 pandoc 是否安装
    if not check_pandoc():
        print("错误: 未安装 pandoc，请先安装 pandoc")
        print("安装方法:")
        print("  Windows: choco install pandoc 或从 https://pandoc.org/installing.html 下载安装")
        print("  macOS: brew install pandoc")
        print("  Linux: sudo apt-get install pandoc")
        return 1
    
    # 获取当前目录
    current_dir = Path(__file__).parent
    print(f"当前工作目录: {current_dir}")
    
    # 查找所有 MD 文件
    md_files = list(current_dir.glob("*.md"))
    print(f"找到 {len(md_files)} 个 Markdown 文件")
    
    success_count = 0
    for md_file in md_files:
        print(f"\n处理文件: {md_file.name}")
        
        # 生成 DOCX 文件名
        docx_file = md_file.with_suffix('.docx')
        
        # 生成 PDF 文件名
        pdf_file = md_file.with_suffix('.pdf')
        
        # 转换为 DOCX
        if convert_md_to_docx(md_file, docx_file):
            success_count += 1
        
        # 转换为 PDF
        if convert_md_to_pdf(md_file, pdf_file):
            success_count += 1
    
    print(f"\n完成处理 {len(md_files)} 个文件，成功生成 {success_count} 个文档")
    return 0

if __name__ == "__main__":
    sys.exit(main())
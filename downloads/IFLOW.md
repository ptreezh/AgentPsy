# IFLOW.md - Portable PsyAgent 技术白皮书目录上下文

## 目录概述

此目录包含 Portable PsyAgent 技术白皮书的各种格式文件，以及相关的转换工具和说明文档。该白皮书详细阐述了AI人格测评的科学方法论与应用。

## 项目类型

这是一个非代码项目，主要用于存储和分发 Portable PsyAgent 技术白皮书及相关文档。

## 目录结构

```
D:\AIDevelop\webplan\webdeploy\v1\downloads\
├───format_guide.txt          # 技术白皮书格式和转换说明
├───generate_documents.py     # 用于将 Markdown 转换为 DOCX 和 PDF 的 Python 脚本
├───how_to_convert.txt        # 如何将 Markdown 格式转换为 PDF 和 Word 格式的说明
├───quick_start_guide_en.md   # 英文快速入门指南 (Markdown)
├───quick_start_guide.md      # 中文快速入门指南 (Markdown)
├───README.md                 # 目录说明文件
├───tech_whitepaper_cn.docx   # 中文版技术白皮书 (Word)
├───tech_whitepaper_cn.md     # 中文版技术白皮书 (Markdown)
├───tech_whitepaper_cn.pdf    # 中文版技术白皮书 (PDF)
├───tech_whitepaper_cn.txt    # 中文版技术白皮书 (文本)
├───tech_whitepaper_en.docx   # 英文版技术白皮书 (Word)
├───tech_whitepaper_en.md     # 英文版技术白皮书 (Markdown)
├───tech_whitepaper_en.pdf    # 英文版技术白皮书 (PDF)
├───tech_whitepaper_en.txt    # 英文版技术白皮书 (文本)
├───user_manual_en.md         # 英文用户手册 (Markdown)
└───user_manual.md            # 中文用户手册 (Markdown)
```

## 关键文件说明

### 核心文档

1. `tech_whitepaper_cn.md` 和 `tech_whitepaper_en.md` - 技术白皮书的 Markdown 格式，是内容最完整的版本，包含了关于 AI 人格测评的科学方法论、问卷设计、评估设计、多维测试验证和行业应用意义等详细内容。

2. `quick_start_guide.md` 和 `quick_start_guide_en.md` - 快速入门指南，提供了使用 Portable PsyAgent 的基本步骤。

3. `user_manual.md` 和 `user_manual_en.md` - 用户手册，详细说明了系统的使用方法。

### 转换工具和说明

1. `generate_documents.py` - 一个 Python 脚本，使用 Pandoc 工具将 Markdown 文件批量转换为 DOCX 和 PDF 格式。

2. `how_to_convert.txt` 和 `format_guide.txt` - 提供了如何将 Markdown 格式转换为其他格式的详细说明。

## 使用说明

1. **阅读文档**: 可直接使用文本编辑器或 Markdown 阅读器打开 `.md` 和 `.txt` 文件。

2. **文档转换**: 
   - 使用 `generate_documents.py` 脚本可以自动将所有 Markdown 文件转换为 DOCX 和 PDF 格式（需要预先安装 Pandoc）。
   - 也可根据 `how_to_convert.txt` 和 `format_guide.txt` 中的说明手动使用 Pandoc 或其他工具进行转换。

3. **格式选择**:
   - `.txt` 格式适用于直接阅读，兼容性最好。
   - `.md` 格式保持了文档结构，适合编辑和在线查看。
   - `.pdf` 格式格式稳定，适合打印和正式发布。
   - `.docx` 格式便于协作和修改。

## 开发与维护

此目录中的文档由项目团队维护，当技术白皮书内容更新时，会同步更新各种格式的文件。推荐使用 Markdown 格式作为源文件，然后通过自动化脚本或工具转换为其他格式。
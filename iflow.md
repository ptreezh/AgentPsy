# iFlow 工作状态记录

## 当前项目状态
- 正在实现多用户自定义虚拟角色聊天功能
- 已完成角色数据隔离和用户权限控制
- 正在实现角色聊天会话的多用户隔离机制
- 项目基于Next.js 15 + TypeScript + Prisma + SQLite架构
- 支持JWT认证和本地LLM集成

## 本地大模型测试配置
- 模型名称: gemma3:latest
- 测试题库文件: test_files/agent-big-five-50-complete2.json (60题完整版)
- 测试角色文件目录: llm_assessment/roles/
- 角色列表: a1-a9, b1-b9 共18个角色
- 调用格式: python llm_assessment/run_assessment_unified.py --model_name gemma3:latest --test_file test_files/agent-big-five-50-complete2.json --role_name a1
- 注意: 永远不要用 dummy-model 运行测评，它是一个测试模型，无法生成有效的测评结果

## 批量评估分析调用流程
1. 格式转换
2. 报告精简
3. 分段式评分（多个评估器并行）
4. 汇总分析
- 每个步骤都保存中间结果
- 支持多评估器对比分析

## 工作规范和纪律要求
- 任何工作都必须在log下记录工作日志
- 任何工作都必须文档先行，先形成文档，再执行
- 开发和调试工作，必须先制订完整的计划，核查计划的可行性和每一个任务的上下文是否清晰是否完全支持
- 否则进入研究模式，对不确定的信息进行研究分析，提出不同的方案，并对方案的置信度进行评估后让用户决策
- 此规范已记录进iflow.md文档作为强制纪律实施

## 环境相关注意事项
- python 在windows终端下默认编码方式为 unicode
- 在Windows环境下使用Git时，如果遇到双引号导致的提交问题，可以使用 `echo "commit message" | git commit --file=-` 方式来提交更改
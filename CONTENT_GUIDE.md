# 案例内容编写指南

本文件说明如何新增或迁移 Icepak 案例。字段细节以 [case-schema.md](./content/case-schema.md) 为准，示例结构以 [case-template.md](./content/case-template.md) 为准。

## 新增案例流程

1. 从官方 Markdown 和配套资料确认案例标题、章节和版本。
2. 在 `content/cases/` 创建 Markdown 内容源。
3. 按统一字段整理学习目标、流程、步骤和验证方法。
4. 创建同名 JSON 文件供通用页面使用。
5. 在 `content/cases/index.json` 登记首页元数据。
6. 使用 `case.html?id=<案例ID>` 检查渲染结果。
7. 检查图片、来源标签和版本说明。

## ID 规则

使用小写、连字符和稳定的语义名称：

```text
chapter-10-thermal-interface
```

JSON 文件名必须为：

```text
chapter-10-thermal-interface.json
```

## 来源标签

| 标签 | 用法 |
|---|---|
| `official` | 官方文档直接内容或官方结果 |
| `translated` | 翻译、整理或改写 |
| `explained` | 教学解释 |
| `inferred` | 工程逻辑推导 |
| `exercise` | 网站设计的练习 |
| `to-verify` | 尚未在实际软件中验证 |
| `learner-observation` | 学习者实际操作观察 |

教学解释、推导和练习答案不得伪装成官方结论。

## 步骤内容要求

每个步骤至少说明：

- 操作目标
- 操作内容
- 背后逻辑
- 验证方法
- 内容来源

推荐进一步补充：

- 前置条件
- 关键参数
- 前后关系
- 常见问题
- 配图
- 复现问题与答案

## 结果记录要求

必须区分：

- 官方参考值
- 当前软件版本下的实际值
- 学习者观察
- 学习者结论

如果没有实际复现，不要写成“已验证”或“最终结果”。

## 图片和文件

- 图片路径使用相对于项目根目录的路径。
- 保留图片原始文件名，避免重复复制。
- 每张图片写明图号、标题和来源。
- 不删除现有模型或压缩包。
- 文件统一使用 UTF-8 编码。

## 状态建议

- `draft`：内容仍在整理。
- `partially-verified`：部分操作或结果已检查。
- `verified`：在指定版本和环境中完成验证。
- `published`：已完成审核并适合正式发布。

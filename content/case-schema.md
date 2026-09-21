# Icepak 案例内容 Schema

本文件定义所有案例 Markdown 的统一字段和内容来源规则。网页、索引和后续导入工具应优先依赖这些字段。

## 1. Front matter 字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | 是 | 全局唯一标识，建议使用 `chapter-x-short-name` |
| `title` | 是 | 官方英文标题 |
| `title_zh` | 是 | 中文学习标题 |
| `source` | 是 | 官方文档名称、章节和版本 |
| `version` | 是 | 案例来源版本，例如 `2022 R1` |
| `status` | 是 | `draft`、`translated`、`partially-verified`、`verified`、`published`、`needs-review` |
| `difficulty` | 是 | `beginner`、`intermediate` 或 `advanced` |
| `estimated_time` | 是 | 预计学习时间 |
| `tags` | 是 | 案例知识点数组 |
| `case_type` | 是 | 见 `case-types.md` |
| `version_note` | 否 | 软件版本差异提醒 |

## 2. 内容来源标签

- `official`：官方文档直接内容或官方结果
- `translated`：官方内容的翻译、整理或改写
- `explained`：基于官方内容的教学解释
- `inferred`：工程逻辑推导，非官方原文
- `exercise`：网站自行设计的练习
- `to-verify`：尚未通过实际软件验证
- `learner-observation`：学习者实际操作记录

页面不得把 `explained`、`inferred` 或 `exercise` 内容显示成官方原文。

## 3. 必备内容章节

每个案例至少应包含：

1. 案例定位
2. 学习目标
3. 前置知识
4. 文件准备
5. 学习流程总览
6. 一个或多个操作步骤
7. 结果与检查
8. 常见问题排查
9. 复现任务及可展开答案
10. 迁移练习
11. 来源与版本说明

## 4. 步骤必备字段

每个步骤应说明：

- 学习目标
- 前置条件
- 官方操作
- 关键参数
- 背后逻辑
- 前后关系
- 验证方法
- 常见问题
- 配图及图片来源
- 复现问题及答案

若某字段不适用，应填写“本案例不适用”，不能静默省略。

## 5. 结果记录字段

案例可使用统一记录键保存：

- `software-version`
- `experiment-notes`
- `actual-*`
- `observation-*`
- `conclusion-*`

记录仅代表学习者当前模型和软件环境，不应自动解释为官方结论。

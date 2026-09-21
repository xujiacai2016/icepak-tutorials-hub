# 项目状态与交接记录

更新时间：2026-09-21

## 当前版本

- Git 分支：`main`
- GitHub：`https://github.com/xujiacai2016/icepak-tutorials-hub`
- 当前基线提交：`f952dd6`
- 项目形式：静态 HTML/CSS/JavaScript
- 本地记录：浏览器 `localStorage`

## 已完成

- 创建产品需求文档。
- 整理案例 Markdown 规范、模板和案例类型。
- 保留完整旧版 Chapter 8 页面：`chapter-8.html`。
- 保留旧版 Chapter 9 页面：`chapter-9.html`。
- 创建通用页面：`case.html`。
- 创建 JSON 案例渲染器：`assets/case-renderer.js`。
- 创建案例首页：`index.html`。
- 创建首页注册表渲染器：`assets/case-index.js`。
- 使用 Chapter 8 JSON 作为通用框架示例。
- 将项目上传到 GitHub。

## 当前内容状态

| 案例 | 状态 | 说明 |
|---|---|---|
| Chapter 8 | `partially-verified` | 完整旧版页面可用；JSON 目前是框架示例 |
| Chapter 9 | `draft` | 旧版页面保留；尚未完成 JSON 全量迁移 |

## 下一步优先级

1. 将 Chapter 9 整理为 `content/cases/chapter-9-loss-coefficient-hexa-grille.json`。
2. 使用统一 `case.html` 验证 Chapter 9。
3. 根据实际 Icepak 操作补充 `learner-observation` 结果。
4. 增加 JSON 字段检查或轻量校验。
5. 根据需要完善首页筛选和学习进度汇总。

## 暂不处理

- 不为旧版 Chapter 8/9 做大范围重写。
- 不批量修复与当前任务无关的历史文字细节。
- 不引入 Node.js、React、构建工具或后端。
- 不删除官方图片、Markdown、压缩包或模型文件。

## 已知限制

- `case.html` 需要 Live Server 或其他静态 HTTP 服务器。
- 案例学习记录只保存在当前浏览器。
- 当前 JSON 案例不一定包含旧版页面的全部内容。
- 官方资料、图片和模型的公开分发许可仍需由项目维护者确认。

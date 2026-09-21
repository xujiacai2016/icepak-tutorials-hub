# 项目架构说明

## 总体结构

```text
index.html
  ↓
assets/case-index.js
  ↓
content/cases/index.json
  ↓
案例卡片
  ↓
case.html?id=<案例ID>
  ↓
assets/case-renderer.js
  ↓
content/cases/<案例ID>.json
  ↓
assets/app.js
  ↓
进度、学习记录、图片灯箱
```

## 分层职责

### 页面层

- `index.html` 只负责首页固定结构。
- `case.html` 只负责通用案例页面固定结构。
- `chapter-8.html` 和 `chapter-9.html` 是历史/参考页面，不是通用模板。

### 数据层

- `content/cases/index.json` 只保存首页需要的案例元数据。
- `content/cases/<id>.json` 保存通用页面的完整结构化内容。
- Markdown 文件用于内容整理、审核和后续迁移依据。

### 渲染层

- `case-index.js` 读取注册表并生成案例卡片。
- `case-renderer.js` 根据 URL 的 `id` 读取对应 JSON。
- 渲染器使用 HTML 转义，避免案例文本直接注入 HTML。

### 交互层

- `app.js` 在动态内容生成后加载。
- 进度和记录按案例 ID 隔离保存。
- 图片灯箱只处理带有 `.gallery` 结构的案例图片。

## 数据流

首页案例登记：

```text
新增案例 JSON
  ↓
在 index.json 增加元数据
  ↓
首页自动出现案例卡片
```

通用案例加载：

```text
case.html?id=chapter-10-example
  ↓
读取 content/cases/chapter-10-example.json
  ↓
生成页面
```

## 重要约束

- JSON 文件名必须与案例 `id` 一致。
- 图片路径相对于项目根目录。
- `case.html` 不应写入具体 Chapter 内容。
- `index.json` 的元数据与案例 JSON 的标题、状态应保持一致。
- 旧版页面与通用页面可以并存，不应互相覆盖。

# 开发与协作指南

本文件是本项目交接给其他开发者或 AI 编程工具时的首要说明。开始修改前必须先阅读本文件、`README.md`、`PROJECT_STATUS.md` 和 `ARCHITECTURE.md`。

## 项目目标

本项目是一个以 Ansys Icepak 官方仿真案例为核心的静态学习网站。学习闭环为：

```text
案例背景 → 软件操作 → 背后逻辑 → 结果验证 → 独立复现 → 迁移练习
```

当前方案不使用 Node.js、React、数据库或后端服务。

## 页面职责

| 文件 | 职责 |
|---|---|
| `index.html` | 案例首页，Live Server 默认入口 |
| `case.html` | JSON 驱动的通用案例页面模板 |
| `chapter-8.html` | 完整旧版 Chapter 8 页面，作为内容参考和可用入口 |
| `chapter-9.html` | 旧版 Chapter 9 页面，暂作参考 |
| `assets/case-index.js` | 读取案例注册表并生成首页卡片 |
| `assets/case-renderer.js` | 读取单个案例 JSON 并生成通用页面 |
| `assets/app.js` | 学习进度、记录保存、导入导出和图片灯箱 |
| `content/cases/index.json` | 首页案例注册表 |
| `content/cases/*.json` | 通用页面使用的案例数据 |

## 不可随意破坏的内容

以下内容修改前必须说明原因、影响范围和验证方式：

- `chapter-8.html`
- `chapter-9.html`
- `assets/app.js`
- `assets/styles.css`
- `Ansys_Icepak_Tutorials_2022R1_MD/`
- `Icepak_Tutorial_Package/`
- `content/cases/*.md`

不得因为制作通用页面而删除旧版案例、图片、Markdown、ZIP 或模型文件。

## 修改规则

1. 开始前先读取相关文档和目标文件。
2. 只修改与当前任务直接相关的文件。
3. 所有文件使用 UTF-8 编码。
4. 新增案例优先新增 JSON，不复制 `case.html`。
5. 新增 JSON 后同步登记 `content/cases/index.json`。
6. 不批量转换编码、不整站格式化、不重写未涉及的旧页面。
7. 不使用成功形状的静默兜底；加载失败应在页面明确提示。
8. 修改后必须查看 `git diff --stat` 和 `git diff --name-only`。

## 本地运行

使用 VS Code Live Server 打开 `index.html`。通用案例页需要通过 HTTP 访问，因为它使用 `fetch()` 加载 JSON：

```text
http://127.0.0.1:5500/index.html
http://127.0.0.1:5500/case.html?id=chapter-8-mesh-model-enhancement
```

不要直接双击 `case.html`，否则浏览器可能阻止读取 JSON。

## Git 工作流

开始工作：

```powershell
git pull
git status
```

完成修改后：

```powershell
git diff --stat
git diff --name-only
git add .
git commit -m "说明本次修改"
git push
```

多人或 AI 工具协作时，优先使用功能分支，不要让未验证的修改直接进入 `main`。

## 验证清单

- 首页能加载案例注册表。
- 案例卡片链接正确。
- 通用页面能加载目标 JSON。
- 页面无明显乱码、裸 HTML 标签或空白区域。
- 图片路径可访问，灯箱可打开和关闭。
- 折叠步骤、检查项和学习记录仍可用。
- 旧版 Chapter 8 页面仍能打开。
- 修改范围与任务一致。

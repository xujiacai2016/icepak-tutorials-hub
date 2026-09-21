# Icepak Tutorials Hub

这是一个基于 Ansys Icepak 官方案例资料制作的静态学习网站。项目当前不使用
Node.js、React、数据库或服务器，网页可以直接在 Windows 文件资源管理器中打开。

## 当前入口

- [index.html](./index.html)：案例首页，Live Server 默认入口
- [chapter-8.html](./chapter-8.html)：旧版 Chapter 8 网格与模型增强案例
- [chapter-9.html](./chapter-9.html)：Chapter 9 六边形格栅损失系数案例
- [case.html](./case.html)：新的通用案例页面模板
- [Icepak_PRD.md](./Icepak_PRD.md)：产品需求文档
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)：开发、协作和验证规则
- [PROJECT_STATUS.md](./PROJECT_STATUS.md)：当前状态、已知限制和下一步
- [ARCHITECTURE.md](./ARCHITECTURE.md)：页面、数据和脚本关系
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)：新增案例和来源标签规范
- [CHANGELOG.md](./CHANGELOG.md)：重要修改记录

打开方式：

1. 进入本文件所在目录。
2. 使用 Live Server 打开 `index.html`。首页会从 `content/cases/index.json` 读取案例目录。
3. 通过页面中的案例入口进入 Chapter 8 或 Chapter 9。

也可以在 PowerShell 中执行：

```powershell
Start-Process .\index.html
```

## 项目结构

```text
6_Icepak_tutorials_Hub/
├─ index.html                              # 案例首页
├─ chapter-8.html                          # 旧版 Chapter 8 页面
├─ chapter-9.html                          # Chapter 9 学习页
├─ case.html                                # 通用案例页面
├─ Icepak_PRD.md                           # 产品需求与范围
├─ assets/
│  ├─ styles.css                            # 公共样式
│  ├─ app.js                                # 公共交互
│  └─ case-renderer.js                      # JSON 案例渲染器
├─ content/
│  ├─ cases/index.json                     # 案例注册表
│  ├─ cases/*.json                          # 通用页面使用的案例数据
│  ├─ cases/chapter-8-*.md                 # Chapter 8 内容源
│  ├─ cases/chapter-9-*.md                 # Chapter 9 内容源
│  ├─ case-schema.md                       # 案例字段规范
│  ├─ case-template.md                     # 新案例模板
│  └─ case-types.md                        # 案例类型说明
├─ Ansys_Icepak_Tutorials_2022R1_MD/       # 官方 Markdown 与图片
└─ Icepak_Tutorial_Package/                # 官方案例模型压缩包
```

## 为什么没有 `src`、`package.json` 或“后台代码”

当前阶段采用低复杂度的静态原型方案：

- HTML：页面结构、案例内容和交互标记
- CSS：每个 HTML 文件内的视觉样式
- JavaScript：每个 HTML 文件内的图片灯箱、进度和本地记录功能
- Markdown/JSON：后续内容维护与案例索引

因此，`chapter-8.html` 和 `chapter-9.html` 本身就是可直接运行的旧版网页源文件，
不是需要先编译的产物。项目目前也没有账号、服务器、数据库或云端同步功能。

学习记录只保存在当前浏览器的 `localStorage` 中；更换浏览器或清理浏览器
数据后，记录不会自动恢复。

## 暂停后恢复开发的标准流程

### 1. 先确认工作目录

重新开始时，先打开：

```text
C:\Users\jxu67\OneDrive - kochind.com\vide coding exercise\6_Icepak_tutorials_Hub
```

不要以 Copilot 的会话目录作为项目目录。会话目录只保存对话状态，不是项目源代码目录。

### 2. 先阅读项目交接文档

按以下顺序恢复上下文：

1. `README.md`
2. `DEVELOPMENT_GUIDE.md`
3. `PROJECT_STATUS.md`
4. `ARCHITECTURE.md`
5. `CONTENT_GUIDE.md`
6. `Icepak_PRD.md`
7. `content/case-schema.md`

如果要新增案例，再阅读 `content/case-template.md` 和 `content/case-types.md`。

### 3. 先运行现有页面

优先打开 `index.html`，检查案例首页和案例目录：

- 页面是否能正常打开
- Chapter 8/Chapter 9 入口是否可跳转
- 图片是否能打开、放大和关闭
- 进度与学习记录是否能保存

随后打开 `chapter-9.html`，检查同样的功能。

### 4. 再决定修改范围

- 修改文字、步骤或来源：先改 `content/cases/*.md`，再同步页面展示内容。
- 修改首页：修改 `index.html` 或 `assets/case-index.js`。
- 修改旧版案例网页交互或视觉效果：修改对应的 `chapter-8.html` 或 `chapter-9.html`。
- 新增通用页面案例：创建 `content/cases/<案例ID>.json`，然后打开
  `case.html?id=<案例ID>`，不需要复制新的 HTML 页面。
- 旧页面案例：复制 `content/case-template.md`，登记到
  `content/cases/index.json`，仅在需要维护旧页面时同步对应 HTML。
- 修改所有案例的共同功能：应先考虑抽取公共 `assets/styles.css` 和
  `assets/app.js`，避免两个页面继续各自维护一份代码。

### 5. 每次修改后验证

至少检查：

- 浏览器可以打开页面
- 图片路径没有失效
- 图片灯箱可以打开、放大、关闭
- 页面内的折叠步骤、复现答案和迁移练习仍可用
- 本地记录没有被错误覆盖
- 新内容的来源标签仍然准确

## 当前内容状态

- Chapter 8：`partially-verified`，来源为 Ansys Icepak Tutorials 2022 R1，
  尚未在当前 Icepak 环境完整复现。
- Chapter 9：`draft`，已完成网页草稿，但尚未在当前 Icepak 环境完整复现。
- 官方资料和模型文件保存在本项目目录中，后续公开发布前需要确认 Ansys
  截图和模型文件的分发许可。

## 内容来源规则

页面内容必须区分来源：

- `official`：官方文档直接内容或官方结果
- `translated`：官方内容的翻译、整理或改写
- `explained`：基于官方步骤的教学解释
- `inferred`：工程逻辑推导，不是官方原文
- `exercise`：网站自行设计的练习
- `to-verify`：尚未在实际软件中验证
- `learner-observation`：学习者实际操作观察

不要把教学解释、工程推导或练习答案显示成官方结论。

## 后续推荐顺序

1. 使用 `case.html?id=chapter-8-mesh-model-enhancement` 验证通用页面。
2. 将 Chapter 9 内容整理为同样结构的 JSON，再用同一页面加载。
3. 增加由 `content/cases/index.json` 驱动的案例首页。
4. 在实际 Icepak 环境中复现案例，并把观察结果标记为 `learner-observation`。
5. 需要多人协作或云端保存时，再评估 Git、账号和后端数据库。

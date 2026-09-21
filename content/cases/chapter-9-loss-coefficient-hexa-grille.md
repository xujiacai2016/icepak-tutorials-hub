---
id: chapter-9-loss-coefficient-hexa-grille
title: Loss Coefficient for a Hexa-Grille
title_zh: 六边形格栅损失系数
source: Ansys Icepak Tutorials 2022 R1, Chapter 9
version: 2022 R1
status: draft
difficulty: intermediate
estimated_time: 60-90 minutes
case_type: parameterization-optimization
version_note: 不同版本可能出现菜单、求解器、网格数量和参数化结果差异。
tags:
  - 参数化
  - Reynolds 数
  - Multiple Trials
  - 报告函数
  - 损失系数
  - 后处理
---

# 六边形格栅损失系数

## 案例定位

本案例使用参数化试验改变 Reynolds 数，计算六边形格栅的损失系数，并通过报告函数和曲线观察结果随 Reynolds 数的变化。

与 Chapter 8 的网格改进不同，本案例的核心学习对象是“设计变量 → 多次试验 → 自定义函数 → 求解 → 后处理”的参数化分析链。

## 版本与审核状态

- **案例来源版本**：Ansys Icepak Tutorials 2022 R1
- **内容状态**：草稿
- **状态说明**：已根据官方 Markdown 整理，尚未在当前 Icepak 环境中完整复现。
- **版本提醒**：不同版本可能改变菜单位置、参数化面板、求解器行为、网格数量和结果曲线。

## 学习目标

- 定义 Reynolds 数设计变量。
- 创建 Parametric trials 和多个离散试验值。
- 定义 primary functions 和 compound functions。
- 计算并绘制损失系数 `Kfact` 与 `Re` 的关系。
- 理解为什么参数化分析需要先定义可报告的物理量。

## 前置知识

- 熟悉 Icepak 菜单结构。
- 已完成或阅读 Finned Heat Sink 教程。
- 了解基本流动、压力、速度和 Reynolds 数概念。

## 文件准备

1. 从项目资源目录获取 [`loss_coefficient.zip`](../../Icepak_Tutorial_Package/loss_coefficient.zip)。
2. 解压并找到 `loss-coefficient.tzr`。
3. 在 Icepak 的 Welcome to Icepak 面板中使用 Unpack 加载项目。
4. 将项目解压到工作目录，并另存为 `loss-coefficient-new`。

## 学习流程总览

| 阶段 | 主要动作 | 判断依据 | 官方内容 |
|---|---|---|---|
| 1 | 加载并另存模型 | 原始文件不被覆盖 | Step 1-2 |
| 2 | 建立入口/出口报告 | 能得到压力和平均速度 | Step 3 |
| 3 | 定义 Re、试验和函数 | 6 个 Re 试验可见 | Step 3 |
| 4 | 生成并检查网格 | 切面和体网格可观察 | Step 4 |
| 5 | 设置流动和求解 | 500 次迭代、双精度 | Step 5 |
| 6 | 运行参数化求解 | 试验全部运行 | Step 7 |
| 7 | 绘制 Kfact vs Re | 得到参数化曲线 | Step 8 |

## 步骤 1-2：加载、建立并保存模型

### 官方操作

加载 `loss-coefficient.tzr`，确认已有机箱、入口、出口和中心格栅模型，然后使用 Save project as 保存为 `loss-coefficient-new`。

### 背后逻辑

使用另存为保护原始模型，使学习者可以反复修改参数、重新运行试验而不破坏起始文件。

### 验证方法

- 模型包含入口、出口和中心格栅。
- 新项目名称不是原始项目名。
- 原始压缩包和工作副本分开保存。

### 配图

- `images/fig_0163.png`：问题规格，官方图。
- `images/fig_0164.png`：加载后的模型，官方图。
- `images/fig_0165.png`：另存为项目，官方图。

## 步骤 3：定义参数、试验和函数

### 官方操作

1. 为入口和出口定义 UX、Pressure 报告。
2. 在入口 X Velocity 中设置 `Re*1.84e-5/9.322e-3`。
3. 将 Re 初始值设置为 10。
4. 选择 Parametric trials 和 All combinations。
5. 定义离散 Re 值：10、50、100、500、1000、1750。
6. 定义 primary functions：`Pstat_in`、`Pstat_out`、`Uave_in`、`Uave_out`。
7. 定义 compound functions：`Pdyn_in`、`Pdyn_out`、`Ptot_in`、`Ptot_out`、`Kfact`。

官方函数定义包括：

| 函数 | 定义 |
|---|---|
| `Pdyn_in` | `0.5*1.1614*$Uave_in*$Uave_in` |
| `Pdyn_out` | `0.5*1.1614*$Uave_out*$Uave_out` |
| `Ptot_in` | `$Pstat_in+$Pdyn_in` |
| `Ptot_out` | `$Pstat_out+$Pdyn_out` |
| `Kfact` | `($Ptot_in-$Ptot_out)/$Pdyn_out` |

### 背后逻辑

参数化求解不仅需要改变输入变量，还需要定义每次试验要输出的物理量。primary function 从 Icepak 报告中取得基础量，compound function 再将基础量组合成损失系数。

Re 在这里作为设计变量，入口速度通过公式随 Re 改变，因此每个 trial 对应一组不同的流动条件。

### 验证方法

- 6 个离散 Re 值都出现在 Trials 中。
- 函数名大小写与官方定义一致。
- `Kfact` 能引用已定义的 compound functions。
- 入口速度表达式和单位与模型设定一致。

### 来源标记

`official`：函数名称、离散值和公式来自官方教程。  
`explained`：参数化分析链的中文解释。  
`to-verify`：具体面板行为需在本地 Icepak 版本中确认。

### 配图

- `images/fig_0166.png` 至 `images/fig_0174.png`：官方参数、试验和函数设置截图。

## 步骤 4：生成并检查网格

### 官方操作

保持 Mesh control 默认设置，生成网格；通过 Y plane through center 查看切面网格，再查看 `block.1` 的体网格。

### 背后逻辑

本案例重点不是网格优化，而是确保格栅附近的流动物理有足够网格分辨率。切面和体网格检查用于确认网格确实覆盖了关键流道和格栅结构。

### 验证方法

- 能看到中心切面网格。
- 能查看 `block.1` 体网格。
- 记录实际网格数量，但不要把它当作跨版本固定值。

### 配图

- `images/fig_0175.png`：中心切面网格。
- `images/fig_0176.png`：`block.1` 体网格。

## 步骤 5-6：物理设置、求解设置与保存

### 官方操作

- Variables solved：Flow (velocity/pressure)
- Radiation：Off
- Flow regime：Laminar
- Number of iterations：500
- Solver precision：Double
- 保存包含网格的项目。

### 背后逻辑

这些设置使案例聚焦于流动变量和格栅压降相关量。迭代次数和精度会影响收敛与结果稳定性，不能只关注参数化曲线而忽略求解设置。

### 验证方法

- 物理设置、迭代次数和精度与官方步骤一致。
- 运行前已保存项目。

### 配图

- `images/fig_0177.png` 至 `images/fig_0179.png`：官方物理和数值设置截图。

## 步骤 7-8：运行参数化求解并后处理

### 官方操作

使用 Run optimization，确认未选择 Allow fast trials (single .cas file)，运行全部 trials。完成后在 Parametric trials 面板中选择 Re 作为 X 轴，`Kfact` 作为 Y 轴，绘制 `Kfact vs Re`。

### 背后逻辑

关闭 fast trials 选项、运行多个 trial 并统一报告函数，才能将每个 Re 对应到一组可比较的结果。曲线是参数化结果的表达，不只是单次求解的后处理图。

### 验证方法

- 每个 Re trial 都有完成状态和结果。
- `Kfact` 数值已生成。
- 图表横轴为 Re，纵轴为 Kfact。
- 记录曲线趋势，不用未验证的精确数值替代实际结果。

### 配图

- `images/fig_0180.png` 至 `images/fig_0182.png`：官方试验结果和曲线截图。

## 结果与检查

官方总结指出，损失系数会随 Reynolds 数增加而降低，并逐渐趋于渐近状态。这个趋势是官方教程结论；实际曲线和数值可能因软件版本、网格和求解器变化而不同。

建议记录：

| 指标 | 官方参考 | 学习者实际 |
|---|---|---|
| Re 试验值 | 10、50、100、500、1000、1750 | 用户填写 |
| Kfact 曲线趋势 | 随 Re 增大而降低并趋于渐近 | 用户观察 |
| 试验完成情况 | 全部完成 | 用户记录 |

## 常见问题排查

以下是基于官方步骤整理的教学排查，不是官方原文：

1. **没有生成 Kfact**：检查 primary functions 是否创建、compound function 名称和大小写是否正确。
2. **试验数量不对**：检查是否选择 Parametric trials、All combinations，以及 6 个 Re 离散值是否生效。
3. **曲线轴变量错误**：重新选择 Re 作为 X 轴、Kfact 作为 Y 轴。
4. **结果差异明显**：检查网格、迭代次数、流动状态、单位和软件版本。
5. **运行前参数错误**：检查入口速度公式中的 Re、运动黏度和水力直径是否与官方案例一致。

## 复现任务

1. 为什么需要同时定义 primary functions 和 compound functions？
2. Re 改变时，入口速度为什么也必须通过表达式关联变化？
3. 为什么 `Kfact` 不能直接凭空定义，而要依赖压力和速度报告？
4. 如何判断 6 个 trials 是否都完成？
5. 如果曲线趋势与官方总结不一致，应按什么顺序排查？

答案应在网页中采用点击展开方式，并标注 `official`、`explained` 或 `inferred` 来源。

## 迁移练习

> `exercise`：以下内容是网站设计练习，不是官方 Chapter 9 原文。

- 将 Re 的离散值替换为另一组值，比较曲线采样密度变化。
- 为另一个流动性能指标定义 primary 或 compound function。
- 设计一个检查表，判断某个参数化案例的输入、函数、trial 和后处理是否闭环。
- 思考如果模型从格栅变为风扇，哪些变量和报告函数需要重新定义。

## 来源

Ansys Icepak Tutorials 2022 R1, Chapter 9: Loss Coefficient for a Hexa-Grille。
模型文件：`Icepak_Tutorial_Package/loss_coefficient.zip`。
配图：项目中的 `Ansys_Icepak_Tutorials_2022R1_MD/images/fig_0163.png` 至 `fig_0182.png`。

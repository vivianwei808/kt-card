---
id: C-02
layer: Context 与记忆
title: Prompt 四分区与优先级
source: 第8章 8-2
tags: [Context, 分区, 预算]
---

# C-02 Prompt 四分区与优先级

> 指令、约束、历史、画像，越接近「这一次的硬约束」优先级越高。

## 机制

- 指令区：系统角色与输出要求，最高优先级，永不淘汰。
- 约束区：预算、天数、必去景点、上一轮必改问题，高优先级，永不淘汰。
- 历史区：上一版摘要与返工意见，中优先级，超预算时压缩。
- 画像区：长期偏好，低优先级，超预算时最先丢弃。
- 物理顺序也有讲究：关键约束放头尾两端，可牺牲的历史让给中段，避免 Lost in the Middle。
- 末尾复述一遍硬约束，成本很低，能显著降低长上下文里的遗忘。

## 代码落点

- `ContextAssembler.java L21-L97`：### SECTION:INSTRUCTION / CONSTRAINT / FACTS / HISTORY / PROFILE
- `PromptContext.java`：includedSections、droppedSections、estimatedTokens、usableBudget
- `looptrip.context.max-tokens=6000；safety-margin=0.15`

## 复用清单

- 任何长 Prompt 都按四分区排版，并在末尾复述硬约束。
- 砍内容时从低优先级砍起，指令与约束不动。

## 面试一句话

我把 Prompt 分成四个区，超预算先丢画像再压历史，指令和硬约束永远保留。

## 常见坑

为了省 token 砍掉约束区。省下的那点长度，通常要用一整轮返工还回去。

---

来源：第8章 8-2

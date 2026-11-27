# -*- coding: utf-8 -*-
"""V 层第四批：第 15-22 讲。"""

V = [
    {
        "id": "V-15",
        "layer": "V",
        "title": "第15讲 王牌超能力：代码解释器与无头浏览器",
        "oneliner": "文件操作、无头浏览器、代码解释器三种能力，把 Agent 从聊天机器人变成能交付产物的数字白领。",
        "mechanism": [
            "文件操作三件套：read 读、write 写、edit 改，产物能落地成文件而不只是聊天框里的文字。",
            "无头浏览器给四类动作：搜索、查询、操作页面，处理需要登录或渲染的内容。",
            "代码解释器支持 bash、python、js 三种脚本，负责精确计算和批量处理。",
            "价值三条：打破信息孤岛（获取力）、沉淀物理形态的产物（交付力）、弥补模型算不准的缺陷（处理力）。",
            "安全对照：宿主机裸跑会碰 rm -rf、drop table、数据泄露、提示注入；容器隔离后爆炸半径受控、用完即毁。",
            "[代码实战] 阿里股票早报：取行情、算量化指标、抓舆情、出报告，四步都在沙箱里完成。",
        ],
        "code": [
            "m2l10/m2l10_sandbox.py：沙箱 Agent 与 MCP 工具加载",
            "sandbox-docker-compose.yaml：容器隔离与目录挂载",
            "m2l10/m2l10_mcp_tools.md：沙箱暴露的工具清单",
        ],
        "reuse": [
            "需要产出文件或精确计算的任务，一律给沙箱执行环境。",
            "挂载按最小权限，输入只读、输出单独目录。",
            "把「容器隔离」写进安全基线，禁止宿主机直跑模型生成的代码。",
        ],
        "interview": "沙箱给 Agent 三种超能力：文件、浏览器、代码执行；价值是从聊天变成交付，风险是裸跑能删库，所以一律容器隔离、用完即毁。",
        "pitfall": "在宿主机直接执行模型生成的脚本，一次 rm -rf 就够出事故。",
        "source": "第15讲",
        "tags": ["沙箱", "代码解释器", "安全"],
    },
    {
        "id": "V-16",
        "layer": "V",
        "title": "第16讲 Skills 生态：渐进式披露与 Sub-Crew 编排",
        "oneliner": "技能不塞进提示词，先给模型一份菜单，选中了再上菜，需要动手时现场起一个子 Crew 去沙箱执行。",
        "mechanism": [
            "菜单阶段：启动时扫目录，把技能名和一句话描述拼成 <available_skills> 注入工具描述，几十个技能也只占几百字。",
            "点菜阶段：模型调用 skill_loader(skill_name, task_context)，这时才读 SKILL.md 正文。",
            "技能分两类：type=reference 直接返回操作指令文本，不执行代码；type=task 现场构建 Sub-Crew。",
            "Sub-Crew 的 backstory 就是 SKILL.md，工具走沙箱 MCP，再用 tool_filter 限定四个沙箱工具。",
            "技能可以放全局目录，也可以放 workspace 目录，实现角色专属能力。",
        ],
        "code": [
            "tools/skill_loader_tool.py：frontmatter 解析、_build_description、_run 的三段结构",
            "skills/load_skills.yaml：技能清单",
            "skills/pdf/SKILL.md、skills/docx/SKILL.md：两类技能示例",
        ],
        "reuse": [
            "技能超过十个就上渐进式披露，上下文成本可控。",
            "把操作规范写进 SKILL.md，执行细节交给沙箱工具。",
            "技能目录分层，团队级和角色级分开维护。",
        ],
        "interview": "Skills 用渐进式披露：菜单常驻、正文按需加载，需要执行的技能起一个子 Crew 在沙箱里跑，技能再多上下文也不会爆。",
        "pitfall": "把所有技能说明拼进系统提示词，token 花了一大半，模型反而选不准。",
        "source": "第16讲",
        "tags": ["Skills", "渐进披露", "Sub-Crew"],
    },
]

# -*- coding: utf-8 -*-
"""V 层第二批：第 09-16 讲。"""

V = [
    {
        "id": "V-09",
        "layer": "V",
        "title": "第09讲 定义Process：任务调度与信息传递",
        "oneliner": "流程的本质是任务怎么调度，加上任务之间怎么交接，两条讲清 Sequential 与 Hierarchical。",
        "mechanism": [
            "[00:17] 认知原点：任务列表加调度方式。顺序调度是预先分配、线性流程；层级调度是动态分配、监督反馈，能打回重做和重新分配。",
            "[00:33] Sequential 的优势是确定性和没有额外性能损耗；问题是遇到不确定任务就僵住，且强依赖单个 Agent 的效果。",
            "[00:50] 交接棒讲信息传递：TaskOutput 的结构里有 Description、Raw、Format 三段，Format 可以是 JSON 或 Pydantic。",
            "[00:50] 传递有两种：不设 context 是隐式传递，下游只能看到上游的原始输出；context=[task1, task3] 是显式传递，按需挑选上游。",
            "课程的示例链路是图片输入分析、内容策略分析、笔记文案撰写、SEO 优化，四步逐级传。",
        ],
        "code": [
            "m2l5/m2l5_crew.py：Process.sequential 与 Task 的 context 依赖",
            "m1l3/m1l3_multi_agent.py：分层调度的 manager 与打回逻辑",
        ],
        "reuse": [
            "先问任务能否事前写死，能写死就用 Sequential。",
            "显式传 context，避免下游被无关的上游输出污染。",
            "需要打回和重分配时再上 Hierarchical，成本翻倍。",
        ],
        "interview": "Process 就是任务调度方式：Sequential 是预先分配的线性流程，确定性强；Hierarchical 是动态分配加监督反馈，能打回重做，代价是多一层管理调用。",
        "pitfall": "不设 context 靠隐式传递，下游拿到一堆无关输出，还得自己分辨哪段有用。",
        "source": "第09讲",
        "tags": ["Process", "调度", "信息传递"],
    },
    {
        "id": "V-10",
        "layer": "V",
        "title": "第10讲 多模态模型：让 Agent 拥有眼睛",
        "oneliner": "文本之外接入图片、音频、视频输入，模型从凭想象生成变成有现实锚点。",
        "mechanism": [
            "[00:16] 输入输出对比：以前只有文本进出，现在输入端有图片、音频、视频，输出端还是文本、代码、JSON。",
            "[00:31] 为什么需要：纯文本提示「写一个墨绿色复古杯子的文案」，模型只能凭想象，幻觉风险高；给一张照片，就有了现实锚定。",
            "课程用小红书笔记做例子：图片分析 Agent 先用 Qwen-VL 读图，抽出卖点和视觉风格，再交给文案环节。",
            "[00:46] 代码环节演示图片分析 Agent 的配置，本地图片先读进来编码再送模型。",
            "多模态的价值是把「一言胜千图」反过来：一张图省掉几百字的描述，还更准确。",
        ],
        "code": [
            "m2l6/m2l6_agent.py：image_model 与 AddImageToolLocal 配置",
            "tools/add_image_tool_local.py：本地图片读取与 Base64 编码",
            "llm/test_multimodal_message.py：多模态消息格式的测试",
        ],
        "reuse": [
            "凡是「描述外观、判断质量、提取图中信息」的任务，先上图再谈提示词。",
            "图片分析结果落成结构化字段，下游文案环节直接用。",
            "批量图片先压缩再送，控制成本。",
        ],
        "interview": "多模态解决的是现实锚定：纯文本描述靠想象，给图之后模型有据可依；我把图片分析做成独立 Agent，产出结构化字段给下游。",
        "pitfall": "只配了视觉模型没在任务里强制看图，模型照样凭文字编，还编得挺像。",
        "source": "第10讲",
        "tags": ["多模态", "Qwen-VL", "小红书"],
    },
]

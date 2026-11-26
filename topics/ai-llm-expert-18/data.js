window.KB_TOPIC = {
 "slug": "ai-llm-expert-18",
 "meta": {
  "slug": "ai-llm-expert-18",
  "title": "AI 大模型应用专家 · 18 期",
  "subtitle": "40 讲课程的一张知识地图：大模型、RAG、Agent、微调、部署与面试",
  "description": "基于知乎「AI 大模型应用专家实战训练营 18 期」41 章课件与 34 份课堂笔记整理。从 API 与 Prompt 起步，经 Coze/Dify、数据分析、Embedding、RAG、Agent 工程，到微调蒸馏、多模态、企业部署与 Text-to-SQL，每层都能单独查，也能按顺序读。",
  "source": "课程课件第 0 至 40 章；课堂笔记 34 份",
  "updated": "2026-11-26",
  "accent": "#7c3aed",
  "tags": [
   "大模型",
   "RAG",
   "Agent",
   "微调",
   "部署"
  ]
 },
 "layers": [
  {
   "key": "F",
   "name": "大模型地基",
   "en": "Foundation",
   "color": "#b45309",
   "desc": "模型怎么工作、API 怎么调、Prompt 怎么写、AI 编程工具怎么用",
   "count": 15
  },
  {
   "key": "W",
   "name": "智能体平台",
   "en": "Platform",
   "color": "#0f766e",
   "desc": "Coze 与 Dify 上的 Bot、工作流、插件和本地部署",
   "count": 14
  },
  {
   "key": "D",
   "name": "数据分析与算法",
   "en": "Analytics",
   "color": "#0369a1",
   "desc": "分析式 AI 的完整流程、行业算法、时序预测与视觉检测",
   "count": 14
  },
  {
   "key": "V",
   "name": "向量与检索",
   "en": "Vector",
   "color": "#7c3aed",
   "desc": "embedding 原理、模型选型、向量库与相似度检索",
   "count": 6
  },
  {
   "key": "R",
   "name": "RAG 工程",
   "en": "RAG",
   "color": "#1d4ed8",
   "desc": "切片、召回、重排、评测与企业知识库落地",
   "count": 20
  },
  {
   "key": "A",
   "name": "Agent 工程",
   "en": "Agent",
   "color": "#b91c1c",
   "desc": "Function Calling、MCP、规划、记忆、评估与框架编排",
   "count": 27
  },
  {
   "key": "T",
   "name": "微调与多模态",
   "en": "Tuning",
   "color": "#be185d",
   "desc": "微调原理、数据工程、蒸馏、VLM 与行业项目",
   "count": 20
  },
  {
   "key": "P",
   "name": "部署与性能",
   "en": "Performance",
   "color": "#047857",
   "desc": "硬件选型、推理框架、并发压测、SGLang 与质量保障",
   "count": 15
  },
  {
   "key": "B",
   "name": "数据智能",
   "en": "Data",
   "color": "#a16207",
   "desc": "Text-to-SQL、ChatBI 与数据库问答的工程化",
   "count": 11
  },
  {
   "key": "I",
   "name": "面试与求职",
   "en": "Interview",
   "color": "#5b6472",
   "desc": "五轮面试辅导的高频题、答法与简历表达",
   "count": 9
  }
 ],
 "cards": [
  {
   "id": "F-01",
   "layer": "F",
   "title": "Token 是模型读写文本的计量单位",
   "oneliner": "同一句话在不同模型里切出的 token 不同，上下文、计费、速度都按 token 算。",
   "mechanism": [
    "模型先按分词器把文本切成 token，再映射成数字向量参与计算。",
    "GPT-4o 把「Hello World」切成 2 个 token，id 为 13225 和 5922。",
    "DeepSeek-R1 把「人工智能你好啊」切成「人工智能」「你好」「啊」，id 为 33574、30594、3266。",
    "分词器不同，同一段中文的 token 数就不同，按字数估窗口会低估。",
    "32K 上下文指 32K 个 token，不是 32K 个汉字。"
   ],
   "code": [
    "tiktokenizer：对比 GPT-4o 与 DeepSeek-R1 的切分结果",
    "max_output_tokens：按 token 限制输出长度",
    "tokenizer.encode：本地统计输入 token 数"
   ],
   "reuse": [
    "估算成本前，先用目标模型的分词器数一遍真实输入。",
    "长文档功能把 token 预算写进设计，不留到联调时才发现超窗。"
   ],
   "interview": "Token 是分词器的输出，上下文窗口和计费都按 token 算，不按字数。",
   "pitfall": "用中文字数估 token，实际切分可能多出三成。",
   "source": "第1章",
   "tags": [
    "Token",
    "上下文",
    "计费"
   ]
  },
  {
   "id": "F-02",
   "layer": "F",
   "title": "温度管发散，Top P 管长尾",
   "oneliner": "要稳定就降温度，要排除离谱词就调 Top P，两个参数作用在不同环节。",
   "mechanism": [
    "Temperature 平滑下一个 token 的概率分布，1.0 以上让低概率词也有机会，0.2 更保守。",
    "Top P 按概率从高到低累加，只保留累计和达到 P 的词表，再从里面采样。",
    "例子：好 60%、不错 30%、糟 9%、可乐 0.01%，Top P=0.9 时只在好和不错里选。",
    "Top P 随分布动态改变候选数量，比固定温度更能挡住概率极低的词。",
    "DashScope 示例参数：temperature=0.7、top_p=0.8。"
   ],
   "code": [
    "temperature：控制分布平滑度，越低越确定",
    "top_p：截断长尾，保留累计概率 P 的候选",
    "dashscope.Generation.call：两个参数一起传"
   ],
   "reuse": [
    "抽取、分类、代码生成把 temperature 压到 0 到 0.3。",
    "创意任务先调 temperature，仍出现怪词再收 Top P。"
   ],
   "interview": "温度改概率分布的平滑度，Top P 截断候选词表，前者管风格，后者管长尾。",
   "pitfall": "温度和 Top P 一起拉高，输出发散却怪模型能力不行。",
   "source": "第1章",
   "tags": [
    "API",
    "采样",
    "参数"
   ]
  },
  {
   "id": "F-03",
   "layer": "F",
   "title": "上下文窗口由输入和输出共享",
   "oneliner": "系统提示词、历史对话、当前问题、模型回复共用一个窗口，4096 的窗口可能只剩 596 给用户。",
   "mechanism": [
    "输入限制覆盖系统提示词、历史消息和当前输入，总长超限 API 直接报错。",
    "示例：窗口 4096，系统提示词加历史已占 3500，用户最多再写 596 token。",
    "输出长度由 max_output_tokens 控制，设低了回答被截断，设高了增加耗时和费用。",
    "历史消息不会自动变短，常用截断旧消息、总结旧消息、只带最近 5 轮三种做法。",
    "系统提示词同样消耗 token，频繁改动还会让模型行为不稳定。"
   ],
   "code": [
    "max_output_tokens：给回复预留上限",
    "messages：历史列表，需要自己裁剪",
    "system prompt：全局人设，计入输入预算"
   ],
   "reuse": [
    "先算固定开销：系统提示词加工具定义加历史策略。",
    "长会话做滚动摘要，保留最近几轮原文。"
   ],
   "interview": "上下文窗口是输入输出共享的预算，工程上要主动管理历史，不能把聊天记录无脑拼进去。",
   "pitfall": "把整段聊天记录每轮全量拼进 messages，几轮后必然超窗。",
   "source": "第1章",
   "tags": [
    "上下文",
    "历史管理",
    "API"
   ]
  },
  {
   "id": "F-04",
   "layer": "F",
   "title": "函数调用由模型出参，程序执行",
   "oneliner": "模型只负责选函数和填参数，真正执行在本地代码，结果以 function 角色回灌后再生成回答。",
   "mechanism": [
    "流程五步：提问、模型返回 function_call、程序执行、结果以 role=function 追加、模型生成回答。",
    "函数注册要写 name、description、parameters 的 JSON Schema，required 标出必填项。",
    "模型靠 description 判断调哪个函数，调不准先改描述，别急着换模型。",
    "多个工具功能重叠时，模型会调错或多调，工具边界要清晰。",
    "函数定义和调用结果都占上下文，工具多了要做检索或裁剪。"
   ],
   "code": [
    "qwen-max：支持 functions 参数的模型",
    "tool_calls：模型返回的函数名与参数",
    "role=function：把执行结果写回消息列表",
    "JSON Schema：定义 parameters 的类型与必填项"
   ],
   "reuse": [
    "每个工具写一句「什么时候用它」，写清不适用场景。",
    "工具返回截断到必要字段，别把整张表塞回上下文。"
   ],
   "interview": "Function Calling 里模型只产出调用意图和参数，执行权在本地程序，结果再回灌给模型。",
   "pitfall": "只写函数名不写 description，模型选错工具还以为是模型不行。",
   "source": "第1章",
   "tags": [
    "Function Calling",
    "工具",
    "API"
   ]
  },
  {
   "id": "F-05",
   "layer": "F",
   "title": "DeepSeek 用 MoE 把 671B 压成 37B 激活",
   "oneliner": "总参数 671B，每次只激活 37B，再用 MLA 压缩 KV 缓存、FP8 降算力。",
   "mechanism": [
    "V3 有 61 个 MoE block，总参数 671B，训练和推理每次只激活 37B。",
    "MoE 像分诊台，先把请求分给对应专家，避免所有参数都参与计算。",
    "MLA 用低秩联合压缩 KV cache，同时降低显存占用和计算量。",
    "混合精度框架在不需要高精度的模块用 FP8，减少训练计算量。",
    "训练加入多 token 预测（MTP），提高每个位置的训练信号密度。"
   ],
   "code": [
    "MoE：61 个专家块，按 token 路由",
    "MLA：低秩压缩 KV cache",
    "FP8：部分矩阵乘用低精度",
    "MTP：一次预测多个 token"
   ],
   "reuse": [
    "看模型成本先看激活参数和 KV 缓存，不只看总参数。",
    "本地部署按激活参数估显存，再留 KV 缓存余量。"
   ],
   "interview": "DeepSeek 的性价比来自 MoE 稀疏激活、MLA 压 KV、FP8 降算力三件事叠加。",
   "pitfall": "以为参数越大越慢，忽略 MoE 每次只激活一部分专家。",
   "source": "第2章",
   "tags": [
    "DeepSeek",
    "MoE",
    "推理成本"
   ]
  },
  {
   "id": "F-06",
   "layer": "F",
   "title": "R1 的推理能力来自规则奖励的强化学习",
   "oneliner": "R1-Zero 不做 SFT，只用 GRPO 加规则打分就涌现长链推理，R1 再补冷启动和 80 万条数据。",
   "mechanism": [
    "R1-Zero 跳过 SFT，直接用 GRPO 强化学习，用规则类验证器自动打分。",
    "训练中模型自己长出长链推理、自我检查和反思行为。",
    "R1 走多阶段：冷启动 SFT、RL、80 万条 CoT 与通用数据 SFT、全场景 RL。",
    "蒸馏版用 R1 产出的 80 万条数据做 SFT，覆盖 1.5B 到 70B。",
    "32B 和 70B 蒸馏模型在多项能力上对标 o1-mini。"
   ],
   "code": [
    "GRPO：组相对策略优化",
    "DeepSeek-R1-Zero：纯 RL 版本",
    "MIT License：允许蒸馏和商用"
   ],
   "reuse": [
    "做垂直领域推理模型，先用规则验证器定义什么算对。",
    "预算有限时优先蒸馏大模型的数据，不从头训 RL。"
   ],
   "interview": "R1 的关键是用可验证的规则奖励替代人工偏好标注，让长链推理在 RL 里自己涌现。",
   "pitfall": "把 7B 蒸馏版当成真 R1，真正的满血版是 671B。",
   "source": "第2章",
   "tags": [
    "DeepSeek",
    "RL",
    "蒸馏"
   ]
  },
  {
   "id": "F-07",
   "layer": "F",
   "title": "通用模型补步骤，推理模型少指挥",
   "oneliner": "对推理模型强行拆步骤会压低它的推理能力，对通用模型不分步则容易漏逻辑。",
   "mechanism": [
    "通用模型需要结构化引导，缺上下文补上下文，缺示例给 few-shot，缺步骤写 CoT。",
    "推理模型已经把推理逻辑内化，提示语只给任务目标，越简洁越好。",
    "选型按任务：创意写作、改写用通用模型，数学、物理、编程用推理模型。",
    "对推理模型写「请一步一步思考」，容易得到过度复杂或跑偏的回答。",
    "推理模型也会漏细节，复杂任务仍要多次交互和人工核对。"
   ],
   "code": [
    "DeepSeek-V3：通用模型，适合结构化引导",
    "DeepSeek-R1：推理模型，提示保持简洁",
    "CoT：通用模型的补步骤手段"
   ],
   "reuse": [
    "先判断任务类型，再决定提示词要不要拆步骤。",
    "同一个任务用两类模型各跑一次，比较质量和延迟。"
   ],
   "interview": "提示词强度要匹配模型类型，推理模型少给步骤，通用模型才需要 CoT 和示例。",
   "pitfall": "拿推理模型还写一大段「请一步一步思考」，反而压制它的推理。",
   "source": "第2章",
   "tags": [
    "Prompt",
    "模型选型",
    "推理模型"
   ]
  },
  {
   "id": "F-08",
   "layer": "F",
   "title": "Prompt 六要素按任务到语气排序",
   "oneliner": "回答不满意时，按任务、上下文、示例、角色、格式、语气的顺序回查。",
   "mechanism": [
    "任务（Task）用动词开头写清最终目标，可以有多条。",
    "上下文（Context）交代背景和环境，示例（Exemplars）给具体样例。",
    "角色（Persona）指定 AI 扮演谁，格式（Format）指定表格、列表或 JSON。",
    "语气（Tone）放最后调，前五项没写清时调语气没有意义。",
    "没有现成示例时，先让模型生成示例，再放进正式提示词。"
   ],
   "code": [
    "Task：动词开头的目标句",
    "Context：背景、数据、约束",
    "Exemplars：输入输出样例",
    "Format：JSON、表格、列表"
   ],
   "reuse": [
    "把六要素做成提示词模板的空位，逐项填。",
    "效果差时从上往下排查，先看任务写没写清。"
   ],
   "interview": "提示词六要素里任务权重最高，角色和语气只是最后一层修饰。",
   "pitfall": "一上来堆角色和语气，任务目标本身写得含糊。",
   "source": "第2章",
   "tags": [
    "Prompt",
    "模板",
    "方法论"
   ]
  },
  {
   "id": "F-09",
   "layer": "F",
   "title": "五个技巧覆盖多数提示词需求",
   "oneliner": "要程序解析就让它输出 JSON，要准确就给样例，要多步推理就写 CoT。",
   "mechanism": [
    "限制输出格式：要求 JSON 返回并给字段结构，方便代码直接解析。",
    "用三引号等分隔符把多段输入隔开，模型不容易混淆不同文本。",
    "提供样例处理有歧义的任务，样例里连判断理由一起给。",
    "CoT 把任务拆成步骤并给出计算过程示例，提升透明度和准确率。",
    "面向不同角色讲解，例如「把我当五岁小朋友解释超导体」，控制输出深度。"
   ],
   "code": [
    "JSON mode：固定字段输出",
    "few-shot：给输入输出样例",
    "CoT：要求写出推理步骤",
    "分隔符：三引号或 XML 标签"
   ],
   "reuse": [
    "凡是下游要解析的输出，先定 JSON 字段再写提示词。",
    "分类任务先给 3 到 5 个带理由的样例。"
   ],
   "interview": "提示词技巧按目标选：格式约束给程序用，样例给歧义任务用，CoT 给推理任务用。",
   "pitfall": "只说要 JSON 却不给字段结构，模型每次返回的键都不一样。",
   "source": "第2章",
   "tags": [
    "Prompt",
    "CoT",
    "Few-shot"
   ]
  },
  {
   "id": "F-10",
   "layer": "F",
   "title": "模型尺寸按显存选，32B 接近满血九成",
   "oneliner": "1.5B 到 671B 的显存需求从 1GB 到 496GB，32B 约实现 671B 的 90% 性能。",
   "mechanism": [
    "显存需求：1.5B 1 到 2GB、7B 6 到 8GB、14B 10 到 12GB、32B 24 到 48GB、70B 96 到 128GB、671B 496GB。",
    "1.5B 适合短文本和基础问答，7B/8B 适合文案和代码，14B 适合数学推理和长文本。",
    "32B 面向医疗、法律、金融等高精度场景，本地部署要 64GB 内存加 80GB 显存。",
    "7B 在基础文本生成上可能不稳定，小模型响应快但能力有限。",
    "671B 满血版要 8 张 A100/H100 80GB，部署成本极高。"
   ],
   "code": [
    "ollama：本地拉取 1.5B 到 32B 量化模型",
    "deepseek-r1:32b：常见本地部署规格",
    "GPTQ：4bit 量化进一步压显存"
   ],
   "reuse": [
    "先按显存列候选模型，再按任务挑最小够用的。",
    "本地验证用 7B，效果不够再升 32B。"
   ],
   "interview": "模型选型先看显存和延迟预算，32B 大约是满血版九成能力、十分之一成本。",
   "pitfall": "拿 24GB 显卡硬跑 32B GPTQ，参数调到最保守也起不来。",
   "source": "第2章",
   "tags": [
    "模型选型",
    "显存",
    "本地部署"
   ]
  },
  {
   "id": "F-11",
   "layer": "F",
   "title": "Cursor 规则要落到项目级",
   "oneliner": "全局规则管个人偏好，项目规则写在 .cursor/rules，存在 .cursorrules 时项目规则优先。",
   "mechanism": [
    "全局规则在 Cursor 设置里配置，对所有项目生效。",
    "项目规则以 .mdc 文件放在 .cursor/rules 目录，随代码库同步。",
    "项目根目录的 .cursorrules 优先级高于全局规则。",
    "实战规则一：已完成且正确的功能不要动，只改当前需求涉及的部分。",
    "实战规则二：注释用中文 UTF-8，先读懂原函数再改，不主动 pip install，不用 mock 数据。"
   ],
   "code": [
    ".cursor/rules：项目级规则目录",
    ".mdc：规则文件格式",
    ".cursorrules：单文件旧格式",
    "WUCAI.md：同类工具的规则文件"
   ],
   "reuse": [
    "新项目第一天就把「不许改无关文件」写进项目规则。",
    "把团队的编码约定、禁用库、注释语言写进规则，减少每轮重复交代。"
   ],
   "interview": "AI 编程的稳定性靠项目级规则约束，全局规则只解决个人习惯。",
   "pitfall": "没有项目规则，AI 每轮顺手改别的文件，还自动装一堆包。",
   "source": "第3章",
   "tags": [
    "Cursor",
    "AI编程",
    "工程规范"
   ]
  },
  {
   "id": "F-12",
   "layer": "F",
   "title": "Cursor 三个入口各管一段",
   "oneliner": "Cmd+I 跨文件生成，Cmd+L 多轮讨论，Cmd+K 改选中片段，Tab 负责行内补全。",
   "mechanism": [
    "Composer/Agent（Cmd+I）同时编辑多个文件，理解项目结构，适合生成完整功能。",
    "聊天（Cmd+L）适合多轮讨论方案和精细调修，不会一上来就改代码。",
    "提示框（Cmd+K）用于生成或修改局部代码。",
    "Tab 补全还能改写已有代码，这是 Cursor 相对 Copilot 的差异点。",
    "Cursor 有文件管理权限，能看到项目下所有文件并创建、编辑。"
   ],
   "code": [
    "Cmd+I：Composer 多文件编辑",
    "Cmd+L：Chat 讨论",
    "Cmd+K：局部改写",
    "Tab：行内补全与改写"
   ],
   "reuse": [
    "需求成型用 Cmd+I，方案没定用 Cmd+L，只改一段用 Cmd+K。",
    "精细调修先让 Chat 给建议和置信度，确认后再动手。"
   ],
   "interview": "Cursor 的效率来自入口分工：多文件生成、方案讨论、局部修改各走各的入口。",
   "pitfall": "用 Cmd+I 做细节微调，AI 连带重写整段代码引入新错误。",
   "source": "第3章",
   "tags": [
    "Cursor",
    "AI编程",
    "工作流"
   ]
  },
  {
   "id": "F-13",
   "layer": "F",
   "title": "AI 编程工具等于模型加编排",
   "oneliner": "决定体验的不只模型，还有系统指令和工具编排；交互速度约等于 token 数。",
   "mechanism": [
    "Wucai 用 qwen3-coder-plus，Claude Code 用 Claude，底层都是 LLM 加工具编排。",
    "Cursor、Trae、Lingma 属于 Code Agent：系统指令加工具，自主多轮调用 LLM。",
    "AI 编程的响应速度大致与输入加输出的 token 数成正比，上下文越长越慢越贵。",
    "长会话用 /clear 或 /compact 压缩历史，减少每轮输入。",
    "Agent 能自主规划：只让它读一张表，它可能顺手把合并也做了。"
   ],
   "code": [
    "Code Agent：系统指令加工具循环",
    "/clear：清空会话",
    "/compact：压缩历史",
    "qwen3-coder-plus：Wucai 的底层模型"
   ],
   "reuse": [
    "把长会话当成本问题管理，定期清理无关上下文。",
    "评估工具时看模型、编排、项目上下文三部分，不只比模型榜。"
   ],
   "interview": "AI 编程工具是模型加编排层，速度受 token 数约束，上下文管理是使用者的基本功。",
   "pitfall": "把所有代码和历史都塞进上下文，越聊越慢还容易跑偏。",
   "source": "第3章",
   "tags": [
    "AI编程",
    "Agent",
    "上下文"
   ]
  },
  {
   "id": "F-14",
   "layer": "F",
   "title": "国产 AI 编程工具按额度与工程能力选",
   "oneliner": "Trae 内置豆包和 DeepSeek 免费，CodeBuddy 个人版免费，Wucai 每天 2000 次。",
   "mechanism": [
    "Trae 是字节的 AI IDE，Builder 模式自主拆解需求，内置 Doubao-1.5-pro 与 DeepSeek-R1/V3，目前免费。",
    "CodeBuddy 基于腾讯混元和 DeepSeek，支持 200 多种语言，兼容 VS Code 与 JetBrains。",
    "CodeBuddy 的 @Codebase 能分析整个项目结构，企业可接自定义知识库。",
    "CodeBuddy 个人版免费，专项版 158 元/人/月，100 人起订。",
    "Wucai Code 命令行安装，用 qwen3-coder-plus，每人每天 2000 次免费交互。"
   ],
   "code": [
    "Trae：Builder 模式",
    "CodeBuddy：@Codebase 项目分析",
    "Wucai Code：命令行工具",
    "qwen3-coder-plus：Wucai 模型"
   ],
   "reuse": [
    "先按团队规模算额度，再看项目级上下文能力。",
    "企业选型重点看能否接内部知识库和私有模型。"
   ],
   "interview": "选 AI 编程工具看三件事：模型能力、免费额度、项目级上下文与知识库。",
   "pitfall": "只看模型榜单选工具，忽略项目级上下文和团队知识库能力。",
   "source": "第3章",
   "tags": [
    "AI编程",
    "工具选型",
    "国产工具"
   ]
  },
  {
   "id": "F-15",
   "layer": "F",
   "title": "AI 做大屏的三个坑：重算、乱码、假数据",
   "oneliner": "页面一直加载多半是每次请求都重算，中文乱码要设字体，AI 爱用 mock 数据冒充真实值。",
   "mechanism": [
    "大屏一直加载的根因是后台每次请求都重新计算，改成提前算好存文件、数据没更新就复用。",
    "预计算后仍要处理加载态：结果文件比源数据新时直接读取。",
    "图表中文乱码要在绘图配置里指定支持中文的字体。",
    "AI 写脚本时常自动生成 mock 数据，员工姓名变成张三李四。",
    "把「禁止 mock 数据」「中文注释 UTF-8」写进项目规则，减少返工。"
   ],
   "code": [
    "Flask：后端接口",
    "ECharts：图表字体配置",
    "pandas：预计算与缓存",
    "WUCAI.md：约束 AI 的项目规则"
   ],
   "reuse": [
    "数据不常变就预计算，页面只读结果文件。",
    "让 AI 交付前先跑一次真实数据，检查有没有 mock 痕迹。"
   ],
   "interview": "AI 做数据应用，性能问题先查重复计算，数据问题先查 mock 和编码。",
   "pitfall": "数据没变还每次请求重算全表，页面永远在加载中。",
   "source": "第3章",
   "tags": [
    "AI编程",
    "数据可视化",
    "性能"
   ]
  },
  {
   "id": "W-01",
   "layer": "W",
   "title": "Agent 由人设、模型、工具、知识库组成",
   "oneliner": "Coze 智能体的能力边界，就看人设、模型、插件或工作流、知识库这四块配得怎么样。",
   "mechanism": [
    "人设与回复逻辑写 Bot 的身份和任务，技能面板挂插件与工作流，右侧预览实时调试。",
    "工具来源有两个：60 多款内置插件（资讯、出行、办公、图片理解）和自建工作流。",
    "知识库支持 TXT、PDF、DOCX、Excel、CSV 上传，也能按 URL 抓取网页。",
    "低代码编排的上限取决于插件和工作流，个性化需求要靠高代码补。",
    "人设里不点名插件时 Bot 可能不调用，要写明「使用 getToutiaoNews 搜索 AI 新闻」。"
   ],
   "code": [
    "Coze：Bot 编排平台",
    "System Prompt：人设与回复逻辑",
    "知识库：文档型与表格型",
    "工作流：多节点编排"
   ],
   "reuse": [
    "先画四块能力清单，再判断哪些能用平台拼、哪些必须写代码。",
    "在系统提示里点名工具名和触发条件。"
   ],
   "interview": "Coze 类平台的 Agent 就是人设、模型、工具、知识库四件套，能力上限由后两者决定。",
   "pitfall": "只写「帮我查新闻」不指定插件，Bot 常凭模型记忆编造。",
   "source": "第4章",
   "tags": [
    "Coze",
    "Agent",
    "低代码"
   ]
  },
  {
   "id": "W-02",
   "layer": "W",
   "title": "一个插件下挂多个工具，但必须同一域名",
   "oneliner": "插件是域名边界，工具是具体 endpoint，同一插件里的 API 必须共用一个域名。",
   "mechanism": [
    "工具就是一个 endpoint。天气插件可有 /current 和 /forecast 两个工具，域名同为 api.weather.com。",
    "创建入口在团队空间：插件、创建插件，填插件 URL 与 Header 列表。",
    "Header 配 Authorization: Bearer $DASHSCOPE_API_KEY 和 Content-Type。",
    "工具路径填完整 endpoint，例如 dashscope.aliyuncs.com/compatible-mode/v1/chat/completions。",
    "输出参数填 role 和 content 后可自动解析，先试运行验证再发布。"
   ],
   "code": [
    "Authorization：Bearer 加 API Key",
    "Content-Type：application/json",
    "DASHSCOPE_API_KEY：Key 存变量不写死",
    "endpoint：工具的实际请求路径"
   ],
   "reuse": [
    "按服务域名拆插件，同一服务下的接口放同一个插件。",
    "Key 一律放环境变量，插件配置里只引用变量名。"
   ],
   "interview": "Coze 插件按域名收口，工具是插件里的具体接口，鉴权放在 Header。",
   "pitfall": "把不同域名的 API 塞进同一个插件，配置阶段就过不了。",
   "source": "第4章",
   "tags": [
    "Coze",
    "插件",
    "API"
   ]
  },
  {
   "id": "W-03",
   "layer": "W",
   "title": "意图识别工作流：大模型打标签，选择器分流",
   "oneliner": "LLM 只输出 1、2、3 这样的意图编号，选择器按编号把数据流送到对应处理节点。",
   "mechanism": [
    "天气意图返回 1，新闻返回 2，其他返回 3，提示词只要求分类，不要求回答。",
    "选择器判断大模型 output 是否包含 1，命中走天气分支，否则进第二个选择器判断 2。",
    "天气分支先用 LLM 从输入提取 lat/lng，再传给 weather 插件的同名参数。",
    "结束节点可设多个输出：output 回传意图，newsItems 引用插件结果。",
    "意图超过两个就再加一层选择器，选择器本质是图形化的 if/else。"
   ],
   "code": [
    "大模型节点：只输出意图编号",
    "选择器节点：按 output 内容分支",
    "lat/lng：从自然语言抽出的参数",
    "结束节点：定义多个返回字段"
   ],
   "reuse": [
    "分类节点只让它分类，参数抽取交给下一个节点。",
    "意图编号从 1 开始连续排，选择器按顺序匹配。"
   ],
   "interview": "工作流里的意图识别要拆成两步：模型只打标签，路由交给选择器。",
   "pitfall": "让一个 LLM 节点同时分类又调工具，分支判断会不稳定。",
   "source": "第4章",
   "tags": [
    "Coze",
    "工作流",
    "意图识别"
   ]
  },
  {
   "id": "W-04",
   "layer": "W",
   "title": "知识库效果由切分方式和检索策略决定",
   "oneliner": "RAG 先切分入库再检索生成，切分粒度错了，后面模型再强也救不回召回质量。",
   "mechanism": [
    "RAG 分检索和生成两段：编码模型按问题召回文档，再用召回内容作条件生成。",
    "扣子支持自动分段，也可自定义分段：标识符设为 ###，长度设为 2000。",
    "功能文档可人工在每个场景前加 ###，让切分沿着场景边界走。",
    "表格类数据按表格格式建库并建索引；Coze 用 SQL 精确查询，Dify 用 embedding 模糊查询。",
    "搜索策略可设混合，上传资料优先于模型自身知识被用于作答。"
   ],
   "code": [
    "###：自定义分段标识符",
    "chunk 长度 2000：分段大小",
    "混合检索：关键词加向量",
    "SQL 查询：表格型知识库"
   ],
   "reuse": [
    "有固定结构的文档，先在源文件里加分隔符再上传。",
    "表格数据单独建表格型知识库，不要混进文档库。"
   ],
   "interview": "知识库效果的第一道关是切分，第二道关是检索策略，模型能力排在后面。",
   "pitfall": "长文档直接自动分段，一个操作步骤被切断，答案就缺半截。",
   "source": "第4章",
   "tags": [
    "Coze",
    "知识库",
    "RAG"
   ]
  },
  {
   "id": "W-05",
   "layer": "W",
   "title": "同类任务多时用批处理，一次铺开 N 份",
   "oneliner": "把列表交给批处理节点，每个 item 各跑一次大模型或插件，四张图一次出。",
   "mechanism": [
    "先让大模型把古诗拆成场景 1 到场景 4，代码节点用正则 r'场景\\d+：([^场景]+)' 切出列表。",
    "代码节点输出 scenes 数组和 scene_count 计数，供下游批处理使用。",
    "下游大模型节点选批处理模式，输入引用 item1，为每个场景各写一条文生图提示词。",
    "text2image 插件也选批处理，item1 设为上游 outputList，prompt 引用自身 item1。",
    "结束节点 output 引用插件 outputList，一次返回 4 张图；Dify 没有批处理，迁移要另想办法。"
   ],
   "code": [
    "批处理：按 item 并行执行节点",
    "re.finditer：正则切出场景列表",
    "outputList：批处理结果数组",
    "item1：当前迭代元素"
   ],
   "reuse": [
    "先让模型输出结构化列表，再用批处理铺开。",
    "跨平台迁移前确认目标平台有没有批处理节点。"
   ],
   "interview": "批量生成拆两步：模型产出列表，批处理节点按 item 并行执行。",
   "pitfall": "把 4 个场景串成一条提示词丢给文生图，只会出一张混杂的图。",
   "source": "第5章",
   "tags": [
    "Coze",
    "批处理",
    "工作流"
   ]
  },
  {
   "id": "W-06",
   "layer": "W",
   "title": "Coze 应用由工作流、数据表、页面拼成",
   "oneliner": "工作流管逻辑，数据表管存储，页面管交互，三者靠变量名对接成可交付应用。",
   "mechanism": [
    "表单组件左上角的名称就是变量名，提交事件的 Workflow 入参按名称取值。",
    "提交按钮新建事件关联工作流 product_rec，结果页文本绑定 {{product_rec.data}}。",
    "结束节点打开流式输出、大模型输出选 Markdown，页面上才能边生成边显示。",
    "风险评测结果写入数据表 client_risk_assessment，字段为 client_id、age、exp_level、risk_tolerance。",
    "推荐规则写进提示词：R1/R2/R3 对应风险偏好 A/B/C，exp_level=1 不推复杂衍生品。"
   ],
   "code": [
    "client_risk_assessment：结果数据表",
    "product_rec：推荐工作流",
    "{{product_rec.data}}：页面绑定变量",
    "流式输出：结束节点开关"
   ],
   "reuse": [
    "先定数据表字段，再让工作流和页面按字段名对接。",
    "结果页统一用 Markdown 渲染，保留模型排版。"
   ],
   "interview": "Coze 应用是三件套：工作流做逻辑、数据表做存储、页面做交互，变量名是连接件。",
   "pitfall": "表单变量名和工作流入参不一致，点提交后工作流拿不到值。",
   "source": "第5章",
   "tags": [
    "Coze",
    "应用开发",
    "数据表"
   ]
  },
  {
   "id": "W-07",
   "layer": "W",
   "title": "客户分层：先查画像，再定标签，最后配策略",
   "oneliner": "标签表定人群、行为表定时点，模型两段 SQL 查完再去策略库匹配营销动作。",
   "mechanism": [
    "user_tag 存 asset_scale、trading_frequency、risk_preference 三个画像字段。",
    "user_behavior_event 存 event_time、event_type、event_detail，记录登录、点击 banner 等行为。",
    "模型先查 user_tag 的资产规模、交易频率、风险偏好。",
    "再查近 10 条行为：ORDER BY event_time DESC LIMIT 10。",
    "营销策略表建表格知识库并全字段设索引，按标签匹配时机、渠道、话术。"
   ],
   "code": [
    "user_tag：客户画像表",
    "user_behavior_event：行为事件表",
    "ORDER BY event_time DESC LIMIT 10：取最近行为",
    "营销策略.xlsx：策略知识库"
   ],
   "reuse": [
    "分层先定三类字段：资产、活跃度、风险偏好。",
    "策略库按标签建索引，模型只做检索。"
   ],
   "interview": "客户分层做两段查询：画像定人群，行为定时点，策略靠知识库匹配。",
   "pitfall": "让模型凭标签直接编策略，不查行为表，时机和渠道对不上真实场景。",
   "source": "第5章",
   "tags": [
    "Coze",
    "客户分层",
    "SQL"
   ]
  },
  {
   "id": "W-08",
   "layer": "W",
   "title": "多 Agent 客服：分诊台只做路由",
   "oneliner": "主 Agent 只判断问题类型并转派，营销专员和投诉专员各自挂自己的知识和数据。",
   "mechanism": [
    "多 Agents 模式下配一个分诊台加两个专员：营销专员管产品咨询，投诉专员管投诉。",
    "分诊台提示词明确写「不做任何回复，只转给适合的 Agent」，并列出各自触发条件。",
    "投诉专员查 user_behavior_event 时，event_time 是带时间的字符串，按某天筛要用大于小于。",
    "核实确有异常后才写入 user_complain，complain_type 取产品使用、系统故障、业务办理之一。",
    "营销专员挂证券知识库，解析用快速解析，分段用自动分段与清洗。"
   ],
   "code": [
    "多 Agents：分诊台加专员",
    "user_behavior_event：行为核对表",
    "user_complain：投诉落库表",
    "证券知识库：营销专员挂载"
   ],
   "reuse": [
    "分诊台的提示词只写路由规则，不写业务话术。",
    "每个专员只挂自己领域的知识库，减少串台。"
   ],
   "interview": "多 Agent 客服的关键是分诊台只路由不回答，专员各自带知识和数据。",
   "pitfall": "分诊台自己回答用户问题，规则和专员不一致，还会漏掉路由。",
   "source": "第5章",
   "tags": [
    "Coze",
    "多Agent",
    "客服"
   ]
  },
  {
   "id": "W-09",
   "layer": "W",
   "title": "长流程拆子工作流，主流程只负责串起来",
   "oneliner": "舆情监测拆成抓数、评论分析、日报三个工作流，对外只暴露一个总入口。",
   "mechanism": [
    "Securities 主工作流调用两个子工作流：AppStoreEstimate 抓评论分析，GenerateDailyReports 出日报。",
    "子工作流开始节点的 input 由父工作流传入，对外只需调用 Securities 一个。",
    "securities_past 插件直接请求新浪 feed 接口 api/roll/get，参数 pageid=186、lid=1746。",
    "AppStore 评论走 RSS：itunes.apple.com/cn/rss/customerreviews，目标 app_id 为 1042567321。",
    "词云插件只吃字符串，列表要先过文本处理节点拼接，否则报错。"
   ],
   "code": [
    "Securities：主工作流",
    "AppStoreEstimate：评论分析子流程",
    "GenerateDailyReports：日报子流程",
    "create_document：生成 PDF 的插件"
   ],
   "reuse": [
    "按「抓数、分析、出报告」拆子流程，主流程只连节点。",
    "子流程入参用开始节点声明，父流程按名字传值。"
   ],
   "interview": "复杂工作流按阶段拆子流程，父流程只负责编排，改一段不用重测全链。",
   "pitfall": "把全流程塞进一个工作流，改一处就要重测整条链。",
   "source": "第5章",
   "tags": [
    "Coze",
    "工作流",
    "舆情监测"
   ]
  },
  {
   "id": "W-10",
   "layer": "W",
   "title": "Dify 五种应用类型，选错形态后面全别扭",
   "oneliner": "要记忆和多轮对话选 Chatflow，要批处理单轮出结果选 Workflow。",
   "mechanism": [
    "五种类型：聊天助手、文本生成、Agent、对话流 Chatflow、工作流 Workflow。",
    "Chatflow 支持多轮与记忆，有 Answer 节点可在流程中间流式输出文本。",
    "Workflow 面向自动化、批处理等单轮任务，单向出结果，不保留对话状态。",
    "Chatflow 适合智能客服、语义搜索、AI 助教；Workflow 适合数据处理与内容生成。",
    "Dify 比 LangChain 更容易上手，适合业务侧自己搭流程。"
   ],
   "code": [
    "Chatflow：多轮对话流",
    "Workflow：单轮自动化",
    "Answer 节点：流程中间输出",
    "Agent：自主工具调用"
   ],
   "reuse": [
    "先问要不要记忆和多轮，再选 Chatflow 或 Workflow。",
    "批处理、定时任务一律用 Workflow。"
   ],
   "interview": "Dify 选型先看对话状态：要记忆选 Chatflow，单轮批处理选 Workflow。",
   "pitfall": "客服场景选了 Workflow，用户追问一次就丢上下文。",
   "source": "第6章",
   "tags": [
    "Dify",
    "应用类型",
    "选型"
   ]
  },
  {
   "id": "W-11",
   "layer": "W",
   "title": "Dify 本地部署四步，更新也是三条命令",
   "oneliner": "克隆仓库、复制 .env、docker compose up -d，三条命令完成社区版完整部署。",
   "mechanism": [
    "git clone langgenius/dify 仓库，进 dify/docker 后 cp .env.example .env。",
    ".env 里至少改 APP_URL，它决定访问地址，本地通常是 http://localhost 或本机 IP。",
    "docker compose up -d 后台启动，-d 表示脱离终端运行。",
    "首次访问 http://IP/install 设管理员，之后访问 http://IP 进入主页面。",
    "更新依次执行 git pull、docker compose pull、docker compose up -d。"
   ],
   "code": [
    "git clone：拉取仓库",
    "cp .env.example .env：准备配置",
    "docker compose up -d：后台启动",
    "APP_URL：访问地址配置"
   ],
   "reuse": [
    "内网隔离环境把模型也换成本地服务，数据不出网。",
    "升级前备份 .env 和卷数据，再拉新镜像。"
   ],
   "interview": "Dify 社区版本地部署就是克隆、配置、compose 三步，更新用 pull 加 up。",
   "pitfall": "只 clone 不复制 .env，启动时缺配置项，容器反复重启。",
   "source": "第6章",
   "tags": [
    "Dify",
    "部署",
    "Docker"
   ]
  },
  {
   "id": "W-12",
   "layer": "W",
   "title": "Dify 投诉流程：先抽字段，再检索比对",
   "oneliner": "分类器分流后，LLM 把用户信息抽成 user_id 和 event_type，再去用户库检索核对。",
   "mechanism": [
    "问题分类器分三类：营销咨询、投诉处理、其他；其他类直接回「抱歉，这些问题我无法回答」。",
    "投诉分支先用 LLM 抽 user_id、event_time、event_type，缺失字段置 null。",
    "用户数据以 Excel 导入知识库，检索用混合检索，TopK 适当调大。",
    "检索结果可能含他人记录，提示词要求只采用与 user_id 匹配的信息。",
    "分段重叠常见 10% 到 20%；gte-rerank 提升排序但增加延迟；Score 阈值随 embedding 模型而定。"
   ],
   "code": [
    "问题分类器：三类分流",
    "{{#context#}}：注入检索上下文",
    "混合检索：关键词加向量",
    "gte-rerank：重排模型"
   ],
   "reuse": [
    "投诉类流程先抽身份字段，再按身份过滤检索结果。",
    "检索结果进提示词前写死「只用匹配 user_id 的记录」。"
   ],
   "interview": "投诉处理要先做身份抽取和过滤，否则模型会把别人的记录答给用户。",
   "pitfall": "把用户 Excel 整表丢给模型，不做 user_id 过滤，会答出别人的记录。",
   "source": "第6章",
   "tags": [
    "Dify",
    "客服",
    "检索"
   ]
  },
  {
   "id": "W-13",
   "layer": "W",
   "title": "Dify 三种端点，按应用类型选对路径",
   "oneliner": "聊天、文本生成、工作流各有一条 API 路径，参数格式不能混用。",
   "mechanism": [
    "/chat-messages 给对话型应用，带 conversation_id 可续上下文。",
    "/completion-messages 给文本生成应用，单次完成，inputs 通常是空对象。",
    "/workflows/run 给工作流应用，inputs 传参数，工作流必须先发布。",
    "响应模式 response_mode 取 streaming 或 blocking。",
    "自动探测按聊天、完成、工作流顺序试，靠 not_chat_app、app_unavailable 错误码降级。"
   ],
   "code": [
    "/chat-messages：对话型",
    "/completion-messages：文本生成",
    "/workflows/run：工作流",
    "response_mode：streaming 或 blocking"
   ],
   "reuse": [
    "调用前先确认应用类型，再选端点。",
    "API Key 在应用内「访问 API」创建，用 Bearer 认证。"
   ],
   "interview": "Dify 的 API 按应用形态分三条路径，工作流还要先发布才能调。",
   "pitfall": "拿工作流的 inputs 格式去调聊天端点，参数对不上直接报错。",
   "source": "第6章",
   "tags": [
    "Dify",
    "API",
    "集成"
   ]
  },
  {
   "id": "W-14",
   "layer": "W",
   "title": "cozepy 三步调通 Coze 智能体",
   "oneliner": "拿到 PAT 和 bot_id，初始化客户端，流式监听事件，就能把 Coze Bot 接进自己的程序。",
   "mechanism": [
    "准备 API Token（coze.cn/open/oauth/pats 建 PAT）和 bot_id（智能体 URL 末段）。",
    "初始化 Coze(auth=TokenAuth(token=...), base_url=COZE_CN_BASE_URL)。",
    "非流式用 chat.create_and_poll，状态为 ChatStatus.COMPLETED 后取 assistant 消息。",
    "流式用 chat.stream，监听 CONVERSATION_MESSAGE_DELTA 事件逐段打印。",
    "cozepy 支持同步、异步、流式输出与分页查询。"
   ],
   "code": [
    "cozepy：Coze Python SDK",
    "TokenAuth：PAT 鉴权",
    "create_and_poll：非流式调用",
    "chat.stream：流式事件"
   ],
   "reuse": [
    "PAT 放环境变量，bot_id 从智能体 URL 取。",
    "需要打字机效果就用 stream，后台任务用 create_and_poll。"
   ],
   "interview": "cozepy 接入 Coze 就三步：鉴权、初始化、按需选轮询或流式。",
   "pitfall": "把 bot_id 和插件 ID 搞混，或 token 权限没开，请求直接鉴权失败。",
   "source": "第6章",
   "tags": [
    "Coze",
    "SDK",
    "API"
   ]
  },
  {
   "id": "V-01",
   "layer": "V",
   "title": "Embedding 把稀疏词袋压成稠密向量",
   "oneliner": "152 家酒店、3347 个 n-gram 特征，词频矩阵大量为 0，Embedding 换成固定维度稠密向量。",
   "mechanism": [
    "152 家西雅图酒店，1、2、3-gram 特征合计 3347 个，TF-IDF 矩阵形状 152×3347，大量取值为 0。",
    "余弦相似度只看方向：同向为 1，夹角 90° 为 0，完全反向为 -1。",
    "两个句子的词频向量算得余弦相似度 0.738，接近 1 即判定语义相似。",
    "Word2Vec 学的是输入层到隐藏层的权值矩阵，大小 [vocab_size, hidden_size]，本质是一张查找表。",
    "Skip-Gram 用中心词预测上下文，CBOW 用上下文预测中心词，两者方向相反。"
   ],
   "code": [
    "CountVectorizer：词频矩阵",
    "TfidfVectorizer：TF-IDF 特征",
    "linear_kernel：余弦相似度",
    "gensim word2vec：训练词向量"
   ],
   "reuse": [
    "小语料先跑词袋基线，再换 embedding 比较效果。",
    "相似度任务统一用余弦，先归一化再算内积。"
   ],
   "interview": "Embedding 解决稀疏词袋维度高、语义弱的问题，把词或句子压成固定长度稠密向量。",
   "pitfall": "拿原始词袋特征直接算相似度，维度高、矩阵稀疏，存储和计算都贵。",
   "source": "第12章",
   "tags": [
    "Embedding",
    "相似度",
    "Word2Vec"
   ]
  },
  {
   "id": "V-02",
   "layer": "V",
   "title": "MTEB 分 8 类任务，选型不能只看排名",
   "oneliner": "MTEB 覆盖 8 大类、58 个数据集，业务选型要另建黄金测试集做小范围对比。",
   "mechanism": [
    "MTEB 含检索、语义文本相似度、重排序、分类、聚类、成对分类、双语挖掘、摘要 8 类任务。",
    "重排序是对已检索出的文档列表做二次排序，发生在 embedding 检索之后。",
    "选型第一步定指标：检索看 Recall@K，分类看 Accuracy，排序看 NDCG。",
    "第二步准备问题与标准答案对作为金标准，第三步从榜单挑候选模型实测。",
    "最终决策还要叠加推理速度和部署成本。"
   ],
   "code": [
    "MTEB：embedding 评测榜单",
    "Recall@K：检索指标",
    "NDCG：排序指标",
    "mteb/leaderboard：HuggingFace 榜单页"
   ],
   "reuse": [
    "先用榜单缩小候选，再用自己的 50 到 100 条样本定选型。",
    "把推理延迟和显存一起记进选型表。"
   ],
   "interview": "榜单只用来筛候选，最终选型要用业务样本跑 Recall@K 和延迟。",
   "pitfall": "照榜单综合分选模型，不测自己业务数据的分布。",
   "source": "第12章",
   "tags": [
    "Embedding",
    "评测",
    "选型"
   ]
  },
  {
   "id": "V-03",
   "layer": "V",
   "title": "升维收益不到 1% 就该放弃",
   "oneliner": "768 维拉到 1024 维，指标提升不到 1%，内存多占约 35%；压缩后跌超 5% 才值得保留高维。",
   "mechanism": [
    "1024、4096 维语义编码更细，适合大规模检索和细粒度分类，计算与存储成本更高。",
    "256、512 维计算快、内存小，适合移动端和实时性要求高的场景。",
    "768 维升到 1024 维，检索指标提高不到 1%，内存多占约 35%。",
    "反过来压到 768 维后指标下降超过 5%，说明信息损失大，应保留更高维度。",
    "维度选择要同时看效果、显存和检索延迟。"
   ],
   "code": [
    "dimensions：部分模型支持的输出维度参数",
    "embedding_size：截断维度",
    "IndexFlatL2：维度直接影响内存"
   ],
   "reuse": [
    "升维前先算存储涨幅，再跑一次小测试集。",
    "降维后指标跌 5% 以内可以接受。"
   ],
   "interview": "向量维度是成本和效果的交换，收益不到 1% 的升维不值得多付 35% 内存。",
   "pitfall": "默认维度越高效果越好，所有场景直接上最大维度。",
   "source": "第12章",
   "tags": [
    "Embedding",
    "维度",
    "成本"
   ]
  },
  {
   "id": "V-04",
   "layer": "V",
   "title": "MRL 让一个向量按需截断成不同长度",
   "oneliner": "Jina v4 默认 2048 维，前 128、256、512 维各自可用，按 embedding_size 截断。",
   "mechanism": [
    "Jina-embeddings-v4 基础模型 Qwen2.5-VL-3B-Instruct，最大序列 32768，单向量 2048 维。",
    "Matryoshka Representation Learning 训练出的长向量，前 128、256、512 维本身就是可用的短向量。",
    "调用时用 embedding_size 指定返回前 N 维，截断后性能损失较小。",
    "社交评论短、要实时，用 128 维；投资分析报告术语密集、要精准，用 2048 维。",
    "支持截断的维度：128、256、512、1024、2048，池化策略为平均池化。"
   ],
   "code": [
    "jina-embeddings-v4：支持 MRL 的模型",
    "embedding_size：返回前 N 维",
    "平均池化：多向量合成单向量"
   ],
   "reuse": [
    "同一模型按场景选维度，短文本走低维省成本。",
    "迁移前确认模型是否真用 MRL 训练，否则截断会掉点。"
   ],
   "interview": "MRL 让一个模型输出多种长度，短文本用低维、长文档用高维，存储和精度可以分场景调。",
   "pitfall": "所有场景统一用 2048 维，短文本检索白付存储和算力。",
   "source": "第12章",
   "tags": [
    "Embedding",
    "MRL",
    "Jina"
   ]
  },
  {
   "id": "V-05",
   "layer": "V",
   "title": "FAISS 只存向量，元数据要靠 ID 外挂",
   "oneliner": "FAISS 不存元数据，用 IndexIDMap 给向量分配 64 位整数 ID，再拿 ID 去外部表查原文。",
   "mechanism": [
    "IndexFlatL2 建 L2 欧氏距离精确索引，IndexIDMap 包装后可用 add_with_ids 写入自定义 ID。",
    "search 返回 distances 和 ids，id 为 -1 表示没有更多结果。",
    "示例里 0.3222、1.0135 是距离不是相似度，距离越小越相似。",
    "生产环境把 metadata_store 换成 Redis 按 ID 快查、PostgreSQL 存结构化字段、MongoDB 存 JSON。",
    "案例规模：4 条文档、1024 维、k=3，第一条命中在线退票政策，距离 0.3222。"
   ],
   "code": [
    "faiss.IndexFlatL2：精确 L2 索引",
    "faiss.IndexIDMap：包装后可写自定义 ID",
    "add_with_ids：写入向量与 ID",
    "index.search：返回 distances 与 ids"
   ],
   "reuse": [
    "向量库只存 ID、向量和少量过滤字段，原文放业务库。",
    "把 -1 当成「没有更多结果」处理，不要当有效 ID。"
   ],
   "interview": "FAISS 是向量检索引擎，不负责存原文，工程上要用 ID 把向量和业务数据接起来。",
   "pitfall": "想把原文和元数据一起塞进 FAISS，忘了它只管向量检索。",
   "source": "第12章",
   "tags": [
    "FAISS",
    "向量库",
    "检索"
   ]
  },
  {
   "id": "V-06",
   "layer": "V",
   "title": "单语言求精准，多语言求统一空间",
   "oneliner": "bge-large-zh 中文更准；bge-m3 把 100 多种语言映射到同一向量空间。",
   "mechanism": [
    "单语言模型如 BGE-large-zh 专门针对中文训练，理解「七天无理由退货」这类表述更深入。",
    "多语言模型把不同语言放进统一语义空间，clean room、部屋が綺麗、干净的房间向量彼此接近。",
    "总部用英文查「Loud music at night」，能同时召回日文和中文写的同类评论。",
    "bge-m3 支持 100 多种语言、8192 token 输入，融合密集、稀疏、多向量检索，文件 2.3G。",
    "m3e-base 是中文优化轻量模型，文件 0.4G，适合本地私有化部署。"
   ],
   "code": [
    "bge-large-zh：中文单语言",
    "bge-m3：多语言，8192 token",
    "m3e-base：轻量中文模型",
    "multilingual-e5-large：多语言基线"
   ],
   "reuse": [
    "语料以中文为主且术语密集，先测单语言模型。",
    "有跨境或多语种检索需求，再上多语言统一空间。"
   ],
   "interview": "单语言模型在母语数据上更准，多语言模型胜在跨语种召回，选型看语料构成。",
   "pitfall": "中文业务直接套英文优先模型，放弃单语言模型在中文上的优势。",
   "source": "第12章",
   "tags": [
    "Embedding",
    "多语言",
    "模型选型"
   ]
  },
  {
   "id": "D-01",
   "layer": "D",
   "title": "准确率 99.9% 不等于患病概率 99.9%",
   "oneliner": "万分之一的病、99.9% 准确率、0.1% 假阳，查出阳性后真实患病约 9%。",
   "mechanism": [
    "发病率万分之一：1 万人里 1 个真患者，0.1% 假阳会误诊 10 人，阳性者共 11 人。",
    "P(病且阳)=0.01%×99.9%≈0.01%，P(无病且阳)=99.99%×0.1%≈0.1%。",
    "P(病|阳)=0.01%/(0.01%+0.1%)≈9%，分母是归一化常数。",
    "贝叶斯公式：后验概率正比于先验概率乘以似然函数。",
    "低基率场景里，假阳数量会淹没真阳，准确率再高也救不回阳性预测值。"
   ],
   "code": [
    "P(B1|A)=P(B1)P(A|B1)/P(A)：后验概率",
    "P(A)=P(B1)P(A|B1)+P(B2)P(A|B2)：全概率展开"
   ],
   "reuse": [
    "医疗、风控、反欺诈先看先验发生率，再看模型准确率。",
    "汇报指标时同时给 PPV 和召回，避免把准确率当患病概率。"
   ],
   "interview": "低基率场景下阳性预测值远低于准确率，因为假阳的绝对数量压过了真阳。",
   "pitfall": "把检测准确率直接当成患病概率，忽略极低的先验。",
   "source": "第7章",
   "tags": [
    "贝叶斯",
    "评估指标",
    "风控"
   ]
  },
  {
   "id": "D-02",
   "layer": "D",
   "title": "朴素贝叶斯按特征类型选三种变体",
   "oneliner": "连续特征用 GaussianNB，词频用 MultinomialNB，0/1 出现用 BernoulliNB。",
   "mechanism": [
    "朴素贝叶斯假设各输入变量独立，这个强假设在文本分类等问题上仍然有效。",
    "GaussianNB 用均值和方差拟合正态密度，例如身高 180 对应概率 0.1069。",
    "MultinomialNB 用于离散计数或 TF-IDF，alpha=1 就是拉普拉斯平滑。",
    "BernoulliNB 用于布尔特征，文档分类里表示某个词是否出现。",
    "忘记平滑会出零概率，一个没见过的词就能把整类概率打成 0。"
   ],
   "code": [
    "GaussianNB：连续特征",
    "MultinomialNB(alpha=1)：计数特征",
    "BernoulliNB：0/1 特征",
    "stats.norm.pdf：手算正态密度"
   ],
   "reuse": [
    "先看特征是连续、计数还是布尔，再对应 sklearn 的三个类。",
    "文本基线先跑 MultinomialNB 加 TF-IDF，成本低。"
   ],
   "interview": "朴素贝叶斯选型只看特征类型：连续走高斯，计数走多项式，布尔走伯努利。",
   "pitfall": "把连续身高体重丢进 MultinomialNB，或忘记 alpha 平滑导致零概率。",
   "source": "第7章",
   "tags": [
    "朴素贝叶斯",
    "分类",
    "sklearn"
   ]
  },
  {
   "id": "D-03",
   "layer": "D",
   "title": "二手车价格预测五步，MAE 靠特征工程下降",
   "oneliner": "同一份数据，无特征工程加 LR 的 MAE 约 1000，特征工程加 XGBoost 约 550。",
   "mechanism": [
    "流程固定五步：数据加载、EDA 看缺失与标签分布、特征选择、模型训练、预测写 submission。",
    "原始 csv 空格分隔；15 万条按 13 万训练、2 万验证切分，验证集 MAE 用来判断过拟合。",
    "评价指标 MAE 是 L1 loss，越小越好；训练时可直接把 eval_metric 改成 mae。",
    "XGBoost 常用 learning_rate=0.1、max_depth=15、subsample=0.8、n_estimators=2000。",
    "本地 MAE 546、提交 548 属正常；本地一百多而提交几千，先查 ID 类泄漏特征。"
   ],
   "code": [
    "XGBoost：n_estimators=2000",
    "tree_method='gpu_hist'：GPU 训练",
    "eval_metric='mae'：对齐赛题指标",
    "CatBoost：类别特征原生处理"
   ],
   "reuse": [
    "先把验证集切法写死，再谈模型和调参。",
    "MAE 卡住时先补特征，调参只能逼近特征给出的上限。"
   ],
   "interview": "建模按加载、EDA、特征、训练、预测五步答，并说明验证集切分和指标口径。",
   "pitfall": "反复调参追 MAE，不动特征；特征决定上限，调参只把上限跑出来。",
   "source": "第8章",
   "tags": [
    "建模流程",
    "XGBoost",
    "MAE"
   ]
  },
  {
   "id": "D-04",
   "layer": "D",
   "title": "统计特征只用训练集算，否则测试集信息泄漏",
   "oneliner": "品牌均价、中位价、标准差、样本数都只用 train_idx 统计，再 merge 回全量。",
   "mechanism": [
    "缺失值先加 _missing 二值标记，再用中位数填充，缺失本身可能是信号。",
    "异常值用 5% 和 95% 分位取 Q1/Q3，1.5 倍 IQR 标记后 clip 截断。",
    "时间特征：regDate 与 creatDate 转日期，算车龄天数、每年公里数、季节、车龄分段。",
    "高基数类别用频率编码 groupby(col).size()/len(data)，替代 one-hot 避免维度爆炸。",
    "CatBoost 用 category 类型原生学类别交互，品牌加车型加车龄分段不必手造。"
   ],
   "code": [
    "groupby(col).size()：频率编码",
    "quantile(0.05/0.95)：异常值边界",
    "clip：截断异常值",
    "CatBoost cat_features：原生类别特征"
   ],
   "reuse": [
    "所有 groupby 统计先切出训练集索引，算完再 merge。",
    "缺失值保留标记列，别直接填掉了信号。"
   ],
   "interview": "特征工程分时间、属性、统计、编码四类，统计类必须只用训练集，否则泄漏。",
   "pitfall": "用全量数据算品牌均价再喂给模型，测试集价格泄漏进训练。",
   "source": "第8章",
   "tags": [
    "特征工程",
    "数据泄漏",
    "编码"
   ]
  },
  {
   "id": "D-05",
   "layer": "D",
   "title": "评分卡分 A/B/C 三卡，数据源随阶段变化",
   "oneliner": "A 卡用外部征信，B 卡用平台历史表现，C 卡用催收记录，越往后越省钱。",
   "mechanism": [
    "A 卡贷前申请、B 卡贷中行为、C 卡贷后催收，分别对应申请、行为、催收评分卡。",
    "复贷用户已有平台历史表现，B 卡不再查外部征信，省成本。",
    "评分等于基准分 650 加年龄、性别、婚姻、学历、贷款申请次数，示例 27 岁已婚本科得 695。",
    "分数区间 630 到 700；阈值小于 400 自动拒贷，400 到 600 人工审核，大于 600 进信审。",
    "风控建模常用二分类逻辑回归加 WoE 证据权重，每项变量有权重。"
   ],
   "code": [
    "评分卡：基准分加变量分",
    "WoE：证据权重编码",
    "逻辑回归：可解释二分类"
   ],
   "reuse": [
    "按贷前、贷中、贷后拆模型，数据源不同，成本也不同。",
    "强监管场景优先可解释结构，别直接上黑盒。"
   ],
   "interview": "评分卡先讲 A/B/C 卡的数据源差异，再讲基准分加变量分的可解释结构。",
   "pitfall": "B 卡 C 卡重复查询外部征信，成本上升且对区分度没有帮助。",
   "source": "第8章",
   "tags": [
    "风控",
    "评分卡",
    "可解释性"
   ]
  },
  {
   "id": "D-06",
   "layer": "D",
   "title": "ARIMA 先差分到平稳，再用 ARMA 拟合",
   "oneliner": "ARIMA(p,d,q) 比 ARMA 多一个差分阶数，用 ADF 检验判断要不要差分。",
   "mechanism": [
    "AR(p) 用前 p 个时刻的线性组合加白噪声；MA(q) 用历史白噪声的线性组合。",
    "ARIMA 多一个 d：对非平稳序列做 d 阶差分，平稳后按 ARMA 建模，预测后再还原。",
    "差分示例 [1,4,9,16,25] 一次差分 [3,5,7,9,11] 仍上升，二次差分 [2,2,2,2] 才平稳。",
    "ADF 原假设是存在单位根即不平稳，t 统计量小于三个临界值才拒绝原假设。",
    "案例 t=-1.58988 大于三个临界值，无法拒绝，需一阶差分后再检验。"
   ],
   "code": [
    "statsmodels ARIMA：p,d,q 建模",
    "adfuller：ADF 平稳性检验",
    "diff()：差分与还原"
   ],
   "reuse": [
    "先画图看趋势和季节，再决定差分阶数。",
    "预测结果记得逆差分回原尺度。"
   ],
   "interview": "ARIMA 讲三步：ADF 判平稳、d 阶差分、p/q 定阶，最后把预测还原。",
   "pitfall": "不做 ADF 检验直接套 ARIMA，或预测后忘记把差分结果还原。",
   "source": "第9章",
   "tags": [
    "时间序列",
    "ARIMA",
    "平稳性"
   ]
  },
  {
   "id": "D-07",
   "layer": "D",
   "title": "p 和 q 不手拍，用 AIC 网格搜索取最小",
   "oneliner": "ps、qs 各取 0 到 2 共 9 组，逐个拟合取 AIC 最小，比凭经验定阶可靠。",
   "mechanism": [
    "AIC 是赤池信息准则，衡量统计模型拟合好坏，数值越小越好。",
    "ARMA(data,(p,q)).fit() 后读 model.aic，循环里用 best_aic 记录最小值。",
    "示例对比：ARIMA(2,0,2) AIC 4593.911，SARIMAX(1,1,4) AIC 4511.524 更优。",
    "参数非法时 statsmodels 抛 ValueError，循环里 try/except 跳过继续。",
    "预测未来 3 个月先构造 date_list，再 concat 空行后用 predict 取 predicted_mean。"
   ],
   "code": [
    "itertools.product：遍历 p、q 组合",
    "model.aic：比较拟合优度",
    "SARIMAX：带季节项",
    "get_prediction().predicted_mean：预测值"
   ],
   "reuse": [
    "定阶用小网格搜索，别在 0 到 10 全量暴力跑。",
    "AIC 相近时优先简单模型，泛化更稳。"
   ],
   "interview": "ARIMA 调参一句话：p、q 网格搜索，AIC 最小者为最优。",
   "pitfall": "阶数凭感觉定，或只看训练误差不看 AIC。",
   "source": "第9章",
   "tags": [
    "时间序列",
    "AIC",
    "调参"
   ]
  },
  {
   "id": "D-08",
   "layer": "D",
   "title": "周期因子法：base 乘以星期因子预测每日流量",
   "oneliner": "各星期均值除以整体均值得到因子，base 乘因子即预测，比纯 ARIMA 更贴周规律。",
   "mechanism": [
    "周一因子 0.22、周五 2.50；base=100 时第四周周一 22、周五 250。",
    "算法：算周一至周日均值，除以整体均值得因子，再用 base 乘因子。",
    "base 可三周平均，也可用增长率外推：(base2-base1)/base1。",
    "预测下月按 1 到 30 号均值乘 day 因子，weekday 与 day 因子可再相乘。",
    "ARIMA(7,1,5) 没利用周一到周日规律，也没考虑节假日与利率波动节点。"
   ],
   "code": [
    "pandas.resample：按周聚合",
    "groupby(weekday).mean()：星期均值",
    "base×factor：周期因子预测"
   ],
   "reuse": [
    "先画按周聚合曲线，周规律明显就直接上周期因子。",
    "节假日单独做一张日期表修正，别混进星期因子。"
   ],
   "interview": "时序有强周规律时，周期因子比 ARIMA 更稳，每个因子都能解释。",
   "pitfall": "只上 ARIMA，不看清明五一中秋国庆等特殊日期。",
   "source": "第9章",
   "tags": [
    "时间序列",
    "周期因子",
    "业务预测"
   ]
  },
  {
   "id": "D-09",
   "layer": "D",
   "title": "深层网络别用 sigmoid，改用 ReLU",
   "oneliner": "sigmoid 导数最大 0.25，每反传一层梯度至少缩到四分之一，深层几乎不更新。",
   "mechanism": [
    "sigmoid 输出在 0 到 1，导数 f(x)(1-f(x))，最大值 0.25。",
    "权重在 0 到 1 之间时，每传一层梯度乘 0.25，层数一多梯度趋近 0。",
    "权重初始化过大时梯度逐层放大，出现梯度爆炸。",
    "ReLU 把负输入置 0，正输入梯度恒为 1，误差可以无衰减回传。",
    "tanh 值域 -1 到 1 且零中心，比 sigmoid 收敛快，但仍会梯度消失。"
   ],
   "code": [
    "nn.ReLU：隐藏层激活",
    "sigmoid：只用于二分类输出层",
    "tanh：小网络或 RNN 门控"
   ],
   "reuse": [
    "深层主干默认 ReLU 或 GELU，sigmoid 留给输出层。",
    "训练不收敛先查激活函数和初始化，再怀疑数据。"
   ],
   "interview": "梯度消失的根因是导数小于 1 连乘，ReLU 把正区间导数固定为 1。",
   "pitfall": "10 层以上网络全用 sigmoid，训练几轮 loss 就不降。",
   "source": "第10章",
   "tags": [
    "神经网络",
    "激活函数",
    "梯度消失"
   ]
  },
  {
   "id": "D-10",
   "layer": "D",
   "title": "反向传播就是链式法则，把误差逐层传回",
   "oneliner": "隐藏层误差等于输出层误差乘转置权重矩阵，训练循环固定四步。",
   "mechanism": [
    "50 万车价买 2 辆加 10% 购置税共 110 万，单价每涨 1 万最终多付 2.2 万，即 1×1.1×2。",
    "反向传播从最终结果起逐层求导，得到每个参数对结果的影响力即梯度。",
    "隐藏层误差 E_h = W^T · E_o，转置权重矩阵负责回传误差。",
    "训练四步：前向传播、计算损失、反向传播、更新权重。",
    "优化器从 SGD 到 Momentum、Adagrad、RMSprop、Adam，Adam 结合动量与自适应学习率。"
   ],
   "code": [
    "W^T·E：隐藏层误差回传",
    "loss.backward()：自动求梯度",
    "optimizer.step()：更新参数",
    "Adam：常用默认优化器"
   ],
   "reuse": [
    "调不通时按前向、损失、反传、更新四步逐段打印。",
    "先跑小数据过拟合一轮，确认反传链路没写错。"
   ],
   "interview": "前向算值，损失算差，链式法则反传梯度，优化器更新参数。",
   "pitfall": "只写前向传播，忘记在每步用梯度更新权重。",
   "source": "第10章",
   "tags": [
    "神经网络",
    "反向传播",
    "优化器"
   ]
  },
  {
   "id": "D-11",
   "layer": "D",
   "title": "PyTorch 靠 autograd 和动态图",
   "oneliner": "写前向公式，调 backward() 自动算所有梯度；动态图让调试像普通 Python。",
   "mechanism": [
    "张量用法和 NumPy 几乎一样，区别是可以搬到 GPU，速度快几十倍。",
    "x=torch.tensor(2.0,requires_grad=True)，y=x**2，y.backward() 后梯度为 4。",
    "动态图每次前向实时建图，可逐行执行、中间插 print，支持 if/else 分支。",
    "单机多卡用 DataParallel，主卡负载不均衡；多机多卡用 DDP，每卡独立算梯度再同步。",
    "TF 像自动挡、PyTorch 像手动挡；工业部署偏 TF，学术与大模型偏 PyTorch。"
   ],
   "code": [
    "requires_grad=True：跟踪梯度",
    "y.backward()：自动求导",
    "optimizer.zero_grad()：清空梯度",
    "DDP：多机多卡"
   ],
   "reuse": [
    "多卡训练直接上 DDP，别用 DataParallel。",
    "每轮更新前 zero_grad，否则梯度会累加。"
   ],
   "interview": "PyTorch 三件套：张量、autograd、动态图，多卡训练用 DDP。",
   "pitfall": "用 DataParallel 跑多机多卡，或忘记 zero_grad 导致梯度累加。",
   "source": "第11章",
   "tags": [
    "PyTorch",
    "autograd",
    "训练"
   ]
  },
  {
   "id": "D-12",
   "layer": "D",
   "title": "CNN 用卷积找边缘，用池化给平移不变性",
   "oneliner": "S 细胞像卷积找线条，C 细胞像池化忽略位置抖动，层数越深特征越抽象。",
   "mechanism": [
    "卷积神经网络是权重在不同位置共享的 MLP 变种，卷积核又叫 kernel、filter。",
    "局部区域连到下一层一个节点，卷积后得到 feature map，权重和偏置在扫描时共用。",
    "S 细胞在感受野内找边缘，对应卷积层；C 细胞有更大感受野，对应池化层。",
    "浅层学颜色和边缘，中层学纹理，深层学狗头这类判别特征。",
    "ImageNet 超 1500 万张图、约 2.2 万类；ILSVRC 用 1000 类，2012 年 AlexNet 后出现 VGG、ResNet。"
   ],
   "code": [
    "nn.Conv2d：卷积层",
    "nn.MaxPool2d：池化层",
    "nn.ReLU：激活",
    "ResNet：残差连接"
   ],
   "reuse": [
    "看特征图和激活区域，确认激活落在目标上。",
    "小数据集优先迁移学习，不要从零堆层。"
   ],
   "interview": "CNN 本质是局部连接加权重共享，逐层从边缘拼到整体。",
   "pitfall": "把 CNN 当黑盒只堆层数，不看特征图和激活区域是否落在目标上。",
   "source": "第11章",
   "tags": [
    "CNN",
    "计算机视觉",
    "特征"
   ]
  },
  {
   "id": "D-13",
   "layer": "D",
   "title": "YOLO 用一次回归输出框、置信度和类别",
   "oneliner": "7×7 网格、每格 2 个框、20 类，输出 7×7×30 张量；NMS 阈值 0.5 去掉重叠框。",
   "mechanism": [
    "YOLOv1 把图切成 S×S 网格，每格预测 B 个框的 (x,y,w,h,confidence)，只负责中心落在格内的物体。",
    "S=7、B=2、20 类时输出 7×7×30；30 维等于 20 类概率加 2 置信度加 8 个坐标。",
    "7×7 网格每格只出一个物体，最多 49 个；两个框中取置信度大的。",
    "one-stage 如 YOLO、SSD 速度快精度略低；two-stage 如 Faster R-CNN 精度高但慢。",
    "标准 YOLO 达 45 帧/秒，Fast YOLO 达 155 帧/秒，mAP 仍是其他实时算法的两倍。"
   ],
   "code": [
    "YOLOv1：7×7×30 输出",
    "NMS：IOU>0.5 的同类框丢弃",
    "IOU：框重叠度",
    "Faster R-CNN：two-stage 对照"
   ],
   "reuse": [
    "实时检测优先 one-stage，精度优先 two-stage。",
    "后处理一定做 NMS，否则一个物体会出多个框。"
   ],
   "interview": "YOLO 把检测当回归，一次前向出所有框，最后用 NMS 收尾。",
   "pitfall": "拿 two-stage 的精度标准要求 YOLO，或后处理不做 NMS 导致一物多框。",
   "source": "第11章",
   "tags": [
    "YOLO",
    "目标检测",
    "NMS"
   ]
  },
  {
   "id": "D-14",
   "layer": "D",
   "title": "YOLO 项目三段式：训练、评估、预测",
   "oneliner": "dataset.yaml 写类别，train 设轮数与早停，val 看 mAP，predict 出框转提交。",
   "mechanism": [
    "model=YOLO('yolov12.yaml') 新建，YOLO('yolov12n.pt') 载预训练，model.info() 看层数参数量。",
    "训练参数：epochs=100、batch=16、imgsz=640、patience=50、device='0'。",
    "类别含 crazing、inclusion、pitted_surface、scratches、patches、rolled-in_scale 六类。",
    "文件列表方式 train.txt 只写图片路径，程序自动到同名 labels 目录找标注。",
    "提交格式每行一个框：image_id、bbox 绝对坐标、category_id、confidence。"
   ],
   "code": [
    "ultralytics YOLO：训练与推理",
    "dataset.yaml：数据路径与类别",
    "metrics.box.map：验证 mAP",
    "best.pt：保存的最优权重"
   ],
   "reuse": [
    "先跑通 1 个 epoch，再放大轮数。",
    "提交前把坐标从归一化转成像素，逐条抽查。"
   ],
   "interview": "YOLO 落地讲数据标注、dataset.yaml、train/val/predict、结果转提交四步。",
   "pitfall": "缺陷图看不清就加深网络调参；先换光源换相机，往往提升更大。",
   "source": "第11章",
   "tags": [
    "YOLO",
    "训练",
    "工业检测"
   ]
  },
  {
   "id": "R-01",
   "layer": "R",
   "title": "模型答错分三类，对应三种解法",
   "oneliner": "没问清楚上提示工程，缺背景知识上 RAG，能力不足才微调。",
   "mechanism": [
    "模型答错的三个来源：没问清楚、缺乏背景知识、能力不足。",
    "提示工程解决表达问题，RAG 补外部知识，微调改变模型本身的能力。",
    "效果不好时的排查顺序：提示词、RAG、微调，成本从低到高。",
    "RAG 有三个收益：解决知识时效性、减少幻觉、提升专业领域回答质量。",
    "微调成本高，先用 RAG，确实不够再动模型。"
   ],
   "code": [
    "Prompt Engineering：补指令与格式",
    "RAG：补外部知识",
    "Fine-tuning：补能力与风格"
   ],
   "reuse": [
    "线上答错先归类到三种原因，再决定改哪一层。",
    "把「先 Prompt 后 RAG 再微调」写进团队排查手册。"
   ],
   "interview": "先定位错误来源：问法、知识、能力，分别对应 Prompt、RAG、微调。",
   "pitfall": "效果差直接上微调，跳过提示词和检索环节的排查。",
   "source": "第13章",
   "tags": [
    "RAG",
    "选型",
    "排查"
   ]
  },
  {
   "id": "R-02",
   "layer": "R",
   "title": "RAG 三段：索引、检索、生成",
   "oneliner": "知识切块转向量入库，查询时召回相关块并重排，最后拼进上下文交给模型生成。",
   "mechanism": [
    "Indexing 解决怎么存：收集多源数据、文档分块、用 BGE 或 M3E 等模型向量化入库。",
    "Retrieval 把问题转向量，在向量库做相似度检索，再对结果重排序。",
    "Generation 把检索片段和用户问题组装成上下文，交给 LLM 生成答案。",
    "分块策略要在语义完整性与检索效率之间取得平衡。",
    "检索走偏，后面生成质量必然下降。"
   ],
   "code": [
    "BGE / M3E：embedding 模型",
    "FAISS / Chroma：向量库",
    "Rerank：召回后重排",
    "context：拼进 prompt 的片段"
   ],
   "reuse": [
    "画架构图按三段分开，每段单独定指标。",
    "排障时先确认召回块对不对，再看生成。"
   ],
   "interview": "RAG 就三段：索引、检索、生成，绝大多数问题出在前两段。",
   "pitfall": "只调生成模型和提示词，不检查召回是否找对了块。",
   "source": "第13章",
   "tags": [
    "RAG",
    "架构",
    "链路"
   ]
  },
  {
   "id": "R-03",
   "layer": "R",
   "title": "递归切片：1000 字符一块、重叠 200",
   "oneliner": "递归切片按段落、句子、空格、字符逐级降级，chunk_size=1000，overlap=200。",
   "mechanism": [
    "分隔符优先级 [\"\\n\\n\", \"\\n\", \".\", \" \", \"\"]，尽量在段落或句子边界断开。",
    "chunk_size=1000 按字符计，单块不超过 1000；chunk_overlap=200 让相邻块保留重叠。",
    "浦发客户经理考核办法 PDF 提取 3881 字符，切成 5 个块。",
    "LLM 语义切分不设重叠、按语义切，更准但成本高。",
    "迪士尼多模态案例改用 chunk_size=500、overlap=50。"
   ],
   "code": [
    "RecursiveCharacterTextSplitter：递归切片",
    "chunk_size=1000：块大小",
    "chunk_overlap=200：重叠长度",
    "separators：分隔符优先级"
   ],
   "reuse": [
    "先按文档结构定分隔符，再调块大小。",
    "问答类文档重叠留 10% 到 20%。"
   ],
   "interview": "递归切片先保语义边界，再控块大小，重叠用来补跨块信息。",
   "pitfall": "所有文档套同一套切分参数，块太大检索粒度粗、块太小上下文断裂。",
   "source": "第13章",
   "tags": [
    "RAG",
    "切片",
    "LangChain"
   ]
  },
  {
   "id": "R-04",
   "layer": "R",
   "title": "口语 Query 要先改写成检索语句",
   "oneliner": "用户问题口语化、带指代，知识库 chunk 是陈述句，先让 LLM 改写能明显提升召回。",
   "mechanism": [
    "五类改写：上下文依赖型、对比型、模糊指代型、多意图型、反问型。",
    "上下文依赖型把「还有其他设施吗」补全成包含前文的完整问题。",
    "多意图型把「门票多少钱？需要预约吗？」拆成 JSON 数组分别检索。",
    "意图识别一次返回 query_type、rewritten_query、confidence，示例置信度 0.95。",
    "同时命中多意图型和模糊指代型时，多意图型优先。"
   ],
   "code": [
    "query_type：意图分类",
    "rewritten_query：改写后查询",
    "confidence：置信度阈值",
    "JSON 数组：多意图拆分"
   ],
   "reuse": [
    "多轮对话必须带最近 3 到 5 轮历史做指代消解。",
    "改写用小模型，降低延迟。"
   ],
   "interview": "召回差先动查询侧：改写指代、拆多意图、补全上下文，再谈换模型。",
   "pitfall": "拿带「它」「这个」「都」的原句直接去检索。",
   "source": "第13章",
   "tags": [
    "RAG",
    "Query改写",
    "召回"
   ]
  },
  {
   "id": "R-05",
   "layer": "R",
   "title": "MultiQuery 扩三条，HyDE 换成文档向量",
   "oneliner": "原问题扩成 3 条不同视角的查询逐条检索，或先写假设答案再用答案向量检索。",
   "mechanism": [
    "generate_multi_queries(query, llm, num_queries=3) 让 LLM 输出 3 条不同角度的查询，每行一条。",
    "示例把「客户经理被投诉扣多少分」扩成扣分标准、扣除绩效分、投诉处罚机制等 4 条变体。",
    "每条变体各检索一次，结果合并去重后再进入回答流程。",
    "HyDE 让 LLM 先写约 100 字假设答案文档，用文档向量去检索，因为文档向量与文档向量更相似。",
    "多轮改写保留最近 3 到 5 轮历史，先用 LLM 判断是否需要改写。"
   ],
   "code": [
    "generate_multi_queries：生成多条查询",
    "multi_query_search：分别检索再合并",
    "HyDE：假设文档向量",
    "qwen-plus：改写模型"
   ],
   "reuse": [
    "口语问句多、召回不稳时先加 MultiQuery。",
    "HyDE 适合答案长、文档长的知识库。"
   ],
   "interview": "查询侧优化两招：MultiQuery 扩视角，HyDE 把问题向量换成文档向量。",
   "pitfall": "只按原句检索一次，口语问法和文档表述对不上时直接召回为空。",
   "source": "第15章",
   "tags": [
    "RAG",
    "Query改写",
    "HyDE"
   ]
  },
  {
   "id": "R-06",
   "layer": "R",
   "title": "混合检索先归一化再按 alpha 加权",
   "oneliner": "BM25 与向量分数各自缩放到 0 到 1，再按 Score=α×向量+(1-α)×BM25 融合。",
   "mechanism": [
    "BM25 分数除以本批最大值归一化；向量分数用 1-(distance/max_distance) 转到 0 到 1。",
    "α=0.5 为默认平衡值，α=0.3 偏向关键词，α=0.7 偏向语义。",
    "α=0 是纯 BM25，适合产品型号、法规条文等精确匹配；α=1 是纯向量，适合口语化提问。",
    "BM25 是 TF-IDF 的改进版，加入词频饱和度和文档长度归一化。",
    "50 题测试集上，BM25 加向量的混合检索把 Top-3 命中率从 70% 提到 86%。",
    "流程：分词算 BM25 分，并行做向量检索，归一化后加权融合，按融合分返回 Top-K。"
   ],
   "code": [
    "rank_bm25：关键词检索",
    "tokenize_chinese：中文分词",
    "similarity_search_with_score：向量分数",
    "Ensemble Retriever：加权融合"
   ],
   "reuse": [
    "领域术语多、型号多的语料把 α 调低。",
    "两路分数先归一化，再相加。"
   ],
   "interview": "混合检索的关键不在两路都做，而在归一化口径一致，alpha 按术语密度调。",
   "pitfall": "两种分数不归一化直接相加，BM25 的大分值把向量结果压没。",
   "source": "第15章",
   "tags": [
    "RAG",
    "混合检索",
    "BM25"
   ]
  },
  {
   "id": "R-07",
   "layer": "R",
   "title": "Rerank 逐对算分，候选别超 20 个",
   "oneliner": "召回 100 个候选后用 cross-encoder 逐对算分选出 5 个，别拿它当召回用。",
   "mechanism": [
    "BGE-Rerank 基于 Cross-Encoder，把 query 和 doc 拼在一起输入，直接输出相关性 logits。",
    "bge-reranker 分数未归一化：3.0 到 10.0 高相关，0 到 3.0 中等，负数为不相关。",
    "参数建议 initial_k 10 到 20、final_k 3 到 5、max_length 512，长文档会被截断。",
    "链路示例：1000 万 chunks 先召回 100 个，rerank 后留 5 个送给 LLM。",
    "bge-reranker-base 轻量、large 更准更慢；Cohere rerank 返回 0 到 1 的归一化分数。"
   ],
   "code": [
    "BAAI/bge-reranker-base：轻量重排",
    "BAAI/bge-reranker-large：高精度",
    "initial_k=20 / final_k=5：候选与保留数",
    "cohere rerank：归一化分数"
   ],
   "reuse": [
    "粗排控制在 10 到 20 个候选，别对上千条做重排。",
    "中文场景先试 bge-reranker，再看商业 API。"
   ],
   "interview": "embedding 粗而快，一次比千条；rerank 精而慢，逐对算分，所以只精排 Top20。",
   "pitfall": "对上千条候选做 rerank，延迟爆炸，收益还不如先把粗排候选收窄。",
   "source": "第15章",
   "tags": [
    "RAG",
    "Rerank",
    "检索"
   ]
  },
  {
   "id": "R-08",
   "layer": "R",
   "title": "小片段建索引，命中后回溯整页上下文",
   "oneliner": "用摘要或段落建索引保证检索精度，命中后按文档 ID 链回完整页面补上下文。",
   "mechanism": [
    "Small-to-Big 用小规模内容建索引，通过文档 ID、URL 或指针链接到完整内容。",
    "检索先在小内容上匹配，再取对应大内容作为上下文，答案逻辑更连贯。",
    "企业知识库做法：300 token 小块只当指针，metadata 记录父页面编号，命中后取整页。",
    "依据：能答题的句子通常不超过十句，小块比整页稀释后的相似度得分更高。",
    "先检索 Top30 个块，按 metadata 换页去重，再交给 LLM 重排取 Top10。"
   ],
   "code": [
    "metadata：存父页编号",
    "parent page retrieval：按 ID 取整页",
    "Top30→去重→Top10：两段检索"
   ],
   "reuse": [
    "块里只放定位信息，答案上下文去父页取。",
    "metadata 不向量化，只当筛选和回表键。"
   ],
   "interview": "小块负责找得准，父块负责答得全，靠 metadata 里的页码把两步打通。",
   "pitfall": "只喂命中的那一小块，答案缺前后文，数字和条件经常对不上。",
   "source": "第15章",
   "tags": [
    "RAG",
    "分块",
    "父子块"
   ]
  },
  {
   "id": "R-09",
   "layer": "R",
   "title": "知识库升级用同一测试集做 A/B 和回归",
   "oneliner": "版本用 MD5 标识，集合运算算增删改，同测试集比准确率和响应时间再决定上线。",
   "mechanism": [
    "版本差异用集合运算：新增取差集、删除取反向差集、修改看交集内内容是否一致。",
    "示例 v1 有 3 个切片、平均 36 字符，准确率 60%，平均响应 115.8ms。",
    "v2 有 5 个切片、平均 54 字符，准确率 100%，平均响应 120.2ms，准确率提升 40 个百分点。",
    "回归测试通过率等于通过用例数除以总用例数，示例 5 条全过为 100%。",
    "准确率口径为正确检索次数除以总查询次数。"
   ],
   "code": [
    "MD5：版本指纹",
    "IndexFlatL2：版本索引",
    "evaluate_version_performance：版本对比",
    "generate_regression_test：回归用例"
   ],
   "reuse": [
    "知识库更新前先跑一遍固定测试集，记录基线和耗时。",
    "版本索引并存，出问题能切回旧库。"
   ],
   "interview": "知识库也是代码：版本号、diff、回归集、上线验收四件套缺一不可。",
   "pitfall": "只比准确率不看响应时间，也不跑回归，升级后老问题反而退化。",
   "source": "第15章",
   "tags": [
    "RAG",
    "版本管理",
    "回归测试"
   ]
  },
  {
   "id": "R-10",
   "layer": "R",
   "title": "冠军方案等于基础 RAG 加两个路由和重排",
   "oneliner": "在 native RAG 上加查询路由和 LLM reranking，2.5 小时内解析 100 份年报并答题。",
   "mechanism": [
    "比赛条件：随机 100 份公司年报，每份最长 1000 页，2.5 小时内建库，再答 100 道模板题。",
    "答案类型固定为是/否、公司名、职位、产品名、数值指标，每题标注引用页码。",
    "架构只比基础 RAG 多两件东西：两个 router 和 LLM reranking 模块。",
    "主流程四段：解析 Parsing、内容提取 Ingestion、检索 Retrieval、回答 Answering。",
    "最终在 retrieval、generation 和总分三个维度都领先，推理使用 o3-mini。"
   ],
   "code": [
    "RAG-Challenge-2：赛题代码",
    "Docling：PDF 解析",
    "FAISS IndexFlatIP：内积检索",
    "o3-mini：推理模型"
   ],
   "reuse": [
    "复杂知识库先做解析和路由，再谈换大模型。",
    "每个环节单独评测，别只看总分。"
   ],
   "interview": "讲这个项目一句话：基础链路加两个路由加 LLM 重排，靠工程细节取胜。",
   "pitfall": "以为必须上复杂框架，实际赢在解析、路由、重排、提示词逐环节抠细节。",
   "source": "第16章",
   "tags": [
    "RAG",
    "项目实战",
    "路由"
   ]
  },
  {
   "id": "R-11",
   "layer": "R",
   "title": "表格给 LLM 用 HTML，序列化反而降效",
   "oneliner": "试过 20 多个解析器后选 Docling，表格改 HTML 喂模型，表格序列化实测略变差。",
   "mechanism": [
    "PDF 解析难点：保留表格结构、标题和项目符号、识别多栏、处理图表公式页眉页脚。",
    "作者试过 20 多种解析器（小众、知名、ML 训练、商业 API），最终选 Docling 并改源码补能力。",
    "Docling 先输出 JSON 再构建 Markdown，解析乱码用十几个正则清洗。",
    "表格先试 Markdown 后改 HTML，因为模型对 HTML 理解更好，能表达合并单元格和子标题。",
    "被寄予厚望的表格序列化实测没提升反而略降，配置 use_serialized_tables 默认 False。"
   ],
   "code": [
    "Docling：PDF 转结构化",
    "use_serialized_tables=False：关闭表格序列化",
    "HTML table：喂模型的表格格式",
    "MinerU：另一条解析路线"
   ],
   "reuse": [
    "表格解析先保结构，再决定 Markdown 还是 HTML。",
    "任何解析优化都用评测集验证，别凭直觉开开关。"
   ],
   "interview": "表格别急着序列化，先把 HTML 结构喂给模型，用配置开关实测决定。",
   "pitfall": "默认表格序列化能救大表，实测降效，延迟和 token 白花。",
   "source": "第16章",
   "tags": [
    "RAG",
    "PDF解析",
    "表格"
   ]
  },
  {
   "id": "R-12",
   "layer": "R",
   "title": "300 token 切块，命中后取整页重排",
   "oneliner": "每页切 300 token 小块存父页编号，检索 Top30 块换页去重，LLM 重排后取 Top10 页。",
   "mechanism": [
    "整页做 chunk 太粗，目标句被无关文本稀释导致相似度低，改切 300 token 约 15 句。",
    "每个块在 metadata 里存 ID 和父页面编号；metadata 不向量化，只当筛选标签。",
    "整合检索器六步：查询向量化、取 Top30 块、按 metadata 换页去重、LLM 重排、调分、返回 Top10 页。",
    "LLM 重排输出 reasoning 和 relevance_score，最终分按 vector_weight 0.3、llm_weight 0.7 加权。",
    "保留父页面是因为块负责定位，页面里还有次要但关键的细节。"
   ],
   "code": [
    "text_splitter.py：300 token 切块",
    "relevance_score：LLM 重排分",
    "vector_weight=0.3 / llm_weight=0.7：融合权重",
    "IndexFlatIP：内积索引"
   ],
   "reuse": [
    "先定块大小和父页规则，再选重排模型。",
    "重排结果保留 reasoning，方便抽查为什么排前面。"
   ],
   "interview": "分块解决找得准，父页解决答得全，中间靠 metadata 页码做指针。",
   "pitfall": "块切得越小越好，结果命中块缺上下文，答案只能答一半。",
   "source": "第16章",
   "tags": [
    "RAG",
    "父页检索",
    "重排"
   ]
  },
  {
   "id": "R-13",
   "layer": "R",
   "title": "一公司一库加查询路由，搜索范围缩百倍",
   "oneliner": "100 家公司建 100 个 FAISS 库，先抽取公司名路由到对应库，只搜一个库。",
   "mechanism": [
    "作者按公司拆库，一家公司一个 FAISS，1 个库等于 1 份文档。",
    "路由三步：提取公司名、匹配对应数据库、只搜该库，可把搜索范围缩小 100 倍。",
    "比赛中问题直接含公司名，规则匹配即可；实际业务可用 LLM 抽实体或打标签。",
    "索引用 IndexFlatIP，向量原样存储不量化，暴力搜索精度高但内存和计算开销大。",
    "跨公司比较题先拆成子问题，各公司独立查，再用 ComparativeAnswerPrompt 汇总。"
   ],
   "code": [
    "IndexFlatIP：内积精确检索",
    "router：按实体选库",
    "ComparativeAnswerPrompt：跨库汇总"
   ],
   "reuse": [
    "语料天然按实体分区时，先路由再检索。",
    "路由键可以是公司名、产品线、租户 ID。"
   ],
   "interview": "路由是最便宜的性能优化：先把候选集砍到百分之一，再谈检索算法。",
   "pitfall": "所有文档混一个库，检索先混进别家数据，再想办法分干净。",
   "source": "第16章",
   "tags": [
    "RAG",
    "路由",
    "多租户"
   ]
  },
  {
   "id": "R-14",
   "layer": "R",
   "title": "提示词按题型路由，推理和答案分字段",
   "oneliner": "prompts.py 分四块，按题目 kind 选模板，推理过程与最终答案分开输出。",
   "mechanism": [
    "prompts.py 分四块：核心系统指令、Pydantic schema、one-shot 或 few-shot 示例、上下文与问题模板。",
    "主流程读题目 kind 字段，boolean、number、name、names 各对应一个 Prompt 类。",
    "主 schema 四字段：step_by_step_analysis 要求至少 5 步、150 字以上。",
    "另三个字段是 reasoning_summary、relevant_pages、final_answer。",
    "结构化输出传 Pydantic schema，模型必回固定 JSON，答案可直接取值。"
   ],
   "code": [
    "prompts.py：按题型分模板",
    "Pydantic BaseModel：约束输出字段",
    "kind：题型路由键",
    "AnswerWithRAGContextNumberPrompt：数值题模板"
   ],
   "reuse": [
    "题型差异大就拆模板，别把所有规则塞一个提示词。",
    "推理字段和答案字段分开，程序只读答案。"
   ],
   "interview": "CoT 提质量，结构化输出提可解析性，两者组合是生成端标配。",
   "pitfall": "把所有规则塞进一个提示词，规则越多模型漏得越多。",
   "source": "第16章",
   "tags": [
    "RAG",
    "提示词",
    "结构化输出"
   ]
  },
  {
   "id": "R-15",
   "layer": "R",
   "title": "分块按句子切，再叠 20% 滑动窗口",
   "oneliner": "先按句子边界切保语义完整，再设 20% 重叠，常用 chunk_size=512、overlap 50 到 100。",
   "mechanism": [
    "六种策略：固定长度、句子边界、滑动窗口、层次切片、LLM 语义切片、自适应切片。",
    "固定长度可能切断句子；层次切片依赖文档有清晰标题结构；LLM 语义切片最准但贵而慢。",
    "经验值一般 256 到 1024 token；小块精度高但缺上下文，大块上下文全但噪声多。",
    "面试答法：FAQ 段落互相依赖，用句子边界加滑动窗口，window=512、step=100，约 20% 重叠。",
    "重叠的代价是存储变多和冗余，换来的是跨块信息不丢。"
   ],
   "code": [
    "chunk_size=512：块大小",
    "overlap=50-100：重叠范围",
    "window=512 / step=100：滑动窗口"
   ],
   "reuse": [
    "先问文档结构：有标题走层次切片，段落连续走句子边界加滑动窗口。",
    "表格和代码块单独切，别混进正文分块。"
   ],
   "interview": "先问文档结构：有标题走层次切片，段落连续走句子边界加滑动窗口。",
   "pitfall": "固定按字符数切，句子被拦腰截断，检索命中但答案读不通。",
   "source": "第17章",
   "tags": [
    "RAG",
    "切片",
    "面试"
   ]
  },
  {
   "id": "R-16",
   "layer": "R",
   "title": "RAG 效果差分检索和生成两段排查",
   "oneliner": "先看检索结果对不对，再看生成有没有遵循上下文，别一上来就换模型。",
   "mechanism": [
    "检索侧：召回不相关就换领域 embedding 或加同义词扩展；答案散落多块就加大 chunk 和 overlap。",
    "噪声多说明块太大，减小 chunk 并加 Rerank；口语化检索差做 Query 改写或 HyDE。",
    "生成侧：答非所问就强化「仅基于背景知识回答」；答案冗长用 Rerank 减少喂入内容。",
    "推理不行换更强模型或加 CoT；debug_retrieval 打印每条相似度、来源和前 100 字。",
    "先查检索再查生成：检索好而生成差改 Prompt，检索差就改分块、embedding、改写。"
   ],
   "code": [
    "debug_retrieval：打印召回明细",
    "HyDE：查询侧改写",
    "Rerank：收窄上下文",
    "CoT：生成侧推理"
   ],
   "reuse": [
    "每次只改一个环节，改完用同一测试集对比。",
    "把召回明细做成日志，线上问题能回溯。"
   ],
   "interview": "按链路分段定位：检索准不准、上下文够不够、生成听不听话，逐段给方案。",
   "pitfall": "效果差就直接换大模型，检索召回的垃圾根本没解决。",
   "source": "第17章",
   "tags": [
    "RAG",
    "排查",
    "优化"
   ]
  },
  {
   "id": "R-17",
   "layer": "R",
   "title": "检索看召回与排名，生成看 RAGAS",
   "oneliner": "检索侧算 Recall@K、MRR、NDCG，生成侧用 RAGAS 四指标。",
   "mechanism": [
    "Recall@K 等于 Top-K 中相关文档数除以总相关文档数；Precision@K 等于相关文档数除以 K。",
    "MRR 等于第一个相关文档排名的倒数，适合单一正确答案；NDCG@K 适合分级相关性。",
    "RAGAS 用 LLM 自动评估免人工标注，pip install ragas 即可。",
    "Faithfulness 判断答案每个声明能否在上下文找到支撑；Answer Relevancy 用答案反推问题再比相似度。",
    "Context Relevance 算上下文中与问题相关的句子比例；Context Recall 看标准答案所需信息是否召回。"
   ],
   "code": [
    "Recall@K / MRR / NDCG：检索指标",
    "ragas：生成评估库",
    "faithfulness / answer_relevancy：生成指标",
    "langfuse：跑评测与追踪"
   ],
   "reuse": [
    "准备 50 到 100 条样本覆盖各类问题，定期跑。",
    "生成侧优先看 Faithfulness，幻觉代价最高。"
   ],
   "interview": "评测拆两层：检索层算 Recall、MRR、NDCG，生成层算忠实度和相关性。",
   "pitfall": "只测端到端答案对错，检索和生成的问题混在一起说不清。",
   "source": "第17章",
   "tags": [
    "RAG",
    "评测",
    "RAGAS"
   ]
  },
  {
   "id": "R-18",
   "layer": "R",
   "title": "五种切片策略，按结构和预算选",
   "oneliner": "固定长度、句子边界、LLM 语义、层次、滑动窗口，语义完整性和实现成本互为代价。",
   "mechanism": [
    "固定长度：按字符切、优先句子边界、有重叠，实现简单，实测切出 292 与 80 字符两块。",
    "句子边界：按句号分句再合并不重叠，语义完整但长度不均，长句多的文档不适用。",
    "LLM 语义切片：实测切成 57、56、71、50、54、30 字符六块，边界最自然，成本最高。",
    "层次切片：按标题章节切，保留文档结构，适合手册规范，无标题纯文本不适用。",
    "滑动窗口：窗口滑动产生大量重叠，召回不漏但存储和去重要求高。"
   ],
   "code": [
    "RecursiveCharacterTextSplitter：固定长度加边界",
    "LLM 语义切片：模型判断边界",
    "层次切片：按标题结构"
   ],
   "reuse": [
    "通用文档用固定长度，技术手册用层次，高质量要求用 LLM 语义。",
    "长文档召回优先滑动窗口，再靠去重控制冗余。"
   ],
   "interview": "切片没有最优解，先看文档结构和预算，再选语义完整性与成本的平衡点。",
   "pitfall": "所有文档套同一种切法，技术文档被切碎、纯文本被强行分层。",
   "source": "第14章",
   "tags": [
    "RAG",
    "切片策略",
    "选型"
   ]
  },
  {
   "id": "R-19",
   "layer": "R",
   "title": "一个 1152 维空间装下文本、图片、视频",
   "oneliner": "tongyi-embedding-vision-plus 把三种模态编到同一 1152 维空间，单索引跨模态检索。",
   "mechanism": [
    "文本直接编码，图片转 Base64 后发送，视频多帧提取后取平均向量。",
    "一个视频文件对应一个 1152 维向量，不是每帧一个向量。",
    "检索策略：统一检索一次返回全部类型，关键词检测图片或视频意图，文本无条件取 Top-3。",
    "媒体只在 L2 距离小于 3.0 时采纳，距离换算相似度用 sim = 1/(1+distance)。",
    "限制：文本 1024 token，图片不超过 3MB 且 8 张，视频不超过 10MB。"
   ],
   "code": [
    "dashscope.MultiModalEmbedding：多模态编码",
    "tongyi-embedding-vision-plus：1152 维模型",
    "IndexFlatL2：统一索引",
    "sim=1/(1+distance)：距离转相似度"
   ],
   "reuse": [
    "多模态检索先统一向量空间，别为每种模态建独立库。",
    "媒体召回加距离阈值，避免强行返回不相关图片。"
   ],
   "interview": "跨模态检索的前提是同一向量空间，一个索引才能直接比较文本、图片和视频。",
   "pitfall": "文本和媒体分别用不同模型编码，向量不在同一空间无法比较。",
   "source": "第14章",
   "tags": [
    "多模态",
    "Embedding",
    "跨模态检索"
   ]
  },
  {
   "id": "R-20",
   "layer": "R",
   "title": "四种问答链按调用量和上下文取舍",
   "oneliner": "stuff 最省调用；map_reduce 并发丢上下文；refine 控 token；map_rerank 调用最多。",
   "mechanism": [
    "stuff 把文档直接拼进 prompt，调用 LLM 次数最少，能用 stuff 就用 stuff。",
    "map_reduce 对每个 chunk 单独出答案或摘要再合并，可并发，块之间缺少上下文。",
    "refine 在第一个块得到结果后带着它处理下一块，部分保留上下文，token 可控。",
    "map_rerank 对每个 chunk 打分再取最高结果，LLM 调用量最大。",
    "stuff 适合块小、一次召回文档少的场景。"
   ],
   "code": [
    "load_qa_chain：问答链入口",
    "chain_type='stuff'：直接拼接",
    "map_reduce / refine：多文档策略",
    "map_rerank：逐块打分"
   ],
   "reuse": [
    "召回片段少就用 stuff，简单可靠。",
    "文档多且要控 token 用 refine。"
   ],
   "interview": "问答链选型看调用次数和上下文长度，stuff 优先，超窗才换 map_reduce 或 refine。",
   "pitfall": "一堆 chunk 全用 stuff 塞进去，直接顶爆上下文窗口。",
   "source": "第13章",
   "tags": [
    "RAG",
    "问答链",
    "LangChain"
   ]
  },
  {
   "id": "A-01",
   "layer": "A",
   "title": "FC 是私有接口，MCP 是开放协议",
   "oneliner": "简单原子任务用 FC 更快更低延迟；跨模型跨平台复用选 MCP。",
   "mechanism": [
    "Function Calling 是模型厂商私有接口，换个模型要重新适配。",
    "MCP 是开放协议，一次开发多模型兼容，Claude、Cursor 等 Client 都能连。",
    "MCP 支持多轮对话与复杂上下文管理，FC 适合简单、单次调用。",
    "安全性上 FC 依赖云端 API 密钥，MCP 支持本地化数据控制。",
    "get_weather(city='北京') 这类原子调用直接用 FC，省掉 MCP Server 的协议开销。"
   ],
   "code": [
    "Function Calling：厂商私有工具调用",
    "MCP：跨模型开放协议",
    "get_weather / calculate：原子工具示例",
    "List Tools：MCP 的工具发现接口"
   ],
   "reuse": [
    "单模型单点调用用 FC，多客户端复用再包 MCP Server。",
    "工具数量少时别为协议而协议。"
   ],
   "interview": "FC 是厂商私有函数接口，MCP 是跨模型开放协议；单点调用用 FC，跨端复用用 MCP。",
   "pitfall": "以为有了 MCP 就不再需要 Function Calling，把简单调用全包成 Server。",
   "source": "第18章",
   "tags": [
    "MCP",
    "Function Calling",
    "协议"
   ]
  },
  {
   "id": "A-02",
   "layer": "A",
   "title": "自定义工具要写全描述、参数与执行",
   "oneliner": "注册 BaseTool 子类，写全 description、parameters 和 call 三段。",
   "mechanism": [
    "@register_tool('exc_sql') 装饰 BaseTool 子类，注册名即工具名，Assistant 里按字符串引用。",
    "description 写用途「对于生成的 SQL，进行 SQL 查询」，模型靠它判断什么时候调用。",
    "parameters 是列表，每项写 name、type、description、required；sql_input 设为 string 且必填。",
    "call 收到的是 JSON 字符串，先 json.loads(params) 再取 args['sql_input']。",
    "返回前用 df.head(10).to_markdown(index=False) 截断，避免结果过长撑爆上下文。"
   ],
   "code": [
    "@register_tool：注册工具名",
    "BaseTool：工具基类",
    "parameters：参数 Schema",
    "json.loads：解析入参",
    "to_markdown(index=False)：截断返回"
   ],
   "reuse": [
    "description 写清什么时候用、什么时候不用。",
    "工具返回一律截断，避免大表进上下文。"
   ],
   "interview": "工具三件套：description 说何时用，parameters 说传什么，call 负责执行并截断返回。",
   "pitfall": "parameters 只写参数名不写 description，模型猜不出该传什么。",
   "source": "第18章",
   "tags": [
    "Agent",
    "工具开发",
    "Qwen-Agent"
   ]
  },
  {
   "id": "A-03",
   "layer": "A",
   "title": "Text2SQL 助手把建表语句写进提示",
   "oneliner": "把建表 DDL 和字段注释放进 system_prompt，模型据此写 SQL，function_list 只传工具名。",
   "mechanism": [
    "system_prompt 里贴 tkt_orders 建表 DDL 与字段中文注释，模型才能把「销量」映射到 quantity。",
    "Assistant 传 system_message 和 function_list=['exc_sql']，只写工具名字符串。",
    "工具在 agent 初始化时注册一次，不必每次请求重复注册。",
    "查询同一库的多张表，每张表的 schema 都要写进 prompt，缺一张就会编字段。",
    "LLM 先输出工具名和参数，框架执行后回填结果再让 LLM 组织答案，至少两次模型调用。"
   ],
   "code": [
    "system_message：DDL 加字段注释",
    "function_list=['exc_sql']：工具名列表",
    "Assistant：Qwen-Agent 入口",
    "exc_sql：执行 SQL 的工具"
   ],
   "reuse": [
    "表结构写进系统提示，工具只负责执行。",
    "字段中文注释和业务叫法一起给，减少编字段。"
   ],
   "interview": "Text2SQL 助手的提示词就是表结构加业务术语，工具只负责执行 SQL。",
   "pitfall": "只给表名不给字段含义，模型把「入园人数」写成不存在的列。",
   "source": "第18章",
   "tags": [
    "Text2SQL",
    "Prompt",
    "工具"
   ]
  },
  {
   "id": "A-04",
   "layer": "A",
   "title": "MCP 三层组件加三种能力",
   "oneliner": "Host 跑模型，Client 通信，Server 暴露 Resources、Tools、Prompts。",
   "mechanism": [
    "MCP 由 Anthropic 于 2024 年 11 月推出，用来标准化 LLM 与外部数据源、工具的交互。",
    "MCP Host 是运行模型的环境，如 Claude Desktop、Cursor；Client 嵌在 Host 里与 Server 通信。",
    "Resources 提供结构化数据扩展上下文，Tools 执行外部操作，Prompts 是预定义指令模板。",
    "客户端接入只需一段 mcpServers 配置：command 为 npx，args 为 -y 加包名，env 放 API KEY。",
    "Python 侧用 FastMCP 加 @mcp.tool() 暴露函数，mcp.run() 启动，mcp dev 开本地调试。"
   ],
   "code": [
    "mcpServers：客户端配置",
    "FastMCP：Python Server 框架",
    "@mcp.tool()：暴露工具",
    "mcp dev：本地调试"
   ],
   "reuse": [
    "Key 放 env，不写死在代码里。",
    "工具、资源、提示三类能力按用途分开暴露。"
   ],
   "interview": "MCP 分 Host、Client、Server 三层，Server 暴露 Resources、Tools、Prompts 三类能力。",
   "pitfall": "把 key 写死在代码里而不放 env，换环境就报 No server info found。",
   "source": "第18章",
   "tags": [
    "MCP",
    "协议",
    "架构"
   ]
  },
  {
   "id": "A-05",
   "layer": "A",
   "title": "反应式智能体只做当下这一步决策",
   "oneliner": "感知、决策、执行不停循环，响应快但没有长期规划，规则一变就失效。",
   "mechanism": [
    "循环结构：LLM 分析当前情况选一个动作，执行后得到观察结果，再据此选下一个动作。",
    "优势是不做复杂推理，适合毫秒级响应场景，如机器人避障、高频交易。",
    "局限是短视，只优化当前动作，可能陷入局部循环，例如机器人绕圈。",
    "适用前提：任务规则明确、需要实时响应、不需要长期策略。",
    "私募基金问答助手按此范式做了三个工具：关键词搜索、类别查询、直接回答。"
   ],
   "code": [
    "AgentExecutor：ReAct 执行器",
    "CustomPromptTemplate：自定义提示",
    "CustomOutputParser：解析动作"
   ],
   "reuse": [
    "规则明确、单步可判的任务用反应式。",
    "多步规划任务别用，容易反复调同一个工具。"
   ],
   "interview": "反应式就是循环里让 LLM 选动作，快但短视，只适合规则明确的任务。",
   "pitfall": "用反应式跑多步规划任务，Agent 反复调同一个工具出不来。",
   "source": "第19章",
   "tags": [
    "Agent",
    "反应式",
    "规划"
   ]
  },
  {
   "id": "A-06",
   "layer": "A",
   "title": "深思熟虑智能体把流程固定成五阶段图",
   "oneliner": "感知、建模、推理、决策、报告五个节点串成有向图，每阶段用 Pydantic 约束输出。",
   "mechanism": [
    "状态用 TypedDict 定义，含研究主题、世界模型、候选方案、最终报告和当前阶段五个字段。",
    "StateGraph 依次 add_node 五个阶段，add_edge 串起来，最后 workflow.compile()。",
    "每阶段同构：检查前置数据、拼提示、调 LLM、解析结果更新状态、异常回退。",
    "推理阶段缺 world_model 时返回 current_phase='modeling'，把流程退回上一阶段重跑。",
    "各阶段输出用 Pydantic 模型约束，如 ReasoningPlan 含 confidence_level 与 pros/cons。"
   ],
   "code": [
    "StateGraph：LangGraph 状态图",
    "TypedDict：定义状态字段",
    "Pydantic：约束节点输出",
    "add_edge / compile：串图并编译"
   ],
   "reuse": [
    "步骤固定的复杂分析用图声明，把规划权收回代码。",
    "每个节点校验前置状态，缺数据就回退。"
   ],
   "interview": "深思熟虑型把规划拆成固定图节点，靠 StateGraph 加 Pydantic 保证每步结构。",
   "pitfall": "节点间不校验前置状态，缺数据也往下跑，最后报告整段是空。",
   "source": "第19章",
   "tags": [
    "Agent",
    "LangGraph",
    "规划"
   ]
  },
  {
   "id": "A-07",
   "layer": "A",
   "title": "混合式先分类再分流，快慢两套路径",
   "oneliner": "协调层判 query_type 和 processing_mode，简单查询走反应式，复杂分析走深思熟虑。",
   "mechanism": [
    "三层设计：底层反应式处理行情等即时查询，中层协调分流，顶层做组合分析与长期规划。",
    "assess_query 输出 query_type（紧急/信息/分析）和 processing_mode（reactive/deliberative）。",
    "实测：「今天上证指数表现如何」判为 reactive，用时 11.34 秒；组合调整判为 deliberative，用时 112 秒。",
    "深思熟虑分支再拆 collect_data、analyze_data、generate_recommendations 三个节点。",
    "WealthAdvisorState 用 Literal 限定 current_phase 的合法取值，路由按状态字段走条件边。"
   ],
   "code": [
    "assess_query：入口分类节点",
    "add_conditional_edges：条件路由",
    "Literal：限定状态取值",
    "ChatTongyi：通义模型"
   ],
   "reuse": [
    "入口先做复杂度分类，简单问题别走重流程。",
    "把「快路径」的延迟目标写进产品指标。"
   ],
   "interview": "混合式在入口加分类节点，按查询复杂度选反应式或深思熟虑，兼顾延迟与质量。",
   "pitfall": "只用一种模式跑所有查询，简单问题也要等两分钟。",
   "source": "第19章",
   "tags": [
    "Agent",
    "混合式",
    "路由"
   ]
  },
  {
   "id": "A-08",
   "layer": "A",
   "title": "工具循环靠 ToolNode 和条件边",
   "oneliner": "bind_tools 让 LLM 产出 tool_calls，ToolNode 执行后回填消息，条件边决定继续还是结束。",
   "mechanism": [
    "llm.bind_tools(tools) 把工具描述绑到模型，模型在响应里给出 tool_calls。",
    "should_continue_tools 检查最后一条消息有无 tool_calls，有就返回 'tools'，否则 'end'。",
    "ToolNode 从 AIMessage 取工具名和参数，执行后封装成 ToolMessage 写回状态。",
    "工具调用是循环：拿到结果后 LLM 可能再调下一个工具，直到信息够用。",
    "StateGraph 固定路由用 add_edge，条件路由用 add_conditional_edges。"
   ],
   "code": [
    "bind_tools：绑定工具",
    "ToolNode：执行工具节点",
    "add_conditional_edges：循环路由",
    "AIMessage.tool_calls：判断是否继续"
   ],
   "reuse": [
    "循环出口只看 tool_calls，不看模型文本。",
    "给循环加最大轮次，防止模型无限调工具。"
   ],
   "interview": "LangGraph 的循环由 LLM 节点、ToolNode 和检查 tool_calls 的条件边组成。",
   "pitfall": "条件边只看消息文本不看 tool_calls，循环永远退不出来。",
   "source": "第19章",
   "tags": [
    "Agent",
    "LangGraph",
    "工具循环"
   ]
  },
  {
   "id": "A-09",
   "layer": "A",
   "title": "决策树画得出来就别上 Agent",
   "oneliner": "路径固定就写工作流；Agent 只接步骤不可预测的开放任务，还要控制工具数量。",
   "mechanism": [
    "四条判断标准：任务复杂性、任务价值、关键子任务能否胜任、错误成本。",
    "Agent 只基于 10 到 20k token 的有限上下文做决策，要按这个视角模拟。",
    "工具太多必然乱调用，按系统接口聚类拆分给多个 Agent，每个控制在 15 个以内。",
    "三原则：设计简洁、过程透明、工具配文档和测试。",
    "先从简单提示和固定工作流开始，简单方案解决不了再多步 Agent。"
   ],
   "code": [
    "RAG / System Prompt：先试简单方案",
    "Tool Description：写清边界",
    "15 个工具：单个 Agent 的上限参考"
   ],
   "reuse": [
    "立项前先画决策树，能画全就不上 Agent。",
    "工具按系统边界拆给不同 Agent。"
   ],
   "interview": "能用工作流画出的路径不要上 Agent，它的成本和不确定性要由高价值、难预测的任务承担。",
   "pitfall": "一上来就堆多 Agent，把三个月能上线的需求做成半年。",
   "source": "第19章",
   "tags": [
    "Agent",
    "选型",
    "架构判断"
   ]
  },
  {
   "id": "A-10",
   "layer": "A",
   "title": "LangSmith 追踪靠环境变量加标签",
   "oneliner": "设好 API key 和 tracing 开关，再用 tags、metadata 打标，才能按业务维度筛 trace。",
   "mechanism": [
    "三个环境变量：LANGSMITH_API_KEY、LANGCHAIN_TRACING_V2=true、LANGCHAIN_PROJECT。",
    "agent.invoke(initial_state, config=config) 传入 RunnableConfig 就自动上报。",
    "tags 打 customer-{id}、risk_tolerance，metadata 放 portfolio_value、user_query。",
    "控制台能看每个节点的输入输出、完整 Prompt、工具参数和状态转换。",
    "Trace 右上角可 Add Example to dataset，把这次调用存成带参考答案的样本。"
   ],
   "code": [
    "LANGSMITH_API_KEY：鉴权",
    "LANGCHAIN_TRACING_V2=true：开启追踪",
    "RunnableConfig：传 tags 与 metadata",
    "LANGCHAIN_PROJECT：项目分组"
   ],
   "reuse": [
    "每次调用至少打 user_id 和业务场景两个标签。",
    "把线上坏例子一键存进测试集。"
   ],
   "interview": "LangSmith 用环境变量开启追踪，RunnableConfig 打 tag 和 metadata 做过滤。",
   "pitfall": "只开 tracing 不打 tag，几百条 trace 里找不到出问题的那条。",
   "source": "第20章",
   "tags": [
    "Agent",
    "可观测性",
    "LangSmith"
   ]
  },
  {
   "id": "A-11",
   "layer": "A",
   "title": "评估三件套：测试集、评估器、批量跑",
   "oneliner": "8 条用例覆盖反应式、深思熟虑和边界情况，两类评估器打分，evaluate 批量执行。",
   "mechanism": [
    "测试集 8 条：反应式查询 3 条、深思熟虑查询 3 条、边界情况 2 条。",
    "用例结构是 inputs（user_query、customer_id）加 expected_outputs（模式、关键词）。",
    "模式评估器对错给 1.0 或 0.0；完整性评估器按命中关键词比例给分。",
    "evaluate 传 test_function、data、evaluators 和 experiment_prefix，一次跑完全部用例。",
    "Prompt 版本在代码和 Git 里管，LangSmith 用 experiment_prefix 区分 v1、v2 的运行记录。"
   ],
   "code": [
    "evaluate：批量评估入口",
    "experiment_prefix：区分实验版本",
    "max_concurrency：并发评估",
    "Dataset：测试集"
   ],
   "reuse": [
    "测试集必须包含空输入和超范围问题。",
    "每次改 Prompt 跑同一套用例，别只测手头几个例子。"
   ],
   "interview": "评估分三层：测试集定义期望、评估器打分、evaluate 批量跑并对比不同 Prompt 版本。",
   "pitfall": "只测正常问法，空输入和超范围问题上线才暴露。",
   "source": "第20章",
   "tags": [
    "Agent",
    "评估",
    "测试集"
   ]
  },
  {
   "id": "A-12",
   "layer": "A",
   "title": "评估器用 LLM 当判官打分",
   "oneliner": "create_llm_as_judge 加内置 prompt，11 个评估器覆盖正确性、简洁性、幻觉、计划遵循。",
   "mechanism": [
    "create_llm_as_judge 接收 prompt、feedback_key、judge，continuous=True 返回 0 到 1 分。",
    "内置 11 个 prompt：正确性、简洁性、相关性、RAG 帮助性、毒性、幻觉、代码正确性、计划遵循等。",
    "正确性实测：高质量回答 0.8，部分正确 0.6，答错 0.0；简洁性带冗余信息降到 0.2。",
    "groundedness 评输出是否忠于检索上下文；retrieval relevance 评检索内容是否相关。",
    "judge 模型建议 temperature=0，评估模型和被测模型可以是同一个。"
   ],
   "code": [
    "pip install openevals：评估库",
    "create_llm_as_judge：LLM 判官",
    "CORRECTNESS_PROMPT：内置提示",
    "HALLUCINATION_PROMPT：幻觉检测"
   ],
   "reuse": [
    "先用内置评估器跑基线，再写业务专用 prompt。",
    "判官 temperature 设 0，减少评分波动。"
   ],
   "interview": "openevals 用 11 个现成 judge prompt 包成评估器，业务指标再自己写 prompt。",
   "pitfall": "拿通用 prompt 直接评业务指标，分数好看但对业务没意义。",
   "source": "第20章",
   "tags": [
    "Agent",
    "评估",
    "LLM判官"
   ]
  },
  {
   "id": "A-13",
   "layer": "A",
   "title": "评估与观测工具按技术栈选",
   "oneliner": "用 LangChain 选 LangSmith；不用则选 Langfuse，开源且能 Docker 自部署。",
   "mechanism": [
    "Langfuse 是开源 LLMOps 平台，做可观测、提示管理、轻量评估，任何框架和模型都能接。",
    "接入只需三个环境变量：LANGFUSE_SECRET_KEY、LANGFUSE_PUBLIC_KEY、LANGFUSE_BASE_URL。",
    "LangSmith 是 LangChain 官方商业产品，深度耦合 LangChain 生态。",
    "DeepEval 类比 Pytest，负责上线前跑分；LangSmith 类比 Sentry，负责线上追踪和成本分析。",
    "只测单个环节时自己写 print 也够，别为一个小 bug 引入整套平台。"
   ],
   "code": [
    "Langfuse：开源可自部署",
    "LANGFUSE_SECRET_KEY / PUBLIC_KEY / BASE_URL：接入配置",
    "DeepEval：上线前评测",
    "LangSmith：LangChain 生态追踪"
   ],
   "reuse": [
    "合规要求高就自部署 Langfuse。",
    "先定要回答的问题，再选工具，别反过来。"
   ],
   "interview": "LangSmith 绑 LangChain，Langfuse 框架无关且能自部署，选型看技术栈和合规要求。",
   "pitfall": "为一个环节的 bug 引入整套平台，胶水代码比业务代码还多。",
   "source": "第20章",
   "tags": [
    "Agent",
    "可观测性",
    "工具选型"
   ]
  },
  {
   "id": "A-14",
   "layer": "A",
   "title": "Agent 记忆要从内存列表升级到索引",
   "oneliner": "原生 Agent 把文档放进内存 list，生命周期只到单次请求；换成 ES 索引才扛得住上亿文档。",
   "mechanism": [
    "原生 Agent 把对话和上传文件塞进内存 list，生命周期仅限单次请求，每次都要重新解析。",
    "Qwen-Agent 的 doc_parser 把解析后的纯文本按 hash 命名缓存到 workspace/tools/doc_parser。",
    "文件缓存启动时必须把所有缓存读进内存重建 BM25 映射表，1G 文档就要占 1G 以上内存。",
    "Elasticsearch 把倒排索引和向量存在磁盘，启动直接连库，内存只留热点缓存。",
    "单个 ES 索引文档上限为 2,147,483,519，单机检索耗时在 0.005 到 5.6 秒之间。"
   ],
   "code": [
    "qwen-agent doc_parser：文件解析缓存",
    "Elasticsearch：倒排索引加向量",
    "BM25：内存映射表"
   ],
   "reuse": [
    "文档量超过单机内存就换外部索引。",
    "缓存只用于解析结果，不要当检索索引。"
   ],
   "interview": "Agent 记忆的存储从内存列表走到外部索引，规模上来后内存方案先崩。",
   "pitfall": "把文件缓存当索引，库一大启动就爆内存。",
   "source": "第21章",
   "tags": [
    "Agent",
    "记忆",
    "Elasticsearch"
   ]
  },
  {
   "id": "A-15",
   "layer": "A",
   "title": "三级架构处理百万字上下文",
   "oneliner": "Qwen-Agent 用关键词检索、分块阅读、多跳推理三级，逐级补前一级漏掉的块。",
   "mechanism": [
    "级别一把查询拆成指令和信息，信息再生成中英关键词，用 BM25 召回不超过 512 字的块，塞进 8k 上下文。",
    "级别二对每个块让模型判断相关性，不相关输出「无」，相关的块再当查询做一次 BM25。",
    "级别二把重检索结果总长控制在 8k 以内，避免撑爆上下文。",
    "级别三把级别二封装成一个工具，由 Function Call 或 ReAct 智能体调用做多跳推理。",
    "多跳例子：先问第五交响曲创作于哪个世纪得到 19 世纪，再问 19 世纪发明了什么交通工具。"
   ],
   "code": [
    "qwen_agent/memory/memory.py：三级记忆",
    "retrieval.py：BM25 检索",
    "simple_doc_parser.py：文档解析",
    "ReAct：多跳调用"
   ],
   "reuse": [
    "长文档问答先做关键词级召回，再逐级精读。",
    "每一级都要限制返回长度，别把整库塞进上下文。"
   ],
   "interview": "百万字上下文靠分级：先关键词粗筛，再分块判断相关性，最后把整级封成工具做多跳。",
   "pitfall": "只做一级关键词检索，块与查询词重叠少就直接召回失败。",
   "source": "第21章",
   "tags": [
    "Agent",
    "长文档",
    "检索"
   ]
  },
  {
   "id": "A-16",
   "layer": "A",
   "title": "BM25 打分看词频、稀有度和字段长度",
   "oneliner": "ES 的 _score 由 TF、IDF、字段长度归一化三因素合成，短字段命中稀有词得分最高。",
   "mechanism": [
    "词频 TF：查询词在文档中出现次数越多，得分越高。",
    "逆文档频率 IDF：词越稀有权重越高，「保险」几乎每篇都有所以权重低。",
    "字段长度归一化：同样命中「雇主险」，短文档比五千字文档更能凸显这个词。",
    "搜索时先对查询分词，再逐文档按三因素算分，最后合并成浮点 _score。",
    "match 查询加 operator: and，要求文档同时包含分词后的重要词，结果更精确。"
   ],
   "code": [
    "Elasticsearch：BM25 打分",
    "match query：全文匹配",
    "operator: and：要求全部词命中"
   ],
   "reuse": [
    "按段落建文档，别把整篇文件当一条。",
    "专业术语多的场景靠 BM25 锁精确匹配。"
   ],
   "interview": "BM25 由词频、逆文档频率和字段长度归一化三部分合成，短字段命中稀有词分最高。",
   "pitfall": "把整篇文件当一条 ES 文档，结果只能到文件级，回不到段落。",
   "source": "第21章",
   "tags": [
    "检索",
    "BM25",
    "Elasticsearch"
   ]
  },
  {
   "id": "A-17",
   "layer": "A",
   "title": "OpenManus 六层架构拆模块",
   "oneliner": "交互、入口、智能体、工具、流程控制、基础设施六层分开，十二类工具全部可插拔。",
   "mechanism": [
    "用户交互层可选 CLI、Web API、可视化界面三种形态。",
    "应用入口层分 main.py 单智能体、run_flow.py 多智能体、run_mcp.py 远程工具接入。",
    "智能体层按 BaseAgent → ReActAgent → ToolCallAgent → Manus 四级继承，逐级叠加能力。",
    "流程控制层 PlanningFlow 把任务拆成线性或 DAG 步骤，支持角色分工。",
    "基础设施层含 Docker 部署、Redis 缓存、FAISS 长期记忆，LLM 适配器支持 10 多个模型。"
   ],
   "code": [
    "main.py / run_flow.py / run_mcp.py：三种入口",
    "BaseAgent→Manus：四级继承",
    "PlanningFlow：流程编排",
    "FAISS / Redis：记忆与缓存"
   ],
   "reuse": [
    "业务逻辑写在工具或流程层，别塞进核心循环。",
    "换模型只改适配器，不动 Agent 主流程。"
   ],
   "interview": "OpenManus 用六层拆开交互、入口、Agent、工具、流程和基础设施，能力靠继承逐层叠加。",
   "pitfall": "把业务逻辑写进 Manus 子类，换个场景就得动核心循环。",
   "source": "第22章",
   "tags": [
    "OpenManus",
    "架构",
    "Agent"
   ]
  },
  {
   "id": "A-18",
   "layer": "A",
   "title": "20 步封顶的 think-act 主循环",
   "oneliner": "run() 里 while 同时判步数和状态，每步先 think 选工具，再由 act 执行并回写内存。",
   "mechanism": [
    "BaseAgent.run() 先把 request 写进 memory，再循环到步数或状态结束。",
    "max_steps 默认 20，current_step 从 1 开始计数。",
    "ReActAgent.step() 调 think()，返回 False 就跳过 act，返回 True 才执行 act()。",
    "ToolCallAgent.think() 用 llm.ask_tool 传入 tools 参数，tool_choice 为 AUTO。",
    "act() 把每个工具结果包成 tool_message 写回 memory，带上 tool_call_id 和可选截图。"
   ],
   "code": [
    "BaseAgent.run()：主循环",
    "max_steps=20：步数上限",
    "ask_tool(tool_choice='auto')：模型选工具",
    "tool_message：结果回写"
   ],
   "reuse": [
    "循环必须同时有步数上限和终态判断。",
    "每次工具结果都带调用 ID，方便回溯。"
   ],
   "interview": "Agent 主循环是 think、act、回写三步，步数上限是最后一道刹车。",
   "pitfall": "复杂页面任务 20 步不够，跑到一半就停在半路。",
   "source": "第22章",
   "tags": [
    "Agent",
    "主循环",
    "OpenManus"
   ]
  },
  {
   "id": "A-19",
   "layer": "A",
   "title": "浏览器 Agent 用文本编号替代视觉模型",
   "oneliner": "可交互元素编成 [index]<type>text</type>，模型靠文本匹配选 index，省掉截图识图成本。",
   "mechanism": [
    "browser_use 用 DomService 遍历 DOM，识别 button、input、a 等元素，再用 JS 在页面渲染索引标签。",
    "状态格式为 [0]<button>搜索</button>，模型返回 {\"action\": \"click_element\", \"index\": 2}。",
    "携程国内机票页一次识别出 133 个可交互元素。",
    "除索引点击外还支持 click_coordinates(x, y) 坐标点击和 scroll_to_text。",
    "动态弹窗里的元素默认不会被编号，日历格子就是典型失败场景。"
   ],
   "code": [
    "BrowserUseTool：浏览器工具",
    "DomService：DOM 遍历",
    "get_current_state()：带编号的页面状态",
    "click_element(index)：按编号点击"
   ],
   "reuse": [
    "优先用 DOM 文本编号，视觉模型只做兜底。",
    "动态弹窗要单独补编号规则。"
   ],
   "interview": "浏览器 Agent 先用 DOM 编号把页面变成文本，模型选编号比截图识图便宜也稳定。",
   "pitfall": "点了日期框弹出日历，弹窗元素没编号，Agent 永远点不到日期。",
   "source": "第22章",
   "tags": [
    "Agent",
    "浏览器",
    "DOM"
   ]
  },
  {
   "id": "A-20",
   "layer": "A",
   "title": "复杂页面先试 URL 直跳，再上视觉兜底",
   "oneliner": "携程日历点不中，两条路：把 URL 参数写进知识库绕开交互，或截图让 gui-plus 返回坐标。",
   "mechanism": [
    "RAG 策略在启动时读取 knowledge/*.txt 注入系统提示词，写清 oneway-{出发}-{到达}?depdate={日期} 的 URL 模板。",
    "GUI 策略调 gui-plus 模型，输入页面截图，返回 action 为 CLICK 加 x、y 坐标。",
    "简化后的 click 和 type 内部走三层定位：Playwright Locator 精确匹配、JS 动态查找、gui-plus 视觉回退。",
    "ElementClassifier 给元素分 14 类并打 0 到 100 置信度，1 到 31 的数字自动标为 CALENDAR。",
    "把日历弹窗元素补进编号后，可交互元素从 125 个增加到 233 个。"
   ],
   "code": [
    "gui-plus：视觉坐标回退",
    "ElementClassifier：元素分类",
    "Playwright Locator：精确匹配",
    "knowledge/travel_tools.txt：URL 模板"
   ],
   "reuse": [
    "能拼 URL 就不点页面，稳定性和速度都更好。",
    "视觉点击只当第三层兜底。"
   ],
   "interview": "页面交互按成本分层：URL 直跳、DOM 定位、视觉点击，逐层降级。",
   "pitfall": "只调编号规则不换方案，日历弹窗依旧点不中。",
   "source": "第22章",
   "tags": [
    "Agent",
    "浏览器",
    "视觉兜底"
   ]
  },
  {
   "id": "A-21",
   "layer": "A",
   "title": "ReAct 把推理写进固定文本格式",
   "oneliner": "Thought、Action、Action Input、Observation 循环到模型自认有答案。",
   "mechanism": [
    "AGENT_TMPL 规定 Question、Thought、Action、Action Input、Observation 依次出现，可重复 N 次。",
    "收尾固定为 Thought: 我现在知道最终答案，再接 Final Answer。",
    "{tools} 填工具描述，{tool_names} 填可选工具名，{agent_scratchpad} 存中间步骤。",
    "agent_scratchpad 像草稿本，存放思考过程和工具调用记录，回填进提示词。",
    "LLMSingleActionAgent 配 stop=[\"\\nObservation:\"]，让模型停在观察位前。"
   ],
   "code": [
    "AGENT_TMPL：ReAct 模板",
    "LLMSingleActionAgent：单动作代理",
    "stop=[\"\\nObservation:\"]：截断输出",
    "agent_scratchpad：中间步骤"
   ],
   "reuse": [
    "ReAct 必须设 stop 词，否则模型会自己编 Observation。",
    "工具报错原样写进 Observation，模型才有机会改。"
   ],
   "interview": "ReAct 用固定文本格式把思考、行动、观察串成循环，stop 词是工程上的关键细节。",
   "pitfall": "不设 stop 词，模型自己编造 Observation 继续往下写。",
   "source": "第24章",
   "tags": [
    "Agent",
    "ReAct",
    "LangChain"
   ]
  },
  {
   "id": "A-22",
   "layer": "A",
   "title": "流程固定用 LCEL，动态决策用 Agent",
   "oneliner": "LCEL 用管道符串 Runnable，步骤由开发者写死；Agent 用 ReAct 让模型自己决定下一步。",
   "mechanism": [
    "LCEL 支持串联 A | B | C、并行分支 {\"x\": A, \"y\": B} 和 stream 流式输出。",
    "RunnableLambda 可以把普通函数包装成链上的节点。",
    "create_react_agent 加 AgentExecutor 自主选工具、多轮推理。",
    "LCEL 版不具备自主决策，换任务就得改代码；Agent 版多花 token 换灵活。",
    "故障诊断链是固定顺序：DNS 查 IP、Ping 测连通、接口检查、日志分析。"
   ],
   "code": [
    "LCEL：A | B | C 管道",
    "RunnableLambda：函数节点",
    "StrOutputParser：解析输出",
    "create_react_agent：自主 Agent"
   ],
   "reuse": [
    "步骤能写死就用 LCEL，成本可控。",
    "只有分支不可预测时才上 ReAct。"
   ],
   "interview": "固定流程用 LCEL，开放决策用 Agent，前者便宜可控，后者灵活但多花 token。",
   "pitfall": "固定流程也上自主 Agent，多花 token 换来不确定性。",
   "source": "第24章",
   "tags": [
    "Agent",
    "LCEL",
    "LangChain"
   ]
  },
  {
   "id": "A-23",
   "layer": "A",
   "title": "Agent 框架四层：适配、工具、记忆、编排",
   "oneliner": "LLM 适配、工具注册调度、Context 管理、控制流编排，四层缺一不可。",
   "mechanism": [
    "LLM 适配层用适配器模式抹平各家 API 差异，统一调用方式、参数和消息格式。",
    "工具注册把函数的 name、docstring、type hints 转成 JSON Schema 喂给 LLM。",
    "Context 管理分短期和长期：短期滑动窗口，长期向量库检索。",
    "控制流有四种形态：管道 Pipeline、Loop 即 ReAct、DAG 固定依赖、Chat 自由讨论。",
    "LangChain 用 @tool，Qwen-Agent 用 @register_tool 加类，LlamaIndex 用 FunctionTool。"
   ],
   "code": [
    "@tool / @register_tool：工具注册",
    "RunnableWithMessageHistory：对话历史",
    "Pipeline / Loop / DAG / Chat：四种控制流"
   ],
   "reuse": [
    "看框架先看四层各做了什么，别只背 API。",
    "自研框架按四层拆模块，边界清楚。"
   ],
   "interview": "Agent 框架就四层：统一模型接口、工具 Schema 注册、长短记忆、控制流编排。",
   "pitfall": "只会上层 API 拼装，说不清框架在适配、工具、记忆、编排上各做了什么。",
   "source": "第25章",
   "tags": [
    "Agent",
    "框架",
    "架构"
   ]
  },
  {
   "id": "A-24",
   "layer": "A",
   "title": "选框架看瓶颈：编排、检索、执行、协作",
   "oneliner": "LangChain 管流程，LlamaIndex 管索引，Qwen-Agent 管执行，AutoGen 管协作。",
   "mechanism": [
    "LangChain 生态最全，支持 100 多个模型、50 多个向量库，用 LCEL 管道编排，多 Agent 交给 LangGraph。",
    "LlamaIndex 是 Index-First，用 VectorStoreIndex 建索引并 persist 持久化，重检索质量。",
    "Qwen-Agent 内置 code_interpreter 沙箱，能写 Python 画图做数据分析并自我修正。",
    "AutoGen 用 GroupChat 加 GroupChatManager 编排多角色，发言策略可选 round_robin、random、auto。",
    "组合方案：LlamaIndex 建索引做检索，再用 LangChain 的 LCEL 串报告生成和工具调用。"
   ],
   "code": [
    "LCEL：LangChain 编排",
    "VectorStoreIndex：LlamaIndex 索引",
    "code_interpreter：Qwen-Agent 沙箱",
    "GroupChatManager：AutoGen 多角色"
   ],
   "reuse": [
    "先定瓶颈在流程、检索、执行还是协作，再选框架。",
    "允许组合，别强求一个框架全包。"
   ],
   "interview": "流程复杂用 LangChain，检索为主用 LlamaIndex，多角色用 AutoGen。",
   "pitfall": "十万份 PDF 做问答先选 LangChain，手写分块向量化，检索不如 LlamaIndex。",
   "source": "第25章",
   "tags": [
    "Agent",
    "框架选型",
    "对比"
   ]
  },
  {
   "id": "A-25",
   "layer": "A",
   "title": "报错回灌给模型是最划算的自我修复",
   "oneliner": "执行报错时把错误信息和原代码一起喂回 LLM，max_retries=3 能修掉八成 Pandas 类型错误。",
   "mechanism": [
    "直接在宿主机跑 LLM 生成的代码有风险，可能含 rm -rf 或死循环。",
    "沙箱方案用 Daytona、E2B 或自建 Docker，每次执行起隔离容器，只取回 stdout 和 stderr。",
    "执行超过 30 秒或内存溢出直接销毁容器，主进程不受影响。",
    "自我修复是 while 循环：拿到 Error 后不抛给用户，把错误信息和原代码回灌让模型重写。",
    "max_retries=3 时约 80% 的 Pandas 数据类型错误能被自动修好。"
   ],
   "code": [
    "Daytona / E2B：代码沙箱",
    "Code Interpreter：执行环境",
    "max_retries=3：重试上限",
    "stdout / stderr：回灌内容"
   ],
   "reuse": [
    "生成的代码一律进沙箱执行，不在宿主机跑。",
    "报错先回灌一次，再决定是否抛给用户。"
   ],
   "interview": "代码 Agent 的可靠性来自沙箱隔离和错误回灌，重试三次能修掉多数类型错误。",
   "pitfall": "把报错直接抛给用户，白白浪费一次可自愈的机会。",
   "source": "第23章",
   "tags": [
    "Agent",
    "自我修复",
    "沙箱"
   ]
  },
  {
   "id": "A-26",
   "layer": "A",
   "title": "死循环用相似度拦截，省钱靠模型分级",
   "oneliner": "连续 3 次动作高度相似且无新结果就强制打断；路由用小模型，推理用大模型。",
   "mechanism": [
    "每次行动前计算当前 Action 与过去 3 次 Action 的语义相似度。",
    "连续 3 次做几乎相同的操作且没产出新结果，程序强制打断并提示换策略或求助。",
    "模型分级：意图识别和简单路由用 Qwen-Flash，核心推理和代码生成用 Qwen-Max 或 Qwen-Plus。",
    "把几页纸的 System Prompt 精简成 Markdown 表格，Context 输入成本降 40%。",
    "排查慢要看 Trace：有案例 LLM 思考只花 3 秒，search_tool 花了 25 秒。"
   ],
   "code": [
    "LangFuse：Trace 分析",
    "Qwen-Flash：轻量路由模型",
    "Qwen-Max：核心推理",
    "timeout=5s：工具超时"
   ],
   "reuse": [
    "给每个工具设超时，别等它自己重试。",
    "意图识别和简单路由换小模型。"
   ],
   "interview": "Agent 防死循环靠相似度检测加最大步数，省钱靠模型分级和上下文瘦身。",
   "pitfall": "工具不设超时，等它自己重试，响应拖到 30 秒还怪模型慢。",
   "source": "第23章",
   "tags": [
    "Agent",
    "死循环",
    "成本优化"
   ]
  },
  {
   "id": "A-27",
   "layer": "A",
   "title": "Tokenizer 必须与模型同源",
   "oneliner": "同一个 ID 在 BERT 词表里是苹果，在别的模型词表里可能是汽车，混用等于喂乱码。",
   "mechanism": [
    "每个模型预训练时有自己的词表和切词算法，如 BPE、WordPiece。",
    "特殊控制标记不通用，BERT 用 [CLS]，Llama 用 <s>，起止和截断逻辑完全不同。",
    "BERT 切「今天天气很好」得到 [101, 872, 1921, 2523, 1962, 102]，换模型后这些 ID 指向别的 token。",
    "部署时 model 和 tokenizer 必须来自同一 checkpoint，用同一个路径分别 from_pretrained。",
    "微调数据、推理服务和评测脚本要用同一套分词配置。"
   ],
   "code": [
    "AutoTokenizer：与模型同路径加载",
    "WordPiece / BPE：切词算法",
    "CLS / <s>：模型私有特殊标记"
   ],
   "reuse": [
    "tokenizer 和 model 绑在同一个目录，别分开缓存。",
    "换底座模型时，训练数据要重新分词。"
   ],
   "interview": "词表和特殊 token 都是模型私有的，tokenizer 必须和模型同 checkpoint，否则 ID 全错位。",
   "pitfall": "为了省事拿现成的 BERT tokenizer 去处理喂给 Qwen 的数据，输出全是乱码。",
   "source": "第27章",
   "tags": [
    "Tokenizer",
    "HuggingFace",
    "部署"
   ]
  },
  {
   "id": "T-01",
   "layer": "T",
   "title": "国内下模型走镜像或 ModelScope",
   "oneliner": "from_pretrained 报连接错误先设镜像端点，且必须早于导入 transformers。",
   "mechanism": [
    "在导入 transformers 之前设 HF_ENDPOINT 为 https://hf-mirror.com，下载自动走镜像。",
    "方案二用 modelscope 的 snapshot_download('qwen/Qwen2.5-0.5B') 把权重下到本地目录。",
    "下载完成后用 AutoTokenizer 和 AutoModel 从本地目录加载，传入 model_dir 路径。",
    "ModelScope 负责下载，HuggingFace 负责加载，两者分工不冲突。",
    "缓存目录可用 cache_dir 或 HF_HOME 统一指向 /root/autodl-tmp/models。"
   ],
   "code": [
    "HF_ENDPOINT=https://hf-mirror.com：镜像端点",
    "snapshot_download：ModelScope 下载",
    "HF_HOME / cache_dir：统一缓存目录"
   ],
   "reuse": [
    "把镜像设置写进启动脚本第一行。",
    "权重先落到本地盘，再让训练脚本从本地加载。"
   ],
   "interview": "国内报 ConnectionError 先设 HF_ENDPOINT 镜像，或用 ModelScope 下载再本地加载。",
   "pitfall": "在导入 transformers 之后才设 HF_ENDPOINT，变量不生效，照样连不上。",
   "source": "第26章",
   "tags": [
    "HuggingFace",
    "模型下载",
    "环境配置"
   ]
  },
  {
   "id": "T-02",
   "layer": "T",
   "title": "底座不带分类头，要用 For 系列",
   "oneliner": "AutoModel 输出隐藏状态，For 系列多接一个分类头，直接给 logits。",
   "mechanism": [
    "AutoModel 只有底座，bert-base-chinese 输出 768 维隐藏状态，适合自己搭网络。",
    "指定 num_labels=2 加载 For 系列，会在底座后加一层 Linear(768, 2) 分类头。",
    "手写推理：tokenizer 出 input_ids 和 attention_mask，前向取 logits，softmax 后 argmax。",
    "logits [2.8590, -2.7449] 经 softmax 得 [0.9963, 0.0037]，再用 id2label 查表出标签。",
    "tokenizer 返回的 attention_mask 中 1 是真实 token，0 是 padding。"
   ],
   "code": [
    "AutoModelForSequenceClassification：带分类头",
    "num_labels=2：二分类",
    "softmax + argmax：取预测类别",
    "id2label：id 转标签"
   ],
   "reuse": [
    "分类任务直接加载 For 系列，别自己接 Linear。",
    "推理输出先 softmax 再看置信度。"
   ],
   "interview": "底座出向量，For 系列出分数；推理走 tokenize、logits、softmax、id2label。",
   "pitfall": "拿 AutoModel 的输出直接当分类结果，底座没有分类头，维度对不上。",
   "source": "第26章",
   "tags": [
    "HuggingFace",
    "分类",
    "推理"
   ]
  },
  {
   "id": "T-03",
   "layer": "T",
   "title": "按批动态补齐比全补到 512 省得多",
   "oneliner": "全部补到 512 会让显卡算大量无效 0，按批内最长长度补齐能同时省显存和时间。",
   "mechanism": [
    "预处理阶段 tokenizer 只设 truncation=True、max_length=128，不设 padding。",
    "DataCollatorWithPadding 在组 batch 时补到该批最长长度，不按全局固定长度。",
    "Trainer 配置 learning_rate=2e-5、batch_size=4、epochs=3、weight_decay=0.01。",
    "eval_strategy 和 save_strategy 都设 epoch，每个 epoch 结束评估并保存检查点。",
    "Trainer 接管 forward、backward、optimizer.step、混合精度和多卡。"
   ],
   "code": [
    "DataCollatorWithPadding：批内动态补齐",
    "TrainingArguments：训练参数",
    "Trainer：训练循环",
    "fp16=True：混合精度"
   ],
   "reuse": [
    "padding 交给 collator，tokenizer 只做截断。",
    "小显存先降 batch 再开梯度累积。"
   ],
   "interview": "padding 交给 DataCollator 按批动态做，训练循环交给 Trainer，能省显存也省代码。",
   "pitfall": "统一 padding 到 512，短句补几百个 0，显存和时间全浪费。",
   "source": "第26章",
   "tags": [
    "HuggingFace",
    "训练",
    "显存优化"
   ]
  },
  {
   "id": "T-04",
   "layer": "T",
   "title": "LoRA 只训旁路 BA，推理再合并回 W",
   "oneliner": "前向变成 h=Wx+BAx，W 冻结，A 降维 B 升维，最后得到低秩的 ΔW。",
   "mechanism": [
    "核心假设：微调产生的 ΔW 内在低秩，做 SVD 后奇异值衰减很快。",
    "A 用高斯分布初始化，B 初始化为全 0，训练开始时旁路是零矩阵。",
    "推理时把 BA 加回 W，即 (W+BA)x，不引入额外推理延迟。",
    "多任务切换只换 BA：W0+B1A1 换成 W0+B2A2。",
    "秩一般取 1、2、4、8，任务大再往上加；可训练参数占 1% 到 10%。"
   ],
   "code": [
    "LoRA：低秩适配",
    "PEFT：参数高效微调库",
    "rank：低秩维度",
    "merge_and_unload：推理前合并"
   ],
   "reuse": [
    "多业务共用底座，每个业务存一套 LoRA 权重。",
    "推理前合并权重，避免额外延迟。"
   ],
   "interview": "LoRA 用低秩 BA 近似 ΔW，W 冻结，只训 A 和 B，推理合并回去没有额外延迟。",
   "pitfall": "以为 LoRA 压缩了模型权重；它省的是可训练参数和优化器状态，推理仍是全尺寸。",
   "source": "第28章",
   "tags": [
    "LoRA",
    "微调",
    "PEFT"
   ]
  },
  {
   "id": "T-05",
   "layer": "T",
   "title": "7B 模型 LoRA 显存约 19GB",
   "oneliner": "FP16 权重 14GB，激活按 30% 算 4.2GB，优化器和梯度因 LoRA 只占 0.7GB。",
   "mechanism": [
    "总显存约等于权重加优化器状态加梯度加激活值，权重按参数量乘 2 字节算。",
    "7B 权重 7e9×2 字节约 14GB，优化器约 0.56GB，梯度约 0.14GB。",
    "激活值按权重的 20% 到 50% 估，示例取 30% 约 4.2GB，合计约 19GB。",
    "13B 仅权重就要 26GB，7B 用一张 24GB 的 4090 够，13B 要 32GB 以上或上 QLoRA。",
    "QLoRA 把权重量化到 4-bit，约每参数 0.5 字节，7B 只需 6 到 8GB。"
   ],
   "code": [
    "QLoRA：4-bit 量化微调",
    "AdamW：优化器状态 8 字节每参数",
    "RTX 4090 24GB：7B LoRA 可跑"
   ],
   "reuse": [
    "先按权重加激活估显存，再决定 LoRA 还是 QLoRA。",
    "13B 以上单卡优先 QLoRA。"
   ],
   "interview": "LoRA 显存几乎只剩权重，7B 约 14GB 权重加激活共 19GB，13B 要 QLoRA 或 32GB 卡。",
   "pitfall": "按全量微调估显存，以为 7B 要上百 GB，直接放弃单卡方案。",
   "source": "第28章",
   "tags": [
    "LoRA",
    "显存",
    "QLoRA"
   ]
  },
  {
   "id": "T-06",
   "layer": "T",
   "title": "1000 到 6000 条高质量数据就能起效",
   "oneliner": "7B 做简单任务 1000 到 5000 条够用，复杂任务 5000 到 50000 条，质量优先于数量。",
   "mechanism": [
    "数据三项要求：格式和指令风格一致、答案准确、指令和输入覆盖足够多样。",
    "7B 简单任务建议 1000 到 5000 条，复杂任务 5000 到 50000 条以上。",
    "13B 到 70B 建议 1 万到 10 万条以上，70B 以上继续预训练需要 GB 级文本。",
    "黄金起点是 1000 到 6000 条，先小规模试，欠拟合再加。",
    "80% 时间花在清洗、格式统一和答案校验上，1000 条完美数据胜过 10 万条杂乱数据。"
   ],
   "code": [
    "Alpaca 格式：instruction / input / output",
    "SFT：监督微调",
    "数据清洗：去重、校验、格式统一"
   ],
   "reuse": [
    "先做 1000 条人工校验的数据跑通，再扩量。",
    "把数据质量门槛写进流程，不达标不进训练集。"
   ],
   "interview": "数据量看模型和任务，7B 简单任务千条级就够，关键在一致、准确、多样。",
   "pitfall": "开源数据集直接堆十万条不做清洗，噪声答案被模型当成 pattern 全学走。",
   "source": "第28章",
   "tags": [
    "微调",
    "数据工程",
    "SFT"
   ]
  },
  {
   "id": "T-07",
   "layer": "T",
   "title": "数据质量打分卡：六个维度加总 100 分",
   "oneliner": "格式 20、字段 20、语言 15、唯一 15、长度 15、多样性 15，90 分以上才算 A。",
   "mechanism": [
    "评分项：格式合规 20 分、字段完整 20 分、语言一致 15 分、数据唯一 15 分、长度合理 15 分、多样性 15 分。",
    "格式合规等于合规率乘 20，字段完整等于平均填充率乘 20，语言一致等于中文占比乘 15。",
    "数据唯一等于（1 减重复率）乘 15，长度合理等于（1 减极端长度比）乘 15，多样性按类别覆盖算。",
    "评级 A 不低于 90 分，B 不低于 75 分，C 不低于 60 分，D 低于 60 分。",
    "单条中文占比大于 80% 记为中文，中文数据集整体中文占比应超过 95%。"
   ],
   "code": [
    "data_quality_report.py：质量报告",
    "MD5 去重：唯一性统计",
    "jieba：中文占比判断"
   ],
   "reuse": [
    "训练前先跑一遍打分卡，低于 B 不训。",
    "把六项分数写进数据交付文档。"
   ],
   "interview": "数据质量可量化：六维加权到 100 分，A/B/C/D 分级，先看分数再决定训不训。",
   "pitfall": "只靠肉眼抽查几十条就判断数据能用，十万条里的重复和空值全漏掉。",
   "source": "第29章",
   "tags": [
    "微调",
    "数据质量",
    "评估"
   ]
  },
  {
   "id": "T-08",
   "layer": "T",
   "title": "BLEU 只看 N-gram，替代不了人工",
   "oneliner": "微调前英文回答 BLEU 0.0012，微调后 0.4523；同义改写时分数依然很低。",
   "mechanism": [
    "BLEU 计算生成文本与参考文本的 1 到 4-gram 匹配精度，再取加权几何平均乘以简短惩罚。",
    "中文没有词边界，必须先分词，常用 jieba；换分词工具结果会变，评估要统一。",
    "医疗场景微调前后对比：英文基座回答 BLEU 0.0012，SFT 后中文回答 0.4523。",
    "BLEU 衡量不了事实正确性、安全合规和同义表达。",
    "人工评估按事实准确性 40%、语气专业度 20%、完整性 20%、安全合规 20% 加权。"
   ],
   "code": [
    "BLEU：n-gram 匹配",
    "jieba：中文分词",
    "Brevity Penalty：短句惩罚",
    "ROUGE-L：摘要评估"
   ],
   "reuse": [
    "BLEU 只当辅助指标，验收加人工评审。",
    "同一套分词和脚本跑前后对比。"
   ],
   "interview": "BLEU 只管 N-gram 匹配，事实性和安全性得靠人工，医疗场景按四个维度加权评。",
   "pitfall": "把 BLEU 当唯一指标，模型换成同义表述后分数下降，就误判微调失败。",
   "source": "第29章",
   "tags": [
    "微调",
    "评估",
    "BLEU"
   ]
  },
  {
   "id": "T-09",
   "layer": "T",
   "title": "软标签带暗知识，高温蒸馏才传得出去",
   "oneliner": "硬标签只给 one-hot，软标签给概率分布；温度调到 5，狗和鸟的细微概率才露出来。",
   "mechanism": [
    "硬标签是 one-hot，只知道是猫；软标签如 [猫 0.8, 狗 0.15, 鸟 0.05]，含类别相似性。",
    "logits [猫 8, 狗 2, 鸟 1]，T=1 时 softmax 得 [0.99, 0.01, 0.00]，狗鸟的信息被抹平。",
    "T=5 时得 [0.64, 0.24, 0.12]，教师把看起来像狗的线索也传给学生。",
    "损失等于 α 乘软标签 KL 散度加（1 减 α）乘硬标签交叉熵，α 常取 0.5 到 0.7。",
    "训练用高温 3 到 10，推理回归 T=1 恢复自信判断。"
   ],
   "code": [
    "KL 散度：软标签损失",
    "softmax(T=5)：平滑分布",
    "交叉熵：硬标签损失",
    "temperature：训练与推理分开"
   ],
   "reuse": [
    "有教师 logits 就用软标签，别只拿硬标签做 SFT。",
    "推理端一定把温度调回 1。"
   ],
   "interview": "蒸馏的价值在软标签，温度调高让概率分布变平，学生才学得到类别间的相似关系。",
   "pitfall": "只用教师输出的硬标签做 SFT，把软标签里的暗知识全丢了。",
   "source": "第30章",
   "tags": [
    "蒸馏",
    "软标签",
    "温度"
   ]
  },
  {
   "id": "T-10",
   "layer": "T",
   "title": "师生差距太大就逐级渐进蒸馏",
   "oneliner": "72B 直接教 1.5B 学不动，按 72B→32B→7B→1.5B 逐级降；闭源只能拿输出做 SFT。",
   "mechanism": [
    "教师学生能力差距过大时学生学不好，类似小学生直接学研究生课程。",
    "渐进式蒸馏按 72B 到 32B 到 7B 到 1.5B 逐级走，DeepSeek-R1 系列用的就是这个策略。",
    "经典蒸馏需要教师内部概率分布，开源模型可做；API 蒸馏只能拿输出文本做 SFT。",
    "s1 用 Gemini 给 1000 个样本补推理过程，SFT 微调 Qwen2.5-32B，16 张 H100 训练约 26 分钟。",
    "师生参数量比一般控制在 4:1 到 10:1。"
   ],
   "code": [
    "s1K：1000 条推理样本",
    "Gemini 2.0 Flash Thinking：教师模型",
    "Qwen2.5-32B-Instruct：学生模型",
    "SFT：输出蒸馏"
   ],
   "reuse": [
    "先看师生规模差，跨级太大就拆成多级。",
    "闭源教师只能用输出文本，别指望概率分布。"
   ],
   "interview": "蒸馏先看师生差距，太大就逐级降级；闭源模型拿不到概率分布，只能做 API 蒸馏。",
   "pitfall": "直接拿 671B 的输出教 1.5B，差距过大，学生只学到表面格式学不会推理。",
   "source": "第30章",
   "tags": [
    "蒸馏",
    "渐进式",
    "SFT"
   ]
  },
  {
   "id": "T-11",
   "layer": "T",
   "title": "GRPO 用组内相对奖励，不要价值网络",
   "oneliner": "每题采样 6 个输出，用组内平均奖励算相对优势，省掉 PPO 的 critic 模型。",
   "mechanism": [
    "GRPO 从当前策略采样一组输出，每个输出的奖励与该组平均奖励比较，得到相对优势。",
    "不需要价值网络，省掉 PPO 里 critic 的训练和显存；策略更新加 KL 散度约束。",
    "GSM8K 只有 question 和 answer，没有 reasoning，推理格式靠奖励函数引导出来。",
    "奖励链合计最高 4 分：标签 0.5、含 reasoning 与 answer 0.5、格式 0.5、整数 0.5、答对 2.0。",
    "GRPOConfig 设 num_generations=6、learning_rate=5e-6，比 SFT 低一个数量级。"
   ],
   "code": [
    "GRPOTrainer：GRPO 训练器",
    "num_generations=6：组内采样数",
    "learning_rate=5e-6：学习率",
    "vLLM：采样加速"
   ],
   "reuse": [
    "有可验证奖励的任务才上 GRPO。",
    "奖励函数先分格式分和正确分，别只给最终对错。"
   ],
   "interview": "GRPO 用同一题的多个采样做组内比较，替代 critic 估优势，推理格式由奖励函数引导生成。",
   "pitfall": "以为训练数据里必须有推理过程；GSM8K 只有问答，格式靠奖励函数塑形。",
   "source": "第30章",
   "tags": [
    "GRPO",
    "强化学习",
    "推理训练"
   ]
  },
  {
   "id": "T-12",
   "layer": "T",
   "title": "保险七类图像任务可零样本抽取",
   "oneliner": "病历、里程表、车辆照片、行车记录仪、事故定损图，换一句 Prompt 就能出结构化结果。",
   "mechanism": [
    "病历抽取覆盖中、日、法、德、韩五种语言，同一句「假设你是一位健康保险专家」的 Prompt 即可。",
    "里程表图可读出总里程 528,915 公里、速度 0 km/h、时间 19:18、温度 +45°C、挡位 N。",
    "事故要素抽取用 JSON Schema 约束，字段含道路状况、受损部位、损害程度、损害分类，缺失统一填 N/A。",
    "车辆一致性校验靠车型与颜色差异，样例把 Model X 与 Model Y、宝马 X5 与 X2 判为不同车。",
    "承保照片能给出车型（奥迪 A8L）、车况、停放环境等承保要点。"
   ],
   "code": [
    "Qwen-VL：视觉理解",
    "JSON Schema：约束输出字段",
    "N/A：缺失值统一占位"
   ],
   "reuse": [
    "保险类抽取先用统一 Schema 兜底，再按任务换 Prompt。",
    "多语种场景先测模型语种覆盖，不必一上来微调。"
   ],
   "interview": "保险多语种病历和车险图像都能靠 Prompt 零样本抽取，输出用 JSON Schema 兜底。",
   "pitfall": "不限定输出 Schema，模型写成长段分析文字，无法接入理赔系统。",
   "source": "第31章",
   "tags": [
    "多模态",
    "保险",
    "信息抽取"
   ]
  },
  {
   "id": "T-13",
   "layer": "T",
   "title": "Qwen-VL 样本要带 images 数组",
   "oneliner": "文本里用 image 标记占位，images 数组按出现顺序给路径，一条样本可以挂多张图。",
   "mechanism": [
    "一条训练样本是 messages 加 images 两个字段，messages 里 user 与 assistant 交替。",
    "图片位置由 content 里的 image 标记决定，第二轮 user 写成 What are they doing? 后紧跟标记。",
    "images 数组两条都指向同一张图，对应文本里出现的两个图片标记。",
    "格式来自 Qwen2-VL 官方示例，微调数据按这个结构组织即可直接喂给 Qwen-VL 系列。",
    "多图样本按出现顺序排 images，模型才能对上每一轮是哪张图。"
   ],
   "code": [
    "messages：对话结构",
    "images：图片路径数组",
    "image 标记：正文中的占位符",
    "Qwen2-VL：格式来源"
   ],
   "reuse": [
    "数据构造先对齐官方示例，别自创字段名。",
    "多图样本逐条检查标记与路径的顺序。"
   ],
   "interview": "多模态 SFT 样本是 messages 加 images，图片标记的位置决定图注入哪一轮对话。",
   "pitfall": "只把路径塞进 images 数组，漏写图片标记，模型对不上是哪一轮的图。",
   "source": "第31章",
   "tags": [
    "VLM",
    "数据格式",
    "Qwen-VL"
   ]
  },
  {
   "id": "T-14",
   "layer": "T",
   "title": "多模态补能力先测弱项再蒸馏微调",
   "oneliner": "建 query 加图的测试集找出答不好的题，用 Gemini 重答成训练数据，人工修正后用 unsloth 微调。",
   "mechanism": [
    "Step1 整理测试集，每条是 query 加 image 到 answer。",
    "Step2 用 Prompt 加 LLM 跑一遍，人工审核判断缺失的是哪类能力。",
    "缺失项由人工标成 query 加 image 到人的答案，或让 Gemini 重新作答生成蒸馏数据。",
    "数据整理成 qwen-vl-chat 的 messages 格式后，用 unsloth 微调。",
    "选 Gemini 当教师是因为直接调它成本高，且它的答案也需要人工修正。"
   ],
   "code": [
    "unsloth：轻量微调框架",
    "Qwen-VL：学生模型",
    "Gemini：教师模型",
    "query + image → answer：样本结构"
   ],
   "reuse": [
    "先测再训，别拿日常输出直接当训练集。",
    "教师答案必须人工过一遍再入库。"
   ],
   "interview": "VLM 补能力先测再标：测出弱项，教师模型重答，人工修正后 unsloth 微调。",
   "pitfall": "直接拿模型日常输出当训练集，没经过人工审核，错误被固化。",
   "source": "第31章",
   "tags": [
    "VLM",
    "微调",
    "数据构造"
   ]
  },
  {
   "id": "T-15",
   "layer": "T",
   "title": "MinerU 靠三个模型分工解析 PDF",
   "oneliner": "版面靠 LayoutLMv3，公式靠 YOLOv8 加 UniMERNet，文字靠 PaddleOCR。",
   "mechanism": [
    "布局检测基于 LayoutLMv3 微调，区分文本、表格、图片区域，并按人类阅读顺序输出。",
    "公式先用 YOLOv8 检测区域，再由 UniMERNet 转成 LaTeX；文本识别用 PaddleOCR 增强。",
    "支持 84 种语言 OCR，自动识别扫描版 PDF 并启用，最低 8GB 显存，兼容 CPU、GPU、NPU。",
    "私有化三步：pip 装 magic-pdf[full]、跑 download_models.py、执行 magic-pdf -p 文件 -o 输出目录。",
    "API 流程是申请 Token、提交 PDF 拿 task_id、轮询拿 full_zip_url，解压得到 layout.json 与 full.md。"
   ],
   "code": [
    "magic-pdf：命令行工具",
    "LayoutLMv3：版面检测",
    "UniMERNet：公式转 LaTeX",
    "PaddleOCR：文字识别"
   ],
   "reuse": [
    "复杂 PDF 先跑版面分析，再分别处理表格、公式和正文。",
    "扫描件和电子版走不同解析分支。"
   ],
   "interview": "复杂 PDF 解析靠 MinerU 三件套：版面、公式、OCR，输出结构化 Markdown。",
   "pitfall": "把 MinerU 当生成式大模型用，它只是布局检测加 OCR 的识别模型。",
   "source": "第31章",
   "tags": [
    "多模态",
    "PDF解析",
    "MinerU"
   ]
  },
  {
   "id": "T-16",
   "layer": "T",
   "title": "质检 EDA 先算不均衡比再定训练策略",
   "oneliner": "6 类 1400 图 3256 框，最多与最少类比值 2.3 比 1，超 5 比 1 才要重采样或 Focal Loss。",
   "mechanism": [
    "数据集 6 类缺陷，图像 200×200；Train 1400 个 xml 标注，Test 400 张无标注。",
    "共 3256 框，每图 1 到 9 个，平均 2.3；类别含 crazing、inclusion、pitted_surface 等。",
    "类别计数 inclusion 788 最多，pitted_surface 339 最少，patches 679、crazing 537。",
    "不均衡判定三档：比值超 5 用过采样或 Focal Loss，超 2 关注少数类召回。",
    "框宽高与长宽比用归一化坐标统计，结果直接决定 anchor 怎么设。"
   ],
   "code": [
    "Counter：类别计数",
    "glob：遍历标注文件",
    "matplotlib：框尺寸分布"
   ],
   "reuse": [
    "开训前先出类别分布和框尺寸两张图。",
    "比值没到 5 别急着上 Focal Loss。"
   ],
   "interview": "EDA 三件事：类别分布、框尺寸长宽比、不均衡比，比值超 5 才上重采样。",
   "pitfall": "不先看类别分布就开训，少数类召回低却找不到原因。",
   "source": "第32章",
   "tags": [
    "AI质检",
    "EDA",
    "目标检测"
   ]
  },
  {
   "id": "T-17",
   "layer": "T",
   "title": "工业质检宁可多检不可漏检",
   "oneliner": "漏检一个缺陷可能导致整批报废，误检只是多复看一次，所以置信度阈值要往下调。",
   "mechanism": [
    "Recall 等于 TP 除以 TP 加 FN，衡量真缺陷被检出多少；Precision 等于 TP 除以 TP 加 FP。",
    "工业场景 Recall 关注度最高，Precision 次之，mAP50 是主要指标，mAP50-95 竞赛常用。",
    "mAP50 只要 IoU 不低于 0.5 就算对，mAP50-95 在 0.5 到 0.95 取 10 个阈值求平均。",
    "阈值扫描用 0.1 到 0.5 共 8 档跑 model.val，同时看 mAP50、Precision、Recall。",
    "降阈值抬高召回，升阈值抬高精度；同一张图 IoU 达标才算 TP。"
   ],
   "code": [
    "model.val：验证与阈值扫描",
    "Recall / Precision：业务指标",
    "mAP50 / mAP50-95：检测指标",
    "IoU：判定阈值"
   ],
   "reuse": [
    "先问业务是漏检贵还是误检贵，再定阈值方向。",
    "产线阈值用真实图片扫描，不用竞赛默认值。"
   ],
   "interview": "工业选型先保 Recall：漏检是质量事故，误检只是复检成本。",
   "pitfall": "照搬竞赛思路只追 mAP，产线上漏检率不降反升。",
   "source": "第32章",
   "tags": [
    "AI质检",
    "评估指标",
    "召回率"
   ]
  },
  {
   "id": "T-18",
   "layer": "T",
   "title": "Qwen3-VL 坐标要乘图像尺寸再画框",
   "oneliner": "它返回 0 到 1000 的归一化值，Qwen2.5-VL 返回绝对像素，混用会让整批框偏移。",
   "mechanism": [
    "Qwen3-VL 的 bbox_2d 取 0 到 1000，转换公式是 pixel 等于 coord 除以 1000 再乘图像尺寸。",
    "Qwen2.5-VL 返回绝对像素坐标，直接使用；代码按模型名是否含 qwen3 走不同分支。",
    "200×200 图上 bbox_2d 为 60、280、240、340，转成 (12,56) 到 (48,68) 像素。",
    "响应可能被 markdown 代码块包裹，thinking 模型还带 think 标签，需统一清洗再解析。",
    "定位最佳分辨率 480×480 到 2560×2560，超出范围检测框会漂移；temperature 设 0.1。"
   ],
   "code": [
    "bbox_2d：检测框字段",
    "coord/1000×size：归一化转像素",
    "DashScope：调用入口",
    "temperature=0.1：降低随机性"
   ],
   "reuse": [
    "换模型版本先确认坐标语义。",
    "解析响应前先剥掉 markdown 和 think 标签。"
   ],
   "interview": "换 Qwen-VL 版本先确认坐标语义：Qwen3 除以 1000 乘尺寸，Qwen2.5 是绝对像素。",
   "pitfall": "把 0 到 1000 的归一化值直接当像素坐标，框全挤到左上角。",
   "source": "第32章",
   "tags": [
    "VLM",
    "坐标",
    "Qwen-VL"
   ]
  },
  {
   "id": "T-19",
   "layer": "T",
   "title": "Bad Case 要重标注才能回训练集",
   "oneliner": "审核标成误检或漏检的图先导出，用 LabelImg 补齐框，再并入数据集重训。",
   "mechanism": [
    "工作台五个 Tab：缺陷检测、检测记录、统计分析、数据导出、竞赛提交，记录存 SQLite。",
    "审核状态四值 pending、correct、wrong、missed，Bad Case 取 wrong 与 missed。",
    "导出目录含 images、bad_cases.csv（图片名、模型、审核状态、备注、原始检测结果）、export_info.json。",
    "漏检样例要用 LabelImg 补一条归一化中心与宽高，再并入训练集。",
    "迭代频率：新产线 1 到 2 周且 Bad Case 超 50 张，稳定期 1 到 3 个月或超 200 张。"
   ],
   "code": [
    "Gradio：标注审核工作台",
    "SQLite：检测记录",
    "labelImg：重标注",
    "bad_cases.csv：坏例导出"
   ],
   "reuse": [
    "Bad Case 入库前必须补标注，不能只丢图片。",
    "按产线阶段设重训触发阈值。"
   ],
   "interview": "闭环是检测、审核、导出、重标注、合并、重训，触发阈值按产线阶段定。",
   "pitfall": "把 Bad Case 图直接丢进训练集，不补标注，模型永远学不会漏掉的框。",
   "source": "第32章",
   "tags": [
    "AI质检",
    "BadCase",
    "数据闭环"
   ]
  },
  {
   "id": "T-20",
   "layer": "T",
   "title": "数据增强按三类数据挑战对症下药",
   "oneliner": "几何变换管方向和位置，颜色变换模拟光照与噪声，Mosaic、MixUp 补数据量。",
   "mechanism": [
    "类内差异大：划痕可水平、垂直、斜向，用 fliplr=0.5、flipud=0.5、degrees=15、translate=0.15。",
    "类间相似且光照不稳：用 hsv_h=0.02、hsv_s=0.7、hsv_v=0.5，PIL 侧可调亮度和对比度。",
    "样本少：mosaic=1.0、mixup=0.15、copy_paste=0.15、erasing=0.3。",
    "Mosaic 三个收益：一张图含 4 种场景、BN 等效增大 batch、小目标出现概率提高。",
    "离线增强用 Albumentations，bbox 与图像同步变换，300 多种变换，CLAHE 取 clip_limit=4.0。"
   ],
   "code": [
    "albumentations：离线增强",
    "mosaic=1.0：四图拼接",
    "hsv_h/s/v：颜色扰动",
    "CLAHE：对比度增强"
   ],
   "reuse": [
    "先定位数据挑战，再选增强手段。",
    "几何变换后检查标注框是否同步。"
   ],
   "interview": "增强按数据挑战配对：方向用几何、光照用 HSV、样本少用 Mosaic 加离线扩充。",
   "pitfall": "只做颜色增强不做几何变换，缺陷方向单一，换条产线就掉点。",
   "source": "第32章",
   "tags": [
    "AI质检",
    "数据增强",
    "YOLO"
   ]
  },
  {
   "id": "P-01",
   "layer": "P",
   "title": "推理选型先看显存带宽，再看算力",
   "oneliner": "大模型推理九成时间在搬数据，显存带宽直接决定 token 生成速度。",
   "mechanism": [
    "H100 80GB HBM3 带宽 3.35TB/s，H200 141GB 4.8TB/s，B200 192GB 8TB/s，B300 288GB 8TB/s。",
    "SRAM 每 SM 仅 128KB、单 SM 320GB/s，聚合 40TB/s；HBM 是芯片外的大仓库。",
    "几百 GB 参数塞不进 SRAM，必须反复从 HBM 搬到 SM，搬运比计算慢 50 倍以上。",
    "2026 年选型逻辑从算力优先转向带宽优先加显存容量优先。",
    "L40S 48GB GDDR6 带宽 864GB/s，适合放宽延迟预算的连续批处理。"
   ],
   "code": [
    "H100 / H200：HBM3 带宽",
    "B200 / B300：高带宽大显存",
    "L40S：性价比推理卡",
    "HBM：显存带宽指标"
   ],
   "reuse": [
    "买卡先比带宽和显存容量，FLOPS 排第三。",
    "用 P95 延迟和吞吐做验收，不看峰值算力。"
   ],
   "interview": "推理受内存墙限制，选卡先比 HBM 带宽和显存容量，算力排第三。",
   "pitfall": "只比 FLOPS 不看带宽，买回算力闲置的卡。",
   "source": "第34章",
   "tags": [
    "硬件选型",
    "推理",
    "显存带宽"
   ]
  },
  {
   "id": "P-02",
   "layer": "P",
   "title": "单卡能跑多大模型由显存容量决定",
   "oneliner": "H200 141GB 可单卡跑 70B，24GB 卡连 32B 的 4bit 量化模型都装不下。",
   "mechanism": [
    "30B 到 70B 推理用 H200，141GB 单卡运行 70B，省掉多卡通信开销。",
    "超过 70B 的 dense 或 MoE 用 B200，192GB 显存加第五代 NVLink。",
    "RTX 6000 Ada 48GB 可本地跑 70B INT8，RTX 4090 24GB 只能跑 30B 以下。",
    "32B GPTQ Int4 在 24GB 卡上，即使 max-model-len 4096、显存占比 0.8、并发 8 仍跑不起来。",
    "Blackwell 支持 FP4，内存占用比 FP8 再减 1.8 倍，吞吐提升 55%。"
   ],
   "code": [
    "vllm serve：启动推理服务",
    "--max-model-len：上下文长度",
    "--gpu-memory-utilization：显存占比",
    "GPTQ / FP4：量化格式"
   ],
   "reuse": [
    "先按显存定模型上限，再用量化把模型塞进单卡。",
    "KV Cache 和上下文长度也要留进显存预算。"
   ],
   "interview": "先按显存容量定模型上限，再用 INT8 或 FP4 量化把模型塞进单卡。",
   "pitfall": "只按参数量估算显存，忽略量化格式和 KV Cache 占用。",
   "source": "第34章",
   "tags": [
    "硬件选型",
    "显存",
    "量化"
   ]
  },
  {
   "id": "P-03",
   "layer": "P",
   "title": "四个框架按场景分工，没有全能选手",
   "oneliner": "生产通用用 vLLM，多轮与 Agent 用 SGLang，极致性能用 TensorRT-LLM，验证用 Ollama。",
   "mechanism": [
    "vLLM 用 PagedAttention，H100 单卡约 12,500 tok/s，生态和文档最成熟。",
    "SGLang 用 RadixAttention，H100 约 16,200 tok/s，比 vLLM 高 29%。",
    "百万日活场景选 SGLang，每月约省 15,000 美元 GPU 费用。",
    "TensorRT-LLM 做硬件原生优化，Blackwell 上跑 FP4 推理必需。",
    "Ollama 基于 llama.cpp，两分钟跑起来，定位本地开发与边缘设备。"
   ],
   "code": [
    "vLLM：PagedAttention",
    "SGLang：RadixAttention",
    "TensorRT-LLM：NVIDIA 原生优化",
    "Ollama：本地验证"
   ],
   "reuse": [
    "按流量形态选框架：单轮高吞吐看 vLLM，多轮前缀复用看 SGLang。",
    "本地开发用 Ollama，别拿它顶生产。"
   ],
   "interview": "先看场景：通用生产 vLLM，前缀复用多选 SGLang，NVIDIA 极限性能上 TensorRT-LLM。",
   "pitfall": "拿 Ollama 顶生产流量，它不支持 Continuous Batching。",
   "source": "第34章",
   "tags": [
    "推理框架",
    "vLLM",
    "SGLang"
   ]
  },
  {
   "id": "P-04",
   "layer": "P",
   "title": "结构化输出保证格式，不保证算对",
   "oneliner": "FSM 约束能确保 100% 合法 JSON，字段里的数值仍可能算错。",
   "mechanism": [
    "vLLM 内置 xgrammar 与 outlines，Pydantic 转 JSON Schema 再转正则和 FSM，逐 token 过滤。",
    "订单用例输出 total_price 为 2000.98，正确值是 2×999.99 加 3×29.99 等于 2089.95。",
    "IP 正则约束下模型给出 1.1.0.66，格式合法但语义错误。",
    "正则只校验数值范围和点分格式，管不到事实与算术。",
    "需要精确计算的场景，拿到结构化结果后由程序端重算。"
   ],
   "code": [
    "response_format：结构化输出",
    "Pydantic → JSON Schema：约束定义",
    "xgrammar / outlines：FSM 解码",
    "程序端复核：数值重算"
   ],
   "reuse": [
    "格式问题交给约束解码，数值问题交给代码。",
    "金额、日期、库存这类字段一律二次校验。"
   ],
   "interview": "约束解码把格式正确率做到 100%，数值正确性要靠程序复核。",
   "pitfall": "把约束解码当成正确性保证，直接信任模型算出的金额。",
   "source": "第34章",
   "tags": [
    "结构化输出",
    "约束解码",
    "可靠性"
   ]
  },
  {
   "id": "P-05",
   "layer": "P",
   "title": "KV Cache 才是高并发的显存杀手",
   "oneliner": "LLaMA-2-7B 每 token 占 0.5MB，4096 上下文单请求 2GB，100 并发要 200GB。",
   "mechanism": [
    "每 token KV Cache 等于 2×32 层×4096 维×2 字节，共 524,288 字节，约 0.5MB。",
    "4096 token 上下文单请求占 2GB；100 个并发请求合计 200GB，超过 A100 80GB。",
    "模型参数只占 14GB，KV Cache 随并发线性膨胀才是瓶颈。",
    "内部碎片：按最大长度 2048 预分配，实际只用 500，浪费 1548。",
    "外部碎片：空闲块不连续，新请求要 4096 也分配不到。"
   ],
   "code": [
    "KV Cache：每 token 约 0.5MB",
    "并发×上下文：显存估算公式",
    "A100 80GB：常见对照卡"
   ],
   "reuse": [
    "容量规划先算 KV Cache，再算模型权重。",
    "上下文长度和并发数要一起定。"
   ],
   "interview": "并发能力由 KV Cache 显存决定，先算 0.5MB 每 token 再乘上下文和并发数。",
   "pitfall": "只按模型权重选卡，忽略并发量对 KV Cache 的线性放大。",
   "source": "第35章",
   "tags": [
    "推理",
    "KV Cache",
    "容量规划"
   ]
  },
  {
   "id": "P-06",
   "layer": "P",
   "title": "分块按需分配省下 94.5% 显存",
   "oneliner": "PagedAttention 把 KV Cache 切成 16 token 的块，用满才申请新块。",
   "mechanism": [
    "把 KV Cache 切成固定 16 token 的块，用 Block Table 维护逻辑到物理的映射。",
    "生成 100 token 需要 7 个块，实际占 56MB；预分配方式要 1024MB。",
    "写时复制解决 Beam Search 与并行采样：5 个共享块加 3 个私有块共 8 块，传统要 18 块。",
    "共享块用引用计数，出现分歧的 token 才分配私有块，省 55% 显存。",
    "动态重排让新请求收集分散空闲块，不必等连续大块显存。"
   ],
   "code": [
    "PagedAttention：分页管理 KV",
    "Block Table：逻辑到物理映射",
    "Copy-on-Write：共享块复制",
    "vLLM：实现框架"
   ],
   "reuse": [
    "并发上不去先看显存碎片，不只看卡型。",
    "并行采样和 Beam Search 场景用写时复制。"
   ],
   "interview": "PagedAttention 把 KV Cache 当虚拟内存分页管理，显存利用率从 30% 到 90% 以上。",
   "pitfall": "以为 PagedAttention 能提升单请求速度，它主要解决显存碎片。",
   "source": "第35章",
   "tags": [
    "推理",
    "PagedAttention",
    "显存"
   ]
  },
  {
   "id": "P-07",
   "layer": "P",
   "title": "每生成一个 token 就调度一次",
   "oneliner": "Continuous Batching 让完成的请求立刻腾位，吞吐从 800 提到 1800 tok/s。",
   "mechanism": [
    "静态批处理必须等最慢请求，A、B、C 各需 100、200、150 步，整批卡在 200 步。",
    "Iteration-level 调度：每轮取新请求、前向一次、完成的请求立即释放 block。",
    "GPU 利用率从 40% 到 60% 升到 85% 到 95%，吞吐提升 2.25 倍。",
    "平均延迟 P50 从 1200ms 降到 800ms。",
    "Ollama 的 llama.cpp 不支持 Continuous Batching，Go 层并发不等于推理并发。"
   ],
   "code": [
    "Continuous Batching：连续批处理",
    "Iteration-level Scheduling：单 token 调度",
    "llama.cpp：不支持连续批处理"
   ],
   "reuse": [
    "压测时区分请求并发和推理并发。",
    "生产服务选支持连续批处理的内核。"
   ],
   "interview": "Continuous Batching 把调度粒度降到单 token，完成即腾位，是吞吐翻倍的关键。",
   "pitfall": "在 Ollama 上压并发，Go 层收下请求，推理内核仍串行执行。",
   "source": "第35章",
   "tags": [
    "推理",
    "批处理",
    "吞吐"
   ]
  },
  {
   "id": "P-08",
   "layer": "P",
   "title": "PD 分离后 TPOT 才不抖",
   "oneliner": "Prefill 吃算力、Decode 吃带宽，混在一张卡上互相拖累，TPOT 会抖动。",
   "mechanism": [
    "Prefill 一次性算完整个 Prompt 的 KV Cache，计算密集型，看 TTFT。",
    "Decode 每步只生成一个 token，内存带宽密集型，看 TPOT。",
    "混合执行时 Prefill 阻塞 Decode 导致 TPOT 飙升，Decode 又让算力空闲。",
    "分工策略：Prefill 用小 batch，Decode 用大 batch 把 Memory-Bound 拉向 Compute-Bound。",
    "vLLM 用 KV Transfer Connector，Prefill 做 kv_producer，Decode 做 kv_consumer。"
   ],
   "code": [
    "KVTransferConfig：跨实例传 KV",
    "PyNcclConnector：传输后端",
    "TTFT：首 token 延迟",
    "TPOT：每 token 延迟"
   ],
   "reuse": [
    "长 Prompt 加低延迟要求，就拆 Prefill 和 Decode。",
    "分别监控 TTFT 和 TPOT，别只看总延迟。"
   ],
   "interview": "PD 分离按计算特性拆硬件，Prefill 保 TTFT，Decode 保 TPOT。",
   "pitfall": "在同一张卡上既跑长 Prompt 又要求低延迟，TPOT 必然抖动。",
   "source": "第35章",
   "tags": [
    "推理",
    "PD分离",
    "延迟"
   ]
  },
  {
   "id": "P-09",
   "layer": "P",
   "title": "调优先建基线，再按指标逐项改",
   "oneliner": "TTFT 超 1s 查 Prefill，TPOT 超 50ms 加 batch，GPU 低于 50% 加并发或量化。",
   "mechanism": [
    "先关推测解码跑 baseline，再逐项开优化对比，避免多个变量混在一起。",
    "vLLM 用 --enable-metrics 暴露 Prometheus 指标，curl 8000 端口的 metrics 查看。",
    "关键指标：TTFT、TPOT、gpu_kv_cache_usage_percent、num_requests_waiting。",
    "TTFT 过高用 chunked prefill 把长 Prompt 拆成 512 token 与 decode 交错。",
    "接受率低于 0.6 把 draft tokens 降到 3，高于 0.8 提到 7；TPOT 抖动用 --max-num-seqs 64 限流。"
   ],
   "code": [
    "--enable-metrics：暴露监控",
    "--enable-chunked-prefill：分块预填",
    "--max-num-seqs=64：限制批波动",
    "--speculative-model：推测解码"
   ],
   "reuse": [
    "一次只改一个参数，改完记录指标。",
    "先定 TTFT 和 TPOT 的验收线，再调参。"
   ],
   "interview": "监控三件套 TTFT、TPOT、GPU 利用率，按阈值定位瓶颈再调参数。",
   "pitfall": "一次改五个参数，出问题后无法判断哪个起了作用。",
   "source": "第35章",
   "tags": [
    "推理",
    "调优",
    "监控"
   ]
  },
  {
   "id": "P-10",
   "layer": "P",
   "title": "基数树让多轮对话只算新增 token",
   "oneliner": "RadixAttention 按前缀复用 KV Cache，A10G 上比 vLLM 最高 5 倍吞吐。",
   "mechanism": [
    "用基数树管理 token 序列与 KV Cache 映射，边可标记任意长度序列，查找比 Trie 快。",
    "KV Cache 按页存储，每页大小等于一个 token，物理上可以不连续。",
    "显存满时 LRU 先逐出最久未用的叶子，公共祖先保留到自己也变成叶子。",
    "第二轮对话命中系统 Prompt 和第一轮内容，只计算新增的用户消息。",
    "A10G 上 Llama-7B 与 Mixtral-8x7B 测试，最高 5 倍吞吐提升。"
   ],
   "code": [
    "RadixAttention：前缀缓存",
    "Radix Tree：基数树",
    "LRU：缓存逐出",
    "SGLang：实现框架"
   ],
   "reuse": [
    "多轮对话、Agent、固定系统提示的场景优先测 SGLang。",
    "把系统提示词放最前面，提高前缀命中。"
   ],
   "interview": "RadixAttention 用基数树做前缀级 KV 复用，多轮和共享模板场景收益最大。",
   "pitfall": "以为 RadixAttention 对单轮随机问答也有效，这类场景命中率接近 0。",
   "source": "第36章",
   "tags": [
    "SGLang",
    "RadixAttention",
    "缓存"
   ]
  },
  {
   "id": "P-11",
   "layer": "P",
   "title": "缓存命中率决定 SGLang 的实际收益",
   "oneliner": "多轮对话命中 60% 到 80%，批量共享模板 80% 到 95%，随机单轮接近 0%。",
   "mechanism": [
    "命中率等于缓存命中的 prompt token 数除以 prompt token 总数。",
    "调度器按匹配前缀长度排序，优先处理前缀更长的请求，替代先来先服务。",
    "随机调度会让刚加载的缓存马上被换出，产生缓存抖动。",
    "100 篇文章共用 100 token 系统 Prompt，只算一次可省 9900 token 的 Prefill。",
    "监控看 sglang:cache_hit_rate，它比 QPS 更能解释收益来源。"
   ],
   "code": [
    "cache_hit_rate：命中率指标",
    "sglang:cache_hit_rate：监控指标名",
    "前缀调度：最长前缀优先"
   ],
   "reuse": [
    "上线前先估业务的前缀复用率。",
    "命中率低时换框架，不要硬调 SGLang 参数。"
   ],
   "interview": "先估前缀复用率再选 SGLang，命中率低时它的优势基本消失。",
   "pitfall": "用 SGLang 跑无共享前缀的随机请求，然后抱怨没有加速。",
   "source": "第36章",
   "tags": [
    "SGLang",
    "缓存",
    "容量规划"
   ]
  },
  {
   "id": "P-12",
   "layer": "P",
   "title": "约束解码把 JSON 合法率做到 100%",
   "oneliner": "正则转压缩 FSM，无效 token 概率置零，Prompt 工程只有 90% 到 95%。",
   "mechanism": [
    "请求里传 regex，把正则表达式编译成有限状态机，解码时逐 token 过滤。",
    "压缩 FSM 把相邻的单次转换边合并，一条边可一次解码多个 token。",
    "常量片段在普通 FSM 里要多次前向，压缩后一步完成。",
    "格式正确率 100%，不再需要 try-except 加重试。",
    "正则只约束形状，字段内容仍由模型生成。"
   ],
   "code": [
    "regex：输出约束",
    "sampling_params：解码参数",
    "Compressed FSM：压缩状态机",
    "/generate：SGLang 接口"
   ],
   "reuse": [
    "下游要解析 JSON，就用约束解码替代提示词叮嘱。",
    "常量前缀多的格式收益最大。"
   ],
   "interview": "约束解码在采样层排除非法 token，格式问题从工程问题变成数学保证。",
   "pitfall": "用 Prompt 反复强调输出 JSON，仍要写重试和兜底解析。",
   "source": "第36章",
   "tags": [
    "SGLang",
    "约束解码",
    "结构化输出"
   ]
  },
  {
   "id": "P-13",
   "layer": "P",
   "title": "Spec 里的每条约束就是一条测试",
   "oneliner": "C1 到 C7 逐条翻译成 pytest 用例，先让它们全红，再写实现变绿。",
   "mechanism": [
    "stock-research 的 Spec 定义 4 个维度、summary 不少于 100 字符、confidence 在 0 到 1。",
    "C1 到 C7 每条约束对应一组测试，先运行时全部失败，证明测试有效。",
    "红-绿-重构：先写最小失败测试，再写刚好通过的代码，最后在绿灯下重构。",
    "项目最终 69 个单元测试全绿，另有 16 个 akshare 真实数据测试，15 通过 1 跳过。",
    "先写代码再补测试，会写出刚好通过实现的测试，失去定义需求的作用。"
   ],
   "code": [
    "pytest：测试框架",
    "validate_report：约束校验",
    "research_spec.md：需求规格",
    "akshare：真实数据源"
   ],
   "reuse": [
    "Spec 写完先落成失败测试，再让 Agent 实现。",
    "真实数据测试和单元测试分开跑。"
   ],
   "interview": "SDD 写清什么算对，TDD 用失败测试证明，两者在 Spec 约束处接上。",
   "pitfall": "看到实现后再补测试，测试被实现细节绑架。",
   "source": "第37章",
   "tags": [
    "AI测试",
    "TDD",
    "Spec"
   ]
  },
  {
   "id": "P-14",
   "layer": "P",
   "title": "约束写进 Lint，Agent 才会照做",
   "oneliner": "文档里的规范会被忽略，写成 Lint 规则违反就 CI 失败，Agent 无法跳过。",
   "mechanism": [
    "Harness 三支柱：Inform 告知、Constrain 约束、Verify 验证。",
    "AGENTS.md 超过 60 行效果下降，正确做法是 50 到 100 行的目录页。",
    "Lint 错误信息要带 FIX 步骤，Agent 才能读懂并自我纠正。",
    "CI 三道门按速度排列：结构 Lint 几秒、单元测试几秒、集成测试几分钟。",
    "单元测试 Job 把 DASHSCOPE_API_KEY 置空，防止误调付费接口。"
   ],
   "code": [
    "AGENTS.md：50 到 100 行目录页",
    "check_report_structure.py：结构 Lint",
    "pytest：单元测试门",
    "CI：三道门流水线"
   ],
   "reuse": [
    "规范能被机器检查就写成 Lint，别只写文档。",
    "错误信息里直接给修复步骤。"
   ],
   "interview": "把品味编码成 Lint 规则，让约束机械化执行，比写在文档里可靠。",
   "pitfall": "把所有规则堆进一个巨型说明文件，Agent 记不住也无法验证。",
   "source": "第37章",
   "tags": [
    "AI测试",
    "Harness",
    "CI"
   ]
  },
  {
   "id": "P-15",
   "layer": "P",
   "title": "四顶帽子加背压，让 Agent 自主收尾",
   "oneliner": "Planner、Builder、Critic、Finalizer 每轮只戴一顶，5 分钟花 0.31 美元完成开发。",
   "mechanism": [
    "Ralph 每轮迭代用干净上下文，人类只写一份 PROMPT.md。",
    "Builder 先写 7 个测试全红，再写实现，自己发现并修掉字符计数差 1 的 bug。",
    "Critic 是全新 Agent 实例，不知道 Builder 的决策，独立重跑测试。",
    "Finalizer 确认需求全部满足后输出 LOOP_COMPLETE，循环终止。",
    "Agent 卡住时改 Harness，补一条 Lint、加一段说明、加一个测试，别手动改它的代码。"
   ],
   "code": [
    "PROMPT.md：人类输入",
    "scratchpad.md：过程记录",
    "LOOP_COMPLETE：终止信号",
    "pytest：验收门"
   ],
   "reuse": [
    "角色隔离，别让写代码的 Agent 自己验收。",
    "卡住先改约束和测试，不改实现。"
   ],
   "interview": "Ralph 用角色隔离加背压门控，让 Agent 在循环里自主完成并自我验证。",
   "pitfall": "坐到循环里手动改 Agent 的代码，同样的问题下次还会出现。",
   "source": "第37章",
   "tags": [
    "AI测试",
    "AgentLoop",
    "验收"
   ]
  },
  {
   "id": "B-01",
   "layer": "B",
   "title": "Text2SQL 四步里模式链接最关键",
   "oneliner": "Text-to-SQL 走过规则模板、机器学习、LLM 三个阶段，当前主流是四步流水线。",
   "mechanism": [
    "早期阶段依赖人工编写的规则模板，匹配自然语言与 SQL 语句的对应关系。",
    "机器学习阶段用序列到序列模型学习自然语言到 SQL 的映射。",
    "LLM 阶段借助提示工程、微调，把 Text-to-SQL 性能提升到新的高度。",
    "当前系统的四步：自然语言理解、模式链接、SQL 生成、SQL 执行。",
    "模式链接负责把问题中的实体与数据库 schema 里的表和列链接起来。"
   ],
   "code": [
    "Schema Linking：问题实体到表列",
    "SQL Generation：生成语句",
    "SQL Execution：执行与回填"
   ],
   "reuse": [
    "准确率上不去先查模式链接，别只改生成提示词。",
    "业务术语和字段名建一张映射表。"
   ],
   "interview": "Text-to-SQL 分三步演进，现在走四步流水线，模式链接决定 SQL 写得对不对。",
   "pitfall": "跳过模式链接，直接把问题拼成 prompt 让模型猜表和字段。",
   "source": "第38章",
   "tags": [
    "Text2SQL",
    "模式链接",
    "架构"
   ]
  },
  {
   "id": "B-02",
   "layer": "B",
   "title": "相似表多时 SQL Agent 会反复试错",
   "oneliner": "Toolkit 自动读 schema，表一多就反复试错，要靠向量库召回 few-shot 示例。",
   "mechanism": [
    "SQLDatabase.from_uri 连库后自动获取数据库 metadata，SQLDatabaseToolkit 直接喂 LLM。",
    "create_sql_agent 完成自然语言到 SQL 再取结果的闭环，找不到表时报 OutputParseException。",
    "多张表都像候选时，Agent 会逐张尝试，最后才判断哪张能出结果。",
    "本质是 LLM 加 RAG：向量库召回相似问题与对应 SQL，作为 few-shot 塞进 prompt。",
    "用 similarity threshold 过滤关系不大的示例，再优化 few-shot 多样性。"
   ],
   "code": [
    "SQLDatabase.from_uri：连接数据库",
    "SQLDatabaseToolkit：schema 工具集",
    "create_sql_agent：SQL Agent",
    "sql_get_similar_examples：召回示例"
   ],
   "reuse": [
    "先跑通 Toolkit 通路，再补业务示例。",
    "示例按问题相似度召回，别固定塞同一批。"
   ],
   "interview": "搭 SQL Copilot 分两步：Toolkit 读 schema 跑通路，向量库补 few-shot 提准确率。",
   "pitfall": "只靠 Toolkit 自动读 schema 不补业务示例，复杂查询通过率低。",
   "source": "第38章",
   "tags": [
    "Text2SQL",
    "Agent",
    "Few-shot"
   ]
  },
  {
   "id": "B-03",
   "layer": "B",
   "title": "Vanna 本质是 RAG 加 SQL 生成",
   "oneliner": "Vanna 把 DDL、文档、问题-SQL 三样训练数据写进向量库，提问时召回拼 prompt 再执行。",
   "mechanism": [
    "三种训练入口：train(ddl=...)、train(documentation=...)、train(question=..., sql=...)。",
    "ask 依次调用 generate_sql、run_sql、generate_plotly_code、get_plotly_figure，返回表格和图表。",
    "generate_sql 内部三路召回：相似 question-SQL 对、相关 DDL、相关文档。",
    "多继承设计：ChromaDB_VectorStore 加 OpenAI_Chat，LLM、向量库、数据库三层可插拔。",
    "训练数据用 get_training_data 列出，用 remove_training_data 按 id 删除。"
   ],
   "code": [
    "vn.train：写入训练数据",
    "vn.ask：提问到图表",
    "generate_sql / run_sql：生成与执行",
    "VannaFlaskApp：Web 界面"
   ],
   "reuse": [
    "三类数据都要喂：DDL、业务文档、问题-SQL 对。",
    "把业务叫法写进 documentation，减少字段错配。"
   ],
   "interview": "Vanna 的准确率来自三类训练数据：DDL、文档、问题-SQL，本质是 RAG 而非微调。",
   "pitfall": "只 train DDL 不写 documentation，业务叫法对不上字段名，召回和生成都偏。",
   "source": "第38章",
   "tags": [
    "Text2SQL",
    "Vanna",
    "RAG"
   ]
  },
  {
   "id": "B-04",
   "layer": "B",
   "title": "DDL 召回不够，表多时必然张冠李戴",
   "oneliner": "Vanna 默认只召回 10 条 DDL，26 张表时关键表进不了 prompt，模型只能拿错表硬凑。",
   "mechanism": [
    "默认 n_results_ddl=10，库里表多时关键表的 DDL 可能进不到 prompt。",
    "真实案例：26 张表问英雄攻击力前 5，heros 没被召回，模型用只有 score 字段的 hero_score 生成 SQL。",
    "修复一：把 n_results_ddl 调到 30，强制多召回几张表。",
    "修复二：train documentation 写明英雄数据在 heros 表、attack_max 是最大攻击力。",
    "Web 版和 CLI 版共用同一份 chroma.sqlite3，配置不一致时召回结果会不同。"
   ],
   "code": [
    "n_results_ddl：DDL 召回数",
    "vn.train(documentation=...)：业务文档",
    "chroma.sqlite3：共享向量库"
   ],
   "reuse": [
    "表多时先调大 DDL 召回，再补业务文档。",
    "多个入口共用向量库，配置要统一。"
   ],
   "interview": "Text-to-SQL 先保证相关表能召回，再谈生成，调 K 值之外还要给关键表补业务文档。",
   "pitfall": "只调大召回数量，不写业务描述，K 一大噪音也一起进 prompt。",
   "source": "第38章",
   "tags": [
    "Text2SQL",
    "召回",
    "Vanna"
   ]
  },
  {
   "id": "B-05",
   "layer": "B",
   "title": "ChatBI 先把数据落成规整表再问答",
   "oneliner": "链路是 Tushare 采集、MySQL 建表、自然语言转 SQL，工具回 describe 后由 LLM 总结。",
   "mechanism": [
    "Tushare 取 A 股行情，返回 stock_name、ts_code、trade_date、open、high、low、close、vol、amount。",
    "数据按 trade_date 升序后建 MySQL 表，导入时 trade_date 解析失败，需改成 varchar(10)。",
    "ExcSQLTool 在 call 里自动画柱状图，df 行数多时改折线图并只抽 10 个点显示。",
    "工具回复里附上 df.describe()，LLM 才能对查询结果做总结。",
    "结果只有一行时不输出统计信息和图表，避免答非所问。"
   ],
   "code": [
    "Tushare：行情数据",
    "MySQL：结构化存储",
    "ExcSQLTool：查询加绘图",
    "df.describe()：结果摘要"
   ],
   "reuse": [
    "先把数据落成规整表，再让模型写 SQL。",
    "工具返回里带统计摘要，模型总结才有依据。"
   ],
   "interview": "ChatBI 的难点在数据链路和工具返回格式，LLM 只负责理解问题和总结。",
   "pitfall": "用 DATE 类型接 Tushare 的 trade_date，导入报错后还得删表重建。",
   "source": "第39章",
   "tags": [
    "ChatBI",
    "数据链路",
    "Text2SQL"
   ]
  },
  {
   "id": "B-06",
   "layer": "B",
   "title": "工具只回前 10 行，对比分析算错",
   "oneliner": "ExcSQLTool 默认只把 df 前 10 行给模型，两只股票各取一天，涨跌幅自然算错。",
   "mechanism": [
    "工具返回的 markdown 只截 df 前 10 行，模型拿不到全年首尾价格。",
    "改成取前 5 行加后 5 行，模型能同时看到区间两端。",
    "在 ExcSQLTool.parameters 增加 need_visualize，默认 True，对比分析传 False 跳过图表。",
    "涨跌幅算法写进 faq.txt 当知识库，注册 Assistant 时传 files=['./faq.txt']。",
    "仍算错时补一条规则：写 SQL 必须按 trade_date 升序，保证两只股票同一天对齐。"
   ],
   "code": [
    "need_visualize=False：跳过图表",
    "faq.txt：业务规则知识库",
    "ORDER BY trade_date：日期对齐",
    "head(5) + tail(5)：保留区间两端"
   ],
   "reuse": [
    "工具返回要覆盖首尾，不要只给开头。",
    "业务算法写进知识库，别指望模型自己推。"
   ],
   "interview": "对比分析出错先查工具返回了几行，再查 SQL 有没有按日期排序。",
   "pitfall": "只改 prompt 不改工具返回的数据范围，模型看不到首尾就永远算错。",
   "source": "第39章",
   "tags": [
    "ChatBI",
    "工具设计",
    "Debug"
   ]
  },
  {
   "id": "B-07",
   "layer": "B",
   "title": "nanobot 用四个文件拼出 Agent",
   "oneliner": "nanobot 仅 4000 行，config.json 定模型工具，AGENTS.md 定身份，skills 定能力。",
   "mechanism": [
    "香港大学数据科学实验室开源的轻量助手，是 OpenClaw 的精简版，核心代码约 4000 行。",
    "组成公式：config.json 配置、AGENTS.md 身份、skills 目录、Tool 类。",
    "内置工具按目录分：filesystem、shell、web、spawn、message、cron、mcp。",
    "config.json 里 web.enable 设为 false 后，web_search、web_fetch 不会注册进工具集。",
    "对比 DeepAgents：nanobot 用声明式配置，DeepAgents 用 Python 代码构建并依赖 LangGraph。"
   ],
   "code": [
    "config.json：模型与工具开关",
    "AGENTS.md：Agent 身份",
    "skills/：技能目录",
    "AgentLoop：主循环"
   ],
   "reuse": [
    "做轻量 Agent 先学这套最小结构。",
    "工具开关放配置，别在代码里注释。"
   ],
   "interview": "nanobot 是 4000 行的 Agent 最小实现，配置加技能加工具就是一个完整 Agent。",
   "pitfall": "没把 nanobot-main 放对位置，导入到同名旧包就会报找不到模块。",
   "source": "第39章",
   "tags": [
    "nanobot",
    "Agent架构",
    "开源"
   ]
  },
  {
   "id": "B-08",
   "layer": "B",
   "title": "技能摘要常驻，正文按需 read_file",
   "oneliner": "8 个技能全文塞 prompt 要 4000 tokens，渐进式加载只放约 500 字符摘要。",
   "mechanism": [
    "三级加载：元数据（名称加描述，约 100 词）常驻，SKILL.md 正文触发时加载，捆绑资源按需加载。",
    "ContextBuilder 注入的 XML 摘要含 name、description、location、available 四个字段。",
    "frontmatter 标 always: true 的技能全文进 system prompt，内置只有 memory 这样配置。",
    "其余技能只给一句提示：需要时用 read_file 读它的 SKILL.md。",
    "8 个技能每个 2000 多字符，全量注入约 4000 tokens，摘要只占约 500 字符。"
   ],
   "code": [
    "ContextBuilder：注入技能摘要",
    "build_skills_summary：生成摘要",
    "read_file：按需读正文",
    "always: true：常驻技能"
   ],
   "reuse": [
    "技能多时只放摘要，正文让模型自己读。",
    "高频核心技能才常驻全文。"
   ],
   "interview": "技能库大了就做渐进式加载，摘要常驻，正文让模型自己 read_file。",
   "pitfall": "把所有技能正文写进 system prompt，token 花光还挤掉对话历史。",
   "source": "第39章",
   "tags": [
    "Agent",
    "Context",
    "技能加载"
   ]
  },
  {
   "id": "B-09",
   "layer": "B",
   "title": "SQL 工具的只读约束要写进代码",
   "oneliner": "QueryDBTool 用代码白名单只放 SELECT 和 PRAGMA，最多回 50 行，模型想删库也做不到。",
   "mechanism": [
    "自定义工具继承 nanobot 的 Tool，实现 name、description、parameters、read_only 加 execute。",
    "execute 先做 upper().lstrip() 判断首词，不是 SELECT 或 PRAGMA 直接返回错误。",
    "DELETE、DROP、INSERT、UPDATE 全部被拦，模型犯错的路径被代码堵死。",
    "结果最多返回 50 行，超出标注 total rows，防止大表撑爆上下文。",
    "read_only=True 标记只读，工具可安全并行执行；exec 是通用 shell，能绕过白名单。"
   ],
   "code": [
    "QueryDBTool：只读查询工具",
    "read_only=True：并行安全标记",
    "白名单：SELECT / PRAGMA",
    "50 行上限：控制返回体积"
   ],
   "reuse": [
    "只读约束落在代码判断，不靠提示词。",
    "同时关掉通用 shell，否则白名单形同虚设。"
   ],
   "interview": "SQL 工具的只读约束要落在代码判断上，光靠 AGENTS.md 一句话不够。",
   "pitfall": "用 prompt 约束只读，同时开着 exec，模型照样能通过 shell 执行危险 SQL。",
   "source": "第39章",
   "tags": [
    "Agent",
    "SQL安全",
    "工具设计"
   ]
  },
  {
   "id": "B-10",
   "layer": "B",
   "title": "Schema 召回 Top-5 表，准确率更高",
   "oneliner": "全量 schema 要 30K token、准确率 70%；召回 Top-5 表只用 3K token，准确率 88%。",
   "mechanism": [
    "离线给每张表生成 200 到 500 token 的自然语言描述，含表名、字段名、注释、示例值、业务含义。",
    "描述用 BGE-M3 或 text-embedding-3 向量化，存进 Qdrant、Milvus 这类向量库。",
    "在线先检索 Top-K（K 取 10 到 20），再用 BGE-Reranker 精排到 Top-5 拼进 prompt。",
    "业务词典一起进知识库，让模型看到 GMV 等于 order_amount 求和减 refund_amount 求和这样的定义。",
    "效果对比：30K 以上 token 准确率 70%，3K token 准确率 88%，token 成本降 90%。"
   ],
   "code": [
    "BGE-M3 / text-embedding-3：表描述向量化",
    "Qdrant / Milvus：向量库",
    "BGE-Reranker：精排到 Top-5",
    "业务词典：指标口径"
   ],
   "reuse": [
    "表多时先做 schema RAG，不要全量塞 prompt。",
    "每张表写一段业务描述，比只给 DDL 有效。"
   ],
   "interview": "Schema 太大就用 RAG 做 Schema Linking，召回相关表比塞全量更准也更便宜。",
   "pitfall": "把整个库的 schema 一次塞进 prompt，字段一多就超限，噪声还拉低准确率。",
   "source": "第40章",
   "tags": [
    "Text2SQL",
    "Schema",
    "RAG"
   ]
  },
  {
   "id": "B-11",
   "layer": "B",
   "title": "动态 Few-shot 比静态高 11 点",
   "oneliner": "0-shot 65%、固定 5-shot 78%、按问题相似度检索示例 89%，示例选法决定准确率。",
   "mechanism": [
    "同一条业务问题，0-shot 准确率 65%，固定 5 个示例 78%，动态检索示例 89%。",
    "动态做法：历史的问题加 SQL 标注集做 Embedding 存向量库，新问题检索 Top-5 最相似示例。",
    "标注集靠积累用户真实使用记录，再加人工标注补全。",
    "示例要覆盖 JOIN、GROUP BY、窗口函数、CTE 至少各一个。",
    "还要覆盖不同业务领域，并按难度从简单到复杂排布。"
   ],
   "code": [
    "Embedding：示例向量化",
    "Top-5 相似示例：动态拼接",
    "问题-SQL 标注集：检索源"
   ],
   "reuse": [
    "示例按相似度动态选，别固定同一批。",
    "标注集按 SQL 语法类型补齐覆盖。"
   ],
   "interview": "Few-shot 从 0 到静态再到动态，准确率 65、78、89，动态检索性价比最高。",
   "pitfall": "随便贴几个示例，覆盖不到 JOIN 和窗口函数，复杂查询照样写错。",
   "source": "第40章",
   "tags": [
    "Text2SQL",
    "Few-shot",
    "检索"
   ]
  },
  {
   "id": "I-01",
   "layer": "I",
   "title": "AI 时代人的价值在定义问题与验收",
   "oneliner": "AI 能写代码出图，人剩下六件事：承接需求、定义问题、扩知识面、查质量、深思考、秀成果。",
   "mechanism": [
    "课程把人的能力拆成六项：承接需求、问题定义、广泛知识面、质量检查、深度思考、成果展示。",
    "问题定义要区分「用户要什么」和「用户需要什么」。",
    "质量检查针对 AI 幻觉：参考文献、时间等看起来通顺的内容不一定真实。",
    "学习方法三步：整理笔记、用工作里的真问题驱动、做出作品分享。",
    "小白路径等于更多实践加更聪明的筛选，实践、交流、培训三条腿。"
   ],
   "code": [
    "Learning：整理笔记",
    "Challenge：真问题驱动",
    "Show：作品呈现"
   ],
   "reuse": [
    "每接一个 AI 任务，先写清问题定义和验收标准。",
    "把事实核对固定成交付前的检查项。"
   ],
   "interview": "AI 替代执行，人负责定义问题和验收结果，这两件事决定产出价值。",
   "pitfall": "把 AI 输出当成品直接交付，跳过事实核对。",
   "source": "第0章",
   "tags": [
    "职业发展",
    "方法论",
    "AI协作"
   ]
  },
  {
   "id": "I-02",
   "layer": "I",
   "title": "简历一页纸加链接，另备三页详版",
   "oneliner": "面试官先看一页 summary，详细版放三页；GitHub 或博客链接比多写两行字有用。",
   "mechanism": [
    "准备两版简历：详细版可写到三页，另做一页纸 summary 给面试官快速浏览。",
    "简历末尾加 blog 或 GitHub 链接，让作品可验证。",
    "没有线上地址的项目，把完整经验、截屏和代码放到 GitHub，发链接。",
    "和 AI 弱相关的旧履历可压缩，项目管理、代码调试、架构思维这些通用能力要保留。",
    "与目标公司业务相关的旧项目仍然要写。"
   ],
   "code": [
    "一页 summary：快速筛选",
    "GitHub / blog：作品链接",
    "三页详版：项目细节"
   ],
   "reuse": [
    "投递用一页版，面试前发详版。",
    "每个项目都留一个可打开的证据链接。"
   ],
   "interview": "简历是一页纸加链接，详细经历放附件，作品要能被点开验证。",
   "pitfall": "简历堆满与岗位无关的旧项目，真正的 AI 项目只有一行字。",
   "source": "第40章",
   "tags": [
    "简历",
    "求职",
    "作品集"
   ]
  },
  {
   "id": "I-03",
   "layer": "I",
   "title": "项目经历用业务指标讲，不用技术名词堆",
   "oneliner": "知识库覆盖多少种类、每天回答多少问题、准确率多少、响应多快，这四个数比框架名有用。",
   "mechanism": [
    "RAG 项目按四件事量化：知识库种类与规模、日答题量、回答准确率、响应速度。",
    "项目描述先讲业务问题，再讲方案，最后给指标。",
    "低代码方案是 Dify、RAGFlow、FastGPT；高代码是 LangChain、LangGraph、Qwen-Agent。",
    "能说清每个环节的实现细节，比会调框架 API 更能证明能力。",
    "转岗时把旧经验翻译成通用能力：架构、调试、项目管理。"
   ],
   "code": [
    "Dify / RAGFlow / FastGPT：低代码",
    "LangChain / Qwen-Agent：高代码",
    "准确率 / 响应时间：项目指标"
   ],
   "reuse": [
    "每个项目准备四个数字：规模、流量、准确率、延迟。",
    "技术选型讲清为什么，不只列名词。"
   ],
   "interview": "项目讲述按业务问题、方案、指标三段走，指标比框架名更能证明做过。",
   "pitfall": "项目描述只列技术栈，说不出规模和效果。",
   "source": "第17章",
   "tags": [
    "简历",
    "项目表达",
    "指标"
   ]
  },
  {
   "id": "I-04",
   "layer": "I",
   "title": "RAG 上线流程：文档、架构、测试、调优",
   "oneliner": "客户初始文档先梳理知识架构再入库，测试集用 LLM 初评，再调 Prompt、知识库和召回。",
   "mechanism": [
    "知识文档来自客户初始资料，先梳理知识架构，再切分进向量数据库。",
    "技术栈可选 Qwen-Agent、LangChain 或 rag-cy 参考实现。",
    "测试阶段准备问题和标准答案，让 LLM 初步打分。",
    "调优三条线：Prompt、知识库、召回逻辑。",
    "性能问题看 LLM 调用次数和大 token 请求，部署常用 vLLM。"
   ],
   "code": [
    "Qwen-Agent / LangChain：编排框架",
    "vLLM：模型部署",
    "LLM 打分：初评测试集"
   ],
   "reuse": [
    "上线前先梳理知识架构，别直接切原始文档。",
    "调优按 Prompt、知识库、召回三条线分开记录。"
   ],
   "interview": "RAG 上线按文档整理、架构搭建、测试集评估、三条线调优四步走。",
   "pitfall": "跳过知识架构整理，把客户原始文档直接切块入库。",
   "source": "第17章",
   "tags": [
    "RAG",
    "上线流程",
    "项目管理"
   ]
  },
  {
   "id": "I-05",
   "layer": "I",
   "title": "评测集从 3 到 5 个种子问题扩到 100 条",
   "oneliner": "先找客户要种子问题，让 LLM 延展，客户确认后扩到 50 到 100 条，再逐条定打分规则。",
   "mechanism": [
    "找客户先要 3 到 5 个种子问题，让 LLM 延展成更多问法。",
    "客户确认问题清单后，扩到 50 到 100 个问题。",
    "让 LLM 基于知识库回答，得到 LLM response。",
    "让客户打分，答错时记录原因，梳理成每个问题的打分规则。",
    "评测集要覆盖不同题型和边界情况，不能只收正常问法。"
   ],
   "code": [
    "种子问题：3 到 5 条",
    "50 到 100 条：评测集规模",
    "LLM response：待评估答案",
    "打分规则：按题定义"
   ],
   "reuse": [
    "项目启动就把评测集当交付物，不放到最后补。",
    "每条问题写清什么算对，减少主观分歧。"
   ],
   "interview": "评测集从客户种子问题长出来，扩到 50 到 100 条，每条都要有打分规则。",
   "pitfall": "自己拍脑袋造测试题，客户真实问法一条没覆盖。",
   "source": "第17章",
   "tags": [
    "RAG",
    "评测集",
    "交付"
   ]
  },
  {
   "id": "I-06",
   "layer": "I",
   "title": "没有真实项目就把课程 CASE 改场景",
   "oneliner": "金融 ChatBI 改成销售 ChatBI，课程项目给你框架，换个业务场景就是自己的项目。",
   "mechanism": [
    "课程项目提供可运行的 CASE，改场景比从零造项目更快。",
    "示例：金融 ChatBI 改成销售类 ChatBI。",
    "在原有项目上增加新能力，例如 ChatBI 加 Function Call。",
    "把修改过程、截图和代码放到 GitHub，形成可验证的作品。",
    "面试时讲清哪些是课程框架、哪些是自己改的部分。"
   ],
   "code": [
    "ChatBI：可改场景的项目",
    "Function Call：可叠加的能力",
    "GitHub：作品存档"
   ],
   "reuse": [
    "选一个课程 CASE，换成本行业的数据和问题。",
    "保留改造前后的对比，面试时讲差异。"
   ],
   "interview": "没有真实项目就用课程 CASE 换业务场景，讲清改造点和效果。",
   "pitfall": "把课程项目原样写进简历，面试一问细节就露馅。",
   "source": "第40章",
   "tags": [
    "求职",
    "项目",
    "课程实战"
   ]
  },
  {
   "id": "I-07",
   "layer": "I",
   "title": "AI 编程提效率，不自动提质量",
   "oneliner": "接入 AI 编程工具后人均生产力提升 30% 到 55%，bug 密度没有显著下降。",
   "mechanism": [
    "效率看人均周 PR 数和代码量，质量看首次 Review 通过率和千行 bug 数。",
    "另外两维：团队敢不敢重构遗留模块，新人 onboarding 到独立提 PR 的天数。",
    "经验数据：接入 Cursor 这类工具后，人均生产力提升 30% 到 55%。",
    "前端、数据、脚本类工作收益高于后端业务代码。",
    "bug 密度无显著下降，强测试加 AI Review 是必需项。"
   ],
   "code": [
    "Cursor：AI 编程工具",
    "首次 Review 通过率：质量指标",
    "千行 bug 数：质量指标"
   ],
   "reuse": [
    "评估 AI 编程收益看效率、质量、胆量、成长四个维度。",
    "上线强测试和 AI Review，别只统计代码量。"
   ],
   "interview": "评估 AI 编程收益看效率、质量、胆量、成长四个维度，代码量只是其中一项。",
   "pitfall": "只统计代码行数和 PR 数，不看首次 Review 通过率和线上缺陷密度，收益被高估。",
   "source": "第40章",
   "tags": [
    "AI编程",
    "效能评估",
    "团队管理"
   ]
  },
  {
   "id": "I-08",
   "layer": "I",
   "title": "AI 项目报价按人和月算，先跑通再扩",
   "oneliner": "两个人一个月通常能看到结果；低代码平台快，高代码框架灵活，按交付形态选。",
   "mechanism": [
    "AI 项目用人加 AI 的方式，一般 2 个人 1 个月能看到结果。",
    "低代码路线：Dify、RAGFlow、FastGPT，适合快速交付。",
    "高代码路线：LangChain、LangGraph、Qwen-Agent，适合深度定制。",
    "报价前先确认知识库规模、数据源数量和是否需要私有化部署。",
    "项目拆成可演示的小阶段，每阶段都有可验收产出。"
   ],
   "code": [
    "Dify / RAGFlow：低代码交付",
    "LangChain / Qwen-Agent：高代码定制",
    "2 人 1 月：交付节奏参考"
   ],
   "reuse": [
    "先估知识库和数据源的工程量，再谈模型。",
    "每阶段留可演示成果，降低验收风险。"
   ],
   "interview": "AI 项目报价看数据工程量和交付形态，两个人一个月是常见的最小验证周期。",
   "pitfall": "按传统人月报一个大而全的方案，三个月还拿不出可演示的东西。",
   "source": "第17章",
   "tags": [
    "项目管理",
    "报价",
    "交付"
   ]
  },
  {
   "id": "I-09",
   "layer": "I",
   "title": "微调面试按为什么、够不够、怎么验三段答",
   "oneliner": "先讲为什么不用 Prompt 或 RAG，再算显存，最后说评测口径和灾难性遗忘。",
   "mechanism": [
    "第一段定位问题：没问清楚用提示工程，缺知识用 RAG，能力不足才微调。",
    "第二段算资源：7B LoRA 约 19GB，13B 要 32GB 以上或 QLoRA。",
    "第三段讲验收：任务主指标、通用能力防遗忘、换表述测泛化、人工评估。",
    "数据讲规模与质量：7B 简单任务 1000 到 5000 条，复杂任务 5000 到 50000 条。",
    "最后补一句成本：微调更新慢，知识频繁变化的场景仍要 RAG。"
   ],
   "code": [
    "LoRA / QLoRA：显存方案",
    "SFT：监督微调",
    "灾难性遗忘：通用能力回归"
   ],
   "reuse": [
    "面试前把三段写成一张纸，每段带一个数字。",
    "项目复盘按同样的三段写进简历。"
   ],
   "interview": "微调面试先答为什么，再答显存，最后答怎么验，三段都有数字就稳。",
   "pitfall": "一上来讲 LoRA 公式，说不清业务为什么需要微调。",
   "source": "第33章",
   "tags": [
    "面试",
    "微调",
    "表达"
   ]
  }
 ]
};

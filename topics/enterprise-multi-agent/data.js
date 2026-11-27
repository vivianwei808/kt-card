window.KB_TOPIC = {
 "slug": "enterprise-multi-agent",
 "meta": {
  "slug": "enterprise-multi-agent",
  "title": "企业级多智能体设计实战",
  "subtitle": "从四种架构范式，到可观测、可加固、可持续运营的 Agent 团队",
  "description": "基于《企业级多智能体设计实战》40 讲视频与 CrewAI 配套代码整理。视频按关键帧抽帧取要点，代码落点取自 crewai_mas_demo 仓库。",
  "source": "课程视频 40 讲、直播回放 2 场；代码仓库 crewai_mas_demo-main",
  "updated": "2026-11-27",
  "accent": "#7c3aed",
  "tags": [
   "Multi-Agent",
   "CrewAI",
   "Agent",
   "MCP",
   "工程化"
  ]
 },
 "layers": [
  {
   "key": "M",
   "name": "架构选型",
   "en": "Architecture Choice",
   "color": "#5b6472",
   "desc": "四种范式怎么选，什么任务不该上多智能体",
   "count": 6
  },
  {
   "key": "A",
   "name": "Agent 与任务契约",
   "en": "Agent & Task Contract",
   "color": "#b45309",
   "desc": "人设、任务契约、Process 调度、多模态输入",
   "count": 6
  },
  {
   "key": "T",
   "name": "工具与协议",
   "en": "Tools & Protocols",
   "color": "#0f766e",
   "desc": "工具封装 SOP、MCP、Skills、沙箱执行",
   "count": 6
  },
  {
   "key": "X",
   "name": "上下文与记忆",
   "en": "Context & Memory",
   "color": "#1d4ed8",
   "desc": "Bootstrap 骨架、剪枝压缩、文件记忆、检索记忆",
   "count": 7
  },
  {
   "key": "O",
   "name": "多智能体协作",
   "en": "Orchestration",
   "color": "#7c3aed",
   "desc": "Orchestrator、角色体系、任务链、人在环、自我进化",
   "count": 6
  },
  {
   "key": "E",
   "name": "生产工程化",
   "en": "Production",
   "color": "#b91c1c",
   "desc": "可观测、可靠性围栏、安全三道关",
   "count": 6
  },
  {
   "key": "Q",
   "name": "交付与运营",
   "en": "Delivery & Ops",
   "color": "#047857",
   "desc": "需求边界、评测、CI、监控、数据飞轮、组织",
   "count": 7
  },
  {
   "key": "V",
   "name": "每讲速览",
   "en": "Lesson Digest",
   "color": "#0e7490",
   "desc": "40 讲的视频要点与时间轴",
   "count": 40
  },
  {
   "key": "R",
   "name": "简历与面试",
   "en": "Resume & Interview",
   "color": "#be185d",
   "desc": "可写进简历的项目表述与问答",
   "count": 6
  }
 ],
 "cards": [
  {
   "id": "M-01",
   "layer": "M",
   "title": "四种架构范式：一条从确定性到自主性的坐标轴",
   "oneliner": "同一个任务，Prompt、Workflow、Single Agent、Multi-Agent 都能做，区别在于你把决定权交给谁。",
   "mechanism": [
    "四种范式排在同一条「自主性 × 复杂度」的轴上：Prompt Engineering → Workflow/Chain → Single Agent → Multi-Agent。",
    "Prompt 范式：用户手动粘贴竞品数据、步骤、风格样例，静态文本一次问完。弱点是容易超出上下文限制，对模型要求极高，效果不稳定。",
    "Workflow 范式用代码写死路径（爬取 → 清洗 → 分析 → 总结 → 审核 → 写文件），每一步仍然调 LLM，但下一步由程序员决定，即 Code-Driven。",
    "Single Agent 把决定权交给模型：它自己规划、自己调工具、自己判断信息够不够，即 Model-Driven。",
    "Multi-Agent 引入角色分工与上下文隔离：研究员拿搜索工具、分析师拿数据工具、审核员负责质检，不合格就回退。",
    "课程用一份「竞品分析报告」贯穿四张图，同一任务在四种范式下的差别一眼可见。"
   ],
   "code": [
    "m1l2/m1l2_raw_agent.py：不依赖任何框架，把四种范式里最核心的 Agent 循环手写一遍",
    "m1l3/m1l3_multi_agent.py：四个 Agent（研究员、搜索、撰写、审核）组成的多智能体版本"
   ],
   "reuse": [
    "评审一个 AI 方案时，先问清它落在轴上哪一点，再谈模型和框架。",
    "任务只有固定几步、每步可校验，直接写 Workflow，不必引入 Agent。",
    "任务需要边做边判断（信息够不够、结果合不合格）时才往右走。"
   ],
   "interview": "我把 AI 应用分成四档：Prompt、Workflow、Single Agent、Multi-Agent，判断标准是决定下一步的是人、是代码、还是模型；档位越高越贵，所以选最低够用的那一档。",
   "pitfall": "拿 Prompt 硬扛一个需要多轮检索和校验的任务，然后在提示词里反复加约束；问题出在架构档位不对，加约束解决不了。",
   "source": "第01讲 04:50-17:40",
   "tags": [
    "范式",
    "选型",
    "架构"
   ]
  },
  {
   "id": "M-02",
   "layer": "M",
   "title": "Agent 解剖学：规划、记忆、工具加一个循环",
   "oneliner": "Agent 的本质是一个 while 循环：调 LLM 拿动作，执行动作，把观察结果塞回上下文，直到模型说结束。",
   "mechanism": [
    "解剖图上三块器官：Planning（任务拆解与 ReAct）、Memory（短期上下文 + 长期知识）、Tools（搜索、抓取、文件系统）。",
    "执行过程是反馈回路：拆解搜索任务 → 调工具 → 判断信息是否充足 → 不足就补充搜索，充足就生成报告。",
    "ReAct 把这一步写成文本协议：Thought、Action、Observation 交替，模型看到 Observation 再决定下一个 Action。",
    "手写实现的关键是 stop 序列：调用时带 stop=[\"Observation:\"]，模型输出到 Action 就停，由程序执行工具后再把 Observation 拼回对话。",
    "这套循环是所有框架的底座，CrewAI、LangChain、AutoGPT 只是在外面包了角色、任务和调度。"
   ],
   "code": [
    "m1l2/m1l2_raw_agent.py：RawAgent.run() 里 while \"Final Answer:\" not in response 的主循环",
    "m1l2/m1l2_raw_agent.py：response + \"\\nObservation:\" + tool_result 拼回 messages 的分支",
    "m1l2/agent_system_prompt.txt：工具清单与输出格式的模板"
   ],
   "reuse": [
    "排查 Agent 卡死时，先看这个循环的三处：stop 序列、Observation 拼接格式、退出条件。",
    "自己写轻量 Agent 时用这个结构，一千行以内不用背框架。",
    "给团队讲 Agent 原理，直接跑这段代码，比画架构图有效。"
   ],
   "interview": "Agent 就是一个带退出条件的循环，循环体是「模型选动作、程序执行、结果回填」，我手写过这个循环，知道框架帮我们做的是记忆管理、工具 schema 和异常重试。",
   "pitfall": "把 Observation 拼错位置或漏掉 stop 序列，模型会自己编造工具结果；现象是 Agent 看起来在跑，其实一次工具都没调。",
   "source": "第02讲 12:30-17:00；m1l2/m1l2_raw_agent.py",
   "tags": [
    "ReAct",
    "Agent",
    "循环"
   ]
  },
  {
   "id": "M-03",
   "layer": "M",
   "title": "单 Agent 崩溃的三种方式：上下文变成垃圾场",
   "oneliner": "一个 Agent 包揽调研、抓取、分析、编码、审查，上下文会同时遇到长度爆炸、内容污染和多指令冲突。",
   "mechanism": [
    "长度爆炸：网页原文、代码、审查意见全堆在一个上下文里，几十轮之后要么超限，要么成本失控。",
    "内容污染：上一阶段的草稿、失败的尝试、无关的片段留在上下文里，后面每一步都被它们干扰。",
    "多指令挑战：一个 Agent 的提示词里塞了六种职责，模型在「现在该干什么」上摇摆，指令互相稀释。",
    "三种症状有同一个根因：所有职责共享一份上下文，没有隔离。",
    "多智能体的第一个理由就是隔离：每个角色只看到自己需要的上下文，产出通过文件或任务契约传递。"
   ],
   "code": [
    "m1l3/m1l3_multi_agent.py：四个 Agent 各自持有不同 tools，靠 context 参数传递上游产出",
    "shared/digital_worker.py：每个角色独立 workspace，soul/agent/memory 三份文件各自隔离"
   ],
   "reuse": [
    "单 Agent 越调越差时，先看上下文里有没有上一阶段的残留，再考虑拆角色。",
    "拆角色的界线：上下文必须不同的职责才拆，其余合并。",
    "把中间产出落成文件，用路径传递，比塞进 prompt 便宜也更稳。"
   ],
   "interview": "多智能体解决的核心问题是上下文隔离，一个 Agent 又调研又写又审，上下文会被污染到无法收敛；拆开后每个角色的上下文只有原来的几分之一。",
   "pitfall": "为了「智能」把角色拆得越细越好，结果通信成本和管理开销超过收益；四到六个角色通常就够。",
   "source": "第03讲 00:40-05:20",
   "tags": [
    "多智能体",
    "上下文",
    "隔离"
   ]
  },
  {
   "id": "M-04",
   "layer": "M",
   "title": "Agent、Task、Process：把团队建成一个数字化职能部门",
   "oneliner": "Agent 是岗位，Task 是工单，Process 是流程，三者对上公司里的职能部门。",
   "mechanism": [
    "Agent 对应岗位：role 是职位名，goal 是这个岗位的考核目标，backstory 是履历与行事风格。",
    "Task 对应工单：description 写清要做什么，expected_output 写清交付什么，context 挂上依赖的上游任务。",
    "Process 对应流程：Sequential 按顺序流水，Hierarchical 由管理者分派与验收。",
    "课程里的多智能体示例是四个岗位：深度研究专家、网络搜索专家、报告撰写研究员、报告审核编辑，各自绑不同工具。",
    "allow_delegation 决定这个岗位能不能把活转给别人：研究员和搜索专家关闭委托，撰写员打开，因为撰写员需要回头找搜索补料。"
   ],
   "code": [
    "m1l3/m1l3_multi_agent.py：四个 Agent 的 role/goal/backstory 与 tools 绑定",
    "m1l3/m1l3_multi_agent.py：allow_delegation=False 的研究、搜索岗，True 的撰写岗",
    "m2l5/m2l5_crew.py：Sequential Process 下的多任务与 context 依赖"
   ],
   "reuse": [
    "先画岗位表再写代码：岗位、职责、工具、交付物四列，写完再落 Agent 和 Task。",
    "委托开关按信息流向定：需要回头补料的岗位开，纯执行岗位关。",
    "Task 的 expected_output 写成可验收的格式，否则下游 Agent 要靠猜。"
   ],
   "interview": "我设计多智能体系统时先出岗位表：谁负责什么、手里有什么工具、交给下游什么格式，这份表和 Agent/Task/Process 三要素是一一对应的。",
   "pitfall": "所有 Agent 都开 allow_delegation，任务在几个角色之间来回踢皮球，日志里看不到推进。",
   "source": "第03讲 05:20-10:00；第09讲",
   "tags": [
    "Agent",
    "Task",
    "Process"
   ]
  },
  {
   "id": "M-05",
   "layer": "M",
   "title": "C.U.P. 选型模型：拿尺子量，别拍脑袋",
   "oneliner": "复杂度、不确定性、性能约束三个维度量完，该用哪档范式基本就定了。",
   "mechanism": [
    "C 复杂度分三层：交互复杂性（单轮文字到多轮文件）、过程复杂性（单步到多步）、依赖复杂性（只靠模型到依赖工具与数据）。",
    "U 不确定性分三种：输入不确定（边界清晰还是模糊）、过程不确定（路径固定还是未知）、目标不确定（标准明确还是模糊）。",
    "P 性能约束是硬指标：延迟、成本、可审计性。这一维经常直接否决掉最右档的方案。",
    "判断口径：三个维度都在低位，Prompt 或 Workflow 就够；过程和目标都不确定，才值得上 Agent；需要隔离与质检，才上多智能体。",
    "课程的原话是 Don't Guess, Measure：先给需求打分量表，再选型。"
   ],
   "code": [
    "第34讲：把 C.U.P. 扩展成一张 AI 适用性评估表，用来筛高 ROI 场景",
    "m4l23/workspace/requirements.md：需求文档作为编排输入的示例"
   ],
   "reuse": [
    "立项评审时用这张表打分，比「这个场景很 AI」有说服力。",
    "性能约束一票否决：要求 200ms 内响应的场景，先排除多智能体。",
    "打分结果写进方案文档，后面复盘时有依据。"
   ],
   "interview": "我用 C.U.P. 做选型：复杂度、不确定性、性能约束各打分，分数决定用 Prompt、Workflow 还是 Agent；性能这一维经常直接砍掉最贵的方案。",
   "pitfall": "只量复杂度和不确定性，忽略性能约束，方案做出来延迟和成本过不了上线评审。",
   "source": "第04讲 02:00-03:20；第34讲",
   "tags": [
    "选型",
    "评估",
    "ROI"
   ]
  },
  {
   "id": "M-06",
   "layer": "M",
   "title": "工程全景图：一套系统由七块拼起来",
   "oneliner": "从定义 Agent 到组织进化，课程把企业级多智能体拆成七个模块，每个模块解决一类失败。",
   "mechanism": [
    "第一块是定义层：Agent、Task、Process 三要素，解决「跑得起来」。",
    "第二块是工具层：工具封装、MCP、Skills、沙箱执行，解决「能干活」。",
    "第三块是上下文层：Bootstrap、剪枝压缩、文件记忆、检索记忆，解决「记得住」。",
    "第四块是协作层：Orchestrator、角色体系、任务链、人在环、自我进化，解决「配合得起来」。",
    "第五块是生产层：可观测、可靠性、安全，解决「敢上线」。",
    "第六块是交付层：需求边界、原型、评测、CI、监控、数据飞轮，解决「持续变好」。",
    "第七块是组织层：从表演式转型到 AI 原生组织，解决「谁来维护」。"
   ],
   "code": [
    "README.md：课程结构与 28 个示例目录的对应关系",
    "m5l30 到 m5l32：生产层三讲的 hook_framework 目录结构一致，逐讲叠加"
   ],
   "reuse": [
    "做企业内 Agent 平台规划时，用这七块当能力清单，缺哪块一眼看得出。",
    "排期按块推进：先定义层跑通，再补工具和上下文，最后上生产层。",
    "面试讲项目时按块讲，比按时间线讲清楚。"
   ],
   "interview": "我把企业级多智能体拆成定义、工具、上下文、协作、生产、交付、组织七块，每块对应一类失败模式，项目按块推进，落地时知道下一步该补什么。",
   "pitfall": "跳过生产层直接上业务，第一个月跑得挺好，第二个月成本、幻觉、权限问题一起爆。",
   "source": "第05讲；README.md 课程结构",
   "tags": [
    "全景",
    "工程化",
    "路线"
   ]
  },
  {
   "id": "A-01",
   "layer": "A",
   "title": "人设工程：Role、Goal、Backstory 各管一件事",
   "oneliner": "role 定岗位，goal 定验收标准，backstory 定行事风格和边界，三句话决定这个 Agent 的行为上限。",
   "mechanism": [
    "role 写职位名，越具体越好，像「深度研究专家」比「助手」更能约束输出。",
    "goal 写这个岗位的考核目标，带可判断的完成标准，例如「生成结构化信息点列表」。",
    "backstory 写履历、偏好、明确不做什么。课程的写法是「你是一位资深网络调研专家」，再补搜索策略和取舍原则。",
    "backstory 是唯一能放行为细节的地方：先搜什么、什么时候停、什么算不合格，写在这里比写在 task 里稳定。",
    "三个字段最终拼进 system prompt，模型对身份认同越清晰，越少跑偏。"
   ],
   "code": [
    "m1l2/m1l2_agent.py：单 Agent 调研示例的 role/goal/backstory 写法",
    "llm/aliyun_llm.py：AliyunLLM 适配器，Agent 的模型入口",
    "m2l3/m2l3_agent.py：Agent.kickoff() 跳过 Task 直接执行的最小用法"
   ],
   "reuse": [
    "写人设前先写岗位说明书：职责、交付物、不做什么，三条写完再翻译成三个字段。",
    "backstory 里写决策偏好（先搜还是先拆解）比写形容词有效。",
    "同一个岗位的 prompt 改动，优先改 backstory，别在 task 里打补丁。"
   ],
   "interview": "我把提示词工程升级成人设工程：role 定岗位，goal 定验收，backstory 写决策偏好和边界；改行为先改 backstory，这样同一套 Task 能复用到不同角色。",
   "pitfall": "backstory 写成一段赞美词（「你是一位经验丰富、认真负责的专家」），模型读完不知道该怎么做事。",
   "source": "第07讲；m1l2/m1l2_agent.py",
   "tags": [
    "人设",
    "Prompt",
    "Agent"
   ]
  },
  {
   "id": "A-02",
   "layer": "A",
   "title": "委托开关：allow_delegation 是一条信息流向的声明",
   "oneliner": "允许委托的岗位能把活转给别人，代价是任务可能被踢来踢去，所以按信息流向决定开关。",
   "mechanism": [
    "allow_delegation=True 时，Agent 可以把子问题转给同 Crew 的其他 Agent，框架会做一次内部委派。",
    "需要回头补料的岗位该开：撰写员写到一半发现缺数据，要能回头找搜索专家。",
    "纯执行岗位该关：研究员和搜索专家关掉委托，避免它们把调研任务转手。",
    "委托链越长，日志越难读，成本越不可控，课程示例里四个 Agent 只开了一个。",
    "委托本质是一次额外的 LLM 决策，能用 Task 的 context 依赖解决的事不要用委托。"
   ],
   "code": [
    "m1l3/m1l3_multi_agent.py：researcher/searcher 的 allow_delegation=False，writer 的 True",
    "m1l3/m1l3_multi_agent.py：editor 负责审核并把意见回给 writer"
   ],
   "reuse": [
    "画一张信息流向图，标出哪条边需要回头，只给回头的岗位开委托。",
    "委托开启后，在日志里单独统计委派次数，突增就是分工设计有问题。",
    "任务之间能用 context 传数据时，优先用 context。"
   ],
   "interview": "委托开关我按信息流向来定：需要回头补料的岗位开，纯执行岗位关；全开会让任务在角色之间打转，日志里看不到推进。",
   "pitfall": "把 allow_delegation 当能力开关，全 Crew 打开，结果一个任务被委派五六次，token 翻倍还没产出。",
   "source": "第09讲 09:40；m1l3/m1l3_multi_agent.py",
   "tags": [
    "协作",
    "委托",
    "多智能体"
   ]
  },
  {
   "id": "A-03",
   "layer": "A",
   "title": "Task 契约：用 Pydantic 把交付物钉死",
   "oneliner": "expected_output 描述要什么，output_pydantic 定义字段和类型，下游拿到的就是可解析的对象。",
   "mechanism": [
    "Task 的三件套：description 写做什么，expected_output 写交付标准，output_pydantic 绑定数据结构。",
    "契约用 Pydantic 模型表达，例如 ContentStrategyBrief 里每个字段带类型和 Field 描述。",
    "绑定 output_pydantic 后，框架会把模型输出解析成对象，字段缺失或类型不对就失败，问题在当步暴露。",
    "expected_output 要写成验收口径，例如「包含所有必填字段的 ContentStrategyBrief」。",
    "契约还能反向约束模型：字段描述会进提示词，等于把 schema 当成规格说明用。"
   ],
   "code": [
    "m2l4/m2l4_task.py：ImageAnalysis、VisualAnalysisReport、ContentStrategyBrief 三个模型",
    "m2l4/m2l4_task.py：output_pydantic=ContentStrategyBrief 的 Task 定义",
    "m2l6/m2l6_agent.py：多模态任务复用同一套 Pydantic 契约"
   ],
   "reuse": [
    "先写 Pydantic 模型，再写 Task，模型即接口文档。",
    "下游要用字段时，让它依赖 output_pydantic 的结果，不要解析自由文本。",
    "契约里给每个字段写 description，能显著减少字段含义的歧义。"
   ],
   "interview": "任务定义我走契约驱动：Pydantic 模型定字段，output_pydantic 绑定到 Task，交付物是可解析对象，字段缺失当步就报错，不用等到下游才发现。",
   "pitfall": "只写 expected_output 的自由文本描述，下游拿到一段格式不稳定的 markdown，再写正则去抠字段。",
   "source": "第08讲；m2l4/m2l4_task.py",
   "tags": [
    "Task",
    "Pydantic",
    "契约"
   ]
  },
  {
   "id": "A-04",
   "layer": "A",
   "title": "context 参数：任务依赖用声明式表达",
   "oneliner": "Task 的 context 列上游任务，框架就会把上游产出塞进本任务的上下文，顺序和依赖一起确定。",
   "mechanism": [
    "context=[task_a, task_b] 表示本任务依赖这两个任务的输出，执行前框架会等它们完成。",
    "依赖关系写在 Task 上，Process 负责按依赖调度，顺序不靠代码里的调用顺序保证。",
    "上游产出如果是 output_pydantic，下游拿到的是结构化对象，拼接提示词时更可控。",
    "课程示例里调研报告是逐步骤写的：每一步的 Task 依赖上一步的输出文件。",
    "context 与 allow_delegation 是两条路：声明式依赖适合固定流程，委托适合运行时才知道缺什么。"
   ],
   "code": [
    "m2l5/m2l5_crew.py：多 Task 的 context 依赖与 Sequential 执行",
    "m1l3/m1l3_multi_agent.py：分步骤调研的任务链"
   ],
   "reuse": [
    "把任务图画出来再写代码，Task 之间的每条边对应一个 context。",
    "上游产出较大时传文件路径，context 里只放摘要和路径。",
    "流程稳定就别用委托，声明式依赖更好调试。"
   ],
   "interview": "任务依赖我用 Task 的 context 声明，Process 按依赖调度，上游产出直接进下游上下文；产出大就传文件路径，避免上下文被撑爆。",
   "pitfall": "靠 Python 调用顺序保证依赖，遇到并行或重试时上游还没产出，下游拿到空上下文。",
   "source": "第09讲；m2l5/m2l5_crew.py",
   "tags": [
    "Task",
    "依赖",
    "Process"
   ]
  },
  {
   "id": "A-05",
   "layer": "A",
   "title": "Process：Sequential 保顺序，Hierarchical 加管理",
   "oneliner": "Sequential 按任务顺序流水执行，Hierarchical 多一个管理者负责分派和验收。",
   "mechanism": [
    "Sequential 适合步骤固定的流水线：调研 → 撰写 → 审核，一步接一步，失败即停。",
    "Hierarchical 引入 manager agent，把任务分派给成员并判断是否合格，不合格打回重做。",
    "管理者的判断也是一次 LLM 调用，成本更高，但能兜住成员跑偏。",
    "课程的主线用 Sequential 讲清楚信息传递，用 Hierarchical 讲验收与回退。",
    "选择标准：步骤能不能事先写死。能写死用 Sequential，需要边做边判用 Hierarchical 或 Orchestrator。"
   ],
   "code": [
    "m2l5/m2l5_crew.py：Process.sequential 的 Crew 配置",
    "m4l23/m4l23_orchestrator.py：更进一步的 Orchestrator 模式，运行时决定角色和顺序",
    "m4l26/README.md：Manager 分配与验收，PM 执行的双 Crew 结构"
   ],
   "reuse": [
    "先按 Sequential 搭通链路，需要验收再加 manager。",
    "Hierarchical 的 manager 提示词要写清验收标准，否则它只会说「看起来不错」。",
    "顺序执行的 Crew 要设最大轮次，防止打回循环。"
   ],
   "interview": "流程固定我用 Sequential，需要质检和回退就上 Hierarchical，管理者负责验收；再往上需要动态建角色，就用 Orchestrator 模式。",
   "pitfall": "一开始就上 Hierarchical，管理者没有验收标准，打回理由含糊，成员反复重做同一份产出。",
   "source": "第09讲；m2l5/m2l5_crew.py",
   "tags": [
    "Process",
    "调度",
    "验收"
   ]
  },
  {
   "id": "A-06",
   "layer": "A",
   "title": "多模态：本地图片先转 Base64，再交给视觉模型",
   "oneliner": "AddImageToolLocal 把本地图片读成 Base64 塞进消息，模型侧指定 image_model 就能看图。",
   "mechanism": [
    "CrewAI 默认的 AddImageTool 面向 URL，本地图片要用自定义的 AddImageToolLocal。",
    "工具做三件事：读文件、编码 Base64、按多模态消息格式拼进对话。",
    "Agent 侧指定 image_model=\"qwen3-vl-plus\"，主模型负责推理，视觉模型负责读图。",
    "用 AddImageToolLocal 时 multimodal 保持 False，两个开关别同时开。",
    "Task 的 description 必须明确要求调用该工具并给出图片路径，否则模型可能不看图直接编。"
   ],
   "code": [
    "tools/add_image_tool_local.py：本地图片读取与 Base64 编码",
    "m2l6/m2l6_agent.py：image_model 与 tools=[AddImageToolLocal()] 的配置",
    "m2l6/m2l6_agent.py：ImageAnalysis 契约与图片质量评分字段"
   ],
   "reuse": [
    "图片分析的验收标准写进 Pydantic 契约，例如质量评分、问题清单。",
    "批量场景先在工具里做压缩和尺寸校验，别把 20MB 原图塞给模型。",
    "图片路径作为 inputs 传入，不要写死在 prompt 里。"
   ],
   "interview": "多模态接入我把本地图片编码成 Base64 通过工具塞进消息，视觉模型单独指定；关键是在 Task 里强制要求先调工具看图，否则模型会凭文字编。",
   "pitfall": "只配了 image_model 没在任务里要求调用加载工具，模型看不到图，输出一段听起来合理但和图片无关的分析。",
   "source": "第10讲；m2l6/m2l6_agent.py",
   "tags": [
    "多模态",
    "视觉",
    "工具"
   ]
  },
  {
   "id": "T-01",
   "layer": "T",
   "title": "工具设计哲学：从 API 到 Agent Tool 换的是调用方",
   "oneliner": "同一份能力，写成给人调用的 API 和写成给模型调用的工具，接口、报错、返回格式都不一样。",
   "mechanism": [
    "传统 API 的调用方是程序员，文档可以长，参数可以嵌套，错误码可以查表。",
    "Agent Tool 的调用方是模型，它只看得到 name、description 和参数 schema 三样东西。",
    "所以工具描述要写给模型看：什么时候用、参数怎么填、返回长什么样，一句话说不清模型就会乱调。",
    "参数尽量扁平、必填项少、枚举值写全，模型对自由字符串的把握最差。",
    "返回结果要给模型能直接推理的文本，不要把 JSON 原样倾倒。"
   ],
   "code": [
    "tools/baidu_search.py：name、description、args_schema 三段式定义",
    "tools/baidu_search.py：BaiduSearchInput 的字段 description 就是给模型看的说明书"
   ],
   "reuse": [
    "写工具前先问：模型只读 description，能不能判断该不该用这个工具。",
    "把「什么时候不用」写进 description，比只写用途更能减少误调。",
    "工具返回值控制在几百字，超长的先摘要再返回。"
   ],
   "interview": "工具是写给模型看的接口：name、description、schema 就是全部文档，我把「何时用、参数怎么填、返回什么」都压进 description，误调率明显下降。",
   "pitfall": "把 REST 文档原样搬进工具描述，模型读完还是不知道该传什么，于是反复试错或者干脆不调。",
   "source": "第12讲；tools/baidu_search.py",
   "tags": [
    "工具",
    "接口设计",
    "Prompt"
   ]
  },
  {
   "id": "T-02",
   "layer": "T",
   "title": "工具封装五步 SOP：定义、参数、语义重构、I/O 瘦身、错误转译",
   "oneliner": "把一份 REST API 改成 Agent 能用的工具，五步各有各的坑，最容易被跳过的是语义重构和 I/O 瘦身。",
   "mechanism": [
    "Step 1 工具定义：先做语义完整性。碎片化 API 要聚合（文字搜索、图片搜索、视频搜索合成一个 search），复合型 API 要拆解（一个接口做多件事时按意图拆成多个工具）。",
    "Step 2 参数定义：用 Pydantic 建 args_schema，字段名和 description 都写给模型看，必填项越少越好。",
    "Step 3 语义重构：把接口名和参数名翻成模型熟悉的说法，description 写清什么时候用、返回什么，这是模型选工具的唯一依据。",
    "Step 4 I/O 瘦身：降噪增信。原始返回里 query、request_id、icon、image 这些字段对模型没用，裁掉噪音，保留 title、url、摘要这类能直接推理的内容。",
    "Step 5 错误转译：把上游错误码翻成人话，例如「配额不足，请稍后重试」，模型才知道该换策略还是放弃。"
   ],
   "code": [
    "tools/baidu_search.py：BaiduSearchInput 的 query/top_k/time_range/sites 四类参数",
    "tools/baidu_search.py：搜索结果裁剪成编号加标题加链接加摘要的紧凑格式",
    "tools/baidu_search.py：error_descriptions 把错误码翻译成模型能读懂的提示"
   ],
   "reuse": [
    "接一个新 API 先跑一遍五步，别直接把 requests 包一层就交差。",
    "I/O 瘦身对成本影响最大，返回从几 KB 降到几百字，上下文立刻轻松。",
    "错误转译写成字典维护，新增错误码只改一处。"
   ],
   "interview": "工具封装我按五步走：定义边界、定参数、语义重构、I/O 瘦身、错误转译；其中语义重构和 I/O 瘦身最容易被跳过，但这两步决定了模型会不会选错工具、上下文会不会爆。",
   "pitfall": "把 API 原样包一层，返回几十 KB 的 JSON，模型读不完，还容易被无关字段带偏。",
   "source": "第13讲；tools/baidu_search.py",
   "tags": [
    "工具",
    "SOP",
    "封装"
   ]
  },
  {
   "id": "T-03",
   "layer": "T",
   "title": "MCP：把工具接口标准化，一次接入处处可用",
   "oneliner": "MCP 服务器对外暴露工具清单，Agent 侧只配地址、过滤器和请求头，就能拿到一组标准工具。",
   "mechanism": [
    "CrewAI 支持三种传输：MCPServerHTTP、MCPServerSSE、MCPServerStdio，远程服务用 HTTP 最省事。",
    "配置里配 url、headers、tool_filter、cache_tools_list 四项，基本覆盖企业接入需求。",
    "tool_filter 支持静态和动态两种：静态按名字白名单，动态可按用户或上下文决定。",
    "多租户靠 headers 传 X-User-Id，服务端按用户隔离数据和权限。",
    "cache_tools_list=True 缓存工具清单，避免每次启动都拉一遍 schema。",
    "坑：CrewAI 委派时走 execute_task 不触发 _prepare_kickoff，MCP 工具不会自动加载，需要在首次执行前手动 get_mcp_tools 并塞进 tools。"
   ],
   "code": [
    "m2l9/m2l9_mcp.py：MCPServerHTTP 配置与 create_static_tool_filter",
    "m2l9/m2l9_mcp.py：headers={\"X-User-Id\": user_id} 的多租户写法",
    "m2l10/m2l10_sandbox.py：get_mcp_tools 手动加载绕过委派 bug"
   ],
   "reuse": [
    "内部系统统一包一层 MCP 服务，各业务 Agent 只配地址。",
    "工具白名单按角色配，别让写文档的 Agent 拿到删库工具。",
    "多租户场景把用户身份放 header，服务端做数据隔离，不要靠提示词约束。"
   ],
   "interview": "MCP 解决工具接口的标准化：服务端暴露工具清单，Agent 配地址和过滤器就能用；我在项目里用 header 传用户身份做多租户隔离，用静态过滤器限制每个角色能调的工具。",
   "pitfall": "以为配了 mcps 就万事大吉，委派场景下工具没加载，Agent 报工具不存在。",
   "source": "第14讲；m2l9/m2l9_mcp.py",
   "tags": [
    "MCP",
    "协议",
    "多租户"
   ]
  },
  {
   "id": "T-04",
   "layer": "T",
   "title": "Skills：先给菜单，再按需上菜",
   "oneliner": "工具描述里只放技能名和一句话摘要，模型选中之后才加载完整 SKILL.md，上下文只花一次钱。",
   "mechanism": [
    "渐进式披露分两步：启动时扫描 skills 目录，把 name 和 frontmatter 里的描述拼成 <available_skills> 注入工具描述；调用时才读 SKILL.md 正文。",
    "工具描述只放 XML 菜单，几十个技能也只有几百字，上下文开销可控。",
    "skill 分两类：type=reference 只返回操作指令文本，type=task 会现场搭一个 Sub-Crew 去执行。",
    "type=task 的 Sub-Crew 复用同一套骨架：backstory 塞进 SKILL.md，工具走沙箱 MCP，再用 tool_filter 限定四个沙箱工具。",
    "技能文件可以放在全局 skills 目录，也可以放在每个 workspace 自己的 skills 目录，实现角色专属技能。"
   ],
   "code": [
    "tools/skill_loader_tool.py：__init__ 只解析 frontmatter，_run 时才读全文",
    "tools/skill_loader_tool.py：_build_description 生成 <available_skills> XML",
    "skills/load_skills.yaml：技能清单与类型声明",
    "skills/pdf/SKILL.md、skills/docx/SKILL.md：reference 与 task 两类技能示例"
   ],
   "reuse": [
    "技能数量超过十个就上渐进式披露，别把全文塞进 system prompt。",
    "把「怎么写」放进 SKILL.md，「查什么数据」放进脚本，两者分开维护。",
    "技能目录按角色划分，manager 和 pm 各自挂不同技能。"
   ],
   "interview": "Skills 我按渐进式披露做：启动只注入技能菜单，模型选中后加载正文；需要执行的技能会起一个 Sub-Crew 在沙箱里跑，这样技能再多上下文也不爆。",
   "pitfall": "把所有 SKILL.md 全文拼进系统提示词，二十个技能吃掉上万 token，模型反而选不准。",
   "source": "第16讲；tools/skill_loader_tool.py",
   "tags": [
    "Skills",
    "渐进披露",
    "上下文"
   ]
  },
  {
   "id": "T-05",
   "layer": "T",
   "title": "沙箱两件套：代码解释器加无头浏览器",
   "oneliner": "AIO-Sandbox 容器里同时提供代码执行、文件操作和浏览器，Agent 因此能算数、能上网、能手写文件。",
   "mechanism": [
    "沙箱用官方镜像一键起：docker run 暴露一个 MCP 端口，Agent 侧当成 MCP 服务接入。",
    "能力包括 sandbox_execute_code、sandbox_execute_bash、sandbox_file_operations、sandbox_str_replace_editor。",
    "代码解释器解决模型算不准数、处理不了大文件的问题，把计算交给 Python。",
    "无头浏览器解决需要登录、需要渲染的页面抓取，普通 HTTP 抓取拿不到的内容走这里。",
    "文件目录按读写权限挂载：data 只读挂输入，output 读写挂产出，skills 只读挂技能。"
   ],
   "code": [
    "m2l10/m2l10_sandbox.py：沙箱 Agent 的 MCP 配置与工具加载",
    "sandbox-docker-compose.yaml：挂载与端口映射",
    "m2l10/m2l10_mcp_tools.md：沙箱可用工具清单"
   ],
   "reuse": [
    "凡是需要精确计算、批量处理文件的任务，直接给沙箱而不是让模型硬算。",
    "挂载按最小权限：输入只读，输出单独目录，技能目录只读。",
    "沙箱里跑的东西也要限时限量，防止死循环烧资源。"
   ],
   "interview": "沙箱是 Agent 的双手：代码解释器负责精确计算和文件处理，无头浏览器负责需要渲染的页面；我按最小权限挂载目录，输入只读输出单独放。",
   "pitfall": "让模型在对话里做多位数计算或者解析大 CSV，结果看着对但数错，还没法复现。",
   "source": "第15讲；m2l10/m2l10_sandbox.py",
   "tags": [
    "沙箱",
    "代码解释器",
    "浏览器"
   ]
  },
  {
   "id": "T-06",
   "layer": "T",
   "title": "中间结果工具：给 Agent 一个草稿本",
   "oneliner": "IntermediateTool 把中间产出落成文件，Agent 后面可以只读摘要，上下文不会被半成品占满。",
   "mechanism": [
    "长任务里中间产出很多：搜索结果、脚本、草稿。全留在上下文里，后面每轮都要为它们付费。",
    "IntermediateTool 提供一个写文件的入口，Agent 把阶段性结果落盘，只把路径和摘要留在对话里。",
    "多步任务恢复时，从文件读回状态，比从上下文里翻历史可靠。",
    "这也是慢思考模式的基础：先把想到的写下来，再读回来继续推理。"
   ],
   "code": [
    "tools/intermediate_tool.py：中间结果保存工具的完整实现",
    "m2l3/m2l3_agent.py：IntermediateTool 的调用示例"
   ],
   "reuse": [
    "超过五步的任务，每步产出都落盘，上下文里只留路径。",
    "落盘文件名带上任务 ID 和步骤号，恢复时好找。",
    "把「何时落盘」写进 backstory，模型才会主动用。"
   ],
   "interview": "我给 Agent 配了中间结果工具，阶段性产出落文件，上下文只留路径和摘要；上下文成本降下来，任务中断后还能从文件恢复。",
   "pitfall": "所有中间结果都留在对话历史里，跑到第十轮时上下文已经过万 token，模型开始遗忘最早的任务目标。",
   "source": "第13讲；tools/intermediate_tool.py",
   "tags": [
    "工具",
    "上下文",
    "落盘"
   ]
  },
  {
   "id": "X-01",
   "layer": "X",
   "title": "从 Prompt 到 Harness：Bootstrap 四件套",
   "oneliner": "每次开工先拼四段骨架：我是谁、服务谁、怎么干、记得什么，拼完再交给模型。",
   "mechanism": [
    "soul.md 放身份与决策偏好，user.md 放服务对象画像，agent.md 放工作规范，memory.md 放记忆索引。",
    "Bootstrap 函数把四份文件拼成带标签的提示词，注入 Agent 的 backstory。",
    "memory.md 只放索引，控制在 200 行以内，细节靠检索或读文件补。",
    "这套骨架让提示词从「一段话」变成「可维护的四份文档」，改行为改文件，不改代码。",
    "课程把这一层叫 Harness：模型之外的一切工程约束，都在这里组装。"
   ],
   "code": [
    "m3l20/m3l20_file_memory.py：build_bootstrap_prompt 拼装四段",
    "m3l19/workspace/：soul.md、user.md、agent.md、memory.md 四份样例",
    "shared/digital_worker.py：复用同一套 bootstrap，传给每个数字员工"
   ],
   "reuse": [
    "新角色上线前先写四份 markdown，代码零改动。",
    "memory.md 只写索引和关键词，正文放文件或向量库。",
    "把四份文件纳入版本管理，改人设走 review。"
   ],
   "interview": "上下文我按 Harness 思路做：soul、user、agent、memory 四份文件拼成 bootstrap 骨架，注入 backstory，改角色行为就是改文档，代码不动。",
   "pitfall": "所有规则堆在 system prompt 里，改一条要动代码，几个角色之间还会互相抄错。",
   "source": "第18讲、第19讲；m3l19/README.md",
   "tags": [
    "上下文",
    "Bootstrap",
    "Harness"
   ]
  },
  {
   "id": "X-02",
   "layer": "X",
   "title": "剪枝：把旧工具结果换成占位符，结构还得合法",
   "oneliner": "倒数第 N 轮之前的工具返回全部替换成「已剪枝」，tool_call_id 保留，消息结构不能坏。",
   "mechanism": [
    "工具返回是上下文里最占地方的部分，一次搜索就可能几千字。",
    "剪枝策略：找到倒数第 N 个 user 消息，它之前的所有 tool 消息，content 替换为 [已剪枝]。",
    "只换 content，tool_call_id 和 role 保持原样，否则模型或框架解析消息时会报错。",
    "剪掉的是原始返回，结论已经写进 assistant 的回复里，信息损失可控。",
    "这比整体摘要便宜，也更可控：哪一段该留、哪一段该丢，由位置决定。"
   ],
   "code": [
    "m3l19/m3l19_context_mgmt.py：prune_tool_results 的位置判断逻辑",
    "shared/digital_worker.py：prune_tool_results 被数字员工直接复用"
   ],
   "reuse": [
    "长任务必备，尤其是搜索、抓网页这类高 token 工具。",
    "剪枝阈值按工具类型定，读文件的返回可以剪得更早。",
    "剪枝前后各记一次 token 数，便于观察效果。"
   ],
   "interview": "剪枝我按位置剪：保留最近 N 轮，更早的工具返回换成占位符但保留 tool_call_id，消息结构合法，token 能降一半以上。",
   "pitfall": "直接把整条 tool 消息删掉，消息序列缺了配对的 tool_call_id，框架或模型直接报格式错误。",
   "source": "第19讲；m3l19/m3l19_context_mgmt.py",
   "tags": [
    "上下文",
    "剪枝",
    "token"
   ]
  },
  {
   "id": "X-03",
   "layer": "X",
   "title": "压缩：用量超过 45% 就把历史摘要成一段",
   "oneliner": "token 用量接近模型上限时，把早期对话分块摘要成一条 context_summary，最近十轮保留原文。",
   "mechanism": [
    "触发条件是比率而不是绝对值：approx_tokens / model_limit 超过 0.45 就压缩，换模型不用改配置。",
    "压缩过程：按 token 分块，用便宜的小模型逐块摘要，替换成一条 <context_summary> 系统消息。",
    "最近十轮保留原文，保证当前任务的细节不丢。",
    "摘要用 qwen3-turbo 这类便宜模型，成本远低于主模型重跑长上下文。",
    "剪枝和压缩配合：先剪工具返回，还不够再摘要历史。"
   ],
   "code": [
    "m3l19/m3l19_context_mgmt.py：maybe_compress 的阈值判断与 chunk_by_tokens",
    "m3l19/m3l19_context_mgmt.py：_summarize_chunk 调用小模型做摘要"
   ],
   "reuse": [
    "阈值写成比例，别写死 token 数。",
    "摘要保留「做过什么决定、放弃了什么」，比保留对话原文有用。",
    "压缩是兜底，先靠剪枝和上下文隔离把用量控制住。"
   ],
   "interview": "压缩按比例触发，用量过 45% 就用小模型把历史分块摘要，最近十轮留原文；剪枝解决工具返回，压缩解决对话历史，两级兜底。",
   "pitfall": "等到上下文真的超限才处理，请求直接失败；或者压缩掉最近的对话，模型忘了当前任务做到哪一步。",
   "source": "第19讲；m3l19/m3l19_context_mgmt.py",
   "tags": [
    "上下文",
    "压缩",
    "摘要"
   ]
  },
  {
   "id": "X-04",
   "layer": "X",
   "title": "文件系统记忆：主 Agent 不碰文件，写记忆走技能",
   "oneliner": "主 Agent 只留一个 SkillLoaderTool，写记忆的活交给子 Crew 在沙箱里做，权限和格式都收在技能里。",
   "mechanism": [
    "对照实验：上一讲给 Agent 直接配 FileWriterTool、FileReadTool，本讲把这些全去掉。",
    "主 Agent 的工具表里只有 SkillLoaderTool，需要写记忆时调用 memory-save 技能。",
    "技能内部起一个 Sub-Crew，在沙箱里按四步规范写文件，目录和格式由技能定义。",
    "好处是主上下文里不会出现大段文件内容，写盘动作也统一走一套规范。",
    "技能目录分两层：workspace 自己的 skills 放角色专属技能，全局 skills 放通用技能。"
   ],
   "code": [
    "m3l20/m3l20_file_memory.py：assistant_agent 的工具表只剩 SkillLoaderTool",
    "skills/memory-save/SKILL.md：记忆写入的四步规范",
    "skills/memory-governance/SKILL.md：记忆审计与清理"
   ],
   "reuse": [
    "写盘这类有格式要求的操作，包成技能比给裸工具稳。",
    "角色专属技能放 workspace，团队通用技能放全局目录。",
    "主 Agent 的工具表越短，误调越少。"
   ],
   "interview": "记忆写入我不给主 Agent 文件工具，只留技能加载器，写盘由技能内部的子 Crew 在沙箱执行，格式和目录都收在 SKILL.md 里，主上下文干净很多。",
   "pitfall": "给主 Agent 配完整文件读写，它会把整份文件读进上下文，记忆没存好，token 先爆了。",
   "source": "第20讲；m3l20/README.md",
   "tags": [
    "记忆",
    "技能",
    "沙箱"
   ]
  },
  {
   "id": "X-05",
   "layer": "X",
   "title": "搜索式记忆：异步索引加混合检索",
   "oneliner": "对话结束后异步跑四步索引，存进 pgvector，检索时向量和全文按 7:3 加权。",
   "mechanism": [
    "四步索引流水线：解析对话轮次、用小模型抽摘要和标签、调用 embedding 接口、写入 pgvector。",
    "索引走 asyncio.create_task 异步执行，不阻塞主对话。",
    "embedding 用 text-embedding-v3，1024 维；摘要和标签用 qwen3.6-max 生成。",
    "检索支持三种模式：纯向量余弦、全文 BM25 近似、混合 0.7 向量加 0.3 全文。",
    "过滤器支持标签重叠和时间范围，先过滤再排序，召回更准。",
    "写入用 ON CONFLICT DO NOTHING，重复索引不会产生脏数据。"
   ],
   "code": [
    "m3l21/m3l21_search_memory.py：检索入口与三种模式",
    "m3l21/indexer.py：异步索引四步流水线",
    "m3l21/pgvector-docker-compose.yaml：向量库环境"
   ],
   "reuse": [
    "量大之后先做标签过滤，再做向量检索，比纯向量准。",
    "索引异步跑，别让用户等 embedding。",
    "摘要和标签一并存，检索结果可以直接当上下文用。"
   ],
   "interview": "长记忆我做成异步索引加混合检索：对话结束抽摘要和标签存进 pgvector，检索时向量 0.7 加全文 0.3，再按标签和时间过滤，召回比纯向量稳。",
   "pitfall": "同步做 embedding，每次对话末尾卡两秒；或者只存原文不存摘要，检索出来的片段又长又散。",
   "source": "第21讲；m3l21/indexer.py",
   "tags": [
    "记忆",
    "pgvector",
    "检索"
   ]
  },
  {
   "id": "X-06",
   "layer": "X",
   "title": "三层记忆：短期上下文、长期文件、海量检索",
   "oneliner": "XiaoPaw 把记忆分成三层，按成本和速度取舍，最近的放上下文，常用的放文件，海量的进向量库。",
   "mechanism": [
    "第一层是会话上下文：当前任务的工作区，剪枝加压缩控制在预算内。",
    "第二层是 workspace 文件：soul、user、agent、memory 四份，跨会话稳定存在，读取成本极低。",
    "第三层是向量库：历史对话摘要，量大，需要时才检索。",
    "三层之间靠 memory.md 索引串联：文件里记索引，需要细节时检索。",
    "写入路径统一走记忆技能，读取路径按成本从低到高。"
   ],
   "code": [
    "m2l22/readme.md：XiaoPaw 三层记忆的项目结构",
    "m3l20/workspace/：第二层文件样例",
    "m3l21/m3l21_search_memory.py：第三层检索实现"
   ],
   "reuse": [
    "按访问频率分层，别把所有记忆都塞进向量库。",
    "索引文件写关键词和指针，正文放各自的层。",
    "每层设容量上限，超了就治理，不然越用越慢。"
   ],
   "interview": "记忆我分三层：上下文管当前任务，workspace 文件管长期设定，向量库管海量历史；按访问成本从低到高读，写入统一走技能。",
   "pitfall": "所有历史都往上下文里塞，或者所有记忆都进向量库，前者爆 token，后者每次检索都慢。",
   "source": "第22讲；m2l22/readme.md",
   "tags": [
    "记忆",
    "分层",
    "XiaoPaw"
   ]
  },
  {
   "id": "X-07",
   "layer": "X",
   "title": "记忆治理：谁写入、谁审计、谁清理",
   "oneliner": "记忆会越写越乱，所以要有治理技能：定期审计冲突条目、清理过期内容、合并重复项。",
   "mechanism": [
    "memory-governance 技能负责读两个目录、检查条目冲突、输出治理建议。",
    "冲突检测看同一事实是否有多个版本，例如用户偏好变了但旧记录还在。",
    "过期清理按时间戳和引用次数判断，长期没被召回的记忆降权或归档。",
    "治理结果写回 memory.md 索引，保持索引与实际内容一致。",
    "治理也走子 Crew，主 Agent 只看治理报告。"
   ],
   "code": [
    "skills/memory-governance/SKILL.md：治理流程与判定规则",
    "skills/memory-save/SKILL.md：写入规范，与治理共用同一套字段"
   ],
   "reuse": [
    "记忆上线就要配治理，不然三个月后没人敢信记忆内容。",
    "冲突条目让人确认，别让模型自己删。",
    "每次治理留审计日志，出问题能回溯。"
   ],
   "interview": "记忆需要治理：写入走统一规范，定期审计冲突和过期条目，冲突交给人确认；我用一个治理技能做这件事，主 Agent 只看报告。",
   "pitfall": "只写不治理，同一个用户的偏好存了五个版本，模型每次召回都可能拿到过期的那个。",
   "source": "第20讲、第22讲；skills/memory-governance/SKILL.md",
   "tags": [
    "记忆",
    "治理",
    "审计"
   ]
  },
  {
   "id": "O-01",
   "layer": "O",
   "title": "Orchestrator：角色在运行时由主 Agent 创建",
   "oneliner": "主 Agent 手里只有三个工具：生成子 Agent、并行生成、读产出文件，团队结构由它当场决定。",
   "mechanism": [
    "Orchestrator 的工具表极小：SpawnSubAgentTool 串行建一个子 Crew，SpawnParallelTool 并行建多个，FileReadTool 读产出。",
    "SOP 技能注入 backstory，让它知道阶段顺序：设计、Mock 与测试、开发、Review、修复、交付。",
    "运行时它要回答四个问题：建什么角色、串行还是并行、传什么上下文、产出合不合格。",
    "子 Crew 之间传的是文件引用，不是全文。下游读文件，上下文不膨胀。",
    "这套结构适合任务形状事先不确定的项目，代价是每次运行的角色组合可能不同，需要靠评测兜底。"
   ],
   "code": [
    "m4l23/m4l23_orchestrator.py：SpawnSubAgentTool 与 SpawnParallelTool 的实现",
    "m4l23/workspace/requirements.md：编排输入的示例需求",
    "m4l23/test_orchestrator.py：编排逻辑的离线测试"
   ],
   "reuse": [
    "任务形状固定就别用 Orchestrator，Sequential 加固定角色更可控。",
    "子 Crew 产出统一落文件，主 Agent 只读路径和摘要。",
    "给 Orchestrator 设角色数量上限，防止它一次建十个。"
   ],
   "interview": "Orchestrator 模式把团队结构交给主 Agent：它用生成子 Agent 的工具现场建角色，串行还是并行自己决定，产出以文件引用传递，所以上下文不会随团队规模膨胀。",
   "pitfall": "让 Orchestrator 自己决定一切又没有上限，一次任务建了七八个子 Agent，成本和耗时都失控。",
   "source": "第23讲；m4l23/m4l23_orchestrator.py",
   "tags": [
    "Orchestrator",
    "编排",
    "动态角色"
   ]
  },
  {
   "id": "O-02",
   "layer": "O",
   "title": "数字团队：一个通用类，装不同的 workspace",
   "oneliner": "DigitalWorkerCrew 只有一份代码，角色差异全在 workspace 的四个 markdown 和技能目录里。",
   "mechanism": [
    "shared/digital_worker.py 里角色和目标是通用值：数字员工，按背景和技能完成任务。",
    "身份来自 workspace：soul.md 定身份与决策偏好，agent.md 定职责与 NEVER 清单，user.md 定服务对象，memory.md 定记忆索引。",
    "任务模板也是通用的，把用户请求和四段背景拼进去，具体做什么由技能和工作区决定。",
    "这带来一个好处：新增一个岗位只需要新建目录和四份文件，代码零改动。",
    "Manager 和 PM 是两个实例，跑同一个类，Kickoff 时传入各自的 workspace。"
   ],
   "code": [
    "shared/digital_worker.py：UNIVERSAL_ROLE、UNIVERSAL_GOAL、UNIVERSAL_TASK_TEMPLATE",
    "m4l26/main.py、m4l26/start_pm.py：同一类的两个实例入口",
    "m4l27/workspace/manager/、workspace/pm/：两套四份文件"
   ],
   "reuse": [
    "角色超过三个就抽通用类，别复制三份 prompt。",
    "把差异全部下沉到 workspace 文件，代码只留引擎。",
    "新增岗位的验收标准：只改文件，不改代码。"
   ],
   "interview": "我把数字员工抽成一个通用类，每个角色的差异全在 workspace 的 soul、agent、user、memory 四份文件里，加一个岗位是加目录，不是加代码。",
   "pitfall": "每个角色写一个 Crew 类，改一个公共逻辑要动五处，几周后没人敢改。",
   "source": "第25讲、第26讲；shared/digital_worker.py",
   "tags": [
    "数字员工",
    "复用",
    "workspace"
   ]
  },
  {
   "id": "O-03",
   "layer": "O",
   "title": "角色体系：NEVER 清单比职责描述更管用",
   "oneliner": "每个角色的 agent.md 里写清不做什么，越界时模型会主动退回，而不是硬着头皮做。",
   "mechanism": [
    "Manager 的 agent.md 带团队名册，知道活该分给谁；同时带 NEVER 清单，禁止它自己做技术设计。",
    "Dev 的 soul.md 声明技术是唯一权威；输入缺验收标准时触发 NEVER 规则，直接退回给上游。",
    "分工靠文件而不是靠提示词里的形容词，规则可审计、可版本管理。",
    "角色边界还要配上交付物定义：Manager 交 task_breakdown.md，Dev 交 tech_design.md。",
    "越界检测放在 agent.md 的规则里，比事后在日志里找问题便宜。"
   ],
   "code": [
    "m4l25/workspace/manager/agent.md：团队名册与 NEVER 清单",
    "m4l25/workspace/dev/soul.md：技术权威声明与退回规则",
    "m4l25/workspace/*/：四份文件的完整样例"
   ],
   "reuse": [
    "写角色先写 NEVER 清单，边界比能力更重要。",
    "退回规则写清触发条件，例如缺少验收标准。",
    "交付物文件名固定，下游不用猜。"
   ],
   "interview": "角色定义里我给每个岗位写 NEVER 清单：Manager 不准做技术设计，Dev 收到的需求缺验收标准就退回；边界写死之后，越界的情况在源头就挡住了。",
   "pitfall": "只写「你是一位优秀的架构师」这种能力描述，不写边界，模型什么都敢接，交付质量全靠运气。",
   "source": "第25讲；m4l25/workspace/",
   "tags": [
    "角色",
    "边界",
    "规范"
   ]
  },
  {
   "id": "O-04",
   "layer": "O",
   "title": "任务链与邮箱：三态状态机保证消息不丢不重",
   "oneliner": "任务通过邮箱传递，状态只有 unread、in_progress、done，取件是原子操作，超时自动回收。",
   "mechanism": [
    "三态状态机借用了消息队列的可见性超时思路：read_inbox 取件时原子置为 in_progress 并记录时间。",
    "处理完调 mark_done 置为 done；进程崩溃留下 in_progress，由 reset_stale 超时重置回 unread。",
    "取件用文件锁保护，两个 Agent 不会拿到同一条消息。",
    "编排演化分两版：v2 用一个 run_demo.py 顺序调用三个 Crew；v3 去掉编排器，Manager 和 PM 各自独立启动，靠邮箱协作。",
    "v3 的 Agent 身份来自 workspace，通信走 mailbox 技能而不是直接操作文件。"
   ],
   "code": [
    "m4l26/tools/mailbox_ops.py：read_inbox 的 filelock 原子操作",
    "m4l26/tools/mailbox_ops.py：mark_done、mark_done_all_in_progress、reset_stale",
    "m4l26/README.md：v2 与 v3 的架构对比表"
   ],
   "reuse": [
    "多 Agent 传任务用邮箱，别用共享变量或直接函数调用。",
    "取件必须原子，否则并发下会重复执行。",
    "崩溃恢复靠超时回收，不靠人工清理。"
   ],
   "interview": "Agent 之间我不用函数调用传任务，用一个三态邮箱：取件原子置为处理中，完成置为完成，超时自动回收，本质是把消息队列的可见性超时搬到文件上。",
   "pitfall": "两个 Agent 同时扫同一个目录取任务，同一条消息被执行两遍，产出文件互相覆盖。",
   "source": "第26讲；m4l26/tools/mailbox_ops.py",
   "tags": [
    "任务链",
    "状态机",
    "并发"
   ]
  },
  {
   "id": "O-05",
   "layer": "O",
   "title": "Human as 甲方：三个介入点，一个接口",
   "oneliner": "人在环不靠模型自觉，由编排脚本在固定时点停下来等人确认，而且人只跟 Manager 对话。",
   "mechanism": [
    "两个时点解耦：时点 A 共创 SOP，时点 B 执行任务，互不依赖，可以隔天做。",
    "时点 B 里有三个确认节点：需求澄清、方案确认、交付验收。",
    "单一接口原则：human.json 只由 Manager 写，PM 不能直接找人。",
    "人在环是异步的：human_cli.py 独立运行，Manager 发通知后不阻塞等待。",
    "多轮迭代支持：需求澄清和 SOP 制定都接受人工反馈，改完再走下一轮。",
    "何时打扰人由脚本决定，不让 LLM 自己判断该不该找人。"
   ],
   "code": [
    "m4l27/human_cli.py：Human 端命令行工具",
    "m4l27/sop_setup.py：时点 A 的 SOP 共创入口",
    "m4l27/main.py：时点 B 的三个人工确认节点",
    "m4l27/workspace/manager/skills/notify_human/：通知人的技能"
   ],
   "reuse": [
    "介入点写进流程代码，不要写进提示词。",
    "人只对一个 Agent 说话，避免多头沟通。",
    "等待人回复用异步，别把 Crew 挂在那里等。"
   ],
   "interview": "人在环我按工程节点设计：需求澄清、方案确认、交付验收三个点由脚本停下，人只跟 Manager 对话，PM 不能越级找人，等回复是异步的。",
   "pitfall": "让模型自己判断什么时候该问人，结果它要么从不问，要么每步都问，人工成本失控。",
   "source": "第27讲；m4l27/README.md",
   "tags": [
    "人在环",
    "HITL",
    "流程"
   ]
  },
  {
   "id": "O-06",
   "layer": "O",
   "title": "自我进化：Skill 管怎么想，Script 管查什么",
   "oneliner": "复盘技能给出思考框架，日志查询脚本负责取数，Agent 产出结构化的改进提案，审批后才改文件。",
   "mechanism": [
    "分工原则：SKILL.md 写五个递进问题和根因枚举，log_query.py 负责 stats、tasks、steps、l1、all-agents 五类查询。",
    "Agent 读日志、按框架推理，产出 RetroOutput JSON：复盘报告加改进提案。",
    "提案带 root_cause、before_text、after_text，Manager 审批后由 PM 执行，改动落在 agent.md、soul.md、memory.md 或技能文件上。",
    "三层日志支撑复盘：任务层记录每次任务，步骤层记录 ReAct 轨迹，人工纠正层记录人改过什么。",
    "关键约束：模型不能自己改自己的规则，所有改动要过审批。"
   ],
   "code": [
    "m4l28/README.md：Skill 与 Script 的分工图",
    "m4l28/run.py、m4l28/scheduler.py：复盘调度",
    "m4l28/schemas.py：RetroOutput 与改进提案的结构定义",
    "skills/self_retrospective/SKILL.md、tools/log_query.py"
   ],
   "reuse": [
    "让 Agent 改进自己时，先给它数据查询能力，再给它思考框架。",
    "改进提案必须带前后对照文本，审批的人才知道改了什么。",
    "改动走审批，模型不碰自己的规则文件。"
   ],
   "interview": "自我进化我拆成两块：技能负责怎么想，脚本负责查数据，产出带根因和前后对照的改进提案，人审批后才改规则文件，模型不能直接改自己。",
   "pitfall": "让 Agent 直接编辑自己的提示词，一次误改就可能把整个角色改坏，而且没有回滚。",
   "source": "第28讲；m4l28/README.md",
   "tags": [
    "进化",
    "复盘",
    "提案"
   ]
  },
  {
   "id": "E-01",
   "layer": "E",
   "title": "Hook 骨架：七个事件对齐 Agent 的一轮生命周期",
   "oneliner": "把一轮 Agent 的推理拆成七个可挂载点，所有观测、拦截、统计都挂在这七个点上。",
   "mechanism": [
    "七个事件：BEFORE_TURN、BEFORE_LLM、BEFORE_TOOL_CALL、AFTER_TOOL_CALL、AFTER_TURN、TASK_COMPLETE、SESSION_END。",
    "映射关系写死在一张表里：before_turn 用 before_llm_call 加轮次计数，AFTER_TOOL_CALL 用 after_tool_call，AFTER_TURN 用 step_callback。",
    "HookContext 是冻结的 dataclass，带 agent_id、task_name、tool_name、tool_input、token 数、耗时，处理函数只看这一个对象。",
    "配置分两层：全局 hooks.yaml 管日志与追踪，workspace 的 hooks.yaml 管具体角色的审计，加载器按顺序合并。",
    "全局 Hook 会自动传播到 Sub-Crew，子 Agent 的工具调用一样被记录。"
   ],
   "code": [
    "m5l30/hook_framework/registry.py：EventType 与 HookRegistry.dispatch",
    "m5l30/hook_framework/loader.py：hooks.yaml 解析与 importlib 两层加载",
    "m5l30/hook_framework/crew_adapter.py：CrewAI 四种机制到七个事件的适配"
   ],
   "reuse": [
    "先定事件表，再写业务钩子，事件表稳定后各模块互不干扰。",
    "HookContext 用只读对象，避免一个 handler 改坏别的 handler 的输入。",
    "全局钩子放公司级规范，角色级钩子放业务目录。"
   ],
   "interview": "可观测性从事件模型开始：我把一轮 Agent 拆成七个可挂载点，工具调用、LLM 调用、轮次结束都有钩子，配置两层加载，全局钩子还能传播到子 Agent。",
   "pitfall": "在各个业务代码里手写日志和统计，没有统一事件点，新增一个指标要改十几处。",
   "source": "第30讲；m5l30/hook_framework/registry.py",
   "tags": [
    "可观测",
    "Hook",
    "事件"
   ]
  },
  {
   "id": "E-02",
   "layer": "E",
   "title": "Langfuse 全链路：一次任务在追踪里是一棵树",
   "oneliner": "Trace 下面挂 TOOL span、GENERATION span 和 task-complete 事件，成本和耗时按节点看得到。",
   "mechanism": [
    "自托管 Langfuse 六个容器：Web、Worker、Postgres、Redis、ClickHouse、MinIO，ClickHouse 冷启动要五到八分钟。",
    "接入方式是 Hook：before_llm 建 generation span，before_tool_call 建 tool span，after 记录结果与耗时。",
    "追踪树和 Hook 事件一一对应，所以在界面上看到的层级就是实际的执行层级。",
    "每个 span 带 token 数与成本，出了成本异常能直接定位到某个工具的某次调用。",
    "TASK_COMPLETE 事件用来标记任务结束，方便按任务聚合成功率与 P95 延迟。"
   ],
   "code": [
    "m5l30/README.md：Langfuse 自托管部署与密钥配置",
    "m5l30/hook_framework/hooks.yaml：langfuse_trace 钩子配置",
    "m5l31/demo.py：跑一次任务后查看 Trace 树"
   ],
   "reuse": [
    "自托管比 SaaS 更适合数据敏感的企业内网。",
    "span 命名带上 agent 和 tool，排查时好筛。",
    "把成本挂到 span 上，成本归因不用再算账。"
   ],
   "interview": "全链路追踪我接在 Hook 上，一次任务在 Langfuse 里是一棵树，工具调用和模型调用各自成节点，带 token 和耗时，成本异常能直接定位到某次工具调用。",
   "pitfall": "只记录最终答案，中间调用全黑箱，出问题时只能靠猜是哪一步错了。",
   "source": "第30讲；m5l30/README.md",
   "tags": [
    "可观测",
    "Langfuse",
    "追踪"
   ]
  },
  {
   "id": "E-03",
   "layer": "E",
   "title": "dispatch 与 dispatch_gate：报警器和断路器的区别",
   "oneliner": "普通钩子里的异常吞掉继续跑，护栏钩子的异常向上传播并拦住工具，两种分发不能混用。",
   "mechanism": [
    "dispatch 用于观测类钩子：某个 handler 抛异常就记下来，继续执行下一个，不影响主流程。",
    "dispatch_gate 用于阻断类钩子：GuardrailDeny 向上传播，工具不再执行，其他异常仍然吞掉。",
    "分开的原因很实际：日志组件坏了不该阻断业务，护栏判定了违规必须阻断。",
    "CrewAI 的 before_tool_call 装饰器内部有 except Exception: pass，会吞掉护栏异常。",
    "解决方案是 pending_deny：护栏里把拒绝原因存起来并 return False 阻止工具，再在 step_callback 里重新抛出，因为 step_callback 不在 try/except 保护里。"
   ],
   "code": [
    "m5l31/hook_framework/registry.py：dispatch 与 dispatch_gate 两条路径",
    "m5l31/README.md：pending_deny 模式的流程图",
    "m5l31/hook_framework/crew_adapter.py：step_callback 里重新抛异常"
   ],
   "reuse": [
    "观测和阻断分两条分发通道，别让日志故障拖垮业务。",
    "遇到框架吞异常，找一个不会被吞的回调点把异常补抛出去。",
    "把 pending 状态显式存起来，比依赖异常栈可靠。"
   ],
   "interview": "护栏和日志走两条分发：日志异常吞掉继续，护栏异常必须传播；CrewAI 的工具装饰器会吞异常，我用 pending_deny 在 step_callback 里补抛，保证违规调用真的被拦住。",
   "pitfall": "护栏写在 before_tool_call 里直接 raise，被框架吞掉，工具照样执行，还以为护栏生效了。",
   "source": "第31讲；m5l31/README.md",
   "tags": [
    "可靠性",
    "护栏",
    "异常"
   ]
  },
  {
   "id": "E-04",
   "layer": "E",
   "title": "三个可靠性策略：重试追踪、成本围栏、循环检测",
   "oneliner": "一个记失败率，一个卡预算，一个揪重复状态，三个策略挂在同一套 Hook 上，顺序还有讲究。",
   "mechanism": [
    "RetryTracker 挂在 AFTER_TOOL_CALL，只观测不拦截，统计连续失败次数和成功率。",
    "CostGuard 挂在 AFTER_TURN 和 BEFORE_TOOL_CALL，累计 token 成本，超预算就 deny 后续工具调用。",
    "LoopDetector 挂在 AFTER_TOOL_CALL 和 AFTER_TURN，对状态做哈希去重，连续重复达到阈值就 deny。",
    "顺序敏感：cost_guard 必须排在 loop_detector 前面，因为已经发生的成本要先记账再判断循环。",
    "三个策略都输出指标：工具调用数、重试成功率、成本利用率、循环检出次数。"
   ],
   "code": [
    "m5l31/hooks.yaml：strategies 段的三个类与事件绑定",
    "m5l31/demo.py：低预算模式 COST_GUARD_BUDGET=0.001 触发围栏",
    "m5l31/tests/test_cost_guard.py：围栏逻辑的单元测试"
   ],
   "reuse": [
    "预算按美元或 token 都行，关键是能在运行中 deny 而不是事后报警。",
    "循环检测用状态哈希，别用文本相似度，成本和稳定性都更好。",
    "策略顺序写进配置注释，改顺序的人知道风险。"
   ],
   "interview": "可靠性我落成三个策略：重试追踪做观测，成本围栏在超预算时断开工具调用，循环检测用状态哈希识别原地打转；三个都挂在 Hook 上，顺序按先记账后判断排。",
   "pitfall": "只做事后告警，任务已经烧了五美元才收到通知，围栏的意义就是在中途切断。",
   "source": "第31讲；m5l31/hooks.yaml",
   "tags": [
    "可靠性",
    "成本",
    "循环"
   ]
  },
  {
   "id": "E-05",
   "layer": "E",
   "title": "安全三道关：先消毒、再查权限、最后看预算",
   "oneliner": "工具执行前依次过沙箱守卫、权限网关、成本围栏，第一道拒绝就短路，后面的不再执行。",
   "mechanism": [
    "沙箱守卫做输入消毒，拦路径遍历和危险命令，属于安全层。",
    "权限网关按角色和工具做白名单，默认策略是 ask，拿不准就找人确认。",
    "成本围栏兜底，防止前面都放行后一把烧完预算。",
    "顺序有讲究：安全问题在消毒层就该拦掉，不必再花时间查预算；第一道 deny 之后 dispatch_gate 直接短路。",
    "多策略共享一个审计 Logger，靠 deps 依赖注入，被依赖的策略必须先声明。"
   ],
   "code": [
    "m5l32/hooks.yaml：三关的声明顺序与 deps 注入",
    "m5l32/demo.py：--attack privilege、inject、api-leak 三种攻击演示",
    "m5l32/README.md：三道关卡流程图"
   ],
   "reuse": [
    "安全关排在最前，宁可少一次调用也不要放进去一个路径遍历。",
    "审计日志集中一个文件，出事后能按 session 还原。",
    "默认策略设成 ask，白名单之外一律要人确认。"
   ],
   "interview": "工具调用前我设三道关：输入消毒、权限网关、成本围栏，按安全和成本的代价排序，第一道拒绝就短路；审计日志用依赖注入共享，一次会话的调用能完整还原。",
   "pitfall": "把权限检查放在成本检查后面，一个越权调用先花掉钱才被拦。",
   "source": "第32讲；m5l32/hooks.yaml",
   "tags": [
    "安全",
    "权限",
    "沙箱"
   ]
  },
  {
   "id": "E-06",
   "layer": "E",
   "title": "SecureToolWrapper：密钥在工具层注入，模型全程看不到",
   "oneliner": "密钥不写进 backstory，也不写进工具描述，包装器在执行那一刻从环境变量取出并合并进参数。",
   "mechanism": [
    "传统做法把 API Key 写进 Agent 的 backstory 或工具 description，模型能看到，一次对话泄漏就出去了。",
    "SecureToolWrapper.wrap(tool, credentials={\"api_key\": \"SECURE_API_KEY\"}) 只记环境变量名，不记值。",
    "执行时才从环境读密钥并合并到 kwargs，模型的 tool schema、messages、tool_input 全程不含密钥。",
    "配合沙箱守卫使用：输入消毒保证 tool_input 里没有拼接进来的恶意参数。",
    "课程的 api-leak 攻击演示专门验证这一点：诱导模型输出密钥，输出里没有。"
   ],
   "code": [
    "m5l32/demo.py：SecureToolWrapper.wrap 的用法与 api-leak 攻击路径",
    "m5l32/README.md：凭证注入的设计说明"
   ],
   "reuse": [
    "所有带凭证的工具统一走包装器，代码里不出现密钥字面量。",
    "密钥只存在运行环境，不进仓库、不进提示词、不进日志。",
    "把「模型看到的上下文里没有密钥」当成验收项，写进安全测试。"
   ],
   "interview": "密钥不进模型上下文：工具用包装器注册，执行那一刻才从环境变量注入，模型的 schema 和消息里全程没有密钥；我们专门做了一个诱导泄漏的攻击用例来验证。",
   "pitfall": "图省事把 key 写在 backstory 里，模型在总结对话时可能原样复述出来。",
   "source": "第32讲；m5l32/demo.py",
   "tags": [
    "安全",
    "密钥",
    "凭证"
   ]
  },
  {
   "id": "Q-01",
   "layer": "Q",
   "title": "AI 适用性评估表：先算 ROI 再立项",
   "oneliner": "四问过滤加五维打分，把「感觉很痛」换成可比较的数字。",
   "mechanism": [
    "候选场景用三法扫：工作流审计找重复动作，摩擦点溯源看放弃率与求助日志，规模增长映射判断人力是否线性瓶颈。",
    "四问在五分钟内做第一轮：谁在做、每周几次、做错代价、量翻十倍怎么办；每周少于 10 次直接暂缓。",
    "五维各 1 到 5 分：规模效应、任务清晰度、错误容忍度、信息可结构化、人力替代度，合计 25 分。",
    "18 到 25 分优先推进，11 到 17 分谨慎试点，5 到 10 分暂缓；中分场景的关键在选对入口点。",
    "评分防两个偏差：规模效应按每周次数乘单次耗时算，错误容忍度按生产事故的投诉与合规成本算。",
    "ROI 要算总成本：开发、推理、人工兜底、返工；课程提到只算收益不算成本的 38000 美元账单案例。"
   ],
   "code": [
    "README.md：课程结构中的需求篇定位",
    "m5l32/demo.py：可运行的最小 Agent，可当作评估对象",
    "m2l17/readme.md：XiaoPaw 的完整链路，适合做场景盘点"
   ],
   "reuse": [
    "把评估表当沟通工具，先和业务对齐口径再打分。",
    "分数落在中间区间时，优先换入口点，别急着加功能。",
    "每个场景补一条数据盘点结论：有没有历史数据、能不能用。"
   ],
   "interview": "我先用四问砍场景，再用五维表打分，18 分以上立项；评分时把次数、耗时、事故成本都量化，ROI 里算上推理和人工兜底。",
   "pitfall": "只评估技术可行性，不问业务方每周到底发生几次，做出来没人用。",
   "source": "第34讲",
   "tags": [
    "ROI",
    "评估表",
    "立项"
   ]
  },
  {
   "id": "Q-02",
   "layer": "Q",
   "title": "从需求到可验证的原型",
   "oneliner": "原型交付一张 I/O 表和 50 条 GT，不交付一堆功能。",
   "mechanism": [
    "先回答 Who：具体岗位、触发情境、AI 增强的是重复、判断还是边界，写「所有员工」等于没写。",
    "再回答 What：谁做决策选 Copilot 还是自动执行，步骤是否固定选工作流还是 Agent，高风险场景保留人工确认。",
    "原型产出 I/O 表：三类输入（显式、上下文、知识）和两类输出（内容、形式），形式决定下游集成难度。",
    "How good 写成一句可验收的话：在什么场景，对谁，哪个指标达到多少。",
    "配 50 条 GT 做方向验收；来源优先历史日志，其次 LLM 合成加人工审核，高风险场景用专家构造。",
    "原型只验一个最高风险假设，第一天就上真实用户 UAT，记录用户怎么问、第一反应是什么。"
   ],
   "code": [
    "m5l32/demo.py：可运行骨架，适合做 I/O 验证",
    "m5l32/workspace/demo_agent/skills/load_skills.yaml：能力边界配置",
    "README.md：课程结构与项目索引"
   ],
   "reuse": [
    "I/O 表先定输出形式，再选模型和框架。",
    "把「不做什么」写进原型文档，防止范围膨胀。",
    "PoC 结束记录验证了哪些假设、哪些没验证。"
   ],
   "interview": "原型先定 Who、What、How good，产出 I/O 表和 50 条 GT，只验最高风险假设；形态选错，优化 Prompt 都是白费。",
   "pitfall": "把原型做成功能演示，评审时不断加需求，核心假设一次没验。",
   "source": "第35讲",
   "tags": [
    "原型",
    "I/O",
    "UAT"
   ]
  },
  {
   "id": "Q-03",
   "layer": "Q",
   "title": "评测体系：指标、数据集、人工与自动",
   "oneliner": "评测集是地基，grading_criteria 比参考答案更要紧。",
   "mechanism": [
    "四环节闭环：建集、执行、打分、汇总结论；任何一环缺失，评测结果都不能用来决策。",
    "case 结构固定：input、expected_output 可选、grading_criteria 必填、meta 标功能场景优先级。",
    "数据集四种来源：业务标准答案、专家按功能乘场景构建、合成变体加 10% 人工抽查、生产 Trace 二元打标沉淀回归 case。",
    "打分方式按对象选：任务型判通过失败，生成型用 0 到 3 量表或两两对比，Agent 型查数据库和行动结果。",
    "自动打分优先代码判定；用大模型评判前先对齐人工，课程给出位置偏差 75%、冗长偏差 91.3%、自我增强 25%。",
    "结论按功能、优先级、难度、来源拆开，报 pass^k；bad case 聚类后说清哪类能力不行、占比多少。"
   ],
   "code": [
    "m5l32/tests/test_e2e_demo_flow.py：端到端 case 写法",
    "m5l32/tests/test_e2e_security_llm.py：LLM 参与的场景化评测",
    "pytest.ini：测试分层与标记"
   ],
   "reuse": [
    "先写 10 条 case 跑通再建平台。",
    "eval 集版本化，每次实验 pin 到具体版本。",
    "打分器先有单测，再谈自动化。"
   ],
   "interview": "评测分建集、执行、打分、结论四步，case 必须有 grading_criteria；打分优先代码，模型评判先对齐人工，按失败类给方向。",
   "pitfall": "用同一个模型出题又判卷，分数很稳定，对真实用户没有参考价值。",
   "source": "第36讲",
   "tags": [
    "Eval",
    "数据集",
    "评分"
   ]
  },
  {
   "id": "Q-04",
   "layer": "Q",
   "title": "持续集成：Prompt 与工具变更怎么防回归",
   "oneliner": "六类变更、五阶段流水线、三档放行，把质量护栏自动化。",
   "mechanism": [
    "触发器扩到六类：代码、Prompt、模型版本、知识库、Skill、工具；传统 CI 只看代码 PR。",
    "五阶段按成本排序：静态检查小于 30 秒，回归 eval 异步，行为评测比轨迹，成本性能看 Token 回归，安全扫描并行约 60 秒。",
    "行为评测补盲区：期望轨迹和实际轨迹做 DIFF，工具顺序错、步骤缺失都能拦，输出 eval 发现不了。",
    "决策用固定基准：指标不低于基准自动通过；质量降 2% 到 10%、成本涨 20% 到 100% 转人工；质量降超 10% 或安全失败阻断。",
    "人工审核的系统准备：七维版本对比、偏差量、TOP5 退步 case、趋势图；SLA 24 小时，超时上升。",
    "守底集来源：历史失败场景、功能点乘场景矩阵、P0/P1 分层；事故 24 小时内补 case。"
   ],
   "code": [
    "pytest.ini：回归入口与 marker",
    "m5l32/tests/test_e2e_security.py：安全门禁用例",
    "m5l32/shared_hooks/hooks.yaml：策略变更的版本对象"
   ],
   "reuse": [
    "流水线先跑零 Token 的静态检查，失败越快越好。",
    "P0 集随 PR 同步跑，P1 以下异步跑。",
    "人工审核只接边界情况，结论自动回流守底集。"
   ],
   "interview": "Prompt、模型、知识库、Skill、工具都做成 CI 触发器，五阶段从静态检查到安全扫描，按基准分三档，质量降超 10% 阻断合并。",
   "pitfall": "把 eval 放在发布前一晚跑，改 Prompt 的人根本不知道门槛在哪。",
   "source": "第37讲",
   "tags": [
    "CI",
    "回归",
    "门禁"
   ]
  },
  {
   "id": "Q-05",
   "layer": "Q",
   "title": "线上监控：看哪些指标、怎么告警",
   "oneliner": "六层指标从系统看到业务，告警用消耗率，不用绝对阈值。",
   "mechanism": [
    "六层：系统、成本、Agent 执行、质量、业务，安全合规层始终在线；多数团队停在系统层。",
    "系统层关键阈值：API 报错率低于 1%，TTFT 小于 1 秒，单任务超 30 步触发循环检测；429 单独统计。",
    "成本层按功能归因，Token、成本、缓存命中率乘时间、任务、组织三个维度；超预算直接降级模型。",
    "Agent 层看分工具成功率、技能触发分布、循环深度、循环防护；行为分布突变就是漂移信号。",
    "质量层按统计窗口算采用率、可运行率、重新生成率、挫败信号；确定性代码优先，LLM 评判异步抽样。",
    "告警用 Rate 等于当前速度除正常速度，1 小时消耗 2% 月预算就报；P0 电话、P1 24 小时、P2 工单。"
   ],
   "code": [
    "m5l32/shared_hooks/structured_log.py：指标采集的结构化日志",
    "m5l32/shared_hooks/cost_guard.py：成本阈值与降级",
    "m5l32/shared_hooks/langfuse_trace.py：trace 与 span"
   ],
   "reuse": [
    "先上工具成功率、循环深度、单任务成本三个指标。",
    "阈值改成消耗率，告警噪声能降一个量级。",
    "业务指标看最终产出，不看单个任务通过率。"
   ],
   "interview": "我按六层监控，重点补 Agent 执行层：分工具成功率、行为分布漂移、循环深度；告警用消耗率和错误预算分级，P0 电话、P1 24 小时。",
   "pitfall": "把 429 限流混进可用性 SLO，半夜告警响不停，真正的故障被淹没。",
   "source": "第38讲",
   "tags": [
    "监控",
    "告警",
    "指标"
   ]
  },
  {
   "id": "Q-06",
   "layer": "Q",
   "title": "数据飞轮：线上数据回流到评测与训练",
   "oneliner": "显式信号覆盖不足 5%，隐式行为才是飞轮的主燃料。",
   "mechanism": [
    "飞轮本质是用户喂养 AI：每次接受、改写、放弃都在标注偏好，工程师只负责把信号接住。",
    "显式信号按形态埋：点赞点踩、接受拒绝、审批按钮、解决三档、Allow/Deny；入口零摩擦才有人点。",
    "隐式信号八类：采纳、保留、复制为正向；重试、放弃、中断、情绪、拒绝为负向，覆盖率接近 100%。",
    "五步迭代：开放编码读 20 到 50 个失败案例，轴心编码归类，按频次排序，修复后 Eval 验证，再灰度。",
    "归因看 MAST 分布：41.8% 规格问题、36.9% 协调失败、21.3% 验证缺口，七成失败集中在前两类。",
    "修复先改 Harness：提示词、工具、流程、校验，再考虑微调；模型是原料，Harness 才是产品。"
   ],
   "code": [
    "m5l32/shared_hooks/langfuse_trace.py：线上信号与轨迹",
    "m5l32/workspace/demo_agent/hooks/task_audit.py：任务结果落盘",
    "m5l32/tests/test_e2e_demo_flow.py：沉淀为回归断言"
   ],
   "reuse": [
    "先接隐式信号，点赞数据量根本不够。",
    "每周固定读案例，只记第一个失败点。",
    "修完一轮再开放编码，看新失败模式浮出没有。"
   ],
   "interview": "飞轮的燃料是用户行为：我把改写、重试、放弃、中断这些隐式信号接进 trace，按开放编码和轴心编码归因，修复后进 Eval，再灰度验证。",
   "pitfall": "把数据仓库当飞轮，只存不分析，没有负责人和触发机制。",
   "source": "第39讲",
   "tags": [
    "飞轮",
    "信号",
    "归因"
   ]
  },
  {
   "id": "Q-07",
   "layer": "Q",
   "title": "组织进化：从试点到 AI 原生组织",
   "oneliner": "转型看工作流有没有重构，采用率和代码占比都是假指标。",
   "mechanism": [
    "表演式转型的特征：全员订阅、采用率 90%，交付变慢、bug 变多，没人对输出质量负责。",
    "三种形态：嵌入型使用率不足 5%，平台型 30% 且目标错位，AI 原生型重写流程和交付物。",
    "自上而下审工作流：输入输出、决策点、可替代度、必须保留的人类判断，挑独立、可见、可量化的试点。",
    "试点要有实权架构师和基线：交付周期、Bug 逃逸率、Review 耗时、开发者满意度，先量再改。",
    "自下而上给土壤：工具算力、季度 AI Champion、Hackathon、内部曝光；不要用 AI 代码比例做 KPI。",
    "个人成熟度 L1 到 L4：工具使用、工作流嵌入、工作流重构、团队赋能；L3 的标志是 Eval 通过才算完成。"
   ],
   "code": [
    "m4l25/README.md：团队角色与行为规范",
    "m4l28/README.md：Agent 团队自我进化",
    "README.md：课程结构中的组织篇"
   ],
   "reuse": [
    "用部署频率、变更失败率、恢复时间、交付周期考核转型。",
    "每个应用写一条可量化的业务成功标准。",
    "每月留一个场景不用 AI，防止判断力退化。"
   ],
   "interview": "我判断转型先看工作流：角色、决策点、交付物、迭代方式变没变；再用交付周期、Bug 逃逸率、变更失败率验证，AI 采用率不进考核。",
   "pitfall": "把试点成功当组织能力，组件不复用、方法不沉淀，一年后还是孤岛。",
   "source": "第40讲",
   "tags": [
    "组织",
    "转型",
    "试点"
   ]
  },
  {
   "id": "V-01",
   "layer": "V",
   "title": "第01讲 拨开迷雾：AI 应用开发的四种架构范式",
   "oneliner": "用一份竞品分析报告串起 Prompt、Workflow、Single Agent、Multi-Agent 四档范式，讲清自主性是怎么一步步交出去的。",
   "mechanism": [
    "[01:00] 开场先类比传统软件的设计模式：DDD、MVC、单例、工厂、责任链，都是特定场景下的最佳实践。AI 时代缺的是同类的东西。",
    "[03:20] AI 时代的巴别塔：RAG、Agent、Prompt、ReAct、CoT、AutoGPT、LangChain 概念满天飞，缺一张统一的地图。",
    "[04:50] 四种范式排在同一条「自主性 × 复杂度」轴上，同一个任务（生成竞品分析报告）在四档下的做法完全不同。",
    "[06:30] 范式一 Prompt Engineering：静态文本、思维链、任务预期一次塞进去。问题是容易超出上下文限制、对模型要求极高、效果不稳定。",
    "[10:30] 范式二 Workflow：爬虫、清洗、分析、总结、审核、写文件六个节点，路径硬编码，Code-Driven，下一步由程序员决定。",
    "[12:30] 范式三 Single Agent：带规划、记忆、工具三块器官，自己拆任务、调工具、判断信息够不够，Model-Driven。",
    "[14:50] 范式四 Multi-Agent：研究员、分析师、审核员各持工具，上下文隔离，审核不合格可以回退，把每一步做到极致。"
   ],
   "code": [
    "m1l2/m1l2_raw_agent.py：范式三的最小实现，手写 ReAct 循环",
    "m1l3/m1l3_multi_agent.py：范式四的四角色版本",
    "[17:00] 讲师把范式三重放了一遍，强调 Agent 的核心是循环而不是单次调用"
   ],
   "reuse": [
    "给团队建立共同语言：四档范式配四个词，讨论方案时先对齐档位。",
    "方案评审时问一句「决定下一步的是人、代码还是模型」，档位就清楚了。",
    "从最右档往回砍，通常能砍掉一半成本和不确定性。"
   ],
   "interview": "四种范式本质是决定权的转移：人写死、代码写死、模型自己决定、组织分工决定；越往右越贵，选最低够用的一档。",
   "pitfall": "把四档当成「先进程度」排序，越新越好，结果用多智能体做一件 Workflow 就能解决的事。",
   "source": "第01讲 00:00-17:40",
   "tags": [
    "范式",
    "总览",
    "选型"
   ]
  },
  {
   "id": "V-02",
   "layer": "V",
   "title": "第02讲 解构智能体：Agent 的解剖学与 ReAct 范式",
   "oneliner": "把 Agent 拆成 LLM、工具、记忆三块，再用 ReAct 的 Thought-Action-Observation 循环把它们串起来，最后手写一遍。",
   "mechanism": [
    "Agent 的三块组成：大脑是 LLM，手脚是工具，记忆分短期上下文和长期存储。",
    "ReAct 把循环写成文本协议：模型先想（Thought），再选动作（Action），程序执行后把观察（Observation）拼回对话。",
    "手写实现的关键是两个细节：调用时带 stop 序列截断在 Action，执行完把 Observation 拼回 messages。",
    "对话历史管理决定 Agent 能不能「记住」前几步做了什么，历史格式错了循环就跑不下去。",
    "演示用原生 Python 实现，不依赖 CrewAI，目的是让后面的框架行为可解释。"
   ],
   "code": [
    "m1l2/m1l2_raw_agent.py：RawAgent.run() 主循环与 stop=[\"Observation:\"]",
    "m1l2/m1l2_raw_agent.py：parse_tool_name、parse_tool_input、extract_final_answer",
    "m1l2/agent_system_prompt.txt：工具清单与输出格式模板"
   ],
   "reuse": [
    "面试被问 Agent 原理，直接讲这个循环，比背框架概念有效。",
    "框架出怪问题时，回到这个循环判断是模型输出格式问题还是历史拼接问题。",
    "自研轻量 Agent 就从这一百多行开始。"
   ],
   "interview": "Agent 是一个带退出条件的循环：模型输出 Action，程序执行工具，把 Observation 拼回历史再调模型，直到出现 Final Answer。",
   "pitfall": "只调一次模型就以为在做 Agent，没有工具回填和循环，复杂任务一定失败。",
   "source": "第02讲",
   "tags": [
    "ReAct",
    "原理",
    "手写"
   ]
  },
  {
   "id": "V-03",
   "layer": "V",
   "title": "第03讲 Multi-Agent 系统：Agent、Task、Process 的协作美学",
   "oneliner": "先讲单 Agent 的上下文垃圾场，再给出解药：把岗位、工单、流程三件事分开定义。",
   "mechanism": [
    "[00:40] 单 Agent 崩溃图：调研、抓取、分析、编码、审查全挤在一个上下文里，结果是长度爆炸、内容污染、多指令挑战。",
    "[05:20] 三要素对应公司结构：Agent 是岗位，Task 是工单，Process 是流程（瀑布或敏捷）。",
    "[09:40] 现场读代码：四个 Agent 的 role/goal/backstory 与工具绑定，researcher、searcher 关闭委托，writer 开启。",
    "[09:50] 演示运行结果：多个 Agent 的分步产出落到独立 markdown 文件，最终合并成报告。",
    "审核编辑拿到报告给意见，撰写员按意见改，形成一次最小的质检回退。"
   ],
   "code": [
    "m1l3/m1l3_multi_agent.py：四个 Agent 与 Task 的定义",
    "m1l3/极客时间平台全面深度调研报告-步骤1..7.md：分步产出",
    "m2l5/m2l5_crew.py：Sequential Process 的多任务版"
   ],
   "reuse": [
    "画岗位表：岗位、工具、交付物、能否委托四列。",
    "把中间产出落成文件，用文件名当接口。",
    "先跑四角色最小闭环，再谈编排。"
   ],
   "interview": "多智能体就是把公司结构搬进代码：Agent 是岗位、Task 是工单、Process 是流程，三者对上之后，上下文隔离和质检回退就自然有了。",
   "pitfall": "只拆角色不定交付物，四个 Agent 各写一份格式不同的报告，最后没人能合并。",
   "source": "第03讲",
   "tags": [
    "多智能体",
    "三要素",
    "示例"
   ]
  },
  {
   "id": "V-04",
   "layer": "V",
   "title": "第04讲 架构师的决断：C.U.P. 选型工具",
   "oneliner": "给需求打三个分：复杂度、不确定性、性能约束，分数决定用哪档范式，别猜，去度量。",
   "mechanism": [
    "[00:40] 架构师的困境是选择困难：用美工刀建大楼还是用施工队修窗户，四种工具对应四种范式。",
    "[02:00] C.U.P. 三维模型：Complexity 复杂度、Uncertainty 不确定性、Performance 性能约束，不确定性是核心维度。",
    "[02:40] 复杂度拆三层：交互复杂性（单轮文字到多轮文件）、过程复杂性（单步到多步）、依赖复杂性（只靠模型到依赖工具与数据）。",
    "[03:20] 不确定性拆三种：输入不确定（边界清晰或模糊）、过程不确定（路径固定或未知）、目标不确定（标准明确或模糊）。",
    "性能约束作为硬指标单独看：延迟、成本、可审计性，这一维经常直接否决最右档方案。"
   ],
   "code": [
    "第34讲：C.U.P. 扩展成 AI 适用性评估表，用于筛场景",
    "m4l23/workspace/requirements.md：结构化需求文档的写法"
   ],
   "reuse": [
    "立项评审用三维打分表，替代「这个场景很 AI」的直觉判断。",
    "打分结果写进方案，复盘时能对照。",
    "性能约束一票否决，先排除做不到的档位。"
   ],
   "interview": "我用 C.U.P. 选型：复杂度、不确定性、性能约束三维打分，不确定性看输入、过程、目标三段，性能一票否决。",
   "pitfall": "只讨论技术和效果，不问延迟和成本，方案上线时被性能约束推翻。",
   "source": "第04讲 00:40-03:20",
   "tags": [
    "选型",
    "CUP",
    "评估"
   ]
  },
  {
   "id": "V-05",
   "layer": "V",
   "title": "第05讲 工程全景图：Agent 为什么在生产环境趴窝",
   "oneliner": "Demo 在 localhost 能跑，生产在混乱里跑不了，差的是幻觉、死循环、Token 爆炸、API 失败、难以调试这几道坎。",
   "mechanism": [
    "[00:21] 左右对照图：左边 The Toy（Demo，Works on Localhost），右边 The Reality（Production，Works in Chaos），中间是工程鸿沟。",
    "生产六种死法：幻觉、死循环、Token 爆炸、API 失败、难以调试，还有玩具案例掩盖的真实复杂度。",
    "[00:31] 核心法：架构即模式，细节即成败。宏观有中心化调度、路由、评估-优化循环；微观有工具错误处理、迭代次数、提示词结构。",
    "[00:51] 教学方法论是五步深挖：概念是什么、价值为什么需要、用法在 CrewAI 里怎么写、原理为什么这样设计。",
    "整门课按这条线推进：每个能力都回答这四个问题，再进下一个。"
   ],
   "code": [
    "README.md：课程七块能力与 28 个示例目录的映射",
    "m5l30 到 m5l32：生产层三讲的递进结构"
   ],
   "reuse": [
    "把「生产六种死法」当成上线前的检查清单。",
    "评审方案时对照宏观模式和微观细节两张表，看缺哪块。",
    "自己学新框架也用四问：是什么、为什么、怎么写、为什么这样设计。"
   ],
   "interview": "Demo 到生产之间隔着幻觉、死循环、Token 爆炸、API 失败和不可调试，工程化的每一块都在填这道鸿沟。",
   "pitfall": "拿 Demo 的效果当生产指标，上线后第一个月就被成本和稳定性打回来。",
   "source": "第05讲",
   "tags": [
    "工程化",
    "全景",
    "失败模式"
   ]
  },
  {
   "id": "V-06",
   "layer": "V",
   "title": "第06讲 工欲善其器：代码环境准备",
   "oneliner": "阿里云百炼拿 Key，CrewAI 用 OpenAI 风格接自定义模型，环境一次配好后面三十讲不再折腾。",
   "mechanism": [
    "环境清单：阿里云模型 API 申请、CrewAI 里用 OpenAI 风格调模型、自定义模型 API 的接法、LLM 参数的最佳实践。",
    "Python 要求 3.10+，CrewAI 迭代很快，尽量用最新版本。",
    "阿里云百炼控制台创建 Key，注意免费额度用完后自动转按量付费。",
    "自定义模型通过继承 BaseLLM 实现，课程仓库里就是 llm/aliyun_llm.py。",
    "LLM 参数有最佳实践和反模式，温度、超时、重试的默认值在长任务里影响很大。"
   ],
   "code": [
    "llm/aliyun_llm.py：AliyunLLM 继承 BaseLLM 的完整实现，支持 region 切换",
    "llm/test_aliyun_llm.py：45K 的测试，覆盖消息格式与工具调用",
    "README.md：环境变量 QWEN_API_KEY、BAIDU_API_KEY 配置"
   ],
   "reuse": [
    "接国产模型时照 AliyunLLM 的结构写，接口对齐 OpenAI 风格。",
    "Key 一律走环境变量，代码里不出现字面量。",
    "先跑通一个最小调用，再往上叠 Agent。"
   ],
   "interview": "模型接入我做成自定义 LLM 适配器，继承 BaseLLM，对外保持 OpenAI 风格，换供应商只改一个文件。",
   "pitfall": "把 Key 写进代码或配置文件提交到仓库，后面清理起来很麻烦。",
   "source": "第06讲",
   "tags": [
    "环境",
    "LLM",
    "配置"
   ]
  },
  {
   "id": "V-07",
   "layer": "V",
   "title": "第07讲 定义 Agent：从提示词工程到人设工程",
   "oneliner": "CrewAI 的 RGB 模式：Role 是职位名，Goal 是岗位目标，Backstory 是履历，三样凑齐一个岗位。",
   "mechanism": [
    "[00:20] 用招聘 JD 类比：职位名称对应 Role，岗位目标（KPI）对应 Goal，任职要求对应 Backstory。",
    "Role 写得越像真实职位，模型越少跑偏；「资深 Python 架构师」比「助手」有效。",
    "Goal 写考核口径，例如「负责后端核心模块重构」，带可判断的完成标准。",
    "Backstory 写履历、偏好、边界，是唯一能放行为细节的地方。",
    "演示用 Agent.kickoff() 直接执行任务，跳过 Task 和 Crew，先看清一个 Agent 的行为。"
   ],
   "code": [
    "m1l2/m1l2_agent.py：单 Agent 调研示例",
    "m2l3/m2l3_agent.py：Agent.kickoff() 的最小用法与 IntermediateTool"
   ],
   "reuse": [
    "写 Agent 前先写一张 JD，职位、KPI、任职要求三行。",
    "改行为先改 Backstory，别在 Task 里打补丁。",
    "一个 Agent 只对应一个岗位，别兼职。"
   ],
   "interview": "我把写提示词换成写 JD：Role 是职位名，Goal 是 KPI，Backstory 是任职要求和行事风格，三件套写完 Agent 的行为就稳定了。",
   "pitfall": "Backstory 写成一串形容词，模型读完不知道具体该怎么做事。",
   "source": "第07讲",
   "tags": [
    "人设",
    "RGB",
    "Agent"
   ]
  },
  {
   "id": "V-08",
   "layer": "V",
   "title": "第08讲 定义 Task：从步骤控制到契约驱动",
   "oneliner": "Task 不只是描述做什么，还要用 Pydantic 定义交付物长什么样，下游拿到的是对象而不是一段文字。",
   "mechanism": [
    "契约驱动三件套：description 写做什么，expected_output 写验收标准，output_pydantic 绑数据结构。",
    "Pydantic 模型给每个字段类型和描述，字段描述会进提示词，等于把 schema 当规格说明。",
    "任务依赖用 context 参数声明，框架按依赖调度，不靠代码调用顺序。",
    "演示里先用 Mock 上游输出，单独验证本任务的契约是否成立。",
    "契约让失败提前：字段缺失或类型不对，当步就报错，不用等到下游解析。"
   ],
   "code": [
    "m2l4/m2l4_task.py：ImageAnalysis、VisualAnalysisReport、ContentStrategyBrief 三个契约",
    "m2l4/m2l4_task.py：output_pydantic 绑定与 context 依赖",
    "m2l5/m2l5_crew.py：多任务契约的链式传递"
   ],
   "reuse": [
    "先定 Pydantic 模型再写 Task，模型就是接口文档。",
    "下游要用字段就依赖结构化输出，别解析自由文本。",
    "每个字段写 description，歧义会少一大半。"
   ],
   "interview": "任务定义我走契约驱动：Pydantic 定字段，output_pydantic 绑定，交付物是可解析对象，字段错了当步暴露。",
   "pitfall": "只写自然语言的 expected_output，下游拿到格式不稳定的 markdown，再写正则抠字段。",
   "source": "第08讲",
   "tags": [
    "Task",
    "契约",
    "Pydantic"
   ]
  },
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
    "课程的示例链路是图片输入分析、内容策略分析、笔记文案撰写、SEO 优化，四步逐级传。"
   ],
   "code": [
    "m2l5/m2l5_crew.py：Process.sequential 与 Task 的 context 依赖",
    "m1l3/m1l3_multi_agent.py：分层调度的 manager 与打回逻辑"
   ],
   "reuse": [
    "先问任务能否事前写死，能写死就用 Sequential。",
    "显式传 context，避免下游被无关的上游输出污染。",
    "需要打回和重分配时再上 Hierarchical，成本翻倍。"
   ],
   "interview": "Process 就是任务调度方式：Sequential 是预先分配的线性流程，确定性强；Hierarchical 是动态分配加监督反馈，能打回重做，代价是多一层管理调用。",
   "pitfall": "不设 context 靠隐式传递，下游拿到一堆无关输出，还得自己分辨哪段有用。",
   "source": "第09讲",
   "tags": [
    "Process",
    "调度",
    "信息传递"
   ]
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
    "多模态的价值是把「一言胜千图」反过来：一张图省掉几百字的描述，还更准确。"
   ],
   "code": [
    "m2l6/m2l6_agent.py：image_model 与 AddImageToolLocal 配置",
    "tools/add_image_tool_local.py：本地图片读取与 Base64 编码",
    "llm/test_multimodal_message.py：多模态消息格式的测试"
   ],
   "reuse": [
    "凡是「描述外观、判断质量、提取图中信息」的任务，先上图再谈提示词。",
    "图片分析结果落成结构化字段，下游文案环节直接用。",
    "批量图片先压缩再送，控制成本。"
   ],
   "interview": "多模态解决的是现实锚定：纯文本描述靠想象，给图之后模型有据可依；我把图片分析做成独立 Agent，产出结构化字段给下游。",
   "pitfall": "只配了视觉模型没在任务里强制看图，模型照样凭文字编，还编得挺像。",
   "source": "第10讲",
   "tags": [
    "多模态",
    "Qwen-VL",
    "小红书"
   ]
  },
  {
   "id": "V-11",
   "layer": "V",
   "title": "第11讲 项目实战一：小红书爆款笔记生成",
   "oneliner": "五个角色接力把一张商品图变成一篇小红书笔记，策略、文案、SEO、视觉、图片编辑各管一段。",
   "mechanism": [
    "角色设计：策略专家定选题与人群，文案编辑写正文，SEO 专家管关键词与标签，视觉分析专家读商品图，图片编辑专家处理配图。",
    "流程是 Agent-Task-Process 三要素的第一次完整落地：每个角色绑一个 Task，Process 串联，最后由整合环节输出终稿。",
    "视觉环节先用多模态模型读图，把图片信息变成结构化字段，文案环节再据此写，避免凭空编卖点。",
    "工程侧不止 Agent：项目里带 app 目录和一整套 API 集成测试，笔记生成走本地服务接口，key 通过 X-API-Key 传。",
    "这一讲把前面十讲的能力串起来，也是后面所有实战项目的模板。"
   ],
   "code": [
    "m2l17 之外的示例目录：项目一对应的角色与任务定义",
    "README.md：项目实战一的运行说明",
    "m2l6/m2l6_agent.py：视觉分析环节的复现基础"
   ],
   "reuse": [
    "内容生成类项目照这个分工搭：策略、撰写、SEO、视觉各一个角色。",
    "先跑通单条内容，再做批量与接口化。",
    "把生成链路做成接口，前端和运营才好用。"
   ],
   "interview": "内容生成项目我拆五个角色：策略定方向、文案写正文、SEO 管关键词、视觉读图、图片编辑管配图，多模态环节保证卖点有依据。",
   "pitfall": "让一个 Agent 从读图到写文案全包，卖点靠编，配图与正文对不上。",
   "source": "第11讲",
   "tags": [
    "项目实战",
    "内容生成",
    "多角色"
   ]
  },
  {
   "id": "V-12",
   "layer": "V",
   "title": "第12讲 工具设计哲学：从 API 到 Agent-Native",
   "oneliner": "模型用工具有两条路：Native Function Calling 是直觉反射，ReAct 是思维链推理，成本和准确性的取舍不一样。",
   "mechanism": [
    "Native Function Calling：模型直接输出 JSON 形式的工具调用，程序执行后把结果塞回，速度快、token 少，黑盒。",
    "ReAct Engineering：模型先写 Thought 再选 Action，多一轮推理，token 更多，但复杂场景准确率更高，过程可解释。",
    "对比四维：性能与成本、准确性、可解释性、适合场景。单一明确场景用 Function Calling，不确定性高的场景用 ReAct。",
    "范式跃迁的落点是语义：API 面向程序员，工具面向模型，名字、参数、返回都要按模型的认知习惯重写。",
    "这一讲为后面五步 SOP 打底，先讲清「为什么工具要重写」。"
   ],
   "code": [
    "m1l2/m1l2_raw_agent.py：ReAct 风格的文本协议实现",
    "tools/baidu_search.py：Function Calling 风格的工具定义"
   ],
   "reuse": [
    "工具数量少、场景明确，用原生 Function Calling，省 token 也快。",
    "需要模型自己判断该不该用工具时，给它 Thought 的空间。",
    "两种方式可以混用，关键在工具描述写得清楚。"
   ],
   "interview": "工具调用有两条路：Function Calling 快而省，适合明确场景；ReAct 多一轮思考，复杂场景更准也更可解释，我按任务不确定性选。",
   "pitfall": "所有场景都上 ReAct，token 翻倍，简单任务也没变准。",
   "source": "第12讲",
   "tags": [
    "工具",
    "Function Calling",
    "ReAct"
   ]
  },
  {
   "id": "V-13",
   "layer": "V",
   "title": "第13讲 自定义工具封装：五步标准 SOP",
   "oneliner": "工具定义、参数定义、语义重构、I/O 瘦身、错误转译，五步把一个 REST 接口改造成模型能用的工具。",
   "mechanism": [
    "Step 1 工具定义看语义完整性：碎片化的文字、图片、视频搜索聚合成一个 search；一个接口干多件事时按意图拆开。",
    "Step 2 参数定义用 Pydantic，字段描述写给模型看，示例里就是 query、top_k、time_range、sites 四类。",
    "Step 3 语义重构把接口语言翻成模型语言，工具名用动词加对象，描述写清何时用。",
    "Step 4 I/O 瘦身做降噪增信：原始返回里 request_id、icon、image、search_source 全是噪音，只留标题、链接、摘要。",
    "Step 5 错误转译把错误码翻成建议，模型据此决定换关键词还是停下。"
   ],
   "code": [
    "tools/baidu_search.py：五步在一个工具里的完整落地",
    "tools/test_baidu_search.py：参数校验与错误分支的测试"
   ],
   "reuse": [
    "把五步写进团队的工具开发规范，评审时逐条对照。",
    "I/O 瘦身前后各量一次返回大小，效果直接可见。",
    "错误转译和日志分开，前者给模型看，后者给人看。"
   ],
   "interview": "工具封装五步：定义、参数、语义重构、I/O 瘦身、错误转译；最值钱的是后两步，返回瘦下来上下文才撑得住长任务。",
   "pitfall": "跳过语义重构，工具名还是 API 原名的拼音缩写，模型根本不知道它干什么。",
   "source": "第13讲",
   "tags": [
    "工具",
    "SOP",
    "实战"
   ]
  },
  {
   "id": "V-14",
   "layer": "V",
   "title": "第14讲 MCP 协议：标准化定义工具接口",
   "oneliner": "MCP 是 AI 应用和工具之间的 USB 协议，工具开发一次，各处都能插。",
   "mechanism": [
    "架构三件套：MCP Client 在 AI 应用侧，MCP Server 在工具侧，中间走 JSON-RPC，能力用 JSON-Schema 描述。",
    "USB 类比讲得最清楚：Host 是电脑（Agent），Device 是外设（工具），Protocol 统一了插头。",
    "核心价值是生态复用与架构解耦：没有 MCP 时每个框架硬编码集成，有了 MCP 后工具与框架解耦。",
    "生态已经有资源站：官方 registry.modelcontextprotocol.io、Smithery、mcp.so、Glama，覆盖数据库、大厂 API、开发者工具。",
    "客户端侧 Cursor、Windsurf 等都已支持，同一批工具能在不同宿主里用。"
   ],
   "code": [
    "m2l9/m2l9_mcp.py：MCPServerHTTP 与工具过滤器",
    "sandbox-docker-compose.yaml：沙箱作为 MCP 服务的接入方式"
   ],
   "reuse": [
    "内部工具统一包成 MCP 服务，别给每个框架写一份适配。",
    "选生态工具先看维护活跃度，再看 schema 是否规范。",
    "多租户靠 header 传身份，别在 URL 里带用户信息。"
   ],
   "interview": "MCP 是工具层的 USB 协议：JSON-RPC 传输、JSON-Schema 描述能力，工具写一次各处可插，解决了框架与工具的硬编码耦合。",
   "pitfall": "把 MCP 当成另一个框架来学，其实它只规定接口，不规定 Agent 怎么想。",
   "source": "第14讲",
   "tags": [
    "MCP",
    "协议",
    "生态"
   ]
  },
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
    "[代码实战] 阿里股票早报：取行情、算量化指标、抓舆情、出报告，四步都在沙箱里完成。"
   ],
   "code": [
    "m2l10/m2l10_sandbox.py：沙箱 Agent 与 MCP 工具加载",
    "sandbox-docker-compose.yaml：容器隔离与目录挂载",
    "m2l10/m2l10_mcp_tools.md：沙箱暴露的工具清单"
   ],
   "reuse": [
    "需要产出文件或精确计算的任务，一律给沙箱执行环境。",
    "挂载按最小权限，输入只读、输出单独目录。",
    "把「容器隔离」写进安全基线，禁止宿主机直跑模型生成的代码。"
   ],
   "interview": "沙箱给 Agent 三种超能力：文件、浏览器、代码执行；价值是从聊天变成交付，风险是裸跑能删库，所以一律容器隔离、用完即毁。",
   "pitfall": "在宿主机直接执行模型生成的脚本，一次 rm -rf 就够出事故。",
   "source": "第15讲",
   "tags": [
    "沙箱",
    "代码解释器",
    "安全"
   ]
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
    "技能可以放全局目录，也可以放 workspace 目录，实现角色专属能力。"
   ],
   "code": [
    "tools/skill_loader_tool.py：frontmatter 解析、_build_description、_run 的三段结构",
    "skills/load_skills.yaml：技能清单",
    "skills/pdf/SKILL.md、skills/docx/SKILL.md：两类技能示例"
   ],
   "reuse": [
    "技能超过十个就上渐进式披露，上下文成本可控。",
    "把操作规范写进 SKILL.md，执行细节交给沙箱工具。",
    "技能目录分层，团队级和角色级分开维护。"
   ],
   "interview": "Skills 用渐进式披露：菜单常驻、正文按需加载，需要执行的技能起一个子 Crew 在沙箱里跑，技能再多上下文也不会爆。",
   "pitfall": "把所有技能说明拼进系统提示词，token 花了一大半，模型反而选不准。",
   "source": "第16讲",
   "tags": [
    "Skills",
    "渐进披露",
    "Sub-Crew"
   ]
  },
  {
   "id": "V-17",
   "layer": "V",
   "title": "第17讲 项目实战二：XiaoPaw 飞书本地工作助手",
   "oneliner": "把 Agent 接进飞书：读 Excel 饮食记录、做统计分析、写成飞书文档，一条消息跑完。",
   "mechanism": [
    "先看效果：用户在飞书里丢一份一周饮食 Excel，说「按每天摄入统计，给分析报告，写到飞书文档」。",
    "Agent 判断文件类型和表结构，回复确认分析口径，再调沙箱读表、算每日热量与营养素、给趋势结论。",
    "产出通过飞书开放平台接口写成文档，回一个可点击的链接。",
    "这一讲的关键是工程接入：飞书 App ID 与 Secret 配置、事件回调、消息回复，都是 Agent 之外的活。",
    "能力边界也在这一讲划清：沙箱负责读表与计算，飞书接口负责交付，Agent 只做编排。"
   ],
   "code": [
    "m2l17/readme.md：XiaoPaw 项目结构与配置说明",
    "m3l20/m3l20_file_memory.py：工作区与记忆的接法",
    "sandbox-docker-compose.yaml：沙箱目录挂载"
   ],
   "reuse": [
    "接入 IM 时把「收消息、跑任务、发结果」三段分开，接口失败不影响任务本身。",
    "文件类任务先确认表结构再算，别让模型猜列名。",
    "产出回链接而不是贴全文，体验好也省消息长度。"
   ],
   "interview": "XiaoPaw 把 Agent 接进飞书：收到文件后判断类型、确认口径、在沙箱里读表计算、最后写成飞书文档回链接，Agent 只负责编排，接口和计算各自独立。",
   "pitfall": "把飞书接口调用也塞给 Agent 决策，一次网络失败整个任务重来。",
   "source": "第17讲",
   "tags": [
    "项目实战",
    "飞书",
    "XiaoPaw"
   ]
  },
  {
   "id": "V-18",
   "layer": "V",
   "title": "第18讲 从 Prompt 到 Harness：记忆与上下文的设计范式",
   "oneliner": "三个失忆症状指向同一个病因：没有记忆系统。模型是 CPU，只负责算，记住什么得由工程侧决定。",
   "mechanism": [
    "症状一：不记得你是谁。每次对话都要重新自我介绍，偏好每次重说一遍。",
    "症状二：说过的话要反复提。两小时后回来问「上次那航班几点到」，Agent 反问你说哪个航班。",
    "症状三：SOP 要反复教。同一个周报格式，隔天又要讲一遍先写总结再列计划。",
    "共同病因是没有记忆系统。能力再强，记不住事，每次都要重新认识你。",
    "记忆的本质是构建 message list：模型只负责计算不存储，所以「记得什么」等于「你每次喂给它什么」。",
    "Harness 的职责就在这：Bootstrap 决定开场喂什么，生命周期决定中途留什么、丢什么，分层决定长期存哪。"
   ],
   "code": [
    "m3l19/m3l19_context_mgmt.py：Harness 中上下文装配的实现",
    "m3l19/workspace/：soul、user、agent、memory 四份文件",
    "shared/digital_worker.py：把 Harness 与角色配置组装起来"
   ],
   "reuse": [
    "先列出用户希望你记住的三件事，再设计记忆，别一上来堆向量库。",
    "把「大模型不存储」当成基本前提，任何记忆都要显式装配。",
    "三个症状可以当验收清单：跨会话、隔天、换话题各测一次。"
   ],
   "interview": "模型是 CPU，只算不存，所以记忆的本质是每次装配一份 message list；Harness 决定开场喂什么、中途丢什么、长期存哪里，这就是从提示词工程到上下文工程的转变。",
   "pitfall": "以为模型会自己记住上一轮，或者以为换个更大的上下文窗口就等于有记忆。",
   "source": "第18讲",
   "tags": [
    "Harness",
    "记忆",
    "上下文"
   ]
  },
  {
   "id": "V-19",
   "layer": "V",
   "title": "第19讲 上下文的生命周期：Bootstrap、剪枝与压缩",
   "oneliner": "Agent 的上下文是长出来的，不是写出来的；六个干预点决定它长成什么样。",
   "mechanism": [
    "开篇对照：Workflow 的上下文是工程师写死的，输出完全可控；Agent 的上下文在 ReAct 循环里一轮轮长出来，必须有人在关键点修剪。",
    "六个干预点：Bootstrap 拼骨架、Pre-Model 进模型前、Post-Model 出模型后、before-Tool 调工具前、after-Tool 拿到结果后、after-turn 一轮结束。",
    "Bootstrap：读 soul、user、agent、memory 四份文件，memory 索引控制在 200 行以内。",
    "剪枝：倒数第 N 个 user 消息之前的工具返回替换为 [已剪枝]，保留 tool_call_id 保证消息结构合法。",
    "压缩：用量与模型上限之比超过 0.45 时，按 token 分块摘要成 context_summary，最近十轮保留原文。",
    "落盘：每轮写 ctx.json 覆盖状态，raw.jsonl 追加原始流水带时间戳。"
   ],
   "code": [
    "m3l19/m3l19_context_mgmt.py：build_bootstrap_prompt、prune_tool_results、maybe_compress",
    "m3l19/test_context_mgmt.py：剪枝与压缩的单元测试",
    "m3l19/workspace/：四份上下文文件样例"
   ],
   "reuse": [
    "把六个干预点画成一张图，团队讨论上下文问题时对着图说。",
    "剪枝解决工具返回占地方，压缩解决历史太长，两个都要有。",
    "阈值用比例不用绝对值，换模型不用改配置。"
   ],
   "interview": "Agent 的上下文是在循环里长出来的，所以我在六个点干预：开场拼 Bootstrap，调模型前后看用量，工具前后剪结果，轮次结束落盘；剪枝和压缩是两级兜底。",
   "pitfall": "只做压缩不做剪枝，压缩掉有用的对话，留下几万字的工具原始返回。",
   "source": "第19讲",
   "tags": [
    "上下文",
    "生命周期",
    "剪枝"
   ]
  },
  {
   "id": "V-20",
   "layer": "V",
   "title": "第20讲 文件系统记忆：让 Agent 自己写记忆、自己学技能",
   "oneliner": "主 Agent 手上只有技能加载器，写记忆和造技能都由子 Crew 在沙箱里完成，权限和格式收进 SKILL.md。",
   "mechanism": [
    "对照上一讲：原来给 Agent 配 FileWriter、FileRead 直接读写，这一讲全部去掉，只留 SkillLoaderTool。",
    "写记忆走 memory-save 技能：子 Crew 按四步规范写 user.md、memory.md，字段和格式由技能定义。",
    "四步规范：①准入控制看 Utility、Confidence、Novelty、Type 四个问题，②分类路由按类型写进 user.md、agent.md 或 memory_*.md，③写入前检查行数，④有旧条目就 str_replace 更新而不是追加。",
    "memory.md 上限 200 行，按需加载的 memory_*.md 控制在 150 行内；150 到 179 行写入但警告，180 行起停止写入先治理。",
    "每条记忆带双时间戳 [created, updated]，记忆的目标是越存越准，而非越存越多。",
    "造技能走 skill-creator 技能：子 Crew 在沙箱里写 SKILL.md 到技能目录，Agent 下次启动就能看到新技能。",
    "治理走 memory-governance 技能：读两个目录、查冲突、清过期。",
    "目录挂载分权限：workspace 读写，skills 单独挂，主 Agent 不直接碰文件。"
   ],
   "code": [
    "m3l20/m3l20_file_memory.py：assistant_agent 的工具表只剩 SkillLoaderTool",
    "skills/memory-save/SKILL.md、skills/skill-creator/SKILL.md、skills/memory-governance/SKILL.md",
    "m3l20/sandbox-docker-compose.yaml：workspace 与 skills 的挂载"
   ],
   "reuse": [
    "有格式要求的写盘一律包成技能。",
    "让 Agent 造技能时限制可写目录，别给整个仓库。",
    "技能文件本身就是文档，改技能不用改代码。"
   ],
   "interview": "记忆写入我不给主 Agent 文件工具，只留技能加载器，写盘由技能内的子 Crew 在沙箱执行；好处是格式统一、权限收敛、主上下文干净。",
   "pitfall": "给 Agent 裸文件读写权限，它会把整份文件读进上下文，还会写出格式各异的记忆文件。",
   "source": "第20讲",
   "tags": [
    "记忆",
    "技能",
    "沙箱"
   ]
  },
  {
   "id": "V-21",
   "layer": "V",
   "title": "第21讲 搜索式记忆：pgvector 混合检索与异步索引",
   "oneliner": "对话结束后异步建索引，检索时向量与全文按 7 比 3 加权，再按标签和时间过滤。",
   "mechanism": [
    "开篇对比两种获取知识的范式：数据量小时靠人工分类加目录浏览，规模有限；数据量过了临界点，只能自动索引加语义召回。",
    "RAG 是通用范式：建索引（Indexing）、检索（Retrieval）、生成（Generation）三段，索引手段有 grep 全库扫描、关键字加字段、BM25、向量 Embedding、知识图谱几路。",
    "四步索引：解析 JSONL 里的对话轮次、用大模型抽摘要和标签、调 embedding 接口拿 1024 维向量、写入 pgvector。",
    "索引走 asyncio.create_task 异步执行，不阻塞主对话。",
    "存储字段设计：search_text 是用户原文加标签，写入用 ON CONFLICT DO NOTHING 保证幂等。",
    "检索三种模式：vector 余弦相似度、fulltext 全文近似 BM25、hybrid 0.7 向量加 0.3 全文。",
    "过滤器两个维度：tags 数组重叠、days 时间范围，先过滤再排序。"
   ],
   "code": [
    "m3l21/indexer.py：四步索引流水线",
    "m3l21/m3l21_search_memory.py：三种检索模式与过滤器",
    "m3l21/pgvector-docker-compose.yaml：向量库环境"
   ],
   "reuse": [
    "量大之后混合检索比纯向量稳，关键词命中靠全文那 0.3。",
    "索引异步跑，用户端零等待。",
    "标签在索引时生成，检索时直接过滤。"
   ],
   "interview": "搜索式记忆我做成异步索引加混合检索：对话结束抽摘要和标签写进 pgvector，检索时 0.7 向量加 0.3 全文，再按标签和时间过滤。",
   "pitfall": "只做向量检索，遇到专有名词和编号就召回不到，全文那一路不能省。",
   "source": "第21讲",
   "tags": [
    "记忆",
    "pgvector",
    "混合检索"
   ]
  },
  {
   "id": "V-22",
   "layer": "V",
   "title": "第22讲 项目实战三：XiaoPaw 记忆篇，打造懂你的长记忆助手",
   "oneliner": "把前三讲的记忆能力装进 XiaoPaw：四份文件管长期设定，向量库管海量历史，按成本分层读取。",
   "mechanism": [
    "三层结构落地：会话上下文管当前任务，workspace 四份文件管稳定设定，pgvector 管历史对话。",
    "读取顺序按成本从低到高：先读文件，不够再检索。",
    "memory.md 当索引用，写关键词和指针，正文留在各自层里。",
    "记忆写入仍走技能，配置里加 pgvector 连接与索引开关。",
    "验收看两件事：跨会话能不能记住用户偏好，长对话下 token 是否可控。"
   ],
   "code": [
    "m2l22/readme.md：三层记忆的项目结构",
    "m3l20/m3l20_file_memory.py：文件层",
    "m3l21/m3l21_search_memory.py：检索层"
   ],
   "reuse": [
    "记忆分层按访问频率设计，别一刀切全进向量库。",
    "索引文件与内容文件分开维护。",
    "每层设容量上限，超了走治理。"
   ],
   "interview": "XiaoPaw 的记忆分三层：上下文、workspace 文件、向量库，读取按成本从低到高，写入统一走技能，长对话下 token 也能压住。",
   "pitfall": "所有历史都塞进上下文，两周后每次对话都超限，压缩得再狠也救不回来。",
   "source": "第22讲",
   "tags": [
    "项目实战",
    "记忆",
    "XiaoPaw"
   ]
  },
  {
   "id": "V-23",
   "layer": "V",
   "title": "第23讲 Orchestrator 范式：任务层的主 Agent 加子 Agent",
   "oneliner": "主 Agent 运行时决定角色与串并行，子 Crew 之间用文件路径交接。",
   "mechanism": [
    "顺序工作流把步骤写死、误差叠加，Swarm 无协调中心难收敛；Orchestrator 由主 Agent 运行时决定下一步，Claude Code 就是这个范式。",
    "SpawnSubAgentTool 收六个参数：role、goal、context、任务描述、产出文件、工具白名单，现场拼一个 Sub-Crew，跑完即销毁。",
    "SpawnParallelTool 用 ThreadPoolExecutor 按子任务数开线程，单路异常被捕获成 error 字符串，不阻塞其他路。",
    "子 Agent 之间只传文件路径：context 写「读 workspace/design/architecture.md」，正文留盘，下游用 FileReadTool 按需读。",
    "TOOL_REGISTRY 预置读文件、写文件、Bash 三类工具，主 Agent 按 tool_names 给子 Agent 发白名单，不给全量权限。",
    "SOP 从 SKILL.md 读入注入 backstory，换一份文件就换流程；_resolve_workspace_path 专门修 LLM 编出来的假路径。"
   ],
   "code": [
    "m4l23/m4l23_orchestrator.py：SpawnSubAgentTool、SpawnParallelTool 与 TOOL_REGISTRY 实现",
    "m4l23/README.md：Orchestrator 与 Workflow 的对比和七步阅读路线",
    "m4l23/test_orchestrator.py：8 个用例，覆盖并行 wall-time、未知工具过滤、上下文隔离"
   ],
   "reuse": [
    "先跑通单 Agent，证明不够用再扩成多 Agent，别一上来就编排。",
    "执行与评审分开，另起一个验收 Agent 判断产出合不合格。",
    "子 Agent 交接只写文件路径，正文留在磁盘。"
   ],
   "interview": "Orchestrator 没有预定义任务图，主 Agent 运行时决定角色和串并行，用 Spawn 工具拉子 Crew，产出靠文件路径交接。",
   "pitfall": "没有 kill switch 和预算上限，主 Agent 规划一错，整条子链放大错误，出现 HackerNews 上 600 美元账单换零产出的案例。",
   "source": "第23讲",
   "tags": [
    "Orchestrator",
    "子Agent",
    "并行"
   ]
  },
  {
   "id": "V-24",
   "layer": "V",
   "title": "第24讲 认知升级：从任务列表到数字团队",
   "oneliner": "数字员工等于 Soul 加 Skill 加记忆，缺一件就只是工具。",
   "mechanism": [
    "Harness Engineering 接替 Context Engineering：任务结束就清空状态的是工具，身份能跨任务留存的才算员工。",
    "三件套缺一不可：Soul 回答我是谁，Skill 回答我能做什么，记忆回答我记得什么，XiaoPaw 三者齐备才叫数字员工。",
    "第23讲的子 Agent 只有任务、角色和工具，没有 Soul、没有 Skill、没有记忆，数量再多也只是工具。",
    "养一堆专才的理由是判断准、能进化、可治理：什么都做的虾员工技能散、记忆互相干扰、出了问题找不到人。",
    "Agent 一多，人就成了消息总线：内部邮件封封要你转发，你是瓶颈；效率翻倍翻的是脑力消耗。",
    "团队模式让员工之间直接传任务、共享状态，人只留 escalation 节点；小时级任务 Orchestrator 够用，天周级才需要团队。"
   ],
   "code": [
    "m4l25/workspace/manager/soul.md：Soul 层落地样例，身份、决策偏好与 NEVER 清单",
    "m4l25/workspace/manager/agent.md：职责与工作规范，对应 Skill 与团队名册",
    "shared/digital_worker.py：把身份、职责、记忆注入 backstory 的通用框架"
   ],
   "reuse": [
    "先给角色写 Soul，再写 Skill，记忆最后补。",
    "团队内部直接传任务，人只保留异常升级节点。",
    "按任务时长选架构：小时级用 Orchestrator，周级才上数字团队。"
   ],
   "interview": "数字员工等于 Soul 加 Skill 加记忆，缺一件就是工具；团队模式让员工之间直接传任务，人只处理异常升级。",
   "pitfall": "Agent 一多就让所有人向自己汇报，人变成消息总线，效率翻倍翻掉的是自己的脑力。",
   "source": "第24讲",
   "tags": [
    "数字团队",
    "四层框架",
    "角色设计"
   ]
  },
  {
   "id": "V-25",
   "layer": "V",
   "title": "第25讲 团队角色体系：分工设计与行为规范",
   "oneliner": "通用数字员工类服务所有角色，换 workspace 即换人。",
   "mechanism": [
    "角色体系等于给每个数字员工发职业执照：写清我负责什么、我不负责什么，边界清楚系统才能被推理、测试和维护。",
    "通才 Agent 堆会撞三堵墙：上下文塞满什么都做的知识、记忆往四面八方积累成噪声、遇到选择题判断方向随机。",
    "Orchestrator 是调度机制，子 Agent 用完即销毁；Manager 是团队成员，有 soul、有记忆，跨 session 积累分工经验。",
    "三维隔离判断法决定谁该独立成角色：记忆数据、技能体系、决策偏好，三个维度都差异显著才值得新建。",
    "会用 Figma 的 Dev 只多一个工具，另两维和 Dev 相同，扩 Dev 的 Skills 就够，新角色会被协调成本吃掉并发收益。",
    "DigitalWorkerCrew 对角色内容一无所知：代码决定运行顺序和输入来源，LLM 决定拆解内容，两层分开排查。"
   ],
   "code": [
    "shared/digital_worker.py：DigitalWorkerCrew 与 UNIVERSAL_TASK_TEMPLATE",
    "m4l25/workspace/dev/soul.md：Dev 的职责边界与 NEVER 清单",
    "m4l25/sandbox-docker-compose.yaml：manager 8023、dev 8024 的双沙盒配置"
   ],
   "reuse": [
    "新角色先用三维判断法过一遍，只差技能就扩 Skills。",
    "Manager 和 Orchestrator 分开建，调度机制别当团队成员。",
    "静态层和动态层分开排查，代码错查代码，内容错查文件。"
   ],
   "interview": "角色体系靠否定式职责划界，用记忆、技能、决策偏好三维判断要不要新建角色；Manager 是持久成员，Orchestrator 只是调度机制。",
   "pitfall": "把 Manager 当 Orchestrator 用，或者每个新工具都单开一个角色，协调成本很快吃掉并发收益。",
   "source": "第25讲",
   "tags": [
    "数字员工",
    "角色隔离",
    "沙盒"
   ]
  },
  {
   "id": "V-26",
   "layer": "V",
   "title": "第26讲 任务链与信息传递：数字员工的协作协议",
   "oneliner": "邮箱三态加共享目录，Manager 和 PM 靠文件路径串起任务链。",
   "mechanism": [
    "共享工作区回答状态在哪里，邮箱回答谁让我做什么，两种机制互补：工作区不发通知，邮件不存文档。",
    "工作区按角色开权限：Manager 四个目录全读写，PM 只读 needs、只写 design，规范落在 WORKSPACE_RULES.md。",
    "权限表打包成 reference Skill 发给每个角色，PM 只被告诉读 needs、写 design，注意力收窄，不靠模型自觉。",
    "邮件字段有 id、from、to、type、subject、content，type 让收件方直接知道怎么处理。",
    "send_mail 写 unread；read_inbox 读取即改 in_progress 并记 processing_since；reset_stale 回收超时消息。",
    "同步通知负责秒级唤醒，定时轮询兜住崩溃漏读；每个读写都包 FileLock，两个容器不会写坏同一个 JSON。"
   ],
   "code": [
    "m4l26/tools/mailbox_ops.py：send_mail、read_inbox、mark_done、reset_stale 与 FileLock",
    "m4l26/tools/workspace_ops.py：create_workspace 幂等创建 needs、design、mailboxes 目录",
    "m4l26/sandbox-docker-compose.yaml：8025、8026 双沙盒与 /mnt/shared 共享挂载"
   ],
   "reuse": [
    "两种机制别混：状态进工作区，触发进邮箱。",
    "权限表做成 reference Skill，比口头约束管用。",
    "消息带 type 字段，收件方少推理一轮。"
   ],
   "interview": "共享工作区管状态、邮箱管触发：需求落 needs，产出落 design，消息带路径和 type，读信即置 in_progress，超时回滚。",
   "pitfall": "把文档全文塞进邮件，或者让邮件代替工作区，消息体膨胀后没法追溯，文件也没人维护。",
   "source": "第26讲",
   "tags": [
    "邮箱",
    "状态机",
    "协作协议"
   ]
  },
  {
   "id": "V-27",
   "layer": "V",
   "title": "第27讲 Human as 甲方：Agent 团队的人类介入点",
   "oneliner": "人类只在三个节点签字，Manager 发完确认请求就退出，不阻塞等人。",
   "mechanism": [
    "人类必须在场的地方只有三处：需求澄清、执行中的 checkpoint、异常兜底，其余环节全自主。",
    "需求澄清用四维框架：目标、边界、约束、风险，Manager 主动发问，答案写进 requirements.md 并等人确认才开工。",
    "异常兜底走 human.json：重试失败、执行超时、token 超预算、安全越权、循环不收敛，按类型路由给人。",
    "human.json 只允许 Manager 写，mailbox_cli.py 检查 --to human 时发送方必须是 manager，否则返回 errcode=1。",
    "human.json 用二态 read: false/true，human_cli.py 独立轮询；Manager 发完请求就退出，下次用 check-human 查结果。",
    "审批按风险分级：低风险高置信度自动放行，中等人工确认，高风险阻塞；checkpoint 设太多会变成橡皮图章。"
   ],
   "code": [
    "m4l27/human_cli.py：check、respond 子命令与二态 human.json 读写",
    "m4l27/workspace/manager/skills/mailbox/scripts/mailbox_cli.py：human 收件箱的发送方校验",
    "m4l27/workspace/manager/agent.md：四个场景的触发条件与结束动作"
   ],
   "reuse": [
    "打扰人的时机写进编排脚本，别让模型自己判断。",
    "审批按风险分档，低风险高置信度的别让人看。",
    "SOP 共创和执行分开，改流程不重跑任务。"
   ],
   "interview": "人类只在需求澄清、checkpoint、异常兜底三处出现；普通 Agent 不能直连 human.json，审批按风险分级，异步回复不阻塞。",
   "pitfall": "checkpoint 设太多，人工审批变成橡皮图章，真正要拦的高风险决策也被一路放行。",
   "source": "第27讲",
   "tags": [
    "Human-in-the-loop",
    "审批",
    "SOP"
   ]
  },
  {
   "id": "V-28",
   "layer": "V",
   "title": "第28讲 数字员工的自我进化：让 Agent 团队越用越好",
   "oneliner": "三层日志喂五个问题，复盘产出锚定到文件原文的替换提案。",
   "mechanism": [
    "进化闭环分五步：记录、复盘、提案、落地、验证，每一环的产出直接喂给下一环，跑完一圈团队比上一轮更好。",
    "三层日志按生命周期分层：L1 人类纠正永久留，L2 任务质量留 90 天，L3 的 ReAct 步骤滚动 30 天。",
    "L1 由 send_mail 发往 human 时旁路写入，L2 由 task_callback 自动写，L3 复用 session 日志加 task_id 索引。",
    "自我复盘看自己的日志，做到 L3 步骤级深度；团队复盘看全员 L2 和全量 L1，一个求精度，一个求视野。",
    "五个递进问题走漏斗：哪些任务差、差在哪步、人类怎么看、根因哪类、改哪段；root_cause 只能取四个枚举值。",
    "提案最多 3 条，evidence 不允许空，before_text 必填；memory 每天自动批 3 条，soul 必须人工审加 dry run。"
   ],
   "code": [
    "m4l28/schemas.py：ImprovementProposal 的 root_cause 枚举与 before/after 字段",
    "m4l28/tools/log_query.py：五个查询子命令的实现",
    "m4l28/scheduler.py：24 小时间隔加 5 条任务的双条件触发"
   ],
   "reuse": [
    "先分层记日志再谈复盘，混在一起保留策略会打架。",
    "改进必须能回滚，每次改 soul 或 SOP 都记版本号。",
    "样本不足就跳过复盘，2 条日志推不出结论。"
   ],
   "interview": "复盘跑记录、复盘、提案、落地、验证五步闭环，提案最多 3 条且必须带证据和原文锚点，按 memory、skill、soul 三档审批。",
   "pitfall": "日志只记结果不记过程，复盘只能得出「某类任务做得不好」，找不到可改的那一行。",
   "source": "第28讲",
   "tags": [
    "自我进化",
    "复盘",
    "日志分层"
   ]
  },
  {
   "id": "V-29",
   "layer": "V",
   "title": "第29讲 项目实战4：Agent 小队完成真实项目需求",
   "oneliner": "四个机制拼成小队，难点不在功能，在四个接缝。",
   "mechanism": [
    "第29讲把角色体系、任务链、HITL、自我进化四个机制拉到一起跑，难的是接缝：邮箱、唤醒、权限、状态都要补齐。",
    "骨架沿用第22课的三层继承，L1 基础设施和 L2 记忆不动，只加 L3 团队协作层，组件是发信、读信、kickoff、定时服务。",
    "四个接缝落在四个文件：main.py 管入口，runner.py 管循环，team_tools.py 放 8 个工具，workspace.py 做权限化读写。",
    "团队四个角色 manager、pm、rd、qa 各带身份四件套和一组 Skill，业务逻辑全在 35 个 Skill 里，Python 只负责接缝。",
    "零编排循环靠两条腿：SendMail 发信即唤醒，CronService 定时兜底，收件箱读到消息就 kickoff 起 Agent。",
    "工具层补可靠性：mailbox.py 三态机，tasks_store.py 先写临时文件再 rename 加 FileLock，event_log.py 只追加。"
   ],
   "code": [
    "m4l29/readme.md：xiaopaw-team 仓库地址与本地路径说明",
    "shared/digital_worker.py：小队角色复用的数字员工框架",
    "m4l26/tools/mailbox_ops.py：三态邮箱，团队版的 mailbox.py 沿用同一套状态机"
   ],
   "reuse": [
    "集成期先列接缝清单，别急着加新能力。",
    "业务逻辑放 Skill，Python 只写胶水。",
    "定时任务只做兜底，主路径靠发信即唤醒。"
   ],
   "interview": "22 课骨架上加团队层，main、runner、team_tools、workspace 四个接缝把角色、邮箱、HITL 拼成小队。",
   "pitfall": "把团队能力写成一个大编排脚本，四个接缝糊在一起，任何一环改动都要回归整条链。",
   "source": "第29讲",
   "tags": [
    "项目实战",
    "零编排",
    "数字团队"
   ]
  },
  {
   "id": "V-30",
   "layer": "V",
   "title": "第30讲 可观测性：Hook 骨架 + Langfuse 全链路追踪",
   "oneliner": "把 CrewAI 四种原生钩子统一成七个事件，观测代码与业务代码分离。",
   "mechanism": [
    "约束的前提是先看见：Hook 在 12、19、28 课各管一摊，Agent 空转烧钱时，传统 APM 全绿也发现不了。",
    "EventType 统一成 7 个事件，覆盖一轮 Agent 推理的起止、LLM 调用、工具调用、任务完成与会话结束。",
    "HookContext 是 frozen 的 dataclass，带 agent_id、tool_name、token 数与 duration_ms，handler 改不动它。",
    "HookRegistry.dispatch 给每个 handler 包 try-except，Langfuse 超时不会拖垮结构化日志。",
    "hooks.yaml 声明事件到 handler 的映射，一个事件可挂多个 handler，全局层这次注册了 12 个。",
    "适配层把 llm_call、tool_call、step_callback、task_callback 映射成 7 事件，故意不挂 after_llm_call。"
   ],
   "code": [
    "m5l30/hook_framework/registry.py：EventType、HookContext、HookRegistry.dispatch",
    "m5l30/hook_framework/crew_adapter.py：CrewAI 四种机制到 7 事件的映射",
    "m5l30/shared_hooks/langfuse_trace.py：span 栈嵌套与 trace 构建"
   ],
   "reuse": [
    "handler 里的异常自己吞，观测系统不能拖垮主流程。",
    "事件名对齐 Agent 一轮的生命周期，换框架只重写适配层。",
    "自托管 Langfuse 显式设 LANGFUSE_BASE_URL，并关掉 CrewAI 遥测防重复 trace。"
   ],
   "interview": "可观测性靠 7 个事件加两层 hooks.yaml：全局层放日志与 Langfuse，workspace 层放审计，适配层负责桥接。",
   "pitfall": "只看 APM 绿灯不看输出质量，Agent 循环烧掉 4.7 万美元，月底账单才暴露。",
   "source": "第30讲",
   "tags": [
    "可观测性",
    "Hook",
    "Langfuse"
   ]
  },
  {
   "id": "V-31",
   "layer": "V",
   "title": "第31讲 可靠性：重试、循环控制与成本围栏",
   "oneliner": "Hook 从报警升级成能刹车：超预算或原地打转就抛 GuardrailDeny。",
   "mechanism": [
    "dispatch_gate 与 dispatch 只差一行：GuardrailDeny 向上抛，其他异常照旧吞掉。",
    "tool_call 装饰器吞异常，adapter 把 deny 暂存 _pending_deny 并 return False 拦工具，再在 step_callback 重抛。",
    "RetryTracker 只观测：429 和 5xx 值得重试 2 到 3 次，400、401 重试也没用；失败次数和成功率在 AFTER_TOOL_CALL 记。",
    "CostGuard 双检查点：AFTER_TURN 累加 token 估算成本，BEFORE_TOOL_CALL 再拦一次，默认预算 1 美元，精确账看 Langfuse。",
    "LoopDetector 把 tool_name 加输出前 200 字符做 MD5，连续 3 次相同就 deny；ReAct 与原生 tool call 两条路径各算各的。",
    "hooks.yaml 的 strategies 段实例化有状态类，列表顺序即执行顺序，cost_guard 必须排在 loop_detector 前。"
   ],
   "code": [
    "m5l31/shared_hooks/hooks.yaml：hooks 段与 strategies 段的声明式配置",
    "m5l31/shared_hooks/cost_guard.py：MODEL_PRICES 与双检查点逻辑",
    "m5l31/hook_framework/crew_adapter.py：_pending_deny 延迟抛出"
   ],
   "reuse": [
    "预算围栏用 token 估算值，别为精确多调一次 tokenizer。",
    "循环检测用状态哈希，max_iter 只当最后一道保险。",
    "新增策略只写一个类加一段 yaml，不碰 Agent 代码。"
   ],
   "interview": "dispatch_gate 让 GuardrailDeny 穿透 Hook 链，重试、成本、循环三个策略全在 hooks.yaml 声明。",
   "pitfall": "只在 @before_tool_call 里 raise，CrewAI 把异常吞掉后 Agent 继续跑，围栏形同虚设。",
   "source": "第31讲",
   "tags": [
    "可靠性",
    "Guardrail",
    "成本控制"
   ]
  },
  {
   "id": "V-32",
   "layer": "V",
   "title": "第32讲 企业安全性：沙箱、权限网关与身份认证",
   "oneliner": "用确定性门控管住工具：沙箱、权限、身份三层，Prompt 只算提醒。",
   "mechanism": [
    "629 次安全测试里 Agent 19 天违反 22 次；确定性门控约 80% 有效，Prompt 指令只有约 20%。",
    "五类威胁都要经工具落地，三层防御对应三个问题：沙箱限执行边界，权限网关限工具选择，身份认证限使用主体。",
    "SandboxGuard 用四条正则查路径穿越、危险命令、Shell 注入、环境变量引用，按字段语义分层，避免 markdown 竖线误报。",
    "PermissionGate 读 security.yaml，按 Deny > Ask > Allow 判定；未列出的工具落到 default: ask，新工具默认要人确认。",
    "SecureToolWrapper.wrap 只存环境变量名，执行时读密钥合进 kwargs，模型的 schema、messages、tool_input 都没有密钥。",
    "身份认证有两种：用户身份透传遇到 Bash 新脚本会断链；沙箱即身份把短期 OIDC Token 注入用户专属沙箱，出站请求自动带身份。"
   ],
   "code": [
    "m5l32/shared_hooks/sandbox_guard.py：四条正则与按字段分层的消毒逻辑",
    "m5l32/shared_hooks/permission_gate.py：Deny/Ask/Allow 判定与 security.yaml 加载",
    "m5l32/shared_hooks/credential_inject.py：SecureToolWrapper 在工具执行层注入密钥",
    "m5l32/workspace/demo_agent/security.yaml：per-tool 权限策略与 default: ask",
    "m5l32/shared_hooks/audit_logger.py：安全事件写 JSONL 与 session_summary"
   ],
   "reuse": [
    "安全规则写成确定性代码，Prompt 里的禁令只当提醒。",
    "新工具先落 default: ask，跑一段时间再显式改成 allow。",
    "身份别绑在长期 API Key 上，沙箱注入短期 Token，权限才能按人切开。"
   ],
   "interview": "我用确定性门控管工具：沙箱限边界、权限网关限工具、身份认证限主体；Prompt 只能提醒，安全靠执行层的配置和基础设施。",
   "pitfall": "把安全寄托在 soul.md 的 NEVER 禁令上，模型被任务压力一推就照做。",
   "source": "第32讲；m5l32/shared_hooks/sandbox_guard.py",
   "tags": [
    "安全",
    "身份认证",
    "权限"
   ]
  },
  {
   "id": "V-33",
   "layer": "V",
   "title": "第33讲 项目实战5：系统加固你的 XiaoPaw 本地工作助手",
   "oneliner": "699 行 Hook 接线，6 行业务改动，给 XiaoPaw 穿上三层装甲。",
   "mechanism": [
    "改动全景：699 行新增全是 30/31/32 三课的 handler，业务侧只改 6 行把 Hook 接进 Runner，骨架不动。",
    "hooks.yaml 同时装观测、可靠性、安全三组策略，三课叠加在同一份配置，加载顺序就是执行顺序。",
    "HookContext 增加 sender_id，PermissionGate 按飞书 routing_key 识别用户，同一个 Agent 对不同人给不同权限。",
    "Langfuse 追踪用 contextvars 传递 trace_id 和 span 栈，Sub-Crew 线程自动挂到父节点，AFTER_TURN 强制 flush。",
    "沙箱挂载先校验 host 与 container 的 inode 一致，再启动 Skill，避免读写落到错误目录。",
    "验收走 Trace 树：llm-call、tool-skill_loader、tool-agent_execution、task-complete、session_end 都挂在同一棵树上。"
   ],
   "code": [
    "m5l32/demo.py：Runner 接线与三层策略装配",
    "m5l32/workspace/demo_agent/soul.md：角色禁令",
    "m5l32/tests/test_e2e_demo_flow.py：四路径验收与脱敏断言",
    "m2l17/readme.md：XiaoPaw 原始链路与能力边界"
   ],
   "reuse": [
    "接线只改入口，Hook 全放配置，业务代码保持干净。",
    "每层给一个可关的开关，出问题先关层再定位。",
    "验收看 trace 树结构，不只看最终答案。"
   ],
   "interview": "XiaoPaw 加固只动入口：699 行 Hook 配置，6 行接进 Runner，观测、可靠、安全三层挂在同一棵 trace 树上，业务代码几乎没改。",
   "pitfall": "把 Hook 装配散在业务代码里，改一次策略要翻十几个文件。",
   "source": "第33讲；m5l32/demo.py",
   "tags": [
    "项目实战",
    "加固",
    "Trace"
   ]
  },
  {
   "id": "V-34",
   "layer": "V",
   "title": "第34讲 需求边界：用 AI 适用性评估表识别高 ROI 场景",
   "oneliner": "先用四问砍掉伪需求，再用五维表打分，18 分以上才立项。",
   "mechanism": [
    "三法扫场景：工作流审计找重复报表，摩擦点溯源看放弃率与求助日志，规模增长映射判断人力是否线性瓶颈，先凑十几个候选。",
    "四问五分钟过滤：谁在做、每周几次、做错代价多大、量翻十倍怎么办；每周少于 10 次直接进暂缓池，十几个缩到 3 到 5 个。",
    "五维打分：规模效应、任务清晰度、错误容忍度、信息可结构化、人力替代度，各 1 到 5 分，满分 25。",
    "分档决策：5 到 10 分暂缓，11 到 17 分谨慎试点，18 到 25 分优先推进；同一张表评三个场景，能拉开十几分的差距。",
    "两个维度最容易拍脑袋：规模效应按每周次数乘单次耗时算，错误容忍度按生产事故的投诉与合规成本算。",
    "评估前先看 AI-native 的另一半地图：人工质检只覆盖 5% 到 10%，AI 能覆盖 100%，这类场景算的是新价值。"
   ],
   "code": [
    "README.md：课程结构中的第 34 讲定位",
    "m5l32/demo.py：可运行的最小 Agent，可当作评估对象",
    "m2l17/readme.md：XiaoPaw 的完整链路，适合做场景盘点"
   ],
   "reuse": [
    "立项前先做四问，能挡掉一半靠感觉提的需求。",
    "打分时把次数和耗时写出来，别用「很痛」当依据。",
    "评估表拿来对齐业务方，最终立项由负责人拍板。"
   ],
   "interview": "我用四问过滤场景，再用五维表打分：规模、清晰度、容错、结构化、替代度，18 分以上立项，11 到 17 分小试点，低于 11 分补数据。",
   "pitfall": "只算省下的人力，不算推理成本、人工兜底和失败返工，ROI 表漂亮，上线就亏。",
   "source": "第34讲",
   "tags": [
    "需求",
    "ROI",
    "场景评估"
   ]
  },
  {
   "id": "V-35",
   "layer": "V",
   "title": "第35讲 产品原型：从需求到第一个可验证的 Demo",
   "oneliner": "原型定 Who、What、How good，产出 I/O 表和 50 条 GT。",
   "mechanism": [
    "AI 产品没有 pass/fail：传统需求能跑测试判对错，AI 需求要先说清准确率多少算好、谁来验收。",
    "Who 落到具体角色和情境：同一段代码辅助，给工程师做 IDE 内联建议，给产品经理做对话生成原型，形态差一个量级。",
    "What 在形态轴上选最简单的：单轮对话与文档处理最快，Copilot 嵌入信任度高，工作流自动化可审计，RPA 跨系统、浏览器自动化、Agent 平台复杂度递增，不适合首个原型。",
    "原型核心产出是 I/O 表：用户显式输入、上下文输入、知识输入，输出内容与输出形式，形式决定下游集成难度。",
    "How good 落成一句可量化标准：在什么场景下，对谁的业务价值，哪个指标达到什么数字。",
    "50 条 GT 做方向验收，来源依次是历史日志、LLM 合成加人工审核、专家构造；没有 GT 的验收只能靠印象打分。"
   ],
   "code": [
    "m5l32/demo.py：最小可运行 Agent，可直接当原型骨架",
    "m5l32/tests/test_e2e_demo_flow.py：把原型假设写成端到端断言",
    "README.md：课程结构与各讲示例索引"
   ],
   "reuse": [
    "先写「不做什么」，原型范围才守得住。",
    "第一天就找真实用户跑 UAT，记录他们怎么问、第一反应是什么。",
    "原型只验一个最高风险假设，验完再谈优化 Prompt。"
   ],
   "interview": "原型先定 Who、What、How good，产出 I/O 表和 50 条 GT，只验最高风险假设；形态选错，后面调 Prompt 都白费。",
   "pitfall": "拿到需求就打开 IDE 写对话窗口，把流程型需求做成聊天，三四周后整体返工。",
   "source": "第35讲",
   "tags": [
    "原型",
    "需求",
    "GT"
   ]
  },
  {
   "id": "V-36",
   "layer": "V",
   "title": "第36讲 评测体系：让 AI 质量可量化",
   "oneliner": "评测四环节：建集、执行、打分、出结论，缺一环整套失效。",
   "mechanism": [
    "评测流水线四环节：评测集建设、评测执行、评测打分、汇总与结论；课程用 Bard、DPD、加航三个事故说明质量不可见等于蒙眼飞行。",
    "eval case 四个字段：input、expected_output（可选）、grading_criteria（必须有）、meta；评判标准比参考答案更关键。",
    "评测集随生命周期生长：启动期用业务标准答案，上线前按功能乘场景补专家 case，再合成扩展并人工抽查 10%，上线后从生产 Trace 筛。",
    "执行方式按形态分：多轮对话用模拟 Agent 动态推进，工作流日常回归用 Mock、大版本用真实沙箱，Agent 固定 temperature 并重置 Docker 快照。",
    "打分先定层再定人：过程和结果按需同打；代码打分器要有单测，大模型评判带位置偏差 75%、冗长偏差 91.3%、自我增强 25%。",
    "结论要能对话：按功能、优先级、难度、来源细分，报 pass^k 不报 pass@k；bad case 聚类后给出方向性结论。"
   ],
   "code": [
    "m5l32/tests/test_e2e_demo_flow.py：任务型端到端断言写法",
    "m5l32/tests/test_e2e_security_llm.py：LLM 驱动的场景化安全评测",
    "pytest.ini：测试标记与集成测试分层"
   ],
   "reuse": [
    "先写 10 条 case 跑通，再决定买什么评测平台。",
    "打分器代码本身要有单测，否则分数跳变会骗过所有人。",
    "每个失败类别留 3 到 5 条守底 case，修完才算验收。"
   ],
   "interview": "评测拆成建集、执行、打分、结论四段，case 必须有 grading_criteria；代码打分优先，模型评判先对齐人工，按失败类型给方向。",
   "pitfall": "只测最终文字不测系统状态，模型说退款成功，数据库里订单还在。",
   "source": "第36讲",
   "tags": [
    "评测",
    "Eval",
    "质量"
   ]
  },
  {
   "id": "V-37",
   "layer": "V",
   "title": "第37讲 持续集成：让 AI 应用稳定演进",
   "oneliner": "六类变更都触发流水线，五阶段从便宜到贵，最后分三档放行。",
   "mechanism": [
    "传统 CI 只认代码 PR，AI 应用还有 Prompt、模型版本、知识库、Skill、工具五类变更，后五类它完全看不见。",
    "流水线三块：触发与版本管理、五阶段执行、三档决策；版本要同时锁七项，代码、Prompt、模型（具体版本号，不用浮动别名）、知识库、Skill、工具、评测集，评测集版本最容易被漏。",
    "五阶段按成本递增：静态检查 30 秒内零 Token，回归 eval 异步触发，行为评测对比轨迹，成本性能看 Token 回归，安全扫描约 60 秒并行。",
    "行为评测补输出评测的盲区：期望轨迹 search_tool 到 uuid_lookup 到 crm_write，实际少了中间一步，结果对但过程错。",
    "三档决策用固定基准：指标不低于基准自动通过；质量降 2% 到 10%、成本涨 20% 到 100%、新功能首评走人工；质量降超 10% 或安全失败直接阻断。",
    "守底集优先收历史失败场景，生产事故 24 小时内补一条 case；P0 随 PR 跑，P1 以下异步跑，避免开发者绕过。"
   ],
   "code": [
    "pytest.ini：集成测试标记与回归入口",
    "m5l32/tests/test_e2e_security.py：安全用例可直接做门禁",
    "m5l32/shared_hooks/hooks.yaml：策略装配与回归对象"
   ],
   "reuse": [
    "流水线按便宜到贵排，30 秒内给出第一反馈。",
    "把七维版本快照打进出包，包括 eval 集版本。",
    "人工审核只放边界情况，SLA 24 小时，超时自动上升。"
   ],
   "interview": "AI 的 CI 覆盖代码、Prompt、模型、知识库、Skill、工具六类变更，五阶段先便宜后昂贵，按基准分通过、审核、阻断三档。",
   "pitfall": "只把 eval 挂在发布前跑一次，平时 Prompt 改动直接上线，等业务方投诉才发现。",
   "source": "第37讲",
   "tags": [
    "CI/CD",
    "回归",
    "门禁"
   ]
  },
  {
   "id": "V-38",
   "layer": "V",
   "title": "第38讲 线上监控：知道你的 AI 到底跑得怎么样",
   "oneliner": "六层监控从系统看到业务，Agent 执行层是传统监控的盲区。",
   "mechanism": [
    "AI 失败有三个特殊性：不抛异常的沉默失败、从 85% 悄悄跌到 78% 的概率型退化、模型侧更新带来的隐蔽来源。",
    "系统层先看 LLM API 报错率低于 1%、工具报错率、TTFT 小于 1 秒、P95 延迟、单任务耗时；429 限流必须单列。",
    "成本层用指标乘维度矩阵：Token、成本、缓存命中率，分别按小时天周、单次调用任务提交、人 Team 整体看；告警要硬限制降级模型。",
    "Agent 执行层看四个指标：分工具成功率、技能触发分布、循环深度、循环检测防护；单工具失败不能被平均值掩盖。",
    "质量层按统计窗口算：代码采用率、可运行率、测试通过率、重新生成率、挫败信号，能用 bash 判定就不用 LLM。",
    "告警用消耗率代替直接阈值，1 小时吃掉 2% 月预算就报；错误预算剩 20% 时分别禁发布、考虑回滚、自动降级。"
   ],
   "code": [
    "m5l32/shared_hooks/structured_log.py：JSON 结构化事件，可直接接指标",
    "m5l32/shared_hooks/langfuse_trace.py：trace 与 span 的采集点",
    "m5l32/shared_hooks/cost_guard.py：成本围栏与降级思路"
   ],
   "reuse": [
    "先上线工具成功率、循环深度、单任务成本三个指标。",
    "告警按 P0 电话、P1 24 小时群通知、P2 工单分级。",
    "把 429 限流从 SLO 里拆出来，误报会少一大半。"
   ],
   "interview": "我按六层做监控，重点补 Agent 层的工具成功率、行为漂移、循环深度；告警用消耗率，P0 电话，P1 24 小时群通知。",
   "pitfall": "只盯 HTTP 200 和平均延迟，Agent 答错了照样返回成功，业务方先发现。",
   "source": "第38讲",
   "tags": [
    "监控",
    "告警",
    "可观测"
   ]
  },
  {
   "id": "V-39",
   "layer": "V",
   "title": "第39讲 数据飞轮：用线上数据持续迭代 AI Agent",
   "oneliner": "飞轮靠用户行为喂养：显式信号不足 5%，隐式信号覆盖 100%。",
   "mechanism": [
    "飞轮是用户在喂养 AI：电信客服解决率 34% 到 67%，Glean 两年做到 93% 采用率，靠的是使用中产生的信号。",
    "显式信号按产品类型设计：客服点赞点踩、文档生成接受拒绝、工作流审批按钮、RAG 三档、Agent 的 Allow/Deny；对话结束立刻弹 CSAT，响应率是邮件的三倍。",
    "隐式信号看行为：采纳、保留、复制是正向；重试、放弃、中断、情绪、拒绝是负向；显式覆盖率不足 5%，隐式接近 100%。",
    "五步闭环：开放编码找错误、轴心编码归因、按频次排序、修复、Eval 验证后灰度上线，再采集新信号。",
    "案例把 Rephrase Rate 从 62% 降到 28%：50 个 bad case 里 47% 是内部术语，换混合检索加术语词表，Recall@5 从 31% 提到 78%。",
    "修复顺序先 Harness 后模型：Claude Code 六周质量退化的三个根因都是基础设施 Bug，与模型无关。"
   ],
   "code": [
    "m5l32/shared_hooks/langfuse_trace.py：线上轨迹采集与回放",
    "m5l32/workspace/demo_agent/hooks/task_audit.py：任务完成事件落盘",
    "m5l32/tests/test_e2e_demo_flow.py：信号转成回归用例的落点"
   ],
   "reuse": [
    "先接隐式信号，点赞数据量撑不起分析。",
    "每周固定读 20 到 50 个失败案例，只记第一个失败点。",
    "每类失败留 3 到 5 条守底 case，修复后回归。"
   ],
   "interview": "数据飞轮靠用户行为：显式点赞覆盖不到 5%，我把重试、改写、放弃、中断接进 trace，五步归因修复，再用 Eval 和灰度验证。",
   "pitfall": "只收数据不设触发机制和负责人，数据仓库越堆越大，模型一点没变好。",
   "source": "第39讲",
   "tags": [
    "数据飞轮",
    "信号",
    "迭代"
   ]
  },
  {
   "id": "V-40",
   "layer": "V",
   "title": "第40讲 组织进化：从表演式转型到 AI 原生组织",
   "oneliner": "转型的标志是工作流重构，AI 采用率 90% 说明不了任何事。",
   "mechanism": [
    "表演式转型：全员订阅 AI，采用率 90%，交付速度下降、bug 率上升，没人对 AI 输出质量负责。",
    "三种现状：嵌入型使用率不足 5%，AI 是外挂；平台型 30%，平台追日活、业务追效率；AI 原生型改流程本身。",
    "自上而下先审工作流：每个环节问输入输出、决策点、AI 可替代度、必须保留人类判断的点，再挑独立性强、价值可见、可量化的试点。",
    "试点配一名有实权的 AI 架构师，先量基线：交付周期、Bug 逃逸率、Review 耗时、开发者满意度。",
    "自下而上给土壤：工具与算力、AI Champion 季度评选、Show and Tell、内部曝光；别拿 AI 代码比例当 KPI。",
    "个人成熟度四级：工具使用、工作流嵌入、工作流重构、团队赋能；到 L3 才把「Eval 通过」算完成。"
   ],
   "code": [
    "m4l25/README.md：团队角色体系与分工规范",
    "m4l28/README.md：数字员工自我进化的组织侧写法",
    "README.md：课程结构中的组织篇定位"
   ],
   "reuse": [
    "先用部署频率、变更失败率、恢复时间、交付周期衡量转型。",
    "每个 AI 应用都写一条可量化的业务成功标准。",
    "每月留一个场景完全不用 AI，保住人的判断力。"
   ],
   "interview": "我看转型只看工作流有没有改：角色、决策点、交付物、迭代方式变没变；再用交付周期、Bug 逃逸率、变更失败率验证，AI 采用率不算成绩。",
   "pitfall": "拿 AI 采用率和代码生成比例当 KPI，团队刷用量，质量和交付周期反而变差。",
   "source": "第40讲",
   "tags": [
    "组织",
    "转型",
    "AI 原生"
   ]
  },
  {
   "id": "R-01",
   "layer": "R",
   "title": "简历怎么写这段：一句定位加四行证据",
   "oneliner": "先给一句定位（做了什么系统、解决什么问题），再给四行能追问的工程细节。",
   "mechanism": [
    "定位句模板：基于 CrewAI 设计并落地企业级多智能体系统，覆盖角色定义、工具接入、上下文治理与生产护栏。",
    "四行证据分别对应四个能力面：多智能体编排、上下文与记忆、工具与协议、生产可靠性。",
    "每行都给可追问的名词：三态邮箱、剪枝与压缩阈值、MCP 工具过滤、成本围栏与循环检测。",
    "避免写「熟悉大模型」「了解 Agent」这类无法验证的表述。",
    "如果只做过其中一块，就只写那一块，面试官会顺着写的内容问。"
   ],
   "code": [
    "shared/digital_worker.py：多智能体编排的可讲点",
    "m4l26/tools/mailbox_ops.py：任务链与三态状态机",
    "m5l31/hooks.yaml：可靠性三策略",
    "m3l19/m3l19_context_mgmt.py：上下文剪枝与压缩"
   ],
   "reuse": [
    "定位句放项目第一行，四行证据放下面，每条不超过两行。",
    "写进去的每个名词都要能讲三分钟，讲不了就删。",
    "同一份简历面不同岗位时，调换四行的顺序。"
   ],
   "interview": "我做过一套企业级多智能体系统：角色用通用类加 workspace 配置，Agent 之间用三态邮箱传任务，上下文做剪枝加摘要压缩，生产层挂成本围栏和循环检测。",
   "pitfall": "写「负责 AI Agent 平台建设」这种笼统表述，面试官问细节时答不上来，反而扣分。",
   "source": "第10章简历路径；整个代码仓库",
   "tags": [
    "简历",
    "表达",
    "项目"
   ]
  },
  {
   "id": "R-02",
   "layer": "R",
   "title": "面试题：什么时候该上多智能体",
   "oneliner": "答三件事：单 Agent 的上下文会崩、任务需要隔离、性能约束允许。",
   "mechanism": [
    "先讲单 Agent 的三种崩法：上下文长度爆炸、内容污染、多指令冲突。",
    "再讲多智能体买到什么：上下文隔离、角色专业化、可质检。",
    "最后讲代价：通信成本、协调开销、调试难度上升。",
    "给判断口径：过程和目标都不确定、且需要质检回退时才拆。",
    "补一句 C.U.P. 打分法，说明这是量出来的结论，不是拍脑袋。"
   ],
   "code": [
    "m1l3/m1l3_multi_agent.py：四角色协作的最小实现",
    "m4l23/m4l23_orchestrator.py：动态编排的进阶形态"
   ],
   "reuse": [
    "面试先说崩法，再说收益，最后说代价，结构清楚。",
    "举一个你实际拆过的例子，说明拆完上下文降了多少。",
    "主动提「不拆也能做」的场景，显示判断力。"
   ],
   "interview": "单 Agent 包揽多职责时上下文会被污染，长度也压不住；多智能体买到的是隔离和质检，代价是通信和协调成本，所以我只在过程不确定又需要验收时才拆。",
   "pitfall": "一上来就说多智能体更强，面试官追问代价和适用边界时答不出。",
   "source": "第03讲、第04讲",
   "tags": [
    "面试",
    "选型",
    "多智能体"
   ]
  },
  {
   "id": "R-03",
   "layer": "R",
   "title": "面试题：怎么防止 Agent 原地打转和烧钱",
   "oneliner": "答四层：上下文治理降本、循环检测断循环、成本围栏断预算、全链路追踪定位。",
   "mechanism": [
    "第一层是上下文：剪枝旧工具返回、超阈值摘要、长产出落文件，从源头降 token。",
    "第二层是循环检测：对状态做哈希，连续重复达到阈值就拒绝下一次工具调用。",
    "第三层是成本围栏：累计 token 成本，超预算就 deny，把损失控制在预算内。",
    "第四层是追踪：Langfuse 里按 span 看成本和耗时，定位是哪个工具在烧钱。",
    "最后补一句顺序：成本先记账再判循环，否则已经花掉的钱没入账。"
   ],
   "code": [
    "m5l31/hooks.yaml：cost_guard 与 loop_detector 的顺序",
    "m5l31/hook_framework/registry.py：dispatch_gate 的阻断路径",
    "m3l19/m3l19_context_mgmt.py：剪枝与压缩"
   ],
   "reuse": [
    "回答按「降本、断循环、断预算、可定位」四层讲，层次感强。",
    "给出具体阈值（预算、阈值、压缩比例）显得有实操。",
    "强调围栏是运行中切断，不是事后告警。"
   ],
   "interview": "我从四层防：上下文剪枝和摘要降本，状态哈希检测循环，成本围栏在超预算时直接拒绝工具调用，再用全链路追踪定位问题；围栏是运行中切断，不是事后报警。",
   "pitfall": "只答「设了最大轮次」，面试官会追问轮次内烧掉的钱怎么办。",
   "source": "第31讲；第19讲",
   "tags": [
    "面试",
    "可靠性",
    "成本"
   ]
  },
  {
   "id": "R-04",
   "layer": "R",
   "title": "面试题：MCP 和 Skills 有什么区别",
   "oneliner": "MCP 规范的是工具怎么接，Skills 规范的是知识怎么给，一个管手，一个管脑。",
   "mechanism": [
    "MCP 是传输协议：定义工具清单、调用格式、传输方式，解决不同系统之间工具复用。",
    "Skills 是知识包：SKILL.md 写操作规范与判断框架，解决模型怎么做一类任务。",
    "两者的加载策略也不同：MCP 关注连接与缓存，Skills 关注渐进式披露。",
    "实际组合：Skill 说明步骤，步骤里调用 MCP 暴露的工具。",
    "课程里的沙箱就是 MCP 服务，技能里的 Sub-Crew 通过 MCP 调沙箱工具。"
   ],
   "code": [
    "m2l9/m2l9_mcp.py：MCP 服务器接入",
    "tools/skill_loader_tool.py：技能加载与渐进披露",
    "m2l10/m2l10_sandbox.py：技能通过 MCP 调沙箱"
   ],
   "reuse": [
    "面试用「手和脑」的比喻，一句话讲清区别。",
    "补一句组合关系，说明两者不冲突。",
    "举沙箱的例子，证明你真的用过。"
   ],
   "interview": "MCP 管手，Skills 管脑：MCP 标准化工具的接入和调用，Skills 提供任务的操作规范和判断框架；实际用起来是技能定义步骤，步骤里调 MCP 暴露的工具。",
   "pitfall": "把两者说成竞品，面试官会继续问那你项目里为什么两个都用。",
   "source": "第14讲、第16讲",
   "tags": [
    "面试",
    "MCP",
    "Skills"
   ]
  },
  {
   "id": "R-05",
   "layer": "R",
   "title": "面试题：多智能体的上下文怎么管",
   "oneliner": "答隔离、分层、治理三件事：角色各自为政，记忆分三层，写入要审计。",
   "mechanism": [
    "隔离：每个角色只有自己的 workspace 和工具，产出用文件引用传递。",
    "分层：当前任务放上下文，长期设定放 workspace 文件，海量历史进向量库。",
    "压缩：先剪旧工具返回，超阈值再摘要历史，最近十轮留原文。",
    "治理：记忆写入走统一规范，定期审计冲突和过期条目。",
    "可观测：每轮 token 数进追踪，才知道治理有没有效果。"
   ],
   "code": [
    "m3l20/m3l20_file_memory.py：bootstrap 四件套",
    "m3l19/m3l19_context_mgmt.py：剪枝与压缩",
    "m3l21/indexer.py：向量记忆索引"
   ],
   "reuse": [
    "三条主线讲完再举例，别一上来就讲某一个函数。",
    "强调隔离优先于压缩：能不让它进上下文，就别指望压缩救。",
    "用 token 数变化证明治理有效。"
   ],
   "interview": "上下文我按隔离、分层、治理三步做：角色之间用文件传产出，记忆分上下文、文件、向量库三层，写入统一走技能并定期审计。",
   "pitfall": "只讲压缩，不讲隔离，面试官会问那为什么不一开始就不让它进上下文。",
   "source": "第19-22讲",
   "tags": [
    "面试",
    "上下文",
    "记忆"
   ]
  },
  {
   "id": "R-06",
   "layer": "R",
   "title": "能力自评：从提示词调优者到系统架构师",
   "oneliner": "六个维度自评，哪一维还是空白，就去补对应的那一讲。",
   "mechanism": [
    "选型：能不能用 C.U.P. 给一个需求打分，说出该用哪档范式。",
    "定义：能不能写出岗位表，把 role、goal、backstory 和 Task 契约落到代码。",
    "工具：能不能按五步 SOP 封装一个工具，并接进 MCP。",
    "上下文：能不能画出三层记忆，说清剪枝和压缩的触发条件。",
    "协作：能不能设计角色边界、任务链和人工介入点。",
    "生产：能不能搭出 Hook 骨架，挂上成本围栏与权限网关。"
   ],
   "code": [
    "README.md：28 个示例目录与课程的对应关系",
    "m5l30 到 m5l32：生产层三讲的递进关系"
   ],
   "reuse": [
    "每季度自评一次，空白格就是下个季度的学习计划。",
    "面试前按六维准备例子，每维至少一个。",
    "团队招聘时用同一张表做能力面。"
   ],
   "interview": "我按六个维度看自己的能力：选型、定义、工具、上下文、协作、生产，每一维都有一个能讲出来的项目例子。",
   "pitfall": "六个维度都停在「了解」，没有一维能讲到实现细节，面试时撑不住追问。",
   "source": "第40讲；README.md",
   "tags": [
    "自评",
    "成长",
    "能力"
   ]
  }
 ]
};

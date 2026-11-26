// 复制本文件到 topics/<你的专题>/data.js，改完内容后在 topics.js 注册。
window.KB_TOPIC = {
 "slug": "your-topic",
 "meta": {
  "title": "新专题标题",
  "subtitle": "一句话说明这个专题解决什么问题",
  "description": "专题简介，会显示在门户卡片上。",
  "source": "来源说明",
  "updated": "2026-11-26",
  "accent": "#0f766e",
  "tags": [
   "标签1",
   "标签2"
  ]
 },
 "layers": [
  {
   "key": "A",
   "name": "第一层",
   "en": "Layer A",
   "color": "#0f766e",
   "desc": "这一层回答什么",
   "count": 1
  },
  {
   "key": "B",
   "name": "第二层",
   "en": "Layer B",
   "color": "#b45309",
   "desc": "这一层回答什么",
   "count": 0
  }
 ],
 "cards": [
  {
   "id": "A-01",
   "layer": "A",
   "title": "示例卡片标题",
   "oneliner": "一句话说清这张卡的核心结论。",
   "mechanism": [
    "机制第一条",
    "机制第二条"
   ],
   "code": [
    "类名或配置项：说明"
   ],
   "reuse": [
    "复用清单第一条"
   ],
   "interview": "面试时的一句话表达。",
   "pitfall": "最常见的错误做法。",
   "source": "来源：章节或文档",
   "tags": [
    "示例"
   ]
  }
 ]
};

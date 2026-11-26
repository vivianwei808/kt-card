# 生成脚本

`data.js`、`cards/*.md`、`topics.js` 由这几个文件生成，跑一遍就整体重写：

```bash
python3 render2.py
```

- `layers.py` 八个分层定义（key、名称、颜色、说明）。
- `cards_mpc.py`  M/P/C 三层共 19 张卡。
- `cards_lh.py`   L/H 两层共 30 张卡。
- `cards_igr.py`  I/G/R 三层共 38 张卡。
- 输出目录写死在 `render2.py` 里的 `LIB`，换机器先改这一行。

K8s 专题用独立脚本，输出 `topics/k8s-enterprise/`，并把注册项合并进 `topics.js`：

```bash
python3 render_k8s.py /tmp/k8s-kb/cards
```

- 卡片 JSON 按层分文件（M/W/S/C/R/E/O/A/D.json），脚本校验 id 清单与字段完整性。
- 重跑只重写 K8s 专题目录和它在 `topics.js` 的注册项，不动其他专题。

后续加卡片有两条路：直接改 `topics/agent-loop-graph/data.js`（快，但重跑脚本会覆盖）；或者改这三个卡片模块再重跑（内容留档，推荐）。两种方式都能用，选一种坚持就行。

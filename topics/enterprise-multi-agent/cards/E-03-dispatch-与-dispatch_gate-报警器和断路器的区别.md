---
id: E-03
layer: 生产工程化
title: dispatch 与 dispatch_gate：报警器和断路器的区别
source: 第31讲；m5l31/README.md
tags: [可靠性, 护栏, 异常]
---

# E-03 dispatch 与 dispatch_gate：报警器和断路器的区别

> 普通钩子里的异常吞掉继续跑，护栏钩子的异常向上传播并拦住工具，两种分发不能混用。

## 机制

- dispatch 用于观测类钩子：某个 handler 抛异常就记下来，继续执行下一个，不影响主流程。
- dispatch_gate 用于阻断类钩子：GuardrailDeny 向上传播，工具不再执行，其他异常仍然吞掉。
- 分开的原因很实际：日志组件坏了不该阻断业务，护栏判定了违规必须阻断。
- CrewAI 的 before_tool_call 装饰器内部有 except Exception: pass，会吞掉护栏异常。
- 解决方案是 pending_deny：护栏里把拒绝原因存起来并 return False 阻止工具，再在 step_callback 里重新抛出，因为 step_callback 不在 try/except 保护里。

## 代码落点

- `m5l31/hook_framework/registry.py`：dispatch 与 dispatch_gate 两条路径
- `m5l31/README.md`：pending_deny 模式的流程图
- `m5l31/hook_framework/crew_adapter.py`：step_callback 里重新抛异常

## 复用清单

- 观测和阻断分两条分发通道，别让日志故障拖垮业务。
- 遇到框架吞异常，找一个不会被吞的回调点把异常补抛出去。
- 把 pending 状态显式存起来，比依赖异常栈可靠。

## 面试一句话

护栏和日志走两条分发：日志异常吞掉继续，护栏异常必须传播；CrewAI 的工具装饰器会吞异常，我用 pending_deny 在 step_callback 里补抛，保证违规调用真的被拦住。

## 常见坑

护栏写在 before_tool_call 里直接 raise，被框架吞掉，工具照样执行，还以为护栏生效了。

---

来源：第31讲；m5l31/README.md

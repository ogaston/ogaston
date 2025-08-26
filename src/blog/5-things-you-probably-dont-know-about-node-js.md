---
layout: layouts/post.njk
title: 5 Things You Probably Don't Know About Node.js
description: Discover five less-known but important aspects of Node.js, from the call stack and event loop to circular dependencies and external libraries.
date: 2019-09-11
tags: [Engineering]
cover: https://images.ctfassets.net/szbztvipepx3/6Mkbzl9DAw7qdeaiWXv1fB/e750ccd7c622aab8df282eb02bf04307/level.jpg?w=786&h=442&q=50&fm=webp

prevPost:
  url: /blog/what-is-utils-do-and-how-it-help-you-with-applications-for-dominicans/
  data:
    title: What is Utils-Do and How It Might Help You Build Applications for the Dominican Republic
nextPost:
  url: /blog/how-to-boost-your-career/
  data:
    title: How to Boost Your Career as a Software Developer/Architect

toc:
  - { id: intro, text: "Introduction" }
  - { id: callstack, text: "The Call Stack is Part of the V8 Engine" }
  - { id: event-loop, text: "So, Is the Event Loop Inside V8 Too?" }
  - { id: exit, text: "Why Does Node.js Exit?" }
  - { id: dependencies, text: "Node External Dependencies" }
  - { id: without-v8, text: "Node.js Could Be Used Without V8" }
  - { id: circular, text: "Circular Module Dependencies Are Allowed" }
  - { id: conclusion, text: "Conclusion" }
---

<h2 id="intro">Introduction</h2>

A few days ago, I was reading an article about how Node.js child processes work and how the main process runs on a single core. After that, I started digging into the Node.js repo to learn more about its internal behavior.  

These are the kinds of things you’ll never find in an online course. That’s why I’m writing this post.  

Most learning resources on Node.js (especially online courses) focus on external packages rather than the runtime environment itself. Developers who only rely on those resources remain—hypothetically speaking—“average.”  

Now, let’s explore some tricky aspects of Node.js that can **level up your proficiency** with this ecosystem.  

---

<h2 id="callstack">1. The Call Stack is Part of the V8 Engine</h2>

Yes, it is. **V8 uses the Call Stack** as part of its architecture to keep track of function invocations.  

So, what is the Call Stack? It’s a data structure that records all function calls. Every time we invoke a function, it takes a reference and pushes it to the stack, including nested calls and recursive calls.  

![callstack](https://i.ytimg.com/vi/2ZH_1d8TYVg/maxresdefault.jpg)

From *Philip Roberts: "What the heck is the event loop anyway"* at JSConf EU.  

It’s important to keep the Call Stack from being overloaded because there’s only **one Call Stack per Node process**. The stack only pops a function once it finishes execution and returns a value.  

---

<h2 id="event-loop">2. So, Is the Event Loop Inside V8 Too?</h2>

No. The **event loop is provided by the libuv library**, not V8.  

Libuv is responsible for handling external events that rely on Node APIs. It picks tasks from event queues and pushes their callbacks into the Call Stack. Functions like `setTimeout` or `fs.readFile` belong to the Node API (via libuv), not to JavaScript itself.  

The event loop decides what to execute next when the Call Stack is empty.  

*Node.js event loop architecture — Andranik Keshishyan*  

![Node.js event loop architecture — Andranik Keshishyan](https://miro.medium.com/max/700/1*xm_WajiPlaOeJWcqgJb1xQ.png)

---

<h2 id="exit">3. Why Does Node.js Exit?</h2>

When a Node program runs, it automatically starts the event loop and keeps iterating while there’s something to execute.  

When both the Call Stack and the event loop have nothing left to do, the process exits.  

However, Node **keeps the process alive** when you start something like a timer or an HTTP server.  

---

<h2 id="dependencies">4. Node External Dependencies</h2>

The Node.js environment depends on several external libraries for low-level operations in JavaScript. These include:  

- **libuv**  
- **http-parser**  
- **c-ares**  
- **OpenSSL (crypto)**  
- **zlib**  

![v8](http://p0.qhimg.com/t0157e547f53940dfd6.png)

All of these are **external to Node**. They have their own source code, their own licenses, and Node simply uses them.  

It’s good to know this so we don’t unfairly blame everything on Node 😉.  

📖 [Read more about Node.js internal architecture](https://www.zcfy.cc/original/architecture-of-node-js-internal-codebase-506.html)  

---

<h2 id="without-v8">5. Node.js Could Be Used Without V8</h2>

Node.js requires a **JavaScript VM** to run the main process, but it doesn’t necessarily need V8.  

V8 is Google’s open-source project, not originally built by the Node.js team. While uncommon, you could use other engines such as **Chakra**.  

🔗 [View Chakra repo on GitHub](https://github.com/microsoft/ChakraCore)  

---

<h2 id="circular">6. Circular Module Dependencies Are Allowed</h2>

If two modules require each other, will it throw an error? **No.**  

In these cases, Node.js will issue a warning. When the circular `require` loop starts, the first file won’t be fully loaded yet, so the second file will receive only a **partial version** of the first.  

```js
// module1.js
require("./module2");

// module2.js
require("./module1");
```

<h2 id="conclusion">Conclusion</h2>

I hope you learned something new about Node.js internals and that this knowledge helps you in your journey with this amazing environment.

If you found these topics exciting, let me know in the comments!
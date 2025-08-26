---
layout: layouts/post.njk
title: How I Launched a Simple but Important Application in a Week (or Less)
description: A story of how I built and deployed a raffle application for a company event in less than a week.
date: 2019-12-16
tags: [Engineering,Career]
cover: https://images.ctfassets.net/szbztvipepx3/7lbfbmQzfD9sRIZSej6UDn/40ced51abaef2e583bcc2c1b68d0bd92/beach-1246646_1920.jpg?w=786&h=589&q=50&fm=webp

prevPost:
  url: /blog/5-things-you-probably-dont-know-about-node-js/
  data:
    title: 5 Things You Probably Don't Know About Node.js
nextPost:
  url: /blog/what-is-utils-do-and-how-it-help-you-with-applications-for-dominicans/
  data:
    title: What is Utils-Do and How It Might Help You Build Applications for the Dominican Republic

toc:
  - { id: intro, text: "Introduction" }
  - { id: requirements, text: "What Did I Have to Do?" }
  - { id: how, text: "How Did I Do It?" }
  - { id: event, text: "The Event Day" }
  - { id: conclusion, text: "Conclusion" }
---

<h2 id="intro">Introduction</h2>

Since I can remember, I’ve loved to challenge myself. Pushing my limits is a hard but exciting way to see how far I can go in tough situations. It’s not always good or healthy to put yourself in these storms, so I don’t recommend it to everyone—but for me, it’s thrilling.  

A few days ago, the company where I work was preparing for its **Annual Employees’ Party**. At this event, they raffle different gifts to employees using a very old-school method:  

1. Print the full list of employees (about 600 people).  
2. Cut each page into little pieces of paper.  
3. Fold them and put them into a container.  
4. A volunteer randomly picks a piece, and the printed name becomes the winner.  

It was clear this process involved **too much unnecessary work**. And as we know, almost anything can be improved with code.  

My product manager suggested automating the process but warned me that if I took on the task, the solution had to be ready in less than 10 days—or it would have to wait until next year.  

I accepted the challenge.  

---

<h2 id="requirements">What Did I Have to Do?</h2>

We gathered the requirements and tried to keep things as simple as possible:  

- Create a **responsive web app** (the event staff would use tablets).  
- Include just **two modules**: Assistance and Raffle.  
- Add a **login system** and track every change by logged-in users.  

---

<h2 id="how">How Did I Do It?</h2>

The easiest and fastest way to launch an app like this was by using **Firebase**.  

Firebase is Google’s platform that provides backend services (Backend-as-a-Service). It was a huge ally because it made it **ridiculously easy to implement authentication** and gave me access to **Firestore**, a NoSQL real-time database—exactly what I needed.  

With Firebase handling the backend, I could fully focus on the **frontend**.  

For that, I used **Create React App (CRA)** to quickly scaffold the project and start coding.  

My focus was entirely on building a **functional MVP**. I didn’t care about styling at first—just getting it working. After **four days**, I had covered all requirements, fully tested the app, and received approval from the party staff.  

Finally, I wrote a **Node.js script** to upload all the employee data (name, code, department) and then polished the UI a bit.  

---

<h2 id="event">The Event Day</h2>

When the event arrived, I was nervous. Around **400 people** were watching the big screen where the application would be used.  

- It was the first time anyone saw it.  
- The users were inexperienced.  
- A long-standing tradition was being disrupted.  

I was anxious—but the crowd’s reaction was better than I expected. The app worked smoothly with **almost no issues**, and every raffle was clear and successful.  

---

<h2 id="conclusion">Conclusion</h2>

I know this was a unique situation, and not every challenge turns out like this. But as I said at the beginning, challenges make me stronger and push me beyond my limits.  

This case was successful, and it left me with two important lessons:  

1. **Trust yourself** — Before taking a risk, know how far you can go and how much you’re willing to push yourself.  
2. **Focus on functionality first** — Always prioritize the **MVP and core features**. Make your product usable before worrying about details or style.  

I hope this story inspires someone and gives you the little bit of motivation you might need to take on your own challenge.  

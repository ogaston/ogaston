---
layout: layouts/post.njk
title: Identity Fraud in the Age of Deepfakes, We Can No Longer Trust a Video
description: Explore how deepfakes are created, the latest attacks on KYC systems, and the tools being developed to detect synthetic media.
date: 2026-03-09
tags: [Engineering, Security, Deepfakes, Cybersecurity]
cover: https://www.ogaston.com/assets/img/blogs/deepfake.jpg

prevPost:
  url: /blog/what-is-utils-do-and-how-it-help-you-with-applications-for-dominicans/
  data:
    title: What is Utils-Do and How It Might Help You Build Applications for the Dominican Republic
nextPost:
  url: /blog/ai-agents-doing-atps-is-the-biggest-threat-of-this-decade
  data:
    title: AI Agents doing APTs is the Biggest Threat of this decade

toc:
  - { id: intro, text: "Introduction" }
  - { id: tools, text: "What tools are used today to make a Deepfake?" }
  - { id: attacks, text: "What are the latest attacks? (The Problem of Carding and KYC)" }
  - { id: prevention, text: "What tools are being implemented to prevent this?" }
  - { id: summary, text: "In summary" }
---

<h2 id="intro">Introduction</h2>

If you've been following cybersecurity news, you've surely heard about "Deepfakes." Basically, it's using artificial intelligence to superimpose another person's face onto a video or even onto a real-time video call. Although it sounds like unattainable Hollywood technology, the reality is that nowadays anyone with a decent computer can do it.

<h2 id="tools">1. What tools are used today to make a Deepfake?</h2>

You don't need a secret lab or giant servers. On the internet (and especially exploring GitHub repositories), there are very powerful and easy-to-install open-source projects:

- **DeepFaceLab**: This is the standard and most comprehensive tool. It requires a bit of work to "train" the model with many photos, but the result is a very high-quality fake video.

- **Roop / FaceFusion**: These are more dangerous because of how easy they are. They allow you to swap a face using just a single photo of the victim, without the need for prior training.

- **Avatarify / DeepFaceLive**: These are specifically designed for real-time video calls. An attacker installs this, connects it to a virtual camera (like OBS Studio), and can join a Google Meet or Zoom call wearing someone else's face.

<h2 id="attacks">2. What are the latest attacks? (The Problem of Carding and KYC)</h2>

The craziest recent case happened in Hong Kong, where a financial employee was tricked during a video call into transferring $25 million dollars. The attackers cloned the face and voice of his boss and other coworkers using real-time Deepfakes.

But the everyday problem is less publicized and is directly linked to **Carding** (the theft and fraudulent use of credit cards). It works like this:  
A criminal buys stolen card data on the dark web. To spend that money or withdraw it in cash without being traced, they need to open fake digital bank accounts or cryptocurrency wallets. The problem for the attacker is that nowadays almost all financial apps require **"KYC" (Know Your Customer)** , which involves recording a short video of yourself moving your head or holding your ID to verify you are who you say you are.  

That's where Deepfakes come in: attackers use programs like DeepFaceLive to fool banks' biometric systems, putting the victim's face from the card over their own in the live video. They manage to trick the camera, open the bridge account, drain the card's balance, and disappear.

<h2 id="prevention">3. What tools are being implemented to prevent this?</h2>

Fortunately, the defenders are not standing idly by. To stop this, **"liveness" detection systems** are being created:

- **Intel FakeCatcher**: This tool is incredible. It analyzes video pixels to detect blood flow in the face (photoplethysmography). Intel's AI knows that if the face in the video doesn't have a real, imperceptible human "pulse," it's a Deepfake.

- **Microsoft Video Authenticator**: It analyzes the video looking for subtle fading, grayscale pixels, or flaws around the edges of the face and neck that the normal human eye doesn't notice, but that the AI leaves behind when rendering.

- **Cryptographic Watermarks (C2PA)** : This is a new protocol that aims to insert unalterable data from the moment the video is captured by the hardware (the physical camera), to prove that the media was not altered by virtual camera software.

<h2 id="summary">In summary</h2>

The barrier to entry for creating this type of deception has dropped dramatically. As developers and IT professionals, we need to start designing systems assuming that seeing someone on a live video is no longer absolute proof of identity.

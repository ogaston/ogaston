---
layout: layouts/post.njk
title: Can Multi-Agent Systems help us fight misinformation?
description: Let's explore a potential solution I built using a multiagent system that reduces bias and manipulation in the news.
date: 2026-09-12
tags: [Engineering,Product]
cover: https://www.ogaston.com/assets/img/blogs/can-multi-agent-sytems-help-us-to-fight-misinformation.png

prevPost:
  url: /blog/5-things-you-probably-dont-know-about-node-js/
  data:
    title: 5 Things You Probably Don't Know About Node.js
nextPost:
  url: /blog/ai-agents-doing-atps-is-the-biggest-threat-of-this-decade/
  data:
    title: AI Agents doing APTs is the Biggest Threat of this decade

toc:
  - { id: whats-the-problem, text: "What's the problem?" }
  - { id: high-level-solution, text: "High Level Solution" }
  - { id: the-idea, text: "The Idea" }
  - { id: the-pipeline, text: "The Pipeline" }
  - { id: the-auditory, text: "The Auditory" }
  - { id: some-of-the-challenges-and-limitations, text: "Some of the challenges and limitations" }
  - { id: is-this-even-useful, text: "Is this even useful?" }
  - { id: next-steps, text: "Next steps" }
---

<h2 id="whats-the-problem">What's the problem?</h2>


Social media and newspapers are flooded with biased, incomplete or misleading information. At this point everyone knows that each channel has its own agenda, political influence and a preferred framing of specific kinds of situations. Unfortunately people rarely explore or consume different perspectives which makes them unable to clearly identify these tactics and develop a critical point of view towards an event.

I go deeper into the issue in my article [A hyperconnected world; more news but less informed (Spanish)](https://medium.com/@ogaston/en-un-mundo-hiperconectado-tenemos-m%C3%A1s-informaci%C3%B3n-que-nunca-pero-estamos-menos-informados-097856a7e266). For this one, we're going to discuss the technical details of my proposed solution [ojocritico.org](ojocritico.org).

<h2 id="high-level-solution">High level solution</h2>

First of all, this is a worldwide problem, and it's not realistic for me to say that I can create a worldwide solution, so I scoped the case study to a particular context (my home country, the Dominican Republic) while keeping the implementation country-agnostic.

State of the art already shows that LLMs are able to neutralize or [detect bias and framing in presented information](https://dl.acm.org/doi/10.1145/3706598.3713716). Also, as humans, we can reach a better outcome by [debating or collaborating](https://arxiv.org/abs/2505.08532) to analyze a piece of information.

> The idea is simple: cluster same-event coverage and rewrite it as a neutral article that keeps attributed reporting but drops loaded framing.

<h3 id="the-idea">The Idea</h3>

I'm not a reporter. I can't investigate or physically collect information about every story, so I have to find another way to get to "know" what happened.

I combine multiple sources, separate claims from framing, and then validate what is actually true.

Let's see an example:

- **Source A** says: the president wants to attack freedom of speech in the country.
- **Source B** says: there's a new rule banning memes of politicians.
- **Source C** says: we have a new information law that's going to affect all of us.

From there, we can extract the following claims: 

- The *president* is *attacking freedom of speech*
- There's a *new law*
- The new law *protects the image of politicians*

Based on those claims, we now have a rough idea of what's going on, but we still need to figure out which of them are true or false.

How can we validate it? In this case it is fairly straightforward; we simply need to know: 

- what the president said.
- what the law says.
- and what the law bans when it comes to politicians.

Once we validate the list of claims, we'll be able to tell the story without any bad framing on it.


<h3 id="the-pipeline">The pipeline</h3>

I needed to establish a way to keep the ingestion, preprocessing, audit and exposition independent from each other.

> **Ingestion** -> **Preprocessing** -> **Audit** -> **Exposition**

**Ingestion**: A list of sources, "represented as classes" that are able to scrape the news (using [crawl4ai](https://crawl4ai.com/)) every 3 hours and incrementally grow the local repository of news. Then, I added each article to Postgres and a Chroma vector database (`news_index`) to be used for the preprocessing step.

**Preprocessing**: Groups those time-windowed articles in "clusters". These clusters represent the semantic relationship between articles, so we know that they talk about the same event. For this [agglomerative clustering](https://www.geeksforgeeks.org/machine-learning/agglomerative-clustering/) I use a distance threshold instead of a fixed `k` because the number of distinct events per window is unknown.

- Embed model: `paraphrase-multilingual-MiniLM-L12-v2` (Spanish-friendly, cheap to run locally via sentence-transformers / HuggingFace)
- Metric: cosine distance, average linkage
- Threshold: `0.27` (≈ similarity 0.73)
- Window: 3 days (`America/Santo_Domingo`)
- Batch: up to 650 unprocessed articles; only the largest / most diverse clusters (limit 30) get LLM descriptions and become audit candidates.

**Audit**: A LangGraph multi-agent workflow that performs the task explained in the previous section (batch 30, newest member within 1 day by default) and produces a brand new article with better framing.

**Exposition**: A simple FastAPI backend and an MCP server for agent clients.


<p align="center">
  <img 
    src="/assets/img/blogs/multi-source-news-verification-pipeline.png" 
    alt="Multi-Source News Verification Pipeline"
    style="max-width: 100%; height: auto;"
  />
</p>


<h3 id="the-auditory">The audit graph</h3>

Once we have the clusters, I created six focused agents instead of one megaprompt that share a common state throughout the process.

1. We start with the **claim extractor**, which takes all these atomic claims and compiles a list of verifiable facts for the cluster.

2. Then the **fact-checker** uses a trusted search tool to validate all the *claims* (whether through its own learned knowledge or by looking them up). This is not always possible to say, so the result could be one of these three: `supported`, `contradicted` or `insufficient evidence`.

This *trusted search* is a [Serper.dev](https://serper.dev/) implementation that only searches trusted sources, such as domains `*.gob.do`, regional fact-checkers, UN/WHO-style orgs.

> Fact-checking itself is *constrained web search*, not vector RAG, so verification isn't circular.

3. While we're fact-checking claims, in parallel, the agent **Rhetoric Reviewer** checks the rhetoric within the text, so we can detect loaded language and the framing intent and fallacies.

4. Now that we have everything in place, we can call the **Judge** agent to determine what should be considered a fact and what should be explicitly debunked (it labels as `absolutely_false`, `not_verifiable`, and `narrative_to_keep` with attribution).

5. The agent **Analyzer** is in charge of looking at the results of that cluster and what each outlet contributes to the truth. So we can get a sense of the agenda, or the kinds of topics, each outlet normally attacks or defends. 

6. Finally, a **Synthesizer** agent produces a new article, drawing on the analysis and the judge's results to make clear statements about what should be reported. 

There's an additional, optional step that will be creating an image for every relevant article (the relevancy score is determined by how much coverage an event gets across multiple sources).

<h2 id="stack-and-numbers">Stack and numbers</h2>

| Layer | Choice |
|---|---|
| Orchestration | LangGraph |
| Audit LLM | DeepSeek (`deepseek-chat`) via OpenAI-compatible API |
| Light LLM tasks | DeepInfra (cluster descriptions, images; currently Qwen-class for cost) |
| API / admin | FastAPI + SQLAdmin |
| Persistence | Postgres (source of truth) |
| Vectors | Chroma + LlamaIndex + `paraphrase-multilingual-MiniLM-L12-v2` |
| Evidence search | Serper.dev, domain-allowlisted |

<h2 id="some-of-the-challenges-and-limitations">Some of the challenges and limitations</h2>

You may have already noticed that having a "trusted source" of information could itself be another way of "framing" the news. However, there's no other way to "know" whether or not something is verified. Some governments misinform their citizens, which is why we also treat articles from regional or independent organizations as verified. There's still some level of bias coming from those sources, but that's something we can't control.

Another limitation is that, right now, we're only considering the views of two LLMs. I chose Llama and DeepSeek (to get different world perspectives), but ideally we'd have multiple LLMs cross-referencing the results at each step. That wouldn't be efficient or realistic, though.

Real-time information also isn't on the table, because we need to wait for enough outlets to publish articles about an event to form a meaningful cluster and extract useful, complete information from it.

> I don't have a published human-labeled benchmark yet. Informal review while building showed good performance but some expected failures (over-dropping topics, small clusters that look like "consensus" when they're just one wire story reprinted, and so on).

<h2 id="is-this-even-useful">Is this even useful then?</h2>

Absolutely, this is the first step of making society more transparent. But more than that, this serves as a base architecture for similar validation problems. We could build a similar version to determine whether a video is fake or not.

I've also enabled an MCP server so your agents can leverage the repository and access these news items and source scores.

You can find the MCP server here: [news-mcp.ogaston.com](https://news-mcp.ogaston.com/)

<h2 id="next-steps">Next steps</h2>

I hope everyone can join this mission and at least suggest improvements to this architecture. Here are some of the things I'm planning to do next:

1. Benchmark the judger against a small human-labeled set
2. Add a second audit LLM for selective debate on low-confidence clusters
3. Revisit clustering (threshold sweep, maybe HDBSCAN) once more weeks of embeddings exist
4. Surface confidence and claim verdicts more explicitly in the reader UI

Feel free to explore and contribute here [github.com/ogaston/multi-source-news-verification-pipeline](https://github.com/ogaston/multi-source-news-verification-pipeline)

Until next time.

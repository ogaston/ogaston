---
layout: layouts/post.njk
title: What is Utils-Do and How It Might Help You Build Applications for the Dominican Republic
description: a JavaScript package designed to simplify application development for the Dominican Republic.
date: 2019-09-20
tags: [Engineering]
cover: https://images.ctfassets.net/szbztvipepx3/LRtlzFPiutB8nDAjBNYap/6e793fa7b91657b688f2db780f54b9f5/Sin_t__tulo.png?w=786&h=442&q=50&fm=webp

nextPost:
  url: /blog/how-to-boost-your-career/
  data:
    title: How to Boost Your Career as a Software Developer/Architect

toc:
  - { id: intro, text: "Introduction" }
  - { id: what-is, text: "What is Utils-Do?" }
  - { id: features, text: "What Can You Do?" }
  - { id: geo, text: "Geo Utilities" }
  - { id: validator, text: "Validator Utilities" }
  - { id: purpose, text: "Purpose of the Repository" }
---

<h2 id="intro">Introduction</h2>

On one occasion, I was developing a local web application whose requirement was to **segment users by municipality**. Since the app was designed for the Dominican Republic (where I was born and currently live), I tried to find a package that could speed up the process.  

As expected, I found nothing. That’s why I decided to create **Utils-Do**.  

---

<h2 id="what-is">What is Utils-Do?</h2>

**Utils-Do** is a JavaScript package created to provide commonly used functions when building applications for the **Dominican Republic’s local market**.  

---

<h2 id="features">What Can You Do?</h2>

Currently, the library exports two main objects:  

- **Geo** — Handles methods related to the geographic information of the country.  
- **Validator** — Provides validation for common Dominican data formats.  

---

<h2 id="geo">Geo Utilities</h2>

The `Geo` object contains methods to work with provinces and municipalities.  

```js
const { Geo } = require("utils-do");

Geo.getProvinces();
// ["Azua", "Bahoruco", "Barahona", "Dajabón", "Duarte", "El Seibo", "Elías Piña", "Espaillat", "Hato Mayor", ...]

Geo.getMunicipalitiesOf("La Romana");
// { Guaymate: [], La Romana: ["Caleta"], Villa Hermosa: ["Cumayasa"] }

Geo.getProvinceByMunicipality("Santo Domingo Este");
// ["Santo Domingo"]
```

<h2 id="validator">Validator Utilities</h2>

The Validator object includes methods for checking common Dominican data patterns, such as **ID cards** and **telephone numbers**.


```js
const { Validator } = require("utils-do");

Validator.isAnIde("DO45879189"); 
// false

Validator.isATel("8095564125"); 
// true

Validator.formatToTel("8095564125"); 
// "(809) 556-4125"
```

<h2 id="purpose">Purpose of the Repository</h2>

This is an open-source project designed to centralize all the functions developers might need when creating applications for the Dominican market.

- Written entirely in JavaScript
- Contains no external dependencies
- Available via [npm](https://www.npmjs.com/package/utils-do) and [GitHub](https://github.com/ogaston/utils-do)

You can learn more about this package and its usage by visiting its repositories.
---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

Hi! I am **Jaeho Jeon** (전재호, 田宰昊), a Ph.D. student at [DGIST](https://www.dgist.ac.kr/) (Daegu Gyeongbuk Institute of Science and Technology), advised by Prof. [Young-Sik Kim](https://scholar.google.com/citations?hl=en&user=pw4KEiAAAAAJ) in the [PACL](https://sites.google.com/view/pacl/home) lab. My research focuses on **side-channel analysis**.

My goal is to become a uniquely recognized expert in side-channel analysis, so that anyone in Korea who needs side-channel analysis naturally turns to me or the PACL lab. Building on side-channel analysis as my core, I plan to gradually expand my research into computer architecture, quantum computing, networking, and coding theory.

<a href='https://scholar.google.com/citations?user=h2pBQrcAAAAJ&hl=en'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>


# 🔥 News
<div class='news-box' markdown='1'>
- *2026.10*: &nbsp;🏆 Two of our papers won awards at the **2026 National Cryptography Contest** (국가암호공모전, Category B): the HQC codeword-masking paper (Excellence Award, 우수상) and the SDitH side-channel paper (Encouragement Award, 장려상).
- *2026.09*: &nbsp;🏆 Grand Prize, **4th KICS HFR Paper Award** (제4회 KICS HFR 논문대상 대상수상) — Yongseong Park, Hyunseok Jeong, **Jaeho Jeon**.
- *2026.09*: &nbsp;🎉🎉 Our paper "RB-LDC: Redundancy-Balanced Latent Coding for Robust Diffusion" is accepted to **NeurIPS 2026**.
- *2026.08*: &nbsp;🎉🎉 Our paper "Codeword Masking Can Be Harmful Under Replay Attacks on HQC" is accepted to **ASIACRYPT 2026**.
- *2026.06*: &nbsp;🏆 Our team passed the DGIST preliminary round of the **GRAVITY 2026** Startup Competition ($10,000 prize). [[slides]](files/GRAVITY2026.pdf) [[photo]](images/gravity2026.jpg)
- *2025.11*: &nbsp;🏆 The DGIST UGRP team I assisted as a teaching assistant won the **Grand Prize** at the NIA PQC Migration Challenge ($2,000 prize) [[news]](https://www.newsis.com/view/NISX20251204_0003427839) [[photo]](images/pqc_challenge2025.jpg) and the **Grand Prize** for the Undergraduate Best Paper Award at the 2025 KICS Fall Conference [[photo]](images/kics2025.jpg).
</div>

# 📝 Publications 

- **RB-LDC: Redundancy-Balanced Latent Coding for Robust Diffusion**  
  Hyunseok Jeong, **Jaeho Jeon**, Young-Sik Kim  
  *The Fortieth Annual Conference on Neural Information Processing Systems (**NeurIPS 2026**)*

- **Codeword Masking Can Be Harmful Under Replay Attacks on HQC**  
  **Jaeho Jeon**, Yongseong Park, Jaeyeon Lee, Suseong Lee, Donghyen Kim, Young-Sik Kim  
  *International Conference on the Theory and Application of Cryptology and Information Security (**ASIACRYPT 2026**)*  
  [[ePrint 2026/071]](https://eprint.iacr.org/2026/071)

# 🎖 Honors and Awards
- *2026.10*, **2026 National Cryptography Contest (국가암호공모전)**, Category B: Cryptographic Technology Application and Utilization (암호 기술 응용 및 활용 분야). Two papers awarded:
  - **Excellence Award (우수상)**: "Codeword Masking Can Be Harmful Under Replay Attacks on HQC" — **Jaeho Jeon**, Yongseong Park, Jaeyeon Lee, Suseong Lee, Donghyen Kim, Young-Sik Kim.
  - **Encouragement Award (장려상)**: "Syndrome Decoding out of the Head: Structure-Aided Side-Channel Witness Recovery on SDitH" — Jaeyeon Lee, **Jaeho Jeon**, Young-Sik Kim.
- *2026.09*, **Grand Prize, 4th KICS HFR Paper Award (제4회 KICS HFR 논문대상 대상)**, Yongseong Park, Hyunseok Jeong, **Jaeho Jeon**. Total prize: $10,000.
- *2026.06*, **GRAVITY 2026 Startup Competition**, passed the DGIST preliminary round with a hardware-hacking (side-channel) certification service for cryptographic products. Prize: $10,000. \| [\[slides\]](files/GRAVITY2026.pdf) \| [\[photo\]](images/gravity2026.jpg)

# 🏫 Teaching
- *2026.06 - 2026.09*, **Teaching Assistant**, Pre-URP, DGIST. Mentored a student team on the project *"Reading the Current to Break Ciphers: Side-Channel Analysis on RSA/AES"* (advisor: Prof. Young-Sik Kim). \| [\[photo\]](images/preurp2026.jpg)
- *2025.03 - 2025.12*, **Teaching Assistant**, UGRP (Undergraduate Group Research Program), DGIST. Supported the student team that built an optimized PQC implementation on ARM Cortex-M4. The team won two **Grand Prizes (최우수상)**: the PQC Migration Challenge (양자내성암호 전환기술 공모전) hosted by the National Information Society Agency (NIA, 한국지능정보사회진흥원), prize $2,000 [\[photo\]](images/pqc_challenge2025.jpg), and the Undergraduate Best Paper Award at the 2025 KICS Fall Conference (한국통신학회 추계종합학술발표회) [\[photo\]](images/kics2025.jpg). \| [\[news\]](https://www.newsis.com/view/NISX20251204_0003427839)

# 🤝 Academic Services
- *2026.07.06 - 2026.07.10*, **Staff**, DGIST AI & Crypto Summer Camp 2026. Organized the camp and hosted the rump session. \| [\[photo 1\]](images/cryptocamp2026_1.jpg) [\[photo 2\]](images/cryptocamp2026_2.jpg) [\[photo 3\]](images/cryptocamp2026_3.jpg)
- *2026.04 - 2026.09*, **President**, DGIST Graduate Student Council (대학원단 대표), representing graduate students of all departments, DGIST.
- *2026.03 - present*, **Graduate Student Representative**, Department of Electrical Engineering and Computer Science (전기전자컴퓨터공학과 대학원 대표 학생), DGIST.
- *2024.10.30*, **Treasurer (총무)**, 2024 EECS & AI DGIST Student Conference & Happy Hour, DGIST. \| [\[photo 1\]](images/eecs_conf2024_1.jpg) [\[photo 2\]](images/eecs_conf2024_2.jpg) [\[photo 3\]](images/eecs_conf2024_3.jpg)

# 📖 Educations
- *2026.02 - present*, Ph.D. student, Department of Electrical Engineering and Computer Science, [DGIST](https://www.dgist.ac.kr/), Daegu, South Korea.
- *2024.02 - 2026.02*, M.S., Department of Electrical Engineering and Computer Science, [DGIST](https://www.dgist.ac.kr/), Daegu, South Korea.
- *2017.02 - 2024.02*, B.S., School of Undergraduate Studies, [DGIST](https://www.dgist.ac.kr/), Daegu, South Korea.

# 🐱 Cats

<div class="cat-grid">
<div class="cat-card"><a href="images/cat_kongkong.jpg"><img class="cat-avatar" src="images/cat_kongkong.jpg" alt="Kongkong"></a><div class="cat-name">Kongkong <span class="cat-kr">콩콩</span></div><div class="cat-meta">♀ · born 2020 · with me since 2022</div><div class="cat-desc">Timid at heart, but very sweet and affectionate.</div></div>
<div class="cat-card"><a href="images/cat_kongkongkong.jpg"><img class="cat-avatar" src="images/cat_kongkongkong.jpg" alt="Kongkongkong"></a><div class="cat-name">Kongkongkong <span class="cat-kr">콩콩콩 · Kong³</span></div><div class="cat-meta">♀ · born Dec 2021 · foster cat since Feb 2026</div><div class="cat-desc">Very affectionate, but occasionally has a temper.</div></div>
</div>

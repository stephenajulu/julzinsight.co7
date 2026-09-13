# Julz Insight — GoHugo Sovereign Web Platform

> **"The Engine of Digital Sovereignty"**  
> Africa’s No. 1 Fully Managed, Sovereign & Performant Open-Source Business Infrastructure for Enterprises.

---

## 🏛️ Architectural Overview & Delivered Translation

This repository is the official **GoHugo** enterprise implementation of the **Julz Insight** web presence, translated from the React/Vite codebase into a fast, zero-dependency, static Hugo engine utilizing native HTML5 semantic markup, modular SCSS (compiled via Hugo Pipes), and reactive Vanilla JavaScript.

### Core Translation Pillars
1. **Hugo Extended & Hugo Pipes Asset Pipeline**:
   - SCSS written in clean, modular architecture (`_variables`, `_mixins`, `_base`, `_glass`, `_animations`, `_utilities`, `_components`).
   - Compiled via `resources.ToCSS` with minification and subresource integrity fingerprinting.
   - Zero Node.js runtime required in production.
2. **Structured Hugo Data Engine**:
   - All architectural tiers, cloud fabrics, regulated verticals, pipeline steps, telemetry metrics, and FAQs are modeled in [`data/infrastructure.json`](data/infrastructure.json).
3. **High-Fidelity Visual & Interactive Parity**:
   - **Cinematic Hero Stage**: CloudFront looping video background, 32-bar animated growing telemetry card with live SLA markers, and Instrument Serif italic accents.
   - **Global Dual Currency Engine**: Real-time reactivity between Kenyan Shillings (KES) and US Dollars (USD) across Hero, Tier pricing, InsightOS financial metrics, and ROI calculations.
   - **InsightOS Interactive Showcase**: 4-role switcher (CEO & Board View, Staff App Launcher with 8 workstation apps, DevOps & Security SRE with live terminal stream, and AI Agent Forge).
   - **Progressive Sovereign Architectural Tiers**: Interactive 5-tier selector with deep-dive technical specifications, eliminated pain points, AI agent readiness ratings, and component stacks.
   - **Interactive Capital Recovery & ROI Calculator**: Live employee headcount slider (5 to 500+ users), multi-tool SaaS sprawl selector, foreign exchange protection shield, and dynamic annual savings calculations.
   - **African Sovereign Data Residency Matrix**: Interactive category filtering for African Cloud Providers, Co-Location, On-Premise, and Secondary Global Failover.
   - **Mission-Critical Regulated Verticals**: FinTech (Apache Fineract), Healthcare (Bahmni), EdTech (Open edX), Logistics (Traccar).
   - **Zero-Trust Compliance & SIEM Defense**: Statutory mapping for Kenya Data Protection Act 2019, GDPR, ISO 27001, and US CLOUD Act immunity.
   - **Executive Advisory FAQ**: Interactive accordion with expandable technical guidance.
   - **Architecture Consultation Modal**: Tier pre-selection, in-region fabric selection, executive intake, and personalized confirmation disclosure.

---

## 🚀 Development & Build Instructions

### Prerequisites
- [Hugo Extended](https://gohugo.io/) (v0.120+ recommended, tested with v0.160.1+extended).

### Local Development Server
```bash
# Start the local development server with fast refresh
hugo server -D
```
The site will be available at `http://localhost:1313/`.

### Production Build
```bash
# Build the optimized, minified, and fingerprinted static site
hugo --minify
```
All production-ready assets and HTML will be generated into the `public/` directory.

---

## 📂 Project Structure

```
julzinsight.co7-hugo/
├── assets/
│   ├── js/
│   │   └── main.js          # Reactive Vanilla JS engine
│   └── scss/
│       ├── _animations.scss # Keyframes & motion curves
│       ├── _base.scss       # Reset, body & scrollbar styles
│       ├── _components.scss # Modular section styles
│       ├── _glass.scss      # Liquid-glass & backdrop filters
│       ├── _mixins.scss     # Breakpoints & mixins
│       ├── _utilities.scss  # Container & typography helpers
│       ├── _variables.scss  # Color palette & fonts
│       └── main.scss        # Root SCSS import manifest
├── content/
│   └── _index.md            # Homepage metadata
├── data/
│   └── infrastructure.json  # Tiers, providers, FAQs, telemetry
├── layouts/
│   ├── _default/
│   │   ├── baseof.html      # Master HTML5 skeleton
│   │   └── single.html      # Single page fallback
│   ├── index.html           # Homepage section assembler
│   └── partials/
│       ├── compliance.html  # Zero-Trust & statutory compliance
│       ├── faq.html         # Executive accordion FAQ
│       ├── footer.html      # Enterprise footer & newsletter
│       ├── head.html        # SEO, fonts, SCSS & JS bundle
│       ├── hero.html        # Cinematic hero & 32-bar chart
│       ├── hosting-matrix.html # Sovereign cloud residency
│       ├── insight-os.html  # Role switcher & OS window
│       ├── modal.html       # Consultation booking dialog
│       ├── navbar.html      # Floating navigation & drawer
│       ├── pipeline.html    # 4-Phase deployment visualizer
│       ├── roi-calculator.html # Dynamic capital calculator
│       ├── tier-explorer.html  # 5 Architectural tiers
│       └── trust-ticker.html   # Infinite open-source marquee
├── static/
│   └── robots.txt           # SEO robots specification
└── hugo.toml                # Site configuration & parameters
```

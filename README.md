# Julz Insight — Sovereign Enterprise Cloud & Infrastructure Platform

> **"The Engine of Digital Sovereignty"**  
> Africa's No. 1 Fully Managed, Sovereign & High-Performance Business Infrastructure for Enterprises.

---

## Executive Overview & Architectural Philosophy

This platform delivers enterprise-grade sovereign infrastructure designed specifically for African and multinational enterprises subject to data localization laws (such as the **Kenya Data Protection Act 2019**). 

Instead of forcing organizations into vendor-locked SaaS ecosystems that introduce foreign-exchange exposure and unilateral price hikes, Julz Insight deploys **fully managed, sovereign open-source business architectures** directly into certified Tier-3 sovereign data centers (such as Servercore Nairobi, Safaricom Enterprise Cloud, Konza Technopolis), private co-location, or on-premises client server rooms.

### Key Strategic Pillars:
1. **Audience First, Business-Driven Terminology**:
   - Technical jargon is minimized in favor of executive business outcomes (measurable ROI, KDPA compliance, business continuity, predictable local KES budgeting).
   - Core open-source engines are presented through their **deep enterprise capabilities** rather than technical software names:
     - **Sovereign Document Hub & EDMS**: Enterprise Electronic Document Management System, automated record archiving, granular access control, real-time document collaboration, and encrypted video conferencing (replacing SharePoint, Google Drive, and Zoom).
     - **Unified ERP & CRM**: End-to-end financial ledgers, eTIMS tax invoicing, customer sales pipeline (CRM), inventory tracking, and statutory payroll/HR (replacing Microsoft 365 Business Central, HubSpot, and Salesforce).
     - **Unified Identity & Single Sign-On (Zero Password Sprawl)**: Centralized identity provider with multi-factor authentication (MFA). Staff log in **once** and securely access every enterprise workstation app—eliminating the need to memorize or juggle 12 different passwords.
     - **Enterprise Knowledge Base & SOP Wiki**: Centralized corporate wiki, standard operating procedures, and relational team docs (replacing Notion and Confluence).
     - **Zero-Knowledge Password Vault**: AES-256 encrypted corporate password and secret management (replacing 1Password and LastPass).
     - **Digital E-Signatures**: Legally binding, cryptographically signed agreements under Kenya DPA & UNCITRAL guidelines (replacing DocuSign).
2. **Dual-Theme Executive Engine (Dark & Light Mode)**:
   - **Zero-FOUC (Flash of Unstyled Content)**: Synchronous early `<head>` inline script detects stored user preference or OS `prefers-color-scheme` prior to stylesheet execution.
   - **Interactive Switcher**: Sun/Moon toggle buttons embedded seamlessly in both the desktop navbar and the mobile slide-out drawer.
   - **Persistent Preference**: Stores choice in `localStorage` (`theme: 'light' | 'dark'`) and synchronizes dynamic `<meta name="theme-color">` values.
   - **WCAG 2.1 AAA Accessibility**: Light theme renders deep slate (`#0f172a`) on clean slate canvas (`#f8fafc`) delivering contrast ratios exceeding 7:1, light macOS-style InsightOS window chrome, and soft video backdrop overlay.
3. **A-la-Carte Modular Tier Flexibility**:
   - Clients are **never** forced into arbitrary tier upgrades. An enterprise can choose **Tier 03 (Productivity & Vault)** and request a **single dedicated module** from Tier 04 (e.g., Enterprise E-Signature Suite or Automated Workflows) as an a-la-carte add-on without paying for the entire higher-tier stack.
4. **Transparent Hosting & Third-Party Financials**:
   - The platform maintains strict infrastructure neutrality. Software retainers cover engineering setup, continuous management, security patches, and priority support. Underlying cloud hosting is billed directly by certified sovereign data centers (Servercore, Safaricom, Konza, iXAfrica, or client local hardware) with zero vendor markup.
5. **Tier Status Transparency**:
   - **Tier 04 (Automated Workflows & Digital Signatures)** is marked as **"Beta Testers Only"** (active piloting and fine-tuning with select enterprise partners).
   - **Tier 05 (Private Sovereign Cloud & Enterprise AI)** is marked as **"Coming Soon"** (in active development behind closed doors).
6. **Defensible Boutique Engineering Commitments**:
   - High-availability target SLA of 99.9%.
   - Automated, encrypted disaster recovery snapshots with a realistic Recovery Time Objective (RTO) within 2 hours maximum.

---

## Multi-Cloud Deployment Parity (Netlify & Render)

The site is configured to build and deploy seamlessly on both **Netlify** and **Render** with identical caching headers, security policies, and asset pipelines.

### Netlify Deployment
- **Configuration**: [`netlify.toml`](netlify.toml)
- **Environment**: Hugo Extended `v0.160.1`
- **Build Command**: `hugo --gc --minify`
- **Publish Directory**: `public`
- **Security Headers**: Content-Security-Policy, HSTS (2 years), X-Frame-Options (`DENY`), X-Content-Type-Options (`nosniff`), Referrer-Policy (`strict-origin-when-cross-origin`), and 1-year immutable cache headers for hashed assets.

### Render Deployment
- **Configuration**: [`render.yaml`](render.yaml)
- **Service Type**: Static Site (`type: web`, `runtime: static`)
- **Build Command**: `bash scripts/build.sh` (or `chmod +x scripts/build.sh && ./scripts/build.sh`)
- **Publish Directory**: `public`
- **Environment Variables**:
  - `HUGO_VERSION`: `0.160.1`
- **Why `bash scripts/build.sh` is required on Render**: Render's default system image comes with an older Hugo binary (`v0.124.1`). Running `bash scripts/build.sh` automatically downloads and uses **Hugo Extended v0.160.1 Linux AMD64**, ensuring template tags and modern Hugo features compile without errors.

---

## CloudCannon CMS Architecture

The repository is fully wired for visual, non-technical content management via **CloudCannon CMS**:

- **Configuration File**: [`cloudcannon.config.json`](cloudcannon.config.json)
- **Collections**:
  - `pages`: Markdown content pages (e.g., [`content/_index.md`](content/_index.md)).
  - `data`: Structured JSON databases (e.g., [`data/infrastructure.json`](data/infrastructure.json)).
- **Visual Editing & Schemas**:
  - Full schema definitions for Tiers, Cloud Providers, Pipeline Stages, and FAQs.
  - Visual shortcode snippets with interactive form controls.
  - Front-matter binding in [`content/_index.md`](content/_index.md) mapped directly to [`layouts/partials/hero.html`](layouts/partials/hero.html) and [`layouts/index.html`](layouts/index.html).

---

## Cohesive Theme-Aware Shortcodes Library

All shortcodes are located in [`layouts/shortcodes/`](layouts/shortcodes/) and styled in [`assets/scss/_shortcodes.scss`](assets/scss/_shortcodes.scss) and [`assets/scss/_theme-light.scss`](assets/scss/_theme-light.scss):

| Shortcode | Purpose & Syntax |
| :--- | :--- |
| **`callout`** | Highlight critical disclosures or notes.<br>`{{< callout type="info|tip|warning|alert" title="Title" >}}Content{{< /callout >}}` |
| **`stat-metric`** | High-impact numerical KPI with live currency support.<br>`{{< stat-metric value="100%" label="Data Sovereignty" subtitle="Kenya DPA 2019" >}}` |
| **`feature-card`** | Structured card with optional badge and icon.<br>`{{< feature-card title="Title" badge="Pro" >}}Description{{< /feature-card >}}` |
| **`btn`** | Unified action button matching primary/secondary styles.<br>`{{< btn href="#contact" text="Book Audit" variant="primary|secondary" >}}` |
| **`badge`** | Theme-aware status pill.<br>`{{< badge text="Beta Testers Only" type="warning|emerald|cyan|accent" >}}` |
| **`accordion`** & **`accordion-item`** | Responsive expandable collapsible drawer for documentation and FAQs.<br>`{{< accordion >}}{{< accordion-item id="a1" title="Title" open="true" >}}Body{{< /accordion-item >}}{{< /accordion >}}` |
| **`comparison-pill`** | Compact comparison pill showing replaced legacy tools.<br>`{{< comparison-pill tool="Sovereign EDMS" replaces="SharePoint & Drive" >}}` |
| **`tier-addon`** | A-la-carte modular addon callout highlighting flexibility.<br>`{{< tier-addon tier="Tier 03" addon="Digital E-Signatures" >}}` |

---

## Safety Checkpoint & 1-Click Rollback

To ensure continuous operational stability during rapid iteration, an immutable git tag and automated rollback scripts are provided:

- **Immutable Tag**: `working-stable-v1` (created at commit `814c4ef`)
- **Restoration Scripts**:
  - **Windows**: Run [`scripts/restore-stable-v1.bat`](scripts/restore-stable-v1.bat) directly in PowerShell / Command Prompt.
  - **Linux / macOS**: Run [`scripts/restore-stable-v1.sh`](scripts/restore-stable-v1.sh) (`chmod +x scripts/restore-stable-v1.sh && ./scripts/restore-stable-v1.sh`).
  - **Manual Git Command**:
    ```bash
    git reset --hard working-stable-v1
    git clean -fd
    ```

---

## Development & Build Commands

### Prerequisites
- [Hugo Extended](https://gohugo.io/) (v0.120+ recommended, tested on v0.160.1+extended).

### Local Development
```bash
# Start the local Hugo server with fast live reloading
hugo server -D
```
The application runs at `http://localhost:1313/`.

### Production Build & Verification
```bash
# Clean production build with strict warning enforcement
hugo --minify --cleanDestinationDir --panicOnWarning
```
Assets compile with subresource integrity (SRI) hashes and minified output directly to `public/`.

---

## Directory Structure

```
julzinsight.co7-hugo/
├── assets/
│   ├── js/
│   │   └── main.js               # Reactive dual-currency & theme engine
│   └── scss/
│       ├── _animations.scss      # Kinetic keyframes & motion curves
│       ├── _base.scss            # HTML reset & typography
│       ├── _components.scss      # Section styles & modular banners
│       ├── _glass.scss           # Liquid-glass & backdrop filters
│       ├── _mixins.scss          # Responsive breakpoints
│       ├── _shortcodes.scss      # Theme-aware shortcodes library
│       ├── _theme-light.scss     # Executive light theme stylesheet
│       ├── _utilities.scss       # Layout & spacing helpers
│       ├── _variables.scss       # Color tokens & typography
│       └── main.scss             # SCSS bundle manifest
├── content/
│   └── _index.md                 # CMS-editable homepage front-matter & content
├── data/
│   └── infrastructure.json       # Masked capabilities, pricing, providers, FAQs
├── layouts/
│   ├── _default/
│   │   ├── baseof.html           # HTML5 semantic skeleton
│   │   └── single.html           # Single template fallback
│   ├── index.html                # Page assembler with CMS body support
│   ├── partials/
│   │   ├── faq.html              # Executive accordion FAQ
│   │   ├── footer.html           # Enterprise footer & capability directory
│   │   ├── head.html             # SEO, JSON-LD, fonts, zero-FOUC script & asset bundles
│   │   ├── hero.html             # Hero stage with 32-bar chart & CMS titles
│   │   ├── hosting-matrix.html   # Sovereign data centers (Servercore, Safaricom, Konza)
│   │   ├── insight-os.html       # Role switcher & InsightOS workstation apps
│   │   ├── modal.html            # Enterprise consultation intake dialog
│   │   ├── navbar.html           # Responsive navigation, theme toggle & mobile drawer
│   │   ├── pipeline.html         # 4-Phase deployment visualizer
│   │   ├── roi-calculator.html   # Dynamic SaaS sprawl & foreign exchange calculator
│   │   ├── tier-explorer.html    # 5-Tier architecture with modular add-on notices
│   │   └── trust-ticker.html     # Capability replacement ticker
│   └── shortcodes/               # 8 reusable CMS-friendly shortcodes
├── public/                       # Compiled production artifact
├── scripts/
│   ├── build.sh                  # CI/CD universal build script with Hugo installer
│   ├── restore-stable-v1.bat     # 1-Click rollback script (Windows)
│   └── restore-stable-v1.sh      # 1-Click rollback script (Linux/macOS)
├── cloudcannon.config.json       # CloudCannon CMS visual configuration
├── netlify.toml                  # Netlify deployment configuration & security headers
├── render.yaml                   # Render static site deployment configuration
└── hugo.toml                     # Global Hugo configuration
```

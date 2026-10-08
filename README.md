# Julz Insight — Sovereign Enterprise Cloud & Infrastructure Platform

> **"The Engine of Digital Sovereignty"**  
> Africa's No. 1 Fully Managed, Sovereign & High-Performance Business Infrastructure for Enterprises.

---

## Executive Overview & Architectural Philosophy

This platform delivers enterprise-grade sovereign infrastructure designed specifically for African and multinational enterprises subject to data localization laws (such as the **Kenya Data Protection Act 2019**). 

Instead of forcing organizations into vendor-locked SaaS ecosystems that introduce foreign-exchange exposure and unilateral price hikes, Julz Insight deploys **fully managed, sovereign open-source business architectures** directly into Tier-3 sovereign data centers (such as Servercore Nairobi, Safaricom, Africa Data Centres), private co-location, or on-premises server racks.

### Key Strategic Pillars:
1. **Audience First, Business-Driven Terminology**:
   - Technical jargon is minimized in favor of executive business outcomes (ROI, legal compliance, business continuity, total cost of ownership).
   - Core open-source engines are presented through their **deep enterprise capabilities** rather than open-source brand labels:
     - **Sovereign Cloud & EDMS**: Enterprise Electronic Document Management System, automated record archiving, granular access control, real-time document collaboration, and encrypted video conferencing (replacing SharePoint, Google Drive, and Zoom).
     - **Unified ERP & CRM**: End-to-end accounting, multi-currency invoicing, enterprise procurement, customer relationship management, and statutory payroll/HR (replacing Microsoft 365 Business Central, HubSpot, and Salesforce).
     - **Unified Identity & Single Sign-On (Zero Password Sprawl)**: Centralized identity provider with FIDO2 / WebAuthn passwordless authentication and hardware token MFA. Staff log in **once** and securely access every enterprise workstation app—eliminating the need to memorize or juggle 12 different passwords.
     - **Enterprise Knowledge Base & SOP Wiki**: Centralized corporate wiki, standard operating procedures, and relational team docs (replacing Notion and Confluence).
     - **Hardware-Encrypted Credential Vault**: Zero-knowledge enterprise password and API secret management (replacing 1Password and LastPass).
     - **Digital E-Signatures**: Legally binding, cryptographically signed agreements under Kenya DPA & UNCITRAL guidelines (replacing DocuSign).
2. **A-la-Carte Modular Tier Flexibility**:
   - Clients are **never** forced into arbitrary tier upgrades. An enterprise can choose **Tier 03 (Productivity & Vault)** and select a **single dedicated module** from Tier 04 (e.g., Enterprise E-Signature Suite or Project Management Engine) or Tier 05 as an a-la-carte add-on without paying for the entire higher-tier stack.
3. **Transparent Hosting & Third-Party Financials**:
   - The platform clearly demarcates that hosting/bare-metal infrastructure is billed directly or passthrough by certified Tier-3 sovereign facility operators (e.g., Servercore Kenya, Safaricom, ADC), protecting enterprise budgets against hidden markups.
4. **Tier Status Transparency**:
   - **Tier 04 (Unified Enterprise ERP & Core Operations)** is marked as **"Beta Testers Only"** (active piloting and tuning with select enterprise partners).
   - **Tier 05 (Private AI Forge & Intelligent Agent Ecosystem)** is marked as **"Coming Soon"** (in active development behind closed doors).

---

## Multi-Cloud Deployment Parity (Netlify & Render)

The site is configured to build and deploy seamlessly on both **Netlify** and **Render** with identical caching headers, security policies, and asset pipelines.

### Netlify Deployment
- **Configuration**: [`netlify.toml`](netlify.toml)
- **Environment**: Hugo Extended `v0.160.1`
- **Build Command**: `hugo --gc --minify`
- **Publish Directory**: `public`
- **Security Headers**: Content-Security-Policy, HSTS (2 years), X-Frame-Options (`DENY`), X-Content-Type-Options (`nosniff`), Referrer-Policy (`strict-origin-when-cross-origin`), and aggressive 1-year cache headers for immutable hashed assets.

### Render Deployment
- **Configuration**: [`render.yaml`](render.yaml)
- **Service Type**: Static Site (`type: web`, `runtime: static`)
- **Build Command**: `chmod +x scripts/build.sh && ./scripts/build.sh` (or `hugo --gc --minify` if Hugo is pre-installed)
- **Publish Directory**: `public`
- **Automated Fallback**: [`scripts/build.sh`](scripts/build.sh) verifies if `hugo` is present; if not, it automatically downloads and extracts Hugo Extended Linux AMD64, compiles the site with minification, and sets appropriate cache routes.

---

## CloudCannon CMS Architecture

The repository is fully wired for visual, non-technical content management via **CloudCannon CMS**:

- **Configuration File**: [`cloudcannon.config.json`](cloudcannon.config.json)
- **Collections**:
  - `pages`: Markdown content pages (e.g., [`content/_index.md`](content/_index.md)).
  - `data`: Structured JSON databases (e.g., [`data/infrastructure.json`](data/infrastructure.json)).
- **Visual Editing & Schemas**:
  - Full schema definitions for Tiers, Cloud Providers, Pipeline Stages, Regulated Verticals, and FAQs.
  - Visual shortcode snippets with interactive form controls.
  - Front-matter binding in [`content/_index.md`](content/_index.md) mapped directly to [`layouts/partials/hero.html`](layouts/partials/hero.html) and [`layouts/index.html`](layouts/index.html).

---

## Cohesive Theme-Aware Shortcodes Library

All shortcodes are located in [`layouts/shortcodes/`](layouts/shortcodes/) and styled in [`assets/scss/_shortcodes.scss`](assets/scss/_shortcodes.scss), fully adhering to the dark glassmorphism design system:

| Shortcode | Purpose & Syntax |
| :--- | :--- |
| **`callout`** | Highlight critical disclosures or notes.<br>`{{< callout type="info\|tip\|warning\|alert" title="Title" >}}Content{{< /callout >}}` |
| **`stat-metric`** | High-impact numerical KPI with live currency support.<br>`{{< stat-metric value="100%" label="Data Sovereignty" subtitle="Kenya DPA 2019" >}}` |
| **`feature-card`** | Structured glass card with optional badge and icon.<br>`{{< feature-card title="Title" badge="Pro" >}}Description{{< /feature-card >}}` |
| **`btn`** | Unified action button matching primary/secondary glass styles.<br>`{{< btn href="#contact" text="Book Audit" variant="primary\|secondary" >}}` |
| **`badge`** | Theme-aware status pill.<br>`{{< badge text="Beta Testers Only" type="warning\|emerald\|cyan\|accent" >}}` |
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
│   │   └── main.js               # Reactive dual-currency & interactive UI engine
│   └── scss/
│       ├── _animations.scss      # Kinetic keyframes & motion curves
│       ├── _base.scss            # HTML reset & typography
│       ├── _components.scss      # Section styles & modular banners
│       ├── _glass.scss           # Liquid-glass & backdrop filters
│       ├── _mixins.scss          # Responsive breakpoints
│       ├── _shortcodes.scss      # Theme-aware shortcodes library
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
│   │   ├── head.html             # SEO, JSON-LD, fonts & asset bundles
│   │   ├── hero.html             # Hero stage with 32-bar chart & CMS titles
│   │   ├── hosting-matrix.html    # Sovereign data centers (Servercore, Safaricom, ADC)
│   │   ├── insight-os.html       # Role switcher & InsightOS workstation apps
│   │   ├── modal.html            # Enterprise consultation intake dialog
│   │   ├── navbar.html           # Responsive navigation & mobile drawer
│   │   ├── pipeline.html         # 4-Phase deployment visualizer
│   │   ├── roi-calculator.html   # Dynamic SaaS sprawl & foreign exchange calculator
│   │   ├── tier-explorer.html    # 5-Tier architecture with modular add-on notices
│   │   └── trust-ticker.html     # Infinite capability replacement ticker
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

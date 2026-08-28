# TrustPulse

### The Financial Resume for the Credit-Invisible

> **Turning everyday financial evidence into financial identity.**

TrustPulse is a borrower-first alternative financial identity platform designed for people with little or no formal credit history.

Millions of people participate in the economy every day — running small businesses, repaying informal loans, paying utility bills, purchasing inventory, paying taxes, and generating income — yet much of this activity never becomes part of a structured financial profile.

TrustPulse aims to change that.

Instead of asking only **“What formal credit history does this person have?”**, TrustPulse asks:

> **“What evidence already exists that tells us how this person manages their financial life?”**

The platform allows borrowers to build a **Financial Resume** by collecting legitimate financial evidence, analyzing it, evaluating its quality and consistency, and converting it into understandable financial signals.

---

## 🏆 Built For

**Build $ Bank**

### Team — VIBECODERS

* **Asmita Gupta** — Team Leader
* **Rudraksh Singh**

---

# 1. The Problem

Traditional credit assessment relies heavily on formal financial history.

But many financially active individuals have little or no conventional credit footprint.

Consider **Ramesh**, a small kirana store owner.

Ramesh:

* Has operated his store for years
* Pays electricity and rent regularly
* Purchases inventory from suppliers
* Has repaid a previous small loan
* Makes tax payments
* Maintains sales records
* Owns business equipment

The evidence exists.

But it is scattered across:

```text
Receipts
Bills
Loan repayment records
Supplier invoices
Tax documents
Sales records
Asset documents
Affidavits
Other supporting evidence
```

Traditional systems may only see a limited portion of this activity.

The result can be:

```text
Limited Financial History
        ↓
Limited Financial Visibility
        ↓
Lower Confidence
        ↓
Harder Access to Formal Credit
        ↓
Missed Economic Opportunity
```

### The core problem

> **The problem isn't always a lack of financial reliability. It's a lack of financial visibility.**

---

# 2. Our Solution

## TrustPulse — A Financial Resume

TrustPulse gives borrowers a structured place to build their financial identity from legitimate evidence.

The system transforms:

```text
Everyday Evidence
        ↓
Evidence Understanding
        ↓
Evidence Classification
        ↓
Validation & Triangulation
        ↓
Financial Signals
        ↓
Trust Score + Confidence Score
        ↓
AI Recommendations
        ↓
Financial Resume
        ↓
Decision Card
```

The goal is not to replace regulated credit bureaus or traditional underwriting.

Instead, TrustPulse creates a structured representation of financial behavior for people whose existing financial evidence is fragmented or difficult to interpret.

---

# 3. Core Product Concept

## 📄 Financial Resume

A Financial Resume is a structured financial profile built from a borrower's legitimate evidence.

It brings together information that would otherwise remain scattered.

### The Financial Resume contains:

* Financial identity
* Occupation/business information
* Trust Score
* Confidence Score
* Financial signals
* Evidence history
* Evidence quality
* Positive indicators
* Evidence gaps
* AI recommendations
* Financial Decision Card

Think of it as:

> **A resume for your financial life.**

---

# 4. Evidence Vault

The Evidence Vault is the foundation of TrustPulse.

Instead of limiting borrowers to traditional financial statements, TrustPulse allows them to submit different forms of legitimate financial evidence.

## 💰 Repayment Evidence

* Previous loan repayment receipts
* Installment records
* Lender acknowledgements
* MFI repayment records

## 🧾 Payment Evidence

* Electricity bills
* Water bills
* Rent receipts
* Mobile/telecom bills
* Other recurring payment records

## 🏪 Business Evidence

* Supplier invoices
* Wholesaler receipts
* Sales receipts
* Business records
* Market/vendor association records

## 📈 Income Evidence

* Sales records
* Income records
* Gig-worker earnings
* Salary/payment receipts
* Other legitimate earnings evidence

## 🏛️ Tax Evidence

* Tax-payment receipts
* Income-tax related payment evidence
* GST-related records where applicable
* Other legitimate tax-payment documents

## 🏠 Asset Evidence

* Equipment purchase invoices
* Vehicle documents
* Ownership documents
* Warranty cards

Assets are treated as **supporting evidence**, not automatic proof of repayment ability.

## 📄 Supporting Evidence

* Affidavits
* Self-declarations
* References
* Other legitimate supporting documents

---

# 5. Evidence Is Not Automatically Trusted

A critical design principle of TrustPulse is:

> **Uploading evidence does not automatically make it verified.**

Documents can vary significantly in reliability.

TrustPulse therefore separates evidence by quality and verification status.

### Example statuses

| Status               | Meaning                                                               |
| -------------------- | --------------------------------------------------------------------- |
| 🟢 **Verified**      | Evidence has a reliable verification basis                            |
| 🔵 **Documented**    | Evidence exists as a document but has not been independently verified |
| 🟡 **Self-Declared** | Information provided directly by the borrower                         |
| 🟠 **Under Review**  | Evidence requires additional validation                               |
| 🔴 **Not Verified**  | Verification could not be established                                 |
| ⚠️ **Low Quality**   | Document quality limits reliable extraction                           |
| ⚠️ **Unreadable**    | Information cannot be reliably interpreted                            |
| ⚠️ **Duplicate**     | Evidence appears to duplicate another submission                      |
| ⚠️ **Contradictory** | Evidence conflicts with another data point                            |

This prevents the system from treating every uploaded image or receipt as unquestionable truth.

---

# 6. AI Evidence Analysis

TrustPulse converts unstructured documents into structured financial information.

A simplified processing pipeline is:

```text
Uploaded Document
       ↓
Document Ingestion
       ↓
OCR / Text Extraction
       ↓
Information Extraction
       ↓
Evidence Classification
       ↓
Quality & Recency Assessment
       ↓
Consistency Checking
       ↓
Evidence Triangulation
       ↓
Financial Signal Generation
```

For example:

### Loan Repayment Receipt

```text
10 installments detected
10 paid
0 late

→ Strong Repayment Reliability
```

### Electricity Bills

```text
11 months detected
Consistent payment pattern

→ Strong Payment Discipline
```

### Supplier Invoices

```text
8 months of recurring business activity

→ Positive Business Continuity Signal
```

### Tax Payment

```text
Tax-payment evidence detected

→ Positive supporting financial participation signal
```

---

# 7. Evidence Triangulation

One of the most important concepts in TrustPulse is **triangulation**.

A single document provides one piece of information.

Multiple independent sources can provide stronger corroboration.

For example:

```text
Supplier Invoices
       +
Shop Rent Receipts
       +
Electricity Bills
       ↓
Business Continuity
```

Instead of asking:

> “Is this one document real?”

TrustPulse can ask:

> “Do multiple independent pieces of evidence tell a consistent story?”

The prototype uses this concept to strengthen confidence when multiple evidence sources support the same underlying signal.

---

# 8. Trust Score

TrustPulse generates a **Trust Score from 0–100**.

This is intentionally different from a traditional credit score.

The Trust Score represents the strength of the financial behavior demonstrated by the available evidence.

For the prototype's primary **Kirana Store Owner** persona, the scoring dimensions are:

| Dimension               |  Weight |
| ----------------------- | ------: |
| Repayment Reliability   | **30%** |
| Payment Discipline      | **25%** |
| Business Continuity     | **25%** |
| Income & Sales Capacity | **20%** |

---

## Evidence Quality

Every evidence item receives a quality multiplier.

| Evidence Type              | Multiplier |
| -------------------------- | ---------: |
| Verified / Structured Data |    **1.0** |
| Documented Evidence        |    **0.6** |
| Self-Declared Evidence     |    **0.2** |

This means stronger evidence has greater influence on the resulting financial signal.

---

## Recency

Evidence also receives a recency factor.

| Age of Evidence |  Factor |
| --------------- | ------: |
| < 90 days       | **1.0** |
| 90–180 days     | **0.8** |
| 181–365 days    | **0.5** |
| > 365 days      | **0.2** |

Recent evidence therefore has greater influence than very old evidence.

---

# 9. Dimension Scoring

For each scoring dimension:

```text
Dⱼ =
Σ(Sᵢ × Qᵢ × Tᵢ)
─────────────────
Σ(Qᵢ × Tᵢ)
```

Where:

* **Sᵢ** = raw signal score from 0–100
* **Qᵢ** = evidence quality multiplier
* **Tᵢ** = recency factor
* **Dⱼ** = resulting dimension score

The final Trust Score is:

```text
Trust Score =
Σ(Dⱼ × Wⱼ)
```

where **Wⱼ** represents the dimension weight.

The important principle is that the score is **deterministic and explainable**.

---

# 10. Confidence Score

Trust and confidence are deliberately separated.

### Trust Score asks:

> **“What does the available evidence suggest?”**

### Confidence Score asks:

> **“How strongly can we support that conclusion?”**

The prototype considers:

* Evidence quality
* Dimension coverage
* Independent corroboration
* Anomalies
* Contradictions

Conceptually:

```text
Confidence
    =
Evidence Quality
+
Dimension Coverage
+
Triangulation
-
Anomaly Penalties
```

A borrower can therefore have:

```text
High Trust
+
Low Confidence
```

if the available evidence looks positive but is poorly verified or incomplete.

This distinction is important for responsible financial assessment.

---

# 11. AI Recommendations

TrustPulse doesn't stop at giving a number.

The system identifies areas where the Financial Resume can be strengthened.

For example:

### Recommendation

> **Add recent sales or income evidence.**

Why?

```text
Income & Sales Capacity
        ↓
Current Score: 61
        ↓
Limited independently supported income evidence
```

Another recommendation might be:

> **Replace low-quality documents with clearer copies to improve evidence confidence.**

Or:

> **Add additional supplier records to strengthen the Business Continuity signal.**

The recommendations are generated from:

* Weakest scoring dimensions
* Missing evidence
* Evidence quality
* Confidence level
* Anomaly flags

---

# 12. Financial Decision Card

The current MVP ends with a **Financial Decision Card**.

This is intentionally **not a loan approval**.

The Decision Card is a standardized summary of the evidence available in the Financial Resume.

Example:

```text
────────────────────────────────────
       TRUSTPULSE DECISION CARD
────────────────────────────────────

Applicant
Ramesh Kumar

Occupation
Kirana Store Owner

Trust Score
76 / 100

Confidence
83 / 100

Evidence Strength
HIGH

Key Positive Signals
✓ Consistent repayment history
✓ Recurring payment discipline
✓ Sustained business activity

Evidence Concerns
• Limited verified income evidence
• Some documents require review

Evidence
18 total records
8 Verified
7 Documented
3 Self-Declared

AI Assessment
The available evidence indicates consistent
repayment behavior and sustained business
activity. Income capacity remains less
certain due to limited independently
verified income evidence.

Suggested Next Step
Additional verification / underwriting
may be required.

────────────────────────────────────
```

The prototype therefore stops at:

> **Structured, explainable financial evidence.**

There is currently no lender dashboard or automated loan approval system.

---

# 13. Borrower Journey

The complete MVP experience consists of four major stages.

```text
01 — FINANCIAL IDENTITY
        ↓
02 — EVIDENCE VAULT
        ↓
03 — AI EVIDENCE ANALYSIS
        ↓
04 — TRUST PROFILE
        ↓
FINANCIAL RESUME
        ↓
DECISION CARD
```

### 01 — Financial Identity

The borrower provides basic information:

* Name
* Occupation
* Years in business
* Location

### 02 — Evidence Vault

The borrower uploads legitimate financial evidence.

Supported prototype formats:

* PDF
* JPG
* JPEG
* PNG
* DOCX

### 03 — AI Evidence Analysis

TrustPulse extracts information and evaluates:

* Evidence type
* Dates
* Amounts
* Payment behavior
* Quality
* Recency
* Consistency

### 04 — Trust Profile

The borrower sees:

* Trust Score
* Confidence Score
* Dimension breakdown
* Evidence quality
* Evidence gaps
* AI recommendations

### Final Output

The borrower receives:

**Financial Resume + Decision Card**

---

# 14. Bilingual Experience

Financial inclusion is not only about technology.

It is also about communication.

TrustPulse therefore supports:

### 🇬🇧 English

and

### 🇮🇳 हिंदी

throughout the borrower experience.

The language selection remains available throughout the application and applies to:

* Navigation
* Forms
* Evidence categories
* Upload instructions
* AI analysis
* Trust Profile
* Recommendations
* Financial Resume
* Decision Card
* Error messages

The application architecture is localization-ready so additional Indian regional languages can be introduced in future versions.

### Future:

```text
English
Hindi
   ↓
Regional Language Expansion
   ↓
More Accessible Financial Identity
```

---

# 15. Technology Architecture

The prototype follows a modular architecture designed around document processing, financial signal generation, and a borrower-facing web experience.

```text
                  ┌─────────────────────┐
                  │   Borrower Web App  │
                  │   React / Next.js   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │     API Layer       │
                  │ Node.js / Express   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ AI Processing Layer │
                  │ Python / FastAPI    │
                  │ OCR + NLP + ML      │
                  └──────────┬──────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │Evidence  │   │Financial │   │Knowledge │
        │Analysis  │   │Scoring   │   │Base      │
        └──────────┘   └──────────┘   └──────────┘
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                  ┌─────────────────────┐
                  │   Trust Profile     │
                  │ + Recommendations   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Financial Resume    │
                  │ + Decision Card     │
                  └─────────────────────┘
```

---

# 16. Technology Stack

### Frontend

* React
* Next.js
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* REST APIs

### AI / Document Processing

* Python
* FastAPI
* OCR
* NLP
* Document understanding models

### Data & Storage

* PostgreSQL
* Redis
* Object/file storage

### Knowledge / Retrieval

* Vector database
* Embeddings
* Similarity search

### Infrastructure

* Docker
* Docker Compose
* Nginx
* CI/CD

The exact production infrastructure can evolve as the prototype matures.

---

# 17. Security & Privacy Principles

TrustPulse deals with potentially sensitive financial documents, so privacy and responsible handling are core design considerations.

The architecture is designed with:

* Secure file handling
* Input validation
* Authentication-ready architecture
* Access control
* Audit-friendly data structures
* Consent-driven future integrations
* Minimal exposure of sensitive information
* Separation between borrower data and scoring logic

The prototype does **not** claim to provide production-grade regulatory compliance.

A real-world deployment would require additional:

* Security audits
* Data protection controls
* Consent mechanisms
* Regulatory review
* Identity verification
* Infrastructure hardening
* Model validation
* Responsible lending controls

---

# 18. What The MVP Does NOT Do

To keep the prototype focused and technically honest, TrustPulse currently does **not** include:

* ❌ Lender dashboard
* ❌ Bank dashboard
* ❌ Automated loan approval
* ❌ Actual loan disbursement
* ❌ Direct bank account connections
* ❌ Direct UPI connections
* ❌ Real-time CIBIL integration
* ❌ Government database access
* ❌ Guaranteed fraud detection
* ❌ Guaranteed repayment prediction
* ❌ Automated lending decisions

These are potential future integrations, not current capabilities.

---

# 19. Current Prototype Scope

The MVP focuses on demonstrating one complete borrower journey:

```text
Create Financial Identity
          ↓
Upload Evidence
          ↓
Analyze Evidence
          ↓
Evaluate Evidence Quality
          ↓
Triangulate Evidence
          ↓
Generate Financial Signals
          ↓
Calculate Trust + Confidence
          ↓
Explain The Result
          ↓
Generate Recommendations
          ↓
Build Financial Resume
          ↓
Generate Decision Card
```

The prototype uses a seeded **Kirana Store Owner** persona to demonstrate the complete workflow.

---

# 20. Future Scope

TrustPulse is designed to evolve beyond the prototype.

### 🌐 Regional Language Expansion

Support additional Indian languages to improve accessibility.

### 🔐 Verified Data Sources

Future versions can incorporate consent-based integrations with verified financial data sources.

### 🏦 Financial Institution Integration

The Financial Resume and Decision Card could eventually be consumed by banks, NBFCs, MFIs, or other regulated financial institutions.

### 🤖 Advanced AI Models

Future versions could incorporate more sophisticated document understanding and machine-learning models trained on validated repayment outcomes.

### 📊 Occupation-Specific Scoring

Different financial behaviors can be modeled for:

* Street vendors
* Kirana stores
* Gig workers
* Small farmers
* Freelancers
* Micro-businesses
* Other informal workers

### 🛡️ Stronger Verification

Future versions could introduce stronger:

* Document authenticity checks
* Identity verification
* Cross-source verification
* Duplicate detection
* Fraud prevention
* Consent management

### 📈 Outcome Calibration

As real repayment outcomes become available, scoring models can be evaluated and calibrated against actual financial outcomes.

---

# 21. Responsible AI Position

TrustPulse is designed around a simple principle:

> **More data does not automatically mean better decisions. Better evidence does.**

The platform therefore distinguishes between:

```text
Evidence
   ≠
Verified Evidence
   ≠
Reliable Signal
   ≠
Guaranteed Outcome
```

A Trust Score should never be interpreted as certainty.

Likewise, alternative data should not become an excuse for invasive surveillance or unfair discrimination.

Future production deployment would require rigorous validation for:

* Fairness
* Bias
* Explainability
* Data minimization
* Consent
* Security
* Regulatory compliance

---

# 22. Why TrustPulse?

Traditional systems ask:

> **“What credit history do you have?”**

TrustPulse asks:

> **“What financial evidence do you already have?”**

Traditional systems may see:

```text
No / limited history
```

TrustPulse attempts to surface:

```text
Years of repayments
+
Recurring payments
+
Business activity
+
Income evidence
+
Tax participation
+
Supporting assets
+
Independent corroboration
```

and transform these fragmented pieces into:

# **A Financial Identity.**

---

# 23. Project Vision

Our long-term vision is simple:

> **No financially responsible person should remain invisible simply because their financial story was never formally recorded in one place.**

TrustPulse aims to create a bridge between:

**Everyday financial behavior**

and

**Formal financial visibility.**

The evidence already exists.

### We make it visible.

---

## 📌 Project Status

**Current Stage:** Hackathon Prototype

**Primary Persona:** Kirana Store Owner

**Primary Experience:** Borrower-facing Financial Resume

**Current Output:** Trust Profile + Financial Resume + Decision Card

**Languages:** English + Hindi

**Lender Interface:** Not included in current MVP

---

## 📄 License

This project is currently developed as a hackathon prototype.

Licensing and production-use terms will be defined before public commercial deployment.

---

<div align="center">

### TrustPulse

**Financially Active. Financially Visible.**

*The evidence already exists. We make it visible.*

</div>

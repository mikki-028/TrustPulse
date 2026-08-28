# TrustPulse: Your Financial Story

Build a polished, production-quality responsive web application called:

TRUSTPULSE

“The Financial Resume for the Credit-Invisible”

TrustPulse is a borrower-first alternative financial identity platform designed for people with little or no formal credit history.

IMPORTANT PRODUCT DECISION:

This MVP is ONLY the borrower-facing experience.

DO NOT build:

- Lender dashboard

- Bank dashboard

- Loan approval dashboard

- Lender login

- Actual loan disbursement

- Direct bank integrations

- UPI/bank account connection

- Real-time credit bureau integration

The MVP ends at a generated FINANCIAL DECISION CARD.

The product should feel like a serious fintech product that could eventually integrate with banks, but the current prototype is entirely focused on helping the borrower build a credible Financial Resume from legitimate financial evidence.

==================================================

1. CORE PRODUCT IDEA

==================================================

Traditional credit systems primarily see formal financial history.

Many financially active people have evidence of responsible financial behavior scattered across their everyday lives:

- Previous loan repayments

- Installment receipts

- Electricity bills

- Water bills

- Rent receipts

- Mobile/telecom bills

- Supplier invoices

- Wholesaler receipts

- Sales records

- Income records

- Gig-worker earnings

- Tax-payment receipts

- GST-related records

- Asset purchase records

- Equipment/vehicle documents

- Warranty cards

- Affidavits

- Self-declarations

- Other legitimate supporting documents

TrustPulse allows the borrower to collect this evidence in one place.

The system then:

Evidence

→ Understands it

→ Classifies it

→ Evaluates its quality

→ Checks consistency

→ Triangulates related evidence

→ Converts evidence into financial signals

→ Calculates Trust Score

→ Calculates Confidence Score

→ Explains the result

→ Gives personalized recommendations

→ Builds a Financial Resume

→ Generates a Financial Decision Card

The central product philosophy is:

“Financially active ≠ financially visible.”

TrustPulse makes existing financial evidence more visible and structured.

==================================================

2. TARGET USER

==================================================

For the MVP, use one primary persona:

RAMESH KUMAR

Occupation:

Kirana Store Owner

Business duration:

6 years

Location:

Jaipur, Rajasthan

Ramesh has limited formal credit history but has years of real-world financial activity.

He has:

- Previous loan repayment records

- Electricity bills

- Supplier invoices

- Tax payment receipts

- Sales records

- Shop rent receipts

- Some asset/equipment purchase records

The entire prototype should use Ramesh consistently so the application feels like one continuous story.

==================================================

3. LANGUAGE SUPPORT — VERY IMPORTANT

==================================================

The borrower may not be comfortable with English.

The application MUST support:

English

हिंदी

Add a persistent language switcher in the application header:

English | हिंदी

The selected language should remain consistent throughout the entire application.

Translate:

- Navigation

- Buttons

- Headings

- Instructions

- Evidence categories

- Upload instructions

- AI analysis messages

- Trust Score explanation

- Confidence explanation

- Recommendations

- Financial Resume

- Decision Card

- Error messages

- Empty states

- Tooltips/help text

Do NOT make Hindi an afterthought.

The interface should be designed from the beginning for localization.

Future regional languages will be added later, so structure the frontend using a localization/i18n architecture rather than hardcoding all text directly into components.

For the prototype, English and Hindi are sufficient.

==================================================

4. VISUAL DESIGN

==================================================

Design direction:

Modern fintech + warmth + trust + accessibility.

Avoid:

- Cold corporate banking aesthetic

- Generic SaaS dashboard appearance

- Excessive dark mode

- Excessive gradients

- Overly futuristic cyberpunk visuals

- Excessive glassmorphism

- Cluttered dashboards

Primary visual palette:

Deep Forest Green

Warm Cream / Light Beige

Earthy Brown

Golden Yellow

Soft Orange

Use green for:

- Trust

- Positive signals

- Verified evidence

- Progress

Use yellow/orange for:

- Attention

- Recommendations

- Evidence requiring review

Use red sparingly for:

- Contradictions

- Unreadable documents

- Not verified

- Anomalies

Typography:

- Large, highly readable headings

- Comfortable body text

- Strong visual hierarchy

- No tiny text

- WCAG-conscious contrast

The app should feel welcoming to a non-technical borrower.

Use rounded cards, subtle shadows, clean icons, generous spacing and clear CTAs.

==================================================

5. APPLICATION STRUCTURE

==================================================

Build the borrower journey as:

1. Welcome / Financial Identity

2. Evidence Vault

3. AI Evidence Analysis

4. Trust Profile + AI Recommendations

5. Financial Resume + Decision Card

The user should always understand where they are in the process.

Use a simple progress indicator:

01 Identity

02 Evidence

03 Analysis

04 Trust Profile

Do not make the application feel like a complicated multi-step government form.

==================================================

6. SCREEN 1 — FINANCIAL IDENTITY

==================================================

Create a welcoming onboarding screen.

Headline:

“Build your Financial Resume.”

Supporting message:

“Your financial story already exists. Let’s make it visible.”

Show a friendly Ramesh persona illustration/avatar.

Display:

Hi, I’m Ramesh

Kirana Store Owner

Jaipur, Rajasthan

Form fields:

Full Name

Occupation / Business Type

Years in Business

Location

Example values:

Full Name:

Ramesh Kumar

Occupation:

Kirana Store Owner

Years in Business:

6 Years

Location:

Jaipur, Rajasthan

Include:

English | हिंदी

at the top.

Primary CTA:

“Continue”

Also explain briefly:

“We’ll help you organize legitimate evidence from your financial life into a Financial Resume.”

==================================================

7. SCREEN 2 — EVIDENCE VAULT

==================================================

This is one of the most important screens.

Title:

“My Evidence Vault”

Subtitle:

“Bring together the evidence that tells your financial story.”

DO NOT include:

- Connect Bank

- Connect UPI

- Bank account linking

- Automatic transaction connection

For this MVP, the user uploads evidence manually.

Create evidence categories:

1. Repayment Evidence

Examples:

- Loan repayment receipts

- Installment records

- Lender acknowledgements

- MFI repayment records

2. Payment Evidence

Examples:

- Electricity bills

- Water bills

- Rent receipts

- Mobile/telecom bills

- Recurring payment records

3. Business Evidence

Examples:

- Supplier invoices

- Wholesaler receipts

- Sales receipts

- Business records

- Market/vendor association records

4. Income Evidence

Examples:

- Sales records

- Income records

- Gig-worker earnings

- Salary/payment receipts

5. Tax Evidence

Examples:

- Tax-payment receipts

- Income-tax payment evidence

- GST-related documents

6. Asset Evidence

Examples:

- Equipment purchase invoices

- Vehicle documents

- Ownership documents

- Warranty cards

7. Supporting Evidence

Examples:

- Affidavits

- Self-declarations

- References

- Other supporting documents

Each category should be visually represented with an icon.

Primary CTA:

“+ Add Evidence”

==================================================

8. EVIDENCE UPLOAD EXPERIENCE

==================================================

When the user clicks Add Evidence, show a clean upload modal.

Allow:

PDF

JPG

JPEG

PNG

DOCX

Show:

“Upload your document”

“Supported formats: PDF, JPG, JPEG, PNG, DOCX”

Allow the user to select the evidence category.

Example:

Category:

Repayment Evidence

File:

loan_repayment_receipt.pdf

After upload, add it to Recent Uploads.

==================================================

9. EVIDENCE STATUS SYSTEM

==================================================

IMPORTANT:

DO NOT mark every document as Verified.

The system must visibly distinguish evidence quality.

Use statuses such as:

VERIFIED

DOCUMENTED

SELF-DECLARED

UNDER REVIEW

NOT VERIFIED

LOW QUALITY

UNREADABLE

DUPLICATE

CONTRADICTORY

Example:

Loan Repayment Receipt

→ Documented ✓

Electricity Bill

→ Verified ✓

Supplier Invoice

→ Under Review

Tax Payment Receipt

→ Not Verified ⚠

Handwritten Sales Note

→ Low Quality ⚠

Duplicate Invoice

→ Duplicate ⚠

Unreadable Sales Register

→ Unreadable ⚠

This is important because TrustPulse should NOT pretend that uploaded documents are automatically authentic.

==================================================

10. RECENT UPLOADS

==================================================

Show a “Recent Uploads” section.

Example:

Loan Repayment Receipt

PDF

Documented

Electricity Bill

JPEG

Verified

Supplier Invoice

PDF

Under Review

Tax Payment Receipt

PDF

Not Verified

Shop Rent Receipt

JPEG

Low Quality

Handwritten Sales Note

JPG

Low Quality

Daily Sales Register

DOCX

Unreadable

Allow:

- View

- Remove

- Re-upload

- See status/reason

Use realistic filenames.

==================================================

11. EVIDENCE INTEGRITY

==================================================

The prototype should simulate a meaningful evidence integrity layer.

For each uploaded document, extract or simulate:

document_type

date

amount

issuer/vendor

payment status

evidence category

verification level

quality

recency

possible anomaly

Example structured result:

{

  document_type: "loan_repayment",

  amount: 25000,

  installments: 10,

  paid: 10,

  late: 0,

  date: "2026-05-17",

  evidence_level: "documented"

}

For the prototype, use deterministic mock extraction/data where necessary.

Do not fake external verification.

If something cannot actually be independently verified, label it accordingly.

==================================================

12. SCREEN 3 — AI EVIDENCE ANALYSIS

==================================================

After evidence is uploaded, provide an “Analyze My Evidence” action.

Show an engaging AI processing screen.

Title:

“AI Evidence Analysis”

Subtitle:

“We’re turning your documents into meaningful financial signals.”

Show processing stages:

01 Document Understanding

02 Information Extraction

03 Evidence Classification

04 Consistency Check

05 Evidence Triangulation

06 Signal Generation

Show each stage completing.

Do not use an unnecessarily long loading animation.

Then show the extracted findings.

Example:

LOAN REPAYMENT RECEIPTS

10 installments found

10 paid

0 late

Signal:

Strong Repayment Reliability

ELECTRICITY BILLS

11 months detected

Consistent payments

Signal:

Strong Payment Discipline

SUPPLIER INVOICES

8 months of business activity

Signal:

Good Business Continuity

TAX PAYMENT RECEIPT

Formal financial participation detected

Signal:

Positive Supporting Evidence

SALES RECORDS

Steady business income pattern

Signal:

Good Income Evidence

==================================================

13. EVIDENCE TRIANGULATION

==================================================

Make this a visually important component.

Title:

“Evidence Triangulation”

Example:

“3 independent evidence sources support regular business activity and continuity.”

Show a visual connection between:

Supplier Invoices

+

Shop Rent Receipts

+

Electricity Bills

↓

Business Continuity

The purpose is to show:

One document = one clue

Multiple independent documents = stronger corroboration

Do not claim absolute fraud detection.

==================================================

14. SCORING ENGINE

==================================================

Use a transparent deterministic scoring engine for the MVP.

Do NOT claim that the score is statistically validated credit risk prediction.

The MVP is a prototype scoring framework.

For the primary Kirana Store Owner persona, use:

Repayment Reliability = 30%

Payment Discipline = 25%

Business Continuity = 25%

Income & Sales Capacity = 20%

Each evidence item has:

Signal Score S_i = 0–100

Quality Multiplier Q_i

Recency Factor T_i

Quality:

Verified = 1.0

Documented = 0.6

Self-Declared = 0.2

Recency:

<90 days = 1.0

90–180 days = 0.8

181–365 days = 0.5

>365 days = 0.2

Dimension score:

D_j =

SUM(S_i × Q_i × T_i)

/

SUM(Q_i × T_i)

Trust Score:

Trust Score =

SUM(D_j × W_j)

Normalize the final score to 0–100.

The score must actually change when evidence changes.

==================================================

15. CONFIDENCE SCORE

==================================================

Trust Score and Confidence Score MUST be separate.

Trust Score answers:

“What does the available evidence suggest?”

Confidence Score answers:

“How strongly can we support that conclusion?”

Use:

Average evidence quality

+

Dimension coverage

+

Triangulation

-

Anomaly penalties

Prototype formula:

Confidence =

MIN(

100,

(40 × AverageQuality)

+

(30 × CoverageRatio)

+

(30 × TriangulationBonus)

-

AnomalyPenalty

)

Where:

AverageQuality = average Q

CoverageRatio =

active scoring dimensions / 4

TriangulationBonus =

1 if at least 3 independent sources corroborate an important signal

otherwise 0

Anomaly penalty:

15 points per meaningful duplicate/date contradiction for the prototype.

Make sure the result remains between 0 and 100.

==================================================

16. SCREEN 4 — TRUST PROFILE

==================================================

This is the HERO SCREEN.

Title:

“My Trust Profile”

Show prominently:

TRUST SCORE

76 / 100

GOOD

Next to it:

CONFIDENCE

83 / 100

HIGH CONFIDENCE

Do not use “credit score” as the primary terminology.

This is a Trust Score, not a CIBIL score.

Show:

Score Breakdown

Repayment Reliability

88 / 100

Payment Discipline

81 / 100

Business Continuity

74 / 100

Income & Sales Capacity

61 / 100

Use clean progress bars.

==================================================

17. EVIDENCE QUALITY BREAKDOWN

==================================================

Show:

18 Evidence Items

8 Verified

7 Documented

3 Self-Declared

Also show warning indicators for problematic evidence.

Example:

2 items require review

1 item has low quality

1 possible duplicate detected

==================================================

18. WHY THIS SCORE?

==================================================

Show an expandable or visible explanation.

Title:

“Why your Trust Score looks this way”

Positive factors:

+ Strong repayment history

+ Consistent recurring payments

+ Sustained business activity

+ Supporting tax-payment evidence

Uncertainty:

“Income capacity is less certain because independently verified income evidence is limited.”

The system should explain the score in simple language.

==================================================

19. AI RECOMMENDATIONS

==================================================

Place AI recommendations BELOW the Trust Profile on the same screen.

Do NOT create another screen.

Title:

“AI Recommendations”

Subtitle:

“Here’s how you can strengthen your Financial Resume.”

Example recommendations:

1.

“Add recent sales or income evidence”

→ Improve Income & Sales Capacity

2.

“Continue maintaining consistent tax and bill payments”

→ Strengthen Payment Discipline

3.

“Add supporting supplier records”

→ Strengthen Business Continuity

4.

“Replace low-quality or unreadable documents”

→ Improve Evidence Confidence

Recommendations should be personalized based on the user's weakest dimensions and evidence gaps.

==================================================

20. FINANCIAL RESUME

==================================================

After the Trust Profile, allow:

“View My Financial Resume”

Create a polished Financial Resume.

It should resemble a professional financial profile, NOT a traditional CV.

Sections:

FINANCIAL IDENTITY

Ramesh Kumar

Kirana Store Owner

6 Years in Business

Jaipur, Rajasthan

TRUST PROFILE

Trust Score: 76 / 100

Confidence: 83 / 100

FINANCIAL SIGNALS

Repayment Reliability: 88

Payment Discipline: 81

Business Continuity: 74

Income & Sales Capacity: 61

EVIDENCE

18 evidence items

8 Verified

7 Documented

3 Self-Declared

STRONGEST EVIDENCE

Loan repayment history

Recurring utility payments

Supplier activity

Tax-payment evidence

EVIDENCE GAPS

Limited verified income evidence

Some low-quality documents

AI INSIGHT

“Your profile shows consistent repayment behavior and sustained business activity, while income capacity remains less certain due to limited verified evidence.”

==================================================

21. DECISION CARD

==================================================

The MVP ends here.

Generate a polished:

FINANCIAL DECISION CARD

This is NOT a loan approval.

It is NOT a bank decision.

It is a standardized summary of the evidence available in the borrower's Financial Resume.

Show:

Applicant:

Ramesh Kumar

Occupation:

Kirana Store Owner

Trust Score:

76 / 100

Confidence:

83 / 100

Evidence Strength:

HIGH

Key Positive Signals:

- Consistent repayment history

- Recurring payment discipline

- Sustained business activity

Evidence Concerns:

- Limited independently verified income evidence

- Some documents require review

Evidence Integrity:

18 total evidence items

8 Verified

7 Documented

3 Self-Declared

AI Assessment:

“The available evidence indicates consistent repayment behavior and sustained business activity. Income capacity remains less certain due to limited independently verified income evidence.”

Suggested Next Step:

“Additional verification / underwriting may be required.”

Include:

“Generated by TrustPulse”

Do not say:

“Loan Approved”

Do not say:

“Loan Rejected”

Do not claim:

“This person is guaranteed to repay.”

==================================================

22. BORROWER EXPERIENCE

==================================================

The application should feel empowering rather than judgmental.

Never tell the user:

“You are risky.”

Prefer:

“Your profile currently has limited evidence in this area.”

Never say:

“You have a bad credit score.”

Instead:

“Your Trust Profile can be strengthened.”

Never shame users for having weak evidence.

==================================================

23. RESPONSIVE DESIGN

==================================================

Build a responsive web application.

Desktop:

Optimized for presentation/demo.

Tablet:

Fully responsive.

Mobile:

The entire borrower journey must remain usable.

The prototype will likely be demonstrated on a laptop, so prioritize an excellent desktop experience while maintaining responsive behavior.

==================================================

24. DATA MODEL

==================================================

Create a clean data model for:

UserProfile

Evidence

EvidenceAnalysis

FinancialSignal

TrustProfile

Recommendation

FinancialResume

DecisionCard

Example Evidence object:

{

  id,

  category,

  filename,

  fileType,

  uploadDate,

  documentDate,

  amount,

  extractedData,

  qualityLevel,

  verificationStatus,

  recencyFactor,

  anomalyFlags

}

The architecture should make it possible to add more evidence categories and occupations later.

==================================================

25. DEMO MODE

==================================================

Because this is a hackathon prototype, create a realistic seeded demo profile for:

Ramesh Kumar

Kirana Store Owner

Pre-populate realistic evidence so the application is immediately demoable.

However, the user should also be able to add/remove evidence and see the Trust Profile update.

IMPORTANT:

If a user removes a major repayment document, the Repayment Reliability score should decrease.

If a user adds corroborating business evidence, Business Continuity and/or Confidence should improve.

If a duplicate or contradictory document is added, Confidence should decrease.

The scoring must be deterministic and reproducible.

==================================================

26. AI IMPLEMENTATION

==================================================

Use AI/document processing where practical.

For the hackathon prototype, it is acceptable to use mock deterministic extraction for seeded demo documents.

The UI should still clearly represent the conceptual AI pipeline:

Document

→ OCR / extraction

→ structured information

→ evidence classification

→ validation

→ signal generation

Do not fabricate external verification.

Do not claim the prototype has access to government, bank, UPI or credit-bureau databases unless actually implemented.

==================================================

27. PRIVACY & TRUST

==================================================

Because the app handles sensitive financial evidence, communicate:

“Your evidence belongs to you.”

Include appropriate privacy messaging.

Prototype security should include:

- Auth-ready architecture

- Secure file handling

- Input validation

- Role-aware architecture

- No exposure of sensitive information in URLs

- Basic audit-friendly data structure

Do not falsely claim “bank-grade security” unless actually implemented.

==================================================

28. FUTURE-READY ARCHITECTURE

==================================================

Design the architecture so future versions can support:

Regional Indian languages

Verified financial data integrations

Account Aggregator ecosystem

Government/business verification

More occupation-specific models

Real repayment outcome calibration

Machine-learning risk models

Bank/financial institution integrations

Consent-based Financial Resume sharing

But NONE of these should appear as implemented features in the MVP.

They can be shown as future scope elsewhere.

==================================================

29. IMPORTANT TERMINOLOGY

==================================================

Use:

Trust Score

Confidence Score

Financial Resume

Evidence Vault

Financial Identity

Evidence Quality

Evidence Triangulation

Financial Signals

AI Recommendations

Decision Card

Avoid positioning TrustPulse as a replacement for CIBIL or regulated credit underwriting.

The product supports financial visibility and assessment.

==================================================

30. FINAL USER JOURNEY

==================================================

The finished application should feel like:

STEP 01

“I introduce myself.”

↓

STEP 02

“I show what financial evidence I have.”

↓

STEP 03

“TrustPulse understands and evaluates my evidence.”

↓

STEP 04

“I understand what my evidence says about me and how I can improve.”

↓

FINALLY

“I have a Financial Resume and Decision Card that clearly represent my financial story.”

==================================================

31. QUALITY BAR

==================================================

This must NOT look like a generic AI-generated dashboard.

Prioritize:

- Excellent visual hierarchy

- Large readable typography

- Beautiful spacing

- Strong micro-interactions

- Smooth transitions

- Meaningful empty/loading/error states

- Accessible color contrast

- Consistent iconography

- Professional fintech visual language

- Responsive layout

- Clean reusable components

Avoid overcrowding.

Every screen should have one obvious primary purpose.

The final product should look like something that could realistically become a fintech startup product.

==================================================

32. FINAL PRODUCT STATEMENT

==================================================

The product should communicate this idea throughout:

“Financially active. Financially invisible.”

“TrustPulse turns everyday financial evidence into financial identity.”

“The evidence already exists. We make it visible.”

The application should make the borrower feel:

“I already have a financial story.

TrustPulse helps me prove it.”

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e53f29bb-bc69-44ec-8435-b848d0d61534).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

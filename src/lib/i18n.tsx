import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "hi";

type Dict = Record<string, string>;

const en: Dict = {
  "brand.name": "TrustPulse",
  "brand.tagline": "The Financial Resume for the Credit-Invisible",
  "brand.statement": "Financially active. Financially invisible.",
  "brand.sub": "TrustPulse turns everyday financial evidence into financial identity.",

  "nav.identity": "Identity",
  "nav.evidence": "Evidence",
  "nav.analysis": "Analysis",
  "nav.trust": "Trust Profile",
  "nav.resume": "Financial Resume",
  "nav.language": "Language",

  "common.continue": "Continue",
  "common.back": "Back",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.view": "View",
  "common.remove": "Remove",
  "common.reupload": "Re-upload",
  "common.of": "of",
  "common.reset": "Reset demo data",
  "common.print": "Print / Save",
  "common.privacy": "Your evidence belongs to you. Nothing is shared without your consent.",
  "common.prototype": "Prototype scoring framework — not a regulated credit decision.",

  "step.01": "Identity",
  "step.02": "Evidence",
  "step.03": "Analysis",
  "step.04": "Trust Profile",

  "identity.headline": "Build your Financial Resume.",
  "identity.support": "Your financial story already exists. Let's make it visible.",
  "identity.explain":
    "We'll help you organize legitimate evidence from your financial life into a Financial Resume.",
  "identity.greeting": "Your Financial Identity",
  "identity.preview.empty": "Fill in the form and your identity preview appears here.",
  "identity.preview.hint": "Anyone, anywhere — your details, your resume.",
  "identity.persona.occupation": "Kirana Store Owner",
  "identity.persona.location": "Jaipur, Rajasthan",
  "identity.field.name": "Full Name",
  "identity.field.occupation": "Occupation / Business Type",
  "identity.field.years": "Years in Business",
  "identity.field.location": "Location",
  "identity.years.suffix": "Years",
  "identity.error.name": "Please enter your full name.",
  "identity.error.occupation": "Please enter your occupation or business type.",
  "identity.error.years": "Please enter a valid number of years.",
  "identity.error.location": "Please enter your location.",
  "identity.value.name": "Your full name",
  "identity.value.occupation": "e.g. shop owner, driver, tailor, farmer",
  "identity.value.location": "City, region or country",

  "vault.title": "My Evidence Vault",
  "vault.subtitle": "Bring together the evidence that tells your financial story.",
  "vault.add": "+ Add Evidence",
  "vault.recent": "Recent Uploads",
  "vault.empty": "No evidence yet. Add your first document to begin your Financial Resume.",
  "vault.items": "items",
  "vault.analyze": "Analyze My Evidence",
  "vault.categories": "Evidence Categories",

  "cat.repayment": "Repayment Evidence",
  "cat.repayment.ex": "Loan repayment receipts, installment records, lender acknowledgements, MFI records",
  "cat.payment": "Payment Evidence",
  "cat.payment.ex": "Electricity bills, water bills, rent receipts, mobile bills, recurring payments",
  "cat.business": "Business Evidence",
  "cat.business.ex": "Supplier invoices, wholesaler receipts, sales receipts, association records",
  "cat.income": "Income Evidence",
  "cat.income.ex": "Sales records, income records, gig-worker earnings, payment receipts",
  "cat.tax": "Tax Evidence",
  "cat.tax.ex": "Tax payment receipts, income-tax evidence, GST-related documents",
  "cat.asset": "Asset Evidence",
  "cat.asset.ex": "Equipment invoices, vehicle documents, ownership documents, warranty cards",
  "cat.supporting": "Supporting Evidence",
  "cat.supporting.ex": "Affidavits, self-declarations, references, other supporting documents",

  "upload.title": "Upload your document",
  "upload.formats": "Supported formats: PDF, JPG, JPEG, PNG, DOCX",
  "upload.category": "Category",
  "upload.file": "File",
  "upload.choose": "Choose a file",
  "upload.name": "Document name",
  "upload.date": "Document date",
  "upload.submit": "Add to Vault",
  "upload.error.file": "Please select a supported file (PDF, JPG, JPEG, PNG, DOCX).",
  "upload.error.category": "Please select an evidence category.",
  "upload.note":
    "We label evidence honestly. A document that cannot be independently checked will be marked accordingly.",

  "status.verified": "Verified",
  "status.documented": "Documented",
  "status.self_declared": "Self-Declared",
  "status.under_review": "Under Review",
  "status.not_verified": "Not Verified",
  "status.low_quality": "Low Quality",
  "status.unreadable": "Unreadable",
  "status.duplicate": "Duplicate",
  "status.contradictory": "Contradictory",

  "reason.verified": "Issuer details and payment status are consistent and readable.",
  "reason.documented": "Document is readable and internally consistent, but not independently checked.",
  "reason.self_declared": "Provided by you without an independent issuer.",
  "reason.under_review": "Some fields need a closer look before this counts fully.",
  "reason.not_verified": "We cannot independently confirm this document in the prototype.",
  "reason.low_quality": "Scan is blurred or partially unreadable.",
  "reason.unreadable": "Text could not be extracted from this file.",
  "reason.duplicate": "This appears to match another document already in your vault.",
  "reason.contradictory": "Dates or amounts conflict with another document.",

  "detail.title": "Evidence details",
  "detail.documentType": "Document type",
  "detail.issuer": "Issuer / Vendor",
  "detail.amount": "Amount",
  "detail.date": "Document date",
  "detail.uploaded": "Uploaded",
  "detail.category": "Category",
  "detail.status": "Verification level",
  "detail.quality": "Quality",
  "detail.recency": "Recency factor",
  "detail.anomaly": "Possible anomaly",
  "detail.none": "None detected",
  "detail.extracted": "Extracted information",

  "analysis.title": "AI Evidence Analysis",
  "analysis.subtitle": "We're turning your documents into meaningful financial signals.",
  "analysis.stage.1": "Document Understanding",
  "analysis.stage.2": "Information Extraction",
  "analysis.stage.3": "Evidence Classification",
  "analysis.stage.4": "Consistency Check",
  "analysis.stage.5": "Evidence Triangulation",
  "analysis.stage.6": "Signal Generation",
  "analysis.findings": "Findings",
  "analysis.signal": "Signal",
  "analysis.viewTrust": "View My Trust Profile",
  "analysis.running": "Analyzing",
  "analysis.done": "Analysis complete",
  "analysis.empty": "Add evidence to your vault before running analysis.",

  "find.repayment.title": "Loan Repayment Receipts",
  "find.repayment.signal": "Strong Repayment Reliability",
  "find.payment.title": "Recurring Bills & Rent",
  "find.payment.signal": "Strong Payment Discipline",
  "find.business.title": "Supplier Invoices",
  "find.business.signal": "Good Business Continuity",
  "find.tax.title": "Tax Payment Evidence",
  "find.tax.signal": "Positive Supporting Evidence",
  "find.income.title": "Sales & Income Records",
  "find.income.signal": "Good Income Evidence",
  "find.asset.title": "Asset & Equipment Records",
  "find.asset.signal": "Supports Business Investment",
  "find.supporting.title": "Supporting Documents",
  "find.supporting.signal": "Contextual Supporting Evidence",
  "find.items": "usable items",
  "find.excluded": "excluded (duplicate / unreadable)",

  "tri.title": "Evidence Triangulation",
  "tri.desc": "independent evidence sources support regular business activity and continuity.",
  "tri.result": "Business Continuity",
  "tri.none":
    "Not enough independent sources yet. Add evidence from a different part of your financial life to corroborate business activity.",
  "tri.note": "One document is one clue. Several independent documents corroborate each other.",

  "trust.title": "My Trust Profile",
  "trust.score": "Trust Score",
  "trust.confidence": "Confidence",
  "trust.breakdown": "Score Breakdown",
  "trust.quality": "Evidence Quality Breakdown",
  "trust.warnings": "Items to look at",
  "trust.why": "Why your Trust Score looks this way",
  "trust.positive": "What is working in your favour",
  "trust.uncertain": "Where the evidence is less certain",
  "trust.viewResume": "View My Financial Resume",
  "trust.addMore": "Add more evidence",
  "trust.evidenceItems": "Evidence Items",
  "trust.trustQ": "What does the available evidence suggest?",
  "trust.confQ": "How strongly can we support that conclusion?",

  "band.strong": "Strong",
  "band.good": "Good",
  "band.building": "Building",
  "band.early": "Early Stage",
  "conf.high": "High Confidence",
  "conf.moderate": "Moderate Confidence",
  "conf.limited": "Limited Confidence",

  "dim.repayment": "Repayment Reliability",
  "dim.discipline": "Payment Discipline",
  "dim.continuity": "Business Continuity",
  "dim.income": "Income & Sales Capacity",

  "warn.review": "items require review",
  "warn.low": "items have low quality",
  "warn.duplicate": "possible duplicates detected",
  "warn.unreadable": "items are unreadable",
  "warn.none": "No problems detected in your evidence.",

  "why.repayment": "Strong repayment history across closed loan and installment records",
  "why.discipline": "Consistent recurring payments for electricity, water and telecom",
  "why.continuity": "Sustained business activity across suppliers and equipment records",
  "why.tax": "Supporting tax-payment evidence shows formal financial participation",
  "why.uncertain.income":
    "Income capacity is less certain because independently verified income evidence is limited.",
  "why.uncertain.quality":
    "A few documents are low quality or unreadable, so they contribute little to your profile.",
  "why.uncertain.coverage":
    "Some scoring areas have no evidence yet, so the picture is still partial.",
  "why.encourage": "Your Trust Profile can be strengthened — here is exactly how.",

  "rec.title": "AI Recommendations",
  "rec.subtitle": "Here's how you can strengthen your Financial Resume.",
  "rec.repayment.title": "Add recent loan or installment repayment records",
  "rec.repayment.impact": "Improve Repayment Reliability",
  "rec.discipline.title": "Continue maintaining consistent tax and bill payments",
  "rec.discipline.impact": "Strengthen Payment Discipline",
  "rec.continuity.title": "Add supporting supplier or wholesaler records",
  "rec.continuity.impact": "Strengthen Business Continuity",
  "rec.income.title": "Add recent sales or income evidence",
  "rec.income.impact": "Improve Income & Sales Capacity",
  "rec.quality.title": "Replace low-quality or unreadable documents",
  "rec.quality.impact": "Improve Evidence Confidence",
  "rec.duplicate.title": "Remove duplicate documents from your vault",
  "rec.duplicate.impact": "Improve Evidence Confidence",
  "rec.triangulate.title": "Add evidence from a different part of your financial life",
  "rec.triangulate.impact": "Unlock Evidence Triangulation",

  "resume.title": "Financial Resume",
  "resume.identity": "Financial Identity",
  "resume.trust": "Trust Profile",
  "resume.signals": "Financial Signals",
  "resume.evidence": "Evidence",
  "resume.strongest": "Strongest Evidence",
  "resume.gaps": "Evidence Gaps",
  "resume.insight": "AI Insight",
  "resume.generated": "Generated by TrustPulse",
  "resume.viewCard": "Generate Financial Decision Card",
  "resume.yearsInBusiness": "Years in Business",

  "card.title": "Financial Decision Card",
  "card.disclaimer":
    "This is not a loan approval or a bank decision. It is a standardized summary of the evidence in this Financial Resume.",
  "card.applicant": "Applicant",
  "card.occupation": "Occupation",
  "card.strength": "Evidence Strength",
  "card.positives": "Key Positive Signals",
  "card.concerns": "Evidence Concerns",
  "card.integrity": "Evidence Integrity",
  "card.assessment": "AI Assessment",
  "card.next": "Suggested Next Step",
  "card.next.value": "Additional verification / underwriting may be required.",
  "card.strength.high": "HIGH",
  "card.strength.moderate": "MODERATE",
  "card.strength.emerging": "EMERGING",
  "card.total": "total evidence items",

  "sig.pos.repayment": "Consistent repayment history",
  "sig.pos.discipline": "Recurring payment discipline",
  "sig.pos.continuity": "Sustained business activity",
  "sig.pos.income": "Steady income evidence",
  "sig.con.income": "Limited independently verified income evidence",
  "sig.con.review": "Some documents require review",
  "sig.con.duplicate": "A duplicate document was detected",
  "sig.con.coverage": "Some scoring areas have no evidence yet",

  "insight.text":
    "Your profile shows consistent repayment behavior and sustained business activity, while income capacity remains less certain due to limited verified evidence.",
  "assessment.text":
    "The available evidence indicates consistent repayment behavior and sustained business activity. Income capacity remains less certain due to limited independently verified income evidence.",

  "gap.income": "Limited verified income evidence",
  "gap.quality": "Some low-quality documents",
  "gap.duplicate": "Duplicate document detected",
  "gap.none": "No significant gaps detected",

  "future.title": "Future scope",
  "future.desc":
    "Regional Indian languages, consent-based sharing, Account Aggregator support and verified data integrations are planned, and are not part of this prototype.",
};

const hi: Dict = {
  "brand.name": "TrustPulse",
  "brand.tagline": "क्रेडिट-अदृश्य लोगों के लिए वित्तीय रिज़्यूमे",
  "brand.statement": "वित्तीय रूप से सक्रिय। वित्तीय रूप से अदृश्य।",
  "brand.sub": "TrustPulse रोज़मर्रा के वित्तीय प्रमाणों को वित्तीय पहचान में बदलता है।",

  "nav.identity": "पहचान",
  "nav.evidence": "प्रमाण",
  "nav.analysis": "विश्लेषण",
  "nav.trust": "ट्रस्ट प्रोफ़ाइल",
  "nav.resume": "वित्तीय रिज़्यूमे",
  "nav.language": "भाषा",

  "common.continue": "आगे बढ़ें",
  "common.back": "वापस",
  "common.cancel": "रद्द करें",
  "common.close": "बंद करें",
  "common.view": "देखें",
  "common.remove": "हटाएँ",
  "common.reupload": "दोबारा अपलोड करें",
  "common.of": "में से",
  "common.reset": "डेमो डेटा रीसेट करें",
  "common.print": "प्रिंट / सेव करें",
  "common.privacy": "आपके प्रमाण आपके हैं। आपकी अनुमति के बिना कुछ भी साझा नहीं होता।",
  "common.prototype": "यह एक प्रोटोटाइप स्कोरिंग ढाँचा है — कोई नियामक क्रेडिट निर्णय नहीं।",

  "step.01": "पहचान",
  "step.02": "प्रमाण",
  "step.03": "विश्लेषण",
  "step.04": "ट्रस्ट प्रोफ़ाइल",

  "identity.headline": "अपना वित्तीय रिज़्यूमे बनाएँ।",
  "identity.support": "आपकी वित्तीय कहानी पहले से मौजूद है। आइए उसे दिखाई देने योग्य बनाएँ।",
  "identity.explain":
    "हम आपके वित्तीय जीवन के वैध प्रमाणों को एक वित्तीय रिज़्यूमे में व्यवस्थित करने में मदद करेंगे।",
  "identity.greeting": "आपकी वित्तीय पहचान",
  "identity.preview.empty": "फ़ॉर्म भरें — आपकी पहचान की झलक यहाँ दिखेगी।",
  "identity.preview.hint": "कोई भी, कहीं भी — आपका विवरण, आपका रिज़्यूमे।",
  "identity.persona.occupation": "किराना स्टोर मालिक",
  "identity.persona.location": "जयपुर, राजस्थान",
  "identity.field.name": "पूरा नाम",
  "identity.field.occupation": "व्यवसाय / कार्य का प्रकार",
  "identity.field.years": "व्यवसाय के वर्ष",
  "identity.field.location": "स्थान",
  "identity.years.suffix": "वर्ष",
  "identity.error.name": "कृपया अपना पूरा नाम दर्ज करें।",
  "identity.error.occupation": "कृपया अपना व्यवसाय दर्ज करें।",
  "identity.error.years": "कृपया वर्षों की सही संख्या दर्ज करें।",
  "identity.error.location": "कृपया अपना स्थान दर्ज करें।",
  "identity.value.name": "आपका पूरा नाम",
  "identity.value.occupation": "जैसे दुकानदार, ड्राइवर, दर्ज़ी, किसान",
  "identity.value.location": "शहर, राज्य या देश",

  "vault.title": "मेरा प्रमाण वॉल्ट",
  "vault.subtitle": "वे प्रमाण एक साथ लाएँ जो आपकी वित्तीय कहानी बताते हैं।",
  "vault.add": "+ प्रमाण जोड़ें",
  "vault.recent": "हाल के अपलोड",
  "vault.empty": "अभी कोई प्रमाण नहीं है। अपना पहला दस्तावेज़ जोड़कर शुरुआत करें।",
  "vault.items": "दस्तावेज़",
  "vault.analyze": "मेरे प्रमाणों का विश्लेषण करें",
  "vault.categories": "प्रमाण श्रेणियाँ",

  "cat.repayment": "पुनर्भुगतान प्रमाण",
  "cat.repayment.ex": "ऋण भुगतान रसीदें, किस्त रिकॉर्ड, ऋणदाता पावती, MFI रिकॉर्ड",
  "cat.payment": "भुगतान प्रमाण",
  "cat.payment.ex": "बिजली बिल, पानी बिल, किराया रसीद, मोबाइल बिल, नियमित भुगतान",
  "cat.business": "व्यवसाय प्रमाण",
  "cat.business.ex": "सप्लायर इनवॉइस, थोक विक्रेता रसीदें, बिक्री रसीदें, संघ रिकॉर्ड",
  "cat.income": "आय प्रमाण",
  "cat.income.ex": "बिक्री रिकॉर्ड, आय रिकॉर्ड, गिग कार्य आय, भुगतान रसीदें",
  "cat.tax": "कर प्रमाण",
  "cat.tax.ex": "कर भुगतान रसीदें, आयकर प्रमाण, GST संबंधित दस्तावेज़",
  "cat.asset": "संपत्ति प्रमाण",
  "cat.asset.ex": "उपकरण इनवॉइस, वाहन दस्तावेज़, स्वामित्व दस्तावेज़, वारंटी कार्ड",
  "cat.supporting": "सहायक प्रमाण",
  "cat.supporting.ex": "शपथ पत्र, स्व-घोषणा, संदर्भ, अन्य सहायक दस्तावेज़",

  "upload.title": "अपना दस्तावेज़ अपलोड करें",
  "upload.formats": "समर्थित प्रारूप: PDF, JPG, JPEG, PNG, DOCX",
  "upload.category": "श्रेणी",
  "upload.file": "फ़ाइल",
  "upload.choose": "फ़ाइल चुनें",
  "upload.name": "दस्तावेज़ का नाम",
  "upload.date": "दस्तावेज़ की तारीख़",
  "upload.submit": "वॉल्ट में जोड़ें",
  "upload.error.file": "कृपया समर्थित फ़ाइल चुनें (PDF, JPG, JPEG, PNG, DOCX)।",
  "upload.error.category": "कृपया प्रमाण श्रेणी चुनें।",
  "upload.note":
    "हम प्रमाणों को ईमानदारी से लेबल करते हैं। जिस दस्तावेज़ की स्वतंत्र जाँच संभव नहीं, उसे वैसा ही दर्शाया जाएगा।",

  "status.verified": "सत्यापित",
  "status.documented": "प्रलेखित",
  "status.self_declared": "स्व-घोषित",
  "status.under_review": "समीक्षा में",
  "status.not_verified": "सत्यापित नहीं",
  "status.low_quality": "कम गुणवत्ता",
  "status.unreadable": "अपठनीय",
  "status.duplicate": "डुप्लिकेट",
  "status.contradictory": "विरोधाभासी",

  "reason.verified": "जारीकर्ता विवरण और भुगतान स्थिति सुसंगत और पठनीय हैं।",
  "reason.documented": "दस्तावेज़ पठनीय और सुसंगत है, पर स्वतंत्र रूप से जाँचा नहीं गया।",
  "reason.self_declared": "यह आपके द्वारा दिया गया है, किसी स्वतंत्र जारीकर्ता के बिना।",
  "reason.under_review": "कुछ जानकारी की और जाँच आवश्यक है।",
  "reason.not_verified": "इस प्रोटोटाइप में हम इसकी स्वतंत्र पुष्टि नहीं कर सकते।",
  "reason.low_quality": "स्कैन धुंधला या आंशिक रूप से अपठनीय है।",
  "reason.unreadable": "इस फ़ाइल से टेक्स्ट नहीं निकाला जा सका।",
  "reason.duplicate": "यह आपके वॉल्ट में मौजूद किसी अन्य दस्तावेज़ से मेल खाता है।",
  "reason.contradictory": "तारीख़ या राशि किसी अन्य दस्तावेज़ से मेल नहीं खाती।",

  "detail.title": "प्रमाण विवरण",
  "detail.documentType": "दस्तावेज़ प्रकार",
  "detail.issuer": "जारीकर्ता / विक्रेता",
  "detail.amount": "राशि",
  "detail.date": "दस्तावेज़ की तारीख़",
  "detail.uploaded": "अपलोड किया गया",
  "detail.category": "श्रेणी",
  "detail.status": "सत्यापन स्तर",
  "detail.quality": "गुणवत्ता",
  "detail.recency": "नवीनता कारक",
  "detail.anomaly": "संभावित विसंगति",
  "detail.none": "कोई नहीं मिली",
  "detail.extracted": "निकाली गई जानकारी",

  "analysis.title": "AI प्रमाण विश्लेषण",
  "analysis.subtitle": "हम आपके दस्तावेज़ों को सार्थक वित्तीय संकेतों में बदल रहे हैं।",
  "analysis.stage.1": "दस्तावेज़ समझना",
  "analysis.stage.2": "जानकारी निकालना",
  "analysis.stage.3": "प्रमाण वर्गीकरण",
  "analysis.stage.4": "संगति जाँच",
  "analysis.stage.5": "प्रमाण त्रिकोणीकरण",
  "analysis.stage.6": "संकेत निर्माण",
  "analysis.findings": "निष्कर्ष",
  "analysis.signal": "संकेत",
  "analysis.viewTrust": "मेरी ट्रस्ट प्रोफ़ाइल देखें",
  "analysis.running": "विश्लेषण जारी है",
  "analysis.done": "विश्लेषण पूरा हुआ",
  "analysis.empty": "विश्लेषण से पहले वॉल्ट में प्रमाण जोड़ें।",

  "find.repayment.title": "ऋण भुगतान रसीदें",
  "find.repayment.signal": "मज़बूत पुनर्भुगतान विश्वसनीयता",
  "find.payment.title": "नियमित बिल और किराया",
  "find.payment.signal": "मज़बूत भुगतान अनुशासन",
  "find.business.title": "सप्लायर इनवॉइस",
  "find.business.signal": "अच्छी व्यावसायिक निरंतरता",
  "find.tax.title": "कर भुगतान प्रमाण",
  "find.tax.signal": "सकारात्मक सहायक प्रमाण",
  "find.income.title": "बिक्री और आय रिकॉर्ड",
  "find.income.signal": "अच्छा आय प्रमाण",
  "find.asset.title": "संपत्ति और उपकरण रिकॉर्ड",
  "find.asset.signal": "व्यावसायिक निवेश का समर्थन",
  "find.supporting.title": "सहायक दस्तावेज़",
  "find.supporting.signal": "संदर्भात्मक सहायक प्रमाण",
  "find.items": "उपयोगी दस्तावेज़",
  "find.excluded": "शामिल नहीं (डुप्लिकेट / अपठनीय)",

  "tri.title": "प्रमाण त्रिकोणीकरण",
  "tri.desc": "स्वतंत्र प्रमाण स्रोत नियमित व्यावसायिक गतिविधि और निरंतरता का समर्थन करते हैं।",
  "tri.result": "व्यावसायिक निरंतरता",
  "tri.none":
    "अभी पर्याप्त स्वतंत्र स्रोत नहीं हैं। व्यावसायिक गतिविधि की पुष्टि के लिए किसी अन्य प्रकार का प्रमाण जोड़ें।",
  "tri.note": "एक दस्तावेज़ एक संकेत है। कई स्वतंत्र दस्तावेज़ एक-दूसरे की पुष्टि करते हैं।",

  "trust.title": "मेरी ट्रस्ट प्रोफ़ाइल",
  "trust.score": "ट्रस्ट स्कोर",
  "trust.confidence": "विश्वास स्तर",
  "trust.breakdown": "स्कोर विवरण",
  "trust.quality": "प्रमाण गुणवत्ता विवरण",
  "trust.warnings": "ध्यान देने योग्य बातें",
  "trust.why": "आपका ट्रस्ट स्कोर ऐसा क्यों है",
  "trust.positive": "आपके पक्ष में क्या है",
  "trust.uncertain": "कहाँ प्रमाण कम निश्चित हैं",
  "trust.viewResume": "मेरा वित्तीय रिज़्यूमे देखें",
  "trust.addMore": "और प्रमाण जोड़ें",
  "trust.evidenceItems": "प्रमाण दस्तावेज़",
  "trust.trustQ": "उपलब्ध प्रमाण क्या दर्शाते हैं?",
  "trust.confQ": "हम उस निष्कर्ष का कितना मज़बूती से समर्थन कर सकते हैं?",

  "band.strong": "मज़बूत",
  "band.good": "अच्छा",
  "band.building": "निर्माणाधीन",
  "band.early": "प्रारंभिक चरण",
  "conf.high": "उच्च विश्वास",
  "conf.moderate": "मध्यम विश्वास",
  "conf.limited": "सीमित विश्वास",

  "dim.repayment": "पुनर्भुगतान विश्वसनीयता",
  "dim.discipline": "भुगतान अनुशासन",
  "dim.continuity": "व्यावसायिक निरंतरता",
  "dim.income": "आय एवं बिक्री क्षमता",

  "warn.review": "दस्तावेज़ों की समीक्षा आवश्यक है",
  "warn.low": "दस्तावेज़ों की गुणवत्ता कम है",
  "warn.duplicate": "संभावित डुप्लिकेट मिले",
  "warn.unreadable": "दस्तावेज़ अपठनीय हैं",
  "warn.none": "आपके प्रमाणों में कोई समस्या नहीं मिली।",

  "why.repayment": "बंद हो चुके ऋण और किस्त रिकॉर्ड में मज़बूत पुनर्भुगतान इतिहास",
  "why.discipline": "बिजली, पानी और टेलीकॉम के नियमित भुगतान",
  "why.continuity": "सप्लायर और उपकरण रिकॉर्ड में निरंतर व्यावसायिक गतिविधि",
  "why.tax": "कर भुगतान प्रमाण औपचारिक वित्तीय भागीदारी दर्शाते हैं",
  "why.uncertain.income":
    "आय क्षमता कम निश्चित है क्योंकि स्वतंत्र रूप से सत्यापित आय प्रमाण सीमित हैं।",
  "why.uncertain.quality":
    "कुछ दस्तावेज़ कम गुणवत्ता या अपठनीय हैं, इसलिए उनका योगदान कम है।",
  "why.uncertain.coverage": "कुछ क्षेत्रों में अभी कोई प्रमाण नहीं है, इसलिए तस्वीर अधूरी है।",
  "why.encourage": "आपकी ट्रस्ट प्रोफ़ाइल और मज़बूत हो सकती है — तरीका यह है।",

  "rec.title": "AI सुझाव",
  "rec.subtitle": "अपना वित्तीय रिज़्यूमे और मज़बूत करने के तरीके।",
  "rec.repayment.title": "हाल के ऋण या किस्त भुगतान रिकॉर्ड जोड़ें",
  "rec.repayment.impact": "पुनर्भुगतान विश्वसनीयता बेहतर करें",
  "rec.discipline.title": "कर और बिल भुगतान नियमित रखें",
  "rec.discipline.impact": "भुगतान अनुशासन मज़बूत करें",
  "rec.continuity.title": "सप्लायर या थोक विक्रेता रिकॉर्ड जोड़ें",
  "rec.continuity.impact": "व्यावसायिक निरंतरता मज़बूत करें",
  "rec.income.title": "हाल के बिक्री या आय प्रमाण जोड़ें",
  "rec.income.impact": "आय एवं बिक्री क्षमता बेहतर करें",
  "rec.quality.title": "कम गुणवत्ता या अपठनीय दस्तावेज़ बदलें",
  "rec.quality.impact": "प्रमाण विश्वास बेहतर करें",
  "rec.duplicate.title": "वॉल्ट से डुप्लिकेट दस्तावेज़ हटाएँ",
  "rec.duplicate.impact": "प्रमाण विश्वास बेहतर करें",
  "rec.triangulate.title": "अपने वित्तीय जीवन के किसी अन्य हिस्से का प्रमाण जोड़ें",
  "rec.triangulate.impact": "प्रमाण त्रिकोणीकरण सक्रिय करें",

  "resume.title": "वित्तीय रिज़्यूमे",
  "resume.identity": "वित्तीय पहचान",
  "resume.trust": "ट्रस्ट प्रोफ़ाइल",
  "resume.signals": "वित्तीय संकेत",
  "resume.evidence": "प्रमाण",
  "resume.strongest": "सबसे मज़बूत प्रमाण",
  "resume.gaps": "प्रमाण की कमियाँ",
  "resume.insight": "AI अंतर्दृष्टि",
  "resume.generated": "TrustPulse द्वारा तैयार",
  "resume.viewCard": "वित्तीय निर्णय कार्ड बनाएँ",
  "resume.yearsInBusiness": "व्यवसाय के वर्ष",

  "card.title": "वित्तीय निर्णय कार्ड",
  "card.disclaimer":
    "यह ऋण स्वीकृति या बैंक का निर्णय नहीं है। यह इस वित्तीय रिज़्यूमे में उपलब्ध प्रमाणों का मानकीकृत सारांश है।",
  "card.applicant": "आवेदक",
  "card.occupation": "व्यवसाय",
  "card.strength": "प्रमाण की मज़बूती",
  "card.positives": "मुख्य सकारात्मक संकेत",
  "card.concerns": "प्रमाण संबंधी चिंताएँ",
  "card.integrity": "प्रमाण अखंडता",
  "card.assessment": "AI आकलन",
  "card.next": "सुझाया गया अगला कदम",
  "card.next.value": "अतिरिक्त सत्यापन / अंडरराइटिंग आवश्यक हो सकती है।",
  "card.strength.high": "उच्च",
  "card.strength.moderate": "मध्यम",
  "card.strength.emerging": "उभरती",
  "card.total": "कुल प्रमाण दस्तावेज़",

  "sig.pos.repayment": "निरंतर पुनर्भुगतान इतिहास",
  "sig.pos.discipline": "नियमित भुगतान अनुशासन",
  "sig.pos.continuity": "निरंतर व्यावसायिक गतिविधि",
  "sig.pos.income": "स्थिर आय प्रमाण",
  "sig.con.income": "स्वतंत्र रूप से सत्यापित आय प्रमाण सीमित",
  "sig.con.review": "कुछ दस्तावेज़ों की समीक्षा आवश्यक",
  "sig.con.duplicate": "एक डुप्लिकेट दस्तावेज़ मिला",
  "sig.con.coverage": "कुछ क्षेत्रों में अभी कोई प्रमाण नहीं",

  "insight.text":
    "आपकी प्रोफ़ाइल निरंतर पुनर्भुगतान व्यवहार और स्थिर व्यावसायिक गतिविधि दिखाती है, जबकि सीमित सत्यापित प्रमाणों के कारण आय क्षमता कम निश्चित है।",
  "assessment.text":
    "उपलब्ध प्रमाण निरंतर पुनर्भुगतान व्यवहार और स्थिर व्यावसायिक गतिविधि दर्शाते हैं। स्वतंत्र रूप से सत्यापित आय प्रमाण सीमित होने के कारण आय क्षमता कम निश्चित है।",

  "gap.income": "सत्यापित आय प्रमाण सीमित",
  "gap.quality": "कुछ दस्तावेज़ कम गुणवत्ता के",
  "gap.duplicate": "डुप्लिकेट दस्तावेज़ मिला",
  "gap.none": "कोई बड़ी कमी नहीं मिली",

  "future.title": "भविष्य की योजना",
  "future.desc":
    "क्षेत्रीय भारतीय भाषाएँ, सहमति-आधारित साझाकरण, अकाउंट एग्रीगेटर समर्थन और सत्यापित डेटा एकीकरण भविष्य में जोड़े जाएँगे — ये इस प्रोटोटाइप का हिस्सा नहीं हैं।",
};

const dicts: Record<Lang, Dict> = { en, hi };

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("tp-lang") : null;
    if (stored === "en" || stored === "hi") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("tp-lang", l);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let str = dicts[lang][key] ?? dicts.en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) str = str.replace(`{${k}}`, String(v));
      }
      return str;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

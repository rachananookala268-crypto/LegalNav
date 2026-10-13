import { DocumentAnalysis, EvidenceItem, LegalAidOrg, LegalResource, TimelineEvent } from '../types';
import { analyzeLegalAgreement } from '../utils/clauseParser';

export const OFFICIAL_INDIAN_LEGAL_RESOURCES: LegalResource[] = [
  {
    id: 'res-1',
    title: 'India Code: Digital Repository of All Central & State Acts',
    category: 'Statutes & Central Acts',
    description: 'The definitive Government of India repository hosting authentic and updated texts of all central statutes, state legislations, rules, and notifications.',
    officialUrl: 'https://www.indiacode.nic.in/',
    authority: 'Ministry of Law and Justice, Government of India',
    keyActsOrTopics: ['Bharatiya Nyaya Sanhita (BNS)', 'Indian Contract Act 1872', 'Transfer of Property Act', 'Consumer Protection Act 2019'],
    isGovPortal: true
  },
  {
    id: 'res-2',
    title: 'eCourts Services Portal (District & High Courts of India)',
    category: 'Courts & e-Services',
    description: 'National mission mode project providing citizen access to Case Status (CNR Search), Cause Lists, Court Orders, and e-Filing across District and High Courts in India.',
    officialUrl: 'https://ecourts.gov.in/',
    authority: 'e-Committee, Supreme Court of India & Department of Justice',
    keyActsOrTopics: ['CNR Number Search', 'Case Status Tracking', 'Daily Court Orders', 'e-Filing 3.0'],
    isGovPortal: true
  },
  {
    id: 'res-3',
    title: 'NALSA (National Legal Services Authority)',
    category: 'Free Legal Aid & Rights',
    description: 'Constituted under the Legal Services Authorities Act, 1987, to provide free and competent legal services to the weaker sections of society and organize Lok Adalats.',
    officialUrl: 'https://nalsa.gov.in/',
    authority: 'National Legal Services Authority (Helpline: 15100)',
    keyActsOrTopics: ['Section 12 Legal Aid Eligibility', 'Lok Adalats', 'Victim Compensation Schemes', 'Free Legal Representation'],
    isGovPortal: true
  },
  {
    id: 'res-4',
    title: 'Supreme Court of India (Official Portal)',
    category: 'Courts & e-Services',
    description: 'The Apex Court of India website hosting official Supreme Court case status, daily orders, reported judgments, constitution bench hearings, and practice directions.',
    officialUrl: 'https://www.sci.gov.in/',
    authority: 'Supreme Court of India, Tilak Marg, New Delhi',
    keyActsOrTopics: ['Article 32 & 136 Petitions', 'Apex Judgments', 'Cause Lists', 'e-Copying Services'],
    isGovPortal: true
  },
  {
    id: 'res-5',
    title: 'Nyaya Bandhu (Pro Bono Legal Services) - DoJ',
    category: 'Free Legal Aid & Rights',
    description: 'Department of Justice initiative that connects interested registered advocates offering pro bono legal advice to underprivileged litigants directly through mobile app & portal.',
    officialUrl: 'https://probono-doj.in/',
    authority: 'Department of Justice, Ministry of Law and Justice',
    keyActsOrTopics: ['Pro Bono Advocate Network', 'Volunteer Lawyers', 'Mobile App Assistance', 'DoJ Legal Empowerment'],
    isGovPortal: true
  },
  {
    id: 'res-6',
    title: 'Tele-Law: Mainstreaming Legal Aid to Marginalized Communities',
    category: 'Free Legal Aid & Rights',
    description: 'Facilitates delivery of legal advice through video conferencing and voice calling connecting Common Service Centers (CSCs) with Panel Lawyers at State capitals.',
    officialUrl: 'https://www.tele-law.in/',
    authority: 'Ministry of Law and Justice & CSC e-Governance Services',
    keyActsOrTopics: ['Gram Panchayat CSC Consultations', 'Panel Advocates', 'Free Pre-Litigation Advice', 'Citizen Dashboard'],
    isGovPortal: true
  },
  {
    id: 'res-7',
    title: 'National Consumer Helpline (NCH / INGRAM)',
    category: 'Consumer Protection',
    description: 'Integrated Grievance Redress Mechanism under the Ministry of Consumer Affairs for registering complaints against unfair trade practices and consumer deficiencies.',
    officialUrl: 'https://consumerhelpline.gov.in/',
    authority: 'Department of Consumer Affairs, Government of India (Toll-Free: 1915)',
    keyActsOrTopics: ['Consumer Protection Act 2019', 'e-Daakhil Portal', 'Mediation in Consumer Disputes', 'Deficiency in Service'],
    isGovPortal: true
  },
  {
    id: 'res-8',
    title: 'e-Daakhil (Consumer Commission Online Filing)',
    category: 'Consumer Protection',
    description: 'Online portal developed by NIC for filing consumer disputes before District, State, and National Consumer Commissions without physical court visit.',
    officialUrl: 'https://edaakhil.nic.in/',
    authority: 'National Consumer Disputes Redressal Commission (NCDRC)',
    keyActsOrTopics: ['Online Consumer Complaint', 'Fee Payment via Bharatkosh', 'Real-time Case Tracking', 'Consumer Commissions'],
    isGovPortal: true
  }
];

export const SAMPLE_12_CLAUSE_EMPLOYMENT_TEXT = `EMPLOYMENT AGREEMENT

THIS EMPLOYMENT AGREEMENT is entered into on 1st November 2026 at Bengaluru, Karnataka, BETWEEN TechNova Solutions Private Limited, having its registered office at Koramangala, Bengaluru (hereinafter referred to as the 'Employer') AND Mr. Rajesh Varma, residing at Indiranagar, Bengaluru (hereinafter referred to as the 'Employee').

1. POSITION & DUTIES: The Employer hereby appoints the Employee as Junior Software Engineer, and the Employee agrees to perform all technical, coding, and software development duties assigned with due diligence.
2. COMMENCEMENT DATE & DURATION: The Employee's employment shall commence on 01-11-2026 and shall continue on a full-time permanent basis until terminated in accordance with the provisions of this Agreement.
3. REMUNERATION & SALARY: The Employer shall pay the Employee a monthly gross salary of ₹35,000/- (Rupees Thirty-Five Thousand only), payable on or before the 5th day of every calendar month via direct bank transfer, subject to statutory tax deductions (TDS and Professional Tax).
4. PROBATION PERIOD: The Employee shall serve an initial probation period of 3 (three) months from the Commencement Date. Upon satisfactory performance review, the employment shall be confirmed in writing.
5. WORKING HOURS & LOCATION: The regular working hours shall be 9:30 AM to 6:30 PM, Monday through Friday, at the Employer's Bengaluru office, with flexible hybrid work subject to manager approval.
6. LEAVE POLICY & BENEFITS: The Employee shall be entitled to 18 (eighteen) days of paid annual leave per calendar year, along with statutory public holidays and standard company medical insurance.
7. CONFIDENTIALITY & NON-DISCLOSURE: The Employee agrees not to disclose, publish, or disseminate any proprietary algorithms, client lists, trade secrets, or business information of the Employer during or after the tenure of employment.
8. INTELLECTUAL PROPERTY RIGHTS: All inventions, code, designs, and patentable works developed by the Employee in the course of employment shall be the sole and exclusive property of the Employer as 'works made for hire'.
9. CODE OF CONDUCT & NON-SOLICITATION: The Employee agrees to adhere to the company code of ethics and agrees not to solicit employees or clients of the Employer for a period of 1 (one) year following separation.
10. TERMINATION & NOTICE PERIOD: During probation, either party may terminate this Agreement by giving 15 days written notice. After confirmation, either party may terminate by serving 30 (thirty) days advance written notice or payment of basic salary in lieu thereof.
11. DISPUTE RESOLUTION & GOVERNING LAW: This Agreement shall be governed by the laws of India. Any dispute arising out of or in connection with this Agreement shall be referred to the exclusive jurisdiction of the competent Courts at Bengaluru.
12. AMENDMENTS & ENTIRE AGREEMENT: This Agreement constitutes the entire understanding between the parties. No amendment, modification, or waiver of any provision shall be binding unless executed in writing and signed by authorized representatives of both parties.

IN WITNESS WHEREOF, the parties hereto have signed this Agreement on the date first above written.

Employer: TechNova Solutions Private Limited
Employee: Mr. Rajesh Varma`;

export const SAMPLE_8_CLAUSE_RENTAL_TEXT = `THIS RESIDENTIAL LEASE AGREEMENT is made on this 1st day of October 2026 at Bengaluru, Karnataka, BETWEEN Mr. Ramesh Kumar (hereinafter called the 'LESSOR') AND Ms. Priya Sharma (hereinafter called the 'LESSEE').

1. PARTIES & PREMISES: The Lessor agrees to let out and the Lessee agrees to take on lease Flat No. 402, Green Heights, Indiranagar, Bengaluru - 560038 for residential use only.
2. AGREEMENT DURATION & START DATE: The lease shall be for a fixed period of 11 (eleven) months commencing from 01-10-2026 and expiring on 31-08-2027.
3. MONTHLY RENT & PAYMENT DATE: The monthly rent shall be INR 32,000/- (Rupees Thirty Two Thousand only) payable on or before the 5th day of each English calendar month via electronic bank transfer.
4. SECURITY DEPOSIT & REFUND CONDITIONS: The Lessee has deposited an interest-free refundable security deposit of INR 1,60,000/- (Rupees One Lakh Sixty Thousand only). The Lessor shall refund this deposit within 7 days of peaceful handover of vacant possession, subject to deduction of unpaid electricity/water utility bills.
5. LATE PAYMENT CONDITIONS: In the event of delay in payment of rent beyond the 10th of the calendar month, a simple interest penalty of 12% per annum shall be charged on the outstanding dues for the delayed period.
6. PROPERTY DAMAGE & MAINTENANCE: The Lessee shall maintain the premises in tenantable condition. The Lessee shall be liable for damages caused to internal fittings, normal wear and tear excepted. Major structural repairs and roof leakages shall be borne solely by the Lessor.
7. TERMINATION & NOTICE PERIOD: After an initial 6-month lock-in period during which neither party may terminate, either party may terminate this agreement by giving 1 (one) month advance written notice or rent in lieu thereof.
8. DISPUTE RESOLUTION & JURISDICTION: Any dispute arising out of or in connection with this agreement shall be settled through mutual conciliation, failing which the Civil Courts at Bengaluru alone shall have exclusive jurisdiction.`;

export const SAMPLE_DOCUMENTS: DocumentAnalysis[] = [
  {
    ...analyzeLegalAgreement(SAMPLE_12_CLAUSE_EMPLOYMENT_TEXT, 'Employment_Agreement_12_Clauses.txt'),
    id: 'doc-employment-1',
    title: 'Employment Agreement (12 Numbered Clauses - ₹35k Salary)',
    documentType: 'Employment Agreement'
  },
  {
    ...analyzeLegalAgreement(SAMPLE_8_CLAUSE_RENTAL_TEXT, 'Sample_8_Clause_Rental_Agreement_India.txt'),
    id: 'doc-lease-1',
    title: 'Residential Tenancy Agreement (Standard 8-Clause Indian Model)',
    documentType: 'Rental / Lease Agreement'
  },
  {
    id: 'doc-nda-1',
    title: 'Mutual Non-Disclosure Agreement (NDA)',
    documentType: 'Commercial Confidentiality Agreement',
    uploadDate: 'October 2026',
    fileName: 'Mutual_NDA_Indian_Law_Governed.txt',
    fileSize: '14.2 KB',
    isSimulated: true,
    extractedTextSnippet: `MUTUAL NON-DISCLOSURE AGREEMENT
This Agreement is entered into on 11th October 2026 under the Indian Contract Act, 1872, between AlphaTech Innovations Pvt Ltd ('Disclosing Party') and Consultant ('Receiving Party').
1. DEFINITION OF CONFIDENTIAL INFORMATION: Any proprietary business, technical, software code, customer data or algorithmic designs shared in written or verbal form.
2. TERM OF OBLIGATION: The obligations of non-disclosure shall remain in effect for a period of 2 (two) years from date of disclosure.
3. EXCLUSIONS: Information already in public domain without breach, or independently developed without reference to proprietary materials.
4. REMEDIES & INJUNCTIVE RELIEF: In the event of breach, monetary damages may be inadequate, and the Disclosing Party shall be entitled to seek injunctive relief without prejudice to other statutory remedies.
5. GOVERNING LAW & JURISDICTION: Governed by the laws of the Republic of India; courts at New Delhi shall have exclusive jurisdiction.`,
    plainEnglishSummary: 'A standard mutual confidentiality agreement governed by Indian law. It binds both parties from disclosing trade secrets, source code, or business plans for 2 years. If confidential data is leaked, the other party can seek an immediate court injunction (restraining order) in New Delhi.',
    clauses: [
      {
        name: 'Duration of Confidentiality (Clause 2)',
        summary: '2-year obligation from the date each piece of information is shared.',
        risk: 'low',
        plainExplanation: 'Reasonable and standard timeframe under Indian commercial law. Perpetual NDAs can sometimes be challenged as unreasonable restraint of trade.',
        recommendation: 'Ensure your notes and source repositories are tagged with disclosure dates so you know when the 2-year sunset triggers.'
      },
      {
        name: 'Injunctive Relief Clause (Clause 4)',
        summary: 'Right to approach court for immediate interim injunction without proving monetary damage first.',
        risk: 'medium',
        plainExplanation: 'If an alleged leak happens, the company can approach the High Court or Commercial Court under Order 39 of the Code of Civil Procedure (CPC) to freeze your project.',
        recommendation: 'Ensure clean room development practices: do not mix client confidential code with your personal open-source projects.'
      },
      {
        name: 'Governing Law under Indian Contract Act (Clause 5)',
        summary: 'Regulated under the Indian Contract Act, 1872, with exclusive jurisdiction in New Delhi.',
        risk: 'low',
        plainExplanation: 'Applies Indian legal standards. Note that Section 27 of the Indian Contract Act voids agreements in restraint of trade, so non-compete clauses cannot be sneaked into an NDA.',
        recommendation: 'Verify that this NDA does not contain disguised non-compete clauses that prevent you from working in the same technology domain.'
      }
    ],
    suggestedQuestions: [
      'Does the definition of confidential data include marking requirements (e.g. must be stamped CONFIDENTIAL)?',
      'What is the procedure for returning or certified destruction of confidential files upon engagement end?',
      'Is there an indemnity clause holding you liable for indirect or consequential damages?'
    ],
    relevantActs: [
      'Indian Contract Act, 1872 (Section 27 on Restraint of Trade)',
      'Information Technology Act, 2000 (Section 43A & 72A)',
      'Commercial Courts Act, 2015'
    ]
  },
  {
    id: 'doc-freelance-1',
    title: 'Independent Software Consultant Agreement',
    documentType: 'Service & Freelance Contract',
    uploadDate: 'October 2026',
    fileName: 'Freelance_Developer_Agreement_India.txt',
    fileSize: '22.1 KB',
    isSimulated: true,
    extractedTextSnippet: `INDEPENDENT CONTRACTOR & IP ASSIGNMENT AGREEMENT
Made on October 2026, BETWEEN Nova Retail Solutions Ltd. ('Client') AND Independent Developer ('Contractor').
1. SCOPE & DELIVERABLES: Development of mobile frontend and API integrations as per Schedule A milestones.
2. CONSIDERATION & TAX: Total fee of INR 1,50,000 payable upon milestone sign-off. TDS shall be deducted as applicable under Section 194J of the Income Tax Act, 1961.
3. INTELLECTUAL PROPERTY: Upon full payment of milestone fees, all copyright and proprietary rights shall stand assigned to the Client. Contractor retains pre-existing tools and open source modules.
4. INDEMNITY: Contractor shall indemnify Client against third-party copyright infringement claims arising solely from deliverables.
5. DISPUTE RESOLUTION: Any dispute shall be referred to Sole Arbitrator appointed in accordance with the Arbitration and Conciliation Act, 1996. Venue of arbitration shall be Mumbai.`,
    plainEnglishSummary: 'A freelance developer contract with clear intellectual property assignment upon full payment, Indian TDS tax deduction disclosure, and a formal arbitration clause under the Indian Arbitration and Conciliation Act 1996.',
    clauses: [
      {
        name: 'Intellectual Property Assignment on Full Payment (Clause 3)',
        summary: 'IP is transferred to the client ONLY once payment has been received in full.',
        risk: 'low',
        plainExplanation: 'This is favorable to the freelancer: you own your code until the invoice is settled.',
        recommendation: 'Always retain this wording so that clients cannot legally claim ownership without clearing milestone payments.'
      },
      {
        name: 'Arbitration under Indian Arbitration Act (Clause 5)',
        summary: 'Disputes resolved by a Sole Arbitrator under the Arbitration and Conciliation Act, 1996 in Mumbai.',
        risk: 'medium',
        plainExplanation: 'Arbitration is faster than civil courts but can involve arbitrator fees. For small claims under Rs. 1 lakh, mediation or small claims court might be cheaper.',
        recommendation: 'Consider adding a pre-arbitration clause requiring 30 days of informal negotiation or mediation first.'
      },
      {
        name: 'TDS Deduction under Section 194J (Clause 2)',
        summary: 'TDS will be deducted from payments as mandated by the Indian Income Tax Act.',
        risk: 'low',
        plainExplanation: 'Standard Indian tax compliance for professional and technical services (usually 2% or 10% depending on entity status).',
        recommendation: 'Request Form 16A quarterly TDS certificates from the client to claim credit while filing your ITR.'
      }
    ],
    suggestedQuestions: [
      'What happens if the client delays milestone review beyond 14 days?',
      'Are there late payment interest clauses for delayed invoices?',
      'Is there an indemnity cap limiting liability to the contract value?'
    ],
    relevantActs: [
      'Arbitration and Conciliation Act, 1996',
      'The Copyright Act, 1957 (Sections 17 & 19 on Assignment of Copyright)',
      'Income Tax Act, 1961 (Section 194J)'
    ]
  }
];

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'tl-1',
    title: 'Defective Electronic Product Delivered & Service Refused',
    date: '2026-08-15',
    stage: 'Pre-Litigation',
    status: 'completed',
    description: 'Received defective hardware from e-commerce seller. Replacement request arbitrarily rejected within warranty period.',
    statuteReference: 'Consumer Protection Act, 2019 (Deficiency in Goods & Unfair Trade Practice)'
  },
  {
    id: 'tl-2',
    title: 'Grievance Docket Registered on National Consumer Helpline (NCH)',
    date: '2026-08-25',
    stage: 'Pre-Litigation',
    status: 'completed',
    description: 'Logged formal grievance on consumerhelpline.gov.in (Docket #NCH-882190). Company replied with automated boilerplate refusal.',
    statuteReference: 'National Consumer Helpline Redressal Framework'
  },
  {
    id: 'tl-3',
    title: 'Formal Legal Notice Dispatched via Registered Post AD',
    date: '2026-09-10',
    stage: 'Notice Sent',
    status: 'completed',
    description: 'Sent 15-day statutory demand notice seeking replacement and compensation for mental agony with postal tracking receipt.',
    actionRequired: 'Preserve postal delivery acknowledgment slip (RPAD card) as court evidence.',
    statuteReference: 'Section 106 Transfer of Property / Consumer Notice Norms'
  },
  {
    id: 'tl-4',
    title: 'Pre-Litigation Mediation via District Legal Services Authority (DLSA)',
    date: '2026-09-28',
    stage: 'Pre-Litigation',
    status: 'completed',
    description: 'Explored settlement at DLSA front office. Opposite party failed to appear for informal conciliation.',
    statuteReference: 'Legal Services Authorities Act, 1987 (Pre-Litigation Conciliation)'
  },
  {
    id: 'tl-5',
    title: 'Institution of Consumer Complaint on e-Daakhil Portal',
    date: '2026-10-05',
    stage: 'Filing / Institution',
    status: 'in_progress',
    description: 'Filed digital petition before District Consumer Disputes Redressal Commission (DCDRC). Verified affidavit uploaded.',
    actionRequired: 'Pay statutory filing fee via Bharatkosh and track admissibility hearing date.',
    statuteReference: 'Section 35, Consumer Protection Act 2019'
  },
  {
    id: 'tl-6',
    title: 'Statutory 30-Day Window for Opposite Party to File Written Version',
    date: '2026-11-15',
    stage: 'Evidence & Examination',
    status: 'upcoming',
    description: 'Opposite party must submit written reply within 30 days from notice of admission (extendable by 15 days maximum).',
    actionRequired: 'Prepare rejoinder evidence countering company warranty disclaimer.',
    statuteReference: 'Section 38(2)(a), Consumer Protection Act 2019'
  }
];

export const INITIAL_EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'ev-1',
    title: 'Official Tax Invoice & Warranty Card Receipt',
    category: 'Financial & Banking',
    dateRecorded: '2026-08-15',
    source: 'E-commerce Seller Tax Invoice PDF',
    relevanceDescription: 'Establishes proof of purchase, statutory consumer status, price paid (Rs. 42,500), and active 1-year manufacturer warranty period.',
    custodyStatus: 'Securely Stored Locally',
    tag: 'Proof of Purchase',
    timestamp: 1723689600000,
    notes: 'GSTIN verified on GST Portal; serial number matches hardware packaging.'
  },
  {
    id: 'ev-2',
    title: 'Registered Post AD Postal Acknowledgment & Speed Post Tracking Slip',
    category: 'Contract & Agreement',
    dateRecorded: '2026-09-12',
    source: 'India Post Official Consignment Tracking',
    relevanceDescription: 'Proves delivery of 15-day formal legal notice to corporate headquarters, satisfying pre-litigation notice requirement under civil norms.',
    custodyStatus: 'Original Physical with Client',
    tag: 'Legal Notice Delivery Proof',
    timestamp: 1726108800000,
    notes: 'Signed delivery acknowledgment card safely preserved in hard copy folder.'
  },
  {
    id: 'ev-3',
    title: 'Customer Support WhatsApp Chat & Email Transcript (PDF Export)',
    category: 'Digital Communication',
    dateRecorded: '2026-08-22',
    source: 'Verified WhatsApp & Gmail thread export',
    relevanceDescription: 'Demonstrates refusal of legitimate replacement, denial of warranty service, and contradictory statements by vendor support representatives.',
    custodyStatus: 'Securely Stored Locally',
    tag: 'Digital Evidence (Sec 65B BSA)',
    timestamp: 1724294400000,
    notes: 'Prepared certificate under Section 65B of Indian Evidence Act / Section 63 Bharatiya Sakshya Adhiniyam.'
  },
  {
    id: 'ev-4',
    title: 'High-Resolution Geotagged Unboxing & Defect Video / Photographs',
    category: 'Photographic / Video',
    dateRecorded: '2026-08-16',
    source: 'Smartphone camera with original EXIF timestamp metadata',
    relevanceDescription: 'Visual proof that hardware was unboxed with cracked inner display and motherboard short circuit upon arrival.',
    custodyStatus: 'Securely Stored Locally',
    tag: 'Hardware Defect Visual Proof',
    timestamp: 1723776000000,
    notes: 'Hash verification SHA-256 generated for file integrity preservation.'
  }
];

export const OFFICIAL_LEGAL_AID_ORGS: LegalAidOrg[] = [
  {
    id: 'org-1',
    name: 'National Legal Services Authority (NALSA)',
    type: 'Statutory Authority (NALSA/SLSA)',
    jurisdiction: 'All India (Central Apex Body)',
    helpline: 'Toll-Free National Helpline: 15100',
    officialWebsite: 'https://nalsa.gov.in/',
    eligibilityCriteria: 'Section 12 of Legal Services Authorities Act, 1987: Women, children, SC/ST members, persons with disability, industrial workers, custody undertrials, and individuals whose annual income is below statutory limit (Rs. 1,00,000 to Rs. 3,00,000 depending on state).',
    servicesOffered: [
      'Free Advocate Representation in all Courts',
      'Lok Adalat dispute resolution',
      'Payment of court fees and drafting expenses',
      'Free legal advice via front offices'
    ],
    addressOrNotes: '12/11, Jam Nagar House, Shahjahan Road, New Delhi - 110011'
  },
  {
    id: 'org-2',
    name: 'Supreme Court Legal Services Committee (SCLSC)',
    type: 'Court Committee',
    jurisdiction: 'Supreme Court of India, New Delhi',
    helpline: 'Phone: 011-23388323 / 23381234',
    officialWebsite: 'https://sclsc.sci.gov.in/',
    eligibilityCriteria: 'Any person eligible under Section 12 who has a case before or wishes to approach the Supreme Court of India.',
    servicesOffered: [
      'Free legal aid before the Supreme Court',
      'Senior panel advocate assignment',
      'Exemption from printing charges and paper-book fees',
      'Assistance in filing Special Leave Petitions (SLPs)'
    ],
    addressOrNotes: '107, Lawyers Chambers, Supreme Court Compound, New Delhi - 110001'
  },
  {
    id: 'org-3',
    name: 'State Legal Services Authorities (SLSA Network)',
    type: 'Statutory Authority (NALSA/SLSA)',
    jurisdiction: 'State-Level (e.g. DLSA Delhi, KSLSA Karnataka, MSLSA Maharashtra)',
    helpline: 'Dial 15100 or visit local District Court Complex',
    officialWebsite: 'https://nalsa.gov.in/slsas-dlsas',
    eligibilityCriteria: 'Citizens residing within the respective state meeting state income ceilings or statutory vulnerable categories.',
    servicesOffered: [
      'District Legal Services Authority (DLSA) front office counsel',
      'Taluka Legal Services Committees',
      'Mediation and conciliation centers',
      'Prison legal aid clinics'
    ],
    addressOrNotes: 'Located at every District Court Complex across all Indian states and UTs.'
  },
  {
    id: 'org-4',
    name: 'Nyaya Bandhu (Pro Bono Legal Services by DoJ)',
    type: 'Ministry of Law & Justice Portal',
    jurisdiction: 'All India Digital App & Portal',
    helpline: 'DoJ Nyaya Bandhu Helpdesk: support@probono-doj.in',
    officialWebsite: 'https://probono-doj.in/',
    eligibilityCriteria: 'Persons seeking pro bono assistance who meet NALSA Section 12 criteria and register through the Nyaya Bandhu mobile application.',
    servicesOffered: [
      'Direct matching with voluntary practicing advocates',
      'Pre-litigation case advice',
      'Document review and legal counseling',
      'Connecting law school legal aid clinics (Pro Bono Clubs)'
    ],
    addressOrNotes: 'Department of Justice, Jaisalmer House, 26 Mansingh Road, New Delhi'
  },
  {
    id: 'org-5',
    name: 'Tele-Law Scheme (Department of Justice & CSC)',
    type: 'Ministry of Law & Justice Portal',
    jurisdiction: 'Pan-India Gram Panchayats & Rural Common Service Centers',
    helpline: 'CSC Village Level Entrepreneur (VLE) Portal',
    officialWebsite: 'https://tele-law.in/',
    eligibilityCriteria: 'Free for women, SC/ST, victims of trafficking, disabled persons, and low-income rural citizens (nominal Rs. 30 fee for general categories).',
    servicesOffered: [
      'Video consultation with panel lawyers at State capital',
      'e-Filing support from village level',
      'Legal advice before litigation escalates',
      'Available in 22 regional Indian languages'
    ],
    addressOrNotes: 'Available at over 1,00,000 Common Service Centers (CSCs) across India.'
  },
  {
    id: 'org-6',
    name: 'National Consumer Disputes Redressal Commission (NCDRC) / e-Daakhil',
    type: 'Consumer Redressal',
    jurisdiction: 'Consumer Commissions across India',
    helpline: 'National Consumer Toll-Free: 1915 / SMS: 8800001915',
    officialWebsite: 'https://edaakhil.nic.in/',
    eligibilityCriteria: 'Any consumer who has suffered deficiency of service, product defect, or unfair trade practice.',
    servicesOffered: [
      'Paperless filing of consumer cases',
      'Online case status and hearing links',
      'Consumer mediation cell option',
      'No mandatory requirement of hiring an advocate'
    ],
    addressOrNotes: 'Upbhokta Nyay Bhawan, "F" Block, GPO Complex, INA, New Delhi - 110023'
  }
];

export type NavTab = 
  | 'dashboard' 
  | 'analyzer' 
  | 'library' 
  | 'evidence' 
  | 'timeline' 
  | 'directory' 
  | 'about';

export interface KeyClause {
  name: string;
  clauseNumber?: number | string;
  originalText?: string;
  summary: string;
  risk: 'low' | 'medium' | 'high';
  plainExplanation: string;
  recommendation: string;
  riskJustification?: string;
}

export type FieldStatus = 'found' | 'not_found' | 'not_applicable' | 'needs_review';

export interface DetectedField {
  fieldName: string;
  found: boolean;
  status: FieldStatus;
  value: string;
  clauseNumber?: number | string;
  risk?: 'low' | 'medium' | 'high';
  details?: string;
}

export interface DocumentAnalysis {
  id: string;
  title: string;
  documentType: string;
  uploadDate: string;
  fileName: string;
  fileSize?: string;
  extractedTextSnippet: string;
  plainEnglishSummary: string;
  clauses: KeyClause[];
  detectedFields?: DetectedField[];
  suggestedQuestions: string[];
  relevantActs: string[];
  isSimulated: boolean;
}

export interface LegalResource {
  id: string;
  title: string;
  category: 'Statutes & Central Acts' | 'Courts & e-Services' | 'Free Legal Aid & Rights' | 'Consumer Protection' | 'Citizen Portals';
  description: string;
  officialUrl: string;
  authority: string;
  keyActsOrTopics: string[];
  isGovPortal: boolean;
}

export interface EvidenceItem {
  id: string;
  title: string;
  category: 'FIR & Police Report' | 'Financial & Banking' | 'Digital Communication' | 'Photographic / Video' | 'Contract & Agreement' | 'Witness Statement';
  dateRecorded: string;
  source: string;
  relevanceDescription: string;
  custodyStatus: 'Securely Stored Locally' | 'Verified Copy' | 'Original Physical with Client';
  notes?: string;
  tag: string;
  timestamp: number;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  stage: 'Pre-Litigation' | 'Notice Sent' | 'Filing / Institution' | 'Evidence & Examination' | 'Order / Judgment';
  status: 'completed' | 'in_progress' | 'upcoming' | 'critical';
  description: string;
  actionRequired?: string;
  statuteReference?: string;
}

export interface LegalAidOrg {
  id: string;
  name: string;
  type: 'Statutory Authority (NALSA/SLSA)' | 'Ministry of Law & Justice Portal' | 'Court Committee' | 'Consumer Redressal';
  jurisdiction: string;
  helpline: string;
  officialWebsite: string;
  eligibilityCriteria: string;
  servicesOffered: string[];
  addressOrNotes: string;
}

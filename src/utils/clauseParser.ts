import { KeyClause, DetectedField, DocumentAnalysis, FieldStatus } from '../types';

export type RecognizedDocType = 
  | 'Employment Agreement' 
  | 'Rental / Lease Agreement' 
  | 'Non-Disclosure Agreement (NDA)' 
  | 'Consultancy / Service Agreement' 
  | 'General Legal Contract';

/**
 * Accurately determines the document type from text patterns and keywords
 */
export function identifyDocumentType(text: string, fileName?: string): RecognizedDocType {
  const lower = (text + ' ' + (fileName || '')).toLowerCase();

  // Employment check
  if (
    lower.includes('employment agreement') ||
    lower.includes('employment contract') ||
    lower.includes('appointment letter') ||
    (lower.includes('employer') && lower.includes('employee')) ||
    (lower.includes('salary') && lower.includes('probation')) ||
    (lower.includes('remuneration') && lower.includes('leave policy'))
  ) {
    return 'Employment Agreement';
  }

  // Rental / Lease check
  if (
    lower.includes('lease agreement') ||
    lower.includes('rental agreement') ||
    lower.includes('tenancy agreement') ||
    lower.includes('residential lease') ||
    (lower.includes('lessor') && lower.includes('lessee')) ||
    (lower.includes('landlord') && lower.includes('tenant')) ||
    (lower.includes('security deposit') && lower.includes('premises'))
  ) {
    return 'Rental / Lease Agreement';
  }

  // NDA check
  if (
    lower.includes('non-disclosure') ||
    lower.includes('confidentiality agreement') ||
    (lower.includes('disclosing party') && lower.includes('receiving party')) ||
    lower.includes('proprietary information agreement')
  ) {
    return 'Non-Disclosure Agreement (NDA)';
  }

  // Consultancy check
  if (
    lower.includes('consultan') ||
    lower.includes('independent contractor') ||
    lower.includes('freelance') ||
    lower.includes('services agreement')
  ) {
    return 'Consultancy / Service Agreement';
  }

  return 'General Legal Contract';
}

/**
 * Extracts numbered clauses sequentially (1, 2, 3... N)
 * Excludes titles, preamble recitals, party definitions, and signatures from being counted as clauses.
 */
export function extractNumberedClausesFromText(text: string): Array<{ number: number; title: string; text: string }> {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];

  // 1. Cut off trailing signature blocks before extracting clauses
  const sigRegex = /(?:\n\s*(?:IN WITNESS WHEREOF|SIGNED AND DELIVERED|FOR AND ON BEHALF OF|SIGNATURES?:?|EXECUTED BY|WITNESS(?:ES)?:?)\b[\s\S]*$)/i;
  const sigMatch = sigRegex.exec(normalized);
  const bodyText = sigMatch ? normalized.slice(0, sigMatch.index).trim() : normalized;

  // 2. Scan for candidate numbered clause markers at line starts
  // Matches "1. ", "1) ", "Clause 1:", "Section 2.", "1 - "
  const markerRegex = /(?:^|\n)\s*(?:(?:Clause|Section|Article|Point|Cl\.)\s*)?(\d+)[\.\)\:\-]\s*([^\n\r]*)/gi;
  const rawMatches: Array<{ num: number; index: number; header: string }> = [];
  let m: RegExpExecArray | null;

  while ((m = markerRegex.exec(bodyText)) !== null) {
    rawMatches.push({
      num: parseInt(m[1], 10),
      index: m.index,
      header: m[2].trim()
    });
  }

  // 3. Keep strictly sequential top-level clause numbers (1, 2, 3... N)
  // This prevents internal sub-clauses, stray dates (1st, 2026), or duplicate numbers from corrupting the count
  const validClauses: Array<{ num: number; index: number; header: string }> = [];
  let expected = 1;

  for (const match of rawMatches) {
    if (match.num === expected) {
      validClauses.push(match);
      expected++;
    }
  }

  // Fallback: If document numbering starts higher or has gaps, accept strictly increasing clause numbers
  if (validClauses.length < 2 && rawMatches.length >= 2) {
    let lastNum = 0;
    for (const match of rawMatches) {
      if (match.num > lastNum && match.num <= lastNum + 3) {
        validClauses.push(match);
        lastNum = match.num;
      }
    }
  }

  if (validClauses.length === 0) {
    // If no numbered markers were detected, split by double newlines into clean sections
    const paragraphs = bodyText.split(/\n\s*\n/).filter(p => p.trim().length > 20);
    return paragraphs.map((p, idx) => ({
      number: idx + 1,
      title: `Clause ${idx + 1}`,
      text: p.trim()
    }));
  }

  // 4. Slice chunks cleanly and extract titles
  const results: Array<{ number: number; title: string; text: string }> = [];

  for (let i = 0; i < validClauses.length; i++) {
    const cur = validClauses[i];
    const next = validClauses[i + 1];
    const chunk = next ? bodyText.slice(cur.index, next.index).trim() : bodyText.slice(cur.index).trim();

    // Determine clean title
    let titleCandidate = cur.header;
    if (titleCandidate.includes(':')) {
      titleCandidate = titleCandidate.split(':')[0].trim();
    } else if (titleCandidate.includes(' - ')) {
      titleCandidate = titleCandidate.split(' - ')[0].trim();
    } else if (titleCandidate.length > 50) {
      // If header line is long without delimiter, extract first 5-6 words
      titleCandidate = titleCandidate.split(' ').slice(0, 5).join(' ');
    }

    // Strip leading punctuation
    titleCandidate = titleCandidate.replace(/^[.\-:\s]+|[.\-:\s]+$/g, '').trim();

    results.push({
      number: cur.num,
      title: titleCandidate || `Clause ${cur.num}`,
      text: chunk
    });
  }

  return results;
}

/**
 * Extracts actual party names from opening recitals
 */
export function extractPartiesNames(text: string, docType: RecognizedDocType): { value: string; found: boolean } {
  // Regex to extract "BETWEEN [Party 1] AND [Party 2]"
  const partyRegex = /BETWEEN\s+([^\n,]+?)(?:,|\s+having|\s+with|\s*\(hereinafter|\s*hereinafter)[\s\S]*?(?:AND|&)\s+([^\n,]+?)(?:,|\s+residing|\s*\(hereinafter|\s*hereinafter)/i;
  const m = partyRegex.exec(text);

  if (m) {
    const p1 = m[1].replace(/['"]/g, '').trim();
    const p2 = m[2].replace(/['"]/g, '').trim();

    if (docType === 'Employment Agreement') {
      return { found: true, value: `Employer: ${p1} | Employee: ${p2}` };
    } else if (docType === 'Rental / Lease Agreement') {
      return { found: true, value: `Lessor: ${p1} | Lessee: ${p2}` };
    } else if (docType === 'Non-Disclosure Agreement (NDA)') {
      return { found: true, value: `Disclosing Party: ${p1} | Receiving Party: ${p2}` };
    } else if (docType === 'Consultancy / Service Agreement') {
      return { found: true, value: `Client: ${p1} | Consultant: ${p2}` };
    }
    return { found: true, value: `First Party: ${p1} | Second Party: ${p2}` };
  }

  // Fallback direct keyword searches
  if (docType === 'Employment Agreement') {
    const empMatch = /employer\s*[:\-]\s*([^\n,]+)/i.exec(text);
    const emplMatch = /employee\s*[:\-]\s*([^\n,]+)/i.exec(text);
    if (empMatch || emplMatch) {
      return { 
        found: true, 
        value: `Employer: ${empMatch ? empMatch[1].trim() : 'Specified in Agreement'} | Employee: ${emplMatch ? emplMatch[1].trim() : 'Specified in Agreement'}` 
      };
    }
  }

  return { found: false, value: 'Not found in the provided text' };
}

/**
 * Extracts specific field facts from clauses or full text
 */
function searchClauseForKeywords(
  clauses: Array<{ number: number; title: string; text: string }>,
  keywords: string[],
  regexPatterns: RegExp[]
): { found: boolean; value: string; clauseNumber?: number } {
  // 1. Search in clauses
  for (const cl of clauses) {
    const clLower = (cl.title + ' ' + cl.text).toLowerCase();
    const hasKeyword = keywords.some(k => clLower.includes(k.toLowerCase()));

    if (hasKeyword) {
      for (const regex of regexPatterns) {
        const m = regex.exec(cl.text);
        if (m) {
          // Extract sentence
          const start = Math.max(0, cl.text.lastIndexOf('.', m.index) + 1);
          let end = cl.text.indexOf('.', m.index + m[0].length);
          if (end === -1) end = Math.min(cl.text.length, m.index + 160);
          const snippet = cl.text.slice(start, end + 1).replace(/\s+/g, ' ').trim();
          return {
            found: true,
            value: snippet || m[0].trim(),
            clauseNumber: cl.number
          };
        }
      }

      // If keyword matched in clause title or text, return the first sentence
      const firstSentence = cl.text.split('.')[0].replace(/\s+/g, ' ').trim();
      return {
        found: true,
        value: firstSentence.length > 10 ? firstSentence : cl.text.slice(0, 140).trim(),
        clauseNumber: cl.number
      };
    }
  }

  return { found: false, value: 'Not found in the provided text' };
}

/**
 * Tailors mandatory field detection strictly to the recognized document type
 */
export function detectDocumentTypeFields(
  rawText: string,
  clauses: Array<{ number: number; title: string; text: string }>,
  docType: RecognizedDocType
): DetectedField[] {
  const partiesResult = extractPartiesNames(rawText, docType);

  if (docType === 'Employment Agreement') {
    // 1. Salary / Remuneration
    const salaryResult = searchClauseForKeywords(
      clauses,
      ['salary', 'remuneration', 'compensation', 'stipend', 'ctc', '₹', 'inr', 'gross salary'],
      [
        /(?:salary|remuneration|compensation|stipend)[^.]*?(?:₹|inr|rs\.?|rupees)?\s*[\d,]+(?:\/-)?(?:[^\n.]*?(?:per\s+(?:month|annum|year)|monthly|annually))?/i,
        /(?:₹|inr|rs\.?|rupees)\s*[\d,]+(?:\/-)?[^.]*?(?:per\s+(?:month|annum)|monthly)/i
      ]
    );

    // 2. Probation Period
    const probationResult = searchClauseForKeywords(
      clauses,
      ['probation', 'probationary'],
      [
        /probation(?:\s+period)?\s+of\s+[^.]+/i,
        /serve\s+(?:an\s+initial\s+)?probation[^.]+/i
      ]
    );

    // 3. Working Hours & Location
    const hoursResult = searchClauseForKeywords(
      clauses,
      ['working hours', 'office hours', 'hours of work', 'work hours', 'location'],
      [
        /(?:working\s+hours|hours\s+of\s+work)[^.]+/i,
        /\d{1,2}(?::\d{2})?\s*(?:am|pm)\s+to\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)/i
      ]
    );

    // 4. Leave Policy & Benefits
    const leaveResult = searchClauseForKeywords(
      clauses,
      ['leave', 'annual leave', 'paid leave', 'holidays', 'sick leave'],
      [
        /(?:entitled\s+to\s+)?\d+\s*(?:\([^)]+\)\s*)?(?:days\s+of\s+)?(?:paid|annual)?\s*leave/i,
        /leave\s+policy[^.]+/i
      ]
    );

    // 5. Confidentiality & Non-Disclosure
    const confidentialityResult = searchClauseForKeywords(
      clauses,
      ['confidentiality', 'non-disclosure', 'trade secret', 'proprietary'],
      [/confidential(?:ity)?[^.]+/i]
    );

    // 6. Intellectual Property
    const ipResult = searchClauseForKeywords(
      clauses,
      ['intellectual property', 'inventions', 'works made for hire', 'copyright', 'patents'],
      [/intellectual\s+property[^.]+/i, /works\s+made\s+for\s+hire/i]
    );

    // 7. Duration & Start Date
    const durationResult = searchClauseForKeywords(
      clauses,
      ['commencement', 'start date', 'commence on', 'commencing from', 'duration', 'term of'],
      [/commence\s+(?:on|from)\s+[^.]+/i, /commencement\s+date[^.]+/i]
    );

    // 8. Termination & Notice Period
    const terminationResult = searchClauseForKeywords(
      clauses,
      ['termination', 'notice period', 'written notice', 'terminate this agreement'],
      [
        /(?:serving|giving)?\s*[\w\d\s]+\s*(?:month|months|days)\s*written\s*notice/i,
        /notice\s+period\s+of\s+[^.]+/i,
        /terminate\s+this\s+agreement[^.]+/i
      ]
    );

    // 9. Dispute Resolution & Jurisdiction
    const disputeResult = searchClauseForKeywords(
      clauses,
      ['dispute', 'jurisdiction', 'courts at', 'governing law'],
      [/courts\s+(?:at|in)\s+[^.]+?jurisdiction/i, /governed\s+by\s+the\s+laws\s+of\s+india/i, /dispute\s+resolution/i]
    );

    // 10. Agreement Amendments
    const amendmentResult = searchClauseForKeywords(
      clauses,
      ['amendment', 'amendments', 'modified in writing', 'entire agreement', 'amended only in writing'],
      [/amendment[^.]+in\s+writing/i, /modified[^.]+in\s+writing/i, /entire\s+agreement/i]
    );

    return [
      {
        fieldName: 'Parties (Employer & Employee)',
        found: partiesResult.found,
        status: partiesResult.found ? 'found' : 'not_found',
        value: partiesResult.value,
        clauseNumber: 'Preamble / Recitals'
      },
      {
        fieldName: 'Salary / Remuneration & Payment Date',
        found: salaryResult.found,
        status: salaryResult.found ? 'found' : 'not_found',
        value: salaryResult.value,
        clauseNumber: salaryResult.clauseNumber
      },
      {
        fieldName: 'Probation Period',
        found: probationResult.found,
        status: probationResult.found ? 'found' : 'not_found',
        value: probationResult.value,
        clauseNumber: probationResult.clauseNumber
      },
      {
        fieldName: 'Working Hours & Location',
        found: hoursResult.found,
        status: hoursResult.found ? 'found' : 'not_found',
        value: hoursResult.value,
        clauseNumber: hoursResult.clauseNumber
      },
      {
        fieldName: 'Leave Policy & Benefits',
        found: leaveResult.found,
        status: leaveResult.found ? 'found' : 'not_found',
        value: leaveResult.value,
        clauseNumber: leaveResult.clauseNumber
      },
      {
        fieldName: 'Confidentiality & Non-Disclosure',
        found: confidentialityResult.found,
        status: confidentialityResult.found ? 'found' : 'not_found',
        value: confidentialityResult.value,
        clauseNumber: confidentialityResult.clauseNumber
      },
      {
        fieldName: 'Intellectual Property Rights',
        found: ipResult.found,
        status: ipResult.found ? 'found' : 'not_found',
        value: ipResult.value,
        clauseNumber: ipResult.clauseNumber
      },
      {
        fieldName: 'Agreement Duration & Start Date',
        found: durationResult.found,
        status: durationResult.found ? 'found' : 'not_found',
        value: durationResult.value,
        clauseNumber: durationResult.clauseNumber
      },
      {
        fieldName: 'Termination & Notice Period',
        found: terminationResult.found,
        status: terminationResult.found ? 'found' : 'not_found',
        value: terminationResult.value,
        clauseNumber: terminationResult.clauseNumber
      },
      {
        fieldName: 'Dispute Resolution & Jurisdiction',
        found: disputeResult.found,
        status: disputeResult.found ? 'found' : 'not_found',
        value: disputeResult.value,
        clauseNumber: disputeResult.clauseNumber
      },
      {
        fieldName: 'Agreement Amendments & Entire Agreement',
        found: amendmentResult.found,
        status: amendmentResult.found ? 'found' : 'not_found',
        value: amendmentResult.value,
        clauseNumber: amendmentResult.clauseNumber
      },
      {
        fieldName: 'Security Deposit',
        found: false,
        status: 'not_applicable',
        value: 'Not applicable for Employment Agreement'
      },
      {
        fieldName: 'Property Damage & Liability',
        found: false,
        status: 'not_applicable',
        value: 'Not applicable for Employment Agreement'
      }
    ];
  }

  // Rental / Lease Agreement Fields
  const depositResult = searchClauseForKeywords(
    clauses,
    ['security deposit', 'deposit of', 'refundable deposit', 'caution deposit'],
    [
      /(?:security\s+deposit|refundable\s+deposit|caution\s+deposit)[^.]*?(?:inr|rs\.?|rupees)?\s*[\d,]+/i,
      /deposit\s+of\s+(?:inr|rs\.?|rupees)?\s*[\d,]+/i
    ]
  );

  const rentResult = searchClauseForKeywords(
    clauses,
    ['monthly rent', 'rent of', 'rent shall be', 'payable on or before'],
    [
      /(?:monthly\s+rent|rent\s+shall\s+be|rent\s+of)[^.]*?(?:inr|rs\.?|rupees)?\s*[\d,]+/i,
      /payable\s+on\s+or\s+before\s+[^.]+/i
    ]
  );

  const durationResult = searchClauseForKeywords(
    clauses,
    ['term of', 'duration', 'period of', 'commencing from', 'eleven months', 'fixed period'],
    [
      /(?:term|duration|period)\s+of\s+[^.]*?(?:months|years)/i,
      /commencing\s+(?:from|on)\s+[^.]+/i
    ]
  );

  const terminationResult = searchClauseForKeywords(
    clauses,
    ['terminate', 'termination', 'notice period', 'written notice', 'lock-in'],
    [
      /(?:serving|giving)?\s*[\w\d\s]+\s*(?:month|months|days)\s*written\s*notice/i,
      /lock-in\s+period\s+of\s+[^.]+/i
    ]
  );

  const damageResult = searchClauseForKeywords(
    clauses,
    ['damage', 'maintenance', 'repairs', 'wear and tear', 'tenantable condition'],
    [
      /(?:damage|repairs|wear\s+and\s+tear)[^.]+/i,
      /maintain\s+the\s+premises[^.]+/i
    ]
  );

  const latePaymentResult = searchClauseForKeywords(
    clauses,
    ['late payment', 'delayed payment', 'interest on delayed', 'penalty on late', 'grace period'],
    [
      /(?:interest|penalty)\s+(?:of|at|@)?\s*[\d.]+%?[^.]*?delay/i,
      /late\s+payment[^.]+/i
    ]
  );

  const disputeResult = searchClauseForKeywords(
    clauses,
    ['dispute', 'jurisdiction', 'courts at', 'arbitration', 'conciliation'],
    [
      /courts\s+(?:at|in)\s+[^.]+?jurisdiction/i,
      /settled\s+through\s+mutual\s+conciliation/i
    ]
  );

  const amendmentResult = searchClauseForKeywords(
    clauses,
    ['amendment', 'amendments', 'modified in writing', 'written consent', 'alteration'],
    [
      /(?:amended|modified)\s+(?:only\s+)?in\s+writing[^.]+/i,
      /written\s+consent\s+of\s+both\s+parties/i
    ]
  );

  return [
    {
      fieldName: 'Parties (Lessor & Lessee)',
      found: partiesResult.found,
      status: partiesResult.found ? 'found' : 'not_found',
      value: partiesResult.value,
      clauseNumber: 'Preamble / Recitals'
    },
    {
      fieldName: 'Monthly Rent & Payment Due Date',
      found: rentResult.found,
      status: rentResult.found ? 'found' : 'not_found',
      value: rentResult.value,
      clauseNumber: rentResult.clauseNumber
    },
    {
      fieldName: 'Security Deposit & Refund Terms',
      found: depositResult.found,
      status: depositResult.found ? 'found' : 'not_found',
      value: depositResult.value,
      clauseNumber: depositResult.clauseNumber
    },
    {
      fieldName: 'Agreement Duration & Start Date',
      found: durationResult.found,
      status: durationResult.found ? 'found' : 'not_found',
      value: durationResult.value,
      clauseNumber: durationResult.clauseNumber
    },
    {
      fieldName: 'Termination & Notice Period',
      found: terminationResult.found,
      status: terminationResult.found ? 'found' : 'not_found',
      value: terminationResult.value,
      clauseNumber: terminationResult.clauseNumber
    },
    {
      fieldName: 'Property Damage & Maintenance',
      found: damageResult.found,
      status: damageResult.found ? 'found' : 'not_found',
      value: damageResult.value,
      clauseNumber: damageResult.clauseNumber
    },
    {
      fieldName: 'Late Payment Conditions',
      found: latePaymentResult.found,
      status: latePaymentResult.found ? 'found' : 'not_found',
      value: latePaymentResult.value,
      clauseNumber: latePaymentResult.clauseNumber
    },
    {
      fieldName: 'Dispute Resolution & Jurisdiction',
      found: disputeResult.found,
      status: disputeResult.found ? 'found' : 'not_found',
      value: disputeResult.value,
      clauseNumber: disputeResult.clauseNumber
    },
    {
      fieldName: 'Agreement Amendments',
      found: amendmentResult.found,
      status: amendmentResult.found ? 'found' : 'not_found',
      value: amendmentResult.value,
      clauseNumber: amendmentResult.clauseNumber
    }
  ];
}

/**
 * Analyzes each individual clause objectively with plain English explanation and justified risk rules
 */
export function analyzeIndividualClause(
  clauseObj: { number: number; title: string; text: string },
  docType: RecognizedDocType
): KeyClause {
  const text = clauseObj.text;
  const lower = text.toLowerCase();
  const numLabel = `Clause ${clauseObj.number}`;
  const name = `${numLabel}: ${clauseObj.title}`;

  let summary = '';
  let plainExplanation = '';
  let recommendation = '';
  let risk: 'low' | 'medium' | 'high' = 'low';
  let riskJustification = 'Standard contractual clause adhering to ordinary commercial and civil practices.';

  if (docType === 'Employment Agreement') {
    if (lower.includes('position') || lower.includes('duties') || lower.includes('appointment')) {
      summary = 'Defines the job title, scope of responsibility, and reporting obligations.';
      plainExplanation = 'Sets out your designation and general duties. Ensure the role description accurately reflects your day-to-day work.';
      recommendation = 'Clarify key performance indicators (KPIs) and review periods with your manager.';
    } else if (lower.includes('salary') || lower.includes('remuneration') || lower.includes('compensation')) {
      summary = 'Specifies monthly salary amount, disbursement schedule, and statutory tax deductions.';
      plainExplanation = 'You are entitled to receive your agreed salary on or before the stated monthly payment date, subject to statutory deductions like TDS and PF.';
      recommendation = 'Keep quarterly Form 16 / payslips for income tax filing and proof of earnings.';
    } else if (lower.includes('probation')) {
      summary = 'Establishes initial evaluation period and relaxed termination notice rules.';
      plainExplanation = 'During probation, either party can end employment with a shorter notice period. Once confirmed, regular full notice terms apply.';
      recommendation = 'Ensure you receive a written confirmation letter upon successful completion of the probation term.';
      risk = 'medium';
      riskJustification = 'Explicit rule: Short notice period during probation increases job transition vulnerability.';
    } else if (lower.includes('working hours') || lower.includes('location')) {
      summary = 'Defines standard working hours, office location, and work arrangement.';
      plainExplanation = 'Specifies your standard work hours and primary workplace location, including overtime or hybrid eligibility.';
      recommendation = 'Confirm whether remote work or overtime compensation is supported in writing.';
    } else if (lower.includes('leave') || lower.includes('benefits')) {
      summary = 'Outlines annual paid leave entitlement, holidays, and company welfare benefits.';
      plainExplanation = 'You are entitled to paid annual leave days and public holidays in accordance with state shops and establishments norms.';
      recommendation = 'Review leave encashment and carry-forward rules for unutilized annual leaves.';
    } else if (lower.includes('confidential')) {
      summary = 'Restricts unauthorized disclosure of proprietary trade secrets and client data.';
      plainExplanation = 'You must keep company data, customer lists, and code secret both during and after your employment.';
      recommendation = 'Maintain clean separation between personal open-source projects and employer proprietary assets.';
    } else if (lower.includes('intellectual property') || lower.includes('inventions')) {
      summary = 'Assigns works, software code, and patentable inventions created in the course of work to the employer.';
      plainExplanation = 'Code and deliverables created during working hours for company projects belong exclusively to the employer.';
      recommendation = 'Document any pre-existing personal inventions or repositories prior to joining to prevent assignment disputes.';
    } else if (lower.includes('non-solicit') || lower.includes('code of conduct')) {
      summary = 'Governs professional ethics and restrains solicitation of colleagues or clients upon exit.';
      plainExplanation = 'Prevents poaching company employees or recruiting existing clients after you leave.';
      recommendation = 'Ensure non-solicitation restrictions are reasonable in duration (typically 6 to 12 months).';
      risk = 'medium';
      riskJustification = 'Explicit rule: Post-employment restrictions require careful review regarding career mobility.';
    } else if (lower.includes('terminate') || lower.includes('notice period')) {
      summary = 'Governs separation procedures, advance written notice periods, and payment in lieu of notice.';
      plainExplanation = 'Both you and the employer must give the specified written notice (or basic salary in lieu) before ending employment.';
      recommendation = 'Ensure notice requirements are mutual and that exit clearances have clear timelines.';
      if (lower.includes('without notice') || lower.includes('immediate dismissal at will')) {
        risk = 'high';
        riskJustification = 'Explicit rule: Immediate termination at will without notice creates significant employment insecurity.';
      } else {
        risk = 'low';
        riskJustification = 'Explicit rule: Standard bilateral notice period.';
      }
    } else if (lower.includes('dispute') || lower.includes('jurisdiction') || lower.includes('governing law')) {
      summary = 'Specifies Indian governing law and designated court jurisdiction for legal claims.';
      plainExplanation = 'Any legal claims arising out of this contract will be adjudicated under Indian law in the specified city courts.';
      recommendation = 'Confirm that the designated court city is accessible to you without prohibitive travel costs.';
    } else if (lower.includes('amendment') || lower.includes('entire agreement')) {
      summary = 'Supersedes prior verbal representations and requires written execution for amendments.';
      plainExplanation = 'Verbal promises or informal chat agreements are not legally binding; changes must be in a signed written addendum.';
      recommendation = 'Ensure any agreed promotional terms or bonuses are documented in signed written annexures.';
    } else {
      summary = text.slice(0, 110) + (text.length > 110 ? '...' : '');
      plainExplanation = 'Governs specific terms of the employment relationship. Review obligations carefully.';
      recommendation = 'Clarify any ambiguous obligations with your HR representative before signing.';
    }
  } else {
    // Rental / General Clauses
    if (lower.includes('rent') || lower.includes('monthly payment')) {
      summary = 'Specifies recurring rental fee, payment due date, and payment mechanism.';
      plainExplanation = 'You are required to transfer the specified rent on or before the due date each month. Always obtain written or digital receipts.';
      recommendation = 'Set up bank mandate transfers and preserve monthly transaction records.';
    } else if (lower.includes('deposit') || lower.includes('security')) {
      summary = 'Defines the advance interest-free security deposit amount and refund conditions.';
      plainExplanation = 'The advance deposit must be refunded upon peaceful handover of vacant possession, subject to legitimate utility deductions.';
      recommendation = 'Photograph the premises on move-in day to prevent arbitrary deductions.';
      if (lower.includes('non-refundable')) {
        risk = 'high';
        riskJustification = 'Explicit rule: Non-refundable deposit terms create substantial financial loss risk.';
      }
    } else if (lower.includes('term of') || lower.includes('duration') || lower.includes('commencing')) {
      summary = 'Governs the total lifespan and start date of the agreement.';
      plainExplanation = 'Specifies the duration of the contract. In India, 11-month leases are standard practice.';
      recommendation = 'Verify that the commencement date accurately matches your move-in date.';
    } else if (lower.includes('late payment') || lower.includes('interest on delayed') || lower.includes('penalty')) {
      summary = 'Outlines financial penalties or daily interest charges if payment is delayed.';
      plainExplanation = 'If payment is delayed beyond the grace period, additional interest or late penalty charges apply.';
      recommendation = 'Ensure a reasonable grace period (e.g. 5 to 7 days) exists before penalties trigger.';
      risk = 'medium';
      riskJustification = 'Explicit rule: Financial penalties for delayed payments reduce flexibility during temporary banking delays.';
    } else if (lower.includes('damage') || lower.includes('maintenance') || lower.includes('repair')) {
      summary = 'Allocates responsibility for property upkeep, repairs, and fixtures.';
      plainExplanation = 'Normal wear and tear is typically excluded; tenant pays for physical breakage of fittings, while landlord handles structural repairs.';
      recommendation = 'Ensure wear-and-tear exceptions are explicitly retained.';
    } else if (lower.includes('terminate') || lower.includes('notice period') || lower.includes('lock-in')) {
      summary = 'Sets forth notice requirements and early termination conditions.';
      plainExplanation = 'Defines advance notice required to vacate. A lock-in period obligates payment during the initial commitment.';
      recommendation = 'Check whether notice can be delivered via registered email.';
      if (lower.includes('lock-in')) {
        risk = 'medium';
        riskJustification = 'Explicit rule: Lock-in commitments restrict early exit without financial penalty.';
      }
    } else if (lower.includes('dispute') || lower.includes('jurisdiction') || lower.includes('arbitrat')) {
      summary = 'Designates the legal venue and court forum for settling disagreements.';
      plainExplanation = 'Legal disputes will be handled in the specified city courts or through formal conciliation.';
      recommendation = 'Confirm that the designated venue is locally accessible.';
    } else if (lower.includes('amend') || lower.includes('modify') || lower.includes('written consent')) {
      summary = 'Requires modifications to be in writing and signed by both parties.';
      plainExplanation = 'Neither party can unilaterally change terms; any amendment requires mutual written agreement.';
      recommendation = 'Insist on signed written addendums for any modified terms.';
    } else {
      summary = text.slice(0, 110) + (text.length > 110 ? '...' : '');
      plainExplanation = 'Governs specific contractual duties. Review all terms carefully.';
      recommendation = 'Ensure you understand every obligation in this clause before signing.';
    }
  }

  return {
    name,
    clauseNumber: clauseObj.number,
    originalText: text,
    summary,
    risk,
    plainExplanation,
    recommendation,
    riskJustification
  };
}

/**
 * Main full analysis generator
 */
export function analyzeLegalAgreement(text: string, fileName: string): DocumentAnalysis {
  const docType = identifyDocumentType(text, fileName);
  const extractedBlocks = extractNumberedClausesFromText(text);
  const detectedFields = detectDocumentTypeFields(text, extractedBlocks, docType);
  const clauses: KeyClause[] = extractedBlocks.map(b => analyzeIndividualClause(b, docType));

  // Synthesize Plain English Narrative based on document type
  const partiesField = detectedFields.find(f => f.fieldName.startsWith('Parties'));
  const primaryCompField = detectedFields.find(f => f.fieldName.includes('Salary') || f.fieldName.includes('Monthly Rent'));
  const durationField = detectedFields.find(f => f.fieldName.includes('Duration'));
  const terminationField = detectedFields.find(f => f.fieldName.includes('Termination'));
  const disputeField = detectedFields.find(f => f.fieldName.includes('Dispute'));

  let summaryNarrative = `Identified as ${docType} containing exactly ${clauses.length} distinct numbered clauses. `;

  if (partiesField?.found) {
    summaryNarrative += `Parties: ${partiesField.value}. `;
  }
  if (primaryCompField?.found) {
    summaryNarrative += `Financial terms: ${primaryCompField.value}. `;
  }
  if (durationField?.found) {
    summaryNarrative += `Term: ${durationField.value}. `;
  }
  if (terminationField?.found) {
    summaryNarrative += `Termination terms: ${terminationField.value}. `;
  }
  if (disputeField?.found) {
    summaryNarrative += `Dispute forum: ${disputeField.value}. `;
  }

  const missingApplicable = detectedFields.filter(f => f.status === 'not_found');
  if (missingApplicable.length > 0) {
    summaryNarrative += `Note: ${missingApplicable.length} expected fields were not found in the text (${missingApplicable.map(m => m.fieldName).join(', ')}). `;
  }

  return {
    id: `doc-${Date.now()}`,
    title: fileName || `${docType} Document`,
    documentType: docType,
    uploadDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric', day: 'numeric' }),
    fileName: fileName,
    fileSize: `${(text.length / 1024).toFixed(1)} KB`,
    extractedTextSnippet: text.slice(0, 2200) + (text.length > 2200 ? '... [Preview Truncated]' : ''),
    plainEnglishSummary: summaryNarrative.trim(),
    clauses,
    detectedFields,
    suggestedQuestions: docType === 'Employment Agreement' ? [
      'What are the performance criteria required for confirmation after probation?',
      'Are overtime hours compensated or eligible for compensatory leave?',
      'What is the notice period payout policy if the employer initiates separation?',
      'Are annual increments linked to company-wide performance or individual appraisals?'
    ] : [
      'Has the landlord confirmed payment of property taxes and society maintenance charges?',
      'Is there an explicit wear-and-tear exemption protecting your security deposit upon exit?',
      'Does the agreement specify how utility bills (electricity, water) will be calculated and settled?',
      'What happens if either party terminates during the lock-in period due to unforeseen relocation?'
    ],
    relevantActs: docType === 'Employment Agreement' ? [
      'Industrial Employment (Standing Orders) Act, 1946',
      'The Payment of Wages Act, 1936',
      'State Shops and Commercial Establishments Act',
      'Indian Contract Act, 1872 (Section 27 on Restraint of Trade)'
    ] : [
      'Indian Contract Act, 1872',
      'The Registration Act, 1908 (Section 17)',
      'Model Tenancy Act / State Rent Control Framework',
      'Transfer of Property Act, 1882'
    ],
    isSimulated: true
  };
}

// ═══════════════════════════════════════════════════════════
// PHISHING AWARENESS DATA
// ═══════════════════════════════════════════════════════════

export type SectionKey = 'dashboard' | 'samples' | 'redflags' | 'urls' | 'prevention' | 'response' | 'summary'

export interface PhishingSample {
  id: number
  title: string
  type: string
  from: string
  to: string
  subject: string
  body: string[]
  link: string
  linkLabel: string
  suspiciousElements: { element: string; details: string; reason: string }[]
  redFlags: string[]
  whyUnsafe: string[]
  severity: 'critical' | 'high' | 'medium'
}

export const phishingSamples: PhishingSample[] = [
  {
    id: 1,
    title: 'Bank Account Verification Scam',
    type: 'Email Phishing',
    from: 'security@bankk-of-america.com',
    to: 'john.doe@email.com',
    subject: 'URGENT: Your Account Will Be Suspended!',
    body: [
      'Dear Valued Customer,',
      'We have detected unusual activity on your account. For your security, we have temporarily limited access to your account. To restore full access, please click the link below and verify your identity within 24 hours, or your account will be permanently suspended.',
      'If you do not verify your account within 24 hours, we will be forced to close your account permanently. This is for your protection.',
      'Thank you for your cooperation.',
      'Bank of America Security Team'
    ],
    link: 'http://bankk-of-america.com.verify-account.secure-login-now.net/urgent',
    linkLabel: 'Click here to verify your account',
    suspiciousElements: [
      { element: 'Sender Domain', details: 'bankk-of-america.com', reason: 'Misspelled domain with double "k" - not the official bankofamerica.com domain' },
      { element: 'Link URL', details: 'secure-login-now.net', reason: 'The actual domain is "secure-login-now.net" - a completely different site. The bank name is a subdomain trick' },
      { element: 'HTTP Protocol', details: 'http:// (not https://)', reason: 'Legitimate banks always use HTTPS. HTTP indicates no encryption' },
      { element: 'Keyword: "URGENT"', details: 'Subject line and body', reason: 'Creates artificial panic to bypass rational thinking' },
      { element: 'Keyword: "permanently suspended"', details: 'Body text threat', reason: 'Extreme consequence designed to frighten the victim into immediate action' },
      { element: 'Keyword: "24 hours"', details: 'Time pressure', reason: 'Arbitrary deadline forces hasty decisions without verification' },
    ],
    redFlags: [
      'Generic greeting ("Dear Valued Customer") instead of the customer\'s actual name',
      'Misspelled sender domain (bankk-of-america.com) - a clear sign of a lookalike domain',
      'URL subdomain deception - the attacker uses the bank name as a subdomain of an entirely different domain',
      'Threat of account closure within 24 hours - legitimate financial institutions do not close accounts without prior written notice',
      'Use of HTTP instead of HTTPS - any legitimate banking website would use encrypted connections',
      'No reference to any specific account number or transaction',
      'Poor grammar in certain phrases and an overly aggressive tone',
      'The link does not direct to the official Bank of America website domain',
    ],
    whyUnsafe: [
      'The primary danger lies in the malicious URL, which uses a sophisticated subdomain trick. "bankk-of-america.com.verify-account.secure-login-now.net" appears to be a Bank of America link at first glance, but the actual destination domain is "secure-login-now.net," controlled by the attacker.',
      'Clicking this link would take the victim to a convincing replica of the Bank of America login page, where any entered credentials would be captured by the attacker in real time.',
      'The urgency tactics (24-hour deadline, permanent suspension) are textbook social engineering methods that exploit fear to prevent the victim from verifying the email through independent channels.',
      'The generic salutation, combined with the absence of any account-specific information, confirms this is a mass phishing campaign rather than a targeted communication.',
    ],
    severity: 'critical'
  },
  {
    id: 2,
    title: 'IT Helpdesk Password Reset Scam',
    type: 'Spear Phishing',
    from: 'IT-Helpdesk@company-corp.com',
    to: 'employee@company.com',
    subject: 'Password Reset Required - Immediate Action',
    body: [
      'Hello Employee,',
      'Our system has detected that your password has expired. You must reset your password immediately to maintain access to your corporate email, VPN, and internal systems. Failure to reset within 12 hours will result in automatic account lockout.',
      'If you experience any issues, please contact the IT Helpdesk at helpdesk@company-corp.com.',
      'Best regards,',
      'IT Security Team - Company Corporation'
    ],
    link: 'http://company-corp-password-reset.com/employeeportal',
    linkLabel: 'Reset your password now',
    suspiciousElements: [
      { element: 'Sender Domain', details: 'company-corp.com', reason: 'Does not match the employee\'s actual company domain (company.com)' },
      { element: 'Link URL', details: 'company-corp-password-reset.com', reason: 'Completely separate domain pretending to be a password reset portal' },
      { element: 'Keyword: "Immediate Action"', details: 'Subject line', reason: 'Pressure tactic to force rapid compliance without verification' },
      { element: 'Keyword: "12 hours"', details: 'Time pressure', reason: 'Unusually short deadline for a routine IT process' },
      { element: 'Keyword: "automatic lockout"', details: 'Threat', reason: 'Fear of losing access to all work systems creates strong compliance pressure' },
    ],
    redFlags: [
      'The sender domain "company-corp.com" does not match the legitimate corporate domain "company.com"',
      'The password reset link points to "company-corp-password-reset.com" instead of the company\'s official IT portal',
      'Generic salutation "Hello Employee" rather than the employee\'s actual name',
      'The 12-hour deadline is unusually aggressive for a routine password expiration',
      'The email mentions multiple systems (email, VPN, internal) to increase perceived stakes',
      'The contact email uses the same suspicious domain as the sender',
      'Legitimate password reset processes direct users to the company\'s established identity management portal',
    ],
    whyUnsafe: [
      'This phishing email targets the workplace environment, where employees are accustomed to following IT directives without question. The attacker exploits this compliance culture.',
      'The fake password reset portal would capture both current and new passwords, giving the attacker immediate access to the employee\'s corporate account.',
      'With valid credentials, the attacker could access email, internal documents, VPN connections, and potentially move laterally through the corporate network.',
      'The domain mismatch is the most critical indicator: "company-corp.com" versus "company.com." While the difference seems small, it represents entirely different domain registrations.',
    ],
    severity: 'critical'
  },
  {
    id: 3,
    title: 'Lottery Prize Notification Scam',
    type: 'Advance Fee Fraud',
    from: 'claims@international-lottery-awards.org',
    to: 'winner2024@gmail.com',
    subject: 'CONGRATULATIONS!!! You Have Won $2,500,000 USD!!!',
    body: [
      'Dear Lucky Winner,',
      'We are pleased to inform you that your email address has been selected as the WINNER of the 2024 International Email Lottery Awards! Your winning number is ILA-7734-2024-US.',
      'You have won the grand prize of $2,500,000.00 USD (Two Million Five Hundred Thousand United States Dollars).',
      'To claim your prize, please provide the following information immediately: Full Name and Address, Date of Birth, Phone Number, Bank Account Details for Transfer, Copy of ID/Passport.',
      'Note: Keep this notification confidential to avoid double claims. You must claim within 7 days.'
    ],
    link: 'mailto:claims@international-lottery-awards.org',
    linkLabel: 'Contact claims agent Dr. James Williams',
    suspiciousElements: [
      { element: 'Sender Domain', details: 'international-lottery-awards.org', reason: 'No verifiable lottery organization uses this domain; .org used to appear legitimate' },
      { element: 'Keyword: "CONGRATULATIONS!!!"', details: 'Subject line', reason: 'Excessive punctuation and capitalization - unprofessional and typical of scam emails' },
      { element: 'Keyword: "Bank Account Details"', details: 'Requested information', reason: 'Legitimate organizations never request banking details via email' },
      { element: 'Keyword: "confidential"', details: 'Warning in body', reason: 'Instructing secrecy prevents the victim from seeking advice or verification' },
      { element: 'Keyword: "7 days"', details: 'Time pressure', reason: 'Artificial deadline to prevent researching the legitimacy of the claim' },
    ],
    redFlags: [
      'The email claims you won a lottery you never entered - it is logically impossible to win a contest without participation',
      'Excessive use of capitalization and exclamation marks is unprofessional and designed to create excitement that overrides critical judgment',
      'Request for highly sensitive personal information including bank account details and copies of identification documents',
      'The instruction to keep the notification "confidential" is a deliberate tactic to isolate the victim',
      'The "claims agent" with a formal title adds false credibility with no way to verify this person exists',
      'The .org domain is used to create an illusion of legitimacy, but anyone can register a .org domain',
      'No physical address, phone number, or regulatory license information for the supposed lottery organization',
    ],
    whyUnsafe: [
      'This message is a complete fabrication designed to extract personal and financial information. There is no lottery, no prize, and no Dr. James Williams.',
      'If the victim responds with the requested information, they expose themselves to identity theft, direct financial theft, and potential further targeting.',
      'These scams often escalate by requesting "processing fees," "tax payments," or "legal fees" before the prize can be released.',
      'The confidentiality instruction creates a psychological barrier that prevents the victim from seeking a second opinion.',
    ],
    severity: 'critical'
  },
  {
    id: 4,
    title: 'Social Media Account Suspension Scam',
    type: 'Brand Impersonation',
    from: 'support@instagram-security-verify.com',
    to: 'user@hotmail.com',
    subject: 'Your Instagram Account Will Be Deleted - Verify Now',
    body: [
      'Dear User,',
      'Your Instagram account has been flagged for violating our Community Guidelines. Specifically, your account has been reported for posting content that infringes on intellectual property rights.',
      'If you believe this is an error, you must verify your account immediately by clicking the link below. If you do not verify within 48 hours, your account will be permanently deleted, and all your photos, followers, and data will be lost forever.',
      'Instagram Support Team',
      'Meta Platforms Inc.'
    ],
    link: 'http://instagram-security-verify.com/login',
    linkLabel: 'Verify Your Account',
    suspiciousElements: [
      { element: 'Sender Domain', details: 'instagram-security-verify.com', reason: 'Not an official Instagram/Meta domain. Instagram emails come from @mail.instagram.com or @fb.com' },
      { element: 'Link URL', details: 'instagram-security-verify.com/login', reason: 'External phishing site, not the real instagram.com domain' },
      { element: 'Keyword: "permanently deleted"', details: 'Body text threat', reason: 'Extreme consequence designed to panic users who value their social media presence' },
      { element: 'Keyword: "intellectual property"', details: 'Specific accusation', reason: 'Vague legal-sounding claim that intimidates without providing specific details' },
      { element: 'Keyword: "lost forever"', details: 'Emotional trigger', reason: 'Irreversible loss language amplifies fear of losing memories and connections' },
    ],
    redFlags: [
      'The sender domain is not an official Instagram or Meta domain - Instagram sends from @mail.instagram.com or @fb.com',
      'Instagram does not send emails demanding account verification through external links',
      'The vague accusation of "intellectual property" violation without specifying which content was flagged',
      'The 48-hour deadline with threat of permanent deletion - Instagram\'s actual policy includes multiple warnings',
      'The link uses the brand name "instagram" in a deceptive domain (typosquatting/brand impersonation)',
      'No reference to the user\'s Instagram handle or account identifier',
      'The email uses "Dear User" instead of the account holder\'s username',
    ],
    whyUnsafe: [
      'This phishing email exploits the victim\'s emotional connection to their social media account. For many users, their Instagram represents years of work and valuable social connections.',
      'The malicious link leads to a fake Instagram login page that captures the username and password, which the attacker can then use to take over the account.',
      'Once the attacker gains access, they can spread phishing links to followers, demand ransom, or sell the account on the black market.',
      'Users should always verify account status directly within the Instagram app rather than clicking links in emails.',
    ],
    severity: 'high'
  },
  {
    id: 5,
    title: 'Package Delivery Notification Scam',
    type: 'Delivery Phishing',
    from: 'notifications@fedx-delivery.com',
    to: 'shopper@yahoo.com',
    subject: 'Delivery Failed - Action Required for Package #FDX-8847291',
    body: [
      'Dear Customer,',
      'We attempted to deliver your package but were unable to complete the delivery because no one was available to sign for it. Your package is being held at our facility and will be returned to the sender in 3 business days if not claimed.',
      'To reschedule delivery or arrange pickup, please update your delivery preferences.',
      'A redelivery fee of $1.99 may apply. Please have your credit card ready.',
      'FedEx Customer Service'
    ],
    link: 'http://fedx-delivery.com/track/package?id=FDX-8847291',
    linkLabel: 'Update Delivery Preferences',
    suspiciousElements: [
      { element: 'Sender Domain', details: 'fedx-delivery.com', reason: 'Misspelled - real FedEx uses fedex.com. "fedx" is a deliberate truncation' },
      { element: 'Link URL', details: 'fedx-delivery.com/track/package', reason: 'Fake tracking page that mimics FedEx but is controlled by attackers' },
      { element: 'Keyword: "redelivery fee"', details: 'Payment demand', reason: 'FedEx does not charge redelivery fees; this is designed to collect credit card information' },
      { element: 'Keyword: "$1.99"', details: 'Small amount', reason: 'Low amount feels reasonable and reduces suspicion, while capturing full card details' },
      { element: 'Keyword: "3 business days"', details: 'Time pressure', reason: 'Short deadline creates urgency to resolve the supposed delivery issue' },
    ],
    redFlags: [
      'The domain "fedx-delivery.com" is a misspelling of "fedex.com" - FedEx\'s official domain is fedex.com',
      'FedEx does not charge redelivery fees - the "$1.99 fee" captures credit card information',
      'The email does not specify the sender\'s name, return address, or any order details',
      'No tracking number in the standard FedEx format (12-digit number or international format)',
      'FedEx typically leaves a physical door tag when a delivery attempt fails',
      'The instruction to "have your credit card ready" is a strong indicator of fraud',
      'Legitimate delivery services do not request payment information through email',
    ],
    whyUnsafe: [
      'This message exploits a common scenario: a missed package delivery. Many people regularly order items online and may genuinely be expecting a delivery.',
      'The fake tracking page collects credit card information through the "redelivery fee" and could also install malware.',
      'The low fee amount of $1.99 is calculated: small enough to seem reasonable, but the credit card details entered give the attacker everything needed for significant fraud.',
      'The domain deception is particularly effective because "fedx" is visually similar to "fedex" at a glance, especially on mobile devices.',
    ],
    severity: 'high'
  },
]

export const redFlagChecklist = [
  { category: 'Sender', flag: 'Domain Mismatch', severity: 'critical', description: 'Sender domain does not match the claimed organization' },
  { category: 'Sender', flag: 'Misspelled Domain', severity: 'critical', description: 'Domain contains typos or extra characters mimicking a legitimate domain' },
  { category: 'Sender', flag: 'Free Email Provider', severity: 'high', description: 'Official communications from organizations using Gmail, Yahoo, etc.' },
  { category: 'Content', flag: 'Generic Greeting', severity: 'high', description: '"Dear Customer" or "Dear User" instead of actual name' },
  { category: 'Content', flag: 'Urgency/Time Pressure', severity: 'critical', description: 'Arbitrary deadlines (24 hours, 48 hours) with threats of consequences' },
  { category: 'Content', flag: 'Threats of Consequences', severity: 'critical', description: 'Account suspension, deletion, legal action, or financial loss' },
  { category: 'Content', flag: 'Excessive Capitalization', severity: 'medium', description: 'ALL CAPS words, multiple exclamation marks, unprofessional tone' },
  { category: 'Content', flag: 'Grammatical Errors', severity: 'medium', description: 'Spelling mistakes, awkward phrasing, inconsistent formatting' },
  { category: 'Content', flag: 'Request for Sensitive Info', severity: 'critical', description: 'Asking for passwords, SSN, bank details, ID copies via email' },
  { category: 'Links', flag: 'Subdomain Deception', severity: 'critical', description: 'Legitimate brand name used as subdomain of a different domain' },
  { category: 'Links', flag: 'HTTP Instead of HTTPS', severity: 'critical', description: 'Unencrypted connection for a page that should be secure' },
  { category: 'Links', flag: 'URL Shorteners', severity: 'high', description: 'Bit.ly, TinyURL, or other shorteners hiding the true destination' },
  { category: 'Links', flag: 'Mismatched Link Text', severity: 'critical', description: 'Display text shows one URL but actual link points elsewhere' },
  { category: 'Structure', flag: 'No Physical Address', severity: 'medium', description: 'No verifiable company address or contact information' },
  { category: 'Structure', flag: 'Confidentiality Demand', severity: 'high', description: 'Instructing the recipient to keep the message secret' },
  { category: 'Structure', flag: 'No Specific Details', severity: 'high', description: 'No account numbers, order IDs, or transaction references' },
]

export const preventionPractices = [
  { icon: 'Eye', title: 'Verify Before You Click', description: 'Never click on links in unsolicited emails. Navigate directly to the organization\'s website by typing the URL in your browser.' },
  { icon: 'Search', title: 'Check the Sender\'s Address', description: 'Always examine the full sender email address, not just the display name. Look for misspellings or domain mismatches.' },
  { icon: 'Lock', title: 'Enable Multi-Factor Authentication', description: 'MFA adds a second verification step beyond your password. Even if an attacker obtains your password, they cannot access your account without the second factor.' },
  { icon: 'Key', title: 'Use a Password Manager', description: 'Password managers only auto-fill credentials on legitimate websites. If you land on a phishing site, your password manager will not recognize it.' },
  { icon: 'AlertTriangle', title: 'Be Skeptical of Urgency', description: 'Legitimate organizations rarely demand immediate action via email. If a message creates urgency, slow down and verify.' },
  { icon: 'Flag', title: 'Report Suspicious Emails', description: 'Use your email client\'s "Report Phishing" feature or forward suspicious emails to your IT security team.' },
  { icon: 'Shield', title: 'Keep Software Updated', description: 'Regularly update your operating system, browser, and email client to ensure you have the latest security patches.' },
]

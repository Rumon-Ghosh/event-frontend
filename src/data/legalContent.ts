export type LegalSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  effectiveDate: string;
  contactEmail: string;
  highlights: string[];
  quickFacts: {
    label: string;
    value: string;
  }[];
  sections: LegalSection[];
};

export const privacyContent: LegalDocument = {
  eyebrow: "Privacy Policy",
  title: "How we collect, use, and protect your event data",
  subtitle:
    "This page explains what information EventEra collects when you browse events, create bookings, or contact our team, and how that information supports a safer event experience.",
  lastUpdated: "March 29, 2026",
  effectiveDate: "April 1, 2026",
  contactEmail: "privacy@eventera.com",
  highlights: [
    "We only collect the data needed to run bookings, accounts, and support.",
    "Payment handling is processed through secure third-party providers.",
    "Users can request account updates, exports, or deletion through support.",
  ],
  quickFacts: [
    { label: "Coverage", value: "Accounts, bookings, organizer tools, and support" },
    { label: "Data Types", value: "Profile details, payment metadata, device signals" },
    { label: "Retention", value: "Only for as long as operationally required" },
  ],
  sections: [
    {
      title: "Information We Collect",
      body: [
        "We collect information you provide directly, such as your name, email address, phone number, billing details, and event preferences when you create an account, purchase tickets, or contact support.",
        "We also collect limited technical information like browser type, IP address, referral pages, and device interactions so we can improve performance, detect fraud, and understand how our platform is being used.",
      ],
      bullets: [
        "Account and profile information",
        "Order, refund, and attendance records",
        "Organizer-submitted event content",
        "Support messages and feedback",
      ],
    },
    {
      title: "How We Use Your Data",
      body: [
        "We use personal information to deliver tickets, confirm bookings, send essential service updates, personalize recommendations, and help organizers manage attendee lists and check-in workflows.",
        "Information may also be used for analytics, abuse prevention, legal compliance, and improving features such as event discovery, reminders, and customer support quality.",
      ],
    },
    {
      title: "Payments and Third Parties",
      body: [
        "Payments are handled by trusted third-party processors. We do not store full payment card numbers on our platform, but we may retain transaction identifiers, billing names, and payment status for reconciliation and support.",
        "We may also rely on third-party services for email delivery, analytics, fraud prevention, cloud hosting, and customer communication. These vendors receive only the data needed to perform their service.",
      ],
    },
    {
      title: "Cookies and Tracking",
      body: [
        "Cookies and similar technologies help us keep you signed in, remember preferences, measure traffic, and understand campaign performance. Some cookies are essential for platform functionality, while others support analytics and personalization.",
        "You can manage cookies through your browser settings, though disabling some categories may affect sign-in, checkout, or event recommendation features.",
      ],
    },
    {
      title: "Your Choices and Rights",
      body: [
        "You may update your profile details, communication preferences, or organizer information from your account where available. You can also contact us to request access, correction, export, or deletion of personal data.",
        "Where required by applicable law, we will honor privacy rights requests within the appropriate response period after verifying your identity and the scope of the request.",
      ],
    },
    {
      title: "Security and Retention",
      body: [
        "We use technical and organizational safeguards designed to protect user data from unauthorized access, misuse, or loss. No system is perfectly secure, but we continuously improve our protections and internal controls.",
        "We retain information only as long as needed to operate the service, resolve disputes, prevent abuse, maintain required records, and comply with legal or financial obligations.",
      ],
    },
  ],
};

export const termsContent: LegalDocument = {
  eyebrow: "Terms of Service",
  title: "The rules for using EventEra as an attendee or organizer",
  subtitle:
    "These terms outline the responsibilities, expectations, and platform rules that apply when you browse events, buy tickets, publish listings, or use EventEra services.",
  lastUpdated: "March 29, 2026",
  effectiveDate: "April 1, 2026",
  contactEmail: "legal@eventera.com",
  highlights: [
    "Using the platform means you agree to follow these service terms.",
    "Organizers are responsible for the accuracy of their event listings.",
    "Abuse, fraud, scraping, or unlawful activity can lead to suspension.",
  ],
  quickFacts: [
    { label: "Applies To", value: "Attendees, organizers, guests, and partners" },
    { label: "Platform Scope", value: "Discovery, ticketing, hosting, and support" },
    { label: "Support Contact", value: "legal@eventera.com" },
  ],
  sections: [
    {
      title: "Acceptance of Terms",
      body: [
        "By accessing or using EventEra, you agree to these Terms of Service and any related policies referenced within them. If you do not agree, you should not use the platform.",
        "We may update these terms from time to time. Continued use of the service after changes take effect means you accept the revised terms.",
      ],
    },
    {
      title: "Accounts and Eligibility",
      body: [
        "You are responsible for maintaining accurate account information and safeguarding your login credentials. You may not impersonate another person or use the platform in a way that misleads attendees, organizers, or partners.",
        "If you create an account on behalf of an organization, you confirm that you have authority to bind that organization to these terms.",
      ],
      bullets: [
        "Provide current and truthful registration details",
        "Protect access credentials and account activity",
        "Notify us promptly about suspected unauthorized use",
      ],
    },
    {
      title: "Organizer Responsibilities",
      body: [
        "Organizers are solely responsible for event descriptions, schedules, venues, pricing, accessibility information, cancellations, and compliance with laws or permits relevant to their events.",
        "We may remove listings, pause payouts, or restrict organizer access if we believe an event is fraudulent, unsafe, misleading, unlawful, or harmful to attendees or the platform.",
      ],
    },
    {
      title: "Bookings, Fees, and Refunds",
      body: [
        "Ticket purchases are subject to the pricing, fees, taxes, and refund terms shown at checkout or in the organizer's event policy. Some fees may be non-refundable unless required by law.",
        "Refund timelines can vary depending on payment provider processing, organizer approval, and the nature of the event change or cancellation.",
      ],
    },
    {
      title: "Acceptable Use",
      body: [
        "You may not use EventEra to violate laws, interfere with platform operations, collect data without permission, distribute malware, manipulate attendance records, or exploit users through scams or abusive behavior.",
        "We reserve the right to investigate suspicious conduct and suspend or terminate access where necessary to protect users, organizers, or the integrity of the service.",
      ],
    },
    {
      title: "Content, Liability, and Termination",
      body: [
        "Users retain ownership of the content they submit, but grant EventEra a license to host, display, and distribute that content as needed to operate and promote the platform.",
        "To the extent permitted by law, EventEra is not liable for indirect or consequential damages arising from third-party events, cancellations, venue issues, or user-generated content. We may suspend or terminate access if these terms are violated.",
      ],
    },
  ],
};

export const cookieContent: LegalDocument = {
  eyebrow: "Cookie Policy",
  title: "A simple overview of how cookies support your browsing experience",
  subtitle:
    "This cookie page explains the small data files we use to keep EventEra working smoothly, remember your preferences, and understand how people interact with the platform.",
  lastUpdated: "March 29, 2026",
  effectiveDate: "April 1, 2026",
  contactEmail: "privacy@eventera.com",
  highlights: [
    "Essential cookies help with sign-in, checkout, and core platform stability.",
    "Analytics cookies help us understand traffic and improve event discovery.",
    "You can manage or disable cookies from your browser settings.",
  ],
  quickFacts: [
    { label: "Main Use", value: "Authentication, preferences, and analytics" },
    { label: "Optional Cookies", value: "Used for performance and personalization" },
    { label: "Control", value: "Browser settings or device-level preferences" },
  ],
  sections: [
    {
      title: "What Cookies Are",
      body: [
        "Cookies are small text files stored on your device when you visit a website. They help platforms remember useful details such as your login session, language choices, or browsing activity.",
        "On EventEra, cookies are used to make common actions faster and more reliable, especially when you explore events, sign in, or complete a booking.",
      ],
    },
    {
      title: "Types of Cookies We Use",
      body: [
        "Some cookies are essential and are required for the website to function correctly. Others help us measure performance, understand visitor behavior, and improve content relevance.",
      ],
      bullets: [
        "Essential cookies for login, security, and checkout",
        "Preference cookies for saved settings and convenience",
        "Analytics cookies for traffic and feature improvement",
      ],
    },
    {
      title: "Managing Cookie Preferences",
      body: [
        "Most browsers let you view, block, or delete cookies. You can choose to reject certain cookies, but doing so may affect event browsing, account sign-in, or booking flow reliability.",
        "If we introduce additional preference controls inside the platform, those controls will work alongside your browser's cookie settings.",
      ],
    },
  ],
};

export const refundContent: LegalDocument = {
  eyebrow: "Refund Policy",
  title: "A straightforward guide to cancellations, refunds, and timing",
  subtitle:
    "This page gives attendees and organizers a simple view of how EventEra handles refund requests, organizer-led cancellations, and payment processing timelines.",
  lastUpdated: "March 29, 2026",
  effectiveDate: "April 1, 2026",
  contactEmail: "support@eventera.com",
  highlights: [
    "Refund eligibility depends on the organizer policy and event status.",
    "Canceled events are usually prioritized for automatic review.",
    "Processing time may vary by bank, card issuer, or payment provider.",
  ],
  quickFacts: [
    { label: "Typical Review", value: "1 to 3 business days" },
    { label: "Payout Method", value: "Original payment method where possible" },
    { label: "Support", value: "support@eventera.com" },
  ],
  sections: [
    {
      title: "When Refunds May Be Available",
      body: [
        "Refunds may be available when an event is canceled, significantly changed, duplicated in error, or covered by the organizer's stated refund policy. Eligibility depends on the event listing and the circumstances of the request.",
        "Some tickets may be marked as final sale or non-refundable unless required by law or otherwise approved by the organizer.",
      ],
    },
    {
      title: "How the Request Process Works",
      body: [
        "If a refund is needed, attendees should contact support or follow the instructions shown in the order or event confirmation. We review the request alongside the organizer's policy and payment status.",
        "For organizer-led cancellations, we may proactively begin the refund process without requiring each attendee to submit a separate request.",
      ],
      bullets: [
        "Submit the request with booking details",
        "Our team verifies eligibility and payment status",
        "Approved refunds are returned to the original payment method",
      ],
    },
    {
      title: "Processing Timelines",
      body: [
        "Once approved, refunds are generally processed within a few business days, but the final posting time depends on your bank or payment provider. Some methods can take longer to reflect on your statement.",
        "Service fees, taxes, or third-party processing charges may be treated differently depending on the event policy and applicable legal requirements.",
      ],
    },
  ],
};

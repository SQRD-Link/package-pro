// =============================================
// Package Pro — Cloud86 Academy
// Based on DNS Detective architecture
// =============================================

// =============================================
// PERSISTENCE
// =============================================

const SAVE_KEY = 'package_pro_progress';

function saveProgress() {
  const hasProgress = STATE.xp > 0 || STATE.casesCompleted.size > 0 ||
    STATE.currentStep > 0 || Object.keys(STATE.quizAnswered).length > 0;
  if (!hasProgress) return;
  const data = {
    xp: STATE.xp,
    currentCase: STATE.currentCase,
    currentStep: STATE.currentStep,
    casesCompleted: [...STATE.casesCompleted],
    quizAnswered: STATE.quizAnswered,
    totalQuestions: STATE.totalQuestions,
    correctAnswers: STATE.correctAnswers,
    currentView: STATE.currentView,
  };
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch(e) {}
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    data.casesCompleted = new Set(data.casesCompleted);
    return data;
  } catch(e) { return null; }
}

function clearProgress() {
  try { localStorage.removeItem(SAVE_KEY); } catch(e) {}
}

// =============================================
// STATE
// =============================================

const STATE = {
  xp: 0,
  currentCase: null,
  currentStep: 0,
  casesCompleted: new Set(),
  quizAnswered: {},
  totalQuestions: 0,
  correctAnswers: 0,
  currentView: 'intro',
};

// =============================================
// PACKAGE DATA (reference)
// =============================================

const PACKAGES = {
  webhosting: {
    name: 'Webhosting',
    tiers: ['Start', 'Medium', 'Power'],
    notes: {
      Start: '1 website, 5 GB, free migration from Medium+',
      Medium: 'Up to 5 websites, 50 GB, unlimited email',
      Power: 'Unlimited websites, 25 GB, priority support'
    }
  },
  email: {
    name: 'Email Hosting',
    tiers: ['Start', 'Medium', 'Power'],
    notes: {
      Start: '10 mailboxes, 5 GB',
      Medium: '50 mailboxes, 50 GB',
      Power: 'Unlimited mailboxes, 30 GB'
    }
  },
  wordpress: {
    name: 'Managed WordPress',
    tiers: ['Start', 'Medium', 'Power'],
    notes: {
      Start: '2 sites, auto-updates, daily backups',
      Medium: 'Up to 5 sites, staging environment',
      Power: 'Unlimited sites, priority support'
    }
  },
  woocommerce: {
    name: 'Managed WooCommerce',
    tiers: ['Start', 'Medium', 'Power'],
    notes: {
      Start: 'Up to 50 products, daily backups',
      Medium: 'Up to 500 products, staging',
      Power: 'Unlimited products, priority support'
    }
  },
  vps: {
    name: 'Managed VPS',
    tiers: ['Start', 'Medium', 'Power'],
    notes: {
      Start: '3 vCPU, 6 GB RAM, 50 GB SSD',
      Medium: '6 vCPU, 12 GB RAM, 100 GB SSD',
      Power: '8 vCPU, 24 GB RAM, 200 GB SSD'
    }
  }
};

// =============================================
// CASE DATA
// =============================================

const CASES = {
  1: {
    tag: 'Case #1',
    title: 'Multiple Websites, One Package',
    xp: 150,
    tier: 1,
    alexIntro: "Classic opener. A customer thinks hosting is per-website, but there's a much smarter way to handle this. Let's figure out what they actually need.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'Read carefully — the customer has a specific setup in mind.',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00101</span>
              <span class="ticket-priority">🟡 Sales Intake</span>
            </div>
            <div class="ticket-from">From: <strong>Martijn Bakker</strong> — info@bakker-bv.nl</div>
            <div class="ticket-body">
              Hello,<br><br>
              We have three websites: our main company site (bakker-bv.nl), a site for one of our product lines (bakker-products.nl), and a small landing page for an event (bakkerevent.nl). All three run WordPress. We want to host all of them with Cloud86.<br><br>
              Can you advise which package(s) we need? Is it one package or one per website?<br><br>
              Martijn
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> Three WordPress sites. The customer is asking about per-site vs. shared hosting. This is a package decision — but which product line and which tier?</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'Package Basics: What Goes Where',
        subtitle: 'Understanding the product lines before making a recommendation.',
        content: `
          <div class="theory-box">
            <h4>📦 The Product Lines</h4>
            <p>Cloud86 offers five core product lines, each available in Start / Medium / Power:</p>
            <p><strong style="color:var(--amber)">Webhosting</strong> — Classic shared hosting. Great for any kind of website. Start = 2 sites, Medium = up to 5 sites, Power = 10 sites.</p>
            <p><strong style="color:var(--amber)">Managed WordPress</strong> — WordPress-specific hosting with auto-updates, staging, and daily backups. Same 2/5/10 structure as Webhosting.</p>
            <p><strong style="color:var(--amber)">Managed WooCommerce</strong> — Like Managed WordPress, but optimized for webshops. Start = up to 50 products.</p>
            <p><strong style="color:var(--amber)">Email Hosting</strong> — Email-only hosting. 10 / 50 / unlimited mailboxes.</p>
            <p><strong style="color:var(--amber)">Managed VPS</strong> — Virtual private server. Used for high-traffic sites, developers, or customers needing full control.</p>
          </div>
          <div class="theory-box">
            <h4>🔑 The Key Rule: Multiple Websites → Medium Minimum</h4>
            <p>Webhosting Start and Managed WordPress Start support <strong style="color:var(--red)">up to 2 websites</strong>. If a customer has 3 or more websites, they need at least a <strong style="color:var(--amber)">Medium</strong> package (up to 5 sites) or <strong style="color:var(--amber)">Power</strong> (10 sites).</p>
            <p>For Martijn: three WordPress sites → Managed WordPress Medium (5 sites max) or Power (10 sites). Medium is the minimum that fits.</p>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💡</span>
            <div class="clue-text"><strong>Why Managed WordPress instead of regular Webhosting?</strong> When all sites run WordPress, Managed WordPress adds significant value: automatic updates, staging environments, and expert WordPress support. Same price bracket, much better experience for WordPress users.</div>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Package Selection',
        subtitle: 'Pick the right package for Martijn and explain your reasoning.',
        questions: [
          {
            q: 'Martijn has 3 WordPress websites. Which product line best fits his needs?',
            options: ['Webhosting', 'Managed WordPress', 'Managed WooCommerce', 'Managed VPS'],
            correct: 1,
            feedback: 'Correct! All three sites run WordPress, making Managed WordPress the best fit. It includes auto-updates, staging, and WordPress-specific support — advantages that regular Webhosting doesn\'t offer.'
          },
          {
            q: 'Within that product line, which tier does Martijn need at minimum?',
            options: ['Start', 'Medium', 'Power', 'He needs 3 separate Start packages'],
            correct: 1,
            feedback: 'Correct! Medium supports up to 5 websites — more than enough for Martijn\'s 3 sites. Start only supports 2, so it\'s not an option. Power (10 sites) would also work but is more than needed for now.'
          },
          {
            q: 'The customer asks: "Can I start with Start and upgrade later?" What do you tell him?',
            options: [
              'Yes, and all 3 sites can be added to Start',
              'No, upgrading is not possible with Cloud86',
              'Yes, but Start only supports 2 sites — he\'d need to upgrade to Medium before adding site 3',
              'He should buy 3 separate Start packages'
            ],
            correct: 2,
            feedback: 'Correct. Upgrades are always possible, but Start won\'t support more than 2 sites. If he wants all 3 from day one, Medium is the right starting point. If he\'s starting with just 1 or 2 sites, Start is fine — but upgrading before adding site 3 is required.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It',
        subtitle: 'A slight variation on the same situation.',
        scenario: {
          title: 'Scenario: Three sites, but one is a webshop',
          text: 'A customer wants to host three sites: a company brochure site, a blog, and a WooCommerce webshop with 200 products. They ask for one package. What do you recommend, and why?',
          answer: `
            <strong>Recommended: Managed WooCommerce Medium</strong><br><br>
            The WooCommerce webshop determines the product line — Managed WooCommerce is optimized for WooCommerce with performance tuning and specific backup/restore features for shop data.<br><br>
            <strong>Why Medium?</strong> Same 5-site limit applies. Medium supports up to 5 websites and up to 500 products (more than enough for 200).<br><br>
            <strong>Why not Managed WordPress Medium?</strong> Managed WordPress supports WooCommerce, but Managed WooCommerce is the better fit when the primary use case is a webshop. Use the most specific product that covers the use case.
          `
        }
      }
    ]
  },

  2: {
    tag: 'Case #2',
    title: 'The Simple Small Business',
    xp: 125,
    tier: 1,
    alexIntro: "Small business, simple needs. The temptation is to over-sell — but the right package is the one that fits the customer, not the most expensive one.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'A straightforward intake. What does this customer actually need?',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00118</span>
              <span class="ticket-priority">🟢 New Customer</span>
            </div>
            <div class="ticket-from">From: <strong>Anita Visser</strong> — anita@schoonmaakvisser.nl</div>
            <div class="ticket-body">
              Dag,<br><br>
              I run a small cleaning company. I want to have a simple website with some info about our services and a contact form. No webshop, nothing complicated. I also want to have 2 email addresses: info@ and anita@.<br><br>
              I heard hosting can be quite expensive. What's the cheapest option that works for me?<br><br>
              Anita
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> 1 website, no WordPress mentioned, no webshop. 2 email addresses. Budget-conscious customer. What's the minimum that covers everything she needs?</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'Matching Needs to Package',
        subtitle: 'The best package is the one that fits — not the most expensive.',
        content: `
          <div class="theory-box">
            <h4>✅ What Anita needs</h4>
            <p>1 website · No webshop · 2 email addresses</p>
            <p>This maps cleanly to <strong style="color:var(--amber)">Webhosting Start</strong>: supports up to 2 websites, includes 5 GB storage and email hosting (10 mailboxes included).</p>
            <p>All Cloud86 Webhosting plans fully support WordPress — so if Anita ends up building on WordPress, Start handles it without any issue.</p>
          </div>
          <div class="theory-box">
            <h4>📧 Email included in Webhosting</h4>
            <p>All Cloud86 Webhosting plans include email hosting — she doesn't need a separate Email Hosting package. 2 mailboxes fit easily within any Webhosting tier.</p>
            <p>Separate Email Hosting plans are only needed when a customer wants email without website hosting (or when they have more mailboxes than their Webhosting plan supports).</p>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💡</span>
            <div class="clue-text"><strong>Migration tip:</strong> Webhosting Start does not include free migration. Free migration is included from Medium onwards (max 5 sites). If Anita is moving from another provider and wants migration assistance, she might consider Medium — but if she's new, Start is the right call.</div>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Package Selection',
        subtitle: 'What does Anita actually need?',
        questions: [
          {
            q: 'Anita needs 1 website and 2 email addresses. She\'s building from scratch (no migration). What\'s the right recommendation?',
            options: [
              'Webhosting Medium — more room to grow',
              'Webhosting Start — 2 sites, includes email, no migration needed',
              'Email Hosting Start + Webhosting Start — separate packages for email and web',
              'Managed WordPress Start — best for small businesses'
            ],
            correct: 1,
            feedback: 'Correct. Webhosting Start covers exactly what she needs: up to 2 websites and email hosting included. Medium would work but adds cost without benefit. Separate email hosting is unnecessary since webhosting already includes it.'
          },
          {
            q: 'Anita calls back and says she wants to add a small webshop later (under 20 products). Does this change your recommendation now?',
            options: [
              'No change — WooCommerce runs fine on any Webhosting plan',
              'Yes — WooCommerce requires at minimum Webhosting Power, so she should upgrade',
              'Yes — she needs to switch to Managed WooCommerce Start',
              'No — WooCommerce isn\'t supported on any Cloud86 plan'
            ],
            correct: 1,
            feedback: 'Correct. WooCommerce does not work properly on Webhosting Start or Medium — Webhosting Power is the absolute minimum for WooCommerce on regular webhosting. That said, if a webshop is in her plans, Managed WooCommerce Start is worth discussing: it\'s purpose-built for WooCommerce and likely a better fit than forcing WooCommerce onto a general hosting plan.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It',
        subtitle: 'What changes when the customer needs to move from another host?',
        scenario: {
          title: 'Scenario: Same customer, moving from another host',
          text: 'Same situation as Anita — 1 website, 2 email addresses — but this time she\'s currently hosted at TransIP and wants to move everything to Cloud86 and asks if migration is included. What do you recommend now?',
          answer: `
            <strong>Two valid approaches:</strong><br><br>
            <strong>Option 1: Webhosting Start</strong> — Free migration is NOT included. She would need to migrate herself or pay for assisted migration. If she\'s comfortable doing it herself, Start is still fine.<br><br>
            <strong>Option 2: Webhosting Medium</strong> — Includes free migration for up to 5 sites. Given she has 1 site to migrate, this is the cleanest option if she doesn\'t want to do it herself. The price difference between Start and Medium is small.<br><br>
            <strong>Recommendation:</strong> Explain both options and let her choose based on whether she wants the migration handled for her. Don\'t force Medium — but make the value clear.
          `
        }
      }
    ]
  },

  3: {
    tag: 'Case #3',
    title: 'The Oversized Webshop',
    xp: 175,
    tier: 1,
    alexIntro: "A customer on the wrong package — their webshop is growing and performance is suffering. This is about recognizing the signals and recommending the right upgrade.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'An existing customer with a performance problem.',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00145</span>
              <span class="ticket-priority">🔴 Escalated</span>
            </div>
            <div class="ticket-from">From: <strong>Kevin de Groot</strong> — kevin@sport-de-groot.nl</div>
            <div class="ticket-body">
              Hi,<br><br>
              My webshop (sport-de-groot.nl) is very slow. Customers complain. I have around 800 products and I\'m on Webhosting Medium. I was told this would be enough. My developer also wants a test environment before pushing updates to the live shop, but I don\'t have that option in my current plan.<br><br>
              Can you help?<br><br>
              Kevin
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> 800-product WooCommerce webshop on Webhosting Medium. Performance issues. Needs staging. Two clear signals pointing to the wrong product line.</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'When Standard Hosting Isn\'t Enough',
        subtitle: 'Recognizing when a customer has outgrown their current package.',
        content: `
          <div class="theory-box">
            <h4>🛒 WooCommerce: Regular Hosting vs Managed WooCommerce</h4>
            <p>Regular Webhosting can technically run WooCommerce — but it\'s not optimized for it. As a shop grows (more products, more traffic, more orders), the difference becomes significant:</p>
            <p><strong style="color:var(--amber)">Webhosting</strong> — shared resources, no staging, generic caching</p>
            <p><strong style="color:var(--amber)">Managed WooCommerce</strong> — dedicated WooCommerce stack, staging environment, automatic updates, WooCommerce-specific performance optimizations, daily backups</p>
          </div>
          <div class="theory-box">
            <h4>📊 The Product Count Rule</h4>
            <p>For WooCommerce shops, use product count as a proxy for complexity:</p>
            <p><strong style="color:var(--red)">Under 50 products</strong> → Webhosting or Managed WooCommerce Start</p>
            <p><strong style="color:var(--amber)">50–500 products</strong> → Managed WooCommerce Start or Medium</p>
            <p><strong style="color:var(--green)">500+ products</strong> → Managed WooCommerce Medium or Power (VPS for very large shops)</p>
          </div>
          <div class="warn-box">
            <span class="clue-icon">⚠️</span>
            <div class="warn-text"><strong>Kevin has 800 products on Webhosting Medium.</strong> He\'s above the threshold where Managed WooCommerce Start (max 500 products) applies. He needs <strong style="color:var(--amber)">Managed WooCommerce Medium</strong> (up to 500 products... wait — Medium supports up to 500. Power is unlimited). With 800 products, he needs <strong style="color:var(--amber)">Managed WooCommerce Power</strong>.</div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💡</span>
            <div class="clue-text"><strong>Staging solves his developer's problem too:</strong> Managed WooCommerce Medium and Power include staging environments. His developer can push updates safely to staging before the live shop — exactly what they need.</div>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Package Selection',
        subtitle: 'Time to move Kevin to the right package.',
        questions: [
          {
            q: 'Kevin has 800 WooCommerce products and needs a staging environment. What\'s the correct product line?',
            options: ['Webhosting Power', 'Managed WordPress Power', 'Managed WooCommerce', 'Managed VPS'],
            correct: 2,
            feedback: 'Correct. 800 WooCommerce products with staging requirements = Managed WooCommerce. This product line is purpose-built for WooCommerce shops and includes the staging environment Kevin\'s developer needs.'
          },
          {
            q: 'Managed WooCommerce Start supports up to 50 products, Medium up to 500, Power is unlimited. Kevin has 800 products. Which tier?',
            options: ['Start', 'Medium', 'Power', 'He needs a VPS'],
            correct: 2,
            feedback: 'Correct. 800 products exceeds the Medium limit (500). He needs Managed WooCommerce Power, which supports unlimited products.'
          },
          {
            q: 'Kevin asks if he can stay on Webhosting Medium but just add more resources. What do you tell him?',
            options: [
              'Yes, he can add resource add-ons to Webhosting Medium',
              'Webhosting isn\'t optimized for WooCommerce at this scale. A move to Managed WooCommerce Power will solve performance and give him staging — both problems solved at once',
              'He should switch to a VPS instead',
              'Yes, upgrading to Webhosting Power will fix everything'
            ],
            correct: 1,
            feedback: 'Correct. Adding resources to Webhosting doesn\'t solve the architectural mismatch. Managed WooCommerce uses a purpose-built WooCommerce stack — this is the real fix. Address both the performance issue and the staging need in one recommendation.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It',
        subtitle: 'Recognize when a VPS is the right recommendation.',
        scenario: {
          title: 'Scenario: Very large shop, custom integrations',
          text: 'A customer has 3,000 WooCommerce products, a custom ERP integration, and expects 10,000 visitors per day during campaigns. Their developer wants root access to the server. What do you recommend?',
          answer: `
            <strong>Recommended: Managed VPS</strong><br><br>
            At this scale, even Managed WooCommerce Power may not be enough. The signals here are: very high traffic spikes, custom ERP integration (needs flexibility), and the developer needs root access — which shared hosting cannot provide.<br><br>
            <strong>Managed VPS</strong> gives dedicated resources, full root access, and scales with their needs. They can run WooCommerce on it with their custom integrations without resource contention from other customers.<br><br>
            This is the threshold where "managed" WooCommerce hosting transitions to infrastructure — a VPS is the right call.
          `
        }
      }
    ]
  },

  4: {
    tag: 'Case #4',
    title: 'Email at Cloud86, Website Elsewhere',
    xp: 150,
    tier: 1,
    alexIntro: "Split setup — website is hosted elsewhere, they only want Cloud86 email. This is a common scenario and there's a dedicated product for it.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'A customer who only needs email.',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00167</span>
              <span class="ticket-priority">🟡 Sales Intake</span>
            </div>
            <div class="ticket-from">From: <strong>Sandra Mulder</strong> — sandra@advocatenkantoormulder.nl</div>
            <div class="ticket-body">
              Goedemiddag,<br><br>
              We are a law firm with 8 employees. Our website is built and hosted by our web agency (they won\'t move it). We are looking for a professional email solution — we want @advocatenkantoormulder.nl addresses for all 8 staff members, plus one general info@ inbox.<br><br>
              We don\'t need hosting for a website, only email. Is that possible?<br><br>
              Sandra
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> No website hosting needed. 9 email addresses (8 staff + 1 general). This is a clean Email Hosting scenario.</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'Email Hosting: When to Use It',
        subtitle: 'Email Hosting is its own product — separate from website hosting.',
        content: `
          <div class="theory-box">
            <h4>📧 Email Hosting — The Dedicated Email Product</h4>
            <p>Cloud86\'s <strong style="color:var(--amber)">Email Hosting</strong> is a standalone product for customers who need email hosting without website hosting.</p>
            <p>Tiers: <strong style="color:var(--teal-bright)">Start</strong> (10 mailboxes, 5 GB), <strong style="color:var(--teal-bright)">Medium</strong> (50 mailboxes, 50 GB), <strong style="color:var(--teal-bright)">Power</strong> (unlimited mailboxes, 100 GB).</p>
          </div>
          <div class="theory-box">
            <h4>🔄 Email Hosting vs Email in Webhosting</h4>
            <p>Webhosting plans also include email. Use standalone <strong style="color:var(--amber)">Email Hosting</strong> when:</p>
            <p>• The customer has a website hosted elsewhere (they don\'t need web hosting from Cloud86)</p>
            <p>• The customer needs more mailboxes than their Webhosting plan supports</p>
            <p>Email Hosting plans are priced lower than Webhosting because they don\'t include server resources for websites.</p>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💡</span>
            <div class="clue-text"><strong>For Sandra:</strong> 9 mailboxes. Email Hosting Start supports 10 mailboxes — it technically fits, but Medium (50 mailboxes) gives far more room to grow and is the smarter choice for a business.</div>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Package Selection',
        subtitle: 'Sandra only needs email. What\'s the right product and tier?',
        questions: [
          {
            q: 'Sandra needs 9 email addresses and no website hosting. Which product is correct?',
            options: [
              'Webhosting Start — cheapest option, includes email',
              'Email Hosting — dedicated email product, no website resources needed',
              'Managed WordPress Start — includes email',
              'She should use Microsoft 365 instead'
            ],
            correct: 1,
            feedback: 'Correct. Email Hosting is the right product when a customer only needs email without website hosting. It\'s more cost-effective than Webhosting for this use case since she\'s not paying for web server resources she doesn\'t need.'
          },
          {
            q: 'Sandra needs 9 email addresses. Which Email Hosting tier do you recommend?',
            options: ['Start — just fits now, little room to grow', 'Medium — plenty of room to grow', 'Power — safest choice', 'Two Start packages'],
            correct: 1,
            feedback: 'Good choice. Medium (50 mailboxes) gives lots of room to grow for a 9-mailbox business. Start (10 mailboxes) technically fits now but leaves almost no headroom. Power is overkill for this size. For a growing business, Medium is the right recommendation.'
          },
          {
            q: 'Sandra asks: "Our web agency uses DNS. Do we need to do anything at Cloud86 for email to work?" What do you tell her?',
            options: [
              'No — Cloud86 email automatically works without DNS changes',
              'Yes — the MX records for her domain need to be updated to point to Cloud86\'s mail servers. Her web agency or domain registrar needs to make this change',
              'Yes — she needs to move her domain to Cloud86',
              'DNS is handled automatically during signup'
            ],
            correct: 1,
            feedback: 'Correct. Email delivery depends on MX records pointing to Cloud86\'s mail server. Since the website and domain are managed elsewhere, she (or her agency) needs to update the MX records at whoever manages her DNS. We can provide the exact records she needs.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It',
        subtitle: 'When the customer already has hosting but needs more mailboxes.',
        scenario: {
          title: 'Scenario: Existing Webhosting customer, outgrowing email',
          text: 'A customer is on Webhosting Medium (15-mailbox limit included). They\'ve grown to 18 employees and need 18 mailboxes. They don\'t want to change their website hosting. What do you recommend?',
          answer: `
            <strong>Option 1: Upgrade Webhosting to Power</strong><br>
            Webhosting Power includes unlimited mailboxes. If they\'re also close to the website or storage limits, this makes sense.<br><br>
            <strong>Option 2: Add Email Hosting Medium or Power</strong><br>
            If they want to keep their Webhosting Medium and add more mailboxes separately, they can add a standalone Email Hosting plan for the additional inboxes.<br><br>
            <strong>Best recommendation:</strong> Ask if they\'re hitting other limits on Webhosting Medium (storage, sites). If not, upgrading to Power just for email is overkill — adding a separate Email Hosting plan is more surgical and cost-effective.
          `
        }
      }
    ]
  },

  5: {
    tag: 'Case #5',
    title: 'The Regular Blog User',
    xp: 150,
    tier: 1,
    alexIntro: "A WordPress blog owner — straightforward on the surface, but there's a decision between Webhosting and Managed WordPress. Let's work through the factors.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'A familiar scenario — but which product is actually best?',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00189</span>
              <span class="ticket-priority">🟢 New Customer</span>
            </div>
            <div class="ticket-from">From: <strong>Tom van Dijk</strong> — tom@ondernemersblog.nl</div>
            <div class="ticket-body">
              Hi,<br><br>
              I run a WordPress blog about entrepreneurship. About 2,000 visitors per day. I post 3–4 articles per week and use a bunch of plugins. I\'ve been on another host for years and they\'re always slow and support is terrible.<br><br>
              I want to switch to Cloud86. What do you recommend for a WordPress blog?<br><br>
              Tom
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> 1 WordPress site, moderate traffic (2k/day), plugin-heavy, migrating from another host. He explicitly mentions WordPress — Managed WordPress is worth comparing to Webhosting.</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'Webhosting vs Managed WordPress',
        subtitle: 'The nuanced choice for WordPress users.',
        content: `
          <div class="theory-box">
            <h4>🆚 The Comparison</h4>
            <p>Both <strong style="color:var(--amber)">Webhosting</strong> and <strong style="color:var(--amber)">Managed WordPress</strong> can run WordPress. The difference is what\'s built in:</p>
            <p><strong>Webhosting Start</strong> — standard PHP/MySQL stack. WordPress runs fine. The customer manages updates manually. No staging.</p>
            <p><strong>Managed WordPress Start</strong> — same price bracket, but adds: automatic WordPress core and plugin updates, daily backups, WordPress-optimized caching, staging environment (from Medium), expert WordPress support.</p>
          </div>
          <div class="theory-box">
            <h4>📋 When to recommend Managed WordPress</h4>
            <p>Recommend Managed WordPress when the customer:</p>
            <p>• Uses WordPress specifically (not just "a website")</p>
            <p>• Values automatic updates and security patches</p>
            <p>• Has multiple plugins and wants WordPress-specific support</p>
            <p>• Doesn\'t want to manage their WordPress installation themselves</p>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💡</span>
            <div class="clue-text"><strong>For Tom:</strong> He\'s using WordPress with many plugins, has moderate traffic, and is moving from a host with poor support. Managed WordPress Start gives him the upgrade he\'s actually looking for — better WordPress performance, automatic updates, and WordPress-specific support. He also asked about migration: Webhosting Start has no free migration; Managed WordPress includes migration assistance.</div>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Package Selection',
        subtitle: 'One WordPress blog, migration included. What\'s best for Tom?',
        questions: [
          {
            q: 'Tom has 1 WordPress blog with plugins, moderate traffic, and is migrating. What\'s the better recommendation?',
            options: [
              'Webhosting Start — cheapest and works fine for WordPress',
              'Managed WordPress Start — same price, but adds auto-updates, WordPress support, and migration assistance',
              'Managed WordPress Medium — he needs staging for a blog',
              'Managed VPS — 2000 visitors/day requires a VPS'
            ],
            correct: 1,
            feedback: 'Correct. Managed WordPress Start is the right call. For a WordPress-specific use case, it adds significant value at the same price point: automatic updates (critical for plugin-heavy sites), WordPress-specific support, and migration help — exactly what Tom needs.'
          },
          {
            q: 'Tom asks: "My old host says my blog gets 2,000 visitors per day. Is that too much for Start?" What do you say?',
            options: [
              '2,000/day is fine for Managed WordPress Start for a blog',
              '2,000/day requires Managed WordPress Power minimum',
              '2,000/day requires a VPS',
              '2,000/day means he needs Webhosting Power'
            ],
            correct: 0,
            feedback: 'Correct. 2,000 visitors per day is very manageable for Managed WordPress Start. That\'s only ~1-2 visitors per minute on average. Traffic spikes during viral posts are more relevant than daily averages — unless he has very specific performance requirements, Start is appropriate.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It',
        subtitle: 'The blog that needs no WordPress features.',
        scenario: {
          title: 'Scenario: Simple website, no WordPress',
          text: 'Same profile as Tom, but the customer says: "I just have a simple HTML site I built myself — no WordPress, no CMS." Same traffic, same migration need. What do you recommend now?',
          answer: `
            <strong>Recommended: Webhosting Start</strong> (or Medium if migration is included)<br><br>
            Without WordPress, there\'s no benefit to Managed WordPress. The WordPress-specific features (auto-updates, WordPress support) aren\'t relevant for a plain HTML site.<br><br>
            <strong>Migration consideration:</strong> Webhosting Start has no free migration. If the customer wants migration help, Webhosting Medium includes it. For a simple HTML site, migration is trivial (just file upload), so Start is likely fine and they can migrate themselves.<br><br>
            <strong>Key lesson:</strong> Always match the product to the actual technology stack, not just the traffic profile.
          `
        }
      }
    ]
  },

  6: {
    tag: 'Case #6',
    title: 'The Web Agency',
    xp: 200,
    tier: 2,
    alexIntro: "A web agency managing client sites. This is a classic multi-site scenario with a twist — they need flexibility to add new clients without upgrading constantly.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'An agency setup — multiple sites, different owners.',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00214</span>
              <span class="ticket-priority">🟡 Sales Intake</span>
            </div>
            <div class="ticket-from">From: <strong>Joris Hartman</strong> — joris@hartmanwebstudio.nl</div>
            <div class="ticket-body">
              Hallo,<br><br>
              We are a web agency. We currently manage 15 client websites — all WordPress. We\'d like to consolidate them under one Cloud86 account for easier management. Some clients have their own domain + email with us too.<br><br>
              We also want to be able to add new clients without having to upgrade our plan every time. What setup do you recommend?<br><br>
              Joris
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> 15 WordPress client sites today, more coming. Needs scalability. Email involved for some clients. This is a Power-tier scenario.</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'Agency Hosting: Power is the Only Option',
        subtitle: 'Understanding why the Power tier exists.',
        content: `
          <div class="theory-box">
            <h4>🏢 The Agency Use Case</h4>
            <p>Agencies have a fundamentally different need than individual site owners: they need to add and remove sites without package restructuring.</p>
            <p><strong style="color:var(--amber)">Webhosting Start</strong> — 2 sites. Not relevant for agencies.</p>
            <p><strong style="color:var(--amber)">Webhosting Medium</strong> — up to 5 sites. Agencies outgrow this quickly.</p>
            <p><strong style="color:var(--amber)">Webhosting Power / Managed WordPress Power</strong> — <strong style="color:var(--green)">unlimited sites</strong>. This is the agency tier.</p>
          </div>
          <div class="theory-box">
            <h4>📊 Why Power is more cost-effective for agencies</h4>
            <p>An agency with 15 sites would need 5 separate Medium packages to host all sites within limits. One Power package costs less and handles them all — plus every future client site.</p>
            <p>For a WordPress agency: <strong style="color:var(--amber)">Managed WordPress Power</strong> — unlimited sites, staging environments for each client, auto-updates across all sites, and one support contact for all issues.</p>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💡</span>
            <div class="clue-text"><strong>Email consideration:</strong> Some clients have email too. If client email is managed on the same server, the Webhosting/Managed WordPress Power plan includes unlimited mailboxes. If clients want separate email management, Email Hosting is an option — but for agency-managed setups, keeping it all on one plan is simpler.</div>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Package Selection',
        subtitle: '15 WordPress sites today, more coming. What\'s the answer?',
        questions: [
          {
            q: 'Joris manages 15 WordPress client sites with plans to add more. What\'s the correct product and tier?',
            options: [
              'Webhosting Medium × 3 packages (5 sites each)',
              'Managed WordPress Power — unlimited WordPress sites, one package',
              'Managed WordPress Medium × 5 packages',
              'Managed VPS — agencies need dedicated servers'
            ],
            correct: 1,
            feedback: 'Correct. Managed WordPress Power with unlimited sites is purpose-built for this scenario. One package, unlimited client sites, staging for each, auto-updates — and lower total cost than managing multiple Medium packages.'
          },
          {
            q: 'Joris asks: "Can I host multiple client domains under one account?" What do you say?',
            options: [
              'No — each client needs their own Cloud86 account',
              'Yes — Power tier plans support unlimited domains and websites under one account',
              'Yes, but only for websites on the same TLD (.nl only)',
              'Only if all clients have the same hosting plan'
            ],
            correct: 1,
            feedback: 'Correct. Power tier plans support unlimited domains. Joris can manage all client domains and websites through a single Cloud86 account, which is exactly the agency workflow Cloud86 supports.'
          },
          {
            q: 'A client of Joris has a large WooCommerce shop with 300 products. Can this be hosted under the same Managed WordPress Power plan?',
            options: [
              'No — WooCommerce shops need a separate Managed WooCommerce plan',
              'Yes — Managed WordPress Power supports WooCommerce, and 300 products is within a typical WordPress hosting setup',
              'Only if the shop is on a subdomain',
              'No — WooCommerce requires a VPS'
            ],
            correct: 1,
            feedback: 'Correct. Managed WordPress fully supports WooCommerce. For a 300-product shop under a managed WordPress environment, this works fine. If the shop were very large (1000+ products) or high-traffic, Managed WooCommerce Power would be more appropriate — but 300 products on a well-managed WordPress plan is reasonable.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It',
        subtitle: 'A smaller agency — does the math still work out to Power?',
        scenario: {
          title: 'Scenario: Freelancer with 4 client sites',
          text: 'A freelance web developer manages 4 client WordPress sites. They\'re considering Managed WordPress Medium (5 sites) × 1 package vs. one Managed WordPress Power (10 sites). What do you recommend, and why?',
          answer: `
            <strong>Recommended: Managed WordPress Power (single package)</strong><br><br>
            Even with only 4 sites today, the Power plan is almost always the better choice for a developer managing client sites because:<br><br>
            1. <strong>Cost</strong> — 2× Medium packages likely costs more than 1× Power<br>
            2. <strong>Scalability</strong> — adding a 5th or 6th client requires another Medium or an upgrade; Power never requires this<br>
            3. <strong>Management</strong> — one dashboard, one support contract, one invoice<br>
            4. <strong>Staging</strong> — Power includes staging for all sites, Medium includes it too but you\'re managing 2 separate accounts<br><br>
            The breakeven is typically 3–4 sites. At 4 sites, Power is already the smarter choice for anyone with growth plans.
          `
        }
      }
    ]
  },

  7: {
    tag: 'Case #7',
    title: 'Black Friday Traffic Spike',
    xp: 200,
    tier: 2,
    alexIntro: "A webshop that runs fine most of the year but crashes every Black Friday. Traffic spikes are a VPS conversation — not just a bigger shared hosting plan.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'Performance under pressure — a specific problem with a specific solution.',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00237</span>
              <span class="ticket-priority">🔴 Urgent</span>
            </div>
            <div class="ticket-from">From: <strong>Roos Vermeer</strong> — roos@fashionbyroos.nl</div>
            <div class="ticket-body">
              Hi,<br><br>
              My WooCommerce shop (fashionbyroos.nl) is on Managed WooCommerce Medium and runs perfectly fine 350 days of the year. But during Black Friday and our seasonal sales, we get 10–15× our normal traffic and the site goes completely down for hours. We lose thousands of euros each time.<br><br>
              My developer says I need a VPS. Is that true? What exactly do I need?<br><br>
              Roos
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> Managed WooCommerce Medium works fine normally. Problem is extreme traffic spikes (10-15×). Developer recommends VPS. This is a traffic engineering conversation.</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'When Shared Hosting Hits Its Ceiling',
        subtitle: 'Understanding the architectural difference between shared hosting and VPS.',
        content: `
          <div class="theory-box">
            <h4>🏘 Shared Hosting vs VPS</h4>
            <p>On <strong style="color:var(--amber)">shared hosting</strong> (including Managed WooCommerce), multiple customers share the same server resources. During normal traffic, this works great. But during a spike, you\'re competing for CPU and RAM with other customers on the same server.</p>
            <p>A <strong style="color:var(--amber)">Managed VPS</strong> gives Roos <em>dedicated</em> resources — her site gets a guaranteed allocation of CPU and RAM that doesn\'t fluctuate based on what other customers are doing.</p>
          </div>
          <div class="theory-box">
            <h4>📈 The Traffic Spike Signal</h4>
            <p>Key indicators that a customer needs a VPS:</p>
            <p>• Predictable traffic spikes (Black Friday, seasonal sales, launches)</p>
            <p>• Site crashes under load even when it normally runs fine</p>
            <p>• Developer requests root access or custom server configuration</p>
            <p>• Real financial impact when the site goes down during peak times</p>
          </div>
          <div class="theory-box">
            <h4>🖥 Managed VPS Tiers</h4>
            <p><strong style="color:var(--teal-bright)">Start</strong> — 3 vCPU, 6 GB RAM, 50 GB SSD</p>
            <p><strong style="color:var(--teal-bright)">Medium</strong> — 6 vCPU, 12 GB RAM, 100 GB SSD</p>
            <p><strong style="color:var(--teal-bright)">Power</strong> — 8 vCPU, 24 GB RAM, 200 GB SSD</p>
            <p>For a WooCommerce shop with 10-15× traffic spikes: <strong style="color:var(--amber)">Managed VPS Medium</strong> is a solid starting point. VPS Start may not have enough RAM for WooCommerce under load.</p>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Package Selection',
        subtitle: 'Help Roos survive Black Friday.',
        questions: [
          {
            q: 'Roos\'s shop works fine 350 days/year but crashes at 10-15× traffic spikes. Her developer says VPS. Is the developer right?',
            options: [
              'No — she should upgrade to Managed WooCommerce Power instead',
              'Yes — dedicated VPS resources are the right solution for predictable traffic spikes that overwhelm shared hosting',
              'No — she should use a CDN instead',
              'No — the problem is her code, not the hosting'
            ],
            correct: 1,
            feedback: 'Correct. The developer is right. Shared hosting (even Power tier) can\'t guarantee dedicated resources during spikes because resources are shared with other customers. A Managed VPS provides dedicated CPU and RAM — her spikes don\'t compete with anyone else\'s traffic.'
          },
          {
            q: 'Which Managed VPS tier would you start with for a WooCommerce shop with 10-15× traffic spikes?',
            options: [
              'VPS Start — cheapest option, can always upgrade',
              'VPS Medium — solid baseline for WooCommerce under load',
              'VPS Power — never compromise on VPS size',
              'She needs a dedicated server, not a VPS'
            ],
            correct: 1,
            feedback: 'Correct. VPS Medium (6 vCPU, 12 GB RAM) is the right starting point. WooCommerce is resource-intensive, and VPS Start (3 vCPU, 6 GB) might not handle large traffic spikes with complex product catalogs and order processing. Medium provides meaningful headroom for spikes.'
          },
          {
            q: 'Roos asks: "Can I go back to Managed WooCommerce after Black Friday to save money?" What do you say?',
            options: [
              'Yes — she can switch plans seasonally',
              'Explain that switching back and forth isn\'t practical (migration cost/effort), but the VPS investment is justified by the revenue protection during key sales periods',
              'No — once on VPS, there\'s no downgrade path',
              'Yes — we offer a seasonal hosting plan for this'
            ],
            correct: 1,
            feedback: 'Correct. While technically possible, plan-switching involves migration work each time. The better framing: a VPS is not just a Black Friday solution — it\'s a permanent upgrade that also improves daily performance. The revenue protection during one Black Friday likely justifies the annual cost difference.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It',
        subtitle: 'When VPS is the wrong answer.',
        scenario: {
          title: 'Scenario: Traffic spike, but different cause',
          text: 'A customer complains about slow loading times during peak hours. Their shop is on Managed WooCommerce Start. Their developer says "you need a VPS." When you investigate, you find the shop has 40 products and gets 200 visitors/day on average. What do you recommend?',
          answer: `
            <strong>Recommended: Managed WooCommerce Medium — NOT a VPS</strong><br><br>
            The developer\'s VPS recommendation is overkill here. 200 visitors/day with 40 products is well within shared hosting capabilities. The problem is more likely that the shop is on <strong>Start</strong> which is the entry-level tier.<br><br>
            <strong>Diagnosis:</strong> Managed WooCommerce Start is optimized for very small shops. Upgrading to Medium typically resolves performance issues at this scale by providing better resource allocation within the shared environment.<br><br>
            <strong>VPS is appropriate when:</strong> traffic is in the thousands/day, the shop is large (500+ products), or there are custom integrations requiring server control. For a 40-product shop, shared hosting is the right architecture — just a better tier.
          `
        }
      }
    ]
  },

  8: {
    tag: 'Case #8',
    title: 'The AI Website Builder Question',
    xp: 175,
    tier: 2,
    alexIntro: "A customer asks about the AI Website Builder. This is about knowing what the product is, what it includes, and when to recommend it vs traditional hosting.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'A question about a specific Cloud86 product.',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00251</span>
              <span class="ticket-priority">🟡 Sales Intake</span>
            </div>
            <div class="ticket-from">From: <strong>Nadia Osman</strong> — nadia@nadiafotografie.nl</div>
            <div class="ticket-body">
              Hallo,<br><br>
              I\'m a freelance photographer. I want a professional website to show my portfolio but I\'m not technical at all. Someone told me Cloud86 has an AI Website Builder? What is that, and is it right for me?<br><br>
              I also need a contact form and want to be findable on Google. Budget is limited.<br><br>
              Nadia
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> Non-technical user, portfolio site, contact form, SEO, budget-conscious. AI Website Builder is relevant here — but what does it include and is it the right fit?</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'AI Website Builder: What It Is and When to Use It',
        subtitle: 'A different product category — builder + hosting combined.',
        content: `
          <div class="theory-box">
            <h4>🤖 AI Website Builder — The Product</h4>
            <p>Cloud86\'s <strong style="color:var(--amber)">AI Website Builder</strong> is a hosted website builder product — similar in concept to Wix or Squarespace, but Cloud86-hosted. It uses AI to help generate the initial site layout and content based on the customer\'s description.</p>
            <p>Key features: drag-and-drop editor, AI content generation, SEO tools, contact forms, SSL included, Dutch-language support team.</p>
            <p>It\'s a <strong style="color:var(--teal-bright)">self-contained product</strong> — it includes both the builder and the hosting. It does NOT require a separate Webhosting plan.</p>
          </div>
          <div class="theory-box">
            <h4>✅ Right fit for the AI Website Builder</h4>
            <p>Recommend it when: non-technical user, simple presentation site, no complex CMS needs, no specific WordPress requirements, budget-focused, wants to be up and running quickly.</p>
            <p><strong style="color:var(--red)">Not suitable when:</strong> the customer needs WordPress-specific plugins, custom code, a webshop with many products (WooCommerce), or wants full hosting control.</p>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💡</span>
            <div class="clue-text"><strong>For Nadia:</strong> Portfolio site, contact form, SEO, non-technical, budget-conscious. This is exactly the AI Website Builder use case. She doesn\'t need WordPress or a full hosting plan — she needs something she can manage herself without technical knowledge.</div>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Product Selection',
        subtitle: 'Is the AI Website Builder the right call for Nadia?',
        questions: [
          {
            q: 'Nadia is non-technical, wants a portfolio with contact form, SEO, and limited budget. What\'s the best recommendation?',
            options: [
              'Webhosting Start + WordPress — most flexible option',
              'AI Website Builder — purpose-built for non-technical users, includes everything she needs',
              'Managed WordPress Start — best for any website',
              'AI Website Builder is only for businesses, not freelancers'
            ],
            correct: 1,
            feedback: 'Correct. The AI Website Builder is perfect for Nadia: non-technical, portfolio focus, contact form support, SEO tools built in, and she can manage it herself. No WordPress expertise required.'
          },
          {
            q: 'Nadia asks: "Can I add an online shop later to sell photo prints?" How do you answer?',
            options: [
              'Yes, the AI Website Builder supports full WooCommerce integration',
              'The AI Website Builder has basic e-commerce capabilities for simple product listings, but for a proper webshop she\'d likely need to migrate to Managed WooCommerce later',
              'No, the AI Website Builder can never include e-commerce',
              'Yes, she can add unlimited products directly in the builder'
            ],
            correct: 1,
            feedback: 'Correct. Be transparent about limitations. The AI Website Builder supports basic sales, but a growing WooCommerce shop would eventually need proper WooCommerce hosting. Set the right expectations upfront — if she plans to sell many products, starting with Managed WooCommerce Start might be better long-term despite the higher initial complexity.'
          },
          {
            q: 'Another customer is a developer who wants full control over their WordPress site, custom plugins, and SSH access. Should you recommend the AI Website Builder?',
            options: [
              'Yes — it\'s the easiest option for any website',
              'No — the AI Website Builder is a managed builder product; developers need Managed WordPress or a VPS where they have technical access',
              'Yes — developers can use the AI builder and export code',
              'Only if they don\'t need SSH access'
            ],
            correct: 1,
            feedback: 'Correct. The AI Website Builder is for non-technical users who want simplicity. A developer who needs SSH, custom plugins, and technical control needs Managed WordPress (which provides a full WordPress environment) or a Managed VPS. Never recommend the builder to someone who needs server-level access.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It',
        subtitle: 'A harder call — builder or WordPress?',
        scenario: {
          title: 'Scenario: The in-between customer',
          text: 'A restaurant owner wants a website: menu, photos, reservation form. He\'s somewhat technical — he used WordPress once years ago but found it overwhelming. He doesn\'t want to spend much. What\'s your recommendation, and how do you frame the tradeoffs?',
          answer: `
            <strong>Two valid paths — present both and let him choose:</strong><br><br>
            <strong>Option 1: AI Website Builder</strong><br>
            Easier to manage, no WordPress complexity, includes reservation forms. Limitations: less flexibility, platform-locked, limited customization. Better for: someone who wants it done and doesn\'t want to think about it.<br><br>
            <strong>Option 2: Managed WordPress Start</strong><br>
            More flexibility, thousands of plugins (reservation plugins, menu plugins), future-proof. But: requires some WordPress familiarity. Given his past WordPress experience, this might not be as scary as he thinks.<br><br>
            <strong>Recommendation framing:</strong> "If you want to set it up once and never think about it, the AI Builder is easier. If you want more control and flexibility, WordPress with managed hosting means updates happen automatically — it\'s much easier than the WordPress you tried before."<br><br>
            Let the customer decide based on how involved they want to be.
          `
        }
      }
    ]
  },

  9: {
    tag: 'Case #9',
    title: 'The High-Output Blog',
    xp: 200,
    tier: 2,
    alexIntro: "A content-heavy site with daily updates and growing traffic. This is about identifying when Managed WordPress is the right choice AND which tier.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'A serious WordPress operation — what does it actually need?',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00278</span>
              <span class="ticket-priority">🟡 Sales Intake</span>
            </div>
            <div class="ticket-from">From: <strong>Lars Hendriks</strong> — lars@dagelijksnieuws.nl</div>
            <div class="ticket-body">
              Hello,<br><br>
              I run a news website (WordPress) that publishes 5–10 articles per day. We have 3 editors working simultaneously on the site. Traffic varies: usually 5,000 visitors/day but peaks at 25,000 on big news days.<br><br>
              We\'ve had issues where the site slows down during big news events, and sometimes updates break things. We need the ability to test before publishing. And we need good backup so we can restore quickly if something goes wrong.<br><br>
              Lars
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> WordPress news site, 3 editors, variable traffic (5k–25k/day), staging required, backups critical. Multiple signals — let\'s map them to the right package.</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'High-Demand WordPress: Reading the Signals',
        subtitle: 'When a WordPress site needs more than basic managed hosting.',
        content: `
          <div class="theory-box">
            <h4>📊 Signal Mapping</h4>
            <p><strong style="color:var(--amber)">Multiple simultaneous editors</strong> → Managed WordPress (collaborative-friendly, not shared basic hosting)</p>
            <p><strong style="color:var(--amber)">Staging required for testing</strong> → Managed WordPress Medium or Power (staging is included from Medium upwards)</p>
            <p><strong style="color:var(--amber)">Traffic peaks to 25k/day</strong> → Needs solid caching, possibly VPS depending on peak intensity</p>
            <p><strong style="color:var(--amber)">Critical backup/restore</strong> → Managed WordPress includes daily backups; critical news site may want more frequent</p>
          </div>
          <div class="theory-box">
            <h4>🔍 The Staging Requirement</h4>
            <p>Lars explicitly needs staging. This rules out Managed WordPress Start (no staging). He needs at minimum <strong style="color:var(--amber)">Managed WordPress Medium</strong>.</p>
            <p>Medium vs Power: Lars has 1 production site (dagelijksnieuws.nl). Medium supports up to 5 sites — so Medium is more than sufficient for site count. But the traffic peaks (25k/day) may be a concern.</p>
          </div>
          <div class="theory-box">
            <h4>🖥 When Managed WordPress isn\'t Enough</h4>
            <p>For sites regularly hitting 20k+ visitors/day with multiple concurrent editors, Managed WordPress Power or a <strong style="color:var(--amber)">Managed VPS</strong> becomes relevant. The distinction: shared hosting (even optimized) competes for resources; a VPS guarantees them.</p>
            <p>For Lars: start with Managed WordPress Medium (if 5k/day baseline is normal). If 25k spikes happen regularly and cause problems even after moving to Managed WP, escalate to Power or VPS.</p>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Package Selection',
        subtitle: 'Map Lars\'s requirements to the right package.',
        questions: [
          {
            q: 'Lars needs staging, multiple editors, daily backups, and handles 5-25k visitors/day. Which product line?',
            options: ['Webhosting Power', 'Managed WordPress', 'Managed WooCommerce', 'AI Website Builder'],
            correct: 1,
            feedback: 'Correct. Managed WordPress is purpose-built for exactly this: editorial teams, staging environments, auto-updates, and WordPress-optimized performance. Webhosting Power works but lacks the WordPress-specific tooling.'
          },
          {
            q: 'Managed WordPress Start has no staging. Medium supports staging and up to 5 sites. Lars has 1 site and needs staging. What\'s the minimum tier?',
            options: [
              'Start — staging can be added as an addon',
              'Medium — minimum tier that includes staging',
              'Power — always go Power for news sites',
              'He needs a VPS for staging'
            ],
            correct: 1,
            feedback: 'Correct. Staging is included from Medium onwards. Start doesn\'t include staging, so it\'s not an option given Lars\'s requirements. Medium is the minimum, and it easily supports 1 to 5 sites.'
          },
          {
            q: 'Lars says peaks of 25,000 visitors/day sometimes still cause slowdowns on his current host. Should you recommend VPS over Managed WordPress?',
            options: [
              'Yes — 25k/day always requires a VPS',
              'Start with Managed WordPress Medium first — it\'s significantly better than basic hosting. If performance issues persist at peak, escalate to VPS',
              'No — VPS is never needed for blogs',
              'Yes — news sites always need VPS due to unpredictable traffic'
            ],
            correct: 1,
            feedback: 'Correct. The staged approach is right. His current host is likely basic shared hosting. Managed WordPress Medium with WordPress-optimized caching will handle 25k/day for a news blog in most cases. A VPS is the escalation path if Medium doesn\'t solve it — not the first recommendation.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It',
        subtitle: 'When the numbers clearly point to VPS.',
        scenario: {
          title: 'Scenario: National news site',
          text: 'A national news outlet (not a blog) contacts you. They have 200,000+ visitors/day, 15 journalists, a development team that needs server access, and custom caching configurations. What do you recommend?',
          answer: `
            <strong>Recommended: Managed VPS (Medium or Power)</strong><br><br>
            At 200,000 visitors/day with a development team needing server access and custom configurations, this is definitively a VPS scenario:<br><br>
            <strong>Why VPS, not Managed WordPress Power?</strong><br>
            1. 200k/day is in territory where dedicated resources matter significantly<br>
            2. Custom caching configurations require server-level access<br>
            3. Development team needs SSH and server control<br>
            4. The scale and custom requirements exceed what managed WordPress hosting is designed for<br><br>
            <strong>VPS tier:</strong> Start with Managed VPS Power (8 vCPU, 24 GB RAM) as a baseline. A national news site should also discuss load balancing and CDN solutions at this scale.
          `
        }
      }
    ]
  },

  10: {
    tag: 'Case #10',
    title: 'Leaving Big Tech for Email',
    xp: 225,
    tier: 2,
    alexIntro: "A customer leaving Microsoft 365 or Google Workspace for Cloud86 email. This is about migration complexity and setting the right expectations.",
    steps: [
      {
        id: 'ticket',
        type: 'read',
        title: 'The Customer Request',
        subtitle: 'A migration request — more complex than it looks.',
        content: `
          <div class="ticket">
            <div class="ticket-header">
              <span class="ticket-id">#REQ-00299</span>
              <span class="ticket-priority">🟡 Sales Intake</span>
            </div>
            <div class="ticket-from">From: <strong>Iris de Boer</strong> — iris@consultancy-deboer.nl</div>
            <div class="ticket-body">
              Goedemiddag,<br><br>
              We\'re a 12-person consultancy currently using Microsoft 365 for email (Exchange Online). We want to move away from Microsoft because of the price increases and switch to Cloud86 email.<br><br>
              We have years of email history we want to keep. Can Cloud86 migrate our mailboxes? What package do we need, and are there any risks we should know about?<br><br>
              Iris
            </div>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💼</span>
            <div class="clue-text"><strong>Advisor note:</strong> 12 mailboxes, migrating from Microsoft 365 Exchange Online, years of email history to preserve, no website hosting needed. Package selection AND honest risk discussion required.</div>
          </div>
        `
      },
      {
        id: 'theory',
        type: 'read',
        title: 'Email Migration: What to Know Before You Recommend',
        subtitle: 'Setting expectations is part of a good package recommendation.',
        content: `
          <div class="theory-box">
            <h4>📦 The Package Decision</h4>
            <p>Iris needs email hosting for 12 mailboxes, no website. That\'s <strong style="color:var(--amber)">Email Hosting Medium</strong> (50 mailboxes, 50 GB) — fits with plenty of room to grow.</p>
            <p>Email Hosting Power (unlimited, 100 GB) would also work and gives more storage — relevant if some mailboxes have years of accumulated email.</p>
          </div>
          <div class="theory-box">
            <h4>⚠️ Migration Reality: Email History</h4>
            <p>Migrating email history from Microsoft 365 (Exchange) to Cloud86 (IMAP/POP3-based) is technically possible but has important caveats:</p>
            <p><strong style="color:var(--amber)">What can be migrated:</strong> Email folders and messages can be moved using IMAP migration tools (e.g., imapsync, Outlook\'s export/import, or third-party migration services).</p>
            <p><strong style="color:var(--amber)">What\'s more complex:</strong> Calendar data, contacts stored in Microsoft\'s format, shared calendars, and Teams integrations don\'t transfer cleanly to standard IMAP hosting.</p>
            <p><strong style="color:var(--red)">Important limitation:</strong> Cloud86 email is IMAP-based (Plesk/Roundcube). It doesn\'t include Microsoft-style collaboration features (shared calendars, Teams, SharePoint). If the customer relies on these, they\'re losing significant functionality.</p>
          </div>
          <div class="clue-box">
            <span class="clue-icon">💡</span>
            <div class="clue-text"><strong>Honest advisor approach:</strong> Recommend the right package AND flag the functionality difference. If Iris\'s team uses shared calendars or Teams daily, moving to standard email hosting is a significant step down in collaboration capability. That\'s worth discussing before the sale — a customer who migrates and then realizes they\'ve lost key features will not be happy.</div>
          </div>
        `
      },
      {
        id: 'quiz',
        type: 'quiz',
        title: 'Package Selection + Advisor Responsibility',
        subtitle: 'What does Iris need — and what should you tell her?',
        questions: [
          {
            q: 'Iris needs 12 mailboxes, no website hosting, migrating from Microsoft 365. Which product and tier?',
            options: [
              'Webhosting Medium — includes email and is more flexible',
              'Email Hosting Medium — no website resources needed',
              'Email Hosting Start — might just fit for now',
              'Managed VPS — for Microsoft 365 compatibility'
            ],
            correct: 1,
            feedback: 'Correct. Email Hosting Medium (50 mailboxes) is the right fit for 12 mailboxes with no website hosting. Start (10 mailboxes) technically fits but is very tight — a poor recommendation for a business. Webhosting Medium works but includes web server resources she doesn\'t need and costs more.'
          },
          {
            q: 'Iris asks: "Can we keep all our email history from Microsoft 365?" What\'s the most accurate answer?',
            options: [
              'Yes, Cloud86 migrates all email including calendar and contacts automatically',
              'Email messages can be migrated via IMAP tools, but Microsoft-specific features like shared calendars won\'t transfer to standard email hosting',
              'No — all existing email will be lost during migration',
              'Yes, Cloud86 has a Microsoft 365 migration tool that preserves everything'
            ],
            correct: 1,
            feedback: 'Correct. Be accurate: email messages (inbox, folders, sent items) can be migrated using IMAP migration. But Microsoft-specific collaboration features (shared calendars, contacts in Exchange format, Teams) don\'t exist in standard IMAP email hosting. Setting the right expectation before migration prevents post-migration complaints.'
          },
          {
            q: 'Iris\'s team uses shared calendars in Microsoft 365 daily. You\'re about to recommend Email Hosting Medium. What should you do?',
            options: [
              'Proceed — it\'s not your job to discuss features they\'re losing',
              'Flag the shared calendar limitation clearly before the sale — if this is critical functionality, Cloud86 email may not be the right fit and she should be aware',
              'Recommend Managed WordPress Power instead',
              'Tell her shared calendars are available in all Cloud86 email plans'
            ],
            correct: 1,
            feedback: 'Correct. A good advisor flags this. If shared calendars are a daily workflow tool, transitioning to IMAP-only email will cause disruption. Better to be transparent now — she might reconsider the migration, find a workaround (e.g., using a separate calendar tool), or proceed knowing the limitation. A customer who discovers this after migrating will blame Cloud86.'
          }
        ]
      },
      {
        id: 'scenario',
        type: 'scenario',
        title: 'Apply It — The Full Scenario',
        subtitle: 'Put it all together.',
        scenario: {
          title: 'Complete Intake: Final Exam Scenario',
          text: 'A 20-person marketing agency contacts you. They have: 3 client WordPress websites (including one WooCommerce shop with 150 products), 20 email addresses for staff, and they want to host everything with Cloud86. They\'re currently with a competitor and want migration. What do you recommend, and why?',
          answer: `
            <strong>Recommended: Managed WooCommerce Medium</strong><br><br>
            Here\'s the reasoning:<br><br>
            <strong>Why Managed WooCommerce, not Managed WordPress?</strong> One of the 3 sites is a WooCommerce shop (150 products). The presence of WooCommerce makes Managed WooCommerce the more appropriate product line — it\'s optimized for WooCommerce specifically.<br><br>
            <strong>Why Medium?</strong> 3 websites fit comfortably within Medium (up to 5 sites). With a WooCommerce shop and 2 other WordPress sites, they have room to grow. They\'d only need Power if they exceed 5 sites.<br><br>
            <strong>Email:</strong> All Webhosting/Managed plans include email. 20 staff mailboxes fit within Medium\'s included email capacity. No separate Email Hosting plan needed.<br><br>
            <strong>Migration:</strong> Free migration is included from Medium onwards (up to 5 sites) — all 3 sites qualify.<br><br>
            <strong>Alternative to consider:</strong> If they expect to add more client sites (this is an agency after all), Managed WooCommerce Power might be the smarter long-term investment. Ask about their growth plans before finalizing.
          `
        }
      }
    ]
  }
};

// =============================================
// STATE HELPERS
// =============================================

function addXP(amount, save = true) {
  STATE.xp += amount;
  document.getElementById('xpBadge').textContent = `${STATE.xp} XP`;
  document.getElementById('totalXP').textContent = STATE.xp;
  showXPPop(`+${amount} XP`);
  if (save) saveProgress();
}

function showXPPop(text) {
  const pop = document.getElementById('xpPopup');
  pop.textContent = text;
  pop.classList.add('show');
  setTimeout(() => pop.classList.remove('show'), 2000);
}

function updateProgress(save = true) {
  const done = STATE.casesCompleted.size;
  const pct = Math.round((done / 10) * 100);
  document.getElementById('progressFill').style.width = `${pct}%`;
  document.getElementById('progressLabel').textContent = `${pct}%`;
  document.getElementById('casesCompleted').textContent = done;
  if (save) saveProgress();
}

function setAlexSpeech(text) {
  document.getElementById('alexSpeech').textContent = text;
}

function showNavButtons() {
  document.getElementById('prevStep').style.display = '';
  document.getElementById('nextStep').style.display = '';
}

// =============================================
// NAVIGATION
// =============================================

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
    v.classList.add('hidden');
  });
  const target = document.getElementById(`view-${viewId}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navEl = document.getElementById(`nav-${viewId}`);
  if (navEl) navEl.classList.add('active');
  STATE.currentView = viewId;
  saveProgress();
}

function openCase(caseNum, stepOverride = 0) {
  const c = CASES[caseNum];
  if (!c) return;

  STATE.currentCase = caseNum;
  STATE.currentStep = stepOverride;

  document.getElementById('caseTag').textContent = c.tag;
  document.getElementById('caseTitle').textContent = c.title;
  document.getElementById('caseXP').textContent = `+${c.xp} XP`;

  setAlexSpeech(c.alexIntro);
  showNavButtons();

  document.querySelectorAll('.view').forEach(v => { v.classList.remove('active'); v.classList.add('hidden'); });
  document.getElementById('view-case').classList.remove('hidden');
  document.getElementById('view-case').classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const activeNav = document.getElementById(`nav-${caseNum}`);
  if (activeNav) activeNav.classList.add('active');

  STATE.currentView = 'case';
  renderStep();
  saveProgress();
}

function renderStep() {
  const c = CASES[STATE.currentCase];
  const steps = c.steps;
  const step = steps[STATE.currentStep];
  const total = steps.length;

  let pills = '';
  for (let i = 0; i < total; i++) {
    let cls = i < STATE.currentStep ? 'done' : (i === STATE.currentStep ? 'active' : '');
    pills += `<div class="step-pill ${cls}"></div>`;
  }
  document.getElementById('stepProgress').innerHTML = pills;

  let dots = '';
  for (let i = 0; i < total; i++) {
    let cls = i < STATE.currentStep ? 'done' : (i === STATE.currentStep ? 'active' : '');
    dots += `<div class="step-dot ${cls}"></div>`;
  }
  document.getElementById('stepDots').innerHTML = dots;

  showNavButtons();
  const prevBtn = document.getElementById('prevStep');
  const nextBtn = document.getElementById('nextStep');

  prevBtn.disabled = STATE.currentStep === 0;
  nextBtn.disabled = false;

  if (STATE.currentStep === total - 1) {
    nextBtn.textContent = 'Complete Case ✓';
  } else {
    nextBtn.textContent = 'Continue →';
  }

  const content = document.getElementById('stepContent');
  content.innerHTML = '';

  if (step.type === 'read') {
    content.innerHTML = `
      <div class="step-title">${step.title}</div>
      <div class="step-subtitle">${step.subtitle}</div>
      ${step.content}
    `;
  } else if (step.type === 'quiz') {
    content.innerHTML = `
      <div class="step-title">${step.title}</div>
      <div class="step-subtitle">${step.subtitle}</div>
      <div class="quiz-container" id="quizContainer"></div>
    `;
    renderCurrentQuestion(0);
    const allDone = step.questions.every((_, i) =>
      STATE.quizAnswered[`${STATE.currentCase}-${STATE.currentStep}-${i}`]
    );
    nextBtn.disabled = !allDone;
  } else if (step.type === 'scenario') {
    content.innerHTML = `
      <div class="step-title">${step.title}</div>
      <div class="step-subtitle">${step.subtitle}</div>
      <div class="irl-card">
        <div class="irl-badge">📋 IRL Assignment</div>
        <div class="irl-scenario-title">${step.scenario.title}</div>
        <div class="irl-scenario-text">${step.scenario.text}</div>
        <div class="irl-instructions">
          <div class="irl-instruction-item">
            <span class="irl-num">1</span>
            <span>Read the scenario with a colleague or trainer</span>
          </div>
          <div class="irl-instruction-item">
            <span class="irl-num">2</span>
            <span>Discuss and agree on a recommendation — product line, tier, and reasoning</span>
          </div>
          <div class="irl-instruction-item">
            <span class="irl-num">3</span>
            <span>When you're done, compare with the model answer</span>
          </div>
        </div>
        <div class="answer-reveal">
          <button class="answer-toggle" onclick="toggleAnswer(this)">✅ Show model answer</button>
          <div class="answer-body">${step.scenario.answer}</div>
        </div>
      </div>
    `;
  }

  content.scrollTop = 0;
  saveProgress();
}

// =============================================
// QUIZ LOGIC
// =============================================

function renderCurrentQuestion(qIndex) {
  const c = CASES[STATE.currentCase];
  const step = c.steps[STATE.currentStep];
  const questions = step.questions;
  const q = questions[qIndex];
  const stateKey = `${STATE.currentCase}-${STATE.currentStep}-${qIndex}`;
  const alreadyAnswered = STATE.quizAnswered[stateKey];

  let optHtml = q.options.map((opt, i) => {
    let cls = '';
    if (alreadyAnswered) {
      if (i === q.correct) cls = 'show-correct disabled';
      else cls = 'disabled';
      if (alreadyAnswered.chosen === i && i !== q.correct) cls = 'selected-wrong disabled';
    }
    return `<div class="quiz-option ${cls}" onclick="selectAnswer(${qIndex}, ${i})">
      <span class="option-letter">${String.fromCharCode(65+i)}</span>${opt}
    </div>`;
  }).join('');

  let feedbackHtml = '';
  if (alreadyAnswered) {
    feedbackHtml = `<div class="quiz-feedback ${alreadyAnswered.correct ? 'correct' : 'wrong'}">
      ${alreadyAnswered.correct ? '✅ ' : '❌ '} ${q.feedback}
    </div>`;
  }

  let navHtml = '';
  if (alreadyAnswered && qIndex < questions.length - 1) {
    navHtml = `<button class="btn-primary" style="margin-top:20px" onclick="renderCurrentQuestion(${qIndex+1})">Next question →</button>`;
  }

  const container = document.getElementById('quizContainer');
  if (container) {
    container.innerHTML = `
      <div class="quiz-num">Question ${qIndex + 1} of ${questions.length}</div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-options">${optHtml}</div>
      ${feedbackHtml}
      ${navHtml}
    `;
  }
}

function selectAnswer(qIndex, chosen) {
  const c = CASES[STATE.currentCase];
  const step = c.steps[STATE.currentStep];
  const q = step.questions[qIndex];
  const stateKey = `${STATE.currentCase}-${STATE.currentStep}-${qIndex}`;

  if (STATE.quizAnswered[stateKey]) return;

  const correct = chosen === q.correct;
  STATE.quizAnswered[stateKey] = { correct, chosen };
  STATE.totalQuestions++;
  if (correct) {
    STATE.correctAnswers++;
    addXP(25);
  }

  renderCurrentQuestion(qIndex);
  saveProgress();

  const allDone = step.questions.every((_, i) =>
    STATE.quizAnswered[`${STATE.currentCase}-${STATE.currentStep}-${i}`]
  );
  if (allDone) {
    document.getElementById('nextStep').disabled = false;
  }
}

// =============================================
// STEP NAVIGATION
// =============================================

function nextStep() {
  const c = CASES[STATE.currentCase];
  const total = c.steps.length;

  if (STATE.currentStep < total - 1) {
    STATE.currentStep++;
    renderStep();
  } else {
    completeCase(STATE.currentCase);
  }
}

function prevStep() {
  if (STATE.currentStep > 0) {
    STATE.currentStep--;
    renderStep();
  }
}

function completeCase(caseNum) {
  const alreadyCompleted = STATE.casesCompleted.has(caseNum);
  STATE.casesCompleted.add(caseNum);

  if (!alreadyCompleted) {
    addXP(CASES[caseNum].xp);
  }

  const navEl = document.getElementById(`nav-${caseNum}`);
  if (navEl) {
    navEl.classList.remove('locked');
    navEl.classList.add('completed');
  }
  const statusEl = document.getElementById(`status-${caseNum}`);
  if (statusEl) statusEl.textContent = '✅';

  updateProgress();
  unlockNextCase(caseNum);

  if (STATE.casesCompleted.size >= 10) {
    setAlexSpeech("All ten cases complete. You've mastered the Cloud86 product portfolio. Outstanding work!");
    showCert();
  } else {
    const nextCase = caseNum + 1;
    const isTier2Unlock = caseNum === 5 && CASES[6];
    const tier2Msg = isTier2Unlock
      ? `Tier 1 complete! Tier 2 — Advanced Cases is now unlocked. These scenarios require sharper judgment.`
      : `Case #${caseNum} solved! Case #${nextCase} is now unlocked. Ready for the next one?`;

    setAlexSpeech(tier2Msg);

    const content = document.getElementById('stepContent');
    content.innerHTML = `
      <div class="step-complete-banner">
        <div style="font-size:52px;margin-bottom:14px">${isTier2Unlock ? '🏆' : '🎉'}</div>
        <h3>Case #${caseNum} Solved!</h3>
        <p>+${CASES[caseNum].xp} XP earned. ${isTier2Unlock ? '<strong style="color:var(--teal-bright)">Tier 2: Advanced Cases unlocked!</strong>' : `Case #${nextCase} is now unlocked.`}</p>
      </div>
      <div style="text-align:center;margin-top:28px">
        <button class="btn-primary btn-lg" onclick="openCase(${nextCase})">Open Case #${nextCase} →</button>
      </div>
    `;
    document.getElementById('nextStep').style.display = 'none';
    document.getElementById('prevStep').style.display = 'none';
  }
  saveProgress();
}

function unlockNextCase(caseNum) {
  const next = caseNum + 1;
  if (!CASES[next]) return;
  const nextNav = document.getElementById(`nav-${next}`);
  if (nextNav && nextNav.classList.contains('locked')) {
    nextNav.classList.remove('locked');
    const fresh = nextNav.cloneNode(true);
    nextNav.parentNode.replaceChild(fresh, nextNav);
    fresh.addEventListener('click', () => openCase(next));
  }
}

function showCert() {
  const score = STATE.totalQuestions > 0
    ? Math.round((STATE.correctAnswers / STATE.totalQuestions) * 100)
    : 100;
  document.getElementById('certXP').textContent = STATE.xp;
  document.getElementById('certScore').textContent = `${score}%`;
  document.getElementById('certCases').textContent = STATE.casesCompleted.size;

  document.getElementById('nav-cert').classList.remove('locked');
  document.getElementById('status-cert').textContent = '';

  showView('cert');
  saveProgress();
}

function toggleAnswer(btn) {
  const body = btn.nextElementSibling;
  body.classList.toggle('open');
  btn.textContent = body.classList.contains('open') ? '🔼 Hide answer' : '💡 Show model answer';
}

// =============================================
// RESUME BANNER
// =============================================

function showResumeBanner(saved) {
  const banner = document.createElement('div');
  banner.id = 'resumeBanner';
  banner.innerHTML = `
    <div class="resume-inner">
      <span class="resume-icon">💾</span>
      <div class="resume-text">
        <strong>Welcome back!</strong>
        You have a saved session — ${saved.casesCompleted.length} case${saved.casesCompleted.length !== 1 ? 's' : ''} completed, ${saved.xp} XP earned.
      </div>
      <div class="resume-actions">
        <button class="btn-primary" id="resumeBtn">Resume →</button>
        <button class="btn-ghost btn-sm" id="resetBtn">Start fresh</button>
      </div>
    </div>
  `;
  document.querySelector('.hero-intro').prepend(banner);

  document.getElementById('resumeBtn').addEventListener('click', () => {
    banner.remove();
    resumeSession(saved);
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    clearProgress();
    banner.remove();
  });
}

function resumeSession(saved) {
  STATE.xp = saved.xp;
  STATE.casesCompleted = saved.casesCompleted;
  STATE.quizAnswered = saved.quizAnswered || {};
  STATE.totalQuestions = saved.totalQuestions || 0;
  STATE.correctAnswers = saved.correctAnswers || 0;

  document.getElementById('xpBadge').textContent = `${STATE.xp} XP`;
  document.getElementById('totalXP').textContent = STATE.xp;
  updateProgress(false);

  STATE.casesCompleted.forEach(caseNum => {
    const navEl = document.getElementById(`nav-${caseNum}`);
    if (navEl) {
      navEl.classList.remove('locked');
      navEl.classList.add('completed');
      const st = document.getElementById(`status-${caseNum}`); if (st) st.textContent = '✅';
    }
    unlockNextCase(caseNum);
  });

  if (STATE.casesCompleted.size >= 10) {
    document.getElementById('nav-cert').classList.remove('locked');
    document.getElementById('status-cert').textContent = '';
    document.getElementById('nav-cert').addEventListener('click', showCert);
  }

  if (saved.currentView === 'cert') {
    showCert();
  } else if (saved.currentCase && CASES[saved.currentCase]) {
    openCase(saved.currentCase, saved.currentStep || 0);
  }
}

// =============================================
// INIT
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.createElement('div');
  popup.id = 'xpPopup';
  document.body.appendChild(popup);

  document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('nav-1').classList.remove('locked');
    openCase(1);
  });

  document.querySelectorAll('.case-preview-card').forEach(card => {
    const caseNum = parseInt(card.querySelector('.case-num').textContent);
    if (!caseNum) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const tier2 = [6,7,8,9,10];
      const tier1Done = [1,2,3,4,5].every(n => STATE.casesCompleted.has(n));
      if (tier2.includes(caseNum) && !tier1Done) {
        card.style.animation = 'none';
        card.style.transform = 'translateX(-6px)';
        setTimeout(() => { card.style.transform = 'translateX(6px)'; }, 80);
        setTimeout(() => { card.style.transform = 'translateX(-4px)'; }, 160);
        setTimeout(() => { card.style.transform = ''; }, 240);
        return;
      }
      document.getElementById(`nav-${caseNum}`).classList.remove('locked');
      openCase(caseNum);
    });
  });

  document.getElementById('nav-intro').addEventListener('click', () => showView('intro'));

  document.getElementById('nav-1').addEventListener('click', () => {
    if (!document.getElementById('nav-1').classList.contains('locked')) openCase(1);
  });

  [2,3,4,5,6,7,8,9,10].forEach(n => {
    const el = document.getElementById(`nav-${n}`);
    if (el) el.addEventListener('click', () => {
      if (!el.classList.contains('locked')) openCase(n);
    });
  });

  const saved = loadProgress();
  if (saved && (saved.xp > 0 || (saved.casesCompleted && saved.casesCompleted.length > 0) ||
      saved.currentStep > 0 || Object.keys(saved.quizAnswered || {}).length > 0)) {
    showResumeBanner(saved);
  }
});

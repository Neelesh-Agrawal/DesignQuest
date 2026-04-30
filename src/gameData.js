import { EXTRA_CHAPTERS, EXTRA_SCENARIOS, getUpdatedEnding } from './gameDataExtension';

const BASE_CHAPTERS = [
  {
    id: 1,
    title: "The Signup Problem",
    tagline: "Your first week. Your first test.",
    description:
      "You've just joined Launchly as their first product designer. The product is scrappy but promising — a productivity app for remote teams. It took three rounds of interviews to get here. Now the real work begins.",
  },
  {
    id: 2,
    title: "The Redesign",
    tagline: "Everything is on the table.",
    description:
      "Three months in. Launchly is growing but the product is showing its cracks. Leadership has green-lit a full dashboard redesign. The pressure is on — and every call you make will define what this product becomes.",
  },
  {
    id: 3,
    title: "Scale & Trust",
    tagline: "The product works. Now it must scale.",
    description:
      "Launchly crossed 1M users. Growth is fast, but so are support tickets and trust issues. Your decisions now affect reliability, transparency, and retention at scale.",
  },
];

export const CHAPTERS = [...BASE_CHAPTERS, ...EXTRA_CHAPTERS];

const BASE_SCENARIOS = [
  // ─── CHAPTER 1 ───────────────────────────────────────────────────────────────
  {
    id: 1,
    chapter: 1,
    title: "The CEO's Bad Idea",
    narration:
      "It's your first week at Launchly. The CEO calls you into a Zoom. \"Our signup conversion is 38%. Industry average is 60%. I want to add a phone number, company size, and job title field to the form.\"\n\nYour user researcher Priya has data showing every extra field drops conversion by 4–7%. What do you do?",
    choices: [
      {
        id: "A",
        text: "Add all three fields. The CEO is the boss.",
        delta: 5,
      },
      {
        id: "B",
        text: "Push back with Priya's data. Propose a minimal form now, collect extra info post-signup.",
        delta: 15,
      },
      {
        id: "C",
        text: "Add just one field as a compromise, without showing the CEO the research.",
        delta: -10,
      },
    ],
    consequences: {
      A: {
        story:
          "You added the fields. Conversion dropped to 29%. The CEO blamed the design team. The next sprint was spent undoing your work.",
        lesson: "Authority is not a design argument. Data is.",
        principle: "Hick's Law",
        principleDetail:
          "Hick's Law states that every extra choice increases cognitive load and decision time. In forms, every additional field is a friction point — and friction kills conversion.",
      },
      B: {
        story:
          "You presented the data. The CEO agreed to test your version. Conversion hit 54%. Priya bought you a coffee.",
        lesson:
          "Hick's Law — every extra choice increases cognitive load and decision time.",
        principle: "Hick's Law + Form Design",
        principleDetail:
          "Fewer fields = faster decisions = higher conversion. The best form is the shortest one that still gets you what you need. Collect progressive information after value is delivered.",
      },
      C: {
        story:
          "Conversion dropped. When Priya found out you ignored her research without involving anyone, trust broke down. Your next meeting with her was very quiet.",
        lesson:
          "Design decisions made in silence become everyone's problem. Bring people along.",
        principle: "Collaborative Design Process",
        principleDetail:
          "Good design requires psychological safety and collaboration. Bypassing stakeholders to reach a 'compromise' actually satisfies no one and destroys trust — the most important resource on a small team.",
      },
    },
  },
  {
    id: 2,
    chapter: 1,
    title: "The Color Disaster",
    narration:
      "Marketing wants the CTA button to be the same green as the Launchly logo. \"Brand consistency,\" they say. But the button is sitting on a light green background.\n\nPriya flags it fails WCAG AA contrast. Marketing says \"it looks fine on my screen.\" What do you do?",
    choices: [
      {
        id: "A",
        text: "Change it to the brand green. Marketing approved it.",
        delta: -10,
      },
      {
        id: "B",
        text: "Keep the button green but adjust the background so contrast passes WCAG AA.",
        delta: 15,
      },
      {
        id: "C",
        text: "Pick a completely different color that passes contrast but breaks brand guidelines.",
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "A visually impaired user tweeted that they couldn't find the signup button. It went viral. Marketing quietly dropped the complaint.",
        lesson:
          "\"Looks fine on my screen\" is not an accessibility audit.",
        principle: "WCAG Contrast Ratios",
        principleDetail:
          "WCAG AA requires a 4.5:1 contrast ratio for normal text, 3:1 for large text. Accessibility isn't extra — it's table stakes. Designs that fail accessibility fail a significant portion of your users.",
      },
      B: {
        story:
          "You fixed the background, kept the brand color, passed WCAG AA. Marketing was happy. The accessibility team was happy. You found the third option.",
        lesson:
          "Accessibility and brand consistency are not mutually exclusive — find the solution that serves both.",
        principle: "Accessibility & WCAG AA",
        principleDetail:
          "Contrast ratio is 4.5:1 for normal text, 3:1 for large text/UI components. When stakeholders resist, adjusting context (background) rather than the protected element (brand color) is a powerful negotiation move.",
      },
      C: {
        story:
          "Marketing pushed back hard. The button got reverted to the inaccessible version by someone else while you were in a meeting.",
        lesson:
          "When you skip the explanation, others undo your work. Show your reasoning.",
        principle: "Stakeholder Communication",
        principleDetail:
          "Design decisions without explanation are fragile. When you can't defend a choice to all stakeholders, it will be overridden. The most important skill in design is articulating *why*, not just *what*.",
      },
    },
  },
  {
    id: 3,
    chapter: 1,
    title: "The Loading Screen",
    narration:
      "The app takes 4 seconds to load data. Engineers say they can't speed it up this sprint. The PM wants to show a spinner.\n\nYou think there's a better option. What do you design?",
    choices: [
      {
        id: "A",
        text: "Spinner. Simple, done.",
        delta: 5,
      },
      {
        id: "B",
        text: "Skeleton screens — grey placeholder shapes that look like the actual UI loading in.",
        delta: 15,
      },
      {
        id: "C",
        text: "A fun animated mascot that dances while loading.",
        delta: -10,
      },
    ],
    consequences: {
      A: {
        story:
          "Users stared at a spinning circle with no sense of progress. Session recordings showed rage clicks after 2 seconds. Churn during loading spiked.",
        lesson:
          "Uncertainty is worse than waiting. Give users a mental model of what's coming.",
        principle: "Perceived Performance",
        principleDetail:
          "A spinner tells users nothing about duration or progress. The psychological experience of waiting matters more than the actual wait time. Give users something to anticipate.",
      },
      B: {
        story:
          "Perceived load time dropped. Users felt the app was faster even though nothing changed technically. The PM was delighted.",
        lesson:
          "Skeleton screens reduce perceived wait time by giving users a mental model of what's coming.",
        principle: "Skeleton Screens",
        principleDetail:
          "Skeleton screens show the structural layout of content before it loads. Research shows they feel 20-40% faster than spinners because they set expectations and show progress. The golden rule: use skeletons for content-heavy loads, spinners for quick actions.",
      },
      C: {
        story:
          "Users loved the mascot for day one. By day three, they were clicking away in frustration before loading finished. Delight has a shelf life. Utility doesn't.",
        lesson:
          "Delight is a layer on top of utility — not a substitute for it.",
        principle: "Delight vs. Utility",
        principleDetail:
          "Novel interactions and animations create first-impression joy but create friction at scale. When a user sees your animation for the 50th time, they see it as a delay, not a feature. Optimize for the 50th time, not the first.",
      },
    },
  },
  {
    id: 4,
    chapter: 1,
    title: "The Notification Overload",
    narration:
      "The growth team wants to add 4 new push notification types to increase engagement. \"More touchpoints = more retention,\" they argue.\n\nYou've seen the data: Launchly users already have a 34% notification opt-out rate. What do you recommend?",
    choices: [
      {
        id: "A",
        text: "Approve all 4. Growth team knows best.",
        delta: -10,
      },
      {
        id: "B",
        text: "Approve 1 high-value notification and propose a notification preference center so users control what they get.",
        delta: 15,
      },
      {
        id: "C",
        text: "Block all 4 until you can run a full user survey.",
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "Opt-out rate hit 61% within 3 weeks. The growth team's engagement metric went up briefly, then crashed as opted-out users disengaged entirely.",
        lesson:
          "Engagement hacked by noise is not engagement. It's churn in slow motion.",
        principle: "Notification Design",
        principleDetail:
          "Push notifications have diminishing returns and compounding costs. Each unwanted notification trains users to opt out of all notifications — destroying your communication channel permanently. Relevance > frequency.",
      },
      B: {
        story:
          "Users who customized notifications retained 2.3x better. The preference center became a feature users actively praised in App Store reviews.",
        lesson:
          "User control over communication is a retention strategy, not a nice-to-have.",
        principle: "User Autonomy & Progressive Disclosure",
        principleDetail:
          "Giving users control is not the same as giving up control. A notification preference center empowers users while keeping them engaged on their terms. The best retention mechanism is trust.",
      },
      C: {
        story:
          "The survey took 6 weeks. Growth shipped the notifications anyway while you were waiting. You arrived at the meeting with results to find the decision had already been made.",
        lesson:
          "Perfect data shouldn't be the enemy of good judgment. Act with the best available signal.",
        principle: "Data-Informed vs. Data-Dependent",
        principleDetail:
          "Waiting for perfect data is itself a decision — often a bad one. Design leadership means acting on the best available signal while remaining open to revision. Don't let process be an excuse for inaction.",
      },
    },
  },
  {
    id: 5,
    chapter: 1,
    title: "The Error Message",
    narration:
      "A user tries to upload a file. It fails. The current error message says: \"Error 403: Unauthorized request. Contact system administrator.\"\n\nPriya's research shows users think the app is broken. You have 30 minutes to fix the copy. What do you write?",
    choices: [
      {
        id: "A",
        text: '"Upload failed. Please try again."',
        delta: 5,
      },
      {
        id: "B",
        text: '"This file type isn\'t supported yet. Try uploading a JPG, PNG, or PDF instead."',
        delta: 15,
      },
      {
        id: "C",
        text: '"Oops! Something went wrong on our end 😅"',
        delta: -10,
      },
    ],
    consequences: {
      A: {
        story:
          "Better than the original, but users still didn't know what went wrong or how to fix it. 40% tried again with the same file and hit the same error.",
        lesson:
          "Error messages need to answer two questions: what happened AND what now?",
        principle: "Error Message UX",
        principleDetail:
          "Good error messages are specific, blame-free, and immediately actionable. Vague errors create repeat failures and support tickets. Every error message is a moment of truth — the user is stuck and looking to you for help.",
      },
      B: {
        story:
          "Support tickets for this error dropped 70%. Users knew exactly what to do and did it. The support team sent you a gif.",
        lesson:
          "Good error messages are specific, blame-free, and immediately actionable.",
        principle: "Microcopy & Error Messages",
        principleDetail:
          "The formula: [What happened] + [Why] + [How to fix it]. Avoid technical jargon, avoid blame, avoid dead ends. The best error message is one the user reads, acts on, and never sees again.",
      },
      C: {
        story:
          "Users felt the brand was being flippant about their problem. App Store reviews mentioned 'the app jokes about itself breaking.' Trust dropped measurably.",
        lesson:
          "Casual tone in errors signals you don't take user pain seriously.",
        principle: "Tone of Voice",
        principleDetail:
          "Tone is not just aesthetic — it communicates values. Humor in error states, especially self-deprecating humor, can read as indifference. Reserve playfulness for moments of delight. Match tone to emotional context.",
      },
    },
  },
  // ─── CHAPTER 2 ───────────────────────────────────────────────────────────────
  {
    id: 6,
    chapter: 2,
    title: "The Dashboard Redesign",
    narration:
      "Launchly's dashboard is cluttered. 14 widgets, all visible at once. The CEO says \"Show everything — users should have full power.\"\n\nPower users love it. New users churn at 70% in week one. What do you propose?",
    choices: [
      {
        id: "A",
        text: "Keep it as is. Power users are the core audience.",
        delta: -10,
      },
      {
        id: "B",
        text: "Progressive disclosure: show 4 key widgets by default, let users add more.",
        delta: 15,
      },
      {
        id: "C",
        text: "Remove 10 widgets permanently. Simplify hard.",
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "New user churn hit 78%. Launchly missed its Q2 activation metric. The board started asking questions. The CEO stopped saying 'full power' in meetings.",
        lesson:
          "Designing only for your best users is designing against your future.",
        principle: "User Segmentation",
        principleDetail:
          "Optimizing for power users at the cost of new users creates a product that can't grow. Products need to serve users across the journey — from first-time confused to long-time expert. One size rarely fits all.",
      },
      B: {
        story:
          "New user activation improved 40%. Power users kept their complex view. Both groups got what they needed without compromise.",
        lesson:
          "Progressive disclosure reveals complexity only when users are ready for it.",
        principle: "Progressive Disclosure",
        principleDetail:
          "Progressive disclosure is the practice of hiding advanced features until they're needed, reducing cognitive load for beginners while preserving power for experts. The ideal interface is simple at first glance and deep on exploration.",
      },
      C: {
        story:
          "Power users revolted. Three wrote blog posts. One tweet got 4,000 likes. The CEO reversed your decision publicly. You spent a sprint restoring what you'd deleted.",
        lesson:
          "Radical simplification without user research is just a different kind of guessing.",
        principle: "Research Before Redesign",
        principleDetail:
          "Simplification is powerful but dangerous without data. Know *which* complexity is harmful and *for whom* before removing it. Removal is harder to recover from than addition.",
      },
    },
  },
  {
    id: 7,
    chapter: 2,
    title: "The Font Debate",
    narration:
      "A new brand consultant says Launchly needs a 'bolder' font. They suggest switching the entire product to a decorative display typeface. It looks great in the deck.\n\nYou're worried about readability at small sizes and in dense data tables. What do you do?",
    choices: [
      {
        id: "A",
        text: "Use it everywhere. Brand said so.",
        delta: -10,
      },
      {
        id: "B",
        text: "Propose: decorative font for headings and marketing, clean legible font for UI.",
        delta: 15,
      },
      {
        id: "C",
        text: "Keep the current font. Change nothing.",
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "User testing showed users misread numbers in data tables. An engineer caught a billing error caused by a misread digit. The font quietly got rolled back two weeks later.",
        lesson:
          "Branding lives in headlines. Usability lives in the details.",
        principle: "Typographic Hierarchy",
        principleDetail:
          "Display fonts are designed for large sizes and short text. Body fonts are designed for small sizes and extended reading. Using the wrong tool in the wrong context degrades comprehension — and in data-heavy UIs, that has real consequences.",
      },
      B: {
        story:
          "Both brand and product goals were satisfied. The consultant included it as a case study in their portfolio. You used the right tool for the right context.",
        lesson:
          "Typographic hierarchy — display fonts for impact, body fonts for comprehension.",
        principle: "Typography Systems",
        principleDetail:
          "A robust type system separates display typefaces (expressive, high visual weight, short strings) from UI typefaces (neutral, high x-height, legible at 12–14px). Mixing them purposefully creates hierarchy without sacrificing usability.",
      },
      C: {
        story:
          "The consultant presented directly to the board without your input. The font was switched company-wide by someone who didn't know the risks. You inherited the mess.",
        lesson:
          "Not deciding is still a decision. Inaction cedes influence to whoever acts next.",
        principle: "Design Advocacy",
        principleDetail:
          "When designers stay silent, the next loudest voice wins. Advocating for no change is still advocacy — it requires explanation and framing. If you don't show up to the conversation, someone else will design by accident.",
      },
    },
  },
  {
    id: 8,
    chapter: 2,
    title: "The Mobile Afterthought",
    narration:
      "The new feature was designed entirely for desktop. The PM wants to ship mobile \"next quarter.\" Analytics show 61% of Launchly users are on mobile.\n\nWhat do you do?",
    choices: [
      {
        id: "A",
        text: "Ship desktop-only. Mobile next quarter.",
        delta: -10,
      },
      {
        id: "B",
        text: "Delay the feature 2 weeks to design mobile simultaneously.",
        delta: 15,
      },
      {
        id: "C",
        text: 'Ship desktop, add a "best viewed on desktop" banner for mobile users.',
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "61% of users hit a broken experience on launch day. App Store reviews dropped to 3.1 stars overnight. Mobile 'next quarter' became mobile 'never' as the team moved to the next feature.",
        lesson: "Mobile isn't a feature. It's where your users are.",
        principle: "Mobile-First Thinking",
        principleDetail:
          "When the majority of your users are on mobile, mobile is not a secondary concern — it's the primary canvas. Mobile-first forces constraint-driven design that simplifies for everyone.",
      },
      B: {
        story:
          "Launch was slightly later but reviews were strong across devices. The PM said 'I didn't think two weeks would make that difference.' You saved that message.",
        lesson:
          "If it works on mobile, it works everywhere. Start with the constraint.",
        principle: "Mobile-First Design",
        principleDetail:
          "Designing mobile-first means starting with the most constrained canvas (small screen, one-thumb reach, variable connectivity) and scaling up. It prevents desktop-centric thinking that creates mobile afterthoughts. The constraint improves the desktop design too.",
      },
      C: {
        story:
          "'Best viewed on desktop' was screenshotted and mocked on Twitter. It became a meme. The PM was not amused. The banner was removed within 24 hours.",
        lesson:
          "Banners that apologize for your product are not solutions.",
        principle: "Responsive Design",
        principleDetail:
          "Responsive design is not graceful degradation — it's purposeful adaptation. Telling users to use a different device is an admission of failure, not a solution. Users are where they are.",
      },
    },
  },
  {
    id: 9,
    chapter: 2,
    title: "The A/B Test",
    narration:
      "You designed a new onboarding flow. The PM wants to ship it immediately — \"It's clearly better.\" You think you should A/B test it first. The PM says testing takes too long.\n\nWho wins?",
    choices: [
      {
        id: "A",
        text: "Ship it. The PM approved it.",
        delta: 5,
      },
      {
        id: "B",
        text: "Push for a 2-week A/B test with a 50/50 split.",
        delta: 15,
      },
      {
        id: "C",
        text: "Compromise: ship to 10% of users as a soft launch, monitor data, then decide.",
        delta: 15,
      },
    ],
    consequences: {
      A: {
        story:
          "The new flow had a subtle bug on Android that tanked activation for 3 weeks before anyone noticed. By then, a full cohort of new users had churned through the broken experience.",
        lesson:
          "Confidence is not the same as correctness. Validate before you scale.",
        principle: "Validated Shipping",
        principleDetail:
          "Shipping without validation is a bet — sometimes it pays off, sometimes it wipes out a cohort. In user-facing products, scale amplifies both success and failure. The cost of a 2-week test is almost always less than the cost of 3 weeks of broken activation.",
      },
      B: {
        story:
          "The test showed your design was 22% better. The data made the ship decision obvious. Even the skeptics agreed. The PM bought you lunch.",
        lesson:
          "A/B testing turns opinions into evidence. Evidence ends debates.",
        principle: "A/B Testing",
        principleDetail:
          "A/B testing isolates a single variable and measures its effect on a meaningful outcome. It is the closest design tool to controlled experimentation. 'I think' becomes 'I know.' Use it when the stakes are high and the sample size is sufficient.",
      },
      C: {
        story:
          "The 10% soft launch caught an edge case crashing the flow for users on iOS 15. You fixed it before full rollout. The full launch was clean.",
        lesson:
          "Staged rollouts are how good teams ship fearlessly.",
        principle: "Staged Rollouts",
        principleDetail:
          "A staged rollout (5%, 10%, 25%, 100%) lets you catch edge cases before they affect your entire user base. It's not a sign of uncertainty — it's a sign of professionalism. Fearless shipping is possible only when you have a safety net.",
      },
    },
  },
  {
    id: 10,
    chapter: 2,
    title: "The Final Presentation",
    narration:
      "You're presenting the redesign to the full leadership team. Halfway through, the CFO asks: \"How do we know this is actually better?\"\n\nYou have user research and usability test recordings. The CEO is nodding along but the CFO looks skeptical. What do you do?",
    choices: [
      {
        id: "A",
        text: '"Trust the design process." Move on.',
        delta: -10,
      },
      {
        id: "B",
        text: "Pull up a usability test clip showing a real user struggling with the old design, then show the new design solving it.",
        delta: 15,
      },
      {
        id: "C",
        text: '"We\'ll measure it after launch."',
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "The CFO voted to delay the redesign pending 'more evidence.' You lost 3 months of shipping time. The startup continued shipping the old broken design.",
        lesson: "'Trust me' is never a design argument. Show your work.",
        principle: "Design Advocacy",
        principleDetail:
          "Asking stakeholders to trust the process without showing evidence is asking them to take a faith leap. In business contexts, faith doesn't survive budget conversations. Design must speak the language of outcomes, not craft.",
      },
      B: {
        story:
          "Watching a real user struggle — then succeed — was more persuasive than any slide. The CFO said 'Oh. I see it now.' Leadership approved unanimously.",
        lesson:
          "Showing user pain is the most powerful design presentation tool.",
        principle: "Research as Persuasion",
        principleDetail:
          "Numbers tell. Stories sell. A single 2-minute usability clip of a real user failing a task creates empathy that no slide deck can replicate. The most effective design presentations pair quantitative evidence (data) with qualitative evidence (human moments).",
      },
      C: {
        story:
          "The redesign was approved conditionally with heavy measurement requirements attached. You spent the next month building metrics dashboards instead of designing.",
        lesson:
          "'We'll measure it later' signals 'we don't know if this is good.'",
        principle: "Evidence-Based Design",
        principleDetail:
          "Deferring measurement to post-launch is a red flag to stakeholders. It suggests you lack confidence in your solution. Good designers define success metrics *before* they ship — and share them proactively as a sign of confidence, not compliance.",
      },
    },
  },
  // ─── CHAPTER 3 ───────────────────────────────────────────────────────────────
  {
    id: 11,
    chapter: 3,
    title: "The Empty State",
    narration:
      "Your new analytics page is technically correct but empty for first-time users. PM says, \"They'll figure it out.\" Research says first-session confusion is causing drop-off.\n\nWhat do you ship?",
    choices: [
      {
        id: "A",
        text: "Leave it blank until users connect data.",
        delta: -10,
      },
      {
        id: "B",
        text: "Add a guided empty state with one clear CTA, sample preview, and estimated setup time.",
        delta: 15,
      },
      {
        id: "C",
        text: "Show a long help article link and no CTA.",
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "New users bounced in under 40 seconds. Support tickets titled 'dashboard broken?' spiked by 3x.",
        lesson: "Silence in UI is interpreted as failure.",
        principle: "Visibility of System Status",
        principleDetail:
          "Users need immediate signals about what is happening and what to do next. Empty states should explain status, value, and next action in plain language.",
      },
      B: {
        story:
          "Setup completion improved 33%. Users understood what to do and why it was worth doing.",
        lesson: "A good empty state is onboarding, not decoration.",
        principle: "Recognition Rather Than Recall",
        principleDetail:
          "Design for recognition by showing examples and clear next steps instead of forcing users to remember instructions. Lower memory load, higher completion.",
      },
      C: {
        story:
          "A few power users found the docs, but most users ignored the link and churned silently.",
        lesson: "Helpful content should be embedded where decisions happen.",
        principle: "Help and Documentation",
        principleDetail:
          "Documentation works best when contextual and concise. If help requires leaving the flow, most users will not use it.",
      },
    },
  },
  {
    id: 12,
    chapter: 3,
    title: "The Dangerous Delete",
    narration:
      "A 'Delete Workspace' button now sits next to 'Save Changes'. QA reports one accidental deletion in staging. Engineering says confirmations are annoying.\n\nWhat do you do?",
    choices: [
      {
        id: "A",
        text: "Ship as-is. People should read carefully.",
        delta: -10,
      },
      {
        id: "B",
        text: "Add destructive styling, spacing separation, and a typed confirmation step.",
        delta: 15,
      },
      {
        id: "C",
        text: "Keep the button but add a toast saying 'Undo if needed'.",
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "Two customers deleted active workspaces. One churned the same week.",
        lesson: "Design should prevent high-cost mistakes, not blame users.",
        principle: "Error Prevention",
        principleDetail:
          "Prevent errors before they happen with separation, clear affordances, and confirmation for destructive actions. Prevention beats recovery.",
      },
      B: {
        story:
          "No accidental deletions were reported for the next release cycle.",
        lesson: "Friction is good when the risk is irreversible.",
        principle: "Error Prevention",
        principleDetail:
          "High-risk actions deserve intentional friction. Visual hierarchy and explicit confirmation reduce accidental outcomes dramatically.",
      },
      C: {
        story:
          "The undo toast helped some users, but others missed it and lost data anyway.",
        lesson: "Recovery helps, but prevention is safer.",
        principle: "Help Users Recognize, Diagnose, and Recover from Errors",
        principleDetail:
          "Recovery patterns are important, but should complement prevention. The highest-impact strategy is still to reduce the chance of the error itself.",
      },
    },
  },
  {
    id: 13,
    chapter: 3,
    title: "The Keyboard Trap",
    narration:
      "Accessibility audit shows keyboard users get stuck in a modal and can't see focus clearly. Deadline is tomorrow.\n\nWhat's your fix?",
    choices: [
      {
        id: "A",
        text: "Keep current behavior; keyboard users are a small segment.",
        delta: -10,
      },
      {
        id: "B",
        text: "Implement visible focus ring, ESC to close, and proper focus return after close.",
        delta: 15,
      },
      {
        id: "C",
        text: "Only add ESC support for now.",
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "Audit failed. Enterprise rollout was paused pending accessibility fixes.",
        lesson: "Accessibility debt becomes business debt.",
        principle: "Keyboard Accessibility",
        principleDetail:
          "Keyboard operability and visible focus are fundamental. Users must always know where focus is and be able to move, act, and exit without a mouse.",
      },
      B: {
        story:
          "Audit passed with commendation for focus visibility and escape behavior.",
        lesson: "Accessible interactions improve UX for everyone.",
        principle: "WCAG 2.2 Focus Visibility",
        principleDetail:
          "Clear focus indicators and predictable keyboard behavior satisfy WCAG expectations and reduce interaction friction for all users, not only assistive tech users.",
      },
      C: {
        story:
          "Escaping became easier, but focus still disappeared on dark backgrounds for many users.",
        lesson: "Partial fixes can still fail critical tasks.",
        principle: "Non-text Contrast",
        principleDetail:
          "Focus indicators need sufficient contrast with surrounding UI. If users cannot see focus state, keyboard navigation remains unreliable.",
      },
    },
  },
  {
    id: 14,
    chapter: 3,
    title: "The Feature Avalanche",
    narration:
      "Sales asks for six new controls on the main editor toolbar before quarter-end. Current toolbar already feels crowded.\n\nHow do you respond?",
    choices: [
      {
        id: "A",
        text: "Add all six controls to the top-level toolbar.",
        delta: -10,
      },
      {
        id: "B",
        text: "Keep top 3 primary actions visible and group advanced actions in an 'Advanced' menu.",
        delta: 15,
      },
      {
        id: "C",
        text: "Reject all six requests immediately.",
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "Task completion slowed as users hesitated and misclicked more often.",
        lesson: "More options can reduce action, not increase it.",
        principle: "Hick's Law",
        principleDetail:
          "Decision time rises with option count and complexity. Prioritize common actions and progressively disclose rarely used controls.",
      },
      B: {
        story:
          "New users stayed fast; power users still found advanced controls when needed.",
        lesson: "Progressive disclosure balances speed and depth.",
        principle: "Aesthetic and Minimalist Design",
        principleDetail:
          "Minimal interfaces are not about removing capability; they surface only relevant information at each moment, reducing cognitive load.",
      },
      C: {
        story:
          "You protected simplicity, but stakeholder trust dropped due to lack of compromise.",
        lesson: "Good UX also requires collaborative negotiation.",
        principle: "Consistency and Standards",
        principleDetail:
          "Use existing UI patterns and shared decision frameworks to align teams. Consistency in process helps consistency in product.",
      },
    },
  },
  {
    id: 15,
    chapter: 3,
    title: "The Launch Moment",
    narration:
      "You are one day from launch. Leadership asks for a final recommendation: full release to everyone or staged rollout with monitoring.\n\nWhat do you choose?",
    choices: [
      {
        id: "A",
        text: "Launch to 100% immediately and react to issues later.",
        delta: -10,
      },
      {
        id: "B",
        text: "Staged rollout: 10% -> 30% -> 100% with clear success/failure thresholds.",
        delta: 15,
      },
      {
        id: "C",
        text: "Delay launch indefinitely until every metric is perfect.",
        delta: 5,
      },
    ],
    consequences: {
      A: {
        story:
          "A timezone bug hit all users at once. Support queues flooded for 48 hours.",
        lesson: "Blast radius is a product decision too.",
        principle: "Visibility of System Status",
        principleDetail:
          "Large releases require transparent monitoring and rapid feedback loops. If you cannot observe impact clearly, you cannot steer safely.",
      },
      B: {
        story:
          "A small issue appeared at 10%, fixed quickly, and full launch landed smoothly.",
        lesson: "Great teams scale confidence gradually.",
        principle: "Staged Rollouts",
        principleDetail:
          "Controlled release phases reduce risk while preserving delivery speed. Pair rollouts with predefined guardrails and rollback criteria.",
      },
      C: {
        story:
          "Competitors shipped first while your team debated edge cases.",
        lesson: "Perfectionism can be another form of risk.",
        principle: "Data-Informed vs. Data-Dependent",
        principleDetail:
          "Use evidence to decide, but do not wait forever. Progress comes from measured iteration, not infinite postponement.",
      },
    },
  },
];

export const SCENARIOS = [...BASE_SCENARIOS, ...EXTRA_SCENARIOS];

export const ENDINGS = {
  leadDesigner: {
    range: "250–325",
    title: "Lead Designer",
    subtitle: "The startup ships. And so do you.",
    description:
      "Launchly hits its targets. The redesign and scale phase both land with strong outcomes. At the all-hands, the CEO calls out your work by name. Three weeks later, you're promoted to Lead Designer.",
    color: "#00D4FF",
  },
  solidDesigner: {
    range: "180–249",
    title: "Solid Designer",
    subtitle: "You held the line where it mattered.",
    description:
      "Launchly keeps growing. Some decisions were excellent, some needed iteration. You proved you can balance speed, quality, and collaboration under pressure.",
    color: "#7C3AED",
  },
  lessonsLearned: {
    range: "Below 180",
    title: "Lessons Learned",
    subtitle: "Every mistake had a lesson inside it.",
    description:
      "Some calls didn't land, but you built a sharper design instinct. Great designers are shaped by reflection, iteration, and recovery from hard decisions.",
    color: "#F59E0B",
  },
};

export const getEnding = getUpdatedEnding;

// Legacy — kept so any existing imports don't break
export const BASE_ENDINGS = ENDINGS;

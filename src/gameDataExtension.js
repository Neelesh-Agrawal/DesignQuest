// ─── CHAPTERS 4–8 ────────────────────────────────────────────────────────────
export const EXTRA_CHAPTERS = [
  {
    id: 4,
    title: "Visual Thinking",
    tagline: "Design isn't just decisions. It's perception.",
    description:
      "The product team wants a full visual overhaul. You're now responsible for how Launchly looks, feels, and communicates through layout, hierarchy, and visual design. Every pixel is a choice.",
  },
  {
    id: 5,
    title: "The Psychology of Decisions",
    tagline: "Users don't think. They feel.",
    description:
      "Growth is slowing. The exec team wants you to study why users do what they do — not just what they click. You'll need to understand behavioural psychology to design for the way people actually think.",
  },
  {
    id: 6,
    title: "Visual Design Craft",
    tagline: "Good design is invisible. Great design is felt.",
    description:
      "Launchly brings in a Head of Design for the first time. They want the UI elevated — more craft, more intention. You're tasked with raising the bar on typography, colour, layout, and motion.",
  },
  {
    id: 7,
    title: "Research & Mental Models",
    tagline: "You design for users. Do you know them?",
    description:
      "A competitor just launched and users are churning. The answer isn't more features — it's understanding who your users are, what they expect, and where the product breaks their mental model.",
  },
  {
    id: 8,
    title: "Systems & Scale",
    tagline: "Design doesn't scale. Systems do.",
    description:
      "Launchly's design team has grown to 6 people. Work is shipping fast but inconsistently. It's time to build the systems, standards, and shared language that let a team design as one.",
  },
];

// ─── SCENARIOS 16–50 (Chapters 4–8) ─────────────────────────────────────────
export const EXTRA_SCENARIOS = [
  // ── CHAPTER 4: Visual Thinking ─────────────────────────────────────────────
  {
    id: 16, chapter: 4,
    title: "The Cluttered Dashboard",
    narration:
      "The new dashboard is getting design reviews. Everything is technically present but it looks chaotic. Users say 'I don't know where to look first.'\n\nYou examine the layout. Related elements are scattered across the screen with no visual grouping. How do you fix it?",
    choices: [
      { id: "A", text: "Add borders and lines between every element to separate them.", delta: -10 },
      { id: "B", text: "Group related elements closer together. Use whitespace to separate groups.", delta: 15 },
      { id: "C", text: "Add colored backgrounds to each section to differentiate them.", delta: 5 },
    ],
    consequences: {
      A: { story: "More lines made it feel more cluttered, not less. Users saw a grid of boxes instead of meaningful groups. The visual noise increased.", lesson: "Lines divide. Proximity groups. They are not the same tool.", principle: "Gestalt — Proximity", principleDetail: "Gestalt's Law of Proximity: elements placed near each other are perceived as related, regardless of other visual attributes. You don't need lines or boxes — you need space. Close = related. Far = separate. The brain reads layout before reading words." },
      B: { story: "Without a single new element added, users said the dashboard felt 'organised' and 'easier to read.' The only change was spatial relationships.", lesson: "Proximity is the most powerful grouping tool you have. It costs nothing.", principle: "Gestalt — Proximity", principleDetail: "Proximity works because the brain groups nearby elements before processing anything else. Move related items together and use generous space between groups. Done right, users understand your layout structure in under 200ms — before they've read a single word." },
      C: { story: "Color backgrounds helped section differentiation but introduced new problems — which color meant what? Users had to learn a new color system on top of the layout.", lesson: "Color can reinforce grouping. It cannot replace structure.", principle: "Gestalt — Similarity", principleDetail: "Color is a grouping tool — but it works on similarity, not proximity. When you use color to group, it needs to be consistent and meaningful across the whole UI. Using it only to fix layout chaos introduces new cognitive load without solving the underlying spatial problem." },
    },
  },
  {
    id: 17, chapter: 4,
    title: "The Icon System Problem",
    narration:
      "Launchly's icon set is inconsistent — outline, filled, rounded, and sharp styles mixed throughout. Users report not being able to tell which icons are active versus inactive.\n\nHow do you fix the icon system?",
    choices: [
      { id: "A", text: "Use filled icons for everything. One style, consistent.", delta: 5 },
      { id: "B", text: "Outline icons for inactive, filled icons for active. One consistent rule across the whole product.", delta: 15 },
      { id: "C", text: "Use different colors for active vs inactive instead of changing the icon style.", delta: -5 },
    ],
    consequences: {
      A: { story: "Everything looked consistent, but users still couldn't tell what was active. Same filled icon for both states meant state was invisible. The system looked unified but communicated nothing.", lesson: "Consistency without communication is just decoration.", principle: "Gestalt — Similarity", principleDetail: "Gestalt's Law of Similarity: elements that look alike are perceived as in the same state. Using the same style for both active and inactive states breaks this — users can't distinguish between them. Similarity must be purposeful and encode meaning." },
      B: { story: "Within a week, support tickets about 'icons not working' dropped to zero. Users immediately understood the visual language. The system taught itself.", lesson: "A visual system that teaches users its own rules is a good system.", principle: "Gestalt — Similarity", principleDetail: "Similarity creates expectation. When outline = inactive and filled = active, users build this mental model after one exposure. Visual consistency encodes meaning so users don't have to remember — they see and know. That's the goal of every icon system." },
      C: { story: "Color worked for sighted users but failed for the 8% with color blindness. Red/green active states became invisible. An accessibility complaint arrived within 3 days.", lesson: "Never use color as the only signal for state. It excludes users who cannot distinguish colors.", principle: "Accessibility & WCAG AA", principleDetail: "WCAG 1.4.1 — Use of Color: color must not be the only visual means of conveying information. Combine color with shape, icon style, or text to ensure all users can perceive state changes. Color blindness affects 8% of males — it's not a rare edge case." },
    },
  },
  {
    id: 18, chapter: 4,
    title: "The Pricing Page Problem",
    narration:
      "The new pricing page has three tiers. Analytics show users read everything but don't click. Eye tracking shows users can't identify which plan is recommended.\n\nEvery plan looks equally important. How do you fix it?",
    choices: [
      { id: "A", text: "Add a 'RECOMMENDED' text label to the middle tier.", delta: 5 },
      { id: "B", text: "Make the middle tier visually distinct — larger, elevated, brighter border, badge. Make it impossible to miss.", delta: 15 },
      { id: "C", text: "Remove the other two plans to force focus on the recommended one.", delta: -10 },
    ],
    consequences: {
      A: { story: "The text label helped slightly but competed with other labels. Users still gave equal time to all three plans. The label was too subtle to break the visual equality.", lesson: "When everything gets a label, no label stands out.", principle: "Von Restorff Effect", principleDetail: "The Von Restorff Effect (Isolation Effect): an item that differs significantly from others will be noticed and remembered more. A text label in the same style as other text is not different enough. Visual distinction must be dramatic to trigger the effect." },
      B: { story: "Eye tracking on the updated page showed 70% of attention going to the middle tier within 2 seconds. Clicks on the recommended plan increased 41%. The plan practically chose itself.", lesson: "The eye goes to what's different. Make the right thing the most different thing on the page.", principle: "Von Restorff Effect", principleDetail: "The Von Restorff Effect says distinctiveness drives attention. On a pricing page, elevation, size, color, and a badge all signal 'this one is different.' Combine multiple distinctiveness signals for maximum effect. The goal isn't to trick — it's to guide." },
      C: { story: "Removing options confused users who needed to compare. 'Where's the basic plan?' became a top support question. Conversion dropped as users left to compare elsewhere.", lesson: "Choice is not always the enemy. Sometimes users need to compare in order to decide.", principle: "Hick's Law", principleDetail: "Hick's Law applies when choices are confusing or equal — not when they're helping users calibrate. Pricing comparisons need contrast to work. Removing reference points removes the reason the recommended option feels like a good deal." },
    },
  },
  {
    id: 19, chapter: 4,
    title: "The Hero Section Confusion",
    narration:
      "The marketing team designed a hero section with a product screenshot overlaid on a busy lifestyle photo. The product is important. The photo is important. But combined, neither reads clearly.\n\nUsers say they don't know where to focus. How do you fix it?",
    choices: [
      { id: "A", text: "Add a text label saying 'This is our product' below the screenshot.", delta: -10 },
      { id: "B", text: "Darken or blur the background photo so the product screenshot reads clearly as foreground.", delta: 15 },
      { id: "C", text: "Remove the lifestyle photo entirely. Product on a clean background.", delta: 5 },
    ],
    consequences: {
      A: { story: "The label helped slightly but the visual confusion remained. Text labels cannot fix a structural visual hierarchy problem. Eye tracking showed users still split attention equally.", lesson: "Text labels cannot fix visual hierarchy problems. Structure must do the work.", principle: "Gestalt — Figure-Ground", principleDetail: "Gestalt's Figure-Ground principle: the brain constantly separates visual fields into subject (figure) and background (ground). When both compete at the same visual weight, the scene is ambiguous. You cannot label your way out of this — you must separate the layers visually." },
      B: { story: "A semi-transparent dark overlay on the background photo made the product screenshot immediately read as figure against ground. Users understood the page structure within 1 second. Both elements coexisted.", lesson: "The brain needs a clear figure and a clear ground. Give it one.", principle: "Gestalt — Figure-Ground", principleDetail: "Figure-Ground separation is fundamental to visual perception. Without it, the brain expends energy resolving the ambiguity — which feels like confusion. Techniques: darken or blur the background, add separation, increase contrast. The product should be unmistakably figure." },
      C: { story: "Clarity improved massively but the page felt cold and corporate. A/B testing showed the clean version was clearer, but the lifestyle version was more trustworthy. The data suggested keeping both — correctly separated.", lesson: "Eliminating the competing element is different from solving the hierarchy problem.", principle: "Gestalt — Figure-Ground", principleDetail: "Sometimes the right answer is not to remove the competing element but to properly subordinate it. A blurred or dimmed background photo preserves emotional warmth while allowing the product to read as foreground. Solve the hierarchy problem — don't delete half the design." },
    },
  },
  {
    id: 20, chapter: 4,
    title: "The CTA Button Shrink",
    narration:
      "The PM wants to reduce the 'Create Project' button from 48px to 24px height to save space in a dense interface. Engineering says it's easy.\n\nThis is a primary action users hit multiple times per session. What do you say?",
    choices: [
      { id: "A", text: "Approve it. Small buttons look cleaner and save space.", delta: -10 },
      { id: "B", text: "Reject it. 48px is the minimum comfortable touch and click target for primary actions.", delta: 15 },
      { id: "C", text: "Compromise at 36px — slightly smaller but still functional.", delta: 5 },
    ],
    consequences: {
      A: { story: "Miss-click rates on the button tripled. On mobile, users averaged 2.3 attempts to hit it. Session recordings showed visible frustration. The 'Create Project' button went from invisible to a pain point.", lesson: "Small targets feel clean in mockups and cruel in real use.", principle: "Fitts's Law", principleDetail: "Fitts's Law: the time to hit a target is a function of its size and distance from the cursor. Smaller targets take exponentially longer to click accurately — especially on mobile with imprecise finger input. Apple's HIG and Google's Material Design both specify minimum 44–48px touch targets for exactly this reason." },
      B: { story: "The primary action stayed fast and reliable. Users created projects without friction. You saved pixel budget elsewhere without touching the most important button.", lesson: "Targets should be sized by importance. The most-used action deserves the biggest, easiest-to-hit target.", principle: "Fitts's Law", principleDetail: "Fitts's Law tells you to prioritize your most important and frequently used controls with the largest, closest targets. Primary actions like 'Create', 'Save', and 'Submit' should be the easiest things to hit on the screen. Design their size accordingly." },
      C: { story: "Miss-click rates still increased 60% on mobile. A partial fix is a different failure mode — 36px is too small for a primary action on touch devices.", lesson: "Compromising on touch target size is not a design compromise. It is a usability failure at half price.", principle: "Fitts's Law", principleDetail: "Touch targets follow the physics of fingers, not the aesthetics of screens. A fingertip is approximately 9mm wide. At 36px (about 9.5mm), you're operating at the edge of comfortable accuracy. The 44–48px minimum exists because 36px causes measurable miss-click increases in research." },
    },
  },

  // ── CHAPTER 5: The Psychology of Decisions ─────────────────────────────────
  {
    id: 21, chapter: 5,
    title: "The Cancellation Flow",
    narration:
      "A user is cancelling their subscription. The current flow is frictionless — one click, done. Leadership wants to add 3 screens of retention offers before they can cancel.\n\nWhat do you design?",
    choices: [
      { id: "A", text: "Add all 3 retention screens. Make them earn the cancel.", delta: -10 },
      { id: "B", text: "Add one clean 'Before you go' screen with a genuine offer and a clear cancel option. Then let them go.", delta: 15 },
      { id: "C", text: "Keep it one click. If they want to go, let them go gracefully.", delta: 5 },
    ],
    consequences: {
      A: { story: "Cancellation rates dropped 8% short term. But a Reddit thread titled 'How to actually cancel Launchly' got 200 upvotes. Trust scores dropped. New users mentioned it in trials as a reason not to commit.", lesson: "Retention through friction is borrowed time. Users remember how you let them leave.", principle: "Peak-End Rule", principleDetail: "The Peak-End Rule (Kahneman): people judge an experience by its most intense moment and its ending — not the average. A painful cancellation flow becomes the dominant memory of using your product. Users who leave badly don't come back and don't recommend you. The ending matters as much as everything before it." },
      B: { story: "Some users took the offer. Most completed the cancellation. But months later, 22% of cancelled users resubscribed — versus 8% industry average. They left well. They came back.", lesson: "A graceful goodbye is the best marketing for a return.", principle: "Peak-End Rule", principleDetail: "End experiences well. Users who feel respected on their way out retain a positive emotional memory of the product. That memory is what drives reactivation. The Peak-End Rule isn't just about avoiding negative peaks — it's about engineering positive endings deliberately." },
      C: { story: "Users left without friction, which was better than dark patterns. But you missed an opportunity to understand why they left or offer genuine value. Some would have stayed for the right offer.", lesson: "Frictionless cancellation is respectful. A genuine conversation is better.", principle: "Peak-End Rule", principleDetail: "Frictionless exits are ethical and user-respecting. But a single honest retention moment — not manipulative, not desperate — can surface value the user forgot. The distinction is intent: serving the user versus serving the metric." },
    },
  },
  {
    id: 22, chapter: 5,
    title: "The Pre-Selected Plan",
    narration:
      "The signup flow asks users to choose a plan before they've experienced the product. Finance wants to pre-select the most expensive plan to increase revenue.\n\nWhat do you recommend?",
    choices: [
      { id: "A", text: "Pre-select the most expensive plan. Most users won't change it.", delta: -10 },
      { id: "B", text: "Pre-select the most appropriate plan for most users based on their stated needs.", delta: 15 },
      { id: "C", text: "Don't pre-select anything. Make users actively choose.", delta: 5 },
    ],
    consequences: {
      A: { story: "Short-term revenue increased. Three months later, churn on the expensive plan was 3x higher. Users felt tricked into a plan they didn't need. Refund requests surged.", lesson: "Defaults that exploit users create revenue you have to return later.", principle: "Default Effect", principleDetail: "The Default Effect: people tend to accept whatever option is pre-selected, especially for complex decisions. Designers have enormous power over outcomes through defaults. With that power comes responsibility — defaults should serve users, not exploit their inertia." },
      B: { story: "You asked one onboarding question: 'How big is your team?' Small teams defaulted to Basic, medium to Pro. Users on the right plan retained 40% better and upgraded organically as they grew.", lesson: "Defaults done right serve users first — and then the business.", principle: "Default Effect", principleDetail: "The ethical use of the Default Effect: pre-select the option most likely to serve the user's actual needs. Done right, it reduces friction while serving the business through reduced churn. It requires knowing your users — but that's the designer's job." },
      C: { story: "Forcing active choice led to 34% of users picking randomly or abandoning the flow entirely. Decision paralysis on plan selection was creating drop-off before trial even started.", lesson: "Sometimes the kindest design removes the decision entirely.", principle: "Hick's Law", principleDetail: "Hick's Law applies at plan selection too. Forcing a cold, uninformed choice between plans causes decision fatigue and abandonment. A smart default based on the user's context is more respectful than forcing them to choose what they don't yet understand." },
    },
  },
  {
    id: 23, chapter: 5,
    title: "The Scarcity Banner",
    narration:
      "The PM wants to add an 'Only 3 seats left at this price!' banner to the upgrade flow. You check the data — there are unlimited seats. It's fabricated urgency.\n\nWhat do you do?",
    choices: [
      { id: "A", text: "Ship it. Urgency increases conversions. It's common practice.", delta: -10 },
      { id: "B", text: "Refuse. Fake scarcity is deceptive and erodes trust when discovered.", delta: 15 },
      { id: "C", text: "Propose real urgency: 'Introductory pricing ends Friday' — if there's a real deadline.", delta: 10 },
    ],
    consequences: {
      A: { story: "Conversions went up 9%. Three months later a user screenshotted the banner appearing for the fifth consecutive week. The thread went viral. Launchly was featured in a dark patterns newsletter.", lesson: "Fake urgency works once. Then it destroys trust permanently.", principle: "Dark Patterns", principleDetail: "Fabricated scarcity is one of the most well-documented dark patterns. Users increasingly recognise it — and when they do, they don't just stop trusting that message. They stop trusting the entire product. The FTC has begun issuing fines for false urgency claims. The short-term conversion gain is a long-term trust liability." },
      B: { story: "The PM pushed back. You stood firm. The feature wasn't shipped. The next quarter's honest 'free trial, cancel anytime' messaging tested better anyway. Trust is a conversion rate.", lesson: "Honest design is a long-term conversion strategy.", principle: "Dark Patterns", principleDetail: "Ethical design builds the foundation for sustainable conversion. Users who trust a product convert better, stay longer, and recommend more. Fake urgency borrows from future trust. Honest urgency — real deadlines, real limits — works just as well without the liability." },
      C: { story: "A real pricing deadline was set for end of quarter. The banner reflected it accurately. Conversion bumped 14%. Users who converted mentioned the offer in onboarding surveys. Real urgency works because it's true.", lesson: "Urgency is powerful when it is real. It is a design principle, not a deception.", principle: "Nudge Theory", principleDetail: "Nudge Theory (Thaler and Sunstein): small design interventions guide behaviour without restricting choice. Real deadlines and honest limits are legitimate nudges that work with users' natural sense of timing. The key word is real — nudges stop working and start harming when fabricated." },
    },
  },
  {
    id: 24, chapter: 5,
    title: "The Social Proof Question",
    narration:
      "Marketing wants to add a testimonials section to the homepage. They have 200 reviews and want to show all of them in a rotating carousel.\n\nYou think there's a smarter approach. What do you recommend?",
    choices: [
      { id: "A", text: "200 reviews in a carousel. Volume builds trust.", delta: -10 },
      { id: "B", text: "3–5 highly specific testimonials from recognisable user types, with real numbers and outcomes.", delta: 15 },
      { id: "C", text: "Just show the average star rating and total review count. Numbers do the work.", delta: 5 },
    ],
    consequences: {
      A: { story: "Users didn't interact with the carousel at all. Eye tracking showed 94% skipped it entirely. 200 reviews signalled volume but delivered no persuasion — they blurred into noise.", lesson: "The credibility of social proof comes from specificity, not quantity.", principle: "Social Proof", principleDetail: "Social Proof (Cialdini): people look to others' behaviour to guide their own decisions. But 200 generic reviews create no empathy. Three specific reviews from users who are exactly like me — with measurable outcomes — create identification and belief. Quality always beats quantity." },
      B: { story: "'We reduced onboarding time by 40% in our first week.' — Sarah, Design Lead at a 50-person startup. Users in that segment clicked that testimonial 3x more than any other. Conversion from that segment increased 28%.", lesson: "The best testimonial is one where the reader thinks: that is exactly me.", principle: "Social Proof", principleDetail: "Effective social proof is specific, relatable, and outcome-focused. 'I love it!' says nothing. '40% faster onboarding for teams of 20–50' says everything to the right reader. Use testimonials that match your key user segments and feature real, measurable results." },
      C: { story: "Star ratings and counts helped some users but didn't persuade. Cold numbers answer 'is it good?' but not 'is it good for me?' High-consideration purchases need narrative social proof, not just aggregates.", lesson: "Numbers tell. Stories persuade.", principle: "Social Proof", principleDetail: "Aggregate ratings build baseline credibility. Specific testimonials build personal relevance. For high-consideration SaaS products, you need both — but the narrative does the persuasion. Use ratings to establish trust, stories to drive conversion." },
    },
  },
  {
    id: 25, chapter: 5,
    title: "The Trial Banner",
    narration:
      "The product team wants to add a 'Your trial ends in 3 days' persistent banner that stays at the top of the app and cannot be dismissed until the user upgrades or the trial ends.\n\nIs this a nudge or a dark pattern?",
    choices: [
      { id: "A", text: "Ship the persistent banner. Users need to know their trial status.", delta: 5 },
      { id: "B", text: "Show it once per session clearly, dismissable. Respect their session after that.", delta: 15 },
      { id: "C", text: "Don't show it at all. If users want to upgrade they will.", delta: -10 },
    ],
    consequences: {
      A: { story: "Users found the persistent banner condescending and claustrophobic. Power users blocked it with browser extensions. App store reviews mentioned 'constant nagging.' Trial-to-paid conversion dropped as users churned early in frustration.", lesson: "Persistent pressure is not a nudge. It is a nag — and nags alienate.", principle: "Nudge Theory", principleDetail: "A nudge preserves choice and doesn't restrict the user's experience. A persistent, undismissable reminder removes user control and becomes coercion. The line between nudge and manipulation: can the user reasonably proceed without complying? Undismissable banners fail this test." },
      B: { story: "A clean, dismissable trial reminder at the start of each session converted 18% better than the persistent banner. Users felt informed, not pressured. One prompt per session felt like a helpful reminder, not a hostage situation.", lesson: "The best nudges are noticed, then forgotten. The worst nudges cannot be forgotten.", principle: "Nudge Theory", principleDetail: "Effective nudges are timely (at the right moment), relevant (to the decision at hand), and non-coercive (users can proceed without complying). A once-per-session, dismissable reminder respects user autonomy while keeping trial status visible. That is a nudge. Persistent unavoidable reminders are manipulation." },
      C: { story: "23% of users forgot their trial was ending and were surprised by the unexpected cutoff or charge. Support tickets about unexpected billing surged. Some users felt deceived even though trial terms were clear at signup.", lesson: "Not communicating is also a design decision — and it has consequences.", principle: "Visibility of System Status", principleDetail: "Nielsen's first heuristic: keep users informed about system state. Trial status is important system state. Not communicating it creates surprise — and surprise in billing contexts erodes trust immediately. Find the ethical middle ground: inform without coercing." },
    },
  },

  // ── CHAPTER 6: Visual Design Craft ─────────────────────────────────────────
  {
    id: 26, chapter: 6,
    title: "The Whitespace Fight",
    narration:
      "The engineering team says the new settings page 'wastes space' — there's generous whitespace between sections. They want to tighten it up and show more content above the fold.\n\nDo you defend the whitespace?",
    choices: [
      { id: "A", text: "Reduce the whitespace. Show more content. Engineers have a point.", delta: -10 },
      { id: "B", text: "Defend it. Whitespace is doing structural work — it's how users understand the layout.", delta: 15 },
      { id: "C", text: "Compromise: reduce spacing by 30% but keep major structural separations.", delta: 5 },
    ],
    consequences: {
      A: { story: "More content above the fold, but usability testing showed a 28% increase in task errors. Users couldn't distinguish sections and clicked the wrong controls more. 'Dense' was not 'efficient.'", lesson: "Whitespace isn't empty. It is structure you can see.", principle: "Law of Pragnanz", principleDetail: "The Law of Pragnanz (simplicity): the brain interprets visual information in the simplest possible way. Whitespace gives the brain room to parse groups and hierarchy. Remove it and the brain works harder — causing errors, fatigue, and slower task completion. Space is not waste." },
      B: { story: "You ran a side-by-side usability test — dense vs. spaced. Task time and error rate told the story. The engineers accepted the data. The whitespace stayed.", lesson: "Whitespace is not decoration. It is information architecture made visible.", principle: "Law of Pragnanz", principleDetail: "Whitespace communicates relationship, hierarchy, and priority without adding visual noise. A tight layout may contain more content but less structure — making it harder to use. The Law of Pragnanz tells us simpler, more organised visual fields are processed faster and with fewer errors." },
      C: { story: "A moderate reduction was acceptable. Some structural whitespace was preserved. Task performance dropped slightly but not critically. An imperfect compromise that kept relationships readable.", lesson: "Compromise on whitespace carefully. Every pixel of space carries meaning.", principle: "Law of Pragnanz", principleDetail: "When whitespace must be reduced, protect the most structurally important spacing first — between major sections and around primary actions. Reduce within-section spacing last. The brain needs the macro structure to read the layout." },
    },
  },
  {
    id: 27, chapter: 6,
    title: "The Colour Convention",
    narration:
      "The design uses red for the 'New Feature' badge and green for errors confirmed fixed. A user emails: 'I keep thinking there's an error when I see the red badge.'\n\nHow do you respond?",
    choices: [
      { id: "A", text: "The user is wrong. Red for new features is a valid creative choice.", delta: -10 },
      { id: "B", text: "Fix it immediately. Red means danger or error universally. Don't fight convention.", delta: 15 },
      { id: "C", text: "Add a legend explaining what the colours mean.", delta: 5 },
    ],
    consequences: {
      A: { story: "Three more users reported the same confusion within a week. A support article was written explaining the colour system. Users should not need articles to understand colour choices in a UI.", lesson: "Colour has meanings built by years of convention. Fighting them costs user trust.", principle: "Colour Theory & Convention", principleDetail: "Colours carry semantic weight from decades of convention: red = danger or error, green = success, yellow = warning, blue = information. Users process colour before reading text. Creative colour use that contradicts convention creates confusion faster than any other design mistake." },
      B: { story: "After the fix — blue for 'New Feature', orange for 'Fixed but pending review' — confusion reports dropped to zero. The colours now worked with users' expectations instead of against them.", lesson: "Colour conventions exist because they work. Use them.", principle: "Colour Theory & Convention", principleDetail: "Use colour with semantic intent: red for errors and danger, green for success and confirmation, yellow and amber for warnings, blue for information. These are not aesthetic rules — they are cognitive shortcuts users rely on without thinking." },
      C: { story: "90% of users never read the legend. The confusion persisted. Users should not need instructions to understand colour in a UI — if they do, the colour choices are wrong.", lesson: "If your colour system requires a legend, the colours are doing the wrong job.", principle: "Recognition Rather Than Recall", principleDetail: "Colour should enable recognition, not demand recall. If users must remember what your custom colour system means, you've replaced a cognitive shortcut with a cognitive load. Use conventional colours that users already know, so zero memory is spent on interpretation." },
    },
  },
  {
    id: 28, chapter: 6,
    title: "The Abstract Icon",
    narration:
      "A new feature needs an icon for 'Workspace Templates.' A designer suggests a creative abstract icon — layered geometric shapes. It looks elegant in isolation.\n\nYou test it with 10 users. Zero of them can identify what the icon represents without a label.",
    choices: [
      { id: "A", text: "Ship the abstract icon. It's beautiful and users will learn it over time.", delta: -10 },
      { id: "B", text: "Always pair icon with text label. The icon alone must never be required to communicate.", delta: 15 },
      { id: "C", text: "Find a more literal icon — like a grid or copy icon — that's less elegant but more recognisable.", delta: 10 },
    ],
    consequences: {
      A: { story: "'Workspace Templates' became the least-used feature in the product. Session recordings showed users hovering on the icon and not clicking. The feature wasn't bad — it was invisible.", lesson: "A feature that cannot be found is a feature that does not exist.", principle: "Icon Clarity & Metaphor", principleDetail: "Icons communicate through shared metaphor — the save icon is a floppy disk, the home icon is a house. Abstract icons require learning. Learning requires motivation. Most users won't develop that motivation. Unrecognised icons become invisible, driving usage to zero regardless of feature quality." },
      B: { story: "With a text label, 'Workspace Templates' usage increased 3x in the first month. The icon reinforced the label; the label rescued the icon. Together they worked.", lesson: "Icons and labels are partners. One without the other is half a communication.", principle: "Icon Clarity & Metaphor", principleDetail: "The rule: if an icon must stand alone, it must be universally recognisable (home, search, close, settings). Novel features need labels. An icon and label pairing is always safer and more accessible than an icon alone. Clarity is more important than elegance in navigation." },
      C: { story: "A grid icon was more recognisable than the abstract shape. Usage improved from near-zero to modest. Still lower than it could have been with a label added. The right icon helps — but a label solves.", lesson: "A better icon is an improvement. A label is a solution.", principle: "Icon Clarity & Metaphor", principleDetail: "Choose icons that use established metaphors or strong visual analogies. But even the best icon will underperform a label for non-universal features. Use the best icon you can find — then add a label anyway." },
    },
  },
  {
    id: 29, chapter: 6,
    title: "The Animation Decision",
    narration:
      "The team wants to add page transition animations — slide-in, fade-out, card flips. It looks impressive in the prototype.\n\nYou know some users are sensitive to motion, and animations add perceived delay. What do you recommend?",
    choices: [
      { id: "A", text: "Ship the animations. They add polish and look professional.", delta: -10 },
      { id: "B", text: "Ship subtle animations but implement prefers-reduced-motion to disable them for users who need it.", delta: 15 },
      { id: "C", text: "Skip animations entirely. Performance and accessibility matter more.", delta: 5 },
    ],
    consequences: {
      A: { story: "Three users emailed reporting nausea and dizziness from the card flip animations. One had a vestibular disorder. For some users, motion doesn't add polish — it causes genuine physical harm.", lesson: "Animation that harms one user is a failed animation, however beautiful.", principle: "Motion & Animation Safety", principleDetail: "Vestibular disorders affect 35% of adults over 40 and many younger users. Large motion animations, parallax effects, and flashing content can trigger dizziness, nausea, and migraines. WCAG 2.3.3 and the prefers-reduced-motion CSS media query exist specifically for this. Ignoring them is an accessibility failure." },
      B: { story: "Animations shipped. Users with prefers-reduced-motion enabled got clean instant transitions. Users who loved animation got it. Nobody was harmed. The polish improved the product for those who wanted it.", lesson: "Animation is a feature. Like all features, it should be opt-outable.", principle: "Motion & Animation Safety", principleDetail: "prefers-reduced-motion is a system-level OS setting users enable when they need it. Respecting it in CSS: @media (prefers-reduced-motion: reduce) { * { animation: none; transition: none; } }. This single rule makes animations optional, accessible, and ethical. Ship this as standard practice." },
      C: { story: "The product felt functional but flat. Users described it as 'clinical.' Subtle animation could have improved perceived performance and state communication without harm. Complete absence of motion removed useful feedback.", lesson: "The answer to animation risk is not no animation — it is safe animation.", principle: "Motion & Animation Safety", principleDetail: "Motion communicates: state changes, loading, transitions, feedback. Removing it entirely can make interfaces harder to understand. The goal is purposeful, subtle motion that respects user preferences — not the binary of flashy animations versus none at all." },
    },
  },
  {
    id: 30, chapter: 6,
    title: "The Type Scale",
    narration:
      "Reviewing the UI, body text is 12px across the entire product. Some headings are only 13px. Visual hierarchy is almost non-existent — everything looks the same size.\n\nYou propose a proper type scale. The PM says 'our users are technical — they don't need big headings.'",
    choices: [
      { id: "A", text: "Keep 12px. The PM knows the users.", delta: -10 },
      { id: "B", text: "Implement a proper modular type scale. 14px body, 18–32px for heading levels.", delta: 15 },
      { id: "C", text: "Increase everything by 2px uniformly. Slightly bigger but no real hierarchy created.", delta: 5 },
    ],
    consequences: {
      A: { story: "A third-party UX audit showed users spent 40% more time finding section headings than in comparable products. The small text wasn't 'technical' — it was exhausting. Nobody prefers small text.", lesson: "Technical users still have eyes. Nobody prefers small text over readable text.", principle: "Typographic Hierarchy", principleDetail: "Typographic hierarchy guides the eye through content in order of importance. Without it, users scan linearly rather than jumping to relevant sections — significantly increasing cognitive load. This affects all users, technical or not. Type size is not a stylistic preference — it is a navigation tool." },
      B: { story: "After the type scale was implemented, users navigated to their target sections 35% faster. The product suddenly felt 'more professional' in reviews — not because of anything new, just because text hierarchy made it readable.", lesson: "Typography isn't decoration. It is the navigation system for your content.", principle: "Typographic Hierarchy", principleDetail: "A modular type scale creates consistent, mathematically-related sizes (e.g. 14, 18, 24, 32px using a 1.25 ratio). Each level communicates relative importance. Users don't consciously read typography — they feel it. Good type hierarchy reduces cognitive effort and increases comprehension speed." },
      C: { story: "Everything got slightly bigger but nothing got relatively more important. Hierarchy requires contrast between levels, not just size increase. The ratio between heading and body is what creates structure.", lesson: "Size increase without ratio change creates no hierarchy — just bigger clutter.", principle: "Typographic Hierarchy", principleDetail: "Hierarchy is created by contrast between levels, not absolute size. Body at 12px with a heading at 13px: no hierarchy. Body at 14px with a heading at 24px: clear hierarchy. The ratio matters more than the absolute value." },
    },
  },

  // ── CHAPTER 7: Research & Mental Models ────────────────────────────────────
  {
    id: 31, chapter: 7,
    title: "The Navigation Overhaul",
    narration:
      "Launchly is planning a major navigation overhaul. The PM wants to ship without user testing — 'We know our users by now.'\n\nDo you ship without testing?",
    choices: [
      { id: "A", text: "Ship it. The team knows the product well enough.", delta: -10 },
      { id: "B", text: "Run a 5-person usability test before shipping. One week delay.", delta: 15 },
      { id: "C", text: "Ship to 5% of users and watch the data before full rollout.", delta: 10 },
    ],
    consequences: {
      A: { story: "The navigation change confused 34% of power users who had memorised the old structure. Rage clicks spiked. Three users published blog posts. The team spent the next month on hotfixes.", lesson: "'We know our users' is the most dangerous assumption in product design.", principle: "Mental Models", principleDetail: "Mental models are the internal representations users build of how your product works. When you change navigation, you're asking users to rebuild their model. What makes sense to the team is not what makes sense to the user. Test before assuming." },
      B: { story: "Five users found the new 'Settings' location unintuitive. A one-hour fix before launch prevented a week of hotfixes. The test found what 3 weeks of internal review missed.", lesson: "5 users find 80% of usability problems. Test before you ship.", principle: "Usability Testing", principleDetail: "Nielsen's research shows 5 users uncover approximately 85% of a product's usability problems at minimal cost. After 5 users you hit diminishing returns. The point isn't comprehensive coverage — it's early signal. One week of testing prevents months of remediation." },
      C: { story: "The 5% rollout caught the Settings confusion. Rollback was clean. The fix was validated with another 5% before full launch. Two-week delay, zero public incident.", lesson: "Real usage data at small scale is the best usability test you have.", principle: "Staged Rollouts", principleDetail: "Staged rollouts with behavioural monitoring — rage clicks, support tickets, error rates — are a form of real-world usability testing at scale. Use both approaches: test before shipping, then validate with staged rollout." },
    },
  },
  {
    id: 32, chapter: 7,
    title: "The Interview Refusal",
    narration:
      "You want to run user interviews to understand why a core feature has low adoption. The PM says 'we have analytics — we know what users are doing.'\n\nYou think you need to understand why. How do you respond?",
    choices: [
      { id: "A", text: "Accept it. Analytics should be enough.", delta: -10 },
      { id: "B", text: "Push back. Quantitative tells you what. Qualitative tells you why. You need both.", delta: 15 },
      { id: "C", text: "Run a quick survey instead — faster than interviews, more insight than pure analytics.", delta: 5 },
    ],
    consequences: {
      A: { story: "You optimised the button based on analytics. Click-through improved. Feature adoption didn't. The analytics told you users weren't clicking. Interviews would have told you users didn't understand the value. Two completely different problems.", lesson: "Analytics tells you where users stumble. Interviews tell you why they fall.", principle: "Usability Testing", principleDetail: "Quantitative data shows patterns and magnitudes: '34% of users drop off at step 3.' Qualitative data shows causes and context: 'I don't understand what Connect Workspace means.' Both are necessary. Neither replaces the other." },
      B: { story: "Five interviews revealed that users didn't adopt the feature because they didn't understand the term 'workspace' — Launchly's teams called it 'projects.' A copy change. One week. Adoption increased 45%.", lesson: "The answer was in the language, not the layout. Analytics would never have found it.", principle: "Mental Models", principleDetail: "Mental models include the language users use to understand their work. If your product's terminology doesn't match their vocabulary, they experience cognitive friction even when the UX is perfect. User interviews surface vocabulary mismatches that analytics are blind to." },
      C: { story: "The survey revealed users were 'confused' but couldn't say by what. Surveys capture reactions but rarely causes. The root cause needed follow-up questions — the kind only a live conversation allows.", lesson: "Surveys scale research. Interviews understand it.", principle: "Research Before Redesign", principleDetail: "Surveys validate hypotheses at scale. Interviews generate the hypotheses. Run interviews first to understand, then surveys to validate. Using surveys as a shortcut for interviews gives you data without insight." },
    },
  },
  {
    id: 33, chapter: 7,
    title: "The Dark Mode Request",
    narration:
      "Users are requesting dark mode. Before committing to 6 weeks of engineering, you interview 8 users. Their actual reason: late-night use causes eye strain.\n\nWhat do you do with this insight?",
    choices: [
      { id: "A", text: "Ship dark mode exactly as requested. That's what users asked for.", delta: 5 },
      { id: "B", text: "Explore the actual job: reduce eye strain at night. Consider dark mode AND scheduled brightness reduction AND system dark mode support.", delta: 15 },
      { id: "C", text: "Tell users their real need is eye strain and don't ship dark mode.", delta: -10 },
    ],
    consequences: {
      A: { story: "Dark mode shipped and users were happy. But 30% of users who enabled it then disabled it — they found it jarring during daytime use. A scheduled auto-switch was the missing piece they actually needed.", lesson: "Give users what they ask for. Then give them what they need.", principle: "Jobs-to-be-Done", principleDetail: "Jobs-to-be-Done: users hire products to do jobs. The job here isn't 'have dark mode' — it's 'be comfortable using the app late at night.' Dark mode solves that job partially. Scheduled appearance (auto-switch at sunset) solves it completely. Understanding the job reveals better solutions than the requested feature." },
      B: { story: "You shipped dark mode with scheduled auto-switch and honoured system dark mode settings. Users rated it as the best implementation they'd seen. Reviews called it 'thoughtful.'", lesson: "The job is never the feature. The job is the outcome users need.", principle: "Jobs-to-be-Done", principleDetail: "JTBD reveals that users ask for solutions, not outcomes. When someone requests dark mode, they're telling you the solution they think they need. Your job is to understand the outcome — comfortable night-time use — then build the solution that achieves it most completely." },
      C: { story: "Users felt ignored and talked down to. 'Launchly told me I don't need what I asked for' became a tweet. Requests escalated. You'd solved the research question but destroyed the user relationship.", lesson: "Understanding users' real needs doesn't mean overriding their expressed preferences.", principle: "Jobs-to-be-Done", principleDetail: "JTBD is a research lens, not a veto power. Discovering the underlying job helps you build a better solution — it doesn't mean dismissing what users asked for. Always deliver the expressed request as a baseline. Use job understanding to add the better layer on top." },
    },
  },
  {
    id: 34, chapter: 7,
    title: "The Research Presentation",
    narration:
      "You've completed 12 user interviews. The insights are rich but messy. You need to present to the leadership team in 48 hours.\n\nHow do you synthesise and present?",
    choices: [
      { id: "A", text: "Share the raw interview transcripts. Leadership can draw their own conclusions.", delta: -10 },
      { id: "B", text: "Affinity map the findings, identify 3–4 key themes, pair each with a representative quote and clear implication.", delta: 15 },
      { id: "C", text: "Write a one-page personal summary of your main takeaways.", delta: 5 },
    ],
    consequences: {
      A: { story: "Leadership received 180 pages of transcripts. Nobody read them. At the meeting, everyone had different takeaways based on the two quotes they'd skimmed. The research created more debate than alignment.", lesson: "Undigested research is raw data, not insight. The designer's job is the synthesis.", principle: "Affinity Mapping", principleDetail: "Affinity mapping is the process of grouping qualitative data into themes by discovering natural relationships between findings. Without synthesis, individual quotes compete and contradict. With synthesis, patterns emerge and evidence stacks. Leadership needs themes and implications, not transcripts." },
      B: { story: "The presentation showed 4 themes, each with 2–3 supporting quotes and one clear implication. Leadership aligned in 30 minutes. 'What do we do with this?' was answered before they asked it.", lesson: "Research becomes valuable when synthesised into decisions.", principle: "Affinity Mapping", principleDetail: "Affinity mapping process: write each insight on a separate note, group similar notes, name the groups, identify the implications of each group. The result is a structured picture of user reality that translates directly to design decisions. Synthesis turns volume into clarity." },
      C: { story: "Your summary was clear but felt like one person's interpretation. Leadership asked 'how do we know this is representative?' You had no way to show your reasoning. The research felt anecdotal.", lesson: "Personal synthesis needs to show its work. Affinity maps show the work.", principle: "Affinity Mapping", principleDetail: "When leadership can see that 9 of 12 users mentioned 'confusing terminology', the finding feels evidential. When they see only your conclusion, it feels interpretive. Show the pattern, not just the conclusion." },
    },
  },
  {
    id: 35, chapter: 7,
    title: "The Terminology Gap",
    narration:
      "User research reveals that 'Workspace' — Launchly's core term — means different things to different users. Some call it 'project', some 'team', some 'account.'\n\nWhat do you recommend?",
    choices: [
      { id: "A", text: "Educate users on the correct terminology through tooltips and onboarding.", delta: -10 },
      { id: "B", text: "Redesign onboarding to bridge their language to Launchly's terminology at first use.", delta: 15 },
      { id: "C", text: "Change the product term to 'Project' since it's the most common user term.", delta: 5 },
    ],
    consequences: {
      A: { story: "Tooltips explaining 'Workspace means...' added friction to every session. Users still used their own terms in support tickets causing confusion. Teaching users your language is the most friction-heavy approach possible.", lesson: "Don't teach users your vocabulary. Learn theirs.", principle: "Mental Models", principleDetail: "Mental models include the language users use to understand their work. When your product's terminology doesn't match their vocabulary, every interaction requires translation — invisible cognitive overhead that accumulates into frustration. The product should speak the user's language, not teach them yours." },
      B: { story: "Onboarding now asked 'How do you organise your work?' and connected their language to the Launchly concept first. Onboarding completion improved 28%. Support tickets about 'workspace' dropped significantly.", lesson: "Meet users in their mental model before introducing yours.", principle: "Mental Models", principleDetail: "The best way to introduce a new product concept is to bridge from the user's existing mental model. Acknowledge their terminology, connect it to yours, then gently introduce yours in context. This reduces cognitive effort and creates a clear translation users can reference." },
      C: { story: "Changing to 'Project' helped most users but confused the 30% who used 'team' or 'account.' It also created ambiguity with another feature — actual task-level projects. Terminology changes cascade.", lesson: "Changing a core term is not a small decision. Every word is part of an interconnected system.", principle: "Consistency and Standards", principleDetail: "Changing one term requires changing every related term, UI element, documentation, and user expectation built around it. Before renaming a core concept, audit the full cost. Sometimes better onboarding is safer than a rename that breaks everything connected to it." },
    },
  },

  // ── CHAPTER 8: Systems & Scale ──────────────────────────────────────────────
  {
    id: 36, chapter: 8,
    title: "The Button Chaos",
    narration:
      "Launchly now has 6 designers. Reviewing recent work, you find 12 different button styles across the product. Every designer built their own. There is no source of truth.\n\nHow do you fix this?",
    choices: [
      { id: "A", text: "Send a style guide document to all designers and ask them to align manually.", delta: -10 },
      { id: "B", text: "Build a shared component library in Figma with documented usage rules. Make it the source of truth.", delta: 15 },
      { id: "C", text: "Do a full UI audit and manually update all 12 button variants to match one standard.", delta: 5 },
    ],
    consequences: {
      A: { story: "The document was bookmarked and ignored. Within 2 weeks, designer 7 had created button variant 13. Documents don't scale — systems do.", lesson: "Documentation that requires discipline fails at scale. Systems that make the right thing easy succeed.", principle: "Design Systems", principleDetail: "A design system is not a document — it's a shared, living infrastructure. Style guides fail because they require individual compliance and don't update automatically. A component library in Figma makes the right choice the only available choice. Constraints create consistency." },
      B: { story: "The Figma component library took 3 weeks to build but saved an estimated 40% of design time within 2 months. New designers onboarded in days. Every new screen was instantly consistent.", lesson: "Investment in systems returns compound interest. Work done once benefits every future decision.", principle: "Design Systems", principleDetail: "A design system is infrastructure for design decisions. Components, tokens, patterns, and usage rules codify the decisions you've already made so designers don't have to remake them. Good systems accelerate design, improve consistency, and simplify developer handoff." },
      C: { story: "The audit took 2 weeks and fixed the current state. But without a system, designer 7 added button variant 13 within the month. Audits fix the past. Systems prevent the future.", lesson: "Fixing instances without preventing recurrence is cleanup, not design systems.", principle: "Design Systems", principleDetail: "An audit solves the problem once. A design system prevents it from recurring. Both are valuable — but the system must come first. Without it, audits are a recurring cost with no end." },
    },
  },
  {
    id: 37, chapter: 8,
    title: "The Design Debt",
    narration:
      "Six months ago, a designer used a non-standard modal pattern to hit a deadline. Now it's in 8 different places in the product. Updating it is 3 days of engineering work.\n\nDo you fix it now or ship a new feature instead?",
    choices: [
      { id: "A", text: "Ship the new feature. Design debt can wait.", delta: -10 },
      { id: "B", text: "Fix the modal pattern first. Design debt compounds — the longer you wait, the more it costs.", delta: 15 },
      { id: "C", text: "Fix it in the component library so new work uses the right pattern, but don't retrofit the 8 existing instances yet.", delta: 5 },
    ],
    consequences: {
      A: { story: "The modal pattern was now in 14 places. A year later, fixing it took 9 days of engineering work — three times the original cost. The inconsistency had been present in 14% of user flows the entire time.", lesson: "Design debt is interest-bearing. Every sprint you wait, it costs more.", principle: "Design Debt", principleDetail: "Design debt accumulates when shortcuts are taken without a plan to repay them. Unlike technical debt, design debt also degrades user experience — inconsistencies erode trust, increase cognitive load, and create support tickets. Debt paid early costs less than debt paid late." },
      B: { story: "3 days of engineering work cleaned up 8 instances and prevented 6 more. Users experienced a consistent modal pattern. The new feature shipped the following week with no debt inherited.", lesson: "Paying design debt is not slowing down — it is accelerating the next sprint.", principle: "Design Debt", principleDetail: "Design debt repayment has a direct ROI: fewer QA issues, less engineering time on bug fixes, more consistent user experience, and faster future design because patterns are settled. Frame debt repayment to stakeholders as an investment in velocity, not a delay to features." },
      C: { story: "New work used the right pattern. Old work stayed inconsistent. Users now encountered two different modal patterns depending on which area they were in. The partial fix created a different consistency problem.", lesson: "Half-fixed inconsistency is still inconsistency. Patterns must be fully adopted to be effective.", principle: "Consistency and Standards", principleDetail: "Consistency requires universal adoption. A pattern that exists in the library but persists in old implementations creates a two-tier product where some flows feel polished and others feel legacy. Migrate all instances — in coordination with engineering — as the only complete solution." },
    },
  },
  {
    id: 38, chapter: 8,
    title: "The Power User Request",
    narration:
      "A power user segment requests a feature with 12 configuration options. Research shows 80% of users need only the default. Building all 12 would take 6 weeks.\n\nWhat do you recommend?",
    choices: [
      { id: "A", text: "Build all 12 options. Power users deserve powerful tools.", delta: 5 },
      { id: "B", text: "Build the smart default for 80% of users. Expose the 12 options for advanced users who actively seek them.", delta: 15 },
      { id: "C", text: "Don't build it. The complexity isn't worth it for a minority of users.", delta: -10 },
    ],
    consequences: {
      A: { story: "The feature shipped. 80% of users opened the settings panel, felt overwhelmed by 12 options, and closed it without changing anything. The cognitive cost was paid by users who didn't want it.", lesson: "Complexity shown to everyone serves no one well.", principle: "Tesler's Law", principleDetail: "Tesler's Law of Conservation of Complexity: every system has inherent complexity that cannot be removed — only managed. The designer's job is to absorb complexity so users don't have to. Surface sensible defaults; hide advanced configuration behind a deliberate action." },
      B: { story: "80% of users saw a clean interface with a smart default that just worked. Power users found the advanced panel and praised the depth. The feature served both segments without compromising either.", lesson: "The right default is a feature. Advanced options are also a feature. Both can coexist.", principle: "Tesler's Law", principleDetail: "Tesler's Law tells us complexity must live somewhere — in the product or in the user's experience. Good design absorbs it into the product through smart defaults and progressive disclosure. The advanced panel is always there; it is just never in the way." },
      C: { story: "The power user segment churned. They moved to a competitor that offered the configurability they needed. 20% of your highest-value users was not a minority to dismiss.", lesson: "Not building for a segment is a retention decision, not just a product decision.", principle: "User Segmentation", principleDetail: "Power users are often disproportionately valuable — higher LTV, advocates, and drivers of team adoption. Dismissing a feature because the majority doesn't need it without considering who does need it can mean losing your most valuable users." },
    },
  },
  {
    id: 39, chapter: 8,
    title: "The Handoff Problem",
    narration:
      "Designs are consistently being misimplemented — colours are off, spacing is wrong, components don't match specs. It's happening every sprint.\n\nWhat's the systemic fix?",
    choices: [
      { id: "A", text: "Review every implementation before it merges. Catch errors at the end.", delta: -10 },
      { id: "B", text: "Build a design token system — named colour, spacing, and type values — that engineers use directly. Reduce interpretation.", delta: 15 },
      { id: "C", text: "Have designers sit with engineers during implementation to answer questions in real time.", delta: 5 },
    ],
    consequences: {
      A: { story: "You caught errors but only after implementation was complete — meaning rework. Engineers resented late-stage feedback. Designers spent more time reviewing than designing. The problem recurred every sprint.", lesson: "Catching problems at the end is not a system. It is a tax on broken process.", principle: "Design Systems", principleDetail: "End-of-sprint design reviews are a symptom of missing upstream infrastructure. If engineers must interpret designs, errors are inevitable. The fix is upstream: tokens, specs, documented components. Make correct implementation the path of least resistance." },
      B: { story: "Design tokens pushed to a shared library meant engineers referenced exact values directly. No interpretation needed. Implementation errors dropped 78% in the first sprint. Design reviews became celebration rather than correction.", lesson: "Fewer decisions at implementation time means fewer opportunities for error.", principle: "Design Systems", principleDetail: "Design tokens are named variables for visual decisions: colours, spacing, type sizes, border radii. When engineers reference tokens like --color-primary and --spacing-lg rather than raw values, changes propagate automatically and interpretation errors disappear. Tokens are the connective tissue between design and engineering." },
      C: { story: "Pair design-implementation helped for the specific features covered but didn't scale. Designers could only sit with one engineer at a time. Other engineers still made the same mistakes. The bandwidth cost was unsustainable.", lesson: "Human oversight does not scale. Systems scale.", principle: "Component Reuse", principleDetail: "Real-time collaboration is valuable for complex, novel problems. Routine implementation of documented components should not require human oversight — that is a sign the documentation is insufficient. Build systems that enable correct implementation without designer supervision." },
    },
  },
  {
    id: 40, chapter: 8,
    title: "The Review Culture",
    narration:
      "Design reviews at Launchly have become brutal. Designers dread them. Feedback is harsh and personal. Junior designers are playing it safe — no risks, nothing original.\n\nYou are in a position to change the culture. What do you do?",
    choices: [
      { id: "A", text: "Keep it rigorous. High standards produce better design. Discomfort is part of the process.", delta: -10 },
      { id: "B", text: "Restructure reviews: lead with intent, critique the execution not the person, suggest alternatives not mandates.", delta: 15 },
      { id: "C", text: "Make reviews optional. Designers who want feedback can ask for it.", delta: -10 },
    ],
    consequences: {
      A: { story: "Junior designers stopped taking risks entirely. Safe, predictable work piled up. The 'high standards' culture was producing compliant design, not great design. Creativity requires psychological safety — and the team had none.", lesson: "Harsh critique protects existing standards. Psychological safety creates new ones.", principle: "Collaborative Design Process", principleDetail: "Psychological safety (Edmondson): the belief that you won't be punished for taking interpersonal risks — including sharing experimental work. Teams with psychological safety take more creative risks, learn faster, and produce more innovative outcomes. Brutal review cultures optimise for safety over creativity." },
      B: { story: "Reviews started with: 'Tell me what you were trying to achieve.' Designers began defending their choices rather than apologising for them. Within 2 months, experimental work appeared again. Risk-taking returned.", lesson: "Start with intent. Critique the gap between intent and execution — not the person's ability.", principle: "Collaborative Design Process", principleDetail: "Effective critique: (1) Understand intent first. (2) Identify where execution serves that intent. (3) Identify where it doesn't. (4) Suggest alternatives, not mandates. This separates the work from the person, creates dialogue instead of judgement, and builds the designer's decision-making capacity rather than just fixing the output." },
      C: { story: "Junior designers stopped getting feedback entirely. Senior designers continued informally. The quality gap between junior and senior work widened. Optional feedback is chosen least by those who need it most.", lesson: "Optional critique doesn't improve design quality — it calcifies existing skill gaps.", principle: "Collaborative Design Process", principleDetail: "Structured critique is a core design learning mechanism. Making it optional means the designers who need it most are least likely to opt in due to fear of exposure. Design critique should be regular, structured, and psychologically safe — not optional." },
    },
  },
];

// ─── UPDATED ENDINGS (scores based on 40 scenarios × 15 max = 700 + 100 base) ──
export const UPDATED_ENDINGS = {
  leadDesigner: {
    range: "500–700",
    title: "Lead Designer",
    subtitle: "The startup ships. And so do you.",
    description:
      "Launchly hits its targets across all 8 chapters. The decisions you made — research-backed, user-centred, and system-aware — compound into a product that actually works. At the all-hands, the CEO calls out your design leadership. A week later, you're promoted to Lead Designer.",
    color: "#00D4FF",
  },
  seniorDesigner: {
    range: "360–499",
    title: "Senior Designer",
    subtitle: "You held the line where it mattered.",
    description:
      "Launchly keeps growing. Some of your decisions were excellent, some needed iteration. You showed you can balance speed, quality, accessibility, and collaboration under sustained pressure across a real product lifecycle.",
    color: "#7C3AED",
  },
  midDesigner: {
    range: "200–359",
    title: "Mid Designer",
    subtitle: "Good instincts. Growing judgment.",
    description:
      "You showed strong instincts on some key decisions and struggled in others. The growth is real — your understanding of UX principles is developing into genuine judgment. With more deliberate practice, you'll get there.",
    color: "#F59E0B",
  },
  lessonsLearned: {
    range: "Below 200",
    title: "Lessons Learned",
    subtitle: "Every mistake had a lesson inside it.",
    description:
      "Some calls didn't land, but you finished the full journey. Great designers are shaped by reflection, iteration, and recovery from hard decisions. The principles you encountered here are the foundation. Now go build with them.",
    color: "#EF4444",
  },
};

export const getUpdatedEnding = (score) => {
  if (score >= 500) return UPDATED_ENDINGS.leadDesigner;
  if (score >= 360) return UPDATED_ENDINGS.seniorDesigner;
  if (score >= 200) return UPDATED_ENDINGS.midDesigner;
  return UPDATED_ENDINGS.lessonsLearned;
};

// ─── UI TASKS ─────────────────────────────────────────────────────────────────
// These replace a standard scenario — triggered by scenarioId match in ScenarioScreen
export const UI_TASKS = {
  // Chapter 4 – Fitts's Law (replaces a scenario slot, scenarioId = 'uitask_ch4')
  uitask_ch4: {
    id: 'uitask_ch4',
    chapter: 4,
    isUITask: true,
    type: 'fitts',
    title: 'The Button Size Test',
    law: "Fitts's Law",
    narration:
      'The PM wants to reduce the primary CTA to save space. Before you answer, experience it yourself. Three button sizes are below — click each one and feel the difference.',
    instruction: 'Click the button that feels most comfortable to hit accurately.',
    lawDetail:
      "Fitts's Law: the time to reach a target is a function of its size and distance. Smaller = harder to hit accurately. This is why primary touch targets should be at least 44–48px tall.",
    consequences: {
      A: { story: "You chose the tiny button. In testing, miss-click rates tripled on mobile. Users averaged 2.3 attempts to hit it.", lesson: "Small targets feel clean in mockups and cruel in real use.", principle: "Fitts's Law", principleDetail: "Fitts's Law proves smaller targets take exponentially longer to hit. Primary actions must be sized for the least precise interaction scenario — a thumb on mobile." },
      B: { story: "A middle ground — functional but still causing 60% more miss-clicks on touch devices. Better, but not good enough for a primary action.", lesson: "Borderline is not accessible. 44px is the floor, not the ceiling.", principle: "Fitts's Law", principleDetail: "36px sits in the danger zone for touch targets. The 44–48px minimum exists because it matches the physics of an average fingertip. Borderline is still a failure." },
      C: { story: "You chose the large button. Miss-click rates stayed flat. Users created projects without friction. The PM eventually agreed: the button earned its space.", lesson: "Size is not waste when it serves the most important action on the screen.", principle: "Fitts's Law", principleDetail: "Primary actions — Create, Save, Submit — should always be the largest, most accessible targets on the screen. Fitts's Law is not an opinion. It is physics." },
    },
  },

  // Chapter 3 – Contrast (WCAG)
  uitask_ch3: {
    id: 'uitask_ch3',
    chapter: 3,
    isUITask: true,
    type: 'contrast',
    title: 'The Contrast Check',
    law: 'WCAG Contrast Ratios',
    narration:
      'Marketing designed a green CTA button on a light green background. Before you make a call, pick the text colour yourself and feel what passes and what fails.',
    instruction: 'Pick the text colour that passes WCAG AA (4.5:1 ratio for normal text).',
    lawDetail:
      'WCAG AA requires 4.5:1 contrast ratio for normal text and 3:1 for large text or UI components. Below this, users with low vision or in bright sunlight cannot reliably read.',
    consequences: {
      A: { story: "You chose the lightest colour. It fails WCAG AA at 2.1:1. Users with low vision — or anyone in sunlight — cannot read it reliably.", lesson: "If it passes the eye test but fails the ratio test, it fails accessibility.", principle: "WCAG Contrast Ratios", principleDetail: "Human visual perception is inconsistent across users, screen types, and environments. The 4.5:1 ratio is derived from research on users with moderately low vision. Your personal eye test is not a substitute." },
      B: { story: "You chose the accessible green. It passes WCAG AA at 5.8:1. The brand colour is preserved. Users with low vision can read it. This is the answer.", lesson: "Accessible does not mean boring. 5.8:1 contrast is fully achievable with brand colours.", principle: "WCAG Contrast Ratios", principleDetail: "Adjusting shade within a brand colour family almost always produces an accessible result. The constraint is not 'abandon the colour' — it is 'use the right shade of the colour.'" },
      C: { story: "High contrast works technically but the black text clashes with the brand palette. A valid choice — but you could have preserved the brand colour by picking a darker shade instead.", lesson: "Maximum contrast is not always the right answer. Sufficient contrast with brand harmony is.", principle: "WCAG Contrast Ratios", principleDetail: "WCAG defines a minimum, not an ideal. Overcorrecting to maximum contrast can break visual consistency. Find the shade within your palette that hits 4.5:1 — that is the design-aware answer." },
    },
  },

  // Chapter 7 – Reorder (Serial Position / Notification Priority)
  uitask_ch7: {
    id: 'uitask_ch7',
    chapter: 7,
    isUITask: true,
    type: 'reorder',
    title: 'The Notification Priority',
    law: 'Serial Position Effect',
    narration:
      "Launchly's notification tray shows 4 types of alerts. Users complain they miss important ones. Before designing the fix, put yourself in the user's position — arrange these notifications by importance.",
    instruction: 'Drag to reorder — most important notification at the top.',
    lawDetail:
      'The Serial Position Effect: items at the top (primacy) and bottom (recency) of a list are recalled more reliably than items in the middle. Important notifications belong at the top — users scan from there.',
    consequences: {
      A: { story: "Your order closely matches the optimal priority. Stock alerts and direct interactions at the top, system and digest at the bottom. Users will see what matters first.", lesson: "Priority in a list is a design decision. Default to serving the most time-sensitive item first.", principle: "Serial Position Effect", principleDetail: "When users scan a notification list, they start at the top. Position your most critical, time-sensitive notifications there. Digest and batch updates belong at the bottom where they're easy to find but don't interrupt." },
      B: { story: "A reasonable attempt but some high-priority items are buried in the middle where users are least likely to see them. The middle positions are the graveyard of lists.", lesson: "The middle of a list is where important things go to be ignored.", principle: "Serial Position Effect", principleDetail: "Primacy (top) and recency (bottom) are remembered. The middle is processed last and recalled least. If a notification matters, it cannot live in the middle. Redesign the priority order." },
      C: { story: "The order doesn't reflect urgency. Low-priority digests at the top push urgent stock alerts and direct comments down where users may miss them entirely.", lesson: "A notification tray without priority order is just noise delivered in random sequence.", principle: "Serial Position Effect", principleDetail: "Every list communicates priority through position whether you intend it or not. If you don't design the order consciously, the system will impose a random one — and users will pay the cost in missed alerts." },
    },
  },

  // Chapter 6 – Proximity layout picker
  uitask_ch6: {
    id: 'uitask_ch6',
    chapter: 6,
    isUITask: true,
    type: 'proximity',
    title: 'The Layout Grouping',
    law: 'Gestalt — Proximity',
    narration:
      'The dashboard has 8 widgets with no visual grouping. Users say they cannot tell which widgets are related. Three layout approaches are shown below — pick the one that communicates grouping most clearly.',
    instruction: 'Which layout makes related widgets feel grouped without adding new visual elements?',
    lawDetail:
      "Gestalt's Law of Proximity: elements placed near each other are perceived as related. Whitespace between groups creates separation without needing borders or backgrounds — the brain reads spatial relationships before everything else.",
    consequences: {
      A: { story: "Scattered widgets with equal spacing communicate no relationships. Users still had to read every label to understand groupings. The layout gave them no shortcut.", lesson: "Equal spacing between all elements signals nothing. Proximity must create contrast to communicate relationships.", principle: "Gestalt — Proximity", principleDetail: "Proximity only works when there is contrast — tight spacing within a group, generous spacing between groups. Uniform spacing creates uniform ambiguity. The brain needs unequal spatial relationships to infer groupings." },
      B: { story: "Grouping related widgets together with generous space between groups immediately communicated relationships. Users understood the dashboard structure before reading a single label.", lesson: "Proximity is the cheapest grouping tool in design. It costs nothing and communicates everything.", principle: "Gestalt — Proximity", principleDetail: "Gestalt proximity works because spatial relationships are processed preattentively — before conscious thought. Move related items close together, separate groups with whitespace, and the brain does the rest in under 200ms. No borders, no backgrounds, no extra elements needed." },
      C: { story: "Boxes made groupings explicit but added visual weight. The borders competed with the content inside. The layout felt heavier without being clearer. Proximity alone would have done the same job with less noise.", lesson: "Borders declare groupings. Proximity implies them. Implication is cheaper and cleaner.", principle: "Gestalt — Proximity", principleDetail: "Visible containers (boxes, borders, backgrounds) work — but they add visual complexity. Proximity achieves the same grouping effect without added weight. Use containers when groups need extra emphasis; use proximity when you want grouping that feels effortless." },
    },
  },
};

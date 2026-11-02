# Business case

Working hypothesis for the team to discuss and validate with potential customers. The prototype is fictional and does not take bookings or payments.

## 1. The idea

- **Customer:** People who keep several houseplants and want a simple routine, especially beginners, busy households, and people who travel.
- **Problem:** Different plants need care on different schedules. People rely on memory, notes, or generic reminders, and may forget a plant or water it too often. Travel also makes care harder.
- **Solution:** Good Growth keeps a plant list with adjustable watering intervals and a daily view of what is due. A future local sitter directory could help owners arrange care while away. Plant needs vary with light, season, soil, and pot, so schedules should be treated as reminders rather than expert diagnosis.
- **Revenue:** Keep basic plant tracking free to attract owners. If a real sitter marketplace proves useful, earn a clearly disclosed service fee on completed bookings. A later paid plan could add shared household access, cloud backup, and richer reminders. Test willingness to pay before building either paid feature; do not rely on ads or sell care data.

## 2. Where IT creates value

The planner makes care routines easier to organize and can be distributed through a low-cost website or app. Reusable software supports scale, while tailored schedules help differentiate it from a generic calendar. With consent, aggregated and de-identified care patterns could improve suggested schedules, but plant data is not automatically a strong advantage and should not be used to make unsupported care claims. A saved collection may create modest switching costs; users should still be able to export or delete it.

## 3. Network effects

The planner alone is a **one-sided** product: it can be useful to one owner. Adding sitters creates a potential **two-sided market** between plant owners and local sitters. More reliable sitters can improve owner choice, and more owners can make it worthwhile for sitters to join. These are local effects, not automatic growth: a large number of users in distant cities does not help someone find nearby care.

To address the empty-network problem, start in one neighborhood or campus, recruit a small group of sitters first, and manually confirm that owners want the service. Keep the free planner useful without a marketplace. The prototype's Plant sitters page demonstrates sample profiles and a simulated request only; it is not a live network.

## 4. Can it be copied? (the moat question)

The current website has no defensible moat; a competitor could copy its features quickly. A possible long-term advantage is local trust: consistently reliable sitters, useful reviews, repeat relationships, and enough nearby supply. That would be valuable to users and harder to reproduce than the code, but it is not rare or organized yet. A larger competitor could build similar software quickly; building trusted local coverage would take longer and require careful operations. Any care insights should be consent-based and privacy-preserving. A larger plant collection may create switching costs, so provide export and deletion rather than trapping users.

## 5. Cloud and operations

A real product would need a secure hosted database and application platform (PaaS) for accounts, plant schedules, and bookings, plus a payment provider (SaaS) rather than storing card details. Push or email reminders would require notification services. The company would need backups, access controls, monitoring, privacy and security work, customer support, sitter onboarding, and a process for cancellations and disputes. Cloud services reduce the need to operate hardware but create provider dependence, ongoing fees, outages, and data-processing obligations. The current prototype stores data only in the visitor's browser and has none of these real services.

## 6. Risks and ethics

Reminders can be wrong for a particular plant or season, so let users adjust schedules and avoid presenting them as expert advice. A sitter could damage a plant, lose a key, enter a home improperly, or fail to show up; a real service would need identity checks, clear consent, safety guidance, insurance review, support, and fair dispute handling. Collect as little personal information as possible, never expose a home address publicly, protect booking and location data, and provide deletion controls. Do not list or imply that fictional sitters are real. Any fees must be disclosed before booking, and the service should avoid promising plant survival.

# Requirements

## Functional
1.  **FR1:** The system shall implement a core gameplay loop where the player explores a biome, which triggers a chance-based encounter with a species from a dynamically filtered pool based on environment (time/weather), species rarity (1-10 scale), and player perks, with weighted random selection using the formula: `base weight = 100/rarity`.
2.  **FR2:** The system shall allow players to gain Research XP (50 XP per correct answer, 100 XP per radiant correct answer) for species by successfully answering quiz questions, enabling them to level up a species to a maximum research level of 2 (100 XP per level).
3.  **FR3:** The system shall implement a "Knowledge-as-a-Key" progression, where achieving mastery of a species unlocks a permanent perk that may grant access to new sub-zones or provide gameplay advantages.
4.  **FR4:** The system shall provide a "Field Researcher" skill, unlocked after mastering 3 species, that allows the player to temporarily increase the encounter chance for a chosen species.
5.  **FR5:** The system shall include a "Research Focus" meter that fills with each non-radiant encounter and, when activated by the player, guarantees the next three encounters are radiant variants.
6.  **FR6:** The quiz system shall dynamically generate questions and answers using a template-based structure with categories (behavior, habitat, diet, conservation, anatomy), difficulty scaling (1-5), and localization support for four languages.
7.  **FR7:** The entire user interface, including all game content, must support four languages (English, Portuguese, French, Spanish) and allow for instantaneous language switching.
8.  **FR8:** The system shall implement a Hybrid Point-Based perk unlock system where individual species mastery provides 1-4 points based on rarity and the final mastery perk unlocks at a threshold of 20 points.
9.  **FR9:** The system shall provide environment-based encounter filtering where species have specific time/weather encounter rules, the environment changes automatically every 30 seconds, and a matching environment provides a 1.5x encounter weight multiplier.
10. **FR10:** The system shall implement radiant encounter mechanics where the base radiant chance is 10% and radiant encounters provide a 2x XP bonus.

## Non-Functional
1.  **NFR1:** The application must be built as a single-page React application using TypeScript, functional components with Hooks, and have its application state centralized within the main App component.
2.  **NFR2:** Development must follow a "Merge & Enhance" strategy, adopting the prototype's robust architecture while integrating the current app's rich content and visual effects.
3.  **NFR3:** The visual identity must adhere to the "stylized realism" art style, featuring a highly saturated and vibrant color palette as defined in the project's visual guidelines.
4.  **NFR4:** The underlying architecture must be scalable to support future expansion, including the addition of new species, features, and more advanced AI systems.
5.  **NFR5:** The system must maintain sub-2-second response times for all user interactions, including encounter generation, quiz loading, and language switching.
6.  **NFR6:** The application must support offline functionality for core gameplay features, with data persistence using `localStorage` and capabilities for future cloud sync.
7.  **NFR7:** The multilingual system must support dynamic content generation (e.g., quiz questions) while maintaining consistent terminology across all supported languages.
8.  **NFR8:** The application must meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
9.  **NFR9:** The application must be designed for testability, with a goal of achieving at least 80% automated test coverage for core business logic.

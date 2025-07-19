# Epic List

The following epics define the sequential development plan for the "Eco-Explorer" MVP. Each epic is dependent on the completion of the one before it.

## **Epic 0: Technical Foundation & Architecture**
* **Goal:** Establish the core technical foundation of the application, including the project setup, build system, testing framework, and core data structures that all subsequent epics will build upon.
* **Scope:** Vite project setup, React/TypeScript configuration, testing framework installation (e.g., Vitest/React Testing Library), data structure definitions (Species, PlayerState), multilingual system foundation, and basic CI/CD pipeline.
* **Success Criteria:** The development team can run the application locally, execute tests, and has a stable, version-controlled foundation to build upon.

## **Epic 1: Core Encounter Loop**
* **Goal:** Implement the complete core gameplay loop, from exploring a biome to encountering a species, answering a quiz, and receiving XP.
* **Scope:** Basic UI framework, `handleExplore` logic, environment system (time/weather changes), static quiz system implementation, basic progression.
* **Success Criteria:** A player can successfully find and "log" a species, seeing their XP increase in the process. The core loop is fully functional.

## **Epic 2: Deep Progression & Mastery Systems**
* **Goal:** Implement the deep progression systems, including species leveling, the Hybrid Point-Based perk unlock system, and the mastery threshold mechanics.
* **Scope:** XP calculation, level progression, perk unlock logic, mastery point tracking, perk effect implementation.
* **Success Criteria:** A player can level up species, unlock individual perks, and see their progress towards the final mastery perk.

## **Epic 3: Player Agency & Strategic Depth**
* **Goal:** Introduce mechanics that give the player strategic control over their experience by implementing the "Field Researcher" skill, the "Research Focus" Meter, and environment-based encounter filtering.
* **Scope:** Field Researcher skill system, Research Focus meter, environment system, status panel components.
* **Success Criteria:** A player can successfully use the Field Researcher skill and activate the Research Focus meter to influence gameplay.

## **Epic 4: Content Polish & Launch Readiness**
* **Goal:** Finalize all 12 species, implement the dynamic quiz generation system, ensure full localization, and meet all performance and accessibility requirements for a polished launch.
* **Scope:** Dynamic quiz generation, complete species content, full localization, performance optimization, accessibility compliance, error monitoring integration.
* **Success Criteria:** The application is feature-complete for the MVP, fully localized, performant, accessible, and ready for a public release.

### **Post-MVP Vision**
Future epics post-launch could include the "Consumable Items" system, advanced "Agent-Based AI" for species behavior, and cloud sync capabilities.

# Eco-Explorer: Itatiaia Nature Sanctuary Product Requirements Document (PRD)

## Goals and Background Context

### Goals
* To create a multilingual educational simulation game that transforms Atlantic Forest ecology research into engaging, strategic gameplay through species encounters, knowledge-based progression, and mastery systems.
* To evolve the game from being *about* an ecosystem to becoming a playable, *living* ecosystem through dynamic, systems-driven mechanics.
* To foster intrinsic motivation by rewarding players with meaningful progression and abilities ("Knowledge-as-a-Key") rather than abstract points.
* To successfully merge the robust architecture of the "prototype" with the rich content and visual effects of the "current app" in a "Merge & Enhance" strategy.
* To implement robust, scalable systems that support future expansion while maintaining the core gameplay experience across multiple languages and platforms.

### Background Context
"Eco-Explorer: Itatiaia Nature Sanctuary" is a well-defined game concept for audiences including educational institutions, nature enthusiasts, and casual gamers. The initial MVP release will feature 12 core species. A recent brainstorming session successfully translated high-level ideas into a concrete blueprint by defining core data structures (Species, PlayerState, GameState), mapping the primary gameplay loop (explore → encounter → quiz → progression), and designing mitigation strategies for critical progression dependencies (Hybrid Point-Based perk system, Field Researcher skills, Research Focus Meter).

This Product Requirements Document (PRD) will formalize those solutions and the overall project vision into a complete set of actionable requirements.

### Key Success Factors
The project's success depends on balancing educational content with engaging gameplay, maintaining performance across multilingual content, and creating systems that scale with additional species and features.

### Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-07-16 | 1.1 | Incorporated refinements to goals and context. | John, PM |
| 2025-07-16 | 1.0 | Initial PRD draft creation. | John, PM |

## Requirements

### Functional
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

### Non-Functional
1.  **NFR1:** The application must be built as a single-page React application using TypeScript, functional components with Hooks, and have its application state centralized within the main App component.
2.  **NFR2:** Development must follow a "Merge & Enhance" strategy, adopting the prototype's robust architecture while integrating the current app's rich content and visual effects.
3.  **NFR3:** The visual identity must adhere to the "stylized realism" art style, featuring a highly saturated and vibrant color palette as defined in the project's visual guidelines.
4.  **NFR4:** The underlying architecture must be scalable to support future expansion, including the addition of new species, features, and more advanced AI systems.
5.  **NFR5:** The system must maintain sub-2-second response times for all user interactions, including encounter generation, quiz loading, and language switching.
6.  **NFR6:** The application must support offline functionality for core gameplay features, with data persistence using `localStorage` and capabilities for future cloud sync.
7.  **NFR7:** The multilingual system must support dynamic content generation (e.g., quiz questions) while maintaining consistent terminology across all supported languages.
8.  **NFR8:** The application must meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
9.  **NFR9:** The application must be designed for testability, with a goal of achieving at least 80% automated test coverage for core business logic.

## User Interface Design Goals

### Overall UX Vision
The user experience should be immersive, intuitive, and magical, making the player feel like a true ecologist on a journey of discovery. The UI must be clean and unobtrusive, allowing the "stylized realism" of the background art to be the main focus. The interface should function as a modern, digital field journal, being both a tool for interaction and a record of the player's achievements.

#### Core Design Principles
* **Mobile-First Design:** The layout and user interactions will be designed for a mobile experience first, then scaled up gracefully to tablet and desktop interfaces.
* **Clarity Over Clutter:** Prioritize clear communication and intuitive actions, ensuring the focus remains on the game world.
* **Immersive Feedback:** Every player action should have an immediate, thematic, and understandable visual or auditory response.

### Key Interaction Paradigms
The primary interaction model is a point-and-click (or tap on mobile) discovery system.
* **Exploration:** Players initiate scans and interact with the environment through a main "Analyze Biome" button.
* **Discovery:** Players use a mouse-based 'focus' or a direct tap mechanic to interact with discoverable hotspots. The encounter modal provides options to **'Log Species' (trigger quiz) or 'Release' (skip encounter).**
* **Knowledge Checks:** Players interact with modal windows for quizzes and results.
* **Navigation:** Players navigate between a main hub, zones, and trails using a simple map or menu interface.
* **System Feedback:** The UI must provide clear, non-technical feedback for loading states (e.g., spinners, progress indicators) and error states (e.g., network issues).

### Status Panel Components
The main UI will feature a persistent status panel that includes clear visual indicators for:
* **Research Focus Meter:** A gauge showing progress towards the next guaranteed radiant encounter.
* **Field Researcher Skill:** A button or icon indicating the status (ready, active, on cooldown) of the species attunement skill.
* **Environment Status:** A simple display of the current in-game time (Day/Night) and weather (Clear/Rainy).

### Core Screens and Views
* **Main Exploration View:** The primary game screen, displaying the location's background art, the UI overlay, and interaction buttons.
* **Encounter Modal:** An overlay that displays the discovered species (with radiant indicators), provides key information, and presents action buttons ('Log Species', 'Release').
* **Eco-Log / Field Journal:** A detailed screen where players can view information on discovered species, track research progress, and review perks.
* **Perks Screen:** A dedicated view showing all available perks, their unlock conditions, and current progress toward mastery thresholds.
* **Park Map / Travel Screen:** A high-level view that allows players to travel between unlocked locations.
* **Onboarding/Tutorial Flow:** A guided first-time user experience that introduces the core mechanics intuitively.
* **Settings Screen:** Allows players to change language, control audio, etc.

### Responsive & Touch Considerations
* The mouse-based "focus" mechanic must have a direct tap-based equivalent for mobile devices.
* All interactive elements must have touch-friendly target sizes adhering to mobile design best practices.
* Layouts will adapt fluidly to different screen sizes and orientations.

### Performance Considerations
* The system will use progressive loading strategies for high-resolution background art to ensure fast initial load times.
* Optional quality settings may be provided to allow users on lower-end devices to have a smoother experience.

### Accessibility
The application will adhere to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, **including keyboard navigation for all interactions, screen reader compatibility for all informational and quiz content, and high-contrast mode support for visual accessibility.**

### Branding
The visual identity will be one of **stylized realism**, blending the richness of a Pixar film with the detail of a nature documentary. The atmosphere should be joyful, wondrous, and inviting, primarily utilizing **magical golden hour lighting** and a **saturated deep greens and earthy browns** color palette, accented with **brilliant pops of color**.

### Target Device and Platforms: Web Responsive
The application will be a single-page web application designed to be fully responsive, providing a seamless experience on desktops, tablets, and mobile browsers.

## Technical Assumptions

### Repository, Architecture, and Deployment
* **Repository Structure:** The application will be contained within a **Single Git Repository** to simplify dependency management and the build process for the MVP.
* **Service Architecture:** The application will be a **Monolithic Frontend** (Client-side Monolith), where all logic and state are handled within the single React application.
* **Deployment:** The application will be deployed as **static files on a CDN** to maximize global performance and uptime. Environment-specific settings will be handled at build time.
* **Build Tooling:** **Vite** is the preferred build system for its performance and modern developer experience. The build process must generate optimized, minified assets for production.

### Performance & Scalability
* **Bundle Size:** The initial production bundle size must not exceed **2MB** to support the sub-2-second response time requirement (NFR5).
* **Memory Management:** The application's data structures and components must be optimized to handle a growing dataset of 100+ species without significant performance degradation.
* **Caching Strategy:** Static assets (images, fonts, translation files) will be configured with aggressive browser caching headers.

### Data & State Architecture
* **State Management:** The application will use React's built-in state management (**`useState`**, **`useReducer`**) and Context API. It will not use external global state libraries like Redux for the MVP.
* **Immutability:** All state updates must follow immutable patterns to ensure predictable rendering and prevent side effects.
* **Data Normalization:** Species, perk, and other game data will be stored in a normalized structure (e.g., objects with IDs as keys) for efficient lookups and updates.
* **Data Persistence & Migration:** The MVP will use **`localStorage`** for state persistence. The data schema stored in `localStorage` **must be versioned** to support future data migrations without data loss for the user.

### Testing and Quality
* **Testing Strategy:** The strategy will include **Unit + Integration Testing** with a specific focus on:
    * Encounter algorithm accuracy and performance.
    * Progression system calculations (XP, levels, perks).
    * Multilingual content switching and dynamic text generation.
    * Offline functionality and data persistence.
    * Accessibility compliance (keyboard navigation, screen readers).
* **Browser Compatibility:** The application will support the latest two major versions of **Chrome, Firefox, Safari, and Edge**. A polyfill strategy will be used for modern JavaScript features.

### Security
* **Client-Side Validation:** As a client-side application, all game logic (e.g., quiz answers, progression calculations) must be validated on the client.
* **Input Validation:** All user inputs (e.g., settings changes) must be validated to prevent trivial injection issues.
* **Content Security Policy (CSP):** The application will implement appropriate CSP headers to mitigate cross-site scripting (XSS) risks.

### Multilingual System
* **Translation Loading:** All language files will be loaded upfront during the initial application load to facilitate instantaneous language switching as required by FR7.
* **UI Adaptation:** UI components must be designed to gracefully handle text expansion and contraction that occurs between different languages.

### Future-Proofing
* **Third-Party Dependencies:** Any new external dependency must be critically evaluated for its bundle size impact, performance overhead, and long-term maintenance viability.
* **Architectural Flexibility:** The MVP architecture should be clean and modular to allow for future integration of advanced AI and data systems, but it should not be burdened by premature optimization for them.
* **Monitoring:** A lightweight error tracking and performance monitoring service will be integrated to report on production issues.

## Epic List

The following epics define the sequential development plan for the "Eco-Explorer" MVP. Each epic is dependent on the completion of the one before it.

### **Epic 0: Technical Foundation & Architecture**
* **Goal:** Establish the core technical foundation of the application, including the project setup, build system, testing framework, and core data structures that all subsequent epics will build upon.
* **Scope:** Vite project setup, React/TypeScript configuration, testing framework installation (e.g., Vitest/React Testing Library), data structure definitions (Species, PlayerState), multilingual system foundation, and basic CI/CD pipeline.
* **Success Criteria:** The development team can run the application locally, execute tests, and has a stable, version-controlled foundation to build upon.

### **Epic 1: Core Encounter Loop**
* **Goal:** Implement the complete core gameplay loop, from exploring a biome to encountering a species, answering a quiz, and receiving XP.
* **Scope:** Basic UI framework, `handleExplore` logic, environment system (time/weather changes), static quiz system implementation, basic progression.
* **Success Criteria:** A player can successfully find and "log" a species, seeing their XP increase in the process. The core loop is fully functional.

### **Epic 2: Deep Progression & Mastery Systems**
* **Goal:** Implement the deep progression systems, including species leveling, the Hybrid Point-Based perk unlock system, and the mastery threshold mechanics.
* **Scope:** XP calculation, level progression, perk unlock logic, mastery point tracking, perk effect implementation.
* **Success Criteria:** A player can level up species, unlock individual perks, and see their progress towards the final mastery perk.

### **Epic 3: Player Agency & Strategic Depth**
* **Goal:** Introduce mechanics that give the player strategic control over their experience by implementing the "Field Researcher" skill, the "Research Focus" Meter, and environment-based encounter filtering.
* **Scope:** Field Researcher skill system, Research Focus meter, environment system, status panel components.
* **Success Criteria:** A player can successfully use the Field Researcher skill and activate the Research Focus meter to influence gameplay.

### **Epic 4: Content Polish & Launch Readiness**
* **Goal:** Finalize all 12 species, implement the dynamic quiz generation system, ensure full localization, and meet all performance and accessibility requirements for a polished launch.
* **Scope:** Dynamic quiz generation, complete species content, full localization, performance optimization, accessibility compliance, error monitoring integration.
* **Success Criteria:** The application is feature-complete for the MVP, fully localized, performant, accessible, and ready for a public release.

#### **Post-MVP Vision**
Future epics post-launch could include the "Consumable Items" system, advanced "Agent-Based AI" for species behavior, and cloud sync capabilities.

## Epic Details

### Epic 0: Technical Foundation & Architecture

**Expanded Goal:** The primary goal of this epic is to create a stable, configured, and testable project skeleton. By the end of this epic, the foundational tooling, application structure, and core data models will be in place, enabling parallel work on gameplay features in subsequent epics.

**Story 0.1: Project Scaffolding**
**As a** developer, **I want** a new React project initialized with Vite and TypeScript, **so that** I have a clean, modern foundation to build upon.
*Acceptance Criteria*
1.  A new React project is created using the Vite build tool.
2.  The project is configured to use TypeScript.
3.  The application runs without errors in a local development environment (`npm run dev`).

**Story 0.2: Directory Structure & Linting**
**As a** developer, **I want** the standard project directory structure and linting/formatting tools configured, **so that** code organization and quality are consistent from the start.
*Acceptance Criteria*
1.  The `src` directory contains standard folders: `components`, `hooks`, `services`, `styles`, `assets`, and `data`.
2.  ESLint and Prettier are installed and configured.
3.  Linting and formatting rules are automatically applied on file save or via a pre-commit hook.

**Story 0.3: Core Data & State Structure**
**As a** developer, **I want** the core data types and centralized `AppContext` defined **with validation**, **so that** the main application state structure is established and **data integrity is maintained**.
*Acceptance Criteria*
1.  A `types.ts` file defines the core interfaces for `Species`, `PlayerState`, etc.
2.  **Data validation schemas (e.g., using Zod or a similar library) are defined for all core data types.**
3.  A basic `AppContext.tsx` file is created using React's Context API.
4.  **The initial static data for the 12 species is validated against its schema and loaded.**
5.  **The data is stored in a normalized structure (objects with IDs as keys) for efficient lookups.**

**Story 0.4: State Management Foundation**
**As a** developer, **I want** the centralized state management pattern established using React's built-in tools, **so that** all application state follows consistent, immutable patterns.
*Acceptance Criteria*
1.  A `useReducer` pattern is established for managing the main `GameState`.
2.  Utility functions for immutable state updates are available.
3.  A state persistence layer that saves to `localStorage` is implemented.
4.  **The `localStorage` data schema is versioned to support future data migrations.**

**Story 0.5: Multilingual Foundation**
**As a** developer, **I want** the internationalization framework set up **with performance optimization**, **so that** text can be localized and language switching is **instantaneous**.
*Acceptance Criteria*
1.  An i18n library is installed and configured to **load all language files upfront.**
2.  Translation files are created with a consistent key structure.
3.  **Language switching interaction completes in under 100ms.**
4.  A template for generating dynamic quiz questions with localized parameters is established.

**Story 0.6: Build & Deployment Configuration**
**As a** developer, **I want** the build system configured for production deployment and performance optimization, **so that** the application can be deployed with optimized assets and **meet the 2MB bundle size requirement.**
*Acceptance Criteria*
1.  Vite is configured for production builds with code splitting and minification.
2.  A bundle analyzer is configured to monitor the application's bundle size.
3.  Environment variables are properly configured for development vs. production builds.
4.  **Basic security headers (e.g., CSP) are configured in the build output.**

**Story 0.7: Error Handling & Monitoring Foundation**
**As a** developer, **I want** basic error boundaries and monitoring setup established, **so that** production issues can be tracked and handled gracefully.
*Acceptance Criteria*
1.  A top-level React Error Boundary is implemented to catch rendering errors.
2.  A lightweight error tracking service is configured to capture unhandled exceptions.
3.  A basic `handleError` utility function is created for manual error reporting.

**Story 0.8: Testing Framework Setup**
**As a** developer, **I want** the testing framework (Vitest & React Testing Library) configured with a sample test, **so that** I can write and run unit tests for all new code.
*Acceptance Criteria*
1.  Vitest and React Testing Library are installed and configured.
2.  A sample unit test for a simple component passes successfully.
3.  The test command (`npm run test`) is integrated into the package scripts.

### Epic 1: Core Encounter Loop

**Expanded Goal:** The goal of this epic is to deliver the first playable slice of "Eco-Explorer." By the end of this epic, a player will be able to perform the full, end-to-end gameplay loop: exploring a location, triggering a species encounter, answering a quiz about that species, and seeing their research progress update. This creates the minimum viable experience and validates our core mechanics.

**Story 1.1: Basic UI Layout & Status Display**
**As a** player, **I want** to see the main exploration screen with the location background and a basic status panel, **so that** I can understand my current context in the game world.
*Acceptance Criteria*
1.  The main application view renders a background image for the current location.
2.  A basic status panel is displayed on the UI.
3.  The status panel shows static text for the current time and weather.
4.  An "Explore Biome" button is visible and clickable.

**Story 1.2: Dynamic Environment System**
**As a** player, **I want** the in-game time and weather to change automatically, **so that** the world feels dynamic and alive.
*Acceptance Criteria*
1.  The `gameTime` state variable cycles between 'day' and 'night' every 30 seconds.
2.  The `weather` state variable cycles between 'clear' and 'rainy' every 30 seconds.
3.  The status panel display correctly updates to reflect the current `gameTime` and `weather`.

**Story 1.3: State Management Integration**
**As a** developer, **I want** the encounter loop to integrate with the centralized state management, **so that** all game state is properly tracked and persisted.
*Acceptance Criteria*
1.  All state changes within the encounter loop use the established `useReducer` pattern.
2.  Game state transitions (e.g., from `exploring` to `scanning` to `quiz`) are handled through dispatched actions.
3.  The `playerState` is correctly persisted to `localStorage` after an encounter loop concludes.
4.  The application state can be successfully restored from `localStorage` on a page reload.

**Story 1.4: 'Explore Biome' Action & Encounter Calculation**
**As a** player, **I want** to click the "Explore Biome" button to trigger a scan with **environment-based encounter calculation**, **so that** I can begin my research with **realistic encounter mechanics**.
*Acceptance Criteria*
1.  Clicking the "Explore Biome" button triggers the `handleExplore` function.
2.  A "Scanning..." visual indicator is displayed for 2 seconds.
3.  The system calculates encounter weights for all valid species using the formula: `base weight = 100/rarity`.
4.  Environment bonuses (1.5x for matching time/weather) are correctly applied to the weights.
5.  Based on a weighted random selection, either an encounter is generated or a "No significant biosignatures found" message is displayed.

**Story 1.5: Species Selection & Data Validation**
**As an** encounter system, **I want** to select a species based on environment rules and **validate its data**, **so that** the encounter is robust and error-free.
*Acceptance Criteria*
1.  The species pool is correctly filtered based on `encounterRules.time` and `encounterRules.weather`.
2.  The species selection correctly uses the weighted random selection algorithm.
3.  **The data for the selected species is validated against the `Species` TypeScript interface before use.**
4.  An interactive hotspot is rendered with appropriate visual feedback.

**Story 1.6: Radiant Variant System**
**As a** player, **I want** to encounter radiant variants that provide enhanced rewards, **so that** I have additional motivation to continue exploring.
*Acceptance Criteria*
1.  A radiant encounter has a 10% base chance of occurring after a species is selected.
2.  Radiant species display a distinct visual indicator in the UI.
3.  A successful radiant encounter provides a 2x XP bonus (100 XP total).
4.  The radiant status is correctly passed through the entire encounter flow to the `grantXp` function.

**Story 1.7: Encounter Modal & Species Information**
**As a** player, **I want** to see detailed information about the discovered species before taking the quiz, **so that** I can make an informed decision about whether to log or release it.
*Acceptance Criteria*
1.  After a successful focus, an encounter modal displays the species' name, emoji, and description.
2.  The modal clearly indicates if the variant is radiant.
3.  "Log Species" (proceed to quiz) and "Release" (cancel encounter) buttons are functional.
4.  The modal can be dismissed, cleanly ending the encounter flow.

**Story 1.8: Hotspot Interaction & Quiz Trigger**
**As a** player, **I want** to focus on the hotspot to confirm the encounter and trigger a quiz, **so that** I can attempt to log the species.
*Acceptance Criteria*
1.  Moving the mouse cursor over the hotspot (or tapping it) triggers a "focus" state.
2.  Holding the focus for a brief period successfully confirms the encounter.
3.  A successful focus removes the hotspot and displays the Quiz Modal.
4.  The Quiz Modal is populated with a static question from the selected species' data.

**Story 1.9: Quiz & Result Logic with State Management**
**As a** player, **I want** to answer the quiz question and see the result **with proper state management**, **so that** my progress is tracked and the game state is **maintained**.
*Acceptance Criteria*
1.  The `handleGameResult` function processes quiz answers correctly.
2.  Correct answers trigger the success flow and XP calculation.
3.  Incorrect answers trigger the failure flow.
4.  **The game state transitions cleanly between `encounter`, `quiz`, and `result` phases without getting stuck.**
5.  The result modal displays appropriate feedback and closes correctly on user action.

**Story 1.10: Basic XP Progression**
**As a** player, **I want** to gain Research XP for the encountered species when I correctly answer a quiz, **so that** I can see my research progress.
*Acceptance Criteria*
1.  A correct quiz answer calls the `grantXp` function.
2.  The `researchXp` for the correct species is increased by 50 in the `ecoLog`.
3.  If the encounter was a radiant variant, the `researchXp` is increased by 100.
4.  The player receives a notification or log message indicating the amount of XP gained.

**Story 1.11: Encounter Loop Error Handling**
**As a** player, **I want** the game to handle unexpected errors gracefully, **so that** my experience is not interrupted by technical issues.
*Acceptance Criteria*
1.  The UI displays a user-friendly message if species data fails to load.
2.  Network errors during any potential future API calls are caught and a "Connection Issue" message is shown.
3.  The application state remains stable and does not crash if an unexpected error occurs during the encounter calculation.

**Story 1.12: Encounter Loop Accessibility**
**As a** player with accessibility needs, **I want** to be able to complete the entire encounter loop using keyboard and screen reader technologies, **so that** I can fully experience the game.
*Acceptance Criteria*
1.  The "Explore Biome" button and all modal buttons are focusable and can be activated with the keyboard.
2.  All interactive elements (hotspots, quiz answers) are keyboard-operable.
3.  All informational text (species info, quiz questions, results) is properly read by screen readers.
4.  High-contrast mode is respected.

**Story 1.13: Encounter Algorithm Integration Testing**
**As a** developer, **I want** a suite of integration tests for the encounter algorithm, **so that** I can verify its complex logic and prevent regressions.
*Acceptance Criteria*
1.  Tests are created to verify the species filtering logic based on time and weather.
2.  Tests are created to validate the weighted random selection and rarity calculations.
3.  Tests are created to confirm that environment and perk bonuses are applied correctly.
4.  The test suite covers edge cases, such as empty species pools or 100% radiant chance.

### Epic 2: Deep Progression & Mastery Systems

**Expanded Goal:** The goal of this epic is to transform the basic XP gain from Epic 1 into a meaningful progression system. By the end of this epic, players will be able to level up species to achieve mastery, unlock powerful perks that change gameplay, and see their progress towards unlocking the ultimate 'Mastery Perk'. This directly implements our "Knowledge-as-a-Key" design philosophy.

**Story 2.1: Species Level-Up Mechanic**
**As a** player, **I want** a species to level up when its Research XP reaches the required threshold, **so that** I can see tangible progress in my research.
*Acceptance Criteria*
1.  The `grantXp` function correctly checks if accumulated `researchXp` >= `XP_PER_LEVEL` (100).
2.  Upon reaching the threshold, `researchLevel` increments and `researchXp` is reduced by 100.
3.  **XP is capped at `MAX_RESEARCH_LEVEL` to prevent overflow.**
4.  Multiple level-ups from a single large XP grant are handled correctly in a single function call.
5.  A "Level Up!" notification is displayed with appropriate visual feedback.

**Story 2.2: Perk Effect System Architecture**
**As a** developer, **I want** a flexible perk effect system that can handle different types of bonuses, **so that** new perks can be easily added and existing perks can be modified.
*Acceptance Criteria*
1.  Perk effects are defined using a type-safe interface (e.g., `{ type: 'increase_encounter_weight', multiplier: 1.5, criteria: { rarity: 'rare' } }`).
2.  The system can correctly parse and apply multiple active perks simultaneously during the encounter calculation.
3.  Perk effect data is validated upon loading to prevent invalid configurations.
4.  **The entire perk calculation for a single encounter must complete in under 50ms.**

**Story 2.3: Individual Perk Unlocks**
**As a** player, **I want** to unlock a unique "Symbiotic Perk" when I get a species to its max research level (Level 2), **so that** my mastery is rewarded with a new gameplay ability.
*Acceptance Criteria*
1.  When a species' `researchLevel` reaches `MAX_RESEARCH_LEVEL` (2), its associated `masteryPerk.id` is added to the `playerState.unlockedPerks` array.
2.  The system checks to prevent duplicate perks from being added.
3.  A "Perk Unlocked!" notification, displaying the new perk's name and description, is shown to the player.

**Story 2.4: Eco-Log & Perks UI**
**As a** player, **I want** dedicated screens to view my research progress and unlocked perks, **so that** I can track my achievements and plan my strategy.
*Acceptance Criteria*
1.  An "Eco-Log" UI screen is created that displays all discovered species.
2.  Each species entry in the Eco-Log shows its current research level and an XP progress bar.
3.  A "Perks" UI screen is created that lists all currently unlocked perks and their descriptions.
4.  Both screens are accessible from the main game interface.

**Story 2.5: Implement Perk Effects on Encounter Algorithm**
**As an** encounter system, **I want** to apply the effects of unlocked perks during encounter weight calculation, **so that** player progression tangibly affects gameplay.
*Acceptance Criteria*
1.  The encounter weight calculation function correctly consumes the `playerState.unlockedPerks` array.
2.  **Perk effects are validated before application to prevent runtime errors.**
3.  Perks correctly apply their defined multipliers to the weights of relevant species.
4.  **The system correctly combines the effects of multiple perks that may affect the same species.**
5.  The changes in encounter probability are accurately reflected in the species selection outcome.

**Story 2.6: Implement "Knowledge-as-a-Key" Sub-Zone Unlocks**
**As a** player who has unlocked a specific perk, **I want** to gain access to previously inaccessible sub-zones on the map, **so that** I am rewarded for my research with new areas to explore.
*Acceptance Criteria*
1.  The Park Map / Travel screen checks the `playerState.unlockedPerks` array.
2.  A sub-zone that has a `requiredPerk` becomes interactive or visually distinct only if the player possesses that perk.
3.  Attempting to enter a locked sub-zone provides feedback indicating what is required to unlock it.
4.  Successfully entering an unlocked sub-zone navigates the player to the new location.

**Story 2.7: Implement Hybrid Point-Based Mastery System**
**As a** player, **I want** to earn "Mastery Points" for each species I master, **so that** I can work towards the ultimate "Mastery Perk."
*Acceptance Criteria*
1.  **Mastery points are calculated based on species rarity categories: Common (Rarity 1-3) = 1pt, Uncommon (4-6) = 2pts, Rare (7-8) = 3pts, Legendary (9-10) = 4pts.**
2.  Points are awarded immediately upon a species reaching `MAX_RESEARCH_LEVEL`.
3.  The total mastery points are displayed in the UI with a progress bar showing progress toward the threshold.
4.  The `MASTERY_PERK_THRESHOLD` is set to 20 points.

**Story 2.8: Final Mastery Perk Unlock**
**As a** player who has accumulated 20 Mastery Points, **I want** to unlock the final "Mastery Perk," **so that** my dedication to the entire field of research is fully rewarded.
*Acceptance Criteria*
1.  The system continuously checks if the player's total Mastery Points has reached the `MASTERY_PERK_THRESHOLD`.
2.  Upon reaching the threshold, the final perk is added to the `unlockedPerks` array.
3.  A significant and unique "Mastery of Itatiaia" notification or animation is displayed to the player.

**Story 2.9: Progress Persistence & Data Migration**
**As a** player, **I want** my progression data to be properly saved and restored, **so that** my achievements are never lost.
*Acceptance Criteria*
1.  All progression data (levels, XP, unlocked perks, mastery points) is successfully persisted to `localStorage` after each encounter.
2.  The saved data schema is versioned. The application can handle loading data from a previous schema version and migrate it if necessary.
3.  All player progress is correctly restored after a browser refresh or application restart.
4.  The application handles invalid or corrupted saved data gracefully, notifying the user if necessary.

**Story 2.10: Progression Analytics & Debugging**
**As a** developer, **I want** visibility into progression system behavior, **so that** I can debug issues and balance the game.
*Acceptance Criteria*
1.  Key progression events (level-ups, perk unlocks, mastery point gain) are logged to the console when in debug mode.
2.  A debug mode can be enabled that displays detailed progression information on the UI.
3.  Performance of the `grantXp` and perk calculation functions is tracked.

**Story 2.11: Progression System Testing**
**As a** developer, **I want** comprehensive tests for the progression system, **so that** complex calculations and state changes are verified.
*Acceptance Criteria*
1.  Unit tests cover XP calculation, the level-up loop, and perk unlock conditions.
2.  Integration tests verify that perk effects are correctly applied to the encounter algorithm.
3.  **Tests cover edge cases like multiple level-ups at once, unlocking the final perk, and invalid perk data.**
4.  **Tests validate that saved data is correct and that the data migration logic works as expected.**

### Epic 3: Player Agency & Strategic Depth

**Expanded Goal:** The goal of this epic is to layer strategic choice onto the core gameplay loop. By the end of this epic, players will have access to powerful, cooldown-based skills that allow them to mitigate randomness and actively influence their encounters. This transforms the game from a reactive loop to a proactive, strategic experience.

**Story 3.1: "Field Researcher" Skill State & UI**
**As a** player, **I want** to see the status of my "Field Researcher" skill and have a way to activate it, **so that** I can prepare to use my new ability.
*Acceptance Criteria*
1.  The skill is considered unlocked if the player has 3 or more species masteries.
2.  The Status Panel displays the skill's state: "Ready," "Active," or "On Cooldown."
3.  **The UI provides clear, distinct visual feedback for each state (e.g., color changes, icons).**
4.  An "Attune to Species" button is enabled only when the skill state is "Ready."

**Story 3.2: "Field Researcher" Activation & Effect**
**As a** player with a ready "Field Researcher" skill, **I want** to activate it to "attune" to a specific species, **so that** I can increase my chances of finding it.
*Acceptance Criteria*
1.  Clicking "Attune to Species" opens a modal with a list of discovered species.
2.  **Only species that have been encountered at least once are available for attunement.**
3.  Confirming a selection sets the `activeFieldResearch` state with the target species ID and a 5-encounter duration.
4.  For the next 5 encounters, the attuned species receives a 2x weight multiplier.
5.  **The attunement state persists across browser sessions.**

**Story 3.3: "Field Researcher" Cooldown Mechanic**
**As a** player who has used the "Field Researcher" skill, **I want** it to go on cooldown, **so that** the ability feels powerful but balanced.
*Acceptance Criteria*
1.  After the 5-encounter duration of the active skill ends, the skill's state changes to "On Cooldown."
2.  The cooldown period lasts for 10 encounters.
3.  The UI correctly displays the cooldown countdown, decrementing with each subsequent encounter.
4.  The skill cannot be activated while on cooldown. After the cooldown, its state returns to "Ready."

**Story 3.4: "Research Focus" Meter State & UI**
**As a** player, **I want** to see my "Research Focus" meter fill with each non-radiant encounter, **so that** I can track my progress towards a guaranteed radiant encounter.
*Acceptance Criteria*
1.  The Status Panel UI includes a visual "Research Focus" meter (e.g., a progress bar).
2.  The `meterProgress` state increases by 8% for each completed, non-radiant encounter.
3.  The UI accurately reflects the current `meterProgress`, showing both the percentage and the visual bar.
4.  **The UI provides clear visual feedback when the meter is full and the skill is ready to be activated.**

**Story 3.5: "Research Focus" Activation & Effect**
**As a** player whose "Research Focus" meter is full, **I want** to activate it to guarantee my next few encounters are radiant, **so that** I can strategically boost my XP gain.
*Acceptance Criteria*
1.  When `meterProgress` reaches 100%, an "Activate Focus" button is enabled in the UI.
2.  Activating the skill sets the `researchFocus.isActive` state to `true` and sets a duration of 3 encounters.
3.  While the focus is active, the encounter algorithm guarantees radiant variants for the next 3 encounters.
4.  **The UI displays the remaining duration and a clear radiant indicator during encounters.**
5.  **The focus effect state persists across browser sessions.**

**Story 3.6: "Research Focus" Reset Logic**
**As a** "Research Focus" user, **I want** the meter and active state to reset after use, **so that** the gameplay loop remains balanced.
*Acceptance Criteria*
1.  After the 3-encounter duration of the active focus ends, the `researchFocus.isActive` state is set to `false`.
2.  The `meterProgress` state resets to 0.
3.  The "Activate Focus" button becomes disabled.

**Story 3.7: Strategic Systems State Management**
**As a** developer, **I want** the strategic systems to integrate with the centralized state management, **so that** all skill states are properly tracked and persisted.
*Acceptance Criteria*
1.  Field Researcher and Research Focus states are managed through the established `useReducer` pattern.
2.  Skill states are persisted to `localStorage` and correctly restored on page reload.
3.  State transitions (Ready → Active → Cooldown) are handled through proper, validated actions.

**Story 3.8: Strategic Systems Error Handling**
**As a** player, **I want** the strategic systems to handle edge cases gracefully, **so that** my experience is not interrupted by unexpected situations.
*Acceptance Criteria*
1.  The system correctly handles the edge case where a species is mastered while an attunement for it is active.
2.  Research Focus activation is prevented or provides feedback if no valid encounters are currently possible.
3.  Invalid skill states in loaded data are detected and reset to a default, safe state.

**Story 3.9: Strategic Systems Performance**
**As a** developer, **I want** the strategic systems to maintain performance, **so that** encounter calculations remain fast even with active skills.
*Acceptance Criteria*
1.  The encounter calculation with an active Field Researcher skill completes in under 50ms.
2.  The Research Focus radiant guarantee efficiently bypasses the normal calculation.
3.  Activating or deactivating skills does not cause noticeable UI lag.

**Story 3.10: Strategic Systems Accessibility**
**As a** player with accessibility needs, **I want** to be able to use the strategic skill systems, **so that** I can enjoy the full depth of the game.
*Acceptance Criteria*
1.  The "Attune to Species" modal and the "Activate Focus" button are fully keyboard-operable.
2.  All status indicators (meter progress, cooldowns) are accessible to screen readers.
3.  All related UI elements are compliant with high-contrast mode.

**Story 3.11: Strategic Systems Analytics**
**As a** developer, **I want** visibility into strategic system usage, **so that** I can balance the skills and understand player behavior.
*Acceptance Criteria*
1.  Skill activation events for both "Field Researcher" and "Research Focus" are logged for analysis.
2.  The success rate of encounters while "Field Researcher" is active is tracked.
3.  The game context (e.g., player level, current location) when "Research Focus" is used is monitored.

**Story 3.12: Expanded Integration Testing**
**As a** developer, **I want** to expand testing to cover the new strategic systems, **so that** their interactions with the core loop and progression are verified.
*Acceptance Criteria*
1.  Integration tests verify that the "Field Researcher" skill correctly modifies encounter weights and that the effect expires after the correct number of encounters.
2.  Integration tests verify that "Research Focus" correctly guarantees radiant encounters and that the XP bonus from Epic 1 is applied.
3.  **Integration tests verify that unlocked perks from Epic 2 (e.g., Radiant Charm) correctly stack with the effects of these new strategic systems.**

### Epic 4: Content Polish & Launch Readiness

**Expanded Goal:** The goal of this epic is to take the fully functional application and transform it into a polished, high-quality, and releasable product. By the end of this epic, all MVP content will be complete and localized, the application will meet its performance and accessibility targets, and we will have the necessary monitoring in place for a successful launch.

**Story 4.1: Finalize All Species Content**
**As a** player, **I want** all 12 species in the MVP to have their complete and final data, including names, descriptions, and high-quality art, **so that** the world feels rich and complete.
*Acceptance Criteria*
1.  All 12 `speciesData` objects in the data files are populated with final, reviewed text content.
2.  All final art assets (species images, emojis, background images) are implemented and optimized.
3.  A final validation pass is run on all static data to ensure correctness and consistency.

**Story 4.2: Implement Dynamic Quiz Generation System**
**As a** player, **I want** to encounter a wide variety of quiz questions, **so that** the gameplay remains fresh and engaging even after multiple encounters.
*Acceptance Criteria*
1.  The `QuizTemplate` system is fully implemented with type-safe interfaces.
2.  At least 5 question templates per category are created with difficulty scaling (1-5).
3.  The system dynamically generates questions in all supported languages.
4.  **Generated questions are validated to ensure they have exactly one correct answer.**
5.  **Quiz generation time is benchmarked and remains under 100ms.**

**Story 4.3: Content Quality Assurance**
**As a** player, **I want** all content to be accurate, engaging, and free of errors, **so that** the educational value and entertainment quality are high.
*Acceptance Criteria*
1.  All species descriptions and scientific data are fact-checked for accuracy.
2.  All quiz questions are reviewed for clarity, educational value, and appropriate difficulty.
3.  All text content in the application is proofread for grammar and spelling across all four languages.

**Story 4.4: Complete 4-Language Localization**
**As a** player, **I want** to experience the entire game in any of the four supported languages, **so that** the game is fully accessible to a global audience.
*Acceptance Criteria*
1.  All UI text, species data, perk descriptions, and dynamic quiz templates are fully translated into English, Portuguese, French, and Spanish.
2.  The language switcher correctly updates all text content throughout the application instantly.
3.  A review is conducted to ensure UI layouts are not broken by text expansion in different languages.

**Story 4.5: Accessibility Audit & Implementation**
**As a** player with accessibility needs, **I want** the entire application to be compliant with WCAG 2.1 AA standards, **so that** I can have a complete and unhindered gameplay experience.
*Acceptance Criteria*
1.  A full accessibility audit is performed using automated tools and manual testing (e.g., keyboard-only navigation, screen reader review).
2.  All identified accessibility issues from previous epics are resolved.
3.  The application is verified to be fully compliant with WCAG 2.1 AA standards.

**Story 4.6: Performance Optimization & Benchmarking**
**As a** user, **I want** the application to be fast and responsive, **so that** my gameplay experience is smooth and enjoyable.
*Acceptance Criteria*
1.  Final bundle size is confirmed to be under 2MB with gzip compression.
2.  **Initial page load completes in under 3 seconds on a simulated 3G connection.**
3.  **Encounter generation completes in under 2 seconds.**
4.  **Language switching completes in under 100ms.**
5.  Performance profiling shows no memory leaks after a 30-minute gameplay session.

**Story 4.7: Cross-Browser & Device Testing**
**As a** user, **I want** the application to work consistently across different browsers and devices, **so that** I can enjoy the game regardless of my setup.
*Acceptance Criteria*
1.  The application is tested and verified on the latest two versions of Chrome, Firefox, Safari, and Edge.
2.  Mobile responsiveness and key interactions are tested on iOS Safari and Android Chrome.
3.  Performance is deemed acceptable on a representative mid-range mobile device.

**Story 4.8: Client-Side Security Review**
**As a** developer, **I want** to conduct a final security review, **so that** we can mitigate common client-side vulnerabilities before launch.
*Acceptance Criteria*
1.  A review for potential XSS vulnerabilities is conducted and any issues are patched.
2.  The application's Content Security Policy (CSP) is finalized and implemented.
3.  A review is conducted to ensure no sensitive data is improperly stored or exposed on the client side.

**Story 4.9: User Analytics Foundation**
**As a** team, **we want** to track key player actions, **so that** we can make data-driven decisions about game balance and future features.
*Acceptance Criteria*
1.  A lightweight analytics framework is integrated into the application.
2.  Key events are tracked: `Encounter_Started`, `Quiz_Success`, `Quiz_Fail`, `Level_Up`, `Perk_Unlocked`, `Skill_Activated`.
3.  All tracking respects user privacy and is purely anonymous.

**Story 4.10: Data Backup & Recovery Feature**
**As a** player, **I want** to be able to back up and restore my progress, **so that** I don't lose my hard-earned achievements.
*Acceptance Criteria*
1.  An "Export Save File" button is available in the settings screen that downloads the user's `localStorage` state as a JSON file.
2.  An "Import Save File" button allows a user to upload a valid save file to restore their state.
3.  The import function validates the file to prevent data corruption.

**Story 4.11: Error Monitoring & Production Readiness**
**As a** developer, **I want** comprehensive error monitoring and production safeguards in place, **so that** we can quickly identify and resolve issues after launch.
*Acceptance Criteria*
1.  The production error tracking service is fully configured and tested.
2.  Performance monitoring is active, with alerts configured for key metrics (e.g., high error rate, slow response times).
3.  Production environment variables and configurations are finalized and documented.

**Story 4.12: Address Accumulated Technical Debt**
**As a** developer, **I want** to address any significant technical debt accumulated during development, **so that** the codebase is clean, maintainable, and ready for future expansion.
*Acceptance Criteria*
1.  A code review of the entire project is conducted to identify areas for refactoring.
2.  Major "TODO" or "FIXME" comments in the code are resolved.
3.  Any identified anti-patterns or overly complex code sections are refactored for clarity and simplicity.

**Story 4.13: Launch Preparation & Documentation**
**As a** team, **we want** to be fully prepared for launch with proper documentation and processes, **so that** we can support the product effectively after release.
*Acceptance Criteria*
1.  The final deployment process is documented, tested, and automated.
2.  Monitoring dashboards are configured and accessible to the team.
3.  **A launch checklist is created, including a communication plan, deployment steps, and rollback criteria.**

**Story 4.14: Final Pre-Launch Testing & Bug Bash**
**As a** team, **we want** to conduct comprehensive final testing, **so that** we can identify and fix any remaining bugs before launch.
*Acceptance Criteria*
1.  **The full automated test suite passes with >90% code coverage.**
2.  Manual regression testing of all user flows is completed and signed off.
3.  All critical and major bugs discovered during the final testing pass are resolved.
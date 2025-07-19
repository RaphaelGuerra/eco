# Eco-Explorer: Itatiaia Nature Sanctuary Fullstack Architecture Document

## Introduction
This document outlines the complete architecture for a **client-side monolith** that will be deployed as static files, with future considerations for backend integration. The architecture is designed to be robust, performant, accessible, and scalable.

### Architectural Principles
The design of this application will be guided by the following core principles:
* **Mobile-First Responsive Design:** The UI and its components are designed for a mobile context first and then scaled up.
* **Progressive Enhancement:** Core functionality will be accessible on all supported browsers, with advanced features enhancing the experience on modern browsers.
* **Accessibility by Design:** All architectural and implementation choices must support our WCAG 2.1 AA compliance target.
* **Performance Optimization:** Every feature must be designed with our performance goals (bundle size, response times) in mind.
* **Offline Resilience:** The architecture must support core gameplay functionality without a network connection.

### Scope and Key Requirements
* **MVP Focus:** This architecture is specifically designed for the MVP launch, which includes 12 species.
* **Future Scalability:** While focused on the MVP, the architecture must be modular enough to support future expansion to 100+ species, cloud sync functionality, and advanced AI features.
* **Core Technology Stack:** Vite, React, and TypeScript.
* **Data Persistence:** The primary data persistence mechanism for the MVP is `localStorage`.

### Key Architectural Challenges
This project presents several unique challenges that this document will address:
* **Bundle Size Management:** Balancing the desire for rich, high-resolution visual assets with the strict <2MB bundle size requirement.
* **Client-Side Performance:** Ensuring complex animations and state calculations remain performant on a wide range of devices without a powerful backend.
* **Data Persistence & Migration:** Designing a robust data persistence and versioning strategy for `localStorage` that can be migrated to a cloud-based system in the future.

### Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-07-18 | 1.1 | Incorporated key constraints, principles, and challenges into introduction. | Winston, Architect |
| 2025-07-18 | 1.0 | Initial architecture draft creation. | Winston, Architect |

## High Level Architecture

### Technical Summary
The system is a **client-side monolithic SPA** built with React and TypeScript. Its internal architecture is layered to separate concerns: a **Component Layer** for the UI, a **Service Layer** for complex game logic (e.g., encounter and progression algorithms), a centralized **State Management Layer**, and a **Persistence Layer** using the Repository Pattern to abstract `localStorage`. This design supports offline functionality and is architected with a future-proof API abstraction layer to facilitate a later transition to a cloud-based backend.

### Internal Architecture Diagram
This diagram illustrates the internal layers and data flow of the React application.

```mermaid
graph TD
    subgraph "Browser / Device"
        A[User] -- Interacts with --> B[Component Layer (UI)];
        B -- Calls Actions --> C[Service Layer];
        C -- Game Logic (Encounter, Progression) --> C;
        C -- Dispatches State Changes --> D[State Management Layer (useReducer/Context)];
        D -- Notifies --> B;
        D -- Triggers --> E[Persistence Layer (Repository)];
        E -- Reads/Writes --> F[localStorage];
        E -- Handles Validation & Migration --> E;
    end

    style C fill:#dae8fc
    style D fill:#d5e8d4
    style E fill:#ffe6cc
Architectural and Design Patterns
Layered Architecture: The application is divided into distinct layers (Component, Service, State, Persistence) to ensure a strong separation of concerns and improve maintainability.

Service Layer Pattern: Complex, reusable business logic, such as the encounter algorithm and progression calculations, will be encapsulated within dedicated "services." This keeps the UI components clean and focused on rendering.

Normalized State Management with Optimized Persistence: All application state will be normalized for efficient lookups. A central state store (useReducer/Context) will manage state changes, which are then queued and synchronized with localStorage via the Persistence Layer to optimize performance.

Repository Pattern (Enhanced): The Persistence Layer will use the Repository Pattern to handle all localStorage interactions. This layer is responsible for data validation, error handling, and data versioning & migration.

Event-Driven Principles (Client-Side): The state management will use an event-driven approach where UI components dispatch actions (events) and the state layer updates, causing subscribed components to react and re-render.

Future Scalability Strategy
API Abstraction Layer: The Persistence Layer is designed as an abstraction. To move to a cloud backend, we would only need to replace the localStorage implementation within this layer with an API-based one.

Data Synchronization: The design will account for future data synchronization logic, ensuring that the offline-first functionality can coexist with cloud saves.

Feature Flags: A simple feature flag system will be implemented to allow for the gradual rollout of new features.

Tech Stack
Core Framework & Language
Category	Technology	Version	Purpose & Rationale
Language	TypeScript	^5.4.x	Provides strong typing for the entire codebase, reducing bugs and improving developer experience.
Core Framework	React	^18.2.x	The chosen UI framework for building a component-based, interactive single-page application.
Build Tool	Vite	^5.2.x	Provides a fast, modern development experience and an optimized build process.

Export to Sheets
State Management & Data
Category	Technology	Version	Purpose & Rationale
State Management	React Hooks & Context	(built-in)	For the MVP, leveraging React's native state management is sufficient and avoids adding external dependencies.
Complex State	Zustand	^4.5.x	(Optional) A lightweight library to be considered if state logic becomes overly complex for useReducer/Context.
Data Fetching	TanStack Query	^5.45.x	Will be used for any future API integration, providing robust caching and state synchronization.
Data Persistence	Browser localStorage	(built-in)	The chosen persistence mechanism for the offline-first MVP, abstracted via the Repository Pattern.

Export to Sheets
UI, Styling & Animation
Category	Technology	Version	Purpose & Rationale
Styling	Tailwind CSS + CSS Modules	^3.4.x	A hybrid approach: Tailwind for rapid utility-first styling and CSS Modules for component-specific, scoped styles.
Internationalization (i18n)	React Intl	^6.6.x	Provides a robust and comprehensive solution for the 4-language translation requirement.
Animation	Framer Motion	^11.2.x	A powerful animation library that simplifies creating performant and accessible animations.

Export to Sheets
Testing
Category	Technology	Version	Purpose & Rationale
Unit/Integration	Vitest & RTL	^1.6.x	A modern, Vite-native testing framework that is fast and easy to configure.
DOM Assertions	Testing Library Jest DOM	^6.4.x	Provides useful custom matchers for testing the state of the DOM.
E2E Testing	Playwright	^1.44.x	Provides robust, reliable end-to-end testing across all target browsers.
API Mocking	MSW (Mock Service Worker)	^2.3.x	Will be used to mock API requests for testing future backend integrations.

Export to Sheets
Development Experience & Quality
Category	Technology	Version	Purpose & Rationale
Linting/Formatting	ESLint & Prettier	latest	Enforces consistent code style and catches common errors.
Git Hooks	Husky	^9.0.x	Automates running linters and tests before commits.
Commit Messages	Commitizen	^4.3.x	Enforces a consistent commit message format (Conventional Commits).
Component Dev	Storybook	^8.1.x	Provides an isolated environment for developing, documenting, and testing UI components.
Accessibility Testing	axe-core	^4.9.x	Integrated into Storybook and E2E tests for automated accessibility checking.

Export to Sheets
Versioning Strategy
All dependencies will be pinned to specific versions using the ^ prefix (e.g., ^5.4.x) to ensure stability. Updates will be reviewed and tested in a controlled manner.

Data Models
Core Enums
TypeScript

// For species rarity and point calculation
enum RarityLevel {
  Common = 1,
  Uncommon = 2,
  Rare = 3,
  Legendary = 4,
}

// For game state
enum TimeOfDay { Day = 'day', Night = 'night' }
enum WeatherCondition { Clear = 'clear', Rainy = 'rainy' }

// For player progression
enum MasteryLevel {
  Undiscovered = 0,
  Novice = 1,
  Master = 2,
}
Core Data Models
Model: Species
TypeScript

interface QuizItem {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

interface EncounterRules {
  time: Array<TimeOfDay>;
  weather: Array<WeatherCondition>;
}

interface MasteryPerk {
  id: string;
  name: string;
  description: string;
}

interface Species {
  id: string;
  name: string;
  scientificName: string;
  emoji: string;
  description: string;
  imageUrl: string;
  conservationStatus: string;
  rarity: RarityLevel;
  masteryPointsValue: number;
  habitat: 'sky' | 'ground';
  quizPool: QuizItem[];
  encounterRules: EncounterRules;
  masteryPerk: MasteryPerk;
}
Model: PlayerState (Progression Data)
TypeScript

interface EcoLogEntry {
  researchLevel: MasteryLevel;
  researchXp: number;
}

interface PlayerStatistics {
  totalEncounters: number;
  totalQuizzes: number;
  correctAnswers: number;
  radiantEncounters: number;
}

interface PlayerState {
  schemaVersion: number;
  unlockedPerks: string[];
  masteryPoints: number;
  ecoLog: Record<string, EcoLogEntry>; // Keyed by Species['id']
  statistics: PlayerStatistics;
}
Model: GameState (Session Data)
TypeScript

interface ActiveFieldResearch {
  speciesId: string;
  encountersRemaining: number;
  multiplier: number;
}

interface ResearchFocus {
  meterProgress: number; // 0-100
  isActive: boolean;
  encountersRemaining: number;
}

interface GameState {
  currentLocationId: string;
  gameTime: TimeOfDay;
  weather: WeatherCondition;
  lastEncounterTime: number;
  activeFieldResearch: ActiveFieldResearch | null;
  researchFocus: ResearchFocus;
}
Model: Settings
TypeScript

interface Settings {
  language: 'en' | 'pt' | 'fr' | 'es';
  masterVolume: number; // 0-1
  musicVolume: number; // 0-1
  effectsVolume: number; // 0-1
  isHighContrast: boolean;
  isMotionReduced: boolean;
}
Data Integrity & Validation
Runtime Validation: All data loaded from localStorage will be validated at runtime using Zod schemas that mirror these TypeScript interfaces.

Default Values: A well-defined default state will be created for PlayerState, GameState, and Settings to initialize the application for a new player.

Components
Service Layer Components (Business Logic)
EncounterService: Manages the encounter algorithm, handles radiant variant logic, and coordinates with the SkillService.

ProgressionService: Handles all player progression calculations, including XP awards, leveling up, and mastery points.

SkillService: Manages the state and logic for the Field Researcher and Research Focus skills.

QuizService: Manages the dynamic generation of quiz questions from templates.

LocalizationService: Manages the loading of translation files and provides functions for retrieving localized text.

PersistenceService: Acts as the Repository for all localStorage interactions, handling data validation, versioning, and migration.

UI Container Components (UI Layer)
AppContainer: The root component of the application, responsible for managing global state.

ExplorationViewContainer: The main screen component that calls the EncounterService and manages the core gameplay loop.

StatusPanelContainer: Manages the real-time display of environment status, skill cooldowns, and the focus meter.

QuizModalContainer: Manages the state of an active quiz, from displaying the question to handling the result.

EcoLogContainer: Manages the fetching, filtering, and displaying of all species data.

PerksContainer: Manages the visualization of the perk tree and mastery point progress.

Component Communication & Principles
State Synchronization: The UI layer stays synchronized with the Service and State layers primarily through the React Context API.

Error Propagation: Errors originating in a Service will propagate up to the calling UI Container, which will display a user-friendly message. UI components will be wrapped in Error Boundaries.

Loading States: UI Containers are responsible for managing their own loading states.

External APIs
For the MVP, "Eco-Explorer" is a self-contained, client-side application. The core gameplay loop has no dependencies on external APIs. Services like error monitoring (Sentry) will be integrated via SDKs.

Core Workflows
The core workflow is the Encounter & Progression Loop. A sequence diagram details the interaction between the User, ExplorationView, EncounterService, ProgressionService, StateManagement, and PersistenceService. The workflow includes integration points for the SkillService and paths for error handling and skill activation.

Database Schema
The entire persisted state will be stored in localStorage under a single key. The value will be a JSON object containing schemaVersion, playerState, and settings, matching the defined Data Models. The PersistenceService will manage schema versioning and migration.

Source Tree
The codebase will follow a modern React best practice structure, with a src directory containing clearly separated folders for assets, components (further subdivided into ui, containers, layouts), constants, context, data, hooks, services, state, styles, types, and utils. Tests will be co-located with their corresponding component or service files.

Development Workflow
The development workflow is based on a Trunk-Based Development model. It uses npm scripts for common tasks (dev, build, test, lint). Quality is enforced via pre-commit hooks (Husky) running linting and testing on staged files. The Pull Request process includes code reviews and automated checks via a CI Pipeline in GitHub Actions.

Deployment Architecture
The application will be deployed as static files to a global CDN, with Vercel being the recommended provider. The CI/CD pipeline on GitHub Actions will automate testing and deployment. Preview deployments will be created for each pull request, and the main branch will deploy to production after all checks pass. The architecture includes a rollback strategy and comprehensive monitoring.

Implementation Standards & Quality
Coding Standards: All code will adhere to the standards enforced by ESLint (Airbnb config) and Prettier, using Conventional Commits.

Testing Strategy: The strategy includes unit/integration tests (Vitest), E2E tests (Playwright), and accessibility tests (axe-core), with a target of >90% code coverage.

Security Standards: Security is built-in via CI/CD vulnerability scanning and a Content Security Policy (CSP).

Error Handling & Monitoring: Errors are handled by React Error Boundaries and reported to Sentry for production monitoring.
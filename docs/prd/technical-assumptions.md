# Technical Assumptions

## Repository, Architecture, and Deployment
* **Repository Structure:** The application will be contained within a **Single Git Repository** to simplify dependency management and the build process for the MVP.
* **Service Architecture:** The application will be a **Monolithic Frontend** (Client-side Monolith), where all logic and state are handled within the single React application.
* **Deployment:** The application will be deployed as **static files on a CDN** to maximize global performance and uptime. Environment-specific settings will be handled at build time.
* **Build Tooling:** **Vite** is the preferred build system for its performance and modern developer experience. The build process must generate optimized, minified assets for production.

## Performance & Scalability
* **Bundle Size:** The initial production bundle size must not exceed **2MB** to support the sub-2-second response time requirement (NFR5).
* **Memory Management:** The application's data structures and components must be optimized to handle a growing dataset of 100+ species without significant performance degradation.
* **Caching Strategy:** Static assets (images, fonts, translation files) will be configured with aggressive browser caching headers.

## Data & State Architecture
* **State Management:** The application will use React's built-in state management (**`useState`**, **`useReducer`**) and Context API. It will not use external global state libraries like Redux for the MVP.
* **Immutability:** All state updates must follow immutable patterns to ensure predictable rendering and prevent side effects.
* **Data Normalization:** Species, perk, and other game data will be stored in a normalized structure (e.g., objects with IDs as keys) for efficient lookups and updates.
* **Data Persistence & Migration:** The MVP will use **`localStorage`** for state persistence. The data schema stored in `localStorage` **must be versioned** to support future data migrations without data loss for the user.

## Testing and Quality
* **Testing Strategy:** The strategy will include **Unit + Integration Testing** with a specific focus on:
    * Encounter algorithm accuracy and performance.
    * Progression system calculations (XP, levels, perks).
    * Multilingual content switching and dynamic text generation.
    * Offline functionality and data persistence.
    * Accessibility compliance (keyboard navigation, screen readers).
* **Browser Compatibility:** The application will support the latest two major versions of **Chrome, Firefox, Safari, and Edge**. A polyfill strategy will be used for modern JavaScript features.

## Security
* **Client-Side Validation:** As a client-side application, all game logic (e.g., quiz answers, progression calculations) must be validated on the client.
* **Input Validation:** All user inputs (e.g., settings changes) must be validated to prevent trivial injection issues.
* **Content Security Policy (CSP):** The application will implement appropriate CSP headers to mitigate cross-site scripting (XSS) risks.

## Multilingual System
* **Translation Loading:** All language files will be loaded upfront during the initial application load to facilitate instantaneous language switching as required by FR7.
* **UI Adaptation:** UI components must be designed to gracefully handle text expansion and contraction that occurs between different languages.

## Future-Proofing
* **Third-Party Dependencies:** Any new external dependency must be critically evaluated for its bundle size impact, performance overhead, and long-term maintenance viability.
* **Architectural Flexibility:** The MVP architecture should be clean and modular to allow for future integration of advanced AI and data systems, but it should not be burdened by premature optimization for them.
* **Monitoring:** A lightweight error tracking and performance monitoring service will be integrated to report on production issues.

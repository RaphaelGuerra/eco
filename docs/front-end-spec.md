# Eco-Explorer: Itatiaia Nature Sanctuary UI/UX Specification

## Introduction
This document defines the user experience goals, information architecture, user flows, and visual design specifications for Eco-Explorer: Itatiaia Nature Sanctuary. It serves as the foundation for visual design and frontend development, ensuring a cohesive and user-centered experience.

### Overall UX Goals & Principles

#### Target User Personas
* **The Student/Educator:**
    * **Age/Context:** Students (age 8-18) and Educators (25+) often using shared devices in classroom settings.
    * **Session:** Engages in structured 15-45 minute sessions.
    * **Motivation:** Focused on achieving clear learning outcomes and curriculum integration.
* **The Nature Enthusiast:**
    * **Technical Comfort:** Varies from casual user to ecology expert.
    * **Session:** Prefers longer, more immersive, and self-directed sessions.
    * **Motivation:** Driven by a desire for deep ecological knowledge and conservation awareness.
* **The Casual Gamer:**
    * **Motivation:** Drawn to relaxing simulation and exploration games; seeks an engaging and low-stress experience.

#### Usability Goals
* **Engaging & Fun:** The primary goal is to make the learning process feel like enjoyable gameplay, not a chore.
* **Intuitive Discovery:** Players should be able to understand the core mechanics of exploration and research with minimal instruction.
* **Rewarding Progression:** The interface must clearly communicate progress and make unlocking new perks and content feel meaningful.
* **Accessible by Default:** The experience should be usable and enjoyable for players with a wide range of abilities.
* **Seamless Language Switching:** Players should be able to change languages instantly without losing progress or context, with an interface that feels natural for each supported culture.
* **Curriculum Alignment:** The interface should support structured learning sessions and provide clear progress tracking suitable for educational use.
* **Performance Responsiveness:** The interface must remain responsive and smooth even during complex animations and state transitions.
* **Offline Resilience:** The experience should gracefully handle network interruptions and provide clear feedback to the user about data persistence status.

#### Design Principles
* **Mobile-First, Touch-Optimized Design:** The interface must work beautifully on touch devices while maintaining precision for mouse interactions on larger screens.
* **Clarity Over Clutter:** Prioritize clear communication and intuitive actions, ensuring the focus remains on the game world.
* **Immersive Feedback:** Every player action should have an immediate, thematic, and understandable visual or auditory response.
* **Progressive Disclosure:** Complex systems (like the perk tree and mastery mechanics) should be revealed gradually as players progress, preventing cognitive overload for new users.

### Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-07-16 | 1.1 | Incorporated refinements to UX goals, principles, and personas. | Sally, UX |
| 2025-07-16 | 1.0 | Initial UI/UX Spec draft creation. | Sally, UX |

## Information Architecture (IA)

### Site Map / Screen Inventory
This diagram shows the relationship between the primary screens and modals. The system uses progressive disclosure, so screens like "Perks" and "Skill Management" only become accessible after the player has made sufficient progress.

```mermaid
graph TD
    subgraph Core Navigation & Screens
        A[Park Map / Travel Screen] --> B(Main Exploration View);
        A --> C(Eco-Log / Field Journal);
        A --> D(Perks Screen);
        A --> E(Settings);
        A --> SM(Skill Management Screen);
    end

    subgraph Main Gameplay Loop
        B -- 1. Triggers Scan --> F{Encounter?};
        F -- Yes --> G[Species Info Modal];
        G -- 'Log Species' --> H(Quiz Modal);
        H -- Answer Submitted --> I(Result Modal);
        I -- 'Close' --> B;
        G -- 'Release' --> B;
    end

    subgraph Strategic Systems
        B -- Contains --> SP(Status Panel);
        SP -- Displays --> SPM(Focus Meter);
        SP -- Displays --> FSS(Field Skill Status);
        SP -- Displays --> ES(Environment Status);
        SM -- Activates --> SKA((Skill Activation Modals));
    end

    subgraph Progression & Unlocks
        C --> C1[Species Detail View];
        D -- Tracks --> D1[Mastery Point Progress];
        A -- Contains --> Z1(Sub-Zone: Locked);
        A -- Contains --> Z2(Sub-Zone: Unlocked);
        Z2 --> B;
    end

    style D fill:#f9f,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5;
    style SM fill:#f9f,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5;
    style Z1 fill:#ccc,stroke:#333,stroke-width:2px;
Navigation Structure
Contextual & Progressive Navigation: The main navigation system will adapt to the player's progress. Initially, a new player might only see icons for the Map and Settings. As they discover their first species, the Eco-Log appears. After unlocking their first perk, the Perks Screen becomes visible. This prevents overwhelming new users.

Status Panel: The main exploration view will contain a persistent Status Panel. This is not for navigation but for displaying real-time information, including the Environment Status, Research Focus Meter, and the state of the Field Researcher Skill.

Flow-Based Navigation: As before, clear screen titles and a persistent "Back" or "Close" button will guide users through modals and sub-screens.

Accessibility & Redundancy: To ensure accessibility, critical functions will have redundant access paths where appropriate. For example, a player could access their perks through the main navigation or by tapping on a completed species in their Eco-Log.

User Flows
Complete Encounter & Research Loop
User Goal: The player's goal is to successfully discover a species, answer a quiz correctly, and gain research XP, making progress in their Eco-Log.

Entry Points: Clicking the "Explore Biome" button on the Main Exploration View.

Success Criteria: The player receives a "Success!" message and sees their researchXp for the encountered species increase, along with any potential level-up or perk unlock notifications.

Flow Diagram (Enhanced)
Code snippet

graph TD
    subgraph Pre-Encounter
        A[Start: Exploration View] --> A1(Player sees Environment Status);
        A1 --> B{Player clicks 'Explore Biome'};
    end

    subgraph Encounter Algorithm
        B --> C[System Scans... (2s)];
        C --> C1[Check Environment & Active Skills];
        C1 --> D{Encounter Found?};
        D -- No --> E[Show 'No Signatures' message];
        E --> Z[End Flow & Update Meters];
    end

    subgraph Encounter Details
        D -- Yes --> F{Check for Radiant Status};
        F --> G[Show Species Info Modal (with radiant indicator)];
        G --> H{Player clicks 'Log Species'?};
        H -- No, clicks 'Release' --> Z;
    end

    subgraph Quiz & Result
        H -- Yes --> I[Show Quiz Modal];
        I --> J{Player answers correctly?};
        J -- No --> K[Show 'Species Fled' message];
        K --> Z;
        J -- Yes --> L[Show 'Success!' message];
    end

    subgraph Progression & Feedback Loop
        L --> M[System calculates XP (50 base, 100 radiant)];
        M --> N[Display XP Gained];
        N --> O{Level Up?};
        O -- Yes --> P[Display 'Level Up!' message];
        P --> Q{Mastery & New Perk?};
        Q -- Yes --> R[Display 'Perk Unlocked!' message];
        O -- No --> Z;
        Q -- No --> Z;
        R --> Z;
    end

    Z --> A;

    style A fill:#ccffcc
Progressive Disclosure & Accessibility
Progressive Disclosure: For new players, UI elements like the "Research Focus Meter" and "Field Researcher Skill" will not be visible in the Status Panel. They will appear only after the player meets the unlock criteria (e.g., first encounter, 3 species mastered).

Accessibility (A11Y): Steps G, I, and the final feedback messages (N, P, R) are critical points where screen reader announcements must clearly communicate the state change and outcomes to the player. All modal interactions must be fully keyboard-navigable.

Edge Cases & Error Handling (Expanded):
User Experience Edge Cases:

Player rapidly clicks "Explore Biome": The button should be disabled during the "Scanning..." phase.

Player takes too long to answer a quiz: A timeout could be implemented, counting as an incorrect answer.

Player switches language during an active encounter: The system should gracefully handle the state and re-render all modal text in the new language without losing progress in the current encounter.

Technical Edge Cases:

Network interruption during quiz submission (for future cloud save features): The system should queue the result and attempt to sync later.

Data persistence failure after XP gain: The system should detect the failure and notify the user that their last result might not have been saved.

Invalid species data is loaded: The system should skip the invalid species during the filtering process and log an error for developers.

Activate "Field Researcher" Skill
User Goal: The player's goal is to select a specific discovered species to "attune" to, which will increase their chances of finding it for a limited number of encounters.

Entry Points: Clicking the "Attune to Species" button in the Status Panel (this button is only active when the skill's state is "Ready").

Success Criteria: The player receives clear confirmation that the skill is active, and the Status Panel UI updates to show the active state, the target species, and the remaining duration.

Flow Diagram (Enhanced)
Code snippet

graph TD
    A[Start: Status Panel shows skill is 'Ready'] --> B{Player clicks 'Attune to Species'};
    B --> C{System validates: Discovered species > 0?};
    C -- No --> D[Show message: 'You must discover a species first.'];
    D --> J[End Flow];
    C -- Yes --> E[Show Species Selection Modal (filtered to discovered species only)];
    E --> F{Player selects a species & clicks 'Confirm'};
    F -- No, clicks 'Cancel' --> G[Close Modal];
    G --> J;
    F -- Yes --> H[System validates & saves activeFieldResearch state to localStorage];
    H --> I[Status Panel UI updates to show 'Active: [Species Name] (5 encounters remaining)'];
    I --> J;
    
    style J fill:#ccffcc
UI Design Considerations
Species Selection Modal:

Visual Hierarchy: The modal should clearly display species with their name, emoji, and current research level to help the player make a strategic choice.

Search/Filter: For players with many discovered species, the modal must include search and filter functionality (e.g., filter by rarity or habitat).

Clear Call-to-Action: The "Confirm" button should be prominent and contextual (e.g., "Attune to Jaguar").

Feedback: The modal should clearly state the effect ("Grants a 2x encounter chance for 5 encounters") and the subsequent cooldown period ("10-encounter cooldown after use").

Edge Cases & Error Handling (Expanded):
User Experience Edge Cases:

No Discovered Species: If the player unlocks the skill but has not yet discovered any species, the activation modal shows an informative message instead of an empty list.

Activation Without Encounters: If the player activates the skill but then does not trigger any encounters, the 5-encounter duration only decrements when an actual encounter check is run.

Location Switching: The skill's effect and duration persist when the player moves between different locations and biomes.

Technical Edge Cases:

State Corruption: On load, if the activeFieldResearch state is invalid (e.g., refers to a non-existent species ID), it should be safely reset to null.

Concurrent Skill Activation: The UI logic must prevent the activation of this skill if another modal or skill (like "Research Focus") is already in an active state.

Data Persistence Failure: If saving the state to localStorage fails, the UI should revert to the pre-activation state and show a non-intrusive error message.

Activate "Research Focus" Skill
User Goal: The player's goal is to activate their fully charged "Research Focus" meter to guarantee that their next three encounters are with radiant variants, maximizing their XP gain.

Entry Points: Clicking the "Activate Focus" button in the Status Panel (this button is only enabled when the researchFocus.meterProgress is 100).

Success Criteria: The player makes an informed decision to activate the skill, receives clear confirmation, and the Status Panel UI updates to reflect the active state and its duration.

Flow Diagram (Final)
Code snippet

graph TD
    A[Start: Status Panel shows Focus Meter is 100%] --> B{Player clicks 'Activate Focus'};
    B --> C[System validates state & environment];
    C --> D[Show Enhanced Confirmation Modal];
    D -- Modal displays strategic context & potential value --> D;
    D --> E{Player clicks 'Confirm'};
    E -- No, clicks 'Cancel' --> F[Close Modal];
    E -- Yes --> G[System validates & saves researchFocus.isActive state];
    G --> H[Status Panel UI updates with 'Focus Active' visual effect & counter];
    H --> I[End Flow];
    F --> I;

    style I fill:#ccffcc
UI Design Considerations
Confirmation Modal:

Visual Weight: The modal should use unique styling, animations, or visual effects to feel more significant than a standard modal.

Value Proposition: It must clearly communicate the benefit, e.g., "Guarantee 3 Radiant Encounters! (Potential for 300 XP)."

Strategic Advice: It should include a brief tip, such as, "Best used when you have time for at least three encounters in an area with high-value species."

Post-Activation Feedback
The Status Panel should show a clear, persistent visual effect while the skill is active (e.g., a glowing meter).

The UI must clearly count down the remaining encounters ("3 encounters left," "2 encounters left," etc.).

During an encounter, a visual indicator should confirm that the "Focus" is active and that this species is a guaranteed radiant.

Edge Cases & Error Handling (Expanded):
Strategic Edge Cases:

Activation without Exploration: The 3-encounter duration does not expire over time, only by performing the "Explore Biome" action.

Location Switching: The "Focus" effect persists when the player moves between different biomes.

Interaction with "Field Researcher": If both skills are active, they stack. The player gets a guaranteed radiant encounter with an increased chance for it to be the "attuned" species.

User Experience Edge Cases:

Accidental Activation: The enhanced confirmation modal serves to prevent accidental clicks. An "undo" feature is not necessary for the MVP.

Meter Fills During Active Skill: Any focus gained while the skill is already active is lost. This is an intentional design choice to make the timing of activation strategic.

Player Confusion: The confirmation modal's explicit text about the value and duration will serve as the primary educational context.

Review Species Progress in the Eco-Log
User Goal: The player's goal is to use the Eco-Log as an interactive research tool to review their progress, understand species in greater depth, and make strategic decisions about future exploration.

Entry Points: Clicking the "Eco-Log" icon in the primary navigation.

Success Criteria: The player can access comprehensive data about a species and use that information to take direct action within the game.

Flow Diagram (Enhanced)
Code snippet

graph TD
    A[Start: Any Screen] --> B{Player clicks 'Eco-Log' Nav Icon};
    B --> C[Show Eco-Log Main Screen];
    C -- UI provides Sort/Filter/Search options --> C;
    C --> D{Player selects a Species};
    D --> E[Show Enhanced Species Detail View];
    subgraph Detail View Content
        E -- Displays --> E1[Progress: Level, XP, Mastery Points];
        E -- Displays --> E2[History: Encounter stats, Quiz performance];
        E -- Displays --> E3[Strategic Info: Optimal time/weather];
        E -- Displays --> E4[Perk Info: Unlocked & future perks];
    end
    E --> F{Player clicks 'Quick Action' (e.g., Find Species)};
    F --> G[Navigate to Park Map with location highlighted];
    E --> H{Player clicks 'Back'};
    H --> C;

    style C fill:#ccffcc
UI Design & Interaction
Progressive Disclosure: The Eco-Log will initially only show discovered species. Undiscovered species will appear as silhouettes or question marks once the player has met certain criteria (e.g., explored a zone where they live), encouraging further investigation.

Enhanced Detail View: The Species Detail View is a rich interface, not just a static page. It will include:

Progress: Clear display of Research Level, XP Bar, and how many Mastery Points this species contributes.

History: Data such as "First Discovered," "Last Seen," and Quiz Success Rate.

Strategic Context: A section advising the player on the optimal time, weather, and locations to find this species again.

Interactive Elements: Information is actionable. For example, clicking the "optimal location" could take the player directly to that spot on the Park Map.

Edge Cases & Error Handling (Expanded):
Educational Edge Cases:

Discovered but Not Logged: A species that has been seen but not successfully quizzed will have a distinct state in the Eco-Log, prompting the player to "Learn More" by finding it again.

Incomplete Data: The UI will gracefully handle any species with missing art or descriptive text, showing a "Data Coming Soon" placeholder instead of a broken interface.

Performance Edge Cases:

Large Species Database: The Eco-Log list will use virtualization ("windowing") to ensure smooth scrolling performance even with hundreds of species.

Image Loading: All images will lazy-load with placeholders to prevent UI jank and reduce initial load times.

Review Perks & Mastery Progress
User Goal: The player's goal is to use the Perks & Mastery screen as a strategic tool to plan their progression, understand the abilities they've unlocked, and see a clear path toward full mastery.

Entry Points: Clicking the "Perks" icon in the primary navigation (which is only visible after the first perk is unlocked).

Success Criteria: The player can successfully view all unlocked perks and their current Mastery Point total, understanding how close they are to the final goal.

Flow Diagram (Enhanced)
Code snippet

graph TD
    A[Start: Any Main Screen] --> B{Player clicks 'Perks' Nav Icon};
    B --> C[Show Interactive Perks & Mastery Screen];
    subgraph Screen Features
        C -- Displays --> C1[Mastery Point Progress & Breakdown];
        C -- Displays --> C2[Perk Tree Visualization (Locked & Unlocked)];
        C -- Has --> C3[Sort/Filter Controls];
    end
    C --> D{Player interacts with a Perk};
    D --> E[Show Enhanced Perk Details];
    E -- Includes strategic advice & unlock info --> E;
    E --> F{Player clicks 'View Source Species'};
    F --> G[Navigate to that species in Eco-Log];
    G --> C;
    E --> C;
    C --> H{Player clicks 'Back'};
    H --> A;

    style C fill:#ccffcc
UI Design & Interaction
Perk Tree Visualization: Instead of a simple list, perks will be displayed in a visual tree or constellation map. This shows how individual species masteries (Tier 1 perks) contribute to larger goals and eventually the final Mastery Perk.

Progressive Disclosure: Locked perks will be visible but greyed out, with tooltips on interaction that clearly state their unlock requirements (e.g., "Master the Jaguar to unlock").

Enhanced Perk Details: Interacting with a perk will show:

Its name, description, and effect.

The species that granted it, with a quick navigation link to that species' entry in the Eco-Log.

Strategic advice on how to best use the perk.

Mastery Point Breakdown: The main progress bar will be interactive. Clicking on it will reveal a breakdown showing which species contributed how many points, helping players strategize which species to master next for maximum point efficiency.

Edge Cases & Error Handling (Expanded):
Strategic Edge Cases:

Suboptimal Mastery Path: The UI will provide gentle guidance by highlighting high-point-value species that the player has discovered but not yet mastered.

Perk Redundancy: If perks have similar effects, their descriptions will clarify their unique applications or how they stack.

User Experience Edge Cases:

Perk Effect Confusion: The perk details will include a simple, concrete example of the perk in action (e.g., "Example: Your 10% radiant chance becomes 15%").

Visual Clutter: As the player unlocks many perks, the "tree" view will intelligently zoom or collapse sections to keep the screen readable and focused.

First-Time User Onboarding
User Goal: The new player's goal is to learn the core gameplay loop and understand the game's depth in a way that is tailored to their interests, building confidence and intrigue for future sessions.

Entry Points: Launching the application for the first time (when no save data exists in localStorage).

Success Criteria: The player successfully completes their first encounter and understands how to initiate the next one on their own.

Flow Diagram (Enhanced)
Code snippet

graph TD
    A[Start: New Player Launches App] --> B{Ask Player's Goal: 'Learning', 'Fun', etc.};
    B --> C[Display Contextual Introduction based on persona];
    C --> D[Place Player in Starting Location];
    D --> E[Overlay 1: Guide 'Explore Biome' action];
    E --> F{Player Clicks 'Explore Biome'};
    F --> G[System initiates a Guided Encounter];
    G -- Tutorial hints at how time/weather can affect results --> G;
    G --> H[Show Species Info Modal with tutorial tip];
    H --> I{Player Clicks 'Log Species'};
    I --> J[Show Quiz Modal with tutorial tip];
    J --> K{Player Answers Quiz};
    K --> L[Show 'Success!' & XP Gain with explanation];
    L --> M[Overlay 2: "Nice work! You can track progress in your Eco-Log."];
    M --> N{Offer Optional Guided Tour of other features?};
    N -- Yes --> O[Guided tour of Eco-Log, Perks screen, etc.];
    N -- No --> P[End Onboarding - Player has free control];
    O --> P;

    style P fill:#ccffcc
Onboarding Design Principles
Persona-Specific Onboarding: The initial introduction and tone will adapt based on whether the player identifies as being here for structured learning or for fun.

Learn by Doing: The tutorial guides the player through performing actions themselves.

Hint at Depth: During the guided first encounter, the UI will subtly hint at deeper systems (e.g., "The weather is clear right now, perfect for finding this species!").

Confidence Building: The first encounter is guided to ensure success, but with contextual hints that teach the underlying mechanics rather than just dictating clicks.

UI Design Considerations
Tutorial Overlays: Overlays will be non-intrusive, use a clear visual hierarchy to stand apart from the main UI, and be culturally sensitive in their language and iconography.

Progressive Complexity: The tutorial will start with simple interactions (clicking a button) and build towards more complex ideas (understanding environmental effects).

Edge Cases & Error Handling (Expanded):
Educational Settings: The onboarding flow should have an "educator mode" that allows for quick resets for multiple students using the same device.

Accessibility: All tutorial overlays, buttons, and text must be fully announced by screen readers and navigable via keyboard. Alternative interaction methods for motor impairments will be considered.

Technical Issues: The onboarding will function in offline mode. It will handle save data creation gracefully and provide clear feedback if persistence fails.

Wireframes & Mockups
Primary Design Files
Primary Design Tool: [Link to Figma/Sketch/Adobe XD Project - TBD]

Core Design Principles
Mobile-First & Accessibility Principles
Thumb-Friendly Zones: All primary interactive elements (like "Explore Biome," navigation icons) will be placed within comfortable thumb-reach zones at the bottom of the screen for mobile devices.

Touch Target Sizes: All interactive elements must have a minimum touch target size of 44x44 pixels to meet accessibility standards.

Gesture Support: Standard mobile gestures (swipe, pinch) will be supported for actions like navigating image galleries or zooming on the map.

Keyboard Navigation: A logical tab order and clear focus indicators will be implemented for all interactive elements, ensuring full keyboard-only operability.

Color Contrast: All text and meaningful UI elements must meet a minimum WCAG 2.1 AA contrast ratio of 4.5:1 against their background.

Design System Foundation
Color Palette: The design will use the "stylized realism" scheme, centered on saturated deep greens and earthy browns, with brilliant pops of color for accents and key species. A full palette will be defined in the Branding section.

Typography: Font choices will prioritize readability across all supported languages and devices. A clear type hierarchy (headings, body, captions) will be established.

Iconography: Icons will be clean, simple, and universally understandable, with a consistent style for both navigation and status indicators.

Animation: Motion will be used purposefully to provide feedback and guide the user's attention, with smooth, natural timings. All animations must be brief and non-disruptive.

Key Screen Layouts
Screen: Main Exploration View
Purpose: To be an immersive window into the game world, while providing clear, at-a-glance status information and access to the core game loop.

Key Elements:

Background: The full-screen, high-resolution background image of the current location.

Status Panel: A contextual overlay that adapts to player progress. Initially simple (Time/Weather), it will progressively disclose the Research Focus Meter and Field Researcher Skill status as they are unlocked. It will collapse or adapt for smaller screens while ensuring key information is always visible.

Main Action Button: A prominent, thumb-accessible "Explore Biome" button with clear visual states for default, hover, pressed, and disabled (during scan).

Modal Integration: All modals (Encounter, Quiz, Result) will appear centered, with a semi-transparent overlay behind them to maintain context with the background. Modal focus will be managed for accessibility.

Loading & Error States: The 2-second scan will feature a non-intrusive scanning animation. Other loading or error states will be communicated via a small, centered toast or banner.

Screen: Eco-Log Screen
Purpose: To serve as the player's interactive and strategic research hub, allowing them to review progress, access deep information about species, and make informed decisions about what to pursue next.

Layout & View Options:

The main content area will be an adaptive layout that can be toggled between a visual grid view (default) and a more data-dense list view.

The Search & Filter Bar will be a collapsible toolbar to maximize screen real estate, expanding when in use.

The Species Card (in Grid/List View): Each species will be represented by a card containing a clear visual hierarchy:

Primary Info: Species Image/Emoji & Name.

Secondary Info: Rarity indicator and a visual Research Level/XP progress bar.

Tertiary Info (on hover/tap): Mastery Point value and optimal time/weather conditions.

Status Indicators: A visual badge will clearly indicate "Mastered" status. Recently discovered or leveled-up species will have a temporary highlight to draw the user's attention.

Detail View Integration:

Selecting a species card will open the Species Detail View. This will be a full-screen modal overlay on mobile and a large, centered modal on desktop to maintain immersion.

The system will preserve the Eco-Log's scroll position and active search/filter state, so when the detail view is dismissed, the player returns to their exact previous context.

Performance Optimization:

Lazy Loading: Species images and detailed data will only load as they scroll into view.

Skeleton Screens: The grid/list will display a skeleton placeholder UI while the initial data is being fetched.

Caching: Frequently accessed species data will be cached on the client to ensure near-instantaneous loads on subsequent views.

Accessibility:

All interactive elements on the cards and in the toolbar will be fully keyboard navigable and have proper focus management.

All information on the card (including the tertiary info revealed on hover) will be clearly announced by screen readers.

Screen: Perks & Mastery Screen
Purpose: To serve as the player's adaptive strategic command center, allowing them to visualize progression paths, understand perk synergies, and make informed decisions to guide their mastery journey.

Key Elements:

Header: A clear title ("Perks & Mastery") and a prominent "Back" button.

Mastery Progress Bar: A prominent, interactive visualization of the player's progress toward the 20-point goal. It will feature celebratory animations for key milestones (e.g., at 5, 10, and 15 points). Clicking it will provide a detailed breakdown of points earned per species.

Adaptive Perk View: The main content area will be an adaptive layout that can be toggled by the user between:

Constellation View (Default): A beautiful, thematic visualization showing perks as stars, with lines connecting related perks or progression paths.

Grid View: A more compact, organized view for quickly scanning unlocked perks.

List View: A data-dense view for sorting and filtering.

Filtering & Sorting: Robust controls will allow players to sort perks by status (Unlocked, Locked), type (Encounter, Environmental), or mastery point value.

Strategic Guidance Panel: A small, contextual panel that offers tips based on the player's progress, such as highlighting high-value species that they have discovered but not yet mastered.

Enhanced Perk Details: Interacting with a perk (in any view) will provide its full description, strategic advice, and a quick navigation link back to the source species in the Eco-Log.

Motivational Design:

Unlocking new perks will trigger special visual effects and celebratory feedback to make the achievement feel significant.

The UI will clearly visualize the path to the final mastery perk, creating a strong long-term goal.

Performance & Accessibility:

The perk tree will load progressively to ensure fast initial rendering. All animations will be optimized.

All views (constellation, grid, list) will be fully accessible via keyboard and screen reader.

Screen: Quiz Modal
Purpose: To serve as the core learning and assessment interaction, presenting a clear question, accepting the player's answer, and providing immediate, educational feedback that reinforces learning and rewards progress.

Layout & Interaction: The modal interaction is a two-phase process: Question & Answer, then Result & Learning.

Phase 1: Question & Answer
Header: Displays the species image/illustration and name, with a clear indicator if it's a radiant encounter.

Context Area: Subtly displays the question's category (e.g., "Habitat") and difficulty level (e.g., 2/5 stars) to set expectations.

Question Area: A prominent, highly readable text block for the dynamically generated question.

Answer Buttons: A set of 3-4 large, touch-friendly buttons. A player can select an answer, and a "Confirm" button will appear, preventing accidental submissions and allowing them to change their answer before finalizing.

Phase 2: Result & Learning (After Answer Confirmation)
Immediate Feedback: The UI clearly indicates the correct answer (e.g., turns green) and the player's choice (if incorrect, turns red).

Educational Explanation: A concise text block appears, explaining why the correct answer is right. This is the primary learning reinforcement.

Related Fun Fact: An additional, interesting fact about the species may also be displayed to reward curiosity.

Progression Update: A clear visual element shows the XP gained (e.g., "+50 XP!") and any progress made on the species' research level bar.

Educational Design Principles
Clarity: Questions will be written in clear, simple language appropriate for the target audience.

Context: Questions will provide enough context to be answerable based on previous discoveries and in-game information.

Visual Aids: Where helpful, questions may be accompanied by supporting images or diagrams.

Accessibility & UX
Full Keyboard Navigation: The entire modal, including selecting and confirming answers, will be operable via keyboard.

Screen Reader Announcements: All elements—question, options, and the post-answer educational feedback—will be clearly announced.

Progress Persistence: If the quiz is interrupted (e.g., browser refresh), the game state will be saved, and the player can resume without losing the encounter.

Screen: Settings Screen
Purpose: To provide players with a centralized, accessible, and easy-to-navigate location to configure their experience, manage data, and tailor the game to their specific needs and preferences.

Layout & Design Principles:

Logical Grouping: Settings will be organized into clear, collapsible categories (e.g., General, Accessibility, Data) to reduce cognitive load.

Progressive Disclosure: Advanced or less-frequently used settings will be placed within these categories, keeping the main screen clean.

Settings Search: A search bar will be included at the top to allow players to quickly find a specific setting.

Reset to Defaults: A "Reset All Settings" button with a confirmation dialog will be available.

Key Elements:

Category: General
Language Selection: A prominent control with visual flags and language names. Selecting a language will show a preview and require confirmation.

Audio Controls: Sliders for Master, Music, and Sound Effects volume.

Graphics Quality: A simple segmented control (Low / Medium / High) that adjusts visual effects and texture quality for performance.

Category: Accessibility
High Contrast Mode: A toggle switch.

Reduce Motion: A toggle switch.

Text Size: A slider or segmented control.

Color Blind Support: A dropdown to select from common color blind modes (e.g., Protanopia, Deuteranopia), which will apply a filter or alternative color scheme to the UI.

Category: Data Management
Export Progress: A button that downloads the user's save data as a JSON file.

Import Progress: A a button that allows a user to upload a save file. It will validate the file and show a clear confirmation modal warning about overwriting progress.

Category: About
A section displaying game credits and the current version number.

Future Enhancements Captured
Educational Settings: A future section could allow educators to set specific quiz difficulties or learning objectives.

Advanced Data Management: Future versions could include automatic cloud sync options and multiple data export formats (like CSV for educators).

Advanced Accessibility: Future versions could add customization for screen reader verbosity and keyboard shortcuts.

Component Library / Design System
Design System Approach
We will create a new, custom component library for "Eco-Explorer" to support its unique "stylized realism" aesthetic and specific interactive needs. This system will be built with accessibility, performance, and responsive design as core principles.

Component Architecture Principles
Composition over Inheritance: Components will be designed to be flexible and composable, using props and children to adapt to various contexts.

Accessibility-First Design: Every component will be built and tested to meet WCAG 2.1 AA standards from the ground up.

Responsive Behavior: All components will be designed to adapt gracefully to different screen sizes, from mobile to desktop.

Performance Optimization: Components will be optimized using techniques like React.memo where appropriate to ensure a smooth user experience.

Styling Strategy
Scoped Styles: We will use a modern styling approach like CSS-in-JS or CSS Modules to ensure styles are encapsulated and do not cause conflicts.

Design Tokens: A centralized file will define design tokens (variables) for colors, spacing, font sizes, and shadows to ensure project-wide consistency.

Theming: The system will be built to support theming, with initial support for a default theme and a high-contrast accessibility theme.

Development Workflow
Component Documentation: We will use Storybook to create a "living document" of our components, allowing for isolated development, testing, and visual review.

Accessibility Testing: Each component will undergo both automated (e.g., axe-core) and manual keyboard/screen reader testing.

Performance Monitoring: Each component's impact on bundle size and render performance will be tracked.

Core Component List
Navigation Components
Navigation Bar: The primary, persistent navigation component.

Tab Component: For organizing content within a screen (e.g., in Settings).

Breadcrumb/Trail: For showing navigation context in nested views.

Form & Input Components
Button: A versatile button with primary/secondary variants, loading states, and full accessibility.

Input Field: For text entry, primarily used in search functionality.

Dropdown/Select: For filtering and selection options (e.g., language).

Toggle/Switch: For all boolean settings (e.g., accessibility options).

Slider: For ranged inputs like volume controls.

Feedback & Status Components
Toast/Notification: For non-blocking success, error, or info messages.

Loading Spinner: A standardized indicator for asynchronous operations.

Status Indicator: A component for displaying environment status, skill states, etc.

Badge: For mastery indicators and new content alerts.

Data Display Components
Modal: A base modal with focus management for all overlay dialogs.

Card: The primary container for species and perk information.

Tooltip: For providing additional, context-sensitive help.

Icon Component: A wrapper for consistent use of iconography.

Image Component: For displaying species art with built-in lazy loading and fallback states.

Branding & Style Guide
Visual Identity
This document will establish the primary visual identity for "Eco-Explorer." The aesthetic is stylized realism, conveying a sense of joyful discovery with a magical, wondrous, and inviting atmosphere. All visual elements should support this core identity.

Color System
Core Palette
Primary: #2d5a32 (Deep Forest Green) - For primary actions and UI elements.

Secondary: #795548 (Earthy Brown) - For secondary elements and backgrounds.

Accent: #ffc107 (Golden Hour Sun) - For highlights, notifications, and key calls-to-action.

Neutrals: A range from #f5f5f5 (light backgrounds) to #212121 (dark text) for general UI.

Game State Palettes
Rarity Colors: A defined spectrum will be used to indicate species rarity (e.g., Common: gray, Uncommon: blue, Rare: purple, Legendary: orange).

Environmental Colors: The UI will subtly shift its accent colors to reflect the in-game time (day/night) and weather (clear/rainy).

Progression Colors: A specific color will be used for XP bars and other progress indicators to ensure consistency.

Accessibility & Interaction Palette
Success: #4caf50

Warning: #ff9800

Error: #f44336

Focus Indicator: A highly visible color (e.g., a bright blue) will be used for all keyboard focus states.

High-Contrast Variants: A separate, defined high-contrast color palette will be used when this accessibility mode is enabled. All color combinations must pass WCAG AA contrast ratios.

Typography
Font Families:

Headings: 'Merriweather'

Body & UI: 'Nunito Sans'

Considerations:

Multilingual Support: These fonts have been chosen for their broad language support. The layout must accommodate text expansion/contraction.

Readability: Font weights and sizes will be tested across mobile and desktop screens to ensure legibility.

Performance: Fonts will be pre-loaded or served in an optimized format (e.g., WOFF2) to minimize performance impact.

Visual Effects & Animation
Golden Hour Lighting: A persistent, soft golden light effect will be applied as a screen-wide overlay, with its intensity changing based on the in-game time of day.

Particle Effects: Subtle, looping particle effects (e.g., floating dust motes in sunbeams, light raindrops) will be used to enhance the atmosphere of the environment.

Transition Animations: All screen and state transitions will use consistent, gentle easing curves (e.g., ease-in-out) with a standard duration (e.g., 250ms) to feel smooth and responsive.

Reduced Motion: All non-essential animations and effects will be disabled when the "Reduce Motion" accessibility setting is active.

Core Styles
Gradients: Subtle gradients may be used in backgrounds and large UI panels to add depth.

Shadows: A defined set of soft shadow styles will be used to create a sense of hierarchy and lift interactive elements.

Borders & Radius: All components will use a consistent, slightly rounded border-radius (e.g., 4px or 8px) to maintain a soft, organic feel.

Accessibility Requirements
Compliance Target
The application must meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

Key Requirements
Game-Specific Accessibility
Encounter Feedback: All outcomes of an encounter (species found, success, failure, XP gain, level-ups, perk unlocks) must be clearly announced to screen readers.

Environmental Changes: Changes in game time and weather, which directly affect gameplay, must be announced to provide context to non-visual users.

Quiz Accessibility: The entire quiz flow, from question presentation to answer selection and feedback, must be fully accessible.

Timing Accommodations: Players must be able to disable or significantly extend any time-sensitive interactions (e.g., a potential quiz timer).

Educational Content Accessibility
Content Access: All educational content, including species descriptions and fun facts, must be fully accessible to screen readers.

Learning Pace: Players must be able to control the speed of information presentation; text should not disappear automatically.

Multilingual Accessibility: All accessibility features must be fully functional across all four supported languages.

Advanced Interaction Support
Gesture Alternatives: All touch-based gestures must have a keyboard or mouse-based alternative.

Audio Alternatives: All meaningful audio cues must have a corresponding visual alternative (e.g., an icon or text notification).

Cognitive Load Management: The interface will provide options to simplify complex displays and reduce the amount of information presented at once.

Implementation Guidelines
Component-Level Requirements
Modal Accessibility: All modals must trap focus correctly and announce their title and content upon appearing.

Dynamic Content: Live updates to the UI (like status changes) must be announced using ARIA live regions.

Error Handling: All error messages must be clear, accessible, and provide constructive guidance.

Content Guidelines
Plain Language: All user-facing text will use clear, simple language, avoiding overly technical jargon.

Consistent Terminology: Terms used for game mechanics will be consistent throughout the application.

Risk Mitigation & Testing
Game Mechanics Risks
Visual Feedback: No game mechanic may rely solely on visual feedback. Non-visual alternatives (text, audio cues with visual counterparts) must always be provided.

Color Coding: Color will not be used as the only means of conveying information (e.g., rarity will also be stated in text).

Animation Dependencies: No core functionality will depend on a player being able to perceive an animation.

Enhanced Testing Strategy
Our testing strategy will be a combination of automated checks and comprehensive manual audits, including:

Game-Specific Scenarios: Testing the full encounter and progression loops with assistive technologies.

User-Group Testing: Engaging with users who have cognitive, motor, and visual impairments to gather direct feedback.

Multilingual Accessibility Testing: Verifying that accessibility features work correctly in all supported languages.

Responsiveness Strategy
Breakpoint Strategy
The application will use standard breakpoints (Mobile, Tablet, Desktop, Wide) as a foundation, with specific considerations for edge cases:

Landscape Mobile: The UI will adapt to a horizontal layout, ensuring key interactive elements remain accessible without awkward scrolling.

Ultra-wide Screens: On very wide monitors, the main content area will have a maximum width to maintain readability, with the beautiful background art filling the remaining space.

Core Adaptation Principles
Adaptive Layouts: All layouts will prioritize content hierarchy and touch accessibility. They will fluidly adapt from single-column mobile views to multi-column desktop views.

Context-Aware Navigation: The navigation will adapt to device capabilities, using a bottom tab bar on mobile and a sidebar on desktop, while progressively disclosing more complex navigation options as the player advances.

Content Density Management: More information and functionality will be surfaced on larger screens, while smaller screens will prioritize critical information and use accordions or modals to house secondary content.

Screen-Specific Adaptations
Eco-Log: On desktop, the Eco-Log may use a two-panel master-detail view (list on the left, selected species on the right). On mobile, this will be two separate screens.

Perks Tree: The constellation view will intelligently reflow and zoom to fit the available screen space. On mobile, it will be optimized for vertical scrolling and tap-to-view details.

Quiz Modal: On mobile, the modal will take up the full screen to maximize readability and touch target size. On desktop, it will be a large, centered modal.

Performance & Interaction
Image Optimization: Different image resolutions will be served based on the device's screen size and pixel density to optimize load times and visual quality.

Interaction Model: All interactions are designed touch-first. Hover-based interactions on desktop are considered enhancements; all functionality must be accessible via tap/click.

Loading States: Loading experiences will be optimized for connection speed, potentially showing simpler animations on slower networks.

Testing & Validation
Real Device Testing: The application must be tested on a representative range of actual iOS and Android devices, not just in browser emulators.

Performance Monitoring: Performance metrics will be tracked across different device categories to ensure the experience is smooth for all users.

User Testing: Usability testing will be conducted with real users on different devices to validate the responsive design choices.

Animation & Micro-interactions
Motion Principles
Purposeful and Informative: Animations must provide feedback, guide focus, or celebrate achievements. They should not be purely decorative.

Smooth and Natural: Motion will use carefully crafted easing curves that feel organic and responsive, with variations for different interaction types to convey weight and importance.

Contextual Timing: Animation duration will match the context of the interaction (e.g., quick feedback animations vs. more significant celebratory animations for milestones).

Progressive Enhancement: The application must be fully functional without animations. Motion is an enhancement to the core experience, not a requirement.

Performance & Accessibility
GPU Acceleration: Animations will primarily use CSS properties like transform and opacity to ensure they are GPU-accelerated and smooth.

Frame Rate Target: All animations must maintain a consistent 60fps on our target devices.

Reduced Motion: All non-essential animations will be disabled or replaced with simple cross-fades when the user's system "Reduce Motion" setting is active. This is a critical accessibility requirement.

Key Animation Systems
Celebratory & Progression Animations
New Species Discovery: A special, memorable visual effect will play the first time a species is successfully logged.

Level-Up Celebration: A rewarding particle effect or animation will play when a species levels up.

Perk Unlock: Unlocking a new perk will trigger a unique animation on the Perks screen, showing its addition to the player's "constellation."

Mastery Achievements: Reaching key Mastery Point milestones and unlocking the final Mastery Perk will be celebrated with significant, unique animations.

Environmental Animations
Time Transitions: The "Golden Hour" lighting effect will smoothly transition between day and night cycles, with gradual changes in light color and intensity.

Weather Effects: Subtle, looping particle effects will be used for weather conditions (e.g., light raindrops, blowing leaves).

Scanning Animation: The 2-second "Explore Biome" scan will feature a thematic, non-intrusive visual effect.

UI Feedback & State Transitions
Quiz Results: Correct answers will be highlighted with a positive, gentle animation, while incorrect answers will have a subtle, quick feedback animation.

Skill Activation: Activating the "Field Researcher" or "Research Focus" skills will trigger clear visual confirmation.

Meter Filling: The Research Focus meter will fill with a smooth, satisfying animation.

Screen Transitions: Navigating between major screens will use a consistent, subtle cross-fade or slide transition.

Performance Considerations
Performance Goals
The application must meet the following performance targets to ensure a fluid user experience:

Core Web Vitals:

Largest Contentful Paint (LCP): Main content should load within 4 seconds.

First Input Delay (FID) / Interaction to Next Paint (INP): The application should be highly responsive to user input.

Cumulative Layout Shift (CLS): The layout must be stable with minimal visual shifting during and after load.

Time to Interactive (TTI): The application should be fully interactive within 5 seconds on a simulated 3G connection.

Memory Usage: Memory consumption must be optimized, especially for mobile devices.

Battery Impact: The application will be profiled to minimize battery drain during extended gameplay sessions on mobile devices.

Network Resilience: The application must function gracefully on poor or intermittent network connections, leveraging cached data where possible.

Performance Optimization Strategies
Data & State Management
Efficient Data Structures: Use optimized data structures (e.g., normalized objects) for game state to ensure fast lookups and updates.

State Management Optimization: State updates will be batched where possible to avoid excessive re-renders.

Incremental Loading: Data will be loaded progressively as needed, rather than all at once.

Debouncing & Throttling: Rapid user interactions (e.g., resizing the window) will be debounced or throttled to prevent performance issues.

Asset Optimization
Bundle Size Management: The production bundle will be monitored to stay under the 2MB target.

Image Optimization: A responsive image strategy (e.g., using <picture> or srcset) will serve optimized images for different resolutions.

Font Optimization: Web fonts will be loaded efficiently using font-display: swap and preloading critical font files.

Animation Optimization: Animations will use requestAnimationFrame and CSS transforms to avoid layout thrashing and ensure they are GPU-accelerated.

Memory Management
Event Listener Cleanup: All components must clean up their own event listeners and subscriptions when they unmount to prevent memory leaks.

Object Pooling: For frequently created/destroyed objects (like particle effects), we will consider using object pooling to reduce garbage collection pressure.

Performance Testing & Monitoring
Automated Testing: We will use Lighthouse CI in our deployment pipeline to automate performance testing and enforce performance budgets on every commit.

Bundle Analysis: We will use tools like vite-plugin-bundle-visualizer to monitor the composition of our JavaScript bundles and identify optimization opportunities.

Production Monitoring: A performance monitoring service will be used in production to track real-user metrics (RUM) and identify performance bottlenecks.

Regression Testing: Automated performance tests will be run regularly to ensure new features do not degrade the application's performance.

Next Steps
Immediate Actions
With the conceptual and strategic design defined in this document, the following actions are recommended:

Stakeholder Review: This document should be reviewed and approved by all key stakeholders, including the Product Manager and Architect, to ensure full alignment.

High-Fidelity Design: The next creative step is to translate the conceptual layouts, branding, and style guide from this document into high-fidelity mockups in our chosen design tool (e.g., Figma).

Architectural Handoff: This specification will serve as the primary input for the Architect when they create the detailed front-end-architecture.md document.

Quality Assurance & Review Process
Design Review: All new high-fidelity designs will undergo a formal review process with stakeholders to ensure they align with this specification.

Implementation Review: A process will be established for designers to review the implemented features to ensure they match the design intent.

User Testing Integration: The interactive prototype will be used for usability testing with real users, and the feedback will inform design iterations.

Design Handoff Checklist
This checklist must be fully completed before the project moves into the full implementation phase.

Design Deliverables:
[x] All critical user flows documented

[x] Component inventory defined

[x] Accessibility requirements established

[x] Responsiveness strategy in place

[x] Branding and style guide complete

[x] Performance goals set

[ ] Design tokens and detailed specifications delivered

[ ] Component library documentation created

[ ] Accessibility validation of final designs completed

[ ] Performance validation of final designs completed

Implementation Support:
[ ] Interactive prototypes created and validated

[ ] Design system documentation delivered

[ ] Accessibility testing plan established

[ ] Performance monitoring plan established
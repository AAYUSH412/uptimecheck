# UptimeCheck — Zero-Friction Demo Implementation Plan

> **Objective:** Build a live, interactive demo dashboard on the deployed Next.js frontend that perfectly simulates the exact behavior of the UptimeCheck backend (Hub + Validator + DB). This allows recruiters, users, and open-source contributors to experience the platform without creating an account or needing the backend to be deployed.

---

## 🏗️ Architectural Approach

Instead of corrupting our real application state, we will create a dedicated `/demo` path. The demo will reuse identical UI components from the real dashboard but will be wrapped in a "Demo Context" that provides fake data and intercepts all API calls (Add/Delete/Fetch).

---

## Phase 1: Routing & Auth Bypass ✅ Completed
**Goal:** Allow users to reach the dashboard without Clerk authentication.

1. **Add Demo Entry Point:**
   - On the marketing/landing page (`apps/frontend/src/app/page.tsx`), add a "Try Live Demo (No Login)" button next to the Clerk Sign-In button.
   - Link this button to `/demo/dashboard`.
   
2. **Create Demo Routes:**
   - Create a new directory structure: `apps/frontend/src/app/(routes)/demo/dashboard/page.tsx`.
   - Ensure Clerk middleware (`middleware.ts`) is configured to treat `/demo(.*)` as a public, unauthenticated route.

3. **Component Reusability Preparation:**
   - Ensure the main `Dashboard` page component can accept a prop (e.g., `isDemo?: boolean`) or relies on a data-fetching hook that we can mock.

**Status:**
- [x] Demo CTA added on landing hero (links to `/demo/dashboard`).
- [x] Public demo path is accessible without Clerk auth.
- [x] Dashboard components are reused in demo mode via `isDemo` and custom handlers.

---

## Phase 2: Mock Data & State Engine ✅ Completed
**Goal:** Create the initial state that looks realistic, mimicking the Prisma schema.

1. **Expand `mockData.ts`:**
   - Define a starting array of 3 websites:
     - Github (High uptime, 20-30ms latency)
     - Vercel (High uptime, 10-15ms latency)
     - Demo API (Purposely configured to "fail" occasionally)
   - Pre-populate these websites with 10-15 historical 'ticks' (fake successful HTTP 200 pings) so the charts aren't empty on load.

2. **Demo State Manager:**
   - Since we have no database, all demo data must live in React state (e.g., `useState` or `useReducer` at the top of the `/demo/dashboard` layout).
   - Expose this state via a React Context (e.g., `DemoDataContext`) so deeply nested UI components can read it.

**Status:**
- [x] `DemoContext` now holds realistic initial monitors and history ticks.
- [x] Demo route group is wrapped with `DemoProvider`.
- [x] Demo dashboard reads fully from in-memory context state.

---

## Phase 3: The "Ghost" WebSocket / Tick Simulator ✅ Completed
**Goal:** Make the charts and statuses update in real time, simulating the WebSocket hub.

1. **The Pulse Engine (`useEffect`):**
   - Create a `useDemoSimulator` hook.
   - Run a `setInterval` that fires every 5 seconds (sped up from the real 60s for demo excitement).
   - On every interval, loop through the mock websites and generate a new `WebsiteTick`.
   - Randomize latency slightly (`Math.random() * 50 + baseLatency`).
   - Add a 10% chance for the "Demo API" website to return an error (`status: 500` or timeout) to show off the UI's error states (red badges, downtime markers).

2. **State Appending:**
   - Append these new ticks to the React state array, enforcing a max array length (e.g., keep only the last 100 ticks) to prevent browser memory leaks.

**Status:**
- [x] Live simulation loop runs every 5 seconds.
- [x] Each monitor receives fresh simulated ticks with randomized latency.
- [x] Demo API monitor has periodic failure probability.
- [x] Tick history is capped to prevent memory growth.

---

## Phase 4: Simulated Validator Terminal (The "Under the Hood" View) ✅ Completed
**Goal:** Visually explain the decentralized multi-node architecture to the user.

1. **Terminal UI Component:**
   - Create `SimulatedTerminal.tsx` (a black box with monospace green/white text).
   - Place this component floating in the bottom-right corner of the demo dashboard, or integrated into the sidebar.

2. **Log Generation:**
   - Hook the terminal into the `useDemoSimulator` hook.
   - For every mock tick generated, push 4 string logs to the terminal with artificial delays (using `setTimeout`):
     - `[+0ms] [Hub] Dispatching check for github.com to Node "US-East-1"`
     - `[+40ms] [Validator: US-East-1] Pinging github.com... HTTP 200 OK (24ms)`
     - `[+60ms] [Validator: US-East-1] Cryptographically signing result using Solana nacl...`
     - `[+80ms] [Hub] Signature verified. Database updated.`

**Status:**
- [x] `SimulatedTerminal` component added and shown on demo dashboard.
- [x] Hub/validator log stream is generated per simulated check.
- [x] Delayed log sequencing is implemented to mimic async processing.

---

## Phase 5: Faking User Interactions (CRUD) ✅ Completed
**Goal:** Allow users to test the "Add" and "Delete" website forms without a backend.

1. **Intercept Add Website (`POST` simulation):**
   - When `isDemo` is true, intercept the form submission on `AddWebsiteDialog.tsx`.
   - Show a 1.5-second loading spinner.
   - Create a new dummy website object, generate a fake UUID, and push it to the `DemoDataContext` array.
   - Show a toast: *"Success! (Demo Mode: Added simulated website)"*

2. **Intercept Delete Website (`DELETE` simulation):**
   - Intercept the delete confirmation.
   - Filter the website out of the React state array.
   - Let the UI naturally update to show the "Empty State" if all websites are deleted.

**Status:**
- [x] Demo add monitor path intercepts form submit and updates context state.
- [x] Demo delete monitor path removes items from context state.
- [x] Toast feedback is shown for add/delete in demo mode.
- [x] Dashboard updates immediately without backend calls.

---

## 🚀 AI Agent Execution Prompt
*When you are ready to build this, give this prompt to the AI:*

"Please implement Phase 1 and Phase 2 of the Zero-Friction Demo from `demo_implementation_plan.md`. Start by updating the Clerk middleware to allow `/demo`, creating the demo route layout, and setting up the base React Context to hold the mock websites."
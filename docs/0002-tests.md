# ADR #0002: Add Tests for Core Functionality

**Status**: Proposed  
**Date**: 2025-05-29

## Context

Currently, the project has no automated tests. This makes it harder to:

- Detect bugs after refactoring Redux slices, thunks, or React components.
- Verify that UI elements behave correctly under various scenarios.
- Ensure that critical user flows: creating track, uploading file, playing/pausing, deleting track work correctly.

Manual QA and code reviews take a lot of time, and cannot guarantee coverage of all edge cases. We need a structured testing strategy to catch bugs early.

## Rationale

1. **Ensure Stability**: Automated tests help detect most errors even during the development stage.
2. **Increase Confidence for Refactoring**: A wide set of tests makes it easier to check application for bugs after code changes.
3. **Improve Developer Productivity**: Running a set of automated tests is significantly faster than manual testing of each feature.
4. **Document Expected Behavior**: Well-written tests like a documentation they specify how reducers should transform state, how components should render based on props and Redux store and so on.

### Alternatives Considered

1. **Manual QA Only**

   - Positive: No setup needed
   - Negative: Takes significantly more time than automated testing, inaccuracies are possible in the testing process.

2. **Relying on Code Reviews Alone**:

   - Positive: Catches obvious mistakes
   - Negative: Takes a lot of time and less effective than automated testing because of smaller coverage.

3. Vitest + React Testing Library

   - Positive: Fast startup with Vite, no TS config needed.
   - Negative: Smaller ecosystem than Jest, fewer plugins.

4. Cypress (E2E)
   - Positive: Visual test runner, built-in screenshots and videos.
   - Negative: Limited cross-browser support, slower execution.

## Decision

There will be two layers of testing:

- unit/integration using **Vitest & React Testing Library**
- end-to-end using **Playwright**

1. **Unit & Integration Tests**
   - **Tools**: Vitest & React Testing Library.
   - **Scope**:
     - **Unit**: Redux slices, selectors, thunks, utility functions.
     - **Integration**: React components connected to Redux (e.g., `<TrackItem>`, form components), verifying user interactions and dispatched actions.
   - **Coverage Goals**:
     - utility functions 100%.
     - Reducers, selectors, thunks >= 90%.
     - Components >= 60%.
2. **End-to-End Tests**
   - **Tool**: Playwright.
   - **Scope**:
     1. Create track and verify it appears in the list.
     2. Edit track’s metadata and verify the update.
     3. Upload audio file, then verify that it's immidiately playing.
     4. Play/pause track.
     5. Delete track and confirm removal; simulate a server error to verify rollback and error notification.
   - **Coverage Goal**: Cover >= 50% of critical user flows.

## Consequences

### Positive

1. **Document Expected Behavior**: Tests it is a kind of documentation for other developers.
2. **Measurable Quality**: Vitest coverage reports and Playwright pass or fail feedback.
3. **Catch bugs**: Authomated tests detect errors early.

### Negative

- **Initial Efforts**: writing tests and configuring frameworks requires initial time.
- **Test updates**: updating logic and UI may require updating tests.

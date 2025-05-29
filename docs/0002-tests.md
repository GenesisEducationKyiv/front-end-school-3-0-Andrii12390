# ADR #0002: Add Tests for Core Functionality

**Status**: Proposed  
**Date**: 2025-05-29

## Context

Currently, the project has no automated tests. This makes it harder to catch bugs, verify key features like track creation or deletion, and safely refactor code.

## Rationale

- **Ensure Stability**: Automated tests help detect most errors even during the development stage.
- **Increase Confidence for Refactoring**: A wide set of tests makes it easier to check application for bugs after code changes

### Alternatives Considered

- **Manual QA Only**: takes significantly more time than automated testing, inaccuracies are possible in the testing process.
- **Relying on Code Reviews Alone**: takes a lot of time and may be less effective than classic automated testing.

## Decision

Unit and integration tests will be gradually introduced for important features, for instance CRUD operations on tracks, form validation, filters.

## Consequences

### Positive

- helps to detect critical bugs during the development.
- Makes development safer and faster long-term.

### Negative

- Requires a significant amount of time in the initial stages, as the project already has a lot of functionality and everything needs to be tested.

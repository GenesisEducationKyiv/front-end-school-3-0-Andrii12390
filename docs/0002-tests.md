# ADR #0002: Add Tests for Core Functionality

**Status**: Proposed  
**Date**: 2025-05-29

## Context

Currently, the project has no automated tests. This makes it harder to catch bugs, verify key features like track creation or deletion, and safely refactor code.

## Decision

Unit and integration tests will be gradually introduced for important features, for instance CRUD operations on tracks, form validation, filters.

## Consequences

### Positive

- helps to detect critical bugs during the development.
- Makes development safer and faster long-term.

### Negative

- Requires a significant amount of time in the initial stages, as the project already has a lot of functionality and everything needs to be tested.

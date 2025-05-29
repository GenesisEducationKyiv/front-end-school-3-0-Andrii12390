# ADR #0001: Use Optimistic Updates for Track Modifications

**Status**: Proposed  
**Date**: 2025-05-29

## Context

In the current implementation of the music player project, track modifications such as creating a new track, editing track metadata (e.g., title, artist), or deleting a track rely entirely on the response from the backend before updating the UI.

To improve perceived performance and system responsiveness, **optimistic updates** can be implemented - user interface changes are applied immediately, and in the event of a server error, they are rolled back

## Rationale

- **Improved Performance for a user**: applying changes immidiately gives users instant feedback and makes the app feel more responsive.
- **Enhanced UX**: users can continue interacting with tracks without waiting for server confirmation.
- **Simple Rollback Logic**: keeping the previous state in memory makes it easy to roll back changes in case of an error.

### Alternatives Considered

- **Pessimistic Updates**: displaying loaders after each server request can be annoying to the user

## Decision

Optimistic updates will be implemented in the following places:

- **Track Creation**: Immediately append a new track to the UI list using a temporary ID. When the real ID is received from the server, replace the placeholder.
- **Track Editing**: Changes (e.g., to title or artist) will reflect immediately in the UI. If the server update fails, revert to the previous state.
- **Track Deletion**: Remove the track from the visible list instantly. If the deletion fails, restore the item and notify the user.

Optimistic updates will be handled via Redux actions and thunks. In each thunk, local state changes will be dispatched before the API call, and a rollback action will be dispatched on error

## Consequences

### Positive

- **Improved Usability**: Immediate feedback to users results in a more pleasant experience.
- **Faster Interaction Loop**: No perceived delay between action and result.

### Negative

- **Rollback Complexity**: Requires additional logic to revert UI state on error.
- **Temporary Inconsistencies**: The UI may momentarily reflect a state that the server did not confirm.

This decision supports our goal to enhance **usability** and **responsiveness** across the entire application.

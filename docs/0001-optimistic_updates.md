# ADR #0001: Use Optimistic Updates for Track Modifications

**Status**: Proposed  
**Date**: 2025-05-29

## Context

In the current implementation of the music player project, track modifications such as creating a new track, editing track metadata (e.g., title, artist), or deleting a track rely entirely on the response from the backend before updating the UI.

To improve perceived performance and system responsiveness, **optimistic updates** can be implemented – user interface changes are applied immediately, and in the event of a server error, they are rolled back.

## Rationale

- **Improved Performance for users**: Applying changes immediately gives users instant feedback and makes the app feel more responsive.
- **Enhanced UX**: Users can continue interacting with tracks without waiting for server confirmation.
- **Simple Rollback Logic**: Keeping the previous state in memory (or in the Redux store) makes it easy to roll back changes in case of an error.
- **Centralized State Management**: Because the app already uses Redux to store and manage tracks, using Redux for optimistic updates is a logical solution— all actions occur in a single slice without requiring additional local state.

### Alternatives Considered

1. **Pessimistic Updates**  
   Displaying loaders after each server request can be annoying for the user.

2. **Hook `useOptimistic`**

   React has a built-in hook for optimistic UI updates.

   - **Positive**:
     - Simple implementation.
     - Doesn't require Redux at all, because mutations live in local state.
     - Provides a pending status via React’s transition mechanism.
   - **Negative**:
     - Works only for local component state; to synchronize multiple components, additional logic is required.
     - The app already uses Redux to store tracks; combining local `useOptimistic` with the Redux store can add lots of complexity and extra code.

3. **RTK Query with Optimistic Updates**  
   RTK Query provides a built-in way (`onQueryStarted`) to mutate data optimistically and roll back if the request fails.
   - **Positive**:
     - Easily implemented by creating an optimistic update in `onQueryStarted` with rollback logic in case of an error.
     - Requires less custom code compared to manually writing thunks and rollback actions.
   - **Negative**:
     - Requires migrating existing thunks and slices to RTK Query endpoints.

## Decision

We will implement optimistic updates for track CRUD operations using **Redux actions and thunks**. In each thunk:

1. Dispatch an optimistic action to update the Redux store immediately.
2. Perform the API call.
3. On success, dispatch a commit action or rely on `createAsyncThunk.fulfilled` (or a custom action) to replace the temporary data.
4. On failure, dispatch a rollback action (`createAsyncThunk.rejected` or a custom action) to revert the store to its previous state.

Specifically:

- **Track Creation**

  1. Generate a temporary ID, then dispatch `addTrackOptimistic({ id: tempId, ...other })`.
  2. Call the `addTrack` thunk.
  3. In `addTrack.fulfilled`, replace the temporary ID with the real one from the server.
  4. In `addTrack.rejected`, remove the temporary item and show an error notification.

- **Track Editing**

  1. Dispatch `editTrackOptimistic({ id, changes })`.
  2. Call the `editTrack` thunk.
  3. In `editTrack.rejected`, dispatch `editTrackRollback({ id, previousData })`.

- **Track Deletion**
  1. Dispatch `deleteTrackOptimistic({ id })`.
  2. Call the `deleteTrack` thunk.
  3. In `deleteTrack.rejected`, dispatch `deleteTrackRollback({ id, previousItem })`.

## Consequences

### Positive

- **Improved Usability**: Immediate feedback to users results in a more pleasant experience.
- **Faster Interaction Loop**: No perceived delay between action and result.

### Negative

- **Rollback Complexity**: Requires additional logic to revert UI state on error.
- **Temporary Inconsistencies**: The UI may momentarily reflect a state that the server did not confirm.

This decision supports our goal to enhance **usability** and **responsiveness** across the entire application.

---
phase: 5
plan: 1
wave: 1
---

# Plan 5.1: Advanced Features & Launch Prep

## Objective
Implement core productivity features: Contacts, Drafts, Starred Messages, and final launch preparation (README, config).

## Context
- `app/inbox/contacts/page.tsx`: New page for contact management.
- `app/inbox/drafts/page.tsx`: New page for drafts.
- `lib/storage.ts`: Helper for valid LocalStorage interactions.

## Tasks

<task type="auto">
  <name>Implement Contact Management</name>
  <files>
    - app/inbox/contacts/page.tsx
    - lib/storage.ts
  </files>
  <action>
    Create a persistent contact manager.
    UI: Add Contact (Handle + Alias), List Contacts, Delete/Edit.
    Storage: `whisper_contacts` in LocalStorage.
    Integration: Auto-complete recipient handles in Compose.
  </action>
</task>

<task type="auto">
  <name>Implement Starred Messages</name>
  <files>
    - app/inbox/page.tsx
    - lib/storage.ts
  </files>
  <action>
    Add functionality to star/unstar messages.
    Storage: `whisper_starred_ids` in LocalStorage.
    UI: Filter view to show only starred messages.
  </action>
</task>

<task type="auto">
  <name>Implement Drafts</name>
  <files>
    - app/inbox/drafts/page.tsx
    - app/inbox/compose/page.tsx
  </files>
  <action>
    Auto-save drafts to LocalStorage on typing in Compose.
    Restore drafts when navigating back or to drafts page.
  </action>
</task>

<task type="auto">
  <name>Launch Preparation</name>
  <files>
    - README.md
    - .env.example
  </files>
  <action>
    Update README with full deployment instructions, architecture details, and usage guide.
    Ensure environment variables are properly documented.
  </action>
</task>

## Success Criteria
- [ ] Users can manage contacts and use them in composition.
- [ ] Users can save important messages (star) and continue drafts later.
- [ ] Project is documented and ready for public demo/deployment.

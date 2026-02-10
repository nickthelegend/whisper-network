---
phase: 4
plan: 1
wave: 1
---

# Plan 4.1: UI Polish, Feedback & Responsiveness

## Objective
Refine the user experience by implementing better feedback mechanisms (toasts), improving loading states, handling errors gracefully, and ensuring responsive design across devices.

## Context
- `app/inbox/page.tsx`: Main interface.
- `app/inbox/compose/page.tsx`: Composition interface.
- `app/setup/page.tsx`: Registration flow.
- Current feedback is mostly via `console.log` or simple text logs. We want professional toast notifications.

## Tasks

<task type="auto">
  <name>Implement Toast Notifications</name>
  <files>
    - app/layout.tsx
    - lib/utils.ts
  </files>
  <action>
    1. Install `sonner` or `react-hot-toast` (using `npm install sonner` or similar, wait, I can just use a simple custom toast component or a library if available. I'll stick to a simple custom one to avoid dependencies if I can, or use `sonner` which is standard in modern stacks).
    2. Add `<Toaster />` to `app/layout.tsx`.
    3. Replace `addLog` calls in critical paths (registration, sending) with toast success/error calls.
  </action>
</task>

<task type="auto">
  <name>Enhance Empty States & Skeletons</name>
  <files>
    - app/inbox/page.tsx
  </files>
  <action>
    1. Create a dedicated `<EmptyState />` component with vector illustrations (use `generate_image` if needed, or CSS art).
    2. Refine the skeleton loader in `InboxPage` to match the exact card height and layout.
  </action>
</task>

<task type="auto">
  <name>Responsive Design Check</name>
  <files>
    - app/inbox/page.tsx
    - app/components/Sidebar.tsx (if extracted)
  </files>
  <action>
    1. Ensure the sidebar collapses correctly on mobile (or transforms into a bottom nav/hamburger menu).
    2. Verify message list scrolling on small screens.
  </action>
</task>

## Success Criteria
- [ ] Users receive visual feedback (toasts) for actions like "Message Sent", "Registered", "Error".
- [ ] No layout shifts during loading.
- [ ] Mobile view is usable.

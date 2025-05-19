# Resumable Request Simulator

A **client-side queue simulator** built with Next.js 15 and TypeScript.  
It persists pseudo-requests to **IndexedDB**, processes them one-by-one with adjustable delays, and automatically **resumes** unfinished work after a page refresh or browser restart.  
Perfect for exploring:

- Offline-first patterns
- Front-end–only task queues
- Progress UI & optimistic UX
- Dexie + React hooks integration

<br>

## Features

| Feature | Description |
|---------|-------------|
| **Configurable batch generator** | Choose how many fake requests to create and their per-item timeout. |
| **IndexedDB persistence** | All tasks survive refreshes via Dexie. |
| **Auto-resuming queue** | Modal prompts to “Continue” or “Discard” leftover tasks on return. |
| **Live progress bar** | Shows % complete and remaining items in real time. ||

<br>

## Getting Started

```bash
# install deps
pnpm i   # or npm i / yarn

# start dev server
pnpm dev  # -> http://localhost:3000
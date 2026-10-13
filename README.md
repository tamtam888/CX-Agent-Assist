# CX Agent Assist

An interactive customer-support agent workspace built with React and Vite. This is a **portfolio demonstration** using fictional customers and rules-based suggestions; it does not connect to a live AI model, email provider, CRM, or WhatsApp.

## Features

- Inbox with five fictional tickets, text search, status filters and status updates
- Selectable support assistants **Gal** and **Daniel**
- One-click rules-based issue classification, priority, recommended next step and suggested reply
- Editable reply drafts with clipboard copy (no messages are sent)
- Escalation and resolution actions
- Sample knowledge-base articles and recommended playbooks
- Internal notes and ticket state persisted locally in the browser
- Overview dashboard and searchable knowledge base
- Reset demo data

## Technology

React 19, JavaScript, Vite 8, CSS and browser localStorage. No backend or external AI API is used.

## Run locally

```bash
npm install
npm run dev
```

To check the project:

```bash
npm run lint
npm run build
npm test
```

## How the demo works

Open **Inbox**, select a ticket and click **Analyze conversation**. The rules-based demo uses the ticket category to display a recommended next step, relevant sample knowledge article and an editable draft reply. **Copy reply** copies the text to the clipboard; it does not send a message. **Escalate** and **Mark resolved** update the local ticket status. Internal notes and status changes are stored in browser localStorage.

The customer records, knowledge articles and assistant personas are fictional. Any real-world support action requires verification against actual customer records and company policies.

## Deployment

The stable deployment is hosted on Vercel: https://cx-agent-assist.vercel.app/

**Note:** The current feature work is on `feature/cx-copilot-v2` and may differ from the `main` deployment. Review the feature branch Preview before merging.

## Known limitations and planned improvements

- Rule-based demo only; no live LLM, order lookup or messaging integrations
- Local browser storage is not shared between users or devices
- No authentication, database or production-grade audit log
- Automated Node smoke checks cover core UI labels, demo disclosure, assistant assets, mobile CSS and reset state; interactive browser QA and accessibility audits are still needed
- Potential future additions: verified email sending, real knowledge retrieval, and a secure backend

## Repository

https://github.com/tamtam888/CX-Agent-Assist

## Quality assurance

A GitHub Actions workflow (`.github/workflows/frontend-qa.yml`) runs `npm ci`, ESLint, Vite build and Node smoke tests on pushes to the feature branch and main, as well as pull requests to main. These checks do **not** replace hands-on browser testing.

Manual acceptance checklist: select each ticket; search and filter by status; analyze a ticket; edit and copy the draft; escalate and resolve; save notes and refresh; switch Gal/Daniel; reset the demo; test 320px, 390px, 768px, 1280px and 1440px viewports; check keyboard focus and scrolling. Verify the feature-branch Vercel Preview before merging.

# CX Agent Assist — AI-Powered Customer Support Demo

**Customer support workspace · Ticket triage · Knowledge base · Optional OpenAI integration**

**AI-powered customer support copilot · Interactive portfolio project**

[Live demo](https://cx-agent-assist.vercel.app/) · [Source code](https://github.com/tamtam888/CX-Agent-Assist)

CX Agent Assist is a responsive support workspace that demonstrates how an agent can triage fictional customer issues, consult a curated knowledge base, draft responses, and manage a small ticket queue. It combines deterministic, rules-based guidance with an optional **live AI conversation mode**. The product is an educational portfolio demo, **not** a connected customer-service platform.

## What you can explore

- **Overview:** a workspace snapshot, priority queue and navigation into support workflows.
- **Inbox:** five fictional customer tickets with search, status filters, editable suggested replies, copy-to-clipboard, escalation, resolution and internal notes.
- **Test a case:** enter a fictional issue, choose a support topic or automatic detection, and work through a multi-turn conversation using either Demo or AI mode.
- **Knowledge base:** search and filter five sample articles covering delivery, billing, technical support and feedback; open an article for policy guidance.
- **Agent personas:** switch between Gal and Daniel, with controls for continuing or starting a separate test-case conversation.
- **Voice dictation:** optional English speech-to-text input where the browser supports the Web Speech API; microphone permission is required.
- **Demo controls:** reset fictional tickets, notes and in-session test-case data.

## Demo mode vs. live AI mode

| | Demo · Rules-based | AI · Live model |
| --- | --- | --- |
| How it works | Local keyword/category classification and predefined support guidance | The browser sends a test-case message and limited conversation history to the Vercel serverless endpoint `/api/agent`, which calls the OpenAI Responses API |
| Response | Deterministic draft and next-step guidance | Generated response informed by the five demo knowledge articles and server-side instructions |
| Requirements | No API key; works locally with the frontend | A configured `OPENAI_API_KEY`, network access and an available model |
| Limitations | Cannot interpret arbitrary requests reliably | Model output may be imperfect and must be reviewed by a human |

**Both modes use fictional data.** AI mode is a real API integration, but it does **not** connect to a CRM, payment system, order database, shipping carrier, email provider or WhatsApp. It does not verify identities, issue refunds, update orders, send messages or execute real support actions. Generated drafts are suggestions, not confirmed facts or completed actions.

## Architecture and technology

- **Frontend:** React 19, JavaScript (JSX), Vite 8 and custom responsive CSS.
- **Backend:** Vercel Serverless Function at `api/agent.js` (Node.js runtime).
- **AI:** OpenAI Responses API, with `gpt-4.1-mini` as the default model unless `OPENAI_MODEL` is configured.
- **Persistence:** browser `localStorage` for ticket status, internal notes and the selected persona. Test-case conversations are held in React state and are not a shared database.
- **Speech input:** browser Web Speech API, where supported.
- **Hosting and CI:** Vercel for the live deployment; GitHub Actions for linting, production build and Node tests.
- **Testing:** ESLint, `vite build`, and `node --test`.

### AI request flow

```text
Test a case (React UI)
  └─ POST /api/agent  [message, bounded conversation history, selected agent]
       └─ Vercel Serverless Function
            ├─ Validates message and history
            ├─ Adds fictional knowledge and behavioral constraints
            └─ OpenAI Responses API
                 └─ Suggested reply returned to the UI for review/editing
```

The OpenAI API key is read **server-side** from an environment variable and is not embedded in the React bundle. The endpoint accepts POST requests, limits message/history size, uses a request timeout, disables OpenAI response storage via `store: false`, and returns generic errors for upstream failures. These are demo-level safeguards, **not** a complete production security architecture. In particular, this public demo does not implement authentication, per-user authorization, rate limiting or a durable audit trail. Do not enter personal, confidential or real customer information.

## Run locally

**Prerequisites:** Node.js 22 and npm.

```bash
git clone https://github.com/tamtam888/CX-Agent-Assist.git
cd CX-Agent-Assist
npm ci
npm run dev
```

Open the local URL printed by Vite. The rules-based Demo mode runs without any secrets.

### Configure live AI

The production deployment runs the `/api/agent` endpoint as a Vercel Serverless Function. For local end-to-end AI testing, use the Vercel development runtime rather than relying on `vite` alone:

1. Create or select a Vercel project linked to this repository.
2. Configure **`OPENAI_API_KEY`** as a server-side environment variable in the Vercel project settings.
3. Optionally set **`OPENAI_MODEL`** to a model available to your API account (the code defaults to `gpt-4.1-mini`).
4. Use the Vercel CLI development environment (for example `npx vercel dev`) with the appropriate environment variables, or deploy to Vercel and test there.
5. Open **Test a case**, select **AI · Live model**, and send a fictional request.

Never put the key in `VITE_*` variables, commit it to Git, or paste it into frontend code. `npm run dev` starts the Vite frontend only; it does not independently run the Vercel serverless API.

## Fictional demo data and state

The application ships with **five fictional tickets** (delivery, billing, technical support and feedback) and **five sample knowledge articles**. The two agent personas are UI choices; they do not represent real employees. Ticket status and internal notes are saved to the current browser's `localStorage`; there is no account sync or database. Test-case conversations exist in the current app session and can be cleared by resetting the demo. **Reset demo data** restores the fictional seed state.

The knowledge base is curated, static demonstration content. AI mode includes that sample content in its server-side instructions; it is **not** a vector database, live document search or retrieval-augmented generation pipeline.

## Quality assurance

Run the repository checks:

```bash
npm run lint
npm run build
npm test
```

The GitHub Actions workflow at `.github/workflows/frontend-qa.yml` runs these checks for pushes to `main`, pull requests targeting `main`, and manual workflow dispatch.

**Manual acceptance checklist**

- Navigate between Overview, Inbox, Test a case and Knowledge base on desktop and mobile.
- Search/filter tickets; inspect and update statuses; add notes and refresh to verify local persistence.
- Analyze an inbox ticket, edit the proposed response and copy it; confirm no real message is sent.
- Test Demo mode with delivery, billing, technical and unsupported requests.
- Test AI mode with a fictional issue, multiple turns, agent switching, empty inputs and service-error handling.
- Search/filter/open knowledge articles and reset all demo data.
- Check keyboard navigation, visible focus, scrolling and responsive layouts at common mobile/tablet/desktop widths.
- Where supported, test microphone permission, start/stop dictation and fallback to typing.

Automated checks do not replace interactive browser testing, accessibility audits or security review.

## Deployment

**Production:** https://cx-agent-assist.vercel.app/

The `main` branch is the stable deployment source and is protected by a GitHub ruleset. Changes should be developed on short-lived branches, reviewed through pull requests and merged only after checks pass.

## Scope and limitations

This is a portfolio prototype intended to demonstrate frontend engineering, conversational UX, serverless API integration and safe handling of fictional support scenarios. It is not a production-ready support platform. There is no real customer identity system, shared database, CRM integration, order lookup, outbound messaging, server-side rate limiting or production audit logging. AI-generated responses require human review and policy verification before use in a real support workflow.

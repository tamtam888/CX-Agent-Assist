# CX Agent Assist

A frontend MVP that simulates an AI-assisted customer support workflow.

---

## Overview

CX Agent Assist is a browser-based prototype that helps a support agent quickly analyze a customer message. The agent pastes a message, clicks Analyze, and receives structured output across six fields: summary, intent, sentiment, priority, a suggested reply, and a recommended next action.

This project currently uses mock analysis logic - no AI model or API is connected. It is built as a portfolio MVP to demonstrate a practical support tool interface and a clean component architecture.

---

## Why I Built It

Inspired by customer experience and support operations workflows, specifically the challenge agents face when handling high volumes of varied customer messages. This project explores how a structured AI-assist layer could help agents triage, understand, and respond faster - and what that interface should look and feel like before any real model is wired up.

---

## Features

- Paste any customer message or choose from three example scenarios: billing issue, delivery issue, or tech support issue
- One-click analysis returning six structured output fields
- Color-coded sentiment badges (Positive, Neutral, Negative, Frustrated)
- Color-coded priority badges (Low, Medium, High, Urgent)
- Copy Suggested Reply to clipboard with confirmation feedback
- Mark message as Escalated with inline status
- Clear input and result to start over
- Responsive layout
- Responds to system light/dark preference via CSS media query

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 |
| Language | JavaScript (no TypeScript) |
| Build tool | Vite |
| Styling | Component-scoped CSS files, no CSS-in-JS, no UI library |
| Analysis | Mock logic only - no external API |

---

## How It Works

The mock analysis function in `src/utils/mockAnalysis.js` uses keyword detection to categorize the incoming message into one of four types: billing, delivery, technical, or general. It then returns a matching pre-defined result object after a short simulated delay (700ms) to make the interaction feel realistic.

No API calls are made. The logic is intentionally isolated so a real LLM API can be swapped in later without changing the component structure.

---

## Project Structure

```
src/
  components/
    AnalysisResult.jsx    # Output card grid with action buttons
    AnalysisResult.css
    MessageInput.jsx      # Textarea, example pills, analyze/clear buttons
    MessageInput.css
  utils/
    mockAnalysis.js       # Keyword detection and mock result data
  App.jsx                 # Root component, state management
  App.css                 # App shell and layout
  index.css               # Design tokens and base typography
```

---

## Future Improvements

- Connect to a real LLM API to replace mock analysis
- Add conversation history and session log
- Export full analysis as a formatted agent note
- Ticket creation or CRM integration
- Agent notes field for adding context before escalation

---

## How to Run Locally

```bash
git clone <repo-url>
cd cx-agent-assist
npm install
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

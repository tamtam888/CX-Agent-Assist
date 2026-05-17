const MOCK_RESULTS = {
  billing: {
    summary: 'Customer reports a duplicate charge on their subscription and is threatening to cancel if not resolved.',
    intent: 'Billing dispute / Refund request',
    sentiment: 'Frustrated',
    priority: 'High',
    suggestedReply:
      "Hi, thank you for reaching out. I'm sorry to hear you were charged twice - that's not the experience we want for you. I've flagged your account for an immediate review and will process a refund for the duplicate charge within 3-5 business days. I'll follow up with a confirmation email shortly.",
    nextAction: 'Verify duplicate charge in billing system, then initiate refund, then send confirmation email to customer',
  },
  delivery: {
    summary: "Customer's order #4821 is 3 days overdue with no delivery update provided.",
    intent: 'Delivery status inquiry',
    sentiment: 'Negative',
    priority: 'Medium',
    suggestedReply:
      "Hi, I apologize for the delay with your order #4821. I've looked into this and can see your package is currently in transit. I'll escalate this to our logistics team to get you a precise delivery estimate within the next 24 hours.",
    nextAction: 'Check tracking for order #4821, then contact logistics team, then update customer with ETA',
  },
  technical: {
    summary: 'Customer is locked out of their account and unable to resolve the issue through password reset.',
    intent: 'Account access / Technical issue',
    sentiment: 'Negative',
    priority: 'High',
    suggestedReply:
      "Hi, I'm sorry you're having trouble accessing your account. Let me help you get back in. I'll manually verify your identity and reset your access from our end. Could you confirm the email address associated with your account so I can proceed?",
    nextAction: 'Verify account identity, then trigger manual password reset, then confirm access restored',
  },
  default: {
    summary: 'Customer has submitted a support request that requires review.',
    intent: 'General inquiry',
    sentiment: 'Neutral',
    priority: 'Medium',
    suggestedReply:
      "Thank you for reaching out. I've received your message and will look into this for you. Please allow me a moment to review the details, and I'll get back to you with an update shortly.",
    nextAction: 'Review message, then categorize issue, then assign to appropriate team',
  },
};

function detectCategory(text) {
  const lower = text.toLowerCase();
  if (/charg|billed|billing|invoice|payment|refund|subscri|fee/.test(lower)) return 'billing';
  if (/order|delivery|deliver|shipped|shipping|package|tracking|arriv/.test(lower)) return 'delivery';
  if (/log.?in|login|password|account|access|error|bug|crash/.test(lower)) return 'technical';
  return 'default';
}

export function analyzeMessage(text) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...MOCK_RESULTS[detectCategory(text)] });
    }, 700);
  });
}

export const EXAMPLE_MESSAGES = [
  {
    label: 'Billing issue',
    text: "I was charged twice for my subscription this month and I need this fixed immediately. If this isn't resolved today, I'm canceling my account.",
  },
  {
    label: 'Delivery issue',
    text: "My order #4821 was supposed to arrive three days ago and I still haven't received it. There's been no update from your team. What is going on?",
  },
  {
    label: 'Tech support issue',
    text: "I can't log into my account. It keeps telling me my password is incorrect even though I've reset it twice. I need access urgently.",
  },
];

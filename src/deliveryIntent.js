export function classifyDeliveryIntent(message) {
  const text = message.toLowerCase();
  const address = /\b(address|change (?:my |the )?delivery address|wrong address|update (?:my |the )?address|ship(?:ping)? (?:it )?to)\b|כתובת|שינוי מען/.test(text);
  if (address) return 'address';
  const delay = /\b(delay(?:ed)?|late|missing|lost|not arriv(?:e|ed)|hasn.t arrived|never arrived|where is|track(?:ing)?|status|no update|stuck|refund|cancel(?:lation)?|damaged?)\b|איחור|מתעכב|לא הגיע|מעקב|ביטול|החזר|נזק/.test(text);
  return delay ? 'shipment' : 'clarify';
}
export function deliveryGuidance(intent) {
  if (intent === 'address') return {
    sourceId: 'KB-02',
    step: 'Verify customer identity and fulfillment status before changing the delivery address',
    reply: 'Hi, thanks for reaching out. I’ll check whether your order is still eligible for an address change after verifying its fulfillment status.'
  };
  if (intent === 'clarify') return {
    sourceId: null,
    step: 'Ask what the customer needs help with regarding their delivery',
    reply: 'Hi, thanks for reaching out. Could you tell me what you need help with regarding your delivery—for example, tracking, a delay, changing the address, or cancelling an order?'
  };
  return {
    sourceId: 'KB-01',
    step: 'Check order status and carrier tracking; verify eligibility before any refund or cancellation',
    reply: 'Hi, thanks for reaching out. I’ll check your order and the latest carrier update, then confirm the available next steps. Refund or cancellation eligibility will be verified before we proceed.'
  };
}

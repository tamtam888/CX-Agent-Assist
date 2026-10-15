import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyDeliveryIntent, deliveryGuidance } from '../src/deliveryIntent.js';

test('generic delivery mention asks for clarification instead of assuming a delay', () => {
  assert.equal(classifyDeliveryIntent('I want to discuss about the delivery'), 'clarify');
  const guidance = deliveryGuidance('clarify');
  assert.equal(guidance.sourceId, null);
  assert.match(guidance.reply, /Could you tell me/);
});
test('address changes route to KB-02', () => {
  assert.equal(classifyDeliveryIntent('I want to change the delivery address'), 'address');
  assert.equal(deliveryGuidance('address').sourceId, 'KB-02');
});
test('explicit shipment delays and cancellation requests route to KB-01', () => {
  for (const message of ['My order has not arrived', 'The tracking is stuck', 'I want to cancel the order']) {
    assert.equal(classifyDeliveryIntent(message), 'shipment', message);
  }
  assert.equal(deliveryGuidance('shipment').sourceId, 'KB-01');
});
test('address request takes precedence over general delivery references', () => {
  assert.equal(classifyDeliveryIntent('The delivery is late and I need to change my address'), 'address');
});

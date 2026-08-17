import { Router } from 'express';
import { routeInboundMessage } from '../conversation/stateMachine.js';
import { recordInbound } from '../services/whatsappService.js';

export const webhookRouter = Router();

/**
 * plan/13 Inbound Message Handling. Twilio posts form-encoded fields;
 * express.urlencoded() is mounted for this route in server.js.
 *
 * NFR (plan/06): "System queues outbound messages if WhatsApp API is
 * temporarily unavailable and retries automatically" — not implemented in
 * this scaffold; a production build should put actual sends behind a queue
 * (e.g. BullMQ, per plan/22's scaling note) rather than sending inline here.
 */
webhookRouter.post('/whatsapp', async (req, res, next) => {
  try {
    const from = (req.body.From ?? '').replace('whatsapp:', '');
    const body = req.body.Body ?? '';
    const messageId = req.body.MessageSid;

    // Respond to Twilio immediately; do the actual work after, so the
    // webhook doesn't time out waiting on an AI call or DB round-trip.
    res.status(200).send('<Response></Response>');

    await recordInbound({ teacherId: null, messageId, content: body }).catch(() => {});
    await routeInboundMessage({ phoneNumber: from, messageBody: body, messageId });
  } catch (err) {
    // Already responded to Twilio above — log rather than pass to error
    // middleware, which would try (and fail) to send a second response.
    console.error('[webhook] failed to process inbound message', err);
  }
});

/** Twilio delivery status callbacks (sent/delivered/read/failed). */
webhookRouter.post('/whatsapp/status', async (req, res) => {
  res.sendStatus(200);
  // See messageRepository.updateDeliveryStatus — wire this up once a real
  // Twilio status callback URL is configured.
});

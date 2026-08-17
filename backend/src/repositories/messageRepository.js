import { supabase } from '../config/supabaseClient.js';

// Non-functional requirement: "All AI-generated content logged with
// timestamp, teacher ID, and input context" (plan/06) — this table is the
// audit trail for every inbound/outbound WhatsApp message.

export async function logOutbound({ teacherId, messageId, content, status = 'sent' }) {
  const { data, error } = await supabase
    .from('whatsapp_messages')
    .insert({
      teacher_id: teacherId,
      direction: 'outbound',
      message_id: messageId,
      content,
      status,
      sent_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function logInbound({ teacherId, messageId, content }) {
  const { data, error } = await supabase
    .from('whatsapp_messages')
    .insert({
      teacher_id: teacherId,
      direction: 'inbound',
      message_id: messageId,
      content,
      status: 'received',
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateDeliveryStatus(messageId, status) {
  const patch = { status };
  if (status === 'delivered') patch.delivered_at = new Date().toISOString();
  if (status === 'read') patch.read_at = new Date().toISOString();
  const { error } = await supabase.from('whatsapp_messages').update(patch).eq('message_id', messageId);
  if (error) throw error;
}

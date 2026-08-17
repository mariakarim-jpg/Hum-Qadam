import 'dotenv/config';

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    // Don't throw at import time in scaffold mode — log clearly instead, so
    // the server can still start for local development without every key
    // filled in. Fails loudly and specifically when the feature is actually used.
    console.warn(`[env] ${name} is not set — anything that needs it will fail until it is.`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  timezone: process.env.TIMEZONE ?? 'Asia/Karachi',

  supabaseUrl: required('SUPABASE_URL'),
  supabaseServiceRoleKey: required('SUPABASE_SERVICE_ROLE_KEY'),
  supabaseAnonKey: required('SUPABASE_ANON_KEY'),

  anthropicApiKey: required('ANTHROPIC_API_KEY'),
  anthropicModel: process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-5',

  whatsappProvider: process.env.WHATSAPP_PROVIDER ?? 'twilio',
  twilioAccountSid: required('TWILIO_ACCOUNT_SID'),
  twilioAuthToken: required('TWILIO_AUTH_TOKEN'),
  twilioWhatsappFrom: process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886',

  morningCheckinCron: process.env.MORNING_CHECKIN_CRON ?? '50 4 * * 1-5',
  eveningReflectionCron: process.env.EVENING_REFLECTION_CRON ?? '55 13 * * 1-5',
};

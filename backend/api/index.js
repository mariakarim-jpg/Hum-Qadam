import { createApp } from '../src/app.js';

// Vercel convention: any file under api/ becomes a serverless function.
// Exporting the Express app directly works because an Express app instance
// is itself a valid (req, res) handler — Vercel calls it per-request
// instead of it listening on a port. vercel.json rewrites every path to
// this one function, so Express's own router still handles /health,
// /webhook, /internal, /api/* exactly as it does locally.
const app = createApp();

export default app;

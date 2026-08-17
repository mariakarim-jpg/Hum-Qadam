// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(`[error] ${req.method} ${req.path}:`, err);
  const status = err.status ?? 500;
  res.status(status).json({ error: status === 500 ? 'Internal server error' : err.message });
}

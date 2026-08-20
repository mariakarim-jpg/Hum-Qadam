// Not part of `npm test` (planValidationService.test.js is the real suite) —
// a one-off smoke check proving api/index.js's default export genuinely
// works as a plain (req, res) handler with NO app.listen() anywhere in this
// process, exactly how Vercel actually invokes it. Run manually:
//   node test/vercel-handler.smoke.js
import http from 'node:http';
import handler from '../api/index.js';

// Wrap the exported handler in a plain Node http server ourselves — this is
// standing in for what Vercel's runtime does, not something the app itself
// sets up. If this works, the app is proven to not depend on .listen().
const server = http.createServer(handler);

server.listen(0, () => {
  const { port } = server.address();
  http.get(`http://localhost:${port}/health`, (res) => {
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Body: ${body}`);
      const ok = res.statusCode === 200 && JSON.parse(body).ok === true;
      console.log(ok ? 'PASS — handler works with no app.listen() in this process' : 'FAIL');
      server.close();
      process.exit(ok ? 0 : 1);
    });
  });
});

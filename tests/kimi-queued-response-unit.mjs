import assert from 'node:assert/strict';
import http from 'node:http';
import { NvidiaNimClient } from '../scripts/kimi-agent/nim.mjs';

const requestId = '123e4567-e89b-12d3-a456-426614174000';
let completionRequests = 0;
let statusPolls = 0;

const server = http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/v1/chat/completions') {
    completionRequests += 1;
    const chunks = [];
    request.on('data', chunk => chunks.push(chunk));
    request.on('end', () => {
      const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      assert.equal(body.model, 'moonshotai/kimi-k3');
      assert.equal(body.stream, true);
      response.writeHead(202, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ requestId }));
    });
    return;
  }

  if (request.method === 'GET' && request.url === `/v1/status/${requestId}`) {
    statusPolls += 1;
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({
      id: 'chatcmpl-queued-unit',
      model: 'moonshotai/kimi-k3',
      usage: { prompt_tokens: 20, completion_tokens: 7, total_tokens: 27 },
      choices: [{
        index: 0,
        finish_reason: 'stop',
        message: { role: 'assistant', content: 'Queued completion ready.' },
      }],
    }));
    return;
  }

  response.writeHead(404);
  response.end();
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}/v1`;
const client = new NvidiaNimClient({ apiKey: 'unit-test-key', baseUrl, testEndpoint: true });

try {
  const result = await client.complete({
    model: 'moonshotai/kimi-k3',
    messages: [{ role: 'user', content: 'queued test' }],
    maxTokens: 1024,
    reasoningEffort: 'high',
    stream: true,
    timeoutMs: 5_000,
    retries: 0,
  });

  assert.equal(result.message.content, 'Queued completion ready.');
  assert.equal(result.usage.total_tokens, 27);
  assert.equal(completionRequests, 1, 'queued invocation must not be resubmitted while pending');
  assert.equal(statusPolls, 1, '202 response must be resolved through the NVIDIA status endpoint');
  console.log('KIMI QUEUED RESPONSE UNIT PASS');
} finally {
  server.close();
}

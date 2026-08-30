#!/usr/bin/env node
// Netlify compatibility entrypoint. The direct controller lives in ./kimi-agent/.
export * from './kimi-compat.mjs';
import { main } from './kimi-compat.mjs';

if (process.argv[1]?.endsWith('kimi-delegate.mjs')) main();

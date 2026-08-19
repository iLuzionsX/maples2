import { chromium } from 'playwright';
import { runPerformanceDiagnostics } from '../tests/performance-ab.mjs';

const baseLaunch = chromium.launch.bind(chromium);
chromium.launch = async (options = {}) => {
  const browser = await baseLaunch({
    ...options,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      ...(options.args || []),
    ],
  });

  const baseNewContext = browser.newContext.bind(browser);
  const baseClose = browser.close.bind(browser);
  let performanceRan = false;
  let proxy;

  proxy = new Proxy(browser, {
    get(target, property, receiver) {
      if (property === 'newContext') {
        return (contextOptions = {}) => {
          const { recordVideo: _recordVideo, ...stableOptions } = contextOptions;
          return baseNewContext(stableOptions);
        };
      }
      if (property === 'close') {
        return async () => {
          if (!performanceRan) {
            performanceRan = true;
            await runPerformanceDiagnostics(proxy, {
              baseUrl: process.env.MAPLES_TEST_BASE_URL || 'http://127.0.0.1:4173',
            });
          }
          return baseClose();
        };
      }
      const value = Reflect.get(target, property, receiver);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });

  return proxy;
};

await import('../tests/visual-smoke.mjs');

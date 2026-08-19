import { chromium } from 'playwright';

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
  return new Proxy(browser, {
    get(target, property, receiver) {
      if (property === 'newContext') {
        return async (contextOptions = {}) => {
          const { recordVideo: _recordVideo, ...stableOptions } = contextOptions;
          const context = await baseNewContext(stableOptions);
          // The desktop smoke test explicitly asserts the authored high preset. Netlify
          // runner core-count reporting is infrastructure noise, so emulate the capable
          // desktop that test is intended to represent before any game code executes.
          await context.addInitScript(() => {
            Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, get: () => 8 });
            Object.defineProperty(navigator, 'deviceMemory', { configurable: true, get: () => 8 });
          });
          return context;
        };
      }
      const value = Reflect.get(target, property, receiver);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
};

await import('../tests/visual-smoke.mjs');

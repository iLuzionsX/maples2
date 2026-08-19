import './style.css';
import './asset-polish.css';
import './showcase.css';
import './narrow-hud-fix.css';
import { Game } from './game/Game.js';
import { enhanceInstance } from './game/Enhancements.js';
import { installAssetVisuals } from './game/AssetVisuals.js';
import { installEnvironmentAssets } from './game/EnvironmentAssets.js';
import { installNatureAssets } from './game/NatureAssets.js';
import { installCinematicPolish } from './game/CinematicPolish.js';
import { installRowanStyle } from './game/RowanStyle.js';
import { installShowcasePass } from './game/ShowcasePass.js';
import { installAnimationPolish } from './game/AnimationPolish.js';
import { installShowcaseQualityGate } from './game/ShowcaseQualityGate.js';
import { installPerformancePass } from './game/PerformancePass.js';

const canvas = document.querySelector('#game');
const game = new Game(canvas);
enhanceInstance(game);

const enterButton = document.querySelector('#enter-btn');
enterButton.disabled = true;
enterButton.textContent = 'Summoning the Glade…';

const visualManager = installAssetVisuals(game);
installRowanStyle(game);
installCinematicPolish(game);
installShowcasePass(game);
installAnimationPolish(game);
installShowcaseQualityGate(game);

const performanceDisabled = new URLSearchParams(location.search).get('perf') === 'off';
let performancePass = null;
window.__MAPLES_INSTALL_PERFORMANCE__ = () => {
  if (!performancePass) {
    // Performance work must never replace the authored/cinematic camera stack.
    const preservedCameraUpdate = game._updateCamera;
    performancePass = installPerformancePass(game);
    game._updateCamera = preservedCameraUpdate;
  }
  return performancePass;
};
if (!performanceDisabled) window.__MAPLES_INSTALL_PERFORMANCE__();

const environmentPromise = installEnvironmentAssets(game);
const naturePromise = installNatureAssets(game);

function waitForCoreVisuals(timeoutMs = 15000) {
  return new Promise(resolve => {
    const started = performance.now();
    const poll = () => {
      if ((visualManager.ready && visualManager.heroReady) || visualManager.failures.length || performance.now() - started > timeoutMs) {
        resolve();
        return;
      }
      requestAnimationFrame(poll);
    };
    poll();
  });
}

Promise.allSettled([waitForCoreVisuals(), environmentPromise, naturePromise]).then(() => {
  performancePass?.rebatch();
  enterButton.textContent = 'Enter the Glade';
  enterButton.disabled = false;
  enterButton.dataset.ready = 'true';
});

game.start();
window.__MAPLES_GAME__ = game;
